/*
 * Record the README's short product loop from the explicitly fictional demo
 * slot. No local usage endpoint is called and no real project names enter the
 * capture. The resulting WebM is converted to a compact GIF by the release
 * workflow documented in docs/readme-assets/README.md.
 */
import { chromium } from 'playwright-core';
import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';

const BASE_URL = process.env.URL || 'http://127.0.0.1:4173/?demo=1';
const OUT_DIR = process.env.OUT_DIR || '/tmp/token-arcade-readme-capture';
const FRAMES_DIR = path.join(OUT_DIR, 'frames');
const FPS = 10;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(FRAMES_DIR, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(error.message));

await page.goto(BASE_URL, { waitUntil: 'load' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'load' });
await page.waitForFunction(() => window.arcade?.hostedDemo === true);
await page.evaluate(() => {
  window.arcade.store.setLanguage('en');
  window.arcade.store.state.settings.muted = true;
  // The capture remains fictional, but starts with enough demo currency to
  // show the complete x10 reward loop inside fifteen seconds.
  window.arcade.store.state.coins = Math.max(window.arcade.store.state.coins, 600);
  window.arcade.store.save();
});

let frame = 0;
async function capture(ms) {
  const count = Math.ceil((ms / 1000) * FPS);
  for (let i = 0; i < count; i++) {
    const started = Date.now();
    const name = `frame-${String(frame++).padStart(4, '0')}.png`;
    await page.screenshot({ path: path.join(FRAMES_DIR, name) });
    await sleep(Math.max(0, 1000 / FPS - (Date.now() - started)));
  }
}

// Establish the room, then sync one fictional coding session.
await capture(1700);
await page.mouse.move(1472, 54);
await page.mouse.click(1472, 54);
await capture(3200);

// Walk into the prize room via the physical prize wall.
await page.mouse.move(1400, 360);
await page.mouse.click(1400, 360);
await capture(1400);

// Pull ten capsules: lever, pop, new-card reveal, and the reviewable feed.
await page.mouse.move(546, 828);
await page.mouse.click(546, 828);
await capture(5500);

// End on the arcade room so the loop reads as lasting progression.
await page.mouse.move(76, 42);
await page.mouse.click(76, 42);
await capture(2200);

await context.close();
await browser.close();

if (errors.length) {
  throw new Error(`Capture saw browser errors:\n${errors.join('\n')}`);
}

console.log(`${frame} fictional-demo frames written to ${FRAMES_DIR}`);
