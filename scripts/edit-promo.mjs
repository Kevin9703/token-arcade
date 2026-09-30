// Edit the browser's real-time take into a shareable H.264/AAC short.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '..');
const dir = path.join(root, 'art/promo');
const data = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
if (!data.bread || !data.marks.some(m => m.name === 'farm-baking')) throw Error('Take has no verified bread cycle');
const marks = data.marks;
const at = name => { const m = marks.find(m => m.name === name); if (!m) throw Error(`Missing shot: ${name}`); return m.time; };
const segments = [];
const use = (start, end, length) => { if (end <= start) return; segments.push({ start, end, length: Math.min(length, end - start) }); };
use(at('intro'), at('sync'), 3.5);
use(at('sync'), at('construction'), 4);
use(at('construction'), at('farm'), 9);
const farm = marks.filter(m => m.name.startsWith('farm-') && m.time < at('night'));
for (let i = 0; i < farm.length; i++) {
  const m = farm[i], end = farm[i + 1]?.time ?? at('night');
  // Include the middle/end of long jobs so crops and cargo are visible.
  const duration = m.name === 'farm-growing' ? 4 : m.name === 'farm-baking' ? 3.5 : 2.7;
  use(m.time + Math.min(1.2, (end - m.time) / 5), end, duration);
}
use(at('night') + 3, at('lapse') - .2, 5);
use(at('lapse') + .1, at('end'), 20);
use(at('end') + 1, at('stop'), 5.5);
const duration = segments.reduce((sum, s) => sum + s.length, 0);
function run(args) { const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'warning', ...args], { stdio: 'inherit' }); if (r.status !== 0) throw Error('ffmpeg failed'); }
// Re-mux MediaRecorder output to add a seek index, then trim one shot at a time
// instead of holding many full-resolution filter branches in memory.
const indexed = path.join(dir, 'indexed.webm');
run(['-y', '-i', path.join(dir, 'raw.webm'), '-c', 'copy', indexed]);
const shots = [];
for (const [i, shot] of segments.entries()) {
  const file = path.join(dir, `shot-${String(i).padStart(2, '0')}.mp4`); shots.push(file);
  run(['-y', '-ss', String(shot.start), '-t', String(shot.end - shot.start), '-i', indexed, '-vf', `setpts=(PTS-STARTPTS)*${shot.length / (shot.end - shot.start)},fps=30,setsar=1,format=yuv420p`, '-an', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '17', file]);
  console.log(`Edited shot ${i + 1}/${segments.length}`);
}
const list = path.join(dir, 'shots.txt');
fs.writeFileSync(list, shots.map(file => `file '${file.replaceAll("'", "'\\''")}'`).join('\n'));
const combined = path.join(dir, 'combined.mp4');
run(['-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', combined]);
const hd = path.join(dir, 'Token-Town-trailer-1080p.mp4');
run(['-y', '-i', combined, '-i', path.join(root, 'public/assets/town/audio/spring.mp3'), '-filter_complex', `[0:v]fade=t=in:d=0.6,fade=t=out:st=${duration - .8}:d=0.8[outv];[1:a]atrim=duration=${duration},asetpts=PTS-STARTPTS,volume=0.9,afade=t=in:d=1.5,afade=t=out:st=${duration - 3}:d=3[outa]`, '-map', '[outv]', '-map', '[outa]', '-c:v', 'libx264', '-preset', 'fast', '-crf', '21', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', hd]);
run(['-y', '-i', hd, '-vf', 'scale=1280:720', '-c:v', 'libx264', '-preset', 'fast', '-crf', '24', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', path.join(dir, 'Token-Town-trailer-share.mp4')]);
fs.writeFileSync(path.join(dir, 'edit.json'), JSON.stringify({ duration, segments }, null, 2));
fs.writeFileSync(path.join(dir, '音乐署名.txt'), 'Token Town / 河谷小镇宣传片\n\nMusic: "Heartwarming" by Kevin MacLeod (incompetech.com)\nSource: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100207\nLicensed under Creative Commons Attribution 4.0\nhttps://creativecommons.org/licenses/by/4.0/\nAdaptation: excerpt, volume adjustment, fade in and out.\n音乐署名已经保留在视频片尾，转发时请保留片尾。\n\n游戏画面为独立虚构演示，不含真实项目记录。建设与农事经过剪辑；昼夜、四季使用录制专用加速时钟。\n');
console.log(`Finished ${duration.toFixed(1)}s promo in ${dir}`);
