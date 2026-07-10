/*
 * Capsule-screen screenshot driver. Boots the app, mints demo coins, populates
 * the cabinet with pulls, then captures the 5 states the QA asked for:
 *   1. capsule page overall
 *   2. hover an OWNED slot (tooltip)
 *   3. hover a LOCKED slot (tooltip)
 *   4. mid pull-lever (down/return)
 *   5. reveal card visible
 * Viewport is the logical canvas size (1600x1000, dSF 1) so logical coords map
 * 1:1 to real clicks/moves.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const URL = process.env.URL || 'http://localhost:4173';
const OUT = '/tmp/ta-caps';
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log('[shots]', ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Cabinet geometry (mirror of capsuleScreen.ts / measured.ts).
const DISPLAY = { x: 806, y: 120, w: 752, h: 696 };
const COLS = [0.147, 0.2408, 0.3321, 0.4225, 0.514, 0.6043, 0.694, 0.7805, 0.864];
const ROWS = [0.2156, 0.3657, 0.5133, 0.6609, 0.8027];
const RARITY_ORDER = ['legendary', 'epic', 'rare', 'uncommon', 'common'];
const BY_RARITY = {
  common: ['c_smiley', 'c_token', 'c_heart', 'c_gg', 'c_mug', 'c_sprout'],
  uncommon: ['u_star', 'u_luckycoin', 'u_shelf', 'u_1up', 'u_gemc'],
  rare: ['r_cat', 'r_palm', 'r_gameover', 'r_stool', 'r_rug', 'r_frame'],
  epic: ['e_rainbowcat', 'e_astro', 'e_minicab', 'e_trophy', 'e_sunset', 'e_gemu'],
  legendary: ['l_crown', 'l_trophy', 'l_egg', 'l_forest'],
};
// slot center for a collectible id (items live in slots[i+1]).
function slotOf(id) {
  for (const rk of Object.keys(BY_RARITY)) {
    const i = BY_RARITY[rk].indexOf(id);
    if (i < 0) continue;
    const r = RARITY_ORDER.indexOf(rk);
    return { x: DISPLAY.x + COLS[i + 1] * DISPLAY.w, y: DISPLAY.y + ROWS[r] * DISPLAY.h };
  }
  return null;
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

const state = () => page.evaluate(() => JSON.parse(JSON.stringify(window.arcade.store.state)));
const go = (n, p) => page.evaluate(([n, p]) => window.arcade.router.go(n, p), [n, p]);
const shot = async (n) => { await page.screenshot({ path: `${OUT}/${n}.png` }); log('shot', n); };

try {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await sleep(500);
  await page.evaluate(() => window.arcade.store.setMode('demo'));

  // Mint coins (sync button ~ (1472,54)) a few times.
  for (let i = 0; i < 4; i++) { await page.mouse.click(1472, 54); await sleep(900); }
  // Populate the cabinet with a few 10-pulls (bypass screen; just to own items).
  for (let i = 0; i < 3; i++) {
    const c = (await state()).coins;
    if (c >= 90) { await page.evaluate(() => window.arcade.store.pull(10)); await sleep(250); }
  }
  // Top up coins so the on-screen button pull at the end succeeds.
  for (let i = 0; i < 3; i++) { await page.mouse.click(1472, 54); await sleep(800); }

  await go('capsule');
  await sleep(600);
  await page.mouse.move(60, 500); // neutral, no tooltip
  await sleep(200);
  await shot('1-capsule-full');

  const s = await state();
  const ownedIds = Object.keys(s.owned);
  const allIds = Object.values(BY_RARITY).flat();
  const lockedIds = allIds.filter((id) => !ownedIds.includes(id));
  log('owned', ownedIds.length, 'locked', lockedIds.length, 'coins', s.coins);

  // 2. hover an OWNED slot — prefer one with a duplicate count for a fuller card.
  const dupOwned = ownedIds.find((id) => s.owned[id].count > 1) || ownedIds[0];
  const op = slotOf(dupOwned);
  if (op) {
    await page.mouse.move(op.x, op.y);
    await sleep(250);
    await shot('2-tooltip-owned');
    log('owned tip on', dupOwned, 'count', s.owned[dupOwned].count);
  }

  // 3. hover a LOCKED slot.
  const lp = lockedIds.length ? slotOf(lockedIds[0]) : null;
  if (lp) {
    await page.mouse.move(lp.x, lp.y);
    await sleep(250);
    await shot('3-tooltip-locked');
    log('locked tip on', lockedIds[0]);
  } else {
    log('no locked slot to hover (cabinet full)');
  }

  // Clear tooltip, then trigger a real button pull for lever + reveal.
  await page.mouse.move(60, 500);
  await sleep(200);
  // PULL X1 button center = (275, 838).
  await page.mouse.click(275, 838);
  await sleep(95); // during lever down/hold, before the gated card
  await shot('4-lever-mid');
  await sleep(520); // card has popped by now
  await shot('5-reveal-card');

  if (errors.length) log('CONSOLE ERRORS:', errors.slice(0, 5));
  else log('no console/page errors');
} catch (e) {
  log('EXCEPTION', e && e.stack ? e.stack : e);
} finally {
  await browser.close();
}
