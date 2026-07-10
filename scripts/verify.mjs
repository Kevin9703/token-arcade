/*
 * Acceptance driver. Launches system Chrome via playwright-core, drives the
 * full core loop (sync -> coins -> pull -> collectible -> persistence), and
 * saves screenshots to /tmp/ta-shots. Viewport is exactly the logical canvas
 * size (1600x1000) so canvas hotspot coords map 1:1 to real clicks.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const URL = process.env.URL || 'http://localhost:4173';
const OUT = '/tmp/ta-shots';
mkdirSync(OUT, { recursive: true });

const log = (...a) => console.log('[verify]', ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

const state = () => page.evaluate(() => (window.arcade ? JSON.parse(JSON.stringify(window.arcade.store.state)) : null));
const go = (name, params) => page.evaluate(([n, p]) => window.arcade.router.go(n, p), [name, params]);
const shot = async (n) => {
  await page.screenshot({ path: `${OUT}/${n}.png` });
  log('shot', n);
};
const clickLogical = (x, y) => page.mouse.click(x, y);

let ok = true;
const assert = (cond, msg) => {
  log(cond ? 'PASS' : 'FAIL', msg);
  if (!cond) ok = false;
};

try {
  // Fresh start.
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await sleep(600);
  assert(await page.evaluate(() => !!window.arcade), 'app booted (window.arcade present)');
  const s0 = await state();
  assert(s0 && s0.coins === 0, `first-run coins == 0 (got ${s0 && s0.coins})`);
  await shot('01-first-run');

  // Force demo mode so the run is deterministic-ish and always mints coins.
  await page.evaluate(() => window.arcade.store.setMode('demo'));

  // Click the SYNC button (top-right ~ (1360..1584, 16..92)).
  await clickLogical(1472, 54);
  await sleep(1800); // let coin-rain + count-up play
  const s1 = await state();
  assert(s1.coins > 0, `sync minted coins via click (coins now ${s1.coins})`);
  assert(s1.projects.length > 0, `projects populated (${s1.projects.length})`);
  assert(s1.stats.lifetimeTokens > 0, `lifetime tokens > 0 (${s1.stats.lifetimeTokens})`);
  await shot('02-after-sync');

  // Sync a couple more times to grow cabinets (demo world advances).
  await clickLogical(1472, 54);
  await sleep(1200);
  await clickLogical(1472, 54);
  await sleep(1400);
  await shot('03-after-multi-sync');

  // Open capsule / prize wall screen.
  await go('capsule');
  await sleep(500);
  await shot('04-capsule');
  const beforeOwned = Object.keys((await state()).owned).length;

  // Pull x1 — button under the machine (~ left column, below y=800).
  await clickLogical(255, 850);
  await sleep(1400);
  let sPull = await state();
  if (sPull.stats.pulls === 0) {
    // Fallback: drive via store if the click missed the button.
    log('click pull missed; using store.pull(1)');
    await page.evaluate(() => window.arcade.store.pull(1));
    await sleep(400);
    sPull = await state();
  }
  assert(sPull.stats.pulls >= 1, `capsule pulled (pulls=${sPull.stats.pulls})`);
  assert(Object.keys(sPull.owned).length >= beforeOwned, 'owned collectibles did not shrink');
  assert(Object.keys(sPull.owned).length >= 1, `at least one collectible owned (${Object.keys(sPull.owned).length})`);
  await shot('05-after-pull');

  // Do a 10-pull to fill the wall (needs >=90 coins; multi-sync should cover it).
  if (sPull.coins >= 90) {
    await page.evaluate(() => window.arcade.store.pull(10));
    await sleep(400);
  }
  await go('capsule');
  await sleep(500);
  await shot('06-prize-wall');

  // Cabinet detail for the top project.
  const top = (await state()).projects[0];
  await go('cabinet', { id: top.id });
  await sleep(500);
  await shot('07-cabinet-detail');

  // Persistence: reload and confirm coins + owned survive.
  const before = await state();
  await go('room');
  await sleep(300);
  await page.reload({ waitUntil: 'networkidle' });
  await sleep(800);
  const after = await state();
  assert(after.coins === before.coins, `coins persisted across reload (${before.coins} -> ${after.coins})`);
  assert(Object.keys(after.owned).length === Object.keys(before.owned).length, 'owned collectibles persisted');
  assert(after.projects.length === before.projects.length, 'projects persisted');
  await shot('08-after-reload');

  assert(errors.length === 0, `no console/page errors (${errors.length})` + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
} catch (e) {
  log('EXCEPTION', e && e.stack ? e.stack : e);
  ok = false;
} finally {
  if (errors.length) log('ERRORS:', errors.slice(0, 8));
  await browser.close();
  log(ok ? 'ALL CHECKS PASSED' : 'SOME CHECKS FAILED');
  process.exit(ok ? 0 : 1);
}
