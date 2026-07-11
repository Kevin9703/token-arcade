/*
 * cabinetScreen.ts — the project inspection bay. Clicking a project walks you up
 * to that project's *personal* arcade cabinet: a big machine on the left whose
 * color reflects its LEVEL STAGE (starter green -> legendary amber), a
 * wall-mounted maintenance board on the right, and a ticket rail of recent
 * rewards along the bottom. Token progress is "cabinet power", never a chart.
 *
 * The generated art is the staging; every project name, number, level, meter,
 * and reward ticket is drawn in code on top so nothing is baked into the images.
 * If an asset is missing the screen falls back to fully procedural rendering.
 *
 * Layout (logical 1600x1000):
 *   Back button ...... 16,16   120x52
 *   Title ............ centered x=800
 *   Coins/lifetime ... 1300,20 / 1300,72
 *   Big cabinet ...... CAB       (stage PNG + code marquee/monitor/level/power)
 *   Stats board ...... STATS     (maintenance panel + 5 rows + progress LED)
 *   Rewards rail ..... RAIL      (ticket conveyor + recent-reward tickets)
 */

import { panel, vgrad, rrect } from '../render/canvas';
import { drawText, measureText, GLYPH_H } from '../render/pixelFont';
import { drawSprite, drawCoin } from '../render/sprites';
import { drawCabinet } from '../render/cabinet';
import { drawImageSmooth } from '../render/assets';
import { stageCabinet, stageAccent, statTileAsset } from '../render/atlas';
import type { StatTileKey } from '../render/atlas';
import { EasedNumber, drawIconCentered } from '../render/widgets';
import { drawCoinHud, drawTokenHud, hudPlaqueHeight } from '../render/hud';
import { drawDemoPlaque } from '../render/demoPlaque';
import { CONFIG, fmtComma, fmtCompact } from '../domain/economy';
import { levelInfo } from '../domain/levels';
import type { Project } from '../core/types';
import type { Screen, ScreenContext } from './screen';
import { drawBackButton } from './chrome';
import { t, tStageName } from '../i18n';

const GOLD = '#ffd23f';
const CYAN = '#5fe6d6';
const MAGENTA = '#e15ad8';
const GREEN = '#5fd66f';
const INK = '#f6f4ff';
const MUTE = '#9a93bd';
const PANEL_2 = '#120b22';

// ---- layout rects (logical 1600x1000) -------------------------------------
const CAB = { x: 150, y: 126, w: 472, h: 660 };
const STATS = { x: 766, y: 132, w: 800, h: 578 };
const RAIL = { x: 16, y: 410, w: 1568, h: 762 };
const WALL = { x: 760, y: 130, w: 800, h: 560 }; // procedural fallback box

// Code-overlay anchors (marquee / monitor / power-slot) now come per-variant from
// stageCabinet(...).marquee/screen/power — the white Stage-1 cabinet is a narrower
// art frame than the four color cabinets, so a single fixed anchor can't center on
// all five. See STAGE_CABINETS in render/assets.

// Stats-board anchors (fractions of STATS): five inset rows + the bottom LED.
// SB_ROWS are the text-bar centers (label/value); SB_ICON_ROWS + SB_ICON_X are
// the left icon-WELL centers, measured separately from stats-board.png
// (scripts/measure-wells.mjs) because the well sits slightly lower/right of the
// bar. The tile is drawn well under slot size so it has breathing room on all
// sides instead of pinning to the well's top-left corner (PM QA 2026-07-09 #1).
const SB_ROWS = [0.194, 0.315, 0.431, 0.547, 0.663];
const SB_ICON_ROWS = [0.208, 0.324, 0.44, 0.555, 0.672];
const SB_ICON_X = 0.2034; // well centre x (probed per row from stats-board.png)
const SB_ICON_SIZE = 0.056; // fraction of STATS.w — the well interior is ~0.05w,
// so this keeps clear margin inside the well instead of overflowing its frame.
const SB_LABEL_X = 0.268;
const SB_VALUE_X = 0.83;
const SB_LED = { x: 0.363, y: 0.792, w: 0.266, h: 0.03 };

// Rewards-rail ticket-slot centers (fractions of RAIL): eight slots split 4 + 4
// by the rail's central emblem, measured from the baked ticket recesses in
// recent-rewards-rail.png (scripts/measure-rail3.mjs) so the reward content
// seats centred in each slot — the earlier hand values put the middle slots a
// touch left, e.g. the LVL ticket read left of centre (PM QA 2026-07-09 #2).
const RR_SLOTS_X = [0.16, 0.2546, 0.3496, 0.4444, 0.5536, 0.6484, 0.7426, 0.8371];
const RR_SLOT_Y = 0.6945;

function bar(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, frac: number, fill: string): void {
  g.fillStyle = '#05060f';
  g.fillRect(x, y, w, h);
  const f = Math.max(0, Math.min(1, frac));
  g.fillStyle = fill;
  g.fillRect(x + 1, y + 1, Math.max(0, (w - 2) * f), h - 2);
  g.strokeStyle = 'rgba(0,0,0,0.5)';
  g.lineWidth = 1;
  g.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
}

/** A recent-reward ticket to sit in a rail slot. */
interface Ticket {
  big: string;
  sub: string;
  color: string;
}

export class CabinetScreen implements Screen {
  readonly name = 'cabinet';

  private projectId: string | null = null;
  private readonly displayCoins = new EasedNumber();
  // The cabinet sprite's fitted draw rect (aspect-preserved within CAB), shared
  // between drawBigCabinet and drawLevelFooter. Defaults to CAB for the
  // procedural fallback.
  private cabDraw = { x: CAB.x, y: CAB.y, w: CAB.w, h: CAB.h };

  constructor(private readonly ctx: ScreenContext) {}

  enter(params?: unknown): void {
    const id = (params as { id?: string } | undefined)?.id ?? null;
    const proj = id ? this.ctx.store.state.projects.find((p) => p.id === id) : undefined;
    if (!proj) {
      this.ctx.router.go('room');
      return;
    }
    this.projectId = proj.id;
    this.displayCoins.set(this.ctx.store.state.coins);
  }

  render(g: CanvasRenderingContext2D, dt: number, now: number): void {
    const proj = this.projectId ? this.ctx.store.state.projects.find((p) => p.id === this.projectId) : undefined;
    if (!proj) return; // navigation already happened in enter()

    this.displayCoins.toward(this.ctx.store.state.coins, dt);

    this.drawBackground(g);
    this.drawBigCabinet(g, proj, now);
    this.drawStatsBoard(g, proj);
    this.drawRewardsRail(g, proj);
    this.drawLevelFooter(g, proj); // after the rail so it can't be occluded
    this.drawHeader(g, proj);
  }

  // ---- background ---------------------------------------------------------

  private drawBackground(g: CanvasRenderingContext2D): void {
    const W = this.ctx.stage.width;
    const H = this.ctx.stage.height;
    const bg = this.ctx.assets.get('projRoomBg');
    if (bg) {
      drawImageSmooth(g, bg, 0, 0, W, H);
      const grad = g.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'rgba(6,4,12,0.55)');
      grad.addColorStop(0.18, 'rgba(6,4,12,0.05)');
      grad.addColorStop(1, 'rgba(6,4,12,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, W, H);
      return;
    }
    vgrad(g, 0, 0, W, H, '#221436', '#07040d');
    vgrad(g, 0, 720, W, H - 720, '#170f2c', '#0a0616');
    g.fillStyle = 'rgba(95,230,214,0.08)';
    g.fillRect(0, 720, W, 2);
  }

  // ---- header -------------------------------------------------------------

  private drawHeader(g: CanvasRenderingContext2D, proj: Project): void {
    drawBackButton(g, this.ctx, () => this.ctx.router.back());

    // Title sign
    drawText(g, proj.name, 800, 24, 4, INK, { align: 'center', glow: MAGENTA, glowBlur: 4, shadow: 'rgba(0,0,0,0.5)' });
    drawText(g, t('ui.projectCabinet'), 800, 66, 1.5, MUTE, { align: 'center' });

    // Coin + lifetime-token counters — the same generated HUD plaques used on
    // home + capsule so the currency reads identically across screens. The token
    // plaque stacks directly beneath the coin plaque at the same x/width.
    const HW = 252;
    const HX = 1600 - HW - 24;
    drawCoinHud(g, this.ctx.assets, HX, 14, HW, fmtComma(Math.round(this.displayCoins.value)));
    drawTokenHud(g, this.ctx.assets, HX, 14 + hudPlaqueHeight(HW) + 8, HW, fmtComma(this.ctx.store.state.stats.lifetimeTokens));
    drawDemoPlaque(g, this.ctx, HX - 170, 18, 160);
  }

  // ---- big project cabinet ------------------------------------------------

  private drawBigCabinet(g: CanvasRenderingContext2D, proj: Project, now: number): void {
    const info = levelInfo(proj.tokens);
    // The big cabinet's color now comes from the project's LEVEL STAGE (green ->
    // blue -> magenta -> purple -> amber as it levels up), not a per-id skin.
    const variant = stageCabinet(info.stage.index);
    const img = this.ctx.assets.get(variant.asset);

    if (!img) {
      // Procedural fallback: the code-drawn cabinet + a power meter.
      drawCabinet(g, CAB.x, CAB.y, CAB.w, CAB.h, {
        name: proj.name,
        level: info.stage.index + 1,
        id: proj.id,
        on: true,
        glow: 1,
        progress: info.progress,
      });
      drawText(g, t('ui.tokenPower'), CAB.x, CAB.y + CAB.h + 26, 2, CYAN, { glow: CYAN, glowBlur: 3 });
      drawText(g, t('ui.coinPower', { x: info.multiplier.toFixed(2) + 'x' }), CAB.x + CAB.w, CAB.y + CAB.h + 26, 1.6, GOLD, {
        align: 'right',
        glow: GOLD,
        glowBlur: 3,
      });
      bar(g, CAB.x, CAB.y + CAB.h + 54, CAB.w, 24, info.progress, variant.accent);
      return;
    }

    // Fit the single-PNG sprite inside CAB preserving its own aspect ratio (the
    // five stage cabinets have different widths — Stage 5 is wider for its wings
    // — so a fixed rect would stretch them). Center horizontally, stand on the
    // floor (bottom-aligned). All overlays anchor to this fitted rect.
    const nw = (img as HTMLImageElement).naturalWidth || CAB.w;
    const nh = (img as HTMLImageElement).naturalHeight || CAB.h;
    const ar = nw / nh;
    let dw = CAB.h * ar;
    let dh = CAB.h;
    if (dw > CAB.w) {
      dw = CAB.w;
      dh = CAB.w / ar;
    }
    const dx = CAB.x + (CAB.w - dw) / 2;
    const dy = CAB.y + (CAB.h - dh);
    this.cabDraw = { x: dx, y: dy, w: dw, h: dh };

    // contact shadow so the cabinet sits on the floor
    g.save();
    g.fillStyle = 'rgba(0,0,0,0.4)';
    g.beginPath();
    g.ellipse(dx + dw / 2, dy + dh - 8, dw * 0.42, 14, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();

    // Draw the whole pre-cropped stage cabinet sprite (crown/wings baked in — no
    // separate topper/badge compositing).
    drawImageSmooth(g, img, dx, dy, dw, dh);

    // helper to resolve a normalized anchor to a logical rect within the sprite
    const rect = (a: { x: number; y: number; w: number; h: number }) => ({
      x: dx + a.x * dw,
      y: dy + a.y * dh,
      w: a.w * dw,
      h: a.h * dh,
    });

    // --- Marquee: project name, sized to fit, glowing in the variant accent.
    const m = rect(variant.marquee);
    const mCx = m.x + m.w / 2;
    let nameScale = 3;
    while (nameScale > 1 && measureText(proj.name, nameScale) > m.w - 16) nameScale -= 0.25;
    const twinkle = 0.75 + 0.25 * ((Math.sin(now / 380) + 1) / 2);
    g.globalAlpha = twinkle;
    drawText(g, proj.name, mCx, m.y + m.h / 2 - nameScale * 3.5, nameScale, INK, {
      align: 'center',
      glow: variant.accent,
      glowBlur: 5,
      shadow: 'rgba(0,0,0,0.6)',
    });
    g.globalAlpha = 1;

    // --- Monitor: the "screen is on" scene — big level + token power bar.
    const s = rect(variant.screen);
    const sCx = s.x + s.w / 2;
    // faint accent wash so the dark screen reads as powered
    const sg = g.createLinearGradient(0, s.y, 0, s.y + s.h);
    sg.addColorStop(0, this.rgba(variant.accent, 0.14));
    sg.addColorStop(1, this.rgba(variant.accent, 0.04));
    g.fillStyle = sg;
    g.fillRect(s.x, s.y, s.w, s.h);
    // scanline hint
    g.fillStyle = 'rgba(0,0,0,0.14)';
    for (let yy = s.y + 2; yy < s.y + s.h; yy += 6) g.fillRect(s.x, yy, s.w, 2);

    drawText(g, 'LVL', sCx, s.y + s.h * 0.08, 2, variant.accent, { align: 'center', glow: variant.accent, glowBlur: 3 });
    drawText(g, String(info.level), sCx, s.y + s.h * 0.2, 6, INK, {
      align: 'center',
      glow: variant.accent,
      glowBlur: 6,
      shadow: 'rgba(0,0,0,0.6)',
    });
    // stage name under the level number, glowing in the stage accent
    drawText(g, t('ui.stageCabinet', { stage: tStageName(info.stage.key) }), sCx, s.y + s.h * 0.56, 1.3, variant.accent, {
      align: 'center',
      glow: variant.accent,
      glowBlur: 3,
      shadow: 'rgba(0,0,0,0.6)',
    });
    // token power mini-bar inside the screen
    const pbW = s.w * 0.78;
    const pbX = sCx - pbW / 2;
    const pbY = s.y + s.h * 0.74;
    drawText(g, t('ui.tokenPower'), sCx, pbY - 15, 1.3, MUTE, { align: 'center' });
    bar(g, pbX, pbY, pbW, 15, info.progress, variant.accent);
    if (info.isMax) {
      // At max level the "x / y" next-threshold preview becomes a gold trophy tag.
      drawText(g, t('ui.maxLevel'), sCx, pbY + 22, 1.4, GOLD, {
        align: 'center',
        glow: GOLD,
        glowBlur: 4,
        shadow: 'rgba(0,0,0,0.6)',
      });
    } else {
      drawText(g, fmtCompact(proj.tokens) + ' / ' + fmtCompact(info.next ?? 0), sCx, pbY + 22, 1.3, INK, {
        align: 'center',
        shadow: 'rgba(0,0,0,0.6)',
      });
    }

    // NOTE: the code-drawn power LED strip was removed. Its fixed window centred
    // on the Stage-1 body but the taller Stage-5 crown shifts every feature down,
    // so on Stage 5 the orange fill landed on the control panel as a stray
    // rectangle (PM QA 2026-07-09). Token power already reads inside the monitor
    // above, and each cabinet's LED strip is lit in the baked art, so the
    // redundant overlay is dropped rather than risk mis-registration per stage.

    // The coin-multiplier plate + near-level-up hint are drawn in
    // drawLevelFooter() AFTER the rewards rail so the rail art can't cover them.
    // No code topper/badge/sparkle here — the stage sprite carries its own
    // crown/wings; the ui-kit ornaments are reserved for the prize wall,
    // achievement cabinet, and tooltips.
  }

  /** Coin-multiplier plate + near-level-up momentum cue. Called after the
   * rewards rail so the rail image never occludes them. */
  private drawLevelFooter(g: CanvasRenderingContext2D, proj: Project): void {
    const info = levelInfo(proj.tokens);

    // Coin multiplier plate centered under the fitted cabinet, riding the top
    // strip of the rewards rail.
    const plateW = 250;
    const plateH = 34;
    const plateX = this.cabDraw.x + this.cabDraw.w / 2 - plateW / 2;
    const plateY = CAB.y + CAB.h + 6;
    panel(g, plateX, plateY, plateW, plateH, { radius: 17, fill: PANEL_2, border: GOLD, borderWidth: 2 });
    drawCoin(g, plateX + 22, plateY + plateH / 2, 10);
    drawText(g, t('ui.coinPower', { x: info.multiplier.toFixed(2) + 'x' }), plateX + 40, plateY + plateH / 2 - 7, 1.6, GOLD, {
      glow: GOLD,
      glowBlur: 3,
    });

    if (!info.isMax && info.progress > 0.8) {
      // Momentum hint sitting to the right of the plate in the same visible strip.
      drawText(g, t('ui.levelUpSoon'), plateX + plateW + 96, plateY + plateH / 2 - 6, 1.5, GREEN, {
        align: 'center',
        glow: GREEN,
        glowBlur: 4,
        shadow: 'rgba(0,0,0,0.6)',
      });
    }
  }

  // ---- stats board --------------------------------------------------------

  private drawStatsBoard(g: CanvasRenderingContext2D, proj: Project): void {
    const info = levelInfo(proj.tokens);
    const img = this.ctx.assets.get('projStatsBoard');

    if (!img) {
      this.drawStatsProcedural(g, proj);
      return;
    }
    drawImageSmooth(g, img, STATS.x, STATS.y, STATS.w, STATS.h);

    // Each row carries a stat-tile `key` (the generated icon) plus its code-sprite
    // `icon` fallback, in the fixed board order.
    const rows: { key: StatTileKey; icon: string; label: string; value: string; color: string }[] = [
      { key: 'tokensSync', icon: 'tokenChip', label: t('ui.tokensThisSync'), value: '+' + fmtComma(proj.lastGained ?? 0), color: GREEN },
      { key: 'lifetimeTokens', icon: 'tokenChip', label: t('ui.lifetimeTokens'), value: fmtComma(proj.tokens), color: INK },
      { key: 'coinsMinted', icon: 'goldCoin', label: t('ui.baseCoins'), value: fmtComma(proj.coins), color: GOLD },
      { key: 'cabinetLevel', icon: 'miniCabinet', label: t('ui.cabinetLevel'), value: 'LVL ' + info.level, color: CYAN },
      { key: 'provider', icon: 'ggSign', label: t('ui.provider'), value: proj.provider.toUpperCase(), color: INK },
    ];

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const cy = STATS.y + SB_ROWS[i] * STATS.h;
      // icon: the generated stat tile, aspect-preserved and centered in the
      // board's left icon WELL (its own measured centre, not the text row).
      const iconCx = STATS.x + SB_ICON_X * STATS.w;
      const iconCy = STATS.y + SB_ICON_ROWS[i] * STATS.h;
      const tile = this.ctx.assets.get(statTileAsset(r.key));
      if (tile) drawIconCentered(g, tile, iconCx, iconCy, SB_ICON_SIZE * STATS.w);
      else drawSprite(g, r.icon, iconCx - 16, iconCy - 16, 2);
      drawText(g, r.label, STATS.x + SB_LABEL_X * STATS.w, cy - 7, 2, '#cfc9ea');
      drawText(g, r.value, STATS.x + SB_VALUE_X * STATS.w, cy - 8, 2.25, r.color, {
        align: 'right',
        glow: r.color === INK ? undefined : r.color,
        glowBlur: 2,
      });
    }

    // Next-level progress on the board's bottom LED bar.
    const led = {
      x: STATS.x + SB_LED.x * STATS.w,
      y: STATS.y + SB_LED.y * STATS.h,
      w: SB_LED.w * STATS.w,
      h: SB_LED.h * STATS.h,
    };
    g.save();
    rrect(g, led.x, led.y, led.w, led.h, led.h / 2);
    g.clip();
    g.fillStyle = 'rgba(3,4,10,0.5)';
    g.fillRect(led.x, led.y, led.w, led.h);
    g.fillStyle = info.isMax ? GOLD : GREEN;
    g.fillRect(led.x, led.y, led.w * Math.max(0.03, Math.min(1, info.progress)), led.h);
    g.restore();
    const nextLabel = info.isMax ? t('ui.maxLevel') : fmtCompact(proj.tokens) + ' / ' + fmtCompact(info.next ?? 0);
    drawText(g, t('ui.nextLevel'), led.x - 8, led.y + led.h / 2 - 5, 1.4, MAGENTA, { align: 'right' });
    drawText(g, nextLabel, led.x + led.w + 8, led.y + led.h / 2 - 5, 1.4, INK);
  }

  /** Procedural fallback stats card (board asset missing / still loading). */
  private drawStatsProcedural(g: CanvasRenderingContext2D, proj: Project): void {
    const info = levelInfo(proj.tokens);
    panel(g, WALL.x, WALL.y, WALL.w, WALL.h, { radius: 12, fill: 'rgba(20,15,36,0.7)', border: '#4a4270', borderWidth: 2 });
    drawText(g, t('ui.projectStats'), WALL.x + 24, WALL.y + 24, 3, GOLD, { glow: GOLD, glowBlur: 3 });

    const rows: { icon: string; label: string; value: string; color: string }[] = [
      { icon: 'tokenChip', label: t('ui.tokensThisSync'), value: '+' + fmtComma(proj.lastGained ?? 0), color: GREEN },
      { icon: 'tokenChip', label: t('ui.lifetimeTokens'), value: fmtComma(proj.tokens), color: INK },
      { icon: 'goldCoin', label: t('ui.baseCoins'), value: fmtComma(proj.coins), color: GOLD },
      { icon: 'miniCabinet', label: t('ui.cabinetLevel'), value: 'LVL ' + info.level, color: CYAN },
      { icon: 'ggSign', label: t('ui.provider'), value: proj.provider.toUpperCase(), color: INK },
    ];
    let rowY = WALL.y + 74;
    for (const r of rows) {
      drawSprite(g, r.icon, WALL.x + 24, rowY, 2);
      drawText(g, r.label, WALL.x + 70, rowY + 8, 2, '#c9c6e0');
      drawText(g, r.value, WALL.x + WALL.w - 24, rowY + 6, 2, r.color, { align: 'right' });
      rowY += 66;
    }
    drawText(g, t('ui.nextLevel'), WALL.x + 24, rowY + 4, 2, MAGENTA);
    bar(g, WALL.x + 24, rowY + 34, WALL.w - 48, 24, info.progress, GREEN);
    const nextLabel = info.isMax ? t('ui.maxLevel') : fmtCompact(proj.tokens) + ' / ' + fmtCompact(info.next ?? 0);
    drawText(g, nextLabel, WALL.x + WALL.w / 2, rowY + 40, 2, INK, { align: 'center', shadow: 'rgba(0,0,0,0.6)' });
  }

  // ---- recent rewards rail ------------------------------------------------

  private drawRewardsRail(g: CanvasRenderingContext2D, proj: Project): void {
    const tickets = this.recentTickets(proj);
    const img = this.ctx.assets.get('projRewardsRail');

    if (img) {
      drawImageSmooth(g, img, RAIL.x, RAIL.y, RAIL.w, RAIL.h);
      const slotW = 0.082 * RAIL.w;
      const slotH = 0.14 * RAIL.h;
      for (let i = 0; i < RR_SLOTS_X.length; i++) {
        const cx = RAIL.x + RR_SLOTS_X[i] * RAIL.w;
        const cy = RAIL.y + RR_SLOT_Y * RAIL.h;
        this.drawTicket(g, cx, cy, slotW, slotH, tickets[i] ?? null, true);
      }
      // Caption on a small plaque riding the rail's top-left rim — the bare label
      // was cramped against the far-left edge (PM QA 2026-07-09 #5).
      const capX = RAIL.x + 0.03 * RAIL.w;
      const capY = RAIL.y + 0.5 * RAIL.h;
      const capW = measureText(t('ui.recentRewards'), 1.5) + 22;
      rrect(g, capX, capY - 5, capW, 26, 7);
      g.fillStyle = 'rgba(9,6,18,0.72)';
      g.fill();
      drawText(g, t('ui.recentRewards'), capX + 11, capY, 1.5, CYAN, { glow: '#2f9fa0', glowBlur: 2 });
      return;
    }

    // Procedural fallback rail.
    const y = 852;
    panel(g, 40, y, 1520, 120, { radius: 12, fill: 'rgba(20,15,36,0.6)', border: '#4a4270', borderWidth: 2 });
    drawText(g, t('ui.recentRewards'), 60, y + 16, 2, MUTE);
    for (let i = 0; i < 8; i++) {
      const cx = 150 + i * 180;
      this.drawTicket(g, cx, y + 66, 120, 60, tickets[i] ?? null, false);
    }
  }

  /** Recent-reward tickets derived from the project's latest sync (no history is
   * stored, so we surface the last-sync gains as prize tickets; empties fill the
   * rest of the rail rather than leaving it blank). */
  private recentTickets(proj: Project): Ticket[] {
    const out: Ticket[] = [];
    const info = levelInfo(proj.tokens); // token-derived level, never a stale proj.level
    const gained = proj.lastGained ?? 0;
    if (gained > 0) {
      out.push({ big: '+' + fmtCompact(gained), sub: t('ui.tokens'), color: CYAN });
      const coins = Math.floor(gained / CONFIG.TOKENS_PER_COIN);
      if (coins > 0) out.push({ big: '+' + fmtCompact(coins), sub: t('ui.coins'), color: GOLD });
    }
    out.push({ big: 'LVL ' + info.level, sub: t('ui.cabinet'), color: stageAccent(info.stage.index) });
    out.push({ big: fmtCompact(proj.coins), sub: t('ui.baseCoins'), color: GOLD });
    return out;
  }

  /** One reward slot. On the generated rail (`onRail`) we light up the baked
   * ticket recess and center the value + subtitle inside it — the recess IS the
   * ticket frame, so overlaying a separate (wider-aspect) plate looked unseated
   * (PM QA 2026-07-09 #2). The procedural fallback draws its own ticket plate. */
  private drawTicket(
    g: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    w: number,
    h: number,
    t: Ticket | null,
    onRail: boolean,
  ): void {
    if (!t) {
      // Baked rail: empty slots stay as the art's own dark recess. Fallback rail:
      // a faint dashed marker so the slot reads as "waiting for a reward".
      if (!onRail) {
        g.strokeStyle = 'rgba(120,110,160,0.35)';
        g.lineWidth = 1.5;
        g.setLineDash([5, 5]);
        rrect(g, cx - w / 2 + 4, cy - h / 2 + 4, w - 8, h - 8, 6);
        g.stroke();
        g.setLineDash([]);
      }
      return;
    }

    if (onRail) {
      // Light the baked recess with a soft glow in the reward's accent so a
      // filled ticket reads as lit-up, seated inside its own slot.
      g.save();
      const gr = g.createRadialGradient(cx, cy, 2, cx, cy, w * 0.55);
      gr.addColorStop(0, this.rgba(t.color, 0.22));
      gr.addColorStop(1, this.rgba(t.color, 0));
      g.fillStyle = gr;
      g.fillRect(cx - w * 0.62, cy - h * 0.62, w * 1.24, h * 1.24);
      g.restore();
    } else {
      // Procedural fallback ticket plate.
      g.save();
      g.shadowColor = t.color;
      g.shadowBlur = 8;
      rrect(g, cx - w / 2, cy - h / 2, w, h, 7);
      g.fillStyle = 'rgba(16,11,30,0.92)';
      g.fill();
      g.strokeStyle = t.color;
      g.lineWidth = 2;
      g.stroke();
      g.restore();
    }

    // Value + subtitle centered as ONE block on the slot centre (cy), so every
    // ticket type (token/coin gain, level, minted) sits the same regardless of
    // string length (PM QA 2026-07-09 #2).
    let bs = 2.25;
    while (bs > 1 && measureText(t.big, bs) > w * 0.84) bs -= 0.25;
    const subScale = 1.3;
    const gap = 6;
    const blockH = GLYPH_H * bs + gap + GLYPH_H * subScale;
    const top = cy - blockH / 2;
    drawText(g, t.big, cx, top, bs, t.color, { align: 'center', glow: t.color, glowBlur: 3, shadow: 'rgba(0,0,0,0.6)' });
    drawText(g, t.sub, cx, top + GLYPH_H * bs + gap, subScale, INK, { align: 'center', shadow: 'rgba(0,0,0,0.6)' });
  }

  // ---- utils --------------------------------------------------------------

  /** '#rrggbb' + alpha -> 'rgba(...)'. */
  private rgba(hex: string, a: number): string {
    const h = hex.replace('#', '');
    const r = parseInt(h.slice(0, 2), 16);
    const gg = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r},${gg},${b},${a})`;
  }
}
