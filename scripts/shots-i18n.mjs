/*
 * i18n + achievement-gallery screenshot driver. Captures home / gallery /
 * capsule / detail in English and 中文 to confirm CJK renders (no `?`), no
 * overflow, and the gallery shows unlocked/total + cards.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const URL = process.env.URL || 'http://localhost:4173';
const OUT = '/tmp/ta-i18n';
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
  // sync a few times to unlock several achievements + mint coins
  for (let i = 0; i < 5; i++) { await page.mouse.click(1472, 54); await sleep(800); }
  await setLang('en');
  await sleep(300);
  await shot('1-home-en');
  await go('achievements');
  await sleep(400);
  await shot('2-gallery-en');

  // switch to Chinese
  await setLang('zh-CN');
  await sleep(300);
  await shot('3-gallery-zh');
  await go('room');
  await sleep(300);
  await shot('4-home-zh');
  await go('capsule');
  await sleep(400);
  await shot('5-capsule-zh');
  // pull once to see a reveal card in Chinese
  await page.mouse.click(275, 838);
  await sleep(560);
  await shot('6-reveal-zh');
  // a project detail in Chinese
  const top = await page.evaluate(() => window.arcade.store.state.projects[0]?.id);
  if (top) { await go('cabinet', { id: top }); await sleep(450); await shot('7-detail-zh'); }

  // persistence: reload, confirm locale sticks
  await page.reload({ waitUntil: 'networkidle' });
  await sleep(600);
  const persisted = await page.evaluate(() => window.arcade.store.state.settings.language);
  log('persisted language after reload:', persisted);

  if (errors.length) log('CONSOLE ERRORS:', errors.slice(0, 5));
  else log('no console/page errors');
} catch (e) {
  log('EXCEPTION', e && e.stack ? e.stack : e);
} finally {
  await browser.close();
}
