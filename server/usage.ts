/** Local-only per-project usage. Historical Claude/Codex accounting and IDs stay stable. */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
import { readAgentLines, parseKimiFile, parseDeepSeekFile, type CreditEvent } from './agent-usage.ts';

interface ProjectAgg {
  id: string;
  name: string;
  legacyId: string;
  provider: string;
  providers: Record<string, number>;
  tokens: number;
}
export interface ProjectOut {
  id: string;
  name: string;
  legacyId: string;
  provider: string;
  tokens: number;
}

export interface ScanOptions { home?: string; env?: NodeJS.ProcessEnv; }

export function createUsageScanner(options: ScanOptions = { env: process.env }) {
  const HOME = options.home || os.homedir();
  let warnings: string[] = [];
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
    events?: CreditEvent[];
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
  function scanFileCached(file: string, seen: Set<string>, parse: (lines: string[]) => { tokens: number; cwd: string | null; events?: CreditEvent[] }, full = false): FileScan | null {
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
    const parsed = parse(full ? readAgentLines(file) : safeReadLines(file, maxBytes));
    const entry: FileScan = { mtimeMs: stat.mtimeMs, size: stat.size, tokens: parsed.tokens, cwd: parsed.cwd, events: parsed.events };
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
        // inflate totals into the billions and max out every workshop.
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
    const root = path.join(options.env?.CODEX_HOME || path.join(HOME, '.codex'), 'sessions');
    const files: string[] = [];
    walkJsonl(root, files, 0);
    for (const file of files) {
      const scan = scanFileCached(file, seen, parseCodexFile);
      if (!scan || scan.tokens <= 0) continue;
      // Sessions without a recorded cwd all pool into one 'codex-session' project
      // (matches the old behavior; one project per orphan session would be noise).
      const basis = scan.cwd || 'codex-session';
      const name = (scan.cwd && baseName(scan.cwd)) || 'codex-session';
      addProject(projects, basis, name, 'codex', scan.tokens);
    }
  }

  function scanUsage(): ProjectOut[] {
    warnings = [];
    const map: Record<string, ProjectAgg> = {};
    const seen = new Set<string>();
    try {
      scanClaude(map, seen);
    } catch {}
    try {
      scanCodex(map, seen);
    } catch {}
    scanAdditionalAgents(map, seen);
    pruneScanCache(seen);
    return Object.values(map)
      .map((p) => ({ id: p.id, name: p.name, legacyId: p.legacyId, provider: p.provider, tokens: p.tokens }))
      .filter((p) => p.tokens > 0)
      .sort((a, b) => b.tokens - a.tokens);
  }

  // Additional providers use their durable usage events, never context-size estimates.
  function scanAdditionalAgents(map: Record<string, ProjectAgg>, seen: Set<string>): void {
    scanNewAgents(map, seen);
  }

  function entries(dir: string): fs.Dirent[] {
    try { return fs.readdirSync(dir, { withFileTypes: true }); } catch { return []; }
  }
  function readObject(file: string): Record<string, any> {
    try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return {}; }
  }
  function scanNewAgents(map: Record<string, ProjectAgg>, seen: Set<string>): void {
    const credits = new Map<string, { basis: string; provider: string; tokens: number }>();
    const collect = (scan: FileScan, basis: string, provider: string): void => {
      for (const event of scan.events || []) {
        const previous = credits.get(event.key);
        if (!previous || event.tokens > previous.tokens) credits.set(event.key, { basis, provider, tokens: event.tokens });
      }
    };
    const scanAgent = (file: string, provider: string, parse: (lines: string[]) => { tokens: number; cwd: string | null; events: CreditEvent[] }): FileScan | null => {
      try { return scanFileCached(file, seen, parse, true); } catch {
        warnings.push(`${provider === 'kimi' ? 'Kimi Code' : 'DeepSeek Harness'}：一份记录暂时无法读取，已保留上次有效统计`);
        return scanCache.get(file) || null;
      }
    };
    const kimiRoots = [...new Set([
      options.env?.KIMI_CODE_HOME || path.join(HOME, '.kimi-code'),
      options.env?.KIMI_SHARE_DIR || path.join(HOME, '.kimi'),
    ].map(p => path.resolve(p)))];
    for (const root of kimiRoots) {
      const index = new Map<string, string>();
      try {
        for (const line of fs.readFileSync(path.join(root, 'session_index.jsonl'), 'utf8').split('\n')) {
          try { const v = JSON.parse(line); if (typeof v.sessionDir === 'string' && typeof v.workDir === 'string') index.set(path.resolve(v.sessionDir), v.workDir); } catch { /* incomplete append */ }
        }
      } catch { /* old Kimi CLI has kimi.json instead */ }
      const old = readObject(path.join(root, 'kimi.json')).work_dirs;
      const legacy = new Map<string, string>();
      if (Array.isArray(old)) for (const v of old) if (typeof v.path === 'string') legacy.set(createHash('md5').update(v.path).digest('hex'), v.path);
      const sessions = path.join(root, 'sessions');
      for (const bucket of entries(sessions).filter(v => v.isDirectory())) {
        const dir = path.join(sessions, bucket.name);
        for (const entry of entries(dir).filter(v => v.isDirectory())) {
          const session = path.join(dir, entry.name), metadata = readObject(path.join(session, 'state.json'));
          const cwd = index.get(session) || (typeof metadata.cwd === 'string' ? metadata.cwd : null) || legacy.get(bucket.name);
          const basis = cwd || `kimi:${bucket.name}`;
          const wire = path.join(session, 'wire.jsonl');
          if (fs.existsSync(wire)) {
            const scan = scanAgent(wire, 'kimi', lines => parseKimiFile(lines, `${entry.name}:main`));
            if (scan) collect(scan, basis, 'kimi');
          }
          for (const agent of entries(path.join(session, 'agents')).filter(v => v.isDirectory())) {
            const file = path.join(session, 'agents', agent.name, 'wire.jsonl');
            if (!fs.existsSync(file)) continue;
            const scan = scanAgent(file, 'kimi', lines => parseKimiFile(lines, `${entry.name}:${agent.name}`));
            if (scan) collect(scan, basis, 'kimi');
          }
        }
      }
    }
    const dshRoot = options.env?.TOKEN_TOWN_DSH_SESSIONS || path.join(options.env?.DSH_HOME || path.join(HOME, '.dsh'), 'sessions');
    for (const project of entries(dshRoot).filter(v => v.isDirectory())) {
      const dir = path.join(dshRoot, project.name);
      for (const session of entries(dir).filter(v => v.isDirectory())) {
        const directory = path.join(dir, session.name);
        const candidates = entries(directory).filter(v => v.isFile() && /^session(?:\.v[1-9]\d*)?\.jsonl(?:\.zstd)?$/.test(v.name))
          .sort((a, b) => Number(b.name.match(/\.v(\d+)/)?.[1] || 0) - Number(a.name.match(/\.v(\d+)/)?.[1] || 0) || Number(b.name.endsWith('.zstd')) - Number(a.name.endsWith('.zstd')));
        // Immutable migrations coexist: count one authoritative generation per session.
        for (const candidate of candidates) {
          const scan = scanAgent(path.join(directory, candidate.name), 'deepseek', parseDeepSeekFile);
          if (scan) { collect(scan, scan.cwd || `deepseek:${project.name}`, 'deepseek'); break; }
        }
      }
    }
    for (const { basis, provider, tokens } of credits.values()) if (tokens > 0) addProject(map, basis, baseName(basis) || provider, provider, tokens);
    warnings = [...new Set(warnings)];
  }
  return { scan: scanUsage, get warnings() { return warnings; } };
}
