/*
 * roomScreen.ts — THE arcade room. This is the home screen and the heart of the
 * product: a cozy dark neon room with a player card, a wall of project
 * cabinets, a glowing coin-bank centerpiece with the player standing beside it,
 * a prize-wall preview, and a bottom "spend" rail. Everything is a game object,
 * never a dashboard widget.
 *
 * Chrome is built from generated "home-UI" asset frames (logo sign, player card,
 * coin plaque, sync-button states, project-row frame, shop-card frame, icon-
 * button frame). These are EMPTY containers: every live value (player name/level/
 * XP, coin + lifetime totals, project names/tokens/level/progress, shop labels/
 * prices) is drawn in code ON TOP, and every asset has a procedural fallback so
 * the room stays fully playable when an image is missing or still loading.
 *
 * Layout (logical 1600x1000):
 *   Player card ...... 16,16   360x104
 *   Marquee .......... centered on x=800, y~10..150
 *   Coins pill ....... 1086,16  256x44   (coin-rain target)
 *   Lifetime pill .... 1086,68  256x44
 *   SYNC button ...... 1360,16  224x76   (primary action)
 *   Cabinets column .. 16,150   360x750
 *   Coin bank ........ 600,200  360x520  (center stage)
 *   Prize wall ....... 1224,150 360x750
 *   Spend rail ....... 16,904   1568x82  (icons + SPEND COINS! + shop buttons)
 */

import { panel, vgrad, rrect } from '../render/canvas';
import { drawText, measureText, wrapText, GLYPH_H } from '../render/pixelFont';
import { drawSprite, drawSpriteCentered, drawPlayer, drawCoin, AVATAR } from '../render/sprites';
import { drawCabinet } from '../render/cabinet';
import { drawCoinBank } from '../render/machines';
import { drawImageSmooth, collectibleIcon } from '../render/assets';
import { drawCoinHud, drawTokenHud, hudPlaqueHeight } from '../render/hud';
import { drawDemoPlaque } from '../render/demoPlaque';
import {
  cabinetCropFor,
  stageAccent,
  homeLevelCabinetCrop,
  homeCabinetScreen,
  uiKitBadge,
  uiKitEndcap,
  PLAYER_PORTRAIT_CROP,
  PLAYER_BODY_CROP,
  SYNC_STATE_CROPS,
  LOGO_FRAME_ALPHA,
  utilityButtonCrop,
} from '../render/atlas';
import type { UtilButtonKey, UtilButtonState } from '../render/atlas';
import { drawIconCentered, drawImageContain, drawCropContain, radial, EasedNumber } from '../render/widgets';
import { ROOM_CENTER_X, PRIZE_WALL_SLOTS } from '../render/measured';
import { CONFIG, fmtComma, fmtCompact } from '../domain/economy';
import { levelInfo } from '../domain/levels';
import { COLLECTIBLES, RARITIES, SHOP } from '../content';
import type { Project, ShopItem } from '../core/types';
import type { Screen, ScreenContext } from './screen';
import { t, tAchName, tAchDesc, tCollectibleName } from '../i18n';

// ---- palette --------------------------------------------------------------
const GOLD = '#ffd23f';
const CYAN = '#5fe6d6';
const MAGENTA = '#e15ad8';
const GREEN = '#5fd66f';
const INK = '#f6f4ff';
const PANEL = '#1b1230';

// ---- fixed regions --------------------------------------------------------
// Player card sized to the frame art's own 2.42:1 aspect so it isn't stretched
// (360 / 2.42 ≈ 149). Content is placed at the frame's measured internal slots.
const CARD = { x: 16, y: 12, w: 360, h: 149 };
const SYNC = { x: 1360, y: 16, w: 224, h: 76 };
// Top-right counters use the SHARED HUD plaques (coin balance stacked over
// lifetime tokens) so the HUD language matches the capsule + project-detail
// screens. Anchored just left of the SYNC zone (starts x1360) so the primary
// action stays clear; each plaque keeps its baked aspect via hudPlaqueHeight().
const HUD_W = 252;
const HUD_X = 1086;
const HUD_COIN_Y = 14;
const HUD_TOKEN_Y = HUD_COIN_Y + hudPlaqueHeight(HUD_W) + 8;
// Coin-rain + spend banners home onto the CENTER of the coin plaque.
const COINS_TARGET = { x: HUD_X + HUD_W / 2, y: HUD_COIN_Y + hudPlaqueHeight(HUD_W) / 2 };
const CAB = { x: 16, y: 172, w: 360, h: 728 };
// Coin bank centered on the room art's measured visual axis (pendant lamp +
// wall-gap centroid, from scripts/measure-assets.mjs).
const BANK_W = 360;
const BANK = { x: Math.round(ROOM_CENTER_X * 1600 - BANK_W / 2), y: 200, w: BANK_W, h: 520 };
const WALL = { x: 1224, y: 150, w: 360, h: 750 };
const RAIL = { x: 16, y: 904, w: 1568, h: 82 };

// ---- small drawing helpers ------------------------------------------------

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

function clip(s: string, n: number): string {
  return s.length > n ? s.slice(0, n) : s;
}

/** A compact segmented power meter (replaces the dominant full-width bar). */
function drawPowerMeter(g: CanvasRenderingContext2D, x: number, y: number, w: number, cells: number, frac: number, color: string): void {
  const gap = 3;
  const cw = (w - gap * (cells - 1)) / cells;
  const lit = Math.round(Math.max(0, Math.min(1, frac)) * cells);
  for (let i = 0; i < cells; i++) {
    const cx = x + i * (cw + gap);
    if (i < lit) {
      g.save();
      g.shadowColor = color;
      g.shadowBlur = 5;
      g.fillStyle = color;
      g.fillRect(cx, y, cw, 7);
      g.restore();
    } else {
      g.fillStyle = 'rgba(255,255,255,0.12)';
      g.fillRect(cx, y, cw, 7);
    }
  }
}

/** Stage-colored next-level progress: the ui-kit endcap sprite (which carries the
 * matching 1..5 stage lights + stage color) with a translucent accent "charge"
 * showing progress; falls back to the code segmented meter if the kit is absent. */
function drawStageProgress(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  stageIndex: number,
  frac: number,
  accent: string,
  kit: HTMLImageElement | null,
): void {
  if (!kit) {
    drawPowerMeter(g, x, y + 16, w, 9, frac, accent);
    return;
  }
  const ec = uiKitEndcap(stageIndex);
  const h = (w * ec.sh) / ec.sw;
  drawImageSmooth(g, kit, x, y, w, h, ec);
  const f = Math.max(0, Math.min(1, frac));
  if (f > 0) {
    // translucent charge over the bar's inner track — the baked stage lights
    // stay visible through it.
    g.save();
    rrect(g, x + w * 0.03, y + h * 0.32, (w - w * 0.06) * f, h * 0.36, h * 0.18);
    g.clip();
    g.globalAlpha = 0.32;
    g.fillStyle = accent;
    g.fillRect(x, y, w, h);
    g.restore();
    g.globalAlpha = 1;
  }
}

/** A small glowing "LVn" plate over a home cabinet's marquee, drawn in the
 *  project's visual-stage accent color. Level can be up to 50, so it sits on a
 *  dark rounded plate to stay readable against the lit cabinet art. */
function drawLevelPlate(g: CanvasRenderingContext2D, cx: number, cy: number, level: number, accent: string): void {
  const label = 'LV' + level;
  const s = 1.5;
  const pw = measureText(label, s) + 12;
  const ph = GLYPH_H * s + 8;
  const px = cx - pw / 2;
  const py = cy - ph / 2; // center the plate on (cx, cy)
  rrect(g, px, py, pw, ph, 4);
  g.fillStyle = 'rgba(6,4,12,0.82)';
  g.fill();
  g.strokeStyle = accent;
  g.lineWidth = 1.5;
  rrect(g, px, py, pw, ph, 4);
  g.stroke();
  drawText(g, label, cx, py + (ph - GLYPH_H * s) / 2, s, accent, {
    align: 'center',
    glow: accent,
    glowBlur: 3,
    shadow: 'rgba(0,0,0,0.75)',
  });
}

/** A small visual-stage emblem for a cabinet row: the generated UI-kit badge
 *  when it has loaded, else a subtle accent chip carrying the stage's initial.
 *  Kept small so the cabinet color + LV number stay the primary signal. */
function drawStageBadge(
  g: CanvasRenderingContext2D,
  stageIndex: number,
  stageName: string,
  accent: string,
  x: number,
  y: number,
  size: number,
  kit: HTMLImageElement | null,
): void {
  if (kit) {
    // Preserve the badge's own aspect ratio (they are not square) and center it
    // vertically in the `size` box so it never looks squashed or clipped.
    const bc = uiKitBadge(stageIndex);
    const bw = size;
    const bh = (size * bc.sh) / bc.sw;
    drawImageSmooth(g, kit, x, y + (size - bh) / 2, bw, bh, bc);
    return;
  }
  const ch = Math.round(size * 0.72);
  const cy = y + (size - ch) / 2;
  rrect(g, x, cy, size, ch, 4);
  g.save();
  g.globalAlpha = 0.85;
  g.fillStyle = accent;
  g.fill();
  g.restore();
  drawText(g, stageName.charAt(0), x + size / 2, cy + ch / 2 - (GLYPH_H * 1.5) / 2, 1.5, '#12121f', { align: 'center' });
}

/** A few subtle gold glints on the floor near the coin bank base. */
function drawFloorGlints(g: CanvasRenderingContext2D, now: number): void {
  const cx = BANK.x + BANK.w / 2;
  const spots = [
    [cx - 120, 762],
    [cx - 54, 786],
    [cx + 52, 772],
    [cx + 122, 754],
    [cx - 8, 792],
  ];
  for (let i = 0; i < spots.length; i++) {
    const [x, y] = spots[i];
    const a = 0.12 + 0.28 * Math.max(0, Math.sin(now / 500 + i * 1.7));
    g.save();
    g.globalAlpha = a;
    g.fillStyle = '#ffd23f';
    g.fillRect(x - 1, y - 4, 2, 8);
    g.fillRect(x - 4, y - 1, 8, 2);
    g.restore();
  }
}

/** A soft gold glow behind a coin count. */
function coinGlow(g: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  const grad = g.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, 'rgba(255,210,63,0.35)');
  grad.addColorStop(1, 'rgba(255,210,63,0)');
  g.fillStyle = grad;
  g.fillRect(cx - r, cy - r, r * 2, r * 2);
}

/** A small locked-padlock silhouette for empty prize-wall slots. */
function drawPadlock(g: CanvasRenderingContext2D, cx: number, cy: number, color: string): void {
  g.save();
  g.strokeStyle = color;
  g.lineWidth = 3;
  g.beginPath();
  g.arc(cx, cy - 5, 7, Math.PI, 2 * Math.PI);
  g.stroke();
  g.fillStyle = color;
  rrect(g, cx - 11, cy - 4, 22, 18, 3);
  g.fill();
  g.fillStyle = 'rgba(0,0,0,0.5)';
  g.fillRect(cx - 1.5, cy + 1, 3, 7);
  g.restore();
}

/** A tiny pencil glyph (edit affordance), centered on (cx, cy). A diagonal
 *  shaft with a nib at the lower-left, sized by `s`. */
function drawPencil(g: CanvasRenderingContext2D, cx: number, cy: number, s: number, color: string): void {
  g.save();
  g.strokeStyle = color;
  g.fillStyle = color;
  g.lineWidth = 2;
  g.lineCap = 'round';
  // shaft, lower-left -> upper-right
  g.beginPath();
  g.moveTo(cx - s * 0.42, cy + s * 0.42);
  g.lineTo(cx + s * 0.42, cy - s * 0.42);
  g.stroke();
  // nib triangle at the writing end
  g.beginPath();
  g.moveTo(cx - s * 0.5, cy + s * 0.5);
  g.lineTo(cx - s * 0.5 + 4, cy + s * 0.5 - 1.5);
  g.lineTo(cx - s * 0.5 + 1.5, cy + s * 0.5 - 4);
  g.closePath();
  g.fill();
  g.restore();
}

export class RoomScreen implements Screen {
  readonly name = 'room';

  /** Coin count shown in the pill; eased toward the real balance each frame. */
  private readonly displayCoins = new EasedNumber();
  /** Guards re-entrant syncs while a sync promise is in flight. */
  private syncing = false;
  /** Neon-logo flicker: the current frame and the wall-clock (ms) it holds until.
   * The sign holds a bright, readable NORMAL frame for a long randomized gap
   * (~2.2-5.5s), then does ONE short flick — a dark dropout, or rarely a bright
   * burst — and returns straight to normal, so it reads as an arcade neon tube
   * with occasional electricity fluctuation rather than a constant strobe or a
   * double-blink. */
  private flickerUntil = -1;
  private flickerFrame: 'homeLogo' | 'homeLogoDropout' | 'homeLogoBurst' = 'homeLogo';
  /** Scroll offset (logical px) of the cabinet wall — the column is a clipped
   * viewport so every project is reachable by wheel even past the ~5 that fit. */
  private cabScrollY = 0;
  /** Full cyan frame ignition after an equip, then a steady low glow. */
  private profileFramePulseUntil = 0;
  private lastProfileFrame = this.ctx.store.state.cosmetics.profileFrame;

  constructor(private readonly ctx: ScreenContext) {
    this.displayCoins.set(ctx.store.state.coins);
  }

  enter(): void {
    this.displayCoins.set(this.ctx.store.state.coins);
  }

  render(g: CanvasRenderingContext2D, dt: number, now: number): void {
    // Ease the displayed coin count toward the real balance (climbs on sync,
    // drops on spend) so the pill animates instead of snapping.
    this.displayCoins.toward(this.ctx.store.state.coins, dt);
    const equippedFrame = this.ctx.store.state.cosmetics.profileFrame;
    if (equippedFrame !== this.lastProfileFrame) {
      this.lastProfileFrame = equippedFrame;
      this.profileFramePulseUntil = now + 720;
      this.ctx.stage.wake(760);
    }

    // Keep achievement toasts in the open floor between the coin bank and the
    // prize wall (starts x1224) so they never cover the TOKEN ARCADE sign or
    // the centerpiece.
    const gapCx = Math.round((BANK.x + BANK.w + WALL.x) / 2);
    this.ctx.fx.setToastZone(gapCx, 168, Math.min(232, WALL.x - (BANK.x + BANK.w) - 16));

    this.drawBackground(g);
    this.drawCabinets(g);
    this.drawCenter(g, now);
    this.drawPrizeWall(g);
    this.drawTopBar(g, now);
    this.drawSpendRail(g);
    this.drawNoHistoryDecision(g);
  }

  // ---- background ---------------------------------------------------------

  private drawBackground(g: CanvasRenderingContext2D): void {
    const W = this.ctx.stage.width;
    const H = this.ctx.stage.height;
    const theme = this.ctx.store.state.cosmetics.roomTheme;
    const bg = theme === 'e_sunset'
      ? this.ctx.assets.get('roomThemeSunset')
      : theme === 'l_forest'
        ? this.ctx.assets.get('roomThemeForest')
        : this.ctx.assets.get('roomBg');
    if (bg) {
      // Generated arcade room: wall, posters, machines, shelves, reflective
      // floor. Drawn first so the UI objects feel mounted inside a place.
      drawImageSmooth(g, bg, 0, 0, W, H);
      // P1 theme art is an opaque, authored full-room scene. It deliberately
      // receives no tint, crop, filter, or readability wash; live gameplay
      // layers are drawn above its reserved safety zones.
      if (theme !== 'base') return;
      // Gentle darkening at the top + behind the columns keeps overlaid text
      // legible without hiding the room (per the QA: let the room show through).
      const grad = g.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'rgba(6,4,12,0.55)');
      grad.addColorStop(0.28, 'rgba(6,4,12,0.12)');
      grad.addColorStop(1, 'rgba(6,4,12,0.0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, W, H);
      return;
    }
    // Procedural fallback (asset missing / still loading).
    vgrad(g, 0, 0, W, H, '#241338', '#07040d');
    vgrad(g, 0, 700, W, H - 700, '#170f2c', '#0a0616');
    g.fillStyle = 'rgba(95,230,214,0.10)';
    g.fillRect(0, 700, W, 2);
    radial(g, 800, 120, 540, 'rgba(225,90,216,0.10)');
    radial(g, 300, 520, 380, 'rgba(95,230,214,0.06)');
    radial(g, 1320, 540, 380, 'rgba(255,210,63,0.05)');
  }

  // ---- top bar ------------------------------------------------------------

  private drawTopBar(g: CanvasRenderingContext2D, now: number): void {
    this.drawPlayerCard(g, now);
    this.drawMarquee(g, now);
    this.drawCoinPlaque(g);
    drawDemoPlaque(g, this.ctx, 930, 15, 146);
    this.drawSyncButton(g);
  }

  /** Player card: generated frame + portrait, with name/level/XP drawn on top.
   * Clicking the card opens the achievement gallery. */
  private drawPlayerCard(g: CanvasRenderingContext2D, now: number): void {
    const store = this.ctx.store;
    const pl = store.playerLevel();
    const cardHover = this.ctx.stage.hotspot({
      x: CARD.x,
      y: CARD.y,
      w: CARD.w,
      h: CARD.h,
      cursor: 'pointer',
      id: 'player-card',
      onClick: () => this.ctx.router.go('customize'),
    });
    const frame = this.ctx.assets.get('homePlayerCard');
    if (frame) {
      drawImageSmooth(g, frame, CARD.x, CARD.y, CARD.w, CARD.h);
      // Anchors are fractions of the card rect, matching the frame's baked slots:
      // portrait bay ~[0.085..0.36]x[0.15..0.83]; text lanes on the right; the
      // XP bar sits in the thin slot at the bottom-right.
      const fx0 = (fx: number) => CARD.x + fx * CARD.w;
      const fy0 = (fy: number) => CARD.y + fy * CARD.h;
      this.drawPlayerPortrait(g, fx0, fy0, now);
      // Subtle dark scrim behind just the text lanes (kept off the portrait bay)
      // so ARCADE PLAYER / LV n / XP stay readable over busy regions of the frame.
      const scrimX = fx0(0.395);
      const scrimY = fy0(0.09);
      g.save();
      rrect(g, scrimX, scrimY, fx0(0.955) - scrimX, fy0(0.69) - scrimY, 7);
      g.fillStyle = 'rgba(6,4,14,0.42)';
      g.fill();
      g.restore();
      const tx = fx0(0.41);
      this.drawEditableName(g, tx, fy0(0.15), 2);
      drawText(g, 'LV ' + pl.level, tx, fy0(0.35), 2.5, GOLD, { glow: GOLD, glowBlur: 3 });
      drawText(g, pl.into + ' / ' + pl.need + ' XP', tx, fy0(0.585), 1.3, '#b9b3d6');
      bar(g, tx, fy0(0.73), fx0(0.93) - tx, 0.11 * CARD.h, pl.need > 0 ? pl.into / pl.need : 0, CYAN);
      this.drawCardAffordance(g, cardHover);
      return;
    }
    // Fallback: procedural panel + blocky avatar.
    panel(g, CARD.x, CARD.y, CARD.w, CARD.h, { radius: 12, fill: PANEL, border: CYAN, borderWidth: 3 });
    this.drawPlayerPortrait(g, (f) => CARD.x + f * CARD.w, (f) => CARD.y + f * CARD.h, now);
    this.drawEditableName(g, CARD.x + 96, CARD.y + 14, 2);
    drawText(g, 'LV ' + pl.level, CARD.x + 96, CARD.y + 38, 3, GOLD, { glow: GOLD, glowBlur: 3 });
    bar(g, CARD.x + 96, CARD.y + 78, 248, 14, pl.need > 0 ? pl.into / pl.need : 0, CYAN);
    drawText(g, pl.into + '/' + pl.need + ' XP', CARD.x + 96, CARD.y + 62, 1.5, '#9a93bd');
    this.drawCardAffordance(g, cardHover);
  }

  /** Home portrait plus the complete earned Cyan Profile Frame when equipped.
   * The PNG is always drawn whole and above the portrait: its wing tips, lower
   * gem, dark inner window and corner bolts are not recreated in canvas. */
  private drawPlayerPortrait(
    g: CanvasRenderingContext2D,
    fx0: (fraction: number) => number,
    fy0: (fraction: number) => number,
    now: number,
  ): void {
    const equipped = this.ctx.store.state.cosmetics.profileFrame === 'r_frame';
    const portrait = this.ctx.assets.get('homePlayer');
    const cx = fx0(0.2225);
    const cy = fy0(0.49);
    if (equipped) {
      // A dark inset makes the character sit behind the frame's interior window.
      rrect(g, cx - 34, cy - 37, 68, 79, 9);
      g.fillStyle = '#0a1020';
      g.fill();
      const frame = collectibleIcon('r_frame');
      if (frame) {
        const pulse = Math.max(0, (this.profileFramePulseUntil - now) / 720);
        g.save();
        g.shadowColor = CYAN;
        g.shadowBlur = 7 + 26 * pulse;
        g.globalAlpha = 0.88 + 0.12 * (0.5 + 0.5 * Math.sin(now / 240));
        drawImageContain(g, frame, cx, cy, 122, 134);
        g.restore();
      }
      // The supplied frame intentionally has a deep opaque interior. Restore
      // the portrait only inside that measured window AFTER drawing the whole
      // frame, so its cyan rails, four bolts, wing tips and both diamonds stay
      // completely intact rather than being painted over by the character.
      g.save();
      rrect(g, cx - 29, cy - 27, 58, 66, 7);
      g.clip();
      if (portrait) drawCropContain(g, portrait, PLAYER_PORTRAIT_CROP, cx - 29, cy - 29, 58, 68);
      else drawSprite(g, AVATAR, cx - 18, cy - 21, 3.6);
      g.restore();
      return;
    }
    if (portrait) drawCropContain(g, portrait, PLAYER_PORTRAIT_CROP, fx0(0.085), fy0(0.14), 0.275 * CARD.w, 0.7 * CARD.h);
    else drawSprite(g, AVATAR, fx0(0.12), fy0(0.28), 5);
  }

  /** A small backstage cue on the player card + a hover ring, so the earned
   * profile frame has a clear, physical route to the dressing room. */
  private drawCardAffordance(g: CanvasRenderingContext2D, hovered: boolean): void {
    drawText(g, '✦ ' + t('ui.customizeArcade'), CARD.x + CARD.w - 12, CARD.y + CARD.h - 20, 1.05, hovered ? GOLD : '#8a86a6', {
      align: 'right',
    });
    if (hovered) {
      rrect(g, CARD.x + 1, CARD.y + 1, CARD.w - 2, CARD.h - 2, 12);
      g.strokeStyle = 'rgba(255,210,63,0.7)';
      g.lineWidth = 2;
      g.stroke();
    }
  }

  /** The player's display name (their custom name, else the localized default)
   *  with a small pencil edit-cue. It registers its OWN click target that opens
   *  the rename dialog; because it's registered after the whole-card hotspot,
   *  clicking the name edits it while clicking elsewhere still opens the gallery. */
  private drawEditableName(g: CanvasRenderingContext2D, x: number, y: number, scale: number): void {
    const name = this.ctx.store.playerName() || t('ui.arcadePlayer');
    const w = measureText(name, scale);
    const hx = x - 4;
    const hy = y - 4;
    const hw = w + 32;
    const hh = GLYPH_H * scale + 8;
    const hovered = this.ctx.stage.hotspot({
      x: hx,
      y: hy,
      w: hw,
      h: hh,
      cursor: 'pointer',
      id: 'player-name',
      onClick: () => this.ctx.editPlayerName(),
    });
    drawText(g, name, x, y, scale, hovered ? GOLD : INK);
    drawPencil(g, x + w + 14, y + (GLYPH_H * scale) / 2, 12, hovered ? GOLD : '#9a93bd');
  }

  /** Top-right counters: the SHARED coin + token HUD plaques (coin balance
   * stacked over lifetime tokens) so the HUD matches the capsule + project-detail
   * screens. Both helpers auto-fit the value into the plaque's dark window and
   * carry their own procedural fallback; the coin plaque is the coin-rain target
   * (its center is COINS_TARGET). */
  private drawCoinPlaque(g: CanvasRenderingContext2D): void {
    const store = this.ctx.store;
    const coins = fmtComma(Math.round(this.displayCoins.value));
    const tokens = fmtComma(store.state.stats.lifetimeTokens);
    drawCoinHud(g, this.ctx.assets, HUD_X, HUD_COIN_Y, HUD_W, coins);
    drawTokenHud(g, this.ctx.assets, HUD_X, HUD_TOKEN_Y, HUD_W, tokens);
  }

  /** SYNC button — the primary action. Its compact physical label always names
   * the action, while demo identity stays on the persistent plaque and in the
   * post-sync feedback below the HUD. */
  private drawSyncButton(g: CanvasRenderingContext2D): void {
    const syncHover = this.ctx.stage.hotspot({
      x: SYNC.x,
      y: SYNC.y,
      w: SYNC.w,
      h: SYNC.h,
      cursor: 'pointer',
      id: 'sync',
      onClick: () => void this.doSync(),
    });
    const label = this.syncing ? t('ui.syncing') : t('ui.sync');
    const states = this.ctx.assets.get('homeSyncStates');
    if (states) {
      const crop = this.syncing ? SYNC_STATE_CROPS.pressed : syncHover ? SYNC_STATE_CROPS.hover : SYNC_STATE_CROPS.default;
      // Draw the square-ish button state (aspect ~1.04); keep the full SYNC rect
      // as the click target. Left-aligned next to the coin plaque. The dest size
      // is FIXED off the default crop so hover/pressed don't change the on-screen
      // button width (their source crops differ by a few px).
      const bh = 88;
      const bw = Math.round(bh * (SYNC_STATE_CROPS.default.sw / SYNC_STATE_CROPS.default.sh));
      const bx = SYNC.x + 6;
      const by = SYNC.y - 8;
      drawImageSmooth(g, states, bx, by, bw, bh, crop);
      const scale = this.syncing ? 1.55 : 3;
      drawText(g, label, bx + bw / 2, by + bh / 2 - GLYPH_H * scale * 0.5, scale, '#0b2015', {
        align: 'center',
        shadow: 'rgba(255,255,255,0.35)',
      });
      return;
    }
    // Fallback: the original green rounded button.
    const syncFill = this.syncing ? '#2f6f45' : syncHover ? '#7be88a' : GREEN;
    panel(g, SYNC.x, SYNC.y, SYNC.w, SYNC.h, { radius: 14, fill: syncFill, border: '#2f8f4b', borderWidth: 3 });
    drawText(g, label, SYNC.x + SYNC.w / 2, SYNC.y + 22, this.syncing ? 2.6 : 5, '#0b2015', {
      align: 'center',
      shadow: 'rgba(255,255,255,0.35)',
    });
  }

  private drawMarquee(g: CanvasRenderingContext2D, now: number): void {
    const cx = 800;
    // Generated neon title sign, fit into the marquee band by aspect (1567x712 =>
    // 2.201). It is the marquee's sole content; the token-loop explanation is
    // mounted on the physical floor guide sign instead. The sign occasionally
    // flickers by swapping to the dropout/burst frames (same size, same rect —
    // never redrawn as canvas text), so it reads as a living neon.
    let frameKey = this.logoFlickerFrame(now);
    let logo = this.ctx.assets.get(frameKey);
    if (!logo) {
      frameKey = 'homeLogo';
      logo = this.ctx.assets.get('homeLogo');
    }
    if (logo) {
      // Nudged fully onto the top edge (its top bulb row was clipped at y-20).
      const lh = 124;
      const lw = lh * 2.201;
      const x0 = cx - lw / 2;
      const y0 = 6;
      // The flicker frames' visible art fills the canvas by slightly different
      // amounts, so map THIS frame's alpha bbox onto the SAME on-screen box the
      // steady sign occupies — otherwise the sign appears to shrink when it
      // flickers. (For the steady frame this is exactly (x0,y0,lw,lh).)
      const N = LOGO_FRAME_ALPHA.homeLogo;
      const A = LOGO_FRAME_ALPHA[frameKey];
      const dw = ((N.x1 - N.x0) * lw) / (A.x1 - A.x0);
      const dh = ((N.y1 - N.y0) * lh) / (A.y1 - A.y0);
      const dx = x0 + N.x0 * lw - A.x0 * dw;
      const dy = y0 + N.y0 * lh - A.y0 * dh;
      // Very subtle whole-sign "breathing": a slow (~4.3s period) sine drives a
      // small global-alpha + soft-glow oscillation so the neon feels powered even
      // between flicks. Amplitude is tiny (alpha never drops below 0.93) so the
      // sign always stays clearly readable; this is not per-tube flicker — it is
      // one gentle wash over the whole frame, and it does NOT touch the
      // LOGO_FRAME_ALPHA size-lock (dx,dy,dw,dh) above.
      const breath = 0.5 + 0.5 * Math.sin(now / 680); // 0..1, ~4.3s period
      g.save();
      g.globalAlpha = 0.93 + 0.07 * breath; // 0.93 .. 1.0
      g.shadowColor = 'rgba(95,230,214,0.35)';
      g.shadowBlur = 5 + 6 * breath; // 5 .. 11 soft cyan halo
      drawImageSmooth(g, logo, dx, dy, dw, dh);
      g.restore();
      return;
    }
    // Fallback: code-drawn neon TOKEN / ARCADE sign.
    // marquee bulbs, twinkling
    for (let i = 0; i < 9; i++) {
      const bx = 662 + i * 34;
      const on = (Math.floor(now / 220) + i) % 2 === 0;
      g.beginPath();
      g.arc(bx, 10, 3, 0, Math.PI * 2);
      if (on) {
        g.save();
        g.shadowColor = GOLD;
        g.shadowBlur = 8;
        g.fillStyle = GOLD;
        g.fill();
        g.restore();
      } else {
        g.fillStyle = 'rgba(255,210,63,0.25)';
        g.fill();
      }
    }
    drawText(g, 'TOKEN', cx, 18, 8, MAGENTA, { align: 'center', glow: MAGENTA, glowBlur: 6, shadow: 'rgba(0,0,0,0.5)' });
    drawText(g, 'ARCADE', cx, 74, 8, CYAN, { align: 'center', glow: CYAN, glowBlur: 6, shadow: 'rgba(0,0,0,0.5)' });
  }

  // Neon-logo flicker timing (ms). The sign holds a bright NORMAL frame for a
  // long randomized gap, then does exactly ONE short flick and returns to
  // normal. The long normal gap (>= FLICK_GAP_MIN) is re-rolled after every
  // flick, so two flicks can never merge into a mouse-double-click; the flick is
  // usually a dark dropout and only rarely (~BURST_CHANCE) a bright burst.
  private static readonly FLICK_GAP_MIN = 2200; // min bright/normal time before a flick
  private static readonly FLICK_GAP_RAND = 3300; // + up to this ⇒ 2.2..5.5s gaps
  private static readonly DROPOUT_MIN = 40; // dropout flick length
  private static readonly DROPOUT_RAND = 40; // ⇒ 40..80ms
  private static readonly BURST_MIN = 60; // burst flick length
  private static readonly BURST_RAND = 30; // ⇒ 60..90ms
  private static readonly BURST_CHANCE = 0.2; // ~1 in 5 flicks is a burst (rare over-bright pop)

  /** Which logo frame to draw this instant. The sign is a stable, bright NORMAL
   * frame the large majority of the time; every ~2.2-5.5s (randomized) it does a
   * single short flick — usually a dropout dip, rarely a burst pop — then goes
   * straight back to normal. Every gap/duration is re-randomized so no fixed loop
   * is perceptible, and a fresh long gap after each flick guarantees no paired
   * "double-blink". A single frame swap per event — never a sequence. */
  private logoFlickerFrame(now: number): 'homeLogo' | 'homeLogoDropout' | 'homeLogoBurst' {
    if (this.flickerUntil < 0) {
      // First frame: start lit for a full randomized gap before the first flick.
      this.flickerFrame = 'homeLogo';
      this.flickerUntil = now + RoomScreen.FLICK_GAP_MIN + Math.random() * RoomScreen.FLICK_GAP_RAND;
      return this.flickerFrame;
    }
    if (now < this.flickerUntil) return this.flickerFrame;
    if (this.flickerFrame === 'homeLogo') {
      // Long lit gap ended → one short flick (dropout most of the time).
      if (Math.random() < RoomScreen.BURST_CHANCE) {
        this.flickerFrame = 'homeLogoBurst';
        this.flickerUntil = now + RoomScreen.BURST_MIN + Math.random() * RoomScreen.BURST_RAND;
      } else {
        this.flickerFrame = 'homeLogoDropout';
        this.flickerUntil = now + RoomScreen.DROPOUT_MIN + Math.random() * RoomScreen.DROPOUT_RAND;
      }
    } else {
      // Flick ended → straight back to a fresh long normal gap, so two flicks can
      // never merge into a double-blink.
      this.flickerFrame = 'homeLogo';
      this.flickerUntil = now + RoomScreen.FLICK_GAP_MIN + Math.random() * RoomScreen.FLICK_GAP_RAND;
    }
    return this.flickerFrame;
  }

  // ---- left column: cabinets ---------------------------------------------

  // Cabinet wall geometry: full-size machine rows at a fixed pitch, stacked in a
  // clipped viewport under the header. ROW_BASE is the first row's y at scroll 0;
  // the window spans ROW_BASE..(ROW_BASE+WINDOW_H), clipped a touch wider so a
  // row's 6px art overhang isn't shaved.
  private static readonly ROW_PITCH = 140;
  private static readonly ROW_BASE = 200;
  private static readonly WINDOW_H = 700;
  private static readonly VIEW = { x: CAB.x, y: 190, w: CAB.w, h: 710 };

  private drawCabinets(g: CanvasRenderingContext2D): void {
    drawText(g, t('ui.cabinets'), CAB.x + 8, CAB.y + 8, 3, CYAN, { glow: CYAN, glowBlur: 3 });
    const projects = this.ctx.store.state.projects;

    if (projects.length === 0) {
      this.drawDormantCabinets(g);
      return;
    }

    // The wall scrolls: every project gets a row, but only ~5 fit at once, so the
    // column is a wheel-scrollable viewport instead of a hard top-5 cutoff.
    const view = RoomScreen.VIEW;
    const contentH = projects.length * RoomScreen.ROW_PITCH;
    const maxScroll = Math.max(0, contentH - RoomScreen.WINDOW_H);
    // Only claim the wheel when there is something to scroll (so a short list
    // never swallows the page's own scroll), then apply + clamp. Project count
    // can change between frames after a sync, so re-clamp every frame.
    if (maxScroll > 0) this.ctx.stage.scrollRegion(view.x, view.y, view.w, view.h);
    this.cabScrollY = Math.max(0, Math.min(maxScroll, this.cabScrollY + this.ctx.stage.takeScrollDelta()));

    g.save();
    g.beginPath();
    g.rect(view.x, view.y, view.w, view.h);
    g.clip();
    for (let i = 0; i < projects.length; i++) {
      const rowY = RoomScreen.ROW_BASE + i * RoomScreen.ROW_PITCH - this.cabScrollY;
      // Cull rows fully outside the viewport (only ~5 of many are ever visible).
      if (rowY + 122 < view.y || rowY - 8 > view.y + view.h) continue;
      this.drawCabinetRow(g, projects[i], rowY, view);
    }
    g.restore();

    this.drawCabinetScrollHints(g, view, contentH, maxScroll);
  }

  /** One full-size machine row (stage cabinet art + code nameplate/stats/
   *  progress) drawn at on-screen `rowY` inside the scrolling cabinet viewport.
   *  Color and ornament derive from the project's LEVEL: the numeric level
   *  (1..50) drives the "LVn" plate + power meter, while the visual STAGE (0..4)
   *  picks the cabinet body art and its neon accent. */
  private drawCabinetRow(
    g: CanvasRenderingContext2D,
    proj: Project,
    rowY: number,
    view: { x: number; y: number; w: number; h: number },
  ): void {
    const info = levelInfo(proj.tokens);
    const stage = info.stage;
    const accent = stageAccent(stage.index);

    // Click target opens the project's cabinet, clamped to the viewport so a
    // row scrolled half-off isn't clickable where it's been clipped away.
    const rowTop = rowY - 4;
    const hy = Math.max(view.y, rowTop);
    const hh = Math.min(rowTop + 134, view.y + view.h) - hy;
    let hovered = false;
    if (hh > 12) {
      hovered = this.ctx.stage.hotspot({
        x: CAB.x,
        y: hy,
        w: CAB.w,
        h: hh,
        cursor: 'pointer',
        id: 'cab-' + proj.id,
        onClick: () => this.ctx.router.go('cabinet', { id: proj.id }),
      });
    }
    if (hovered) {
      panel(g, CAB.x, rowY - 4, CAB.w, 134, { radius: 10, fill: 'rgba(95,230,214,0.08)', border: 'rgba(95,230,214,0.4)', borderWidth: 2 });
    }

    const sheet = this.ctx.assets.get('homeLevelCabinets');
    if (sheet) {
      const crop = homeLevelCabinetCrop(stage.index);
      const ch = 128;
      const cw = ch * (crop.sw / crop.sh);
      const cdx = CAB.x + 4;
      const cdy = rowY - 6;
      // soft floor shadow so the machine reads as standing in the room
      g.save();
      g.fillStyle = 'rgba(0,0,0,0.35)';
      g.beginPath();
      g.ellipse(cdx + cw / 2, cdy + ch - 4, cw * 0.42, 7, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
      const pulse = this.ctx.fx.pulseAmount(proj.id);
      if (pulse > 0) {
        g.save();
        g.shadowColor = GOLD;
        g.shadowBlur = 26 * pulse;
        drawImageSmooth(g, sheet, cdx, cdy, cw, ch, crop);
        g.restore();
      }
      drawImageSmooth(g, sheet, cdx, cdy, cw, ch, crop);
      // Numeric level plate centered on THIS stage sprite's measured screen
      // window (the wider Neon crop centers at ~0.42, not 0.5).
      const sc = homeCabinetScreen(stage.index);
      drawLevelPlate(g, cdx + sc.cx * cw, cdy + sc.cy * ch, info.level, accent);
    } else {
      // Procedural fallback: tint the code-drawn cabinet to the stage accent
      // and drive its 1..5 flourish from the visual stage (index + 1).
      drawCabinet(g, CAB.x + 8, rowY, 84, 130, {
        name: proj.name,
        level: stage.index + 1,
        id: proj.id,
        on: true,
        progress: info.progress,
        glow: 1 + this.ctx.fx.pulseAmount(proj.id),
        skin: { neon: accent, dark: '#12121f', mid: '#20203a', name: accent },
      });
    }

    // Machine nameplate zone (not a spreadsheet row): the name reads as this
    // machine's marquee in its visual-stage accent color; a small stage badge
    // sits at the row's edge; stats are icon-led; the progress is a small
    // segmented power meter (progress within the current level), not a bar.
    const tx = 112;
    drawText(g, clip(proj.name, 13), tx, rowY + 10, 2, accent, { glow: accent, glowBlur: 3 });
    drawStageBadge(g, stage.index, stage.name, accent, CAB.x + CAB.w - 32, rowY - 2, 28, this.ctx.assets.get('levelUiKit'));
    drawSprite(g, 'tokenChip', tx, rowY + 38, 1.5);
    drawText(g, fmtCompact(proj.tokens) + ' ' + t('ui.tokens'), tx + 30, rowY + 40, 1.75, CYAN);
    coinGlow(g, tx + 10, rowY + 74, 20);
    drawCoin(g, tx + 10, rowY + 74, 10);
    drawText(g, fmtComma(proj.coins) + ' ' + t('ui.baseCoins'), tx + 28, rowY + 67, 2, GOLD);
    drawStageProgress(g, tx, rowY + 92, 128, stage.index, info.progress, accent, this.ctx.assets.get('levelUiKit'));
  }

  /** Scroll affordances for the cabinet wall: a soft dark fade at whichever end
   *  has more machines beyond it (so a half-row reads as "more below/above"), and
   *  a slim glowing position bar in the right gutter. Nothing is drawn when the
   *  whole list already fits. */
  private drawCabinetScrollHints(
    g: CanvasRenderingContext2D,
    view: { x: number; y: number; w: number; h: number },
    contentH: number,
    maxScroll: number,
  ): void {
    if (maxScroll <= 0) return;
    const top = view.y;
    const bottom = view.y + view.h;

    // Directional fades — only the edge that hides machines gets one.
    if (this.cabScrollY > 1) {
      const grad = g.createLinearGradient(0, top, 0, top + 26);
      grad.addColorStop(0, 'rgba(6,4,12,0.85)');
      grad.addColorStop(1, 'rgba(6,4,12,0)');
      g.fillStyle = grad;
      g.fillRect(view.x, top, view.w, 26);
    }
    if (this.cabScrollY < maxScroll - 1) {
      const grad = g.createLinearGradient(0, bottom - 26, 0, bottom);
      grad.addColorStop(0, 'rgba(6,4,12,0)');
      grad.addColorStop(1, 'rgba(6,4,12,0.85)');
      g.fillStyle = grad;
      g.fillRect(view.x, bottom - 26, view.w, 26);
      // A dim "more below" chevron centered over the bottom fade.
      g.save();
      g.globalAlpha = 0.7;
      g.strokeStyle = CYAN;
      g.lineWidth = 2;
      const ccx = view.x + view.w / 2;
      g.beginPath();
      g.moveTo(ccx - 7, bottom - 12);
      g.lineTo(ccx, bottom - 6);
      g.lineTo(ccx + 7, bottom - 12);
      g.stroke();
      g.restore();
    }

    // Position bar in the far-right gutter (just past the stage badges at x372).
    const trackX = view.x + view.w - 4;
    const trackW = 3;
    g.fillStyle = 'rgba(255,255,255,0.08)';
    g.fillRect(trackX, top, trackW, view.h);
    const thumbH = Math.max(28, view.h * (RoomScreen.WINDOW_H / contentH));
    const thumbY = top + (view.h - thumbH) * (this.cabScrollY / maxScroll);
    g.save();
    g.shadowColor = CYAN;
    g.shadowBlur = 5;
    g.fillStyle = CYAN;
    g.fillRect(trackX, thumbY, trackW, thumbH);
    g.restore();
  }

  /** First-run: three dormant, powered-off machines waiting for tokens. */
  private drawDormantCabinets(g: CanvasRenderingContext2D): void {
    const skin = this.ctx.assets.get('cabinetSkins');
    for (let i = 0; i < 3; i++) {
      const rowY = 214 + i * 150;
      if (skin) {
        const crop = cabinetCropFor('dormant-' + i);
        const ch = 128;
        const cw = ch * (crop.sw / crop.sh);
        const cdx = CAB.x + 4;
        // floor shadow
        g.save();
        g.fillStyle = 'rgba(0,0,0,0.3)';
        g.beginPath();
        g.ellipse(cdx + cw / 2, rowY + ch - 8, cw * 0.42, 7, 0, 0, Math.PI * 2);
        g.fill();
        g.restore();
        drawImageSmooth(g, skin, cdx, rowY - 6, cw, ch, crop);
        // Powered-off: darken the machine and put a dim "zzz" on its screen.
        g.save();
        g.globalAlpha = 0.62;
        g.fillStyle = '#07040d';
        g.beginPath();
        g.ellipse(cdx + cw / 2, rowY + ch / 2 - 6, cw * 0.55, ch * 0.55, 0, 0, Math.PI * 2);
        g.fill();
        g.restore();
        drawText(g, 'Z Z', cdx + cw / 2, rowY + ch * 0.22, 1.5, '#6a6a86', { align: 'center' });
      } else {
        drawCabinet(g, CAB.x + 8, rowY, 84, 130, { name: '???', level: 1, on: false, id: 'dormant-' + i });
      }
    }
    drawText(g, t('ui.noCabinets'), 112, 250, 2, INK);
    drawText(g, t('ui.syncTo'), 112, 300, 3, GOLD, { glow: GOLD, glowBlur: 3 });
    drawText(g, t('ui.powerUp'), 112, 336, 3, GOLD, { glow: GOLD, glowBlur: 3 });
    drawText(g, t('ui.yourMachines'), 112, 380, 2, '#9a93bd');
  }

  // ---- center stage: coin bank + player ----------------------------------

  private drawCenter(g: CanvasRenderingContext2D, now: number): void {
    const store = this.ctx.store;
    const bankCx = BANK.x + BANK.w / 2;

    this.drawTokenGuideSign(g);

    // The coin bank is the visual centerpiece and also a big sync hotspot.
    const bankHover = this.ctx.stage.hotspot({
      x: BANK.x,
      y: BANK.y,
      w: BANK.w,
      h: BANK.h,
      cursor: 'pointer',
      id: 'bank',
      onClick: () => void this.doSync(),
    });
    const bankImg = this.ctx.assets.get('coinBank');
    if (bankImg) {
      // Generated coin-bank machine: the most tempting object on the screen.
      drawImageSmooth(g, bankImg, BANK.x, BANK.y, BANK.w, BANK.h);
      // Live balance on a small dark plate over the coin tray at the base, so
      // the number reads as coins collecting in the machine.
      const pw = 224;
      const ph = 38;
      const px = bankCx - pw / 2;
      const py = BANK.y + BANK.h * 0.855;
      rrect(g, px, py, pw, ph, 8);
      g.fillStyle = 'rgba(9,6,18,0.82)';
      g.fill();
      g.strokeStyle = 'rgba(95,230,214,0.6)';
      g.lineWidth = 2;
      g.stroke();
      drawText(g, fmtComma(Math.round(this.displayCoins.value)) + ' ' + t('ui.coins'), bankCx, py + 11, 2.5, GOLD, {
        align: 'center',
        glow: GOLD,
        glowBlur: 3,
      });
    } else {
      drawCoinBank(g, BANK.x, BANK.y, BANK.w, BANK.h, {
        fill: Math.min(1, store.state.coinResidue / CONFIG.TOKENS_PER_COIN),
        tokens: store.state.stats.lifetimeTokens,
        t: now / 1000,
        label: t('ui.coinBank'),
        sublabel: fmtComma(Math.round(this.displayCoins.value)) + ' ' + t('ui.coins'),
      });
    }
    if (bankHover) {
      panel(g, BANK.x - 6, BANK.y - 6, BANK.w + 12, BANK.h + 12, { radius: 18, border: 'rgba(255,210,63,0.35)', borderWidth: 2 });
    }

    // Subtle floor glints near the base tie the machine into the room.
    drawFloorGlints(g, now);

    // The player stands just to the right of the bank with a gentle idle bob.
    const character = this.ctx.assets.get('homePlayer');
    if (character) {
      const ph = 152;
      const pw = ph * (PLAYER_BODY_CROP.sw / PLAYER_BODY_CROP.sh);
      const px = bankCx + 176;
      const floorY = 792;
      const by = floorY - ph + Math.sin(now / 400) * 4;
      g.save();
      g.fillStyle = 'rgba(0,0,0,0.3)';
      g.beginPath();
      g.ellipse(px + pw / 2, floorY - 2, pw * 0.52, 8, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
      drawImageSmooth(g, character, px, by, pw, ph, PLAYER_BODY_CROP);
    } else {
      drawPlayer(g, bankCx + 210, 560 + Math.sin(now / 400) * 6, 7);
    }

    // Standee sign centered under the bank.
    panel(g, bankCx - 160, 736, 320, 60, { radius: 8, fill: PANEL, border: MAGENTA, borderWidth: 2 });
    drawText(g, t('ui.syncUsage'), bankCx, 744, 2, INK, { align: 'center' });
    drawText(g, t('ui.earnCoins'), bankCx, 768, 2, GOLD, { align: 'center', glow: GOLD, glowBlur: 3 });

    // First-run call to action: "insert a coin" into the machine, then sync.
    if (!store.state.firstRunDone) {
      // A coin bobbing above the bank's coin slot, dropping in.
      const slotX = BANK.x + BANK.w * 0.62;
      const slotY = BANK.y + BANK.h * 0.66;
      const bob = (Math.sin(now / 400) + 1) / 2; // 0..1
      const coinY = slotY - 20 - bob * 10;
      g.save();
      g.globalAlpha = 0.9;
      drawCoin(g, slotX, coinY, 11, Math.cos(now / 200));
      g.strokeStyle = 'rgba(255,210,63,0.6)';
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(slotX, coinY + 12);
      g.lineTo(slotX, slotY - 4);
      g.stroke();
      g.restore();
      // Pulsing prompt over the glass.
      const a = 0.55 + 0.45 * Math.sin(now / 260);
      g.globalAlpha = a;
      drawText(g, t('ui.insertCoin'), bankCx, BANK.y + 150, 4, GOLD, { align: 'center', glow: GOLD, glowBlur: 6, shadow: 'rgba(0,0,0,0.7)' });
      drawText(g, t('ui.tapToSync'), bankCx, BANK.y + 192, 4, GOLD, { align: 'center', glow: GOLD, glowBlur: 6, shadow: 'rgba(0,0,0,0.7)' });
      g.globalAlpha = 1;
    }
  }

  /** The Home loop is explained by a localized, authored A-frame planted on
   * the floor. The letters are part of the pixel art, matching the original
   * prototype's sign-painting rather than floating canvas text. */
  private drawTokenGuideSign(g: CanvasRenderingContext2D): void {
    const asset = this.ctx.store.state.settings.language === 'zh-CN' ? 'homeTokenGuideBoardZh' : 'homeTokenGuideBoardEn';
    const sign = this.ctx.assets.get(asset);
    if (!sign) return;

    // PM-approved readability geometry. It ends at x600, leaving a 20px lane
    // before BANK.x=620, and starts 14px after the cabinet column.
    const x = 390;
    const y = 512;
    const w = 210;
    const h = 272;
    drawImageSmooth(g, sign, x, y, w, h);
  }

  // ---- right column: prize wall preview ----------------------------------

  private drawPrizeWall(g: CanvasRenderingContext2D): void {
    const hovered = this.ctx.stage.hotspot({
      x: WALL.x,
      y: WALL.y,
      w: WALL.w,
      h: WALL.h,
      cursor: 'pointer',
      id: 'wall',
      onClick: () => this.ctx.router.go('capsule'),
    });
    const shelf = this.ctx.assets.get('prizeWall');
    if (shelf) {
      this.drawPrizeWallShelf(g, shelf, hovered);
    } else {
      this.drawPrizeWallProcedural(g, hovered);
    }
    this.drawCollectionMilestones(g);
    // A separate, clearly-labelled prize-wall control opens the backstage
    // dressing room. Registered after the wall hotspot so it owns this small
    // physical control area rather than sending the player to the capsule page.
    this.drawCustomizeWallControl(g);
  }

  /** Permanent P1C room upgrades. Each tier is derived from unique valid
   * prizes, so no extra save flag or currency can drift out of sync. */
  private drawCollectionMilestones(g: CanvasRenderingContext2D): void {
    const tier = this.ctx.store.collectionMilestoneTier();
    if (tier >= 1) {
      const shelf = this.ctx.assets.get('collectionNeonShelf');
      if (shelf) {
        g.save();
        g.shadowColor = MAGENTA;
        g.shadowBlur = 12;
        drawImageContain(g, shelf, WALL.x + WALL.w / 2, WALL.y + 404, WALL.w - 48, 36);
        g.restore();
        drawImageContain(g, shelf, WALL.x + WALL.w / 2, WALL.y + 404, WALL.w - 48, 36);
      }
    }
    if (tier >= 2) {
      const lights = this.ctx.assets.get('collectionPrizeLights');
      if (lights) drawImageContain(g, lights, WALL.x + WALL.w / 2, WALL.y + 56, 220, 56);
    }
    if (tier >= 3) {
      const pedestal = this.ctx.assets.get('collectionPedestal');
      if (pedestal) drawImageContain(g, pedestal, WALL.x + WALL.w / 2, WALL.y + WALL.h - 37, WALL.w - 76, 74);
    }
    if (tier >= 4) {
      const crown = this.ctx.assets.get('collectionCrownMarquee');
      if (crown) drawImageContain(g, crown, WALL.x + WALL.w / 2, WALL.y + 36, WALL.w - 62, 96);
    }
  }

  private drawCustomizeWallControl(g: CanvasRenderingContext2D): void {
    const w = 240;
    const h = 38;
    const x = WALL.x + (WALL.w - w) / 2;
    const y = WALL.y + WALL.h - 116;
    const hovered = this.ctx.stage.hotspot({
      x,
      y,
      w,
      h,
      cursor: 'pointer',
      id: 'wall-customize',
      onClick: () => this.ctx.router.go('customize'),
    });
    panel(g, x, y, w, h, {
      radius: 7,
      fill: hovered ? '#2a1f4a' : 'rgba(12,8,24,0.9)',
      border: hovered ? GOLD : '#9a6cff',
      borderWidth: hovered ? 2.5 : 2,
    });
    drawText(g, t('ui.customizeArcade'), x + w / 2, y + 12, 1.35, hovered ? GOLD : INK, {
      align: 'center',
      glow: hovered ? GOLD : undefined,
      glowBlur: 3,
    });
  }

  /** Prize wall rendered on the generated shelf asset. */
  private drawPrizeWallShelf(g: CanvasRenderingContext2D, shelf: HTMLImageElement, hovered: boolean): void {
    const store = this.ctx.store;
    if (hovered) {
      g.save();
      g.shadowColor = MAGENTA;
      g.shadowBlur = 24;
      drawImageSmooth(g, shelf, WALL.x, WALL.y, WALL.w, WALL.h);
      g.restore();
    }
    drawImageSmooth(g, shelf, WALL.x, WALL.y, WALL.w, WALL.h);

    // Header over the marquee band.
    drawText(g, t('ui.prizeWall'), WALL.x + WALL.w / 2, WALL.y + 88, 2.5, MAGENTA, {
      align: 'center',
      glow: MAGENTA,
      glowBlur: 4,
      shadow: 'rgba(0,0,0,0.6)',
    });

    // Collectible slots aligned to the shelf's measured 4x5 window grid
    // (PRIZE_WALL_SLOTS from scripts/measure-assets.mjs). Owned items are
    // shown first (lit) so the wall visibly fills up; the rest read as locked
    // mysteries. Sprites center by their VISIBLE pixel bounds.
    const owned = COLLECTIBLES.filter((c) => store.state.owned[c.id]);
    const locked = COLLECTIBLES.filter((c) => !store.state.owned[c.id]);
    const display = owned.concat(locked).slice(0, 20);
    for (let i = 0; i < display.length; i++) {
      const c = display[i];
      const slot = PRIZE_WALL_SLOTS[Math.floor(i / 4)][i % 4];
      const cx = WALL.x + slot.x * WALL.w;
      const cy = WALL.y + slot.y * WALL.h;
      const isOwned = !!store.state.owned[c.id];
      if (isOwned) {
        radial(g, cx, cy, 34, 'rgba(255,255,255,0.10)');
        radial(g, cx, cy, 26, this.rarityGlow(c.rarity));
        const icon = collectibleIcon(c.id);
        if (icon) drawIconCentered(g, icon, cx, cy, 46);
        else drawSpriteCentered(g, c.sprite, cx, cy, 46, c.tint);
      } else {
        drawPadlock(g, cx, cy, '#4a4270');
      }
    }

    // Collected count on the base plate.
    drawText(
      g,
      t('ui.collected', { n: store.ownedCount(), total: store.totalCollectibles() }),
      WALL.x + WALL.w / 2,
      WALL.y + WALL.h * 0.735,
      2,
      GOLD,
      { align: 'center', glow: GOLD, glowBlur: 3, shadow: 'rgba(0,0,0,0.6)' },
    );
  }

  private rarityGlow(rarity: keyof typeof RARITIES): string {
    const c = RARITIES[rarity].glow;
    return c.length === 7 ? c + '55' : c;
  }

  /** Procedural fallback prize wall (asset missing / still loading). */
  private drawPrizeWallProcedural(g: CanvasRenderingContext2D, hovered: boolean): void {
    const store = this.ctx.store;
    panel(g, WALL.x, WALL.y, WALL.w, WALL.h, {
      radius: 12,
      fill: 'rgba(20,15,36,0.55)',
      border: hovered ? MAGENTA : 'rgba(225,90,216,0.5)',
      borderWidth: hovered ? 3 : 2,
    });
    drawText(g, t('ui.prizeWall'), WALL.x + 12, WALL.y + 10, 3, MAGENTA, { glow: MAGENTA, glowBlur: 3 });

    const cols = 4;
    const slot = 78;
    const stride = 86;
    const startX = WALL.x + 12;
    const startY = WALL.y + 52;
    const count = Math.min(COLLECTIBLES.length, 28);
    for (let i = 0; i < count; i++) {
      const c = COLLECTIBLES[i];
      const sx = startX + (i % cols) * stride;
      const sy = startY + Math.floor(i / cols) * stride;
      const owned = !!store.state.owned[c.id];
      if (owned) {
        panel(g, sx, sy, slot, slot, { radius: 8, fill: '#241a3f', border: RARITIES[c.rarity].color, borderWidth: 2 });
        const icon = collectibleIcon(c.id);
        if (icon) drawIconCentered(g, icon, sx + slot / 2, sy + slot / 2, slot - 16);
        else drawSprite(g, c.sprite, sx + 7, sy + 7, 4, c.tint);
      } else {
        panel(g, sx, sy, slot, slot, { radius: 8, fill: '#0f0a1c', border: '#2a2440', borderWidth: 2 });
        drawText(g, '?', sx + slot / 2, sy + 24, 4, '#3a3352', { align: 'center' });
      }
    }

    const collectedY = startY + Math.ceil(count / cols) * stride + 6;
    drawText(
      g,
      t('ui.collected', { n: store.ownedCount(), total: store.totalCollectibles() }),
      WALL.x + WALL.w / 2,
      collectedY,
      2,
      GOLD,
      { align: 'center' },
    );
  }

  // ---- bottom rail: controls + spend --------------------------------------

  /** The spend rail rendered as a physical arcade counter / ticket desk. */
  private drawCounter(g: CanvasRenderingContext2D): void {
    const r = RAIL;
    const topH = 12; // the counter surface lip

    // Soft contact shadow on the floor beneath the counter.
    const sh = g.createLinearGradient(0, r.y + r.h, 0, r.y + r.h + 14);
    sh.addColorStop(0, 'rgba(0,0,0,0.5)');
    sh.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = sh;
    g.fillRect(r.x - 6, r.y + r.h, r.w + 12, 14);

    // Desk front face.
    rrect(g, r.x, r.y + topH, r.w, r.h - topH, 6);
    vgrad(g, r.x, r.y + topH, r.w, r.h - topH, '#241a38', '#0c0916');
    g.fill();
    // vertical panel seams so the face reads as a built counter
    g.strokeStyle = 'rgba(0,0,0,0.35)';
    g.lineWidth = 2;
    for (let sx = r.x + 300; sx < r.x + r.w - 40; sx += 244) {
      g.beginPath();
      g.moveTo(sx, r.y + topH + 6);
      g.lineTo(sx, r.y + r.h - 6);
      g.stroke();
    }

    // Counter top surface (a slightly overhanging beveled lip).
    rrect(g, r.x - 4, r.y, r.w + 8, topH + 4, 6);
    vgrad(g, r.x - 4, r.y, r.w + 8, topH + 4, '#4a3a6e', '#2a2040');
    g.fill();
    // bright highlight along the front edge of the counter top
    g.fillStyle = 'rgba(255,255,255,0.18)';
    g.fillRect(r.x - 4, r.y + 1, r.w + 8, 2);
    // neon underglow line just below the lip
    g.save();
    g.shadowColor = MAGENTA;
    g.shadowBlur = 8;
    g.strokeStyle = 'rgba(225,90,216,0.7)';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(r.x + 6, r.y + topH + 4);
    g.lineTo(r.x + r.w - 6, r.y + topH + 4);
    g.stroke();
    g.restore();

    // Corner rivets.
    g.fillStyle = '#6a6a86';
    for (const [rx, ry] of [
      [r.x + 8, r.y + r.h - 8],
      [r.x + r.w - 8, r.y + r.h - 8],
    ] as const) {
      g.beginPath();
      g.arc(rx, ry, 3, 0, Math.PI * 2);
      g.fill();
    }
  }

  private drawSpendRail(g: CanvasRenderingContext2D): void {
    const store = this.ctx.store;
    this.drawCounter(g);

    // Global controls (bottom-left): sound, settings, help — drawn from the
    // generated utility-button sheet (per-state art, no hand-drawn glyphs).
    const icoY = RAIL.y + 17;
    this.drawUtilityButton(g, RAIL.x + 8, icoY, 'mute', store.state.settings.muted ? 'muted' : 'soundOn', () => {
      store.toggleMute();
      this.ctx.sound.setMuted(store.state.settings.muted);
    });
    this.drawUtilityButton(g, RAIL.x + 62, icoY, 'settings', 'settings', () => this.ctx.openSettings());
    this.drawUtilityButton(g, RAIL.x + 116, icoY, 'help', 'help', () => this.ctx.openHelp());

    drawText(g, t('ui.spendCoins'), RAIL.x + 180, RAIL.y + 34, 2, GOLD, { glow: GOLD, glowBlur: 3 });

    // Shop cards — one per SHOP item (now 6: 2 capsule + sign/frame/theme/
    // trophy). Widths + spacing are computed from the count so the last card's
    // right edge stays inside the rail (<= ~1576) instead of overflowing.
    const count = SHOP.length;
    const cardH = 82;
    const cardW = Math.round(cardH * 2.26); // match the frame's 2.26:1 aspect (~185)
    const btnY = RAIL.y + 1;
    const startX = 348;
    const endX = 1578;
    const stride = count > 1 ? (endX - startX - cardW) / (count - 1) : 0;
    const cardFrame = this.ctx.assets.get('homeShopCard');
    for (let i = 0; i < count; i++) {
      const item = SHOP[i];
      const bx = Math.round(startX + i * stride);
      const complete = store.isGrantComplete(item);
      const afford = !complete && store.state.coins >= item.cost;
      const accent = complete ? '#6a6488' : item.kind === 'capsule' ? MAGENTA : GOLD;
      const hovered = this.ctx.stage.hotspot({
        x: bx,
        y: btnY,
        w: cardW,
        h: cardH,
        cursor: 'pointer',
        id: 'shop-' + item.id,
        onClick: () => this.onShop(item, bx + cardW / 2, btnY + cardH / 2, afford),
      });
      // Lit vs dim arcade card: dim when the player can't afford it.
      g.globalAlpha = complete ? 0.62 : afford ? 1 : 0.45;
      if (cardFrame) {
        if (hovered && afford) {
          g.save();
          g.shadowColor = accent;
          g.shadowBlur = 14;
          drawImageSmooth(g, cardFrame, bx, btnY, cardW, cardH);
          g.restore();
        }
        drawImageSmooth(g, cardFrame, bx, btnY, cardW, cardH);
      } else {
        panel(g, bx, btnY, cardW, cardH, {
          radius: 8,
          fill: afford ? (hovered ? '#2a1f4a' : '#201636') : '#150f22',
          border: afford ? accent : '#33284d',
          borderWidth: hovered ? 3 : 2,
        });
      }
      // Content placed at the frame's measured slots: icon square ~(0.215,0.44),
      // title lane at ~0.39/0.24, subtext lane ~0.39/0.43, gold price pill ~0.68.
      const icoCx = bx + cardW * 0.215;
      const icoCy = btnY + cardH * 0.44;
      const icoSize = cardH * 0.54;
      const repId = item.kind === 'grant' && item.pick ? this.repCollectibleId(item.pick) : null;
      const repIcon = repId ? collectibleIcon(repId) : null;
      if (item.kind === 'capsule') {
        // Generated capsule icons: single for pull1, the wider bundle for pull10.
        // Contain-fit by the asset's own aspect into the card's left icon slot so
        // the x10 bundle reads wider than x1 without stretching, cropping, or
        // reaching the label/price. (No procedural capsule icon anymore.)
        const bundle = item.id === 'pull10';
        const capImg = this.ctx.assets.get(bundle ? 'shopCapsuleBundle' : 'shopCapsuleSingle');
        if (capImg) {
          // Fit by height into the slot; the wider bundle gets a wider width cap
          // so it reads bigger than the single while its right edge stays clear
          // of the label lane (icon centre 0.215w, label starts 0.39w).
          const maxH = cardH * 0.66;
          const maxW = cardW * (bundle ? 0.31 : 0.28);
          drawImageContain(g, capImg, icoCx, icoCy, maxW, maxH);
        }
      } else if (repIcon) {
        drawIconCentered(g, repIcon, icoCx, icoCy, icoSize);
      } else {
        drawSpriteCentered(g, item.sprite, icoCx, icoCy, icoSize);
      }
      const txtX = bx + cardW * 0.39;
      drawText(g, complete ? t('ui.complete') : t('shop.' + item.id + '.label'), txtX, btnY + cardH * 0.19, 1.5, complete ? '#b9b3d6' : INK);
      drawText(g, complete ? t('ui.customizeArcade') : t('shop.' + item.id + '.sub'), txtX, btnY + cardH * 0.42, 1.2, '#b9b3d6');
      // Price centered on the gold pill, replaced by a terminal state so a
      // complete cosmetic card never implies that it can sell a duplicate.
      const priceCx = bx + cardW * 0.68;
      const priceCy = btnY + cardH * 0.7;
      if (complete) {
        drawText(g, '✓', priceCx, priceCy - 5, 2.3, CYAN, { align: 'center', glow: CYAN, glowBlur: 3 });
      } else {
        const priceStr = fmtComma(item.cost);
        const pw = measureText(priceStr, 2);
        drawCoin(g, priceCx - pw / 2 - 10, priceCy + 4, 7);
        drawText(g, priceStr, priceCx - pw / 2 + 6, priceCy - 3, 2, GOLD);
      }
      g.globalAlpha = 1;
    }
  }

  /** A representative collectible id for a grant shop item's type, so the card
   * can show that collectible's generated icon. Null if none / not a grant. */
  private repCollectibleId(type: string): string | null {
    const c = COLLECTIBLES.find((x) => x.type === type);
    return c ? c.id : null;
  }

  /** A bottom-left utility button drawn from the generated utility-button sheet
   * (home-utility-buttons-sheet-v2.png). The hit area is a FIXED 48x48 box; the
   * button art is drawn centered inside it at the sheet cell's own aspect
   * (~384:341 ≈ 1.125), and only the SOURCE crop row changes between normal/hover
   * — the destination rect is identical across states, so hovering never shifts
   * or resizes the button and the hotspot always matches the art. Falls back to a
   * plain neutral panel only while the sheet is still decoding. */
  private drawUtilityButton(
    g: CanvasRenderingContext2D,
    x: number,
    y: number,
    id: string,
    key: UtilButtonKey,
    onClick: () => void,
  ): void {
    const HIT = 48; // fixed hit box (matches the previous icon-button size)
    const hovered = this.ctx.stage.hotspot({ x, y, w: HIT, h: HIT, cursor: 'pointer', id: 'ico-' + id, onClick });
    const state: UtilButtonState = hovered ? 'hover' : 'normal';
    const crop = utilityButtonCrop(key, state);
    // Fixed dest rect: width = HIT, height keeps the cell aspect (cell is a touch
    // wider than tall, so it sits slightly inset vertically), centered in the box.
    // Because the cell size is uniform across states, this rect never changes.
    const bw = HIT;
    const bh = Math.round(HIT * (crop.sh / crop.sw));
    const bx = x + (HIT - bw) / 2;
    const by = y + (HIT - bh) / 2;
    const sheet = this.ctx.assets.get('homeUtilityButtons');
    if (sheet) {
      drawImageSmooth(g, sheet, bx, by, bw, bh, crop);
    } else {
      // Neutral placeholder until the sheet decodes — no hand-drawn glyphs.
      panel(g, bx, by, bw, bh, { radius: 8, fill: hovered ? '#2a1f4a' : '#1b1230', border: '#4a4270', borderWidth: 2 });
    }
  }

  // ---- actions ------------------------------------------------------------

  private onShop(item: ShopItem, cx: number, cy: number, afford: boolean): void {
    if (item.kind === 'capsule') {
      this.ctx.sound.click();
      this.ctx.router.go('capsule');
      return;
    }
    if (!afford || this.ctx.store.isGrantComplete(item)) {
      this.ctx.sound.error();
      return;
    }
    this.doBuy(item, cx, cy);
  }

  private doBuy(item: ShopItem, cx: number, cy: number): void {
    const res = this.ctx.store.buy(item);
    if (!res) {
      this.ctx.sound.error();
      return;
    }
    const r = RARITIES[res.collectible.rarity];
    const isNewCosmetic = !res.isDup && (res.collectible.type === 'theme' || res.collectible.type === 'frame');
    if (isNewCosmetic) {
      // Do not reveal a cosmetic on top of the clicked shop card / prize-wall
      // route. This safe location is the open stage just right of the Coin Bank.
      this.ctx.fx.burst(1102, 214, r.glow, 16);
      this.ctx.fx.cosmeticReveal(tCollectibleName(res.collectible.id), res.collectible.sprite, res.collectible.id);
    } else {
      this.ctx.fx.burst(cx, cy - 10, r.glow, 22);
      this.ctx.fx.banner(res.isDup ? t('ui.dup', { n: res.count }) : t('ui.unlockedBang'), cx, cy - 44, r.color, { scale: 4, life: 1.8 });
      this.ctx.fx.banner(tCollectibleName(res.collectible.id), cx, cy - 96, INK, { scale: 2, life: 2.2, vy: -22 });
    }
    this.ctx.fx.banner(t('ui.minusCoins', { n: item.cost }), COINS_TARGET.x, COINS_TARGET.y + 34, '#ff9a3c', { scale: 3, life: 1.4 });
    this.ctx.sound.reveal(res.collectible.rarity);
    this.ctx.sound.coin();
    for (const a of res.achievements) this.ctx.fx.toast(tAchName(a.id), tAchDesc(a.id), a.sprite);
    for (const milestone of res.milestones) {
      this.ctx.fx.toast(t(milestone.nameKey), t(milestone.descKey), 'starBadge');
    }
  }

  private async doSync(): Promise<void> {
    if (this.syncing) return;
    this.syncing = true;
    this.ctx.sound.click();
    const bankCx = BANK.x + BANK.w / 2;
    const bankCy = BANK.y + BANK.h * 0.45;
    try {
      const result = await this.ctx.store.sync();
      // A first empty live scan is an explicit decision point, not an
      // all-caught-up sync. The panel is rendered from persisted state below.
      if (result.source === 'no-history') return;
      if (result.source === 'demo') {
        // The button remains the short physical SYNC control; this explicit
        // feedback is the truthful demo-specific action acknowledgement.
        this.ctx.fx.banner(t('ui.demoSync'), bankCx, BANK.y + 12, CYAN, { scale: 1.7, life: 1.8, vy: -10 });
      }
      // Keep the celebration at 60fps for its full length — the sync await can
      // outlast the click's wake window, so the coin rain / banners / cabinet
      // pulses would otherwise start on the 30fps idle cap.
      this.ctx.stage.wake(2800);
      if (result.coinsMinted > 0) {
        const n = Math.min(result.coinsMinted, 40);
        this.ctx.fx.coinRain(bankCx, bankCy, n, COINS_TARGET, () => this.ctx.sound.coinTick());
        // Compact stacked reward summary in the UPPER glass, above the coin pile
        // and light beam, so it reads clearly instead of fighting the coin art.
        this.ctx.fx.banner(t('ui.newTokens', { n: fmtCompact(result.newTokens) }), bankCx, BANK.y + 40, CYAN, { scale: 1.75, life: 2.2, vy: -12 });
        this.ctx.fx.banner(t('ui.coinsPlus', { n: fmtComma(result.coinsMinted) }), bankCx, BANK.y + 74, GOLD, { scale: 2.75, life: 2.2, vy: -16 });
        this.ctx.sound.coin();
      } else {
        this.ctx.fx.banner(t('ui.allCaughtUp'), bankCx, BANK.y + 150, CYAN, { scale: 4, life: 1.8 });
      }
      // Level-ups: pulse every cabinet that leveled so its home body flares,
      // and give the first couple a compact, non-modal "powered up" banner near
      // the bank. Banners are staggered vertically to clear the coin banner.
      for (let i = 0; i < result.levelUps.length; i++) {
        const lu = result.levelUps[i];
        this.ctx.fx.pulse(lu.id);
        if (i >= 2) continue;
        this.ctx.sound.levelUp();
        const ly = BANK.y + 232 + i * 96;
        this.ctx.fx.banner(t('ui.poweredUp', { name: lu.name }), bankCx, ly, GOLD, { scale: 2.25, life: 2.0, vy: -18 });
        this.ctx.fx.banner(t('ui.lvArrow', { from: lu.from, to: lu.to }), bankCx, ly + 32, INK, { scale: 2, life: 2.0, vy: -18 });
        if (lu.stageTo) {
          this.ctx.fx.banner(t('ui.becameCabinet', { name: lu.name, stage: lu.stageTo }), bankCx, ly + 60, MAGENTA, { scale: 2, life: 2.0, vy: -18 });
        }
      }
      for (const a of result.achievements) this.ctx.fx.toast(tAchName(a.id), tAchDesc(a.id), a.sprite);
    } catch {
      this.ctx.fx.banner(t('ui.syncFailed'), bankCx, bankCy, '#ff9a3c', { scale: 4, life: 1.8 });
      this.ctx.sound.error();
    } finally {
      this.syncing = false;
    }
  }

  /** Start demo only after the player chooses it in the no-history panel. */
  private async playDemoArcade(): Promise<void> {
    if (this.syncing) return;
    this.ctx.store.setMode('demo');
    this.displayCoins.set(this.ctx.store.state.coins);
    await this.doSync();
  }

  /** Settings' one-click escape hatch from demo back to an isolated live scan. */
  async tryLiveScanFromSettings(): Promise<void> {
    if (this.syncing) return;
    this.ctx.store.setMode('live');
    this.displayCoins.set(this.ctx.store.state.coins);
    await this.doSync();
  }

  /** Canvas decision panel for an empty first local scan. It intentionally
   * gates mock projects behind a deliberate player choice. */
  private drawNoHistoryDecision(g: CanvasRenderingContext2D): void {
    const state = this.ctx.store.state;
    if (state.mode !== 'live' || state.historyScan !== 'no-history') return;

    const x = 442;
    const y = 258;
    const w = 716;
    const h = 476;
    // Soft blackout keeps the real-but-empty room visible at the perimeter.
    g.save();
    g.fillStyle = 'rgba(4,3,10,0.55)';
    g.fillRect(0, 0, this.ctx.stage.width, this.ctx.stage.height);
    g.restore();
    panel(g, x, y, w, h, { radius: 14, fill: 'rgba(18,12,34,0.98)', border: GOLD, borderWidth: 3 });
    // Physical marquee rail, not a web-modal heading.
    g.fillStyle = 'rgba(95,230,214,0.32)';
    g.fillRect(x + 26, y + 72, w - 52, 2);
    for (let i = 0; i < 9; i++) {
      g.fillStyle = i % 2 ? CYAN : GOLD;
      g.fillRect(x + 30 + i * ((w - 64) / 8), y + 22, 5, 5);
    }
    drawText(g, t('ui.noHistoryFound'), x + w / 2, y + 35, 3.2, GOLD, { align: 'center', glow: GOLD, glowBlur: 6 });
    const body = wrapText(t('ui.noHistoryBody'), 2, w - 94);
    let bodyY = y + 104;
    for (const line of body) {
      drawText(g, line, x + w / 2, bodyY, 2, INK, { align: 'center' });
      bodyY += 22;
    }
    this.drawHistoryChoice(g, x + 42, y + 184, w - 84, 98, 'demo-choice', t('ui.playDemoArcade'), t('ui.playDemoSub'), GOLD, () => void this.playDemoArcade());
    this.drawHistoryChoice(g, x + 42, y + 310, w - 84, 98, 'scan-choice', t('ui.scanAgain'), t('ui.scanAgainSub'), CYAN, () => void this.doSync());
  }

  private drawHistoryChoice(
    g: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    id: string,
    title: string,
    sub: string,
    color: string,
    onClick: () => void,
  ): void {
    const hovered = this.ctx.stage.hotspot({ x, y, w, h, cursor: 'pointer', id, onClick });
    panel(g, x, y, w, h, {
      radius: 10,
      fill: hovered ? '#2a1f4a' : '#120d24',
      border: hovered ? color : 'rgba(126,118,168,0.7)',
      borderWidth: hovered ? 3 : 2,
    });
    g.fillStyle = color;
    g.fillRect(x + 16, y + 14, 5, h - 28);
    let titleScale = 2.35;
    while (titleScale > 1.25 && measureText(title, titleScale) > w - 72) titleScale -= 0.15;
    drawText(g, title, x + 40, y + 21, titleScale, hovered ? color : INK, { glow: hovered ? color : undefined, glowBlur: 4 });
    const subLines = wrapText(sub, 1.4, w - 72).slice(0, 2);
    let subY = y + 55;
    for (const line of subLines) {
      drawText(g, line, x + 40, subY, 1.4, '#c9c6e0');
      subY += 15;
    }
  }
}
