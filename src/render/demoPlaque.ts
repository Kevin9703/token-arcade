/*
 * demoPlaque.ts — persistent, in-world demo identity for the fictional arcade.
 *
 * This intentionally uses a small riveted HUD plaque instead of a web-style
 * badge. It is interactive: hover gives the plain-language disclosure and a
 * click opens the full help surface, which repeats the same promise for touch
 * and keyboard users.
 */

import { panel, rrect } from './canvas';
import { drawText, measureText, wrapText, GLYPH_H } from './pixelFont';
import { t } from '../i18n';
import type { ScreenContext } from '../screens/screen';

const CYAN = '#5fe6d6';
const GOLD = '#ffd23f';
const INK = '#f6f4ff';

/** Draw nothing outside demo mode. `x/y` are chosen per screen to sit beside
 * its top HUD rather than becoming a floating status badge. */
export function drawDemoPlaque(g: CanvasRenderingContext2D, ctx: ScreenContext, x: number, y: number, w = 156): void {
  if (ctx.store.state.mode !== 'demo') return;
  const h = 34;
  const hovered = ctx.stage.hotspot({
    x,
    y,
    w,
    h,
    cursor: 'help',
    id: 'demo-identity',
    onClick: () => ctx.openHelp(),
  });

  if (hovered) {
    g.save();
    g.shadowColor = CYAN;
    g.shadowBlur = 14;
    panel(g, x, y, w, h, { radius: 6, fill: '#102337', border: CYAN, borderWidth: 2 });
    g.restore();
  } else {
    panel(g, x, y, w, h, { radius: 6, fill: '#102337', border: '#2f9fa0', borderWidth: 2 });
  }

  // Small game-token indicator at the left: three active cyan arcade lamps.
  for (let i = 0; i < 3; i++) {
    g.fillStyle = i === 1 ? GOLD : CYAN;
    g.fillRect(x + 9 + i * 6, y + 13, 3, 8);
  }
  const label = t('ui.demoArcade');
  const maxW = w - 36;
  const scale = Math.max(1.05, Math.min(1.55, maxW / Math.max(1, measureText(label, 1))));
  drawText(g, label, x + 31, y + (h - GLYPH_H * scale) / 2, scale, INK, { glow: CYAN, glowBlur: 2 });

  if (!hovered) return;
  const message = t('ui.demoDisclosure');
  const lines = wrapText(message, 1.25, 250);
  const tipW = 278;
  const lineH = Math.max(11, GLYPH_H * 1.25);
  const tipH = 18 + lines.length * (lineH + 4);
  const tipX = Math.max(12, Math.min(ctx.stage.width - tipW - 12, x + w - tipW));
  const tipY = Math.min(ctx.stage.height - tipH - 12, y + h + 10);
  panel(g, tipX, tipY, tipW, tipH, { radius: 8, fill: 'rgba(10,7,20,0.97)', border: CYAN, borderWidth: 2 });
  let ty = tipY + 10;
  for (const line of lines) {
    drawText(g, line, tipX + 12, ty, 1.25, INK, { shadow: 'rgba(0,0,0,0.7)' });
    ty += lineH + 4;
  }
  // A tiny riveted bottom edge ties the tooltip back to the physical plaque.
  g.fillStyle = 'rgba(255,210,63,0.55)';
  rrect(g, tipX + 10, tipY + tipH - 5, tipW - 20, 2, 1);
  g.fill();
}

