/*
 * QA-005/006 browser evidence. Captures a real x10 pull, then verifies the
 * compact result ticker can be reviewed with both wheel and pointer drag.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const URL = process.env.URL || 'http://localhost:4173';
const OUT = 'docs/visual-audit-2026-07-10-qa005-controls';
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(e.message));

try {
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle' });
  await sleep(550);
  await page.evaluate(() => {
    window.arcade.store.setMode('demo');
    window.arcade.store.state.coins = 1000;
  });
  await page.evaluate(() => window.arcade.router.go('capsule'));
  await sleep(450);
  await page.screenshot({ path: `${OUT}/01-capsule-pull-controls.png` });

  // X10 card center mirrors PULL_CARD in capsuleScreen.ts.
  await page.mouse.click(546, 828);
  await sleep(850);
  await page.mouse.move(720, 530);
  await page.screenshot({ path: `${OUT}/02-feed-rows-1-4.png` });

  // The compact down tick advances exactly one row without changing the ticker
  // frame or revealing a browser-style scrollbar.
  await page.mouse.click(794, 442);
  await sleep(160);
  await page.screenshot({ path: `${OUT}/03-feed-after-down-control.png` });

  // One wheel step advances a readable row, then a few more reach the later
  // outcomes. The ticker is intentionally pinned instead of auto-running away.
  await page.mouse.move(720, 530);
  await page.mouse.wheel(0, 120);
  await sleep(180);
  await page.screenshot({ path: `${OUT}/04-feed-after-wheel.png` });
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 120);
    await sleep(55);
  }
  await sleep(160);
  await page.screenshot({ path: `${OUT}/05-feed-rows-6-9.png` });

  // Dragging upward should advance to the final rows using the same offset.
  await page.mouse.move(720, 575);
  await page.mouse.down();
  await page.mouse.move(720, 474, { steps: 6 });
  await page.mouse.up();
  await sleep(180);
  await page.screenshot({ path: `${OUT}/06-feed-after-drag-final-rows.png` });

  if (errors.length) throw new Error(errors.join(' | '));
  console.log(`[qa005] screenshots written to ${OUT}`);
} finally {
  await browser.close();
}
