/*
 * Decoration-editor polish verification. Exercises the NEW editor behaviors:
 * modal dim + bright zones, capacity plates, bench selection ghost, drag
 * landing ghost + verdict tag, selected-placement remove button, dirty-SAVE
 * pulse and the CLOSE→DISCARD? confirm, in EN + 中文 where it matters.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const URL = process.env.URL || 'http://localhost:4173';
const OUT = '/tmp/ta-decor-polish';
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log('[polish]', ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ALL_IDS = [
  'c_smiley','c_token','c_heart','c_gg','c_mug','c_sprout','u_star','u_luckycoin','u_shelf','u_1up','u_gemc',
  'r_cat','r_palm','r_gameover','r_stool','r_rug','r_frame','e_rainbowcat','e_astro','e_minicab','e_trophy',
  'e_sunset','e_gemu','l_crown','l_trophy','l_egg','l_forest',
];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
const shot = async (n) => { await page.screenshot({ path: `${OUT}/${n}.png` }); log('shot', n); };

try {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await sleep(500);
  await page.evaluate(() => { window.arcade.store.state.firstRunDone = true; window.arcade.store.setMode('demo'); });
  for (let i = 0; i < 3; i++) { await page.mouse.click(1472, 54); await sleep(600); }
  await page.evaluate((ids) => {
    const now = Date.now();
    let i = 0;
    for (const id of ids) {
      window.arcade.store.state.owned[id] = { count: 1, firstUnlocked: new Date(now - (ids.length - i) * 60000).toISOString() };
      i++;
    }
    window.arcade.store.state.roomDecorations = null;
    window.arcade.store.setLanguage('en');
  }, ALL_IDS);

  // Home: DECOR entry should show the gold unplaced-count pip.
  await page.evaluate(() => window.arcade.router.go('room'));
  await sleep(400);
  await shot('home-decor-pip');
  await page.mouse.move(1146, 865); await sleep(300); await shot('home-decor-pip-hover');

  // Open the editor: modal dim + animated zones + capacity plates.
  await page.mouse.click(1146, 865); await sleep(500); await shot('editor-open');

  // Select a WALL bench item, hover the wall zone -> snapped selection ghost.
  await page.mouse.click(268 + 34, 886 + 32); await sleep(250);
  await page.mouse.move(500, 300); await sleep(350); await shot('editor-selection-ghost');
  // Click to place it.
  await page.mouse.click(500, 300); await sleep(400); await shot('editor-placed');

  // Click the just-placed prize to select it in the room -> breathing
  // brackets + floating × remove button.
  await page.mouse.click(500, 300); await sleep(300); await shot('editor-selected-placed');

  // Drag from the bench into the WRONG zone to show the red verdict tag:
  // pick a FLOOR item (filter to FLOOR first), drag it over the wall zone.
  await page.mouse.click(268 + 2 * 128 + 58, 954 + 15); await sleep(250); // FLOOR filter
  await page.mouse.move(268 + 34, 886 + 32); await page.mouse.down();
  await page.mouse.move(500, 320, { steps: 12 }); await sleep(200); await shot('editor-drag-wrong-zone');
  // ...then over its correct floor zone -> green + landing ghost.
  await page.mouse.move(505, 810, { steps: 12 }); await sleep(200); await shot('editor-drag-right-zone');
  await page.mouse.up(); await sleep(400); await shot('editor-after-drop');

  // Dirty state: SAVE should pulse. CLOSE first click -> DISCARD? confirm.
  await page.mouse.click(1448 + 61, 888 + 31); await sleep(300); await shot('editor-close-armed');
  // Second click discards.
  await page.mouse.click(1448 + 61, 888 + 31); await sleep(400); await shot('room-after-discard');

  // Regression (design-qa 2026-07-20 blocking issue): a rapid double-click on
  // CLOSE must not fall through to the Home shop card at the same coordinates
  // and spend coins. Give the player enough coins that the trophy-card buy
  // WOULD succeed if the click leaked, then double-click CLOSE fast.
  await page.evaluate(() => { window.arcade.store.state.coins = 5000; });
  await page.mouse.click(1146, 865); await sleep(500); // open editor (clean draft -> CLOSE closes on first click)
  const coinsBefore = await page.evaluate(() => window.arcade.store.state.coins);
  await page.mouse.click(1448 + 61, 888 + 31);
  await sleep(80); // a frame renders; Home hotspots reoccupy these coordinates
  await page.mouse.click(1448 + 61, 888 + 31); // human-speed second click, same spot
  await sleep(500);
  const coinsAfter = await page.evaluate(() => window.arcade.store.state.coins);
  if (coinsAfter !== coinsBefore) log('FAIL: double-click CLOSE leaked to Home and spent coins:', coinsBefore, '->', coinsAfter);
  else log('PASS: double-click CLOSE spent no coins (' + coinsAfter + ')');

  // 中文 quick pass of the editor chrome.
  await page.evaluate(() => window.arcade.store.setLanguage('zh-CN'));
  await page.mouse.click(1146, 865); await sleep(400); await shot('editor-zh');

  if (errors.length) log('CONSOLE ERRORS:', errors.slice(0, 6));
  else log('no console/page errors');
} catch (e) {
  log('EXCEPTION', e && e.stack ? e.stack : e);
} finally {
  await browser.close();
}
