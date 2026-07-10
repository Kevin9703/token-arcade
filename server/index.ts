#!/usr/bin/env node
/**
 * Token Arcade — local-first server (TypeScript, run via Node type-stripping).
 *
 * Zero runtime dependencies. Two jobs:
 *   1. Serve the static pixel-arcade frontend from ../public
 *   2. GET /api/usage -> scan local AI coding history for per-project token totals
 *
 * The frontend is fully playable even with no history: it falls back to a
 * built-in demo generator. Real history just makes the arcade yours.
 *
 * Identity: a project is identified by the hash of its full working-directory
 * path, not its folder basename — so ~/work/app and ~/personal/app stay two
 * separate cabinets. Each project also carries `legacyId` (the old
 * lowercased-basename key) so existing saves can migrate their sync baselines
 * without double-minting coins.
 *
 * Scanning is incremental: per-file results are cached by (mtime, size), so a
 * re-sync only re-reads history files that actually changed.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 4173;
const HOST = '127.0.0.1'; // local-first: never expose the history scanner to the LAN
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const HOME = os.homedir();

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

interface ProjectAgg {
  id: string;
  name: string;
  legacyId: string;
  provider: string;
  providers: Record<string, number>;
  tokens: number;
}
interface ProjectOut {
  id: string;
  name: string;
  legacyId: string;
  provider: string;
  tokens: number;
}

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------

/** Stable FNV-1a hash of the identity basis (full cwd path). */
function hashId(basis: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < basis.length; i++) {
    h ^= basis.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return 'p' + (h >>> 0).toString(36);
}

function baseName(p: string | undefined | null): string | null {
  if (!p) return null;
  const parts = String(p).split(/[\\/]/).filter(Boolean);
  return parts.length ? parts[parts.length - 1] : null;
}

// Decode Claude's dash-encoded project dir (e.g. -Users-me-Desktop-study) into
// a display name. Lossy (dashes in real folder names split), display only.
function decodeClaudeDir(dir: string): string {
  const parts = dir.replace(/^-/, '').split('-').filter(Boolean);
  return parts.length ? parts[parts.length - 1] : dir;
}

// ---------------------------------------------------------------------------
// Incremental scan cache
// ---------------------------------------------------------------------------

/** What one history file contributed last time we read it. */
interface FileScan {
  mtimeMs: number;
  size: number;
  tokens: number;
  /** Full cwd path found inside the file, if any. */
  cwd: string | null;
}

// path -> last scan result. In-memory only; a server restart just re-scans.
const scanCache = new Map<string, FileScan>();

function safeReadLines(file: string, maxBytes: number): string[] {
  try {
    const stat = fs.statSync(file);
    if (stat.size > maxBytes) {
      // For very large files, read only the tail (usage accumulates; the tail
      // still contains cwd + recent usage lines).
      const fd = fs.openSync(file, 'r');
      const buf = Buffer.alloc(maxBytes);
      fs.readSync(fd, buf, 0, maxBytes, stat.size - maxBytes);
      fs.closeSync(fd);
      return buf.toString('utf8').split('\n');
    }
    return fs.readFileSync(file, 'utf8').split('\n');
  } catch {
    return [];
  }
}

/**
 * Return the cached contribution of `file` when it is unchanged, else re-read
 * it with `parse` and cache the result. `seen` collects live paths so stale
 * cache entries can be pruned after the scan.
 */
function scanFileCached(file: string, seen: Set<string>, parse: (lines: string[]) => { tokens: number; cwd: string | null }): FileScan | null {
  let stat: fs.Stats;
  try {
    stat = fs.statSync(file);
  } catch {
    return null;
  }
  seen.add(file);
  const cached = scanCache.get(file);
  if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) return cached;
  const maxBytes = 8 * 1024 * 1024;
  const parsed = parse(safeReadLines(file, maxBytes));
  const entry: FileScan = { mtimeMs: stat.mtimeMs, size: stat.size, tokens: parsed.tokens, cwd: parsed.cwd };
  scanCache.set(file, entry);
  return entry;
}

function pruneScanCache(seen: Set<string>): void {
  for (const key of scanCache.keys()) {
    if (!seen.has(key)) scanCache.delete(key);
  }
}

// ---------------------------------------------------------------------------
// Usage scanning
// ---------------------------------------------------------------------------

function addProject(map: Record<string, ProjectAgg>, basis: string, name: string, provider: string, tokens: number): void {
  const id = hashId(basis);
  if (!map[id]) map[id] = { id, name, legacyId: name.toLowerCase(), provider, providers: {}, tokens: 0 };
  const p = map[id];
  p.tokens += tokens;
  p.providers[provider] = (p.providers[provider] || 0) + tokens;
  let best: string | null = null;
  let bestT = -1;
  for (const k in p.providers) {
    if (p.providers[k] > bestT) {
      bestT = p.providers[k];
      best = k;
    }
  }
  p.provider = Object.keys(p.providers).length > 1 ? 'mixed' : best || provider;
}

function parseClaudeFile(lines: string[]): { tokens: number; cwd: string | null } {
  let tokens = 0;
  let cwd: string | null = null;
  for (const line of lines) {
    if (!line || line.charCodeAt(0) !== 123 /* { */) continue;
    let obj: any;
    try {
      obj = JSON.parse(line);
    } catch {
      continue;
    }
    if (!cwd && obj.cwd) cwd = String(obj.cwd);
    const u = obj.message && obj.message.usage;
    if (u) {
      // Fresh tokens the model processed. We intentionally exclude
      // cache_read_input_tokens: re-reading cached context every turn would
      // inflate totals into the billions and max out every cabinet.
      tokens += (u.input_tokens || 0) + (u.output_tokens || 0) + (u.cache_creation_input_tokens || 0);
    }
  }
  return { tokens, cwd };
}

function scanClaude(projects: Record<string, ProjectAgg>, seen: Set<string>): void {
  const root = path.join(HOME, '.claude', 'projects');
  let dirs: fs.Dirent[];
  try {
    dirs = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return;
  }
  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    const dirPath = path.join(root, d.name);
    let files: string[];
    try {
      files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.jsonl'));
    } catch {
      continue;
    }
    let tokens = 0;
    let cwdPath: string | null = null;
    for (const f of files) {
      const scan = scanFileCached(path.join(dirPath, f), seen, parseClaudeFile);
      if (!scan) continue;
      tokens += scan.tokens;
      if (!cwdPath && scan.cwd) cwdPath = scan.cwd;
    }
    if (tokens <= 0) continue;
    // Identity: the full cwd path when a session recorded one; else the
    // dash-encoded dir name, which also encodes the full path (unique enough,
    // just lossy for display).
    const basis = cwdPath || 'claude:' + d.name;
    const name = (cwdPath && baseName(cwdPath)) || decodeClaudeDir(d.name);
    addProject(projects, basis, name, 'claude', tokens);
  }
}

function walkJsonl(dir: string, out: string[], depth: number): void {
  if (depth > 6) return;
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkJsonl(full, out, depth + 1);
    else if (e.name.endsWith('.jsonl')) out.push(full);
  }
}

function parseCodexFile(lines: string[]): { tokens: number; cwd: string | null } {
  let cwd: string | null = null;
  let lastTotal = 0;
  for (const line of lines) {
    if (!line || line.charCodeAt(0) !== 123) continue;
    let obj: any;
    try {
      obj = JSON.parse(line);
    } catch {
      continue;
    }
    // Codex rollout lines wrap everything under `payload`
    // (`{ timestamp, type, payload }`). cwd lives at payload.cwd and the
    // running token counter at payload.info.total_token_usage. Fall back to
    // the top level for any older/flat shape.
    const payload = obj.payload || obj;
    if (!cwd && payload.cwd) cwd = String(payload.cwd);
    const info = payload.info || payload;
    const tu = info.total_token_usage || obj.total_token_usage || null;
    if (tu) {
      // Fresh tokens only: subtract cached input (re-read context).
      // total_token_usage is cumulative per session, so keep the max.
      const fresh =
        Math.max(0, (tu.input_tokens || 0) - (tu.cached_input_tokens || 0)) +
        (tu.output_tokens || 0) +
        (tu.reasoning_output_tokens || 0);
      if (fresh > lastTotal) lastTotal = fresh;
    }
  }
  return { tokens: lastTotal, cwd };
}

function scanCodex(projects: Record<string, ProjectAgg>, seen: Set<string>): void {
  const root = path.join(HOME, '.codex', 'sessions');
  const files: string[] = [];
  walkJsonl(root, files, 0);
  for (const file of files) {
    const scan = scanFileCached(file, seen, parseCodexFile);
    if (!scan || scan.tokens <= 0) continue;
    // Sessions without a recorded cwd all pool into one 'codex-session' cabinet
    // (matches the old behavior; one cabinet per orphan session would be noise).
    const basis = scan.cwd || 'codex-session';
    const name = (scan.cwd && baseName(scan.cwd)) || 'codex-session';
    addProject(projects, basis, name, 'codex', scan.tokens);
  }
}

function scanUsage(): ProjectOut[] {
  const map: Record<string, ProjectAgg> = {};
  const seen = new Set<string>();
  try {
    scanClaude(map, seen);
  } catch {}
  try {
    scanCodex(map, seen);
  } catch {}
  pruneScanCache(seen);
  return Object.values(map)
    .map((p) => ({ id: p.id, name: p.name, legacyId: p.legacyId, provider: p.provider, tokens: p.tokens }))
    .filter((p) => p.tokens > 0)
    .sort((a, b) => b.tokens - a.tokens);
}

// ---------------------------------------------------------------------------
// HTTP
// ---------------------------------------------------------------------------

function sendJson(res: http.ServerResponse, code: number, obj: unknown): void {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(obj));
}

function serveStatic(req: http.IncomingMessage, res: http.ServerResponse): void {
  let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(PUBLIC_DIR, path.normalize(urlPath));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    // Dev-style serving: the bundle is unhashed, so never let the browser cache
    // a stale app.js across rebuilds.
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if ((req.url || '').split('?')[0] === '/api/usage') {
    const t0 = Date.now();
    let projects: ProjectOut[] = [];
    let error: string | null = null;
    try {
      projects = scanUsage();
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
    const totalTokens = projects.reduce((s, p) => s + p.tokens, 0);
    sendJson(res, 200, {
      ok: true,
      source: projects.length ? 'local' : error ? 'error' : 'empty',
      error,
      scannedAt: new Date().toISOString(),
      scanMs: Date.now() - t0,
      totals: { projects: projects.length, tokens: totalTokens },
      projects,
    });
    return;
  }
  serveStatic(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`\n  🕹  Token Arcade running at  http://${HOST}:${PORT}\n`);
});
