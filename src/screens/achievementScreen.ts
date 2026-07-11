/*
 * achievementScreen.ts — the achievement showcase / trophy wall.
 *
 * A wall of generated trophy cards, not a settings list: each achievement gets
 * an ornate portrait card (card_unlocked.png lit gold, card_locked.png dim with
 * a baked padlock) holding its generated icon, name, and unlock date / lock
 * label. The header uses the generated title + progress + back-button plaques.
 * All display text is localized; unlock dates come from state.achievements.
 * Every generated frame has a procedural fallback so the screen stays readable
 * while art decodes.
 */

import { panel, rrect } from '../render/canvas';
import { drawText, wrapText, measureText, GLYPH_H } from '../render/pixelFont';
import { drawSpriteCentered } from '../render/sprites';
import { drawImageSmooth } from '../render/assets';
import type { AssetName } from '../render/assets';
import { drawIconCentered } from '../render/widgets';
import { FRAME_ANCHORS, achIconAsset } from '../render/atlas';
import type { FrameWindow } from '../render/atlas';
import { ACHIEVEMENTS } from '../content';
import { t, tAchName, tAchDesc, fmtDate } from '../i18n';
import { drawBackButton } from './chrome';
import { drawDemoPlaque } from '../render/demoPlaque';
import type { Screen, ScreenContext } from './screen';

const GOLD = '#ffd23f';
const CYAN = '#5fe6d6';
const INK = '#f6f4ff';
const MUTE = '#9a93bd';

// Card text sizes (bumped now that cards are larger — see Task B / finding #6).
const NAME_SCALE = 1.8; // achievement name (wrapped to ≤2 lines)
const NAME_STEP = 24; // vertical step between the two name lines
const META_SCALE = 1.5; // unlock-date / lock label (fitLine auto-shrinks to fit)

// 3x3 wall of portrait trophy cards (card art aspect 283/450 ≈ 0.629). Cards are
// sized to fill the space under the header without overflowing the 1000px stage:
// the header (title/progress/back plaques) owns the top ~190px, so the grid sits
// just below it and the tallest packing is GRID_Y + 3*CARD_H + 2*GAP_Y ≤ 995.
const COLS = 3;
const CARD_H = 258;
const CARD_W = Math.round(CARD_H * (283 / 450)); // 162
const GAP_X = 130;
const GAP_Y = 14;
const GRID_W = COLS * CARD_W + (COLS - 1) * GAP_X; // 746
const GRID_X = Math.round((1600 - GRID_W) / 2); // 427 — recentre the wider grid
const GRID_Y = 192; // 192 + 3*258 + 2*14 = 994 ≤ 995

export class AchievementScreen implements Screen {
  readonly name = 'achievements';

  constructor(private readonly ctx: ScreenContext) {}

  render(g: CanvasRenderingContext2D): void {
    const store = this.ctx.store;
    const W = this.ctx.stage.width;
    const H = this.ctx.stage.height;

    // Background wash — a warm trophy-room vignette rather than a flat page.
    g.fillStyle = '#0a0713';
    g.fillRect(0, 0, W, H);
    const grad = g.createRadialGradient(800, 300, 60, 800, 320, 940);
    grad.addColorStop(0, 'rgba(70,48,120,0.4)');
    grad.addColorStop(1, 'rgba(6,4,12,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, W, H);

    drawBackButton(g, this.ctx, () => this.ctx.router.back());
    drawDemoPlaque(g, this.ctx, 1110, 20, 156);
    this.drawTitle(g);
    this.drawProgress(g, store);

    // The hovered card's description is drawn AFTER the grid so its tooltip sits
    // on top of any neighbouring cards it overlaps.
    let tip: { id: string; x: number; y: number } | null = null;
    for (let i = 0; i < ACHIEVEMENTS.length; i++) {
      const a = ACHIEVEMENTS[i];
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x = GRID_X + col * (CARD_W + GAP_X);
      const y = GRID_Y + row * (CARD_H + GAP_Y);
      const iso = store.state.achievements[a.id];
      const hovered = this.ctx.stage.hotspot({ x, y, w: CARD_W, h: CARD_H, cursor: 'default', id: 'ach-' + a.id });
      this.drawCard(g, a.id, a.sprite, !!iso, iso ?? null, x, y, hovered);
      if (hovered) tip = { id: a.id, x, y };
    }
    if (tip) this.drawTooltip(g, tip.id, tip.x, tip.y);
  }

  // ---- header -------------------------------------------------------------

  private drawTitle(g: CanvasRenderingContext2D): void {
    const w = 330;
    const h = Math.round(w / FRAME_ANCHORS.titlePlaque.aspect); // ~185
    const x = Math.round(800 - w / 2);
    const y = 2;
    const img = this.ctx.assets.get('achTitlePlaque');
    if (img) {
      drawImageSmooth(g, img, x, y, w, h);
      this.frameText(g, t('ui.achievements'), x, y, w, h, FRAME_ANCHORS.titlePlaque.textWin, 3, GOLD, GOLD);
    } else {
      drawText(g, t('ui.achievements'), 800, 28, 4.5, GOLD, { align: 'center', glow: GOLD, glowBlur: 5, shadow: 'rgba(0,0,0,0.5)' });
    }
  }

  private drawProgress(g: CanvasRenderingContext2D, store: ScreenContext['store']): void {
    const total = ACHIEVEMENTS.length;
    const unlocked = ACHIEVEMENTS.filter((a) => store.state.achievements[a.id]).length;
    const label = t('ui.unlockedCount', { n: unlocked, total });
    const w = 300;
    const h = Math.round(w / FRAME_ANCHORS.progressPlaque.aspect); // ~76
    const x = 1600 - w - 24;
    const y = 58;
    const img = this.ctx.assets.get('achProgressPlaque');
    if (img) {
      drawImageSmooth(g, img, x, y, w, h);
      this.frameText(g, label, x, y, w, h, FRAME_ANCHORS.progressPlaque.textWin, 2.1, CYAN, '#2f9fa0');
    } else {
      drawText(g, label, 800, 96, 2.25, CYAN, { align: 'center', glow: '#2f9fa0', glowBlur: 3 });
    }
  }

  // ---- trophy card --------------------------------------------------------

  private drawCard(
    g: CanvasRenderingContext2D,
    id: string,
    sprite: string,
    unlocked: boolean,
    iso: string | null,
    x: number,
    y: number,
    hovered: boolean,
  ): void {
    const cardAsset: AssetName = unlocked ? 'achCardUnlocked' : 'achCardLocked';
    const img = this.ctx.assets.get(cardAsset);
    if (!img) {
      this.drawCardProcedural(g, id, sprite, unlocked, iso, x, y, hovered);
      return;
    }
    const A = unlocked ? FRAME_ANCHORS.cardUnlocked : FRAME_ANCHORS.cardLocked;

    // Card frame (never tinted). A soft hover glow lifts the focused card.
    if (hovered && unlocked) {
      g.save();
      g.shadowColor = GOLD;
      g.shadowBlur = 26;
      drawImageSmooth(g, img, x, y, CARD_W, CARD_H);
      g.restore();
    } else {
      drawImageSmooth(g, img, x, y, CARD_W, CARD_H);
    }

    // Generated achievement icon inside the display window (dimmed for locked;
    // the padlock is already baked into card_locked, so no extra lock overlay).
    const icon = this.ctx.assets.get(achIconAsset(id));
    const iconCx = x + CARD_W * A.icon.cx;
    const iconCy = y + CARD_H * A.icon.cy;
    if (icon) {
      if (unlocked) {
        drawIconCentered(g, icon, iconCx, iconCy, CARD_W * 0.5);
      } else {
        g.save();
        g.globalAlpha = 0.32;
        drawIconCentered(g, icon, iconCx, iconCy, CARD_W * 0.46);
        g.restore();
      }
    } else {
      drawSpriteCentered(g, sprite, iconCx, iconCy, CARD_W * 0.44);
    }

    // Name — wrapped to at most two centered lines inside the window. Bumped to
    // scale 1.8 now that the cards are larger; long localized names still fold to
    // two lines within the 0.82-width window (wrap width matches the draw scale).
    const nameLines = wrapText(tAchName(id), NAME_SCALE, CARD_W * 0.82).slice(0, 2);
    let ny = y + CARD_H * A.name.cy - (nameLines.length - 1) * (NAME_STEP / 2);
    for (const line of nameLines) {
      drawText(g, line, x + CARD_W * 0.5, ny, NAME_SCALE, unlocked ? INK : '#8f8ab0', {
        align: 'center',
        glow: unlocked ? GOLD : undefined,
        glowBlur: 2,
        shadow: 'rgba(0,0,0,0.55)',
      });
      ny += NAME_STEP;
    }

    // Unlock date (unlocked) or lock label (locked), auto-fit to one line.
    if (unlocked && iso) {
      this.fitLine(g, t('ui.unlockedOn', { date: fmtDate(iso) }), x + CARD_W * 0.5, y + CARD_H * ('date' in A ? A.date.cy : 0.75), CARD_W * 0.86, META_SCALE, GOLD, GOLD);
    } else {
      const cy = 'locked' in A ? A.locked.cy : 0.72;
      this.fitLine(g, t('ui.lockedAchievement'), x + CARD_W * 0.5, y + CARD_H * cy, CARD_W * 0.86, META_SCALE, MUTE);
    }
  }

  /** Procedural fallback card (art still loading) — a lit/dim plaque. */
  private drawCardProcedural(
    g: CanvasRenderingContext2D,
    id: string,
    sprite: string,
    unlocked: boolean,
    iso: string | null,
    x: number,
    y: number,
    hovered: boolean,
  ): void {
    const accent = unlocked ? GOLD : '#4a4270';
    g.save();
    if (unlocked) {
      g.shadowColor = GOLD;
      g.shadowBlur = hovered ? 20 : 10;
    }
    rrect(g, x, y, CARD_W, CARD_H, 14);
    g.fillStyle = unlocked ? 'rgba(30,22,10,0.92)' : 'rgba(16,12,26,0.9)';
    g.fill();
    g.restore();
    rrect(g, x, y, CARD_W, CARD_H, 14);
    g.strokeStyle = accent;
    g.lineWidth = unlocked ? 3 : 2;
    g.stroke();

    const cx = x + CARD_W / 2;
    if (unlocked) {
      drawSpriteCentered(g, sprite, cx, y + CARD_H * 0.34, CARD_W * 0.46);
    } else {
      g.save();
      g.globalAlpha = 0.3;
      drawSpriteCentered(g, sprite, cx, y + CARD_H * 0.34, CARD_W * 0.42);
      g.restore();
    }
    const nameLines = wrapText(tAchName(id), NAME_SCALE, CARD_W * 0.82).slice(0, 2);
    let ny = y + CARD_H * 0.56 - (nameLines.length - 1) * (NAME_STEP / 2);
    for (const line of nameLines) {
      drawText(g, line, cx, ny, NAME_SCALE, unlocked ? INK : '#8a86a6', { align: 'center', glow: unlocked ? GOLD : undefined, glowBlur: 2 });
      ny += NAME_STEP;
    }
    if (unlocked && iso) {
      this.fitLine(g, t('ui.unlockedOn', { date: fmtDate(iso) }), cx, y + CARD_H * 0.78, CARD_W * 0.86, META_SCALE, GOLD, GOLD);
    } else {
      this.fitLine(g, t('ui.lockedAchievement'), cx, y + CARD_H * 0.78, CARD_W * 0.86, META_SCALE, MUTE);
    }
  }

  // ---- hover tooltip ------------------------------------------------------

  /** Hovered-card tooltip: a compact dark rounded panel holding the wrapped
   * achievement description (CJK-safe via drawText). Shown for locked cards too,
   * so the panel teases the goal. Sits just below the card, flipping above when
   * it would run past the bottom edge, and is clamped inside the viewport. */
  private drawTooltip(g: CanvasRenderingContext2D, id: string, cardX: number, cardY: number): void {
    const desc = tAchDesc(id);
    if (!desc) return;
    const W = this.ctx.stage.width;
    const H = this.ctx.stage.height;

    const scale = 1.5;
    const padX = 14;
    const padY = 12;
    const maxTextW = 300;
    const lines = wrapText(desc, scale, maxTextW);
    // A line band tall enough for both the bitmap glyph and the (taller) CJK px.
    const lineH = Math.max(Math.round(GLYPH_H * scale), Math.round(scale * 8));
    const lineStep = lineH + 6;
    let textW = 0;
    for (const line of lines) textW = Math.max(textW, measureText(line, scale));
    const boxW = Math.round(Math.min(maxTextW, textW)) + padX * 2;
    const boxH = padY * 2 + (lines.length - 1) * lineStep + lineH;

    // Centre on the card, prefer below, flip above near the bottom, then clamp.
    const edge = 12;
    const gap = 12;
    let boxX = Math.round(cardX + CARD_W / 2 - boxW / 2);
    boxX = Math.max(edge, Math.min(W - boxW - edge, boxX));
    let boxY = cardY + CARD_H + gap;
    if (boxY + boxH > H - edge) boxY = cardY - gap - boxH;
    boxY = Math.max(edge, Math.min(H - boxH - edge, boxY));

    panel(g, boxX, boxY, boxW, boxH, { radius: 10, fill: 'rgba(10,7,20,0.96)', border: CYAN, borderWidth: 2 });
    let ty = boxY + padY;
    for (const line of lines) {
      drawText(g, line, boxX + boxW / 2, ty, scale, INK, { align: 'center', shadow: 'rgba(0,0,0,0.6)' });
      ty += lineStep;
    }
  }

  // ---- text helpers -------------------------------------------------------

  /** Draw `text` centered in a frame's content window, auto-fit to both axes. */
  private frameText(
    g: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    w: number,
    h: number,
    win: FrameWindow,
    maxScale: number,
    color: string,
    glow?: string,
  ): void {
    const maxW = w * win.w * 0.94;
    const maxH = h * win.h * 0.86;
    const w1 = Math.max(1, measureText(text, 1));
    let s = Math.min(maxScale, maxH / GLYPH_H, maxW / w1);
    s = Math.max(1, s);
    drawText(g, text, x + w * win.cx, y + h * win.cy - (GLYPH_H * s) / 2, s, color, { align: 'center', glow, glowBlur: 3 });
  }

  /** Draw one centered line at vertical center `cy`, shrinking to fit `maxW`. */
  private fitLine(g: CanvasRenderingContext2D, text: string, cx: number, cy: number, maxW: number, maxScale: number, color: string, glow?: string): void {
    const w1 = Math.max(1, measureText(text, 1));
    const s = Math.max(0.9, Math.min(maxScale, maxW / w1));
    drawText(g, text, cx, cy - (GLYPH_H * s) / 2, s, color, { align: 'center', glow, glowBlur: glow ? 2 : 0 });
  }
}
