/*
 * measure-assets.mjs — measures anchor points inside the generated art with
 * sharp, so screen code never hand-guesses coordinates.
 *
 *   1. Achievement display cabinet: finds every slot pedestal (the bright
 *      orange bar under each cell) per shelf, then the dark recess above it,
 *      and emits per-cell centers. The AI-drawn grid is NOT uniform, so
 *      per-cell measurement is the only way icons sit truly centered.
 *   2. Home room background: finds the pendant-lamp centroid and the dark
 *      wall gap between the two rows of background machines — the room's
 *      visual center line where the coin bank should stand.
 *
 * Output: src/render/measured.ts (generated file, committed).
 *
 * Run: node scripts/measure-assets.mjs
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

async function raw(path) {
  const { data, info } = await sharp(path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const px = (x, y) => {
    const i = (y * w + x) * 4;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  };
  return { data, w, h, px };
}

// ---------------------------------------------------------------------------
// 1. Display cabinet slots
// ---------------------------------------------------------------------------

async function measureDisplay() {
  const img = await raw('assets/generated/capsule/achievement-display-v1.png');
  const { w, h, px } = img;

  // Pedestal pixels: bright warm orange bars.
  const isPed = (x, y) => {
    const [r, g, b, a] = px(x, y);
    return a > 200 && r > 190 && g > 100 && g < 215 && b < 130 && r > g + 40;
  };

  // y-projection of pedestal pixels -> 5 shelf bands.
  const rowCount = new Array(h).fill(0);
  for (let y = Math.floor(h * 0.12); y < h * 0.92; y++) {
    let c = 0;
    for (let x = Math.floor(w * 0.08); x < w * 0.94; x += 2) if (isPed(x, y)) c++;
    rowCount[y] = c;
  }
  const bands = [];
  let s = -1;
  for (let y = 0; y < h; y++) {
    const on = rowCount[y] > 25;
    if (on && s < 0) s = y;
    else if (!on && s >= 0) {
      if (y - s >= 5) bands.push({ y0: s, y1: y - 1, mass: rowCount.slice(s, y).reduce((a, b) => a + b, 0) });
      s = -1;
    }
  }
  bands.sort((a, b) => b.mass - a.mass);
  const shelves = bands.slice(0, 5).sort((a, b) => a.y0 - b.y0);
  if (shelves.length !== 5) throw new Error('expected 5 pedestal bands, got ' + shelves.length);

  // Per shelf: x-runs of pedestal pixels -> 9 pedestals.
  const rows = [];
  for (const band of shelves) {
    const hit = new Array(w).fill(false);
    for (let x = 0; x < w; x++) {
      for (let y = band.y0; y <= band.y1; y++) {
        if (isPed(x, y)) {
          hit[x] = true;
          break;
        }
      }
    }
    // merge runs with small gaps, drop narrow fragments
    const runs = [];
    s = -1;
    for (let x = 0; x <= w; x++) {
      const on = x < w && hit[x];
      if (on && s < 0) s = x;
      else if (!on && s >= 0) {
        if (runs.length && s - runs[runs.length - 1].x1 < 14) runs[runs.length - 1].x1 = x - 1;
        else runs.push({ x0: s, x1: x - 1 });
        s = -1;
      }
    }
    const peds = runs.filter((r) => r.x1 - r.x0 >= 22);
    if (peds.length !== 9) throw new Error('shelf@y' + band.y0 + ': expected 9 pedestals, got ' + peds.length);

    // For each pedestal, measure the dark recess WINDOW above it — both axes.
    // Vertical: longest dark run in a luminance profile above the pedestal.
    // Horizontal: at that window's mid-height, expand left/right from the
    // pedestal center until luminance rises (the octagon frame edges), giving
    // the window's true x-center (pedestals are sometimes offset from their
    // window, so this beats the pedestal centroid).
    const cells = peds.map((p) => {
      const pcx = Math.round((p.x0 + p.x1) / 2);
      const yTop = Math.max(0, Math.round(band.y0 - h * 0.13));
      const yBot = band.y0 - 1;
      const prof = [];
      for (let y = yTop; y <= yBot; y++) {
        let sL = 0;
        let n = 0;
        for (let dx = -12; dx <= 12; dx += 2) {
          const [r, g, b] = px(pcx + dx, y);
          sL += lum(r, g, b);
          n++;
        }
        prof.push(sL / n);
      }
      const minL = Math.min(...prof);
      const thr = minL + 14;
      let best = { a: 0, b: 0 };
      let s3 = -1;
      for (let i = 0; i <= prof.length; i++) {
        const on = i < prof.length && prof[i] < thr;
        if (on && s3 < 0) s3 = i;
        else if (!on && s3 >= 0) {
          if (i - s3 > best.b - best.a) best = { a: s3, b: i - 1 };
          s3 = -1;
        }
      }
      const cy = Math.round(yTop + (best.a + best.b) / 2);

      // horizontal window scan at cy (5px vertical averaging)
      const colL = (x) => {
        let sL = 0;
        let n = 0;
        for (let dy = -2; dy <= 2; dy++) {
          const [r, g, b] = px(x, cy + dy);
          sL += lum(r, g, b);
          n++;
        }
        return sL / n;
      };
      const rowThr = colL(pcx) + 20; // window interior is dark; frame is lighter
      let xL = pcx;
      let xR = pcx;
      const maxHalf = Math.round(w * 0.055);
      while (pcx - xL < maxHalf && xL > 1 && colL(xL - 1) < rowThr) xL--;
      while (xR - pcx < maxHalf && xR < w - 2 && colL(xR + 1) < rowThr) xR++;
      const cx = Math.round((xL + xR) / 2);
      return { x: +(cx / w).toFixed(4), y: +(cy / h).toFixed(4) };
    });
    // Shelves are horizontal: snap every cell to the shelf's MEDIAN y. This
    // rejects outliers where baked-in art (trophy silhouettes, prop shadows)
    // confuses the per-cell dark-run detection.
    const ys = cells.map((c) => c.y).sort((a, b) => a - b);
    const medY = ys[Math.floor(ys.length / 2)];
    for (const c of cells) c.y = medY;
    rows.push(cells);
  }
  return rows;
}

// ---------------------------------------------------------------------------
// 1b. Home prize wall slots (4 columns x 5 shelves, same pedestal approach)
// ---------------------------------------------------------------------------

async function measurePrizeWall() {
  // Ruler-verified slot centers for prize-wall-v1.png (4 cols x 5 shelves).
  // Auto-detection is unreliable on this asset (its window dividers sit right
  // at x=0.5 where the probe ran, and shelf-light bloom skews dark-run rows),
  // so these were read off a labeled fraction-grid overlay (see repo history)
  // and validated against the baked-in trophy/lock silhouettes. Re-measure by
  // regenerating that overlay if the asset changes.
  const cols = [0.24, 0.4125, 0.5775, 0.7425];
  const rows = [0.211, 0.338, 0.455, 0.568, 0.692];
  return rows.map((y) => cols.map((x) => ({ x, y })));
}

// eslint-disable-next-line no-unused-vars
async function measurePrizeWallAuto() {
  const img = await raw('assets/generated/prize-wall-v1.png');
  const { w, h, px } = img;
  // This asset has full-width lit shelf BOARDS (not per-slot pedestals), so:
  //   1. find the 5 board bands (bright warm rows spanning most of the width),
  //   2. above each board, find the dark slot-window band (vertical dark run),
  //   3. at that height, split the interior into 4 dark window runs (x).
  const isWarm = (x, y) => {
    const [r, g, b, a] = px(x, y);
    return a > 200 && r > 150 && g > 70 && b < 120 && r > g + 30 && g > b;
  };
  const rowCount = new Array(h).fill(0);
  for (let y = Math.floor(h * 0.1); y < h * 0.82; y++) {
    let c = 0;
    for (let x = Math.floor(w * 0.15); x < w * 0.85; x += 2) if (isWarm(x, y)) c++;
    rowCount[y] = c;
  }
  // boards = bands where warm pixels span >50% of the sampled width
  const need = ((w * 0.7) / 2) * 0.5;
  const boards = [];
  let s = -1;
  for (let y = 0; y < h; y++) {
    const on = rowCount[y] > need;
    if (on && s < 0) s = y;
    else if (!on && s >= 0) {
      if (y - s >= 3) boards.push(s); // board top edge
      s = -1;
    }
  }
  if (boards.length < 5) throw new Error('prize wall: expected >=5 boards, got ' + boards.length);
  const tops = boards.slice(0, 5);

  const rows = [];
  for (const boardTop of tops) {
    // vertical dark-run: probe at the cabinet's x-center
    const pcx = Math.round(w * 0.5);
    const yTop = Math.max(0, Math.round(boardTop - h * 0.085));
    const yBot = boardTop - 2;
    const prof = [];
    for (let y = yTop; y <= yBot; y++) {
      let sL = 0;
      let n = 0;
      for (let dx = -10; dx <= 10; dx += 2) {
        const [r, g, b] = px(pcx + dx, y);
        sL += lum(r, g, b);
        n++;
      }
      prof.push(sL / n);
    }
    const minL = Math.min(...prof);
    const thr = minL + 14;
    let best = { a: 0, b: 0 };
    let s3 = -1;
    for (let i = 0; i <= prof.length; i++) {
      const on = i < prof.length && prof[i] < thr;
      if (on && s3 < 0) s3 = i;
      else if (!on && s3 >= 0) {
        if (i - s3 > best.b - best.a) best = { a: s3, b: i - 1 };
        s3 = -1;
      }
    }
    const cy = Math.round(yTop + (best.a + best.b) / 2);

    // horizontal: the 4 windows are separated by 3 slightly-brighter divider
    // pillars. Smooth the luminance profile and take the 3 strongest interior
    // local maxima as dividers; windows are the spans between them.
    const colL = (x) => {
      let sL = 0;
      let n = 0;
      for (let dy = -3; dy <= 3; dy++) {
        const [r, g, b] = px(x, cy + dy);
        sL += lum(r, g, b);
        n++;
      }
      return sL / n;
    };
    const x0 = Math.floor(w * 0.13);
    const x1 = Math.floor(w * 0.87);
    const rowProf = [];
    for (let x = x0; x <= x1; x++) rowProf.push(colL(x));
    const smooth = rowProf.map((_, i) => {
      let sL = 0;
      let n = 0;
      for (let k = -9; k <= 9; k++) {
        const j = i + k;
        if (j >= 0 && j < rowProf.length) {
          sL += rowProf[j];
          n++;
        }
      }
      return sL / n;
    });
    const peaks = [];
    for (let i = 20; i < smooth.length - 20; i++) {
      if (smooth[i] >= smooth[i - 12] && smooth[i] >= smooth[i + 12]) peaks.push({ i, v: smooth[i] });
    }
    peaks.sort((a, b) => b.v - a.v);
    const dividers = [];
    for (const pk of peaks) {
      if (dividers.every((d) => Math.abs(d - pk.i) > (x1 - x0) * 0.12)) dividers.push(pk.i);
      if (dividers.length >= 3) break;
    }
    if (dividers.length !== 3) throw new Error('prize wall @boardTop ' + boardTop + ': expected 3 dividers, got ' + dividers.length);
    dividers.sort((a, b) => a - b);
    const edges = [0, ...dividers, smooth.length - 1];
    const cells = [];
    for (let i = 0; i < 4; i++) cells.push({ x: +(((edges[i] + edges[i + 1]) / 2 + x0) / w).toFixed(4), y: +(cy / h).toFixed(4) });
    rows.push(cells);
  }
  return rows;
}

// ---------------------------------------------------------------------------
// 2. Home room background center line
// ---------------------------------------------------------------------------

async function measureRoomCenter() {
  const img = await raw('assets/generated/arcade-room-bg-v1-1600x1000.png');
  const { w, h, px } = img;

  // Pendant lamp: warm bright core near the top, central third of the image.
  let sx = 0;
  let n = 0;
  for (let y = 0; y < h * 0.14; y++) {
    for (let x = Math.floor(w * 0.3); x < w * 0.72; x++) {
      const [r, g, b] = px(x, y);
      if (r > 200 && g > 150 && b < 150) {
        sx += x;
        n++;
      }
    }
  }
  const lampX = n ? sx / n / w : 0.5;

  // Dark wall gap between the left and right machine rows at wall height:
  // widest low-luminance valley in the middle band.
  const y0 = Math.floor(h * 0.36);
  const y1 = Math.floor(h * 0.5);
  const prof = [];
  for (let x = 0; x < w; x++) {
    let sL = 0;
    let c = 0;
    for (let y = y0; y < y1; y += 3) {
      const [r, g, b] = px(x, y);
      sL += lum(r, g, b);
      c++;
    }
    prof.push(sL / c);
  }
  // threshold = dark; find widest dark run within the central half
  const lo = Math.floor(w * 0.3);
  const hi = Math.floor(w * 0.72);
  const thr = 26;
  let best = { x0: 0, x1: 0 };
  let s2 = -1;
  for (let x = lo; x <= hi; x++) {
    const on = prof[x] < thr;
    if (on && s2 < 0) s2 = x;
    else if (!on && s2 >= 0) {
      if (x - s2 > best.x1 - best.x0) best = { x0: s2, x1: x - 1 };
      s2 = -1;
    }
  }
  if (s2 >= 0 && hi - s2 > best.x1 - best.x0) best = { x0: s2, x1: hi };
  const gapX = (best.x0 + best.x1) / 2 / w;

  return { lampX: +lampX.toFixed(4), gapX: +gapX.toFixed(4), gapPx: [best.x0, best.x1] };
}

// ---------------------------------------------------------------------------

const displayRows = await measureDisplay();
const prizeRows = await measurePrizeWall();
const room = await measureRoomCenter();

console.log('room center: lamp', room.lampX, 'wall gap', room.gapX, room.gapPx);
console.log('display rows:');
displayRows.forEach((r, i) => console.log(' shelf', i, r.map((c) => c.x + ',' + c.y).join('  ')));
console.log('prize wall rows:');
prizeRows.forEach((r, i) => console.log(' shelf', i, r.map((c) => c.x + ',' + c.y).join('  ')));

// Blend lamp + gap (both estimate the same axis) for the final center line.
const centerX = +((room.lampX + room.gapX) / 2).toFixed(4);

const out = `/*
 * measured.ts — GENERATED by scripts/measure-assets.mjs. Do not edit by hand;
 * re-run the script if the art assets change.
 *
 * Anchor points measured from the generated art with sharp, so screens place
 * dynamic content exactly where the art expects it.
 */

/** Per-cell centers of the achievement display cabinet (5 shelves x 9 slots),
 * as fractions of the drawn image box. The AI-drawn grid is not uniform. */
export const DISPLAY_SLOTS: { x: number; y: number }[][] = ${JSON.stringify(displayRows)};

/** Per-cell centers of the home prize wall (5 shelves x 4 slots), as fractions
 * of the drawn image box. */
export const PRIZE_WALL_SLOTS: { x: number; y: number }[][] = ${JSON.stringify(prizeRows)};

/** The home room background's visual center line (lamp + wall-gap blend),
 * as a fraction of image width. */
export const ROOM_CENTER_X = ${centerX};
`;
writeFileSync('src/render/measured.ts', out);
console.log('\nwrote src/render/measured.ts (centerX=' + centerX + ')');
