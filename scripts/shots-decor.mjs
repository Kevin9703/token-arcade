/*
 * Room-decoration polish screenshots. Grants a broad collectible spread so the
 * decoration editor (wall/floor/buddy zones + inventory bench) is fully
 * populated, then captures Home, the decorate editor, and the Customize
 * workshop in EN + 中文.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const URL = process.env.URL || 'http://localhost:4173';
const OUT = '/tmp/ta-decor';
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log('[decor]', ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ALL_IDS = [
  'c_smiley','c_token','c_heart','c_gg','c_mug','c_sprout','u_star','u_luckycoin','u_shelf','u_1up','u_gemc',
  'r_cat','r_palm','r_gameover','r_stool','r_rug','r_frame','e_rainbowcat','e_astro','e_minicab','e_trophy',
  'e_sunset','e_gemu','l_crown','l_trophy','l_egg','l_forest','c_keyboard','c_cursor','c_floppy','c_duck',
  'c_patch','c_noodle','c_terminal','c_shipit','u_lavalamp','u_lintbot','u_bonsai','u_prompt','u_enter',
  'u_headphones','u_inbox','r_drone','r_clock','r_vending','r_hologram','e_whale','e_portal','l_pair','l_infinite',
];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
const shot = async (n) => { await page.screenshot({ path: `${OUT}/${n}.png` }); log('shot', n); };
const setLang = (l) => page.evaluate((l) => window.arcade.store.setLanguage(l), l);
const go = (n, p) => page.evaluate(([n, p]) => window.arcade.router.go(n, p), [n, p]);

try {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await sleep(500);
  await page.evaluate(() => { window.arcade.store.state.firstRunDone = true; window.arcade.store.setMode('demo'); });
  // Populate projects + coins.
  for (let i = 0; i < 5; i++) { await page.mouse.click(1472, 54); await sleep(600); }
  // Grant a broad collectible spread so every zone + the inventory are full.
  await page.evaluate((ids) => {
    const now = Date.now();
    let i = 0;
    for (const id of ids) {
      window.arcade.store.state.owned[id] = { count: 1, firstUnlocked: new Date(now - (ids.length - i) * 60000).toISOString() };
      i++;
    }
    window.arcade.store.state.roomDecorations = null; // auto-arrange
  }, ALL_IDS);

  for (const lang of ['en', 'zh-CN']) {
    await setLang(lang);
    const tag = lang === 'en' ? 'en' : 'zh';
    await go('room'); await sleep(500); await shot(`home-${tag}`);
    // Open the decorate editor via its Home hotspot (~1146, 865).
    await page.mouse.click(1146, 865); await sleep(600); await shot(`decor-editor-${tag}`);
    // Select an inventory item to show the "selected + place" affordance.
    await page.mouse.click(268 + 34, 886 + 32); await sleep(300); await shot(`decor-selected-${tag}`);
    // Close editor.
    await page.mouse.click(1448 + 61, 888 + 31); await sleep(300);
    // Customize workshop (room themes + profile frames).
    await go('customize'); await sleep(500); await shot(`customize-${tag}`);
  }

  if (errors.length) log('CONSOLE ERRORS:', errors.slice(0, 6));
  else log('no console/page errors');
} catch (e) {
  log('EXCEPTION', e && e.stack ? e.stack : e);
} finally {
  await browser.close();
}
