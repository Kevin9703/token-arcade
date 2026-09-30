import { TownScene } from '../town/scene';
import { evaluate } from '../town/world';
import { mockTotals, syncTown } from '../town/store';
import { FARM_LABELS } from '../town/farming';
import { DAY_SECONDS, SEASON_DAYS, worldTime } from '../town/world-time';
import { promoTown } from './fixture';
import type { FarmPhase } from '../town/types';

const world = document.querySelector<HTMLCanvasElement>('#world')!;
const film = document.querySelector<HTMLCanvasElement>('#film')!;
const ctx = film.getContext('2d', { alpha: false })!;
const button = document.querySelector<HTMLButtonElement>('#record')!;
const status = document.querySelector<HTMLElement>('#status')!;
const state = promoTown();
const extras = state.town.buildings.filter(b => b.id.startsWith('promo-') || b.kind === 'workshop');
extras.forEach(b => b.placed = false);
let scene: TownScene;
let recorder: MediaRecorder | undefined;
let start = 0, elapsed = 0, stage = 'intro', farmPhase: FarmPhase | undefined;
let farmDone = 0, nightStart = 0, lapseStart = 0, endStart = 0, finished = false;
let title = '你的 token，正在变成一座小镇。';
let subtitle = 'Token Town / 河谷小镇';
let kicker = '给忙碌的一天，留一处慢下来的地方';
const marks: { name: string; time: number }[] = [];
const chunks: Blob[] = [];
const mark = (name: string) => { marks.push({ name, time: elapsed }); stage = name; };
const view = (x: number, z: number, zoom: number) => { scene.focus({ x, z }); scene.zoom(zoom / 1.45); };
const refresh = () => scene.setWorld(state, state.town, evaluate(state.town));
function text(value: string, x: number, y: number, size: number, color = '#fff8e7', weight = 600) {
  ctx.font = `${weight} ${size}px "PingFang SC", -apple-system, sans-serif`; ctx.fillStyle = color; ctx.fillText(value, x, y);
}
function draw() {
  ctx.drawImage(world, 0, 0, 1920, 1080);
  const shade = ctx.createLinearGradient(0, 580, 0, 1080); shade.addColorStop(0, 'rgba(10,31,27,0)'); shade.addColorStop(1, 'rgba(10,31,27,.92)'); ctx.fillStyle = shade; ctx.fillRect(0, 580, 1920, 500);
  ctx.fillStyle = 'rgba(16,44,36,.78)'; ctx.beginPath(); ctx.roundRect(56, 44, 670, 68, 34); ctx.fill();
  text(kicker, 86, 88, 27, '#e8d5a6', 500);
  text('TOKEN TOWN', 1570, 80, 28, '#28473a', 800);
  text('河谷小镇', 1680, 115, 24, '#28473a');
  if (stage !== 'end') {
    text(subtitle, 62, 862, 29, '#e1ce9f', 500);
    text(title, 56, 943, 60);
    text(stage.startsWith('farm') ? `小麦 ${state.farm.wheat}  /  面粉 ${state.farm.flour}  /  面包 ${state.farm.bread}` : '同步 token  →  建设家园  →  改善布局  →  解锁更多', 62, 1004, 29, '#dddccc', 400);
    text(stage === 'lapse' ? '实机画面 · 时钟加速展示' : stage === 'construction' ? '实机画面 · 建设延时剪辑' : '独立演示城镇 · 农事片段剪辑', 1480, 1035, 22, '#d3d4c6', 400);
  } else {
    text('把每天的创造，留在河谷里。', 58, 870, 60);
    text('Token Town / 河谷小镇', 64, 932, 36, '#e1ce9f');
    text('Music: “Heartwarming” — Kevin MacLeod (incompetech.com)', 64, 984, 24, '#dbdacd', 400);
    text('CC BY 4.0 · creativecommons.org/licenses/by/4.0/ · edited / faded', 64, 1021, 24, '#dbdacd', 400);
  }
}
function direct(time: number) {
  if (!recorder || finished) return;
  elapsed = (time - start) / 1000;
  if (stage === 'intro' && elapsed >= 5) {
    mark('sync'); const reward = syncTown(state, mockTotals(9)); refresh(); scene.celebrate('coin');
    title = `今天的创造，变成 ${reward.coins} 枚建设金币。`; subtitle = '10,000 新增 token = 1 金币';
  }
  if (stage === 'sync' && elapsed >= 11) {
    mark('construction'); title = '从几间木屋，到河两岸的热闹街坊。'; subtitle = '建设延时 / 每栋建筑都是自己的选择';
    view(12, 13, 1.02);
  }
  if (stage === 'construction') {
    const count = Math.min(extras.length, Math.floor((elapsed - 11) / .48) + 1);
    let changed = false;
    for (const b of extras.slice(0, count)) if (!b.placed) { b.placed = true; changed = true; }
    if (changed) { refresh(); for (const b of extras.slice(Math.max(0, count - 2), count)) scene.celebrate('building', b); }
    if (count === extras.length && elapsed > 11 + extras.length * .48 + 3) {
      mark('farm'); kicker = '一炉面包，也有自己的小小旅程'; view(13.5, 16.5, 2.05);
    }
  }
  if (stage.startsWith('farm')) {
    const phase = Object.values(state.farm.runs)[0]?.phase;
    if (phase && phase !== farmPhase) {
      farmPhase = phase; mark(`farm-${phase}`); title = { sowing: '春天，从种下一粒麦子开始。', growing: '留一点时间，让麦田慢慢变金黄。', harvesting: '收麦子啦！今天的丰收，自己扛回家。', 'to-mill': '村民背起小麦，走向风车磨坊。', milling: '风车转起来，小麦磨成面粉。', 'to-bakery': '再走一段路，把面粉送到面包店。', baking: '烟囱冒起烟：这一炉，快好了。', returning: '四个热乎乎的面包，出炉了。' }[phase];
      subtitle = `麦田 → 风车磨坊 → 面包店 / ${FARM_LABELS[phase]}`;
      const target = phase === 'milling' ? [16, 18, 2.8] : phase === 'baking' ? [7, 15, 2.8] : phase === 'to-bakery' ? [12, 16.8, 2.25] : [13.7, 15.5, 2.4];
      view(target[0], target[1], target[2]);
    }
    if (state.farm.bread > 0 && !farmDone) farmDone = elapsed;
    if (farmDone && elapsed - farmDone > 5) {
      mark('night'); nightStart = elapsed; state.settings.lighting = 'night'; title = '天黑了，邻居们开门回家。'; subtitle = '夜晚停工 / 明天继续'; kicker = '不用一直在线，小镇也不会惩罚你'; view(5, 16.5, 2.6);
    }
  }
  if (stage === 'night' && elapsed - nightStart > 44) {
    mark('lapse'); lapseStart = elapsed; state.settings.clockMode = 'cycle'; state.settings.season = 'cycle'; view(12, 13, 1.02); kicker = '同一个河谷，十二种不同的光'; title = '春夏秋冬，日升月落。'; subtitle = '时光缩影 / 昼夜与季节使用加速时钟';
  }
  if (stage === 'lapse') {
    // A recording-only clock override in memory. Game rules and save slots are untouched.
    state.worldSeconds = (elapsed - lapseStart) * (DAY_SECONDS * SEASON_DAYS * 4 / 26);
    const season = worldTime(state.worldSeconds, state.settings).season;
    subtitle = `${{ spring: '春 · 新绿', summer: '夏 · 葱郁', autumn: '秋 · 金黄', winter: '冬 · 落雪' }[season]} / 时光缩影`;
    if (elapsed - lapseStart > 26) { mark('end'); endStart = elapsed; state.settings.clockMode = 'fixed'; state.settings.lighting = 'sunset'; state.settings.season = 'spring'; title = '把每天的创造，留在河谷里。'; scene.rotate(.6); }
  }
  if (stage === 'end' && elapsed - endStart > 7) { finished = true; marks.push({ name: 'stop', time: elapsed }); recorder.stop(); }
  status.textContent = `${Math.floor(elapsed)} 秒 · ${stage} · 面包 ${state.farm.bread} · ${scene.fps} FPS`;
}
scene = new TownScene(world, { select() {}, cell() {}, hover() {}, strokeEnd() {}, cancel() {}, rendered(time) { direct(time); draw(); } });
refresh(); view(6.5, 16.5, 2.1);
// Allow asynchronous prefab/scenery loading to finish before the first take.
setTimeout(() => { button.disabled = false; status.textContent = '独立演示已就绪：1920×1080，30 FPS。录制期间请保持此页可见。'; }, 6000);
button.addEventListener('click', () => {
  button.disabled = true; start = performance.now(); mark('intro');
  const stream = film.captureStream(30);
  const mimeType = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8'].find(t => MediaRecorder.isTypeSupported(t));
  recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 10_000_000 });
  recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
  recorder.onstop = async () => {
    stream.getTracks().forEach(t => t.stop());
    try {
      const response = await fetch('/recording', { method: 'POST', body: new Blob(chunks, { type: mimeType }) });
      if (!response.ok) throw Error(`录制保存失败 ${response.status}`);
      const manifestResponse = await fetch('/manifest', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ width: 1920, height: 1080, marks, bread: state.farm.bread, duration: elapsed }) });
      if (!manifestResponse.ok) throw Error('镜头记录保存失败');
      status.textContent = `录制完成 · ${elapsed.toFixed(1)} 秒 · 完整农事已产出 ${state.farm.bread} 个面包 · art/promo/raw.webm`;
    } catch (e) { status.textContent = String(e); }
  };
  recorder.start(1000);
});
