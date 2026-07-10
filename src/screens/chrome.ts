/*
 * chrome.ts — shared screen chrome. The secondary pages (capsule, project
 * detail, achievements) all use ONE back button so they read as the same UI
 * kit: the generated back_button plaque with the localized label in its window,
 * a procedural cyan pill only as a loading fallback, and a hotspot that matches
 * the drawn art.
 */

import type { ScreenContext } from './screen';
import { drawImageSmooth } from '../render/assets';
import { drawText, measureText, GLYPH_H } from '../render/pixelFont';
import { panel } from '../render/canvas';
import { FRAME_ANCHORS } from '../render/atlas';
import { t } from '../i18n';

const CYAN = '#5fe6d6';
const BACK = { x: 16, y: 16, w: 150 };

/** Draw the shared back button and register its 'back' hotspot. */
export function drawBackButton(g: CanvasRenderingContext2D, ctx: ScreenContext, onClick: () => void): void {
  const h = Math.round(BACK.w / FRAME_ANCHORS.backButton.aspect);
  const hovered = ctx.stage.hotspot({ x: BACK.x, y: BACK.y, w: BACK.w, h, cursor: 'pointer', id: 'back', onClick });
  const img = ctx.assets.get('achBackButton');
  if (img) {
    if (hovered) {
      g.save();
      g.shadowColor = CYAN;
      g.shadowBlur = 12;
      drawImageSmooth(g, img, BACK.x, BACK.y, BACK.w, h);
      g.restore();
    } else {
      drawImageSmooth(g, img, BACK.x, BACK.y, BACK.w, h);
    }
    // Label sits in the plaque's right window, past the baked arrow.
    const win = FRAME_ANCHORS.backButton.textWin;
    const label = t('ui.back');
    const w1 = Math.max(1, measureText(label, 1));
    const s = Math.max(1, Math.min(1.9, (BACK.w * win.w * 0.9) / w1));
    drawText(g, label, BACK.x + BACK.w * win.cx, BACK.y + h * win.cy - (GLYPH_H * s) / 2, s, CYAN, { align: 'center' });
  } else {
    panel(g, BACK.x, BACK.y, 120, 52, { radius: 10, fill: hovered ? '#2a1f4a' : '#1b1230', border: CYAN, borderWidth: 2 });
    drawText(g, '< ' + t('ui.back'), BACK.x + 60, BACK.y + 16, 2, CYAN, { align: 'center' });
  }
}
