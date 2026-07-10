/*
 * Visual-completion screenshot driver (PM QA 2026-07-09). Captures home /
 * capsule / project-detail / achievements in English and 中文 so the asset
 * integration can be checked for consistent coin HUD, trophy-wall achievements,
 * detail stat tiles, and no overflow / no stray overlay rectangles.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const URL = process.env.URL || 'http://localhost:4173';
const OUT = '/tmp/ta-visual';
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log('[shots]', ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
  for (let i = 0; i < 6; i++) { await page.mouse.click(1472, 54); await sleep(700); }

  for (const lang of ['en', 'zh-CN']) {
    await setLang(lang);
    await sleep(300);
    const tag = lang === 'en' ? 'en' : 'zh';
    await go('room'); await sleep(400); await shot(`home-${tag}`);
    await go('achievements'); await sleep(400); await shot(`achievements-${tag}`);
    await go('capsule'); await sleep(400); await shot(`capsule-${tag}`);
    const top = await page.evaluate(() => window.arcade.store.state.projects[0]?.id);
    if (top) { await go('cabinet', { id: top }); await sleep(450); await shot(`detail-${tag}`); }
  }

  if (errors.length) log('CONSOLE ERRORS:', errors.slice(0, 6));
  else log('no console/page errors');
} catch (e) {
  log('EXCEPTION', e && e.stack ? e.stack : e);
} finally {
  await browser.close();
}
