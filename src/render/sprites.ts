/*
 * sprites.ts — sprite atlas + hand-drawn player and coin.
 *
 * Two kinds of art live here:
 *   - Sprite atlas: small fixed pixel maps (collectibles, avatar, icons).
 *   - Procedural drawers: the player and the spinning coin are drawn in code
 *     because they animate / squash, which a static sprite can't do.
 */

import type { Sprite } from '../core/types';
import { currencyIcon, drawImageSmooth } from './assets';

// Shared palette. Single-char keys keep the sprite maps compact + readable.
export const PALETTE: Record<string, string | null> = {
  '.': null, // transparent
  K: '#160f1f', // outline / near-black
  k: '#2a2036', // dark shade
  W: '#f6f4ff',
  w: '#c9c6e0',
  Y: '#ffd23f', // gold
  y: '#c98f24', // gold shade
  O: '#ff9a3c', // orange
  o: '#c85f2a',
  R: '#ef5d78', // red/pink
  r: '#a8324c',
  G: '#5fd66f', // green
  g: '#2f8f4b',
  B: '#4aa3ff', // blue
  b: '#2757ad',
  C: '#5fe6d6', // cyan
  c: '#2f9fa0',
  M: '#e15ad8', // magenta
  m: '#8a3aa0',
  U: '#9a6cff', // purple
  u: '#5a3ab0',
  P: '#ff8fce', // pink
  p: '#c85f9a',
  N: '#8a5a3c', // brown
  n: '#5c3a26',
  S: '#f0c090', // skin
  s: '#c8905f',
  L: '#bfe9ff', // glass light
  d: '#3a3350', // panel gray
  e: '#514a68',
};

// Widest row of a sprite map; cached onto `.w` by the atlas below.
function spriteW(s: Sprite): number {
  let m = 0;
  for (const r of s.d) m = Math.max(m, r.length);
  return m;
}

// ---- Sprite atlas ---------------------------------------------------------
// Collectibles are ~16 tall. Silhouettes are chosen to read at a glance.

export const SPRITES: Record<string, Sprite> = {
  smiley: {
    d: [
      '....KKKKKKKK....',
      '..KKYYYYYYYYKK..',
      '.KYYYYYYYYYYYYK.',
      '.KYYYYYYYYYYYYK.',
      'KYYKKYYYYKKYYYYK',
      'KYYKKYYYYKKYYYYK',
      'KYYYYYYYYYYYYYYK',
      'KYYYYYYYYYYYYYYK',
      'KYYKYYYYYYYYKYYK',
      'KYYKKYYYYYYKKYYK',
      'KYYYKKKKKKKKYYYK',
      '.KYYYYYYYYYYYYK.',
      '.KYYYYYYYYYYYYK.',
      '..KKYYYYYYYYKK..',
      '....KKKKKKKK....',
    ],
  },
  heart: {
    d: [
      '................',
      '..RRRR..RRRR....',
      '.RRRRRR.RRRRRR..',
      'RRRRRRRRRRRRRRR.',
      'RRRRRRRRRRRRRRR.',
      'RRRRRRRRRRRRRRR.',
      'WRRRRRRRRRRRRRR.',
      'WWRRRRRRRRRRRR..',
      '.WRRRRRRRRRRR...',
      '..RRRRRRRRRR....',
      '...RRRRRRRR.....',
      '....RRRRRR......',
      '.....RRRR.......',
      '......RR........',
      '................',
    ],
  },
  tokenChip: {
    d: [
      '....KKKKKKKK....',
      '..KKUUUUUUUUKK..',
      '.KUUUUUUUUUUUUK.',
      '.KUUUWWWWWWUUUK.',
      'KUUUUUUUWWUUUUUK',
      'KUUUUUUUWWUUUUUK',
      'KUUUUUUUWWUUUUUK',
      'KUUUUUUUWWUUUUUK',
      'KUUUUUUUWWUUUUUK',
      'KUUUUUUUWWUUUUUK',
      'KUUUUWWWWWWWUUUK',
      '.KUUUUUUUUUUUUK.',
      '.KUUUUUUUUUUUUK.',
      '..KKUUUUUUUUKK..',
      '....KKKKKKKK....',
    ],
  },
  ggSign: {
    d: [
      '................',
      'KKKKKKKKKKKKKKKK',
      'KBBBBBBBBBBBBBBK',
      'KBWWBBWWWBBWWBBK',
      'KBWBBBWBBBBWBBBK',
      'KBWBWWWWBBWBWWBK',
      'KBWBBWBWBBWBBWBK',
      'KBWWWWBWWBWWWWBK',
      'KBBBBBBBBBBBBBBK',
      'KKKKKKKKKKKKKKKK',
      '.....K....K.....',
      '.....K....K.....',
      '....KKK..KKK....',
      '................',
    ],
  },
  starBadge: {
    d: [
      '.......KK.......',
      '.......YY.......',
      '......KYYK......',
      '......YYYY......',
      'KKKKKYYYYYKKKKK.',
      '.YYYYYYYYYYYYYY.',
      '..YYYYYYYYYYYY..',
      '...YYYYYYYYYY...',
      '...YYYYYYYYYY...',
      '..YYYYKKYYYYYY..',
      '.YYYYK..KYYYYYY.',
      '.YYYK....KYYYYY.',
      '.YK........KYYY.',
      '................',
    ],
  },
  luckyCat: {
    d: [
      '..K........K....',
      '.KWK......KWK...',
      '.KWWK....KWWK...',
      '.KWWWKKKKWWWK...',
      '.KWWWWWWWWWWK...',
      'KWWKWWWWWWKWWK..',
      'KWWWWWWWWWWWWK..',
      'KWWKWWWWWWKWWK..',
      'KWWWWRRRRWWWWK..',
      'KWWWWWWWWWWWWK..',
      '.KWWWWWWWWWWK.KY',
      '.KWWWWWWWWWWKKYY',
      '.KWWWWWWWWWWKKY.',
      '..KWWWWWWWWK....',
      '...KKKKKKKK.....',
    ],
  },
  goldCoin: {
    d: [
      '....KKKKKKKK....',
      '..KKYYYYYYYYKK..',
      '.KYYYYYYYYYYYYK.',
      '.KYYWYYYYYYyYYK.',
      'KYYYWYYYYYYyYYYK',
      'KYYYWWYYYYyyYYYK',
      'KYYYYWYYYYyYYYYK',
      'KYYYYWYYYYyYYYYK',
      'KYYYYWYYYYyYYYYK',
      'KYYYWWWYYyyyYYYK',
      'KYYYYYYYYYYYYYYK',
      '.KYYYYYYYYYYYYK.',
      '.KyyyyyyyyyyyyK.',
      '..KKyyyyyyyyKK..',
      '....KKKKKKKK....',
    ],
  },
  bookShelf: {
    d: [
      '................',
      'NNNNNNNNNNNNNNNN',
      'NRRBBGGYYRRBBGGN',
      'NRRBBGGYYRRBBGGN',
      'NRRBBGGYYRRBBGGN',
      'NRRBBGGYYRRBBGGN',
      'NNNNNNNNNNNNNNNN',
      'NGGYYRRBBGGYYRRN',
      'NGGYYRRBBGGYYRRN',
      'NGGYYRRBBGGYYRRN',
      'NGGYYRRBBGG.GGRN',
      'NGGYYRRBBGGGGGRN',
      'NNNNNNNNNNNNNNNN',
      '................',
    ],
  },
  oneupFlag: {
    d: [
      '..K.............',
      '..KGGGGGGGGGK...',
      '..KGWWKWWKWWGK..',
      '..KGWKGWKGWKGK..',
      '..KGWKGWKGWKGK..',
      '..KGWWGWWGWWGK..',
      '..KGGGGGGGGGGK..',
      '..KGWKWWKWWGK..',
      '..KK.KKKKKKK....',
      '..K.............',
      '..K.............',
      '..K.............',
      'KKKKK...........',
      '................',
    ],
  },
  gem: {
    d: [
      '................',
      '...CCCCCCCCCC...',
      '..CWWCCCCCCCCC..',
      '.CWCCCCCCCCCCCC.',
      'CWCCCCCCCCCCCCCC',
      '.CCCCCCCCCCCCCC.',
      '..CCCCCCCCCCCC..',
      '...CCCCCCCCCC...',
      '....CCCCCCCC....',
      '.....CCCCCC.....',
      '......CCCC......',
      '.......CC.......',
      '................',
    ],
  },
  palm: {
    d: [
      '....GG..GG......',
      '..GGGGGGGGGG....',
      '.GGGKGGGGKGGG...',
      'GGGGGGGGGGGGGG..',
      '.GGGGGGGGGGGG...',
      '....GGGGGG......',
      '......NN........',
      '......NN........',
      '......NN........',
      '.....NNNN.......',
      '....kkkkkk......',
      '...kOOOOOOk.....',
      '...kOOOOOOk.....',
      '...kkkkkkkk.....',
      '................',
    ],
  },
  gameoverSign: {
    d: [
      '................',
      'KKKKKKKKKKKKKKKK',
      'KkkkkkkkkkkkkkkK',
      'KkRRkRRkRkRRkkkK',
      'KkRkkRkRkRkRkkkK',
      'KkRkRRRkRkRRkkkK',
      'KkRRkRkRkRkkkkkK',
      'KkkkkkkkkkkkkkkK',
      'KkOOkOkOkOOkkkkK',
      'KkOkkOkOkOkOkkkK',
      'KkOkkOOOkOOkkkkK',
      'KkOOkOkOkOkkkkkK',
      'KkkkkkkkkkkkkkkK',
      'KKKKKKKKKKKKKKKK',
      '................',
    ],
  },
  starRug: {
    d: [
      '................',
      '.UUUUUUUUUUUUUU.',
      '.UMUUUUYYUUUUMU.',
      '.UUUUUYYYYUUUUU.',
      '.UUYYUUYYUUYYUU.',
      '.UUUYYYYYYYYUUU.',
      '.UMUUYYYYYYUUMU.',
      '.UUUYYYYYYYYUUU.',
      '.UUYYUUYYUUYYUU.',
      '.UUUUUYYYYUUUUU.',
      '.UMUUUUYYUUUUMU.',
      '.UUUUUUUUUUUUUU.',
      '................',
    ],
  },
  stool: {
    d: [
      '................',
      '....RRRRRRRR....',
      '..RRRRRRRRRRRR..',
      '..RRRRRRRRRRRR..',
      '..RRrrrrrrrrRR..',
      '....dddddddd....',
      '.....d....d.....',
      '.....d....d.....',
      '....d......d....',
      '....d......d....',
      '...d........d...',
      '...d........d...',
      '..ee........ee..',
      '................',
    ],
  },
  rainbowCat: {
    d: [
      '.RK........KO...',
      'RRWK......KWYO..',
      'RWWWKKKKKKWWWY..',
      'GWWCWWWWWWCWWG..',
      'GWWWWWWWWWWWWB..',
      'BWWKWWWWWWKWWB..',
      'BWWWWMMMMWWWWU..',
      'UWWWWWWWWWWWWU..',
      '.MWWWWWWWWWWM...',
      '.MRRGGBBUUMMM..',
      '.MRRGGBBUUMMM..',
      '..KWWWWWWWWK....',
      '...KKKKKKKK.....',
      '................',
    ],
  },
  astronaut: {
    d: [
      '....KKKKKK......',
      '..KKWWWWWWKK....',
      '.KWWWWWWWWWWK...',
      'KWWKKKKKKKKWWK..',
      'KWKLLLLLLLLKWK..',
      'KWKLLLCCLLLLKWK.',
      'KWKLLLCCLLLLKWK.',
      'KWKLLLLLLLLKWK..',
      'KWWKKKKKKKKWWK..',
      '.KWWWWWWWWWWK...',
      '..KWWRRRRWWK....',
      '..KWWWWWWWWK....',
      '..KWWK..KWWK....',
      '..KKK....KKK....',
      '................',
    ],
  },
  miniCabinet: {
    d: [
      '..KKKKKKKKKK....',
      '..KMMMMMMMMK....',
      '..KMYYYYYYMK....',
      '..KKKKKKKKKK....',
      '..KBLLLLLLBK....',
      '..KBLCCGGLBK....',
      '..KBLLLLLLBK....',
      '..KBLLLLLLBK....',
      '..KKKKKKKKKK....',
      '..KMRoYoGBMK....',
      '..KMMMMMMMMK....',
      '..KMMMMMMMMK....',
      '..KKMMMMMMKK....',
      '...KK....KK.....',
      '................',
    ],
  },
  trophy: {
    d: [
      '.YYYYYYYYYYYY...',
      '.YKKKKKKKKKKY...',
      'YKYYYYYYYYYYKY..',
      'YKYYYYYYYYYYKY..',
      'YKYYYYYYYYYYKY..',
      'YKYYYYYYYYYYKY..',
      '.KYYYYYYYYYYK...',
      '..KYYYYYYYYK....',
      '...KYYYYYYK.....',
      '.....KYYK.......',
      '......YY........',
      '....YYYYYY......',
      '...YYYYYYYY.....',
      '..KKKKKKKKKK....',
      '................',
    ],
  },
  sunsetTheme: {
    d: [
      'UUUUUUUUUUUUUUUU',
      'UUUUUUUUUUUUUUUU',
      'MUUUUUUUUUUUUUUM',
      'MMUUUOOOOOUUUUMM',
      'MMMUOOOOOOOUUMMM',
      'RMMOOOOYOOOOMMR.',
      'RRMOOOYYYOOOMRR.',
      'RRROOOYYYOOORR..',
      'PPRRRRRRRRRRRPP.',
      'PPPPPRRRRRPPPPP.',
      'PPPPPPPPPPPPPPPP',
      'kkkkkkkkkkkkkkkk',
      '................',
    ],
  },
  neonCrown: {
    d: [
      '................',
      '.Y....Y....Y....',
      'YRY..YRY..YRY...',
      'YYY..YYY..YYY...',
      'YYYYYYYYYYYYYY..',
      'YCYYYMYYYMYYCY..',
      'YYYYYYYYYYYYYY..',
      'YYCYYYYCYYYYCY..',
      'YYYYYYYYYYYYYY..',
      'KKKKKKKKKKKKKK..',
      '................',
    ],
  },
  legendaryTrophy: {
    d: [
      'M.M.M.M.M.M.M.M.',
      '.YYYYYYYYYYYYYY.',
      'MYKKKKKKKKKKKKYM',
      'YKYWYYYYYYYYWYKY',
      'YKYYYYYYYYYYYYKY',
      'YKYWYYYYYYYYWYKY',
      'MYKYYYYYYYYYYKYM',
      '.MKYYYYYYYYYYKM.',
      '..MKYYYYYYYYKM..',
      '....MKYYYYKM....',
      '......YYYY......',
      '....UUUUUUUU....',
      '...UUUUUUUUUU...',
      '..MKKKKKKKKKKM..',
      '................',
    ],
  },
  dragonEgg: {
    d: [
      '......KKKK......',
      '....KKGGGGKK....',
      '...KGGCCGGCGK...',
      '..KGCCGGGGCCGK..',
      '..KGGGGCCGGGGK..',
      '.KGGCCGGGGCCGGK.',
      '.KGGGGGGCCGGGGK.',
      '.KGCCGGGGGGCCGK.',
      '.KGGGGGCCGGGGGK.',
      '..KGGCCGGGGCGK..',
      '..KGGGGGGGGGGK..',
      '...KGGGGGGGGK...',
      '....KKGGGGKK....',
      '......KKKK......',
      '................',
    ],
  },
  forestTheme: {
    d: [
      'kkkkkkkkkkkkkkkk',
      'kkYkkkkkkkYkkkkk',
      'kkkkkkYkkkkkkkkk',
      'k..GG....GG....k',
      'k.GGGG..GGGG...k',
      'kGGGGGGGGGGGG..k',
      'k.GGGG..GGGG...k',
      'k..NN....NN....k',
      'kGGNNGGGGNNGGG.k',
      'kGGGGGGGGGGGGG.k',
      'kNNNNNNNNNNNNNNk',
      'kgggggggggggggk',
      '................',
    ],
  },
  frame: {
    d: [
      'YYYYYYYYYYYYYY..',
      'YKKKKKKKKKKKKY..',
      'YK..........KY..',
      'YK..........KY..',
      'YK..........KY..',
      'YK..........KY..',
      'YK..........KY..',
      'YK..........KY..',
      'YK..........KY..',
      'YK..........KY..',
      'YKKKKKKKKKKKKY..',
      'YYYYYYYYYYYYYY..',
      '................',
    ],
  },
  plantSmall: {
    d: [
      '................',
      '.....G..G.......',
      '...G.GG.G.G.....',
      '...GGGGGGGG.....',
      '....GGGGGG......',
      '.....GGGG.......',
      '......NN........',
      '.....OOOO.......',
      '....OOOOOO......',
      '....OkkkkO......',
      '....OOOOOO......',
      '.....kkkk.......',
      '................',
    ],
  },
  mug: {
    d: [
      '................',
      '..WWWWWWWWW.....',
      '..WCCCCCCCW.WW..',
      '..WCWWWWCCWW..W.',
      '..WCWTTWCCW...W.',
      '..WCWTTWCCW..W..',
      '..WCWWWWCCWWW...',
      '..WCCCCCCCW.....',
      '..WCCCCCCCW.....',
      '..WWWWWWWWW.....',
      '...WWWWWWW......',
      '................',
    ],
  },
};
for (const k in SPRITES) {
  const sp = SPRITES[k];
  sp.w = spriteW(sp);
}

// Draw a sprite map at integer scale. Rows may be ragged; width is taken from
// the map. `tint` optionally overrides palette keys. A string `sprite` is
// looked up in the atlas.
export function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: Sprite | string,
  x: number,
  y: number,
  scale: number,
  tint?: Record<string, string>,
): void {
  const sp = typeof sprite === 'string' ? SPRITES[sprite] : sprite;
  const rows = sp.d;
  for (let ry = 0; ry < rows.length; ry++) {
    const line = rows[ry];
    for (let rx = 0; rx < line.length; rx++) {
      const ch = line[rx];
      if (ch === '.' || ch === ' ') continue;
      const col = (tint && tint[ch]) || PALETTE[ch];
      if (!col) continue;
      ctx.fillStyle = col;
      ctx.fillRect(x + rx * scale, y + ry * scale, scale, scale);
    }
  }
}

/** Bounding box of a sprite's VISIBLE pixels (many maps carry empty columns /
 * rows, so the drawn content is off-center within its nominal grid). Cached. */
function visibleBounds(sp: Sprite): { x0: number; y0: number; x1: number; y1: number } {
  const cached = (sp as unknown as { _vb?: { x0: number; y0: number; x1: number; y1: number } })._vb;
  if (cached) return cached;
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -1;
  let y1 = -1;
  for (let ry = 0; ry < sp.d.length; ry++) {
    const line = sp.d[ry];
    for (let rx = 0; rx < line.length; rx++) {
      const ch = line[rx];
      if (ch === '.' || ch === ' ') continue;
      if (rx < x0) x0 = rx;
      if (rx > x1) x1 = rx;
      if (ry < y0) y0 = ry;
      if (ry > y1) y1 = ry;
    }
  }
  const vb = x1 < 0 ? { x0: 0, y0: 0, x1: 0, y1: 0 } : { x0, y0, x1, y1 };
  (sp as unknown as { _vb?: typeof vb })._vb = vb;
  return vb;
}

/**
 * Draw a sprite CENTERED on (cx, cy) by its visible-pixel bounds — the right
 * way to place collectibles in display slots. `size` is the target size in
 * canvas px for the LARGER visible dimension; scale is derived (kept integer
 * when >= 1 so pixels stay crisp).
 */
export function drawSpriteCentered(
  ctx: CanvasRenderingContext2D,
  sprite: Sprite | string,
  cx: number,
  cy: number,
  size: number,
  tint?: Record<string, string>,
): void {
  const sp = typeof sprite === 'string' ? SPRITES[sprite] : sprite;
  const vb = visibleBounds(sp);
  const vw = vb.x1 - vb.x0 + 1;
  const vh = vb.y1 - vb.y0 + 1;
  const raw = size / Math.max(vw, vh);
  const scale = raw >= 1 ? Math.max(1, Math.floor(raw)) : raw;
  // Position so the VISIBLE box (not the nominal grid) centers on (cx, cy).
  const x = cx - ((vb.x0 + vw / 2) * scale);
  const y = cy - ((vb.y0 + vh / 2) * scale);
  drawSprite(ctx, sp, x, y, scale, tint);
}

// ---- Avatar ---------------------------------------------------------------

export const AVATAR: Sprite = {
  d: [
    '....KKKKKK....',
    '..KKRRRRRRKK..',
    '.KRRRRRRRRRRK.',
    '.KRRRRRRRRRRK.',
    'KKKKKKKKKKKKKK',
    'KSSSSSSSSSSSSK',
    'KSSKKSSSSKKSSK',
    'KSSKKSSSSKKSSK',
    'KSSSSSSSSSSSSK',
    'KSSSSSKKSSSSS K',
    'KSSSSSSSSSSSSK',
    '.KSSSKKKKSSSK.',
    '..KSSSSSSSSK..',
    '.KBBBBBBBBBBK.',
    'KBBBWBBBBWBBBK',
    'KBBBBBBBBBBBBK',
  ],
};
AVATAR.w = spriteW(AVATAR);

// A little full-body player who stands by the coin bank.
export function drawPlayer(ctx: CanvasRenderingContext2D, x: number, y: number, s: number): void {
  const put = (col: string | null, cx: number, cy: number, w: number, h: number): void => {
    if (!col) return;
    ctx.fillStyle = col;
    ctx.fillRect(x + cx * s, y + cy * s, w * s, h * s);
  };
  // cap
  put(PALETTE.R, 3, 0, 8, 2);
  put(PALETTE.r, 3, 2, 10, 1);
  put(PALETTE.O, 10, 2, 4, 1);
  // face
  put(PALETTE.S, 3, 3, 8, 4);
  put(PALETTE.K, 4, 4, 1, 1);
  put(PALETTE.K, 8, 4, 1, 1);
  put(PALETTE.s, 5, 6, 4, 1);
  // body / jacket
  put(PALETTE.B, 2, 7, 10, 7);
  put(PALETTE.b, 2, 7, 2, 7); // shade
  put(PALETTE.C, 5, 8, 4, 4); // zipper panel
  // backpack strap
  put(PALETTE.O, 9, 7, 1, 6);
  // arms
  put(PALETTE.B, 0, 8, 2, 5);
  put(PALETTE.B, 12, 8, 2, 5);
  put(PALETTE.S, 0, 13, 2, 1);
  put(PALETTE.S, 12, 13, 2, 1);
  // legs
  put(PALETTE.k, 3, 14, 3, 5);
  put(PALETTE.k, 8, 14, 3, 5);
  put(PALETTE.W, 3, 19, 3, 1);
  put(PALETTE.W, 8, 19, 3, 1);
}

// ---- Coin -----------------------------------------------------------------

export function drawCoin(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, squash?: number): void {
  const sq = squash == null ? 1 : squash; // 1..-1 for spin
  // Prefer the generated coin so every visible coin (HUD, project rows, shop
  // prices, coin bank, cabinet, and flying coin-rain) matches currency_coin.png.
  // The spin `squash` still animates by scaling the image width; the procedural
  // coin below is the fallback until the PNG decodes.
  const img = currencyIcon('coin');
  if (img) {
    const h = r * 2;
    const w = Math.max(2, h * Math.abs(sq));
    drawImageSmooth(ctx, img, cx - w / 2, cy - h / 2, w, h);
    return;
  }
  const rx = Math.max(1, Math.abs(r * sq));
  ctx.save();
  ctx.translate(cx, cy);
  // rim
  ctx.beginPath();
  ctx.ellipse(0, 0, rx, r, 0, 0, Math.PI * 2);
  ctx.fillStyle = sq < 0 ? '#c98f24' : '#e8b12a';
  ctx.fill();
  // face
  ctx.beginPath();
  ctx.ellipse(0, 0, rx * 0.74, r * 0.78, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#ffd23f';
  ctx.fill();
  // letter T
  if (rx > r * 0.45) {
    ctx.fillStyle = '#c98f24';
    const u = r * 0.28;
    ctx.fillRect(-u * sq, -u, u * 2 * Math.abs(sq), u * 0.7);
    ctx.fillRect(-u * 0.35 * sq, -u, u * 0.7 * Math.abs(sq), u * 2);
  }
  // glint
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillRect(-rx * 0.5, -r * 0.5, Math.max(1, rx * 0.22), Math.max(1, r * 0.3));
  ctx.restore();
}
