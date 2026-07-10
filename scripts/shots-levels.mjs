/*
 * Level-system screenshot driver. Injects projects spanning all 5 visual stages
 * (screenshot-only state) to show:
 *   1. home cabinets in different level colors
 *   2. detail cabinets at different levels/stages
 *   3. a project near level-up (progress > 80%) + a live level-up moment
 *   4. max level (Lv 50) treatment
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const URL = process.env.URL || 'http://localhost:4173';
const OUT = '/tmp/ta-levels';
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log('[shots]', ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Replicate the level curve so injected projects get a correct numeric level.
const ANCHORS = [[1, 0], [2, 8000], [5, 100000], [10, 1000000], [20, 10000000], [35, 50000000], [50, 500000000]];
function buildThresholds() {
  const th = [];
  for (let lvl = 1; lvl <= 50; lvl++) {
    let a = ANCHORS[0], b = ANCHORS[ANCHORS.length - 1];
    for (let i = 0; i < ANCHORS.length - 1; i++) if (lvl >= ANCHORS[i][0] && lvl <= ANCHORS[i + 1][0]) { a = ANCHORS[i]; b = ANCHORS[i + 1]; break; }
    const [la, ta] = a, [lb, tb] = b, f = (lvl - la) / (lb - la);
    th.push(ta <= 0 ? Math.round(tb * f) : Math.round(ta * Math.pow(tb / ta, f)));
  }
  th[0] = 0;
  return th;
}
const TH = buildThresholds();
const levelFor = (t) => { let l = 1; for (let i = 0; i < TH.length; i++) if (t >= TH[i]) l = i + 1; return l; };

// One project per stage (+ one maxed, + one near level-up).
function proj(id, name, provider, tokens) {
  return { id, name, provider, tokens, level: levelFor(tokens), coins: Math.floor(tokens / 1000), lastGained: Math.floor(tokens * 0.06) };
}
const SPREAD = [
  proj('legend-proj', 'legend-proj', 'codex', 250_000_000),   // Legendary / amber
  proj('neon-proj', 'neon-proj', 'claude', 25_000_000),       // Neon / purple
  proj('deluxe-proj', 'deluxe-proj', 'gemini', 3_000_000),    // Deluxe / magenta
  proj('powered-proj', 'powered-proj', 'codex', 300_000),     // Powered / blue
  proj('starter-proj', 'starter-proj', 'claude', 40_000),     // Starter / green
];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
const shot = async (n, clip) => { await page.screenshot({ path: `${OUT}/${n}.png`, ...(clip ? { clip } : {}) }); log('shot', n); };

async function inject(projects, coins = 5000) {
  await page.evaluate(([ps, c]) => {
    const st = window.arcade.store.state;
    st.projects = ps;
    st.coins = c;
    st.stats.lifetimeTokens = ps.reduce((s, p) => s + p.tokens, 0);
    ps.forEach((p) => (st.lastTotals[p.id] = p.tokens));
    window.arcade.router.go('room');
  }, [projects, coins]);
}

try {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await sleep(500);
  await page.evaluate(() => { window.arcade.store.state.firstRunDone = true; window.arcade.store.setMode('demo'); });

  // 1. HOME with all five stage colors.
  await inject(SPREAD.map((p) => ({ ...p })));
  await sleep(700);
  await shot('1-home-stages');
  await shot('1-home-cabinets-crop', { x: 0, y: 150, width: 470, height: 780 });

  // 2. DETAIL at each stage.
  for (const p of SPREAD) {
    await page.evaluate((id) => window.arcade.router.go('cabinet', { id }), p.id);
    await sleep(450);
    await shot(`2-detail-${p.name}`);
  }

  // 3a. NEAR level-up on the detail page (progress > 80%).
  const nearTokens = Math.round(TH[6] + 0.92 * (TH[7] - TH[6])); // deep into level 7
  await inject([proj('ready-proj', 'ready-proj', 'claude', nearTokens)]);
  await page.evaluate(() => window.arcade.router.go('cabinet', { id: 'ready-proj' }));
  await sleep(500);
  await shot('3a-detail-near-levelup');

  // 3b. LIVE level-up moment on the home screen. Use real demo mock projects
  // (so the sync actually processes them), then lower the top project's stored
  // level so the next sync crosses levels -> banner + cabinet pulse.
  await page.evaluate(() => window.arcade.store.reset());
  await page.evaluate(() => { window.arcade.store.state.firstRunDone = true; window.arcade.store.setMode('demo'); window.arcade.router.go('room'); });
  await sleep(200);
  await page.mouse.click(1472, 54); // sync 1: seeds + creates mock projects
  await sleep(1100);
  await page.evaluate(() => {
    const st = window.arcade.store.state;
    const p = st.projects[0]; // top project by tokens
    p.level = Math.max(1, p.level - 4); // pretend it was lower -> next sync levels it up
  });
  await page.mouse.click(1472, 54); // sync 2: crosses levels -> level-up banner + pulse
  await sleep(430);
  await shot('3b-home-levelup');
  await sleep(1500);

  // 4. MAX level (Lv 50).
  await inject([proj('max-proj', 'max-proj', 'codex', 640_000_000)]);
  await page.evaluate(() => window.arcade.router.go('cabinet', { id: 'max-proj' }));
  await sleep(500);
  await shot('4-detail-max');

  if (errors.length) log('CONSOLE ERRORS:', errors.slice(0, 5));
  else log('no console/page errors');
} catch (e) {
  log('EXCEPTION', e && e.stack ? e.stack : e);
} finally {
  await browser.close();
}
