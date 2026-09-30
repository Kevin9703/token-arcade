// Isolated recording server. No history scanner, player save, or external upload.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { build } from 'esbuild';
const root = path.resolve(import.meta.dirname, '..');
const output = path.join(root, 'art', 'promo');
fs.mkdirSync(output, { recursive: true });
await build({ entryPoints: [path.join(root, 'src/promo/recorder.ts')], bundle: true, format: 'iife', outfile: path.join(output, 'recorder.js'), sourcemap: true });
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.glb': 'model/gltf-binary', '.mp3': 'audio/mpeg', '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json', '.mp4': 'video/mp4' };
const page = `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>Token Town · 宣传片录制</title>
<style>body{margin:0;background:#132e29;color:#f7f2df;font:16px -apple-system,sans-serif}header{padding:18px 24px;display:flex;align-items:center;gap:24px}button{background:#e2c580;border:0;border-radius:10px;padding:12px 24px;font:inherit;color:#173d32;cursor:pointer}a{color:#e2c580}#world{position:absolute;left:-1400px;width:1280px;height:720px}#film{display:block;width:min(100%,1280px);height:auto;margin:auto}#status{flex:1}</style>
<header><button id="record" disabled>开始录制</button><span id="status">加载原创模型…</span><a href="/play/?demo=1" target="_blank">独立试玩 / WASD 验收</a></header>
<canvas id="world" aria-label="实机城镇"></canvas><canvas id="film" width="1920" height="1080" aria-label="宣传片预览"></canvas><script src="/recorder.js"></script></html>`;
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  if (req.method === 'POST' && url.pathname === '/recording') {
    if (req.headers.origin !== 'http://127.0.0.1:4174') { res.writeHead(403).end(); return; }
    const chunks = []; let size = 0;
    for await (const chunk of req) { size += chunk.length; if (size > 250 * 1024 * 1024) { res.writeHead(413).end(); return; } chunks.push(chunk); }
    fs.writeFileSync(path.join(output, 'raw.webm'), Buffer.concat(chunks));
    res.end('raw.webm'); return;
  }
  if (req.method === 'POST' && url.pathname === '/manifest') {
    if (req.headers.origin !== 'http://127.0.0.1:4174') { res.writeHead(403).end(); return; }
    const chunks = []; for await (const c of req) chunks.push(c);
    const value = JSON.parse(Buffer.concat(chunks).toString());
    fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(value, null, 2));
    res.end('manifest.json'); return;
  }
  if (url.pathname === '/') { res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.end(page); return; }
  let file;
  if (url.pathname === '/recorder.js') file = path.join(output, 'recorder.js');
  else if (url.pathname.startsWith('/film/')) file = path.join(output, path.basename(url.pathname));
  else { const name = decodeURIComponent(url.pathname).replace(/^\/play(?=\/)/, '').replace(/^\//, ''); file = path.resolve(root, 'public', name || 'index.html'); if (!file.startsWith(path.join(root, 'public') + path.sep)) {res.writeHead(403).end();return;} }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {res.writeHead(404).end();return;}
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream'); fs.createReadStream(file).pipe(res);
});
server.listen(4174, '127.0.0.1', () => console.log('Recording studio: http://127.0.0.1:4174/'));
