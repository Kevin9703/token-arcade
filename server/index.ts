#!/usr/bin/env node
/** Token Town: serve the 3D town and aggregate local coding-agent token usage.
 * Only project totals leave the scanner; conversations and credentials stay local.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createUsageScanner, type ProjectOut } from './usage.ts';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 4173;
const HOST = '127.0.0.1'; // local-first: never expose the history scanner to the LAN
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const scanner = createUsageScanner();

const MIME: Record<string, string> = {
  '.mp3': 'audio/mpeg',
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.webp': 'image/webp',
};

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
      projects = scanner.scan();
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
    }
    const totalTokens = projects.reduce((s, p) => s + p.tokens, 0);
    sendJson(res, 200, {
      ok: true,
      source: projects.length ? 'local' : error ? 'error' : 'empty',
      error,
      warnings: scanner.warnings,
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
  console.log(`\n  Token Town running at  http://${HOST}:${PORT}\n`);
});
