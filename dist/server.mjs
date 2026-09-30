#!/usr/bin/env node

// server/index.ts
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var PORT = Number(process.env.PORT) || 4173;
var HOST = "127.0.0.1";
var PUBLIC_DIR = path.join(__dirname, "..", "public");
var HOME = os.homedir();
var MIME = {
  ".mp3": "audio/mpeg",
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json",
  ".webp": "image/webp"
};
function hashId(basis) {
  let h = 2166136261;
  for (let i = 0; i < basis.length; i++) {
    h ^= basis.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return "p" + (h >>> 0).toString(36);
}
function baseName(p) {
  if (!p) return null;
  const parts = String(p).split(/[\\/]/).filter(Boolean);
  return parts.length ? parts[parts.length - 1] : null;
}
function decodeClaudeDir(dir) {
  const parts = dir.replace(/^-/, "").split("-").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : dir;
}
var scanCache = /* @__PURE__ */ new Map();
function safeReadLines(file, maxBytes) {
  try {
    const stat = fs.statSync(file);
    if (stat.size > maxBytes) {
      const fd = fs.openSync(file, "r");
      const buf = Buffer.alloc(maxBytes);
      fs.readSync(fd, buf, 0, maxBytes, stat.size - maxBytes);
      fs.closeSync(fd);
      return buf.toString("utf8").split("\n");
    }
    return fs.readFileSync(file, "utf8").split("\n");
  } catch {
    return [];
  }
}
function scanFileCached(file, seen, parse) {
  let stat;
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
  const entry = { mtimeMs: stat.mtimeMs, size: stat.size, tokens: parsed.tokens, cwd: parsed.cwd };
  scanCache.set(file, entry);
  return entry;
}
function pruneScanCache(seen) {
  for (const key of scanCache.keys()) {
    if (!seen.has(key)) scanCache.delete(key);
  }
}
function addProject(map, basis, name, provider, tokens) {
  const id = hashId(basis);
  if (!map[id]) map[id] = { id, name, legacyId: name.toLowerCase(), provider, providers: {}, tokens: 0 };
  const p = map[id];
  p.tokens += tokens;
  p.providers[provider] = (p.providers[provider] || 0) + tokens;
  let best = null;
  let bestT = -1;
  for (const k in p.providers) {
    if (p.providers[k] > bestT) {
      bestT = p.providers[k];
      best = k;
    }
  }
  p.provider = Object.keys(p.providers).length > 1 ? "mixed" : best || provider;
}
function parseClaudeFile(lines) {
  let tokens = 0;
  let cwd = null;
  for (const line of lines) {
    if (!line || line.charCodeAt(0) !== 123) continue;
    let obj;
    try {
      obj = JSON.parse(line);
    } catch {
      continue;
    }
    if (!cwd && obj.cwd) cwd = String(obj.cwd);
    const u = obj.message && obj.message.usage;
    if (u) {
      tokens += (u.input_tokens || 0) + (u.output_tokens || 0) + (u.cache_creation_input_tokens || 0);
    }
  }
  return { tokens, cwd };
}
function scanClaude(projects, seen) {
  const root = path.join(HOME, ".claude", "projects");
  let dirs;
  try {
    dirs = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return;
  }
  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    const dirPath = path.join(root, d.name);
    let files;
    try {
      files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".jsonl"));
    } catch {
      continue;
    }
    let tokens = 0;
    let cwdPath = null;
    for (const f of files) {
      const scan = scanFileCached(path.join(dirPath, f), seen, parseClaudeFile);
      if (!scan) continue;
      tokens += scan.tokens;
      if (!cwdPath && scan.cwd) cwdPath = scan.cwd;
    }
    if (tokens <= 0) continue;
    const basis = cwdPath || "claude:" + d.name;
    const name = cwdPath && baseName(cwdPath) || decodeClaudeDir(d.name);
    addProject(projects, basis, name, "claude", tokens);
  }
}
function walkJsonl(dir, out, depth) {
  if (depth > 6) return;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkJsonl(full, out, depth + 1);
    else if (e.name.endsWith(".jsonl")) out.push(full);
  }
}
function parseCodexFile(lines) {
  let cwd = null;
  let lastTotal = 0;
  for (const line of lines) {
    if (!line || line.charCodeAt(0) !== 123) continue;
    let obj;
    try {
      obj = JSON.parse(line);
    } catch {
      continue;
    }
    const payload = obj.payload || obj;
    if (!cwd && payload.cwd) cwd = String(payload.cwd);
    const info = payload.info || payload;
    const tu = info.total_token_usage || obj.total_token_usage || null;
    if (tu) {
      const fresh = Math.max(0, (tu.input_tokens || 0) - (tu.cached_input_tokens || 0)) + (tu.output_tokens || 0) + (tu.reasoning_output_tokens || 0);
      if (fresh > lastTotal) lastTotal = fresh;
    }
  }
  return { tokens: lastTotal, cwd };
}
function scanCodex(projects, seen) {
  const root = path.join(HOME, ".codex", "sessions");
  const files = [];
  walkJsonl(root, files, 0);
  for (const file of files) {
    const scan = scanFileCached(file, seen, parseCodexFile);
    if (!scan || scan.tokens <= 0) continue;
    const basis = scan.cwd || "codex-session";
    const name = scan.cwd && baseName(scan.cwd) || "codex-session";
    addProject(projects, basis, name, "codex", scan.tokens);
  }
}
function scanUsage() {
  const map = {};
  const seen = /* @__PURE__ */ new Set();
  try {
    scanClaude(map, seen);
  } catch {
  }
  try {
    scanCodex(map, seen);
  } catch {
  }
  pruneScanCache(seen);
  return Object.values(map).map((p) => ({ id: p.id, name: p.name, legacyId: p.legacyId, provider: p.provider, tokens: p.tokens })).filter((p) => p.tokens > 0).sort((a, b) => b.tokens - a.tokens);
}
function sendJson(res, code, obj) {
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(obj));
}
function serveStatic(req, res) {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const filePath = path.join(PUBLIC_DIR, path.normalize(urlPath));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(data);
  });
}
var server = http.createServer((req, res) => {
  if ((req.url || "").split("?")[0] === "/api/usage") {
    const t0 = Date.now();
    let projects = [];
    let error = null;
    try {
      projects = scanUsage();
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
    const totalTokens = projects.reduce((s, p) => s + p.tokens, 0);
    sendJson(res, 200, {
      ok: true,
      source: projects.length ? "local" : error ? "error" : "empty",
      error,
      scannedAt: (/* @__PURE__ */ new Date()).toISOString(),
      scanMs: Date.now() - t0,
      totals: { projects: projects.length, tokens: totalTokens },
      projects
    });
    return;
  }
  serveStatic(req, res);
});
server.listen(PORT, HOST, () => {
  console.log(`
  Token Town running at  http://${HOST}:${PORT}
`);
});
