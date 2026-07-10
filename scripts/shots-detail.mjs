/*
 * Project-detail screenshot driver. Boots, mints demo coins/tokens, then walks
 * each project's detail page so we can see the different cabinet color variants,
 * plus close crops of the stats board and rewards rail.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const URL = process.env.URL || 'http://localhost:4173';
const OUT = '/tmp/ta-detail';
mkdirSync(OUT, { recursive: true });
const log = (...a) => console.log('[shots]', ...a);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

const state = () => page.evaluate(() => JSON.parse(JSON.stringify(window.arcade.store.state)));
const go = (n, p) => page.evaluate(([n, p]) => window.arcade.router.go(n, p), [n, p]);
const shot = async (n, clip) => { await page.screenshot({ path: `${OUT}/${n}.png`, ...(clip ? { clip } : {}) }); log('shot', n); };

try {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await sleep(500);
  await page.evaluate(() => window.arcade.store.setMode('demo'));
  for (let i = 0; i < 5; i++) { await page.mouse.click(1472, 54); await sleep(900); }

  const s = await state();
  const projects = s.projects;
  log('projects', projects.map((p) => `${p.name}(lvl${p.level},${p.provider})`).join(', '));

  // Capture each project's detail page (up to 6) to show variant colors.
  const n = Math.min(6, projects.length);
  for (let i = 0; i < n; i++) {
    const p = projects[i];
    await go('cabinet', { id: p.id });
    await sleep(500);
    await shot(`proj-${i}-${p.name}`.replace(/[^a-z0-9-]/gi, '_'));
  }

  // Close crops from the first project.
  await go('cabinet', { id: projects[0].id });
  await sleep(500);
  await shot('crop-stats', { x: 760, y: 126, width: 812, height: 592 });
  await shot('crop-rail', { x: 0, y: 740, width: 1600, height: 260 });
  await shot('crop-cabinet', { x: 130, y: 110, width: 520, height: 700 });

  if (errors.length) log('CONSOLE ERRORS:', errors.slice(0, 5));
  else log('no console/page errors');
} catch (e) {
  log('EXCEPTION', e && e.stack ? e.stack : e);
} finally {
  await browser.close();
}
