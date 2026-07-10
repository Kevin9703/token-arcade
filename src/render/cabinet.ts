/*
 * cabinet.ts — procedural arcade cabinets and their screen mini-scenes.
 *
 * Cabinets are drawn in code (not sprites) because they change with game
 * state: level lights up more marquee bulbs, brightens the neon, and adds a
 * crown of stars at max level, and each project is tinted with its own skin.
 */

import type { CabinetOpts, CabinetSkin } from '../core/types';
import { rrect, vgrad, bulb } from './canvas';
import { drawText } from './pixelFont';
import { drawCoin } from './sprites';

type SceneFn = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => void;

// ---- Screen mini-scenes for cabinets --------------------------------------
// Each fills a small dark screen with a recognizable pixel vignette.

const SCENES: Record<string, SceneFn> = {
  lab(ctx, x, y, w, h) {
    bg(ctx, x, y, w, h, '#0e1630', '#1b2a52');
    rect(ctx, x + w * 0.4, y + h * 0.3, w * 0.2, h * 0.5, '#5fe6d6');
    rect(ctx, x + w * 0.42, y + h * 0.2, w * 0.16, h * 0.14, '#5fd66f');
    rect(ctx, x + w * 0.2, y + h * 0.55, w * 0.12, h * 0.25, '#ff9a3c');
    star(ctx, x + w * 0.75, y + h * 0.25, '#ffd23f');
  },
  shop(ctx, x, y, w, h) {
    bg(ctx, x, y, w, h, '#241030', '#3a1b48');
    rect(ctx, x + w * 0.2, y + h * 0.35, w * 0.6, h * 0.45, '#8a5a3c');
    // awning stripes
    for (let i = 0; i < 5; i++)
      rect(ctx, x + w * (0.2 + i * 0.12), y + h * 0.3, w * 0.06, h * 0.08, i % 2 ? '#ef5d78' : '#f6f4ff');
    rect(ctx, x + w * 0.44, y + h * 0.55, w * 0.12, h * 0.25, '#ffd23f');
  },
  forest(ctx, x, y, w, h) {
    bg(ctx, x, y, w, h, '#0c1e18', '#123a2a');
    tree(ctx, x + w * 0.3, y + h * 0.4, w * 0.16, h * 0.4);
    tree(ctx, x + w * 0.6, y + h * 0.35, w * 0.2, h * 0.5);
    rect(ctx, x, y + h * 0.82, w, h * 0.18, '#2f8f4b');
  },
  rocket(ctx, x, y, w, h) {
    bg(ctx, x, y, w, h, '#0a0a20', '#1a1040');
    star(ctx, x + w * 0.2, y + h * 0.2, '#f6f4ff');
    star(ctx, x + w * 0.8, y + h * 0.3, '#5fe6d6');
    rect(ctx, x + w * 0.46, y + h * 0.2, w * 0.08, h * 0.4, '#f6f4ff');
    tri(ctx, x + w * 0.5, y + h * 0.12, w * 0.08, h * 0.1, '#ef5d78');
    rect(ctx, x + w * 0.46, y + h * 0.6, w * 0.03, h * 0.2, '#ff9a3c');
    rect(ctx, x + w * 0.51, y + h * 0.6, w * 0.03, h * 0.22, '#ffd23f');
  },
  city(ctx, x, y, w, h) {
    bg(ctx, x, y, w, h, '#120a28', '#2a184a');
    for (let i = 0; i < 5; i++) {
      const bw = w * 0.16;
      const bh = h * (0.3 + ((i * 37) % 5) * 0.1);
      rect(ctx, x + w * 0.06 + i * bw, y + h - bh, bw * 0.82, bh, '#3a2a6a');
      for (let j = 0; j < 3; j++)
        rect(ctx, x + w * 0.09 + i * bw + j * bw * 0.24, y + h - bh + h * 0.06, bw * 0.12, h * 0.06, '#ffd23f');
    }
  },
  maze(ctx, x, y, w, h) {
    bg(ctx, x, y, w, h, '#08081e', '#101038');
    ctx.strokeStyle = '#4aa3ff';
    ctx.lineWidth = Math.max(1, w * 0.03);
    ctx.strokeRect(x + w * 0.15, y + h * 0.2, w * 0.7, h * 0.6);
    ctx.strokeRect(x + w * 0.3, y + h * 0.35, w * 0.4, h * 0.3);
    dot(ctx, x + w * 0.22, y + h * 0.27, w * 0.04, '#ffd23f');
    dot(ctx, x + w * 0.5, y + h * 0.5, w * 0.06, '#ef5d78');
  },
  castle(ctx, x, y, w, h) {
    bg(ctx, x, y, w, h, '#1a1030', '#301a4a');
    rect(ctx, x + w * 0.25, y + h * 0.35, w * 0.5, h * 0.45, '#6a6a86');
    for (let i = 0; i < 4; i++) rect(ctx, x + w * (0.25 + i * 0.14), y + h * 0.28, w * 0.08, h * 0.1, '#6a6a86');
    rect(ctx, x + w * 0.44, y + h * 0.55, w * 0.12, h * 0.25, '#160f1f');
    flag(ctx, x + w * 0.5, y + h * 0.18, '#ef5d78');
  },
  wave(ctx, x, y, w, h) {
    bg(ctx, x, y, w, h, '#04121e', '#0a3a4a');
    ctx.strokeStyle = '#5fe6d6';
    ctx.lineWidth = Math.max(1, h * 0.04);
    for (let r = 0; r < 3; r++) {
      ctx.beginPath();
      for (let i = 0; i <= 10; i++) {
        const px = x + (w * i) / 10;
        const py = y + h * (0.5 + r * 0.16) + Math.sin(i * 0.9 + r) * h * 0.06;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  },
};
const SCENE_KEYS = Object.keys(SCENES);

// ---- Scene primitives -----------------------------------------------------

function bg(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, top: string, bot: string): void {
  vgrad(ctx, x, y, w, h, top, bot);
}
function rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: string): void {
  ctx.fillStyle = c;
  ctx.fillRect(x | 0, y | 0, Math.ceil(w), Math.ceil(h));
}
function dot(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, c: string): void {
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
}
function star(ctx: CanvasRenderingContext2D, cx: number, cy: number, c: string): void {
  ctx.fillStyle = c;
  ctx.fillRect(cx - 1, cy - 3, 2, 6);
  ctx.fillRect(cx - 3, cy - 1, 6, 2);
}
function tri(ctx: CanvasRenderingContext2D, cx: number, top: number, w: number, h: number, c: string): void {
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.moveTo(cx, top);
  ctx.lineTo(cx - w, top + h);
  ctx.lineTo(cx + w, top + h);
  ctx.fill();
}
function tree(ctx: CanvasRenderingContext2D, cx: number, top: number, w: number, h: number): void {
  ctx.fillStyle = '#2f8f4b';
  tri(ctx, cx, top, w, h * 0.6, '#2f8f4b');
  tri(ctx, cx, top + h * 0.3, w, h * 0.6, '#5fd66f');
  ctx.fillStyle = '#5c3a26';
  ctx.fillRect(cx - w * 0.15, top + h * 0.8, w * 0.3, h * 0.2);
}
function flag(ctx: CanvasRenderingContext2D, cx: number, top: number, c: string): void {
  ctx.fillStyle = '#160f1f';
  ctx.fillRect(cx, top, 2, 14);
  ctx.fillStyle = c;
  ctx.fillRect(cx + 2, top, 8, 6);
}

// ---- Cabinet skins --------------------------------------------------------
// Per-project accent set. Cabinets are tinted so each project reads as its
// own machine, like the prototype's blue/red/purple/teal line-up.

export const SKINS: CabinetSkin[] = [
  { neon: '#4aa3ff', dark: '#12233f', mid: '#1c3a63', name: '#8fd0ff' },
  { neon: '#ef5d78', dark: '#3a1220', mid: '#5e1c31', name: '#ff9db0' },
  { neon: '#9a6cff', dark: '#231143', mid: '#38206a', name: '#c3a6ff' },
  { neon: '#5fe6d6', dark: '#0c2e2c', mid: '#12433f', name: '#a6f2e8' },
  { neon: '#5fd66f', dark: '#12331c', mid: '#1c5230', name: '#aef2b4' },
  { neon: '#ffd23f', dark: '#3a2c0a', mid: '#5e4712', name: '#ffe58f' },
  { neon: '#ff8fce', dark: '#3a1230', mid: '#5e1c4c', name: '#ffc3e8' },
  { neon: '#ff9a3c', dark: '#3a2010', mid: '#5e3418', name: '#ffca8f' },
];

// Deterministic skin/scene from a project id so it's stable across reloads.
export function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
export function skinFor(id: string): CabinetSkin {
  return SKINS[hashStr(id) % SKINS.length];
}
export function sceneFor(id: string): string {
  return SCENE_KEYS[hashStr(id + 'x') % SCENE_KEYS.length];
}

/*
 * drawCabinet — the heart of the room. Renders one arcade cabinet whose
 * flourish scales with `level`: more marquee bulbs light up, the neon gets
 * brighter, and a crown of stars appears at max level.
 * opts: { name, level, id, glow(0..1), progress(0..1) }
 */
export function drawCabinet(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, opts: CabinetOpts): void {
  const skin = opts.skin || skinFor(opts.id || opts.name);
  const scene = SCENES[opts.scene || sceneFor(opts.id || opts.name)];
  const level = Math.max(1, Math.min(5, opts.level || 1));
  const glow = opts.glow == null ? 1 : opts.glow;
  const on = opts.on !== false;

  ctx.save();
  // Cabinet body
  rrect(ctx, x, y + h * 0.08, w, h * 0.92, Math.min(10, w * 0.06));
  ctx.fillStyle = '#0d0a16';
  ctx.fill();
  // Side accent panels
  ctx.fillStyle = skin.mid;
  ctx.fillRect(x + 2, y + h * 0.12, w * 0.1, h * 0.82);
  ctx.fillRect(x + w - 2 - w * 0.1, y + h * 0.12, w * 0.1, h * 0.82);

  // Neon outline, brighter at higher level
  ctx.save();
  ctx.shadowColor = skin.neon;
  ctx.shadowBlur = (6 + level * 3) * glow * (on ? 1 : 0.2);
  ctx.strokeStyle = on ? skin.neon : '#2a2440';
  ctx.lineWidth = 2 + Math.round(level / 3);
  rrect(ctx, x + 1, y + h * 0.09, w - 2, h * 0.9, Math.min(10, w * 0.06));
  ctx.stroke();
  ctx.restore();

  // Marquee
  const my = y + h * 0.02;
  const mh = h * 0.14;
  rrect(ctx, x + w * 0.06, my, w * 0.88, mh, 4);
  vgrad(ctx, x + w * 0.06, my, w * 0.88, mh, skin.mid, skin.dark);
  ctx.fill();
  ctx.save();
  ctx.beginPath();
  rrect(ctx, x + w * 0.06, my, w * 0.88, mh, 4);
  ctx.clip();
  const label = String(opts.name || '').slice(0, 12);
  const fs = Math.max(1, Math.floor((w * 0.8) / (label.length * 6)));
  drawText(ctx, label, x + w / 2, my + mh / 2 - fs * 3.5, fs, on ? skin.name : '#4a4460', {
    align: 'center',
    glow: on ? skin.neon : null,
    glowBlur: 3,
  });
  ctx.restore();
  // Marquee bulbs — lit count scales with level (out of ~ up to 8)
  const bulbs = 8;
  const litCount = on ? Math.round((level / 5) * bulbs) : 0;
  for (let i = 0; i < bulbs; i++) {
    const bx = x + w * 0.1 + (i * (w * 0.8)) / (bulbs - 1);
    bulb(ctx, bx, my - 2, Math.max(1.5, w * 0.012), skin.neon, i < litCount);
  }

  // Screen
  const sx = x + w * 0.16;
  const sy = y + h * 0.2;
  const sw = w * 0.68;
  const sh = h * 0.34;
  ctx.fillStyle = '#05060f';
  ctx.fillRect(sx - 3, sy - 3, sw + 6, sh + 6);
  ctx.save();
  ctx.beginPath();
  ctx.rect(sx, sy, sw, sh);
  ctx.clip();
  if (on) scene(ctx, sx, sy, sw, sh);
  else {
    ctx.fillStyle = '#05060f';
    ctx.fillRect(sx, sy, sw, sh);
  }
  // scanline sheen
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  for (let syy = sy; syy < sy + sh; syy += 3) ctx.fillRect(sx, syy, sw, 1);
  ctx.restore();
  // screen glare
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx + sw * 0.4, sy);
  ctx.lineTo(sx, sy + sh * 0.5);
  ctx.fill();

  // Control panel
  const py = y + h * 0.58;
  vgrad(ctx, x + w * 0.12, py, w * 0.76, h * 0.12, skin.mid, '#0d0a16');
  // joystick
  ctx.fillStyle = '#160f1f';
  ctx.fillRect(x + w * 0.24, py + h * 0.05, 3, h * 0.05);
  bulb(ctx, x + w * 0.245, py + h * 0.04, Math.max(2, w * 0.018), '#ef5d78', true);
  // buttons
  const btnCols = ['#ef5d78', '#ffd23f', '#5fd66f'];
  for (let i = 0; i < 3; i++) bulb(ctx, x + w * (0.4 + i * 0.08), py + h * 0.06, Math.max(1.5, w * 0.014), btnCols[i], on);
  // token coin on panel
  if (on) drawCoin(ctx, x + w * 0.72, py + h * 0.06, Math.max(3, w * 0.03), 1);

  // Level plate
  const ly = y + h * 0.72;
  rrect(ctx, x + w * 0.3, ly, w * 0.4, h * 0.08, 3);
  ctx.fillStyle = '#0d0a16';
  ctx.fill();
  ctx.strokeStyle = on ? skin.neon : '#2a2440';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  const lvlFs = Math.max(1, Math.floor(w * 0.02));
  drawText(ctx, 'LVL ' + level, x + w / 2, ly + h * 0.04 - lvlFs * 3.5, lvlFs, on ? skin.neon : '#4a4460', {
    align: 'center',
  });

  // Token progress bar (near bottom, like the prototype's TOKENS n/n)
  if (opts.progress != null) {
    const gy = y + h * 0.84;
    const gx = x + w * 0.16;
    const gw = w * 0.68;
    const gh = h * 0.05;
    ctx.fillStyle = '#05060f';
    ctx.fillRect(gx, gy, gw, gh);
    ctx.fillStyle = on ? '#5fd66f' : '#2a2440';
    ctx.fillRect(gx + 1, gy + 1, Math.max(0, (gw - 2) * Math.min(1, opts.progress)), gh - 2);
    ctx.strokeStyle = '#160f1f';
    ctx.lineWidth = 1;
    ctx.strokeRect(gx, gy, gw, gh);
  }

  // Max-level crown of stars
  if (level >= 5 && on) {
    for (let i = 0; i < 3; i++) star(ctx, x + w * (0.3 + i * 0.2), my - 6, '#ffd23f');
  }
  ctx.restore();
}
