/*
 * hud.ts — the shared top-right counters. Home, capsule, and project-detail all
 * draw the SAME generated coin/token plaques here so the HUD language is
 * consistent across screens (PM QA 2026-07-09). The balance auto-fits the dark
 * recessed window of the plaque; if the art hasn't decoded yet a rounded-panel
 * fallback keeps the number readable.
 */

import type { AssetStore } from './assets';
import { drawImageSmooth } from './assets';
import { drawText, measureText, GLYPH_H } from './pixelFont';
import { rrect } from './canvas';
import { drawCoin, drawSprite } from './sprites';
import { FRAME_ANCHORS } from './atlas';

const GOLD = '#ffd23f';
const TOKEN_GLOW = '#9a6cff';
const INK = '#f6f4ff';

/** Plaque height for a given HUD width (coin_hud / token_hud share an aspect). */
export function hudPlaqueHeight(w: number): number {
  return Math.round(w / FRAME_ANCHORS.hudPlaque.aspect);
}

/** Fit a scale so `value` fits the plaque's dark window, both axes, capped. */
function fitNumber(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, value: string, color: string, glow: string): void {
  const win = FRAME_ANCHORS.hudPlaque.textWin;
  const maxW = w * win.w * 0.94;
  const maxH = h * win.h * 0.8;
  const w1 = Math.max(1, measureText(value, 1));
  let s = Math.min(maxH / GLYPH_H, maxW / w1);
  s = Math.max(1, Math.min(3.4, s));
  const cx = x + w * win.cx;
  const top = y + h * win.cy - (GLYPH_H * s) / 2;
  drawText(g, value, cx, top, s, color, { align: 'center', glow, glowBlur: 3 });
}

/** Top-right COIN counter: coin_hud_plaque + balance in its window. Returns the
 *  drawn height so callers can stack the token plaque beneath it. */
export function drawCoinHud(g: CanvasRenderingContext2D, assets: AssetStore, x: number, y: number, w: number, value: string): number {
  const h = hudPlaqueHeight(w);
  const img = assets.get('coinHudPlaque');
  if (img) {
    drawImageSmooth(g, img, x, y, w, h);
    fitNumber(g, x, y, w, h, value, GOLD, GOLD);
  } else {
    rrect(g, x, y, w, h, h * 0.26);
    g.fillStyle = 'rgba(12,8,24,0.92)';
    g.fill();
    g.strokeStyle = GOLD;
    g.lineWidth = 3;
    g.stroke();
    drawCoin(g, x + h * 0.52, y + h * 0.5, h * 0.3);
    fitNumber(g, x, y, w, h, value, GOLD, GOLD);
  }
  return h;
}

/** Top-right TOKEN counter: token_hud_plaque + lifetime total in its window. */
export function drawTokenHud(g: CanvasRenderingContext2D, assets: AssetStore, x: number, y: number, w: number, value: string): number {
  const h = hudPlaqueHeight(w);
  const img = assets.get('tokenHudPlaque');
  if (img) {
    drawImageSmooth(g, img, x, y, w, h);
    fitNumber(g, x, y, w, h, value, INK, TOKEN_GLOW);
  } else {
    rrect(g, x, y, w, h, h * 0.26);
    g.fillStyle = 'rgba(12,8,24,0.92)';
    g.fill();
    g.strokeStyle = TOKEN_GLOW;
    g.lineWidth = 3;
    g.stroke();
    drawSprite(g, 'tokenChip', x + h * 0.28, y + h * 0.26, h * 0.055);
    fitNumber(g, x, y, w, h, value, INK, TOKEN_GLOW);
  }
  return h;
}
