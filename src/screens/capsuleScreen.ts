/*
 * capsuleScreen.ts — the reward room. A premium capsule machine stands in a
 * curtained alcove on the left; a lit trophy cabinet holds the collection on
 * the right.
 *
 * The pull is staged as a physical machine reaction: clicking a control-deck
 * button snaps a code-owned neon LEVER down over the machine's baked crank,
 * the machine shakes and bursts glow at its mouth, and only THEN does the
 * rarity-framed reveal card pop (~0.44s later). When a revealed prize is about
 * to fade it "lands" in its cabinet slot — a burst + a trail of sparks fly to
 * the destination shelf, which flashes bright. Hovering (or tapping) any
 * cabinet slot raises a compact game tooltip; owned slots read out the prize's
 * name, rarity, type and flavor text, locked slots stay a mystery.
 *
 * The generated art is the staging; all dynamic state (counters, lever, owned/
 * locked prizes, duplicate counts, reveal contents, tooltips) is drawn in code
 * on top, with procedural fallbacks if an asset is missing.
 *
 * Layout (logical 1600x1000):
 *   Back button ...... 16,16    120x52
 *   Coins/tickets/dust 760,20 .. 1400,20
 *   Capsule machine .. alcove, left      (MACHINE)  + code lever module
 *   Control deck ..... 128,766  564x124  (base panel under the shop controls)
 *   Pull buttons ..... 148,773 / 420,773   252x111 (shop-card controls)
 *   Reveal card ...... framed, over the machine, while revealing
 *   Display cabinet .. right              (DISPLAY)  + hover tooltips
 */

import { panel, vgrad, rrect } from '../render/canvas';
import { drawText, wrapText, measureText, GLYPH_H } from '../render/pixelFont';
import { drawSprite, drawSpriteCentered, drawCoin } from '../render/sprites';
import { drawCapsuleMachine } from '../render/machines';
import { drawImageSmooth, collectibleIcon } from '../render/assets';
import { drawCoinHud } from '../render/hud';
import { revealFrameImage, resultRowArt } from '../render/atlas';
import { drawIconCentered, drawImageContain, EasedNumber } from '../render/widgets';
import { DISPLAY_SLOTS } from '../render/measured';
import { CONFIG, fmtComma } from '../domain/economy';
import { RARITIES, RARITY_ORDER, byRarity } from '../content';
import type { PullOutcome, Collectible } from '../core/types';
import type { Screen, ScreenContext } from './screen';
import { drawBackButton } from './chrome';
import { t, tRarity, tType, tCollectibleName, tCollectibleDesc, tAchName, tAchDesc } from '../i18n';

const GOLD = '#ffd23f';
const MAGENTA = '#e15ad8';
const INK = '#f6f4ff';

// Premium machine, centered on the star rug under the alcove spotlight.
const MACHINE = { x: 184, y: 158, w: 452, h: 555 };
const MACHINE_CX = MACHINE.x + MACHINE.w / 2; // 410 — centered on the rug
const MACHINE_MOUTH_Y = MACHINE.y + MACHINE.h * 0.82;
const CONTROL_DECK = { x: 128, y: 766, w: 564, h: 124 };
const PULL_CARD = { y: 773, w: 252, h: 111, x1: 148, x10: 420 };

// Reveal card geometry (shared by the card drawer and the landing effect).
const CARD_W = 300;
const CARD_H = 440;
const CARD_X = MACHINE_CX - CARD_W / 2;
const CARD_Y = 168;

// Right-side trophy cabinet, mounted on the brick wall. Slot centers come from
// DISPLAY_SLOTS (measured per cell by scripts/measure-assets.mjs — the
// AI-drawn grid is not uniform, so per-cell anchors are the only way icons
// sit truly centered).
const DISPLAY = { x: 806, y: 120, w: 752, h: 696 };

// Procedural fallback wall box (only used if the cabinet asset is missing).
const WALL = { x: 760, y: 120, w: 800, h: 800 };

// Result feed — a compact, code-driven ticker in the empty vertical gap between
// the machine (right edge x636) and the trophy cabinet (left edge x806). Rows
// use the generated row frames (atlas.resultRowArt); the list is clipped and
// scrolls in code (no baked panel/scrollbar). The current pull batch remains
// pinned until the next pull, so every x10 outcome stays reviewable.
const FEED = { x: 638, w: 166, top: 452, rowH: 36, gap: 6, maxVisible: 4 };
const FEED_STRIDE = FEED.rowH + FEED.gap;

/** One row in the result ticker. */
interface FeedRow {
  c: Collectible;
  isNew: boolean;
  count: number;
}

/** Tooltip payload for a hovered/tapped cabinet slot. Locked slots reveal
 * nothing about the specific prize; owned slots carry the collectible. */
type TipInfo =
  | { locked: false; c: Collectible; count: number; cx: number; cy: number }
  | { locked: true; cx: number; cy: number };

/** A small padlock silhouette for locked prize slots. */
function drawLock(g: CanvasRenderingContext2D, cx: number, cy: number, col: string): void {
  g.strokeStyle = col;
  g.lineWidth = 3;
  g.beginPath();
  g.arc(cx, cy - 4, 6, Math.PI, 0);
  g.stroke();
  g.fillStyle = col;
  g.fillRect(cx - 9, cy - 2, 18, 14);
  g.fillStyle = '#0f0a1c';
  g.fillRect(cx - 1, cy + 2, 2, 5);
}

export class CapsuleScreen implements Screen {
  readonly name = 'capsule';

  private readonly displayCoins = new EasedNumber();
  private shakeAmp = 0;
  private notEnough = 0;

  // Reveal sequencing: pulled outcomes queue up and flip through one at a time.
  private queue: PullOutcome[] = [];
  private current: PullOutcome | null = null;
  private revealTimer = 0;
  private cardLife = 0;
  // Short gate so the first card of a pull waits for the lever + shake.
  private revealDelay = 0;
  // Whether the landing effect has fired for the currently-revealed card.
  private landedFired = false;

  // Lever animation. leverT: seconds since the pull kicked it, -1 = idle.
  private leverT = -1;
  // Whether this lever pull has already triggered the shake + mouth burst.
  private leverShook = false;
  // Whether the capsule "pop" flash has fired (a beat between lever and reveal).
  private popFired = false;
  // Best-rarity glow for the mouth burst, captured at pull time.
  private pullBurstGlow = MAGENTA;

  // Per-collectible slot flash (1 -> 0) so a shelf lights up when a prize lands.
  private slotFlash: Record<string, number> = {};

  // Cabinet-slot tooltip: hoverTip is recomputed each frame; sticky survives a
  // tap for a couple of seconds (touch has no hover).
  private hoverTip: TipInfo | null = null;
  private sticky: { info: TipInfo; life: number } | null = null;

  // Result feed (QA-002/005): every pull outcome — new AND duplicate — is a
  // compact ticker row (newest first). Only NEW items enter the big reveal
  // queue; `feedStart` is the manually controlled row offset for this batch.
  private feed: FeedRow[] = [];
  private feedStart = 0;
  // Short summary pulse shown when a pull produced no new items (all duplicates).
  private dupPulse = 0;
  private dupPulseCount = 0;

  constructor(private readonly ctx: ScreenContext) {}

  enter(): void {
    this.displayCoins.set(this.ctx.store.state.coins);
    this.shakeAmp = 0;
    this.notEnough = 0;
    this.queue = [];
    this.current = null;
    this.revealTimer = 0;
    this.cardLife = 0;
    this.revealDelay = 0;
    this.landedFired = false;
    this.leverT = -1;
    this.leverShook = false;
    this.popFired = false;
    this.pullBurstGlow = MAGENTA;
    this.slotFlash = {};
    this.hoverTip = null;
    this.sticky = null;
    this.feed = [];
    this.feedStart = 0;
    this.dupPulse = 0;
    this.dupPulseCount = 0;
    // Drop achievement toasts into the empty center wall gap between the
    // machine and the cabinet — clear of the currency counters and reveal card.
    this.ctx.fx.setToastZone(726, 200, 184);
  }

  render(g: CanvasRenderingContext2D, dt: number, now: number): void {
    this.tick(dt);

    this.drawBackground(g);
    this.drawDisplayCabinet(g);
    this.drawMachine(g, now);
    this.drawHeader(g);
    this.drawResultFeed(g, now);
    this.drawReveal(g);
    this.drawMessages(g);
    // Tooltip draws last so it floats above the card, counters and cabinet.
    this.drawTooltip(g);
  }

  // ---- per-frame state advance -------------------------------------------

  private tick(dt: number): void {
    this.displayCoins.toward(this.ctx.store.state.coins, dt);

    this.shakeAmp = Math.max(0, this.shakeAmp - dt * 34);
    this.notEnough = Math.max(0, this.notEnough - dt);
    this.revealTimer -= dt;
    this.cardLife -= dt;
    this.revealDelay = Math.max(0, this.revealDelay - dt);
    // The ticker does not auto-scroll away after a pull. It remains pinned on
    // the chosen rows until the next pull replaces the current batch (QA-005).
    this.dupPulse = Math.max(0, this.dupPulse - dt);

    // Advance the lever. It snaps down, and as it crosses the DOWN threshold the
    // machine reacts: it shakes and bursts glow at the mouth.
    if (this.leverT >= 0) {
      this.leverT += dt;
      if (this.leverT >= 0.13 && !this.leverShook) {
        this.shakeAmp = 14;
        this.leverShook = true;
        this.ctx.fx.burst(MACHINE_CX, MACHINE_MOUTH_Y, this.pullBurstGlow, 26);
      }
      if (this.leverT > 0.4) this.leverT = -1;
    }

    // Decay the per-slot landing flashes.
    for (const k in this.slotFlash) {
      this.slotFlash[k] -= dt * 1.6;
      if (this.slotFlash[k] <= 0) delete this.slotFlash[k];
    }

    // Age the sticky (tap) tooltip.
    if (this.sticky) {
      this.sticky.life -= dt;
      if (this.sticky.life <= 0) this.sticky = null;
    }

    // Capsule pop: a distinct flash + jolt at the machine mouth once the lever
    // has settled, just before the first card — so the pull reads as three
    // beats (lever/shake -> capsule pop -> reward reveal), PM QA 2026-07-09 #3.
    if (!this.popFired && this.current === null && this.queue.length > 0 && this.revealDelay > 0 && this.revealDelay <= 0.16) {
      this.popFired = true;
      this.shakeAmp = Math.max(this.shakeAmp, 10);
      this.ctx.fx.burst(MACHINE_CX, MACHINE_MOUTH_Y, this.pullBurstGlow, 24);
    }

    // Gate the reveal queue: the first card waits out revealDelay (lever + pop);
    // later cards hold long enough to read the name + rarity before flipping.
    if (this.revealDelay <= 0 && (this.current === null || this.revealTimer <= 0) && this.queue.length > 0) {
      const next = this.queue.shift();
      if (next) {
        this.current = next;
        this.landedFired = false;
        this.revealTimer = this.queue.length > 0 ? 0.8 : 1.6;
        this.cardLife = 2.4;
        this.ctx.sound.reveal(next.collectible.rarity);
        this.ctx.fx.burst(MACHINE_CX, MACHINE.y + MACHINE.h * 0.42, RARITIES[next.collectible.rarity].glow, 14);
      }
    }

    // As the current card is about to fade, "land" it in its cabinet slot.
    if (this.current && this.cardLife <= 0.5 && !this.landedFired) {
      this.fireLanding(this.current.collectible);
      this.landedFired = true;
    }
  }

  /** Easing with a slight overshoot past 1 near the end (0 -> ~1.1 -> 1). */
  private easeOutBack(p: number): number {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
  }

  /** Knob displacement 0 (rest/up) .. 1 (fully down) for the current leverT.
   * A negative return lifts the knob slightly ABOVE rest — the settle bounce. */
  private leverDisplacement(): number {
    const t = this.leverT;
    if (t < 0) return 0;
    if (t < 0.13) {
      const p = t / 0.13; // DOWN: smoothstep 0 -> 1
      return p * p * (3 - 2 * p);
    }
    if (t < 0.19) return 1; // HOLD at the bottom
    if (t < 0.4) {
      const p = (t - 0.19) / 0.21; // RETURN: ease up, overshoot above rest
      return 1 - this.easeOutBack(p);
    }
    return 0;
  }

  /** Send a prize "into" its cabinet slot: burst + a spark trail from the card
   * to the destination slot, and light that slot up. */
  private fireLanding(c: Collectible): void {
    const slot = this.slotCenterFor(c);
    if (!slot) return;
    const rar = RARITIES[c.rarity];
    this.ctx.fx.burst(slot.x, slot.y, rar.glow, 14);
    const fromX = MACHINE_CX;
    const fromY = CARD_Y + CARD_H * 0.4;
    for (let i = 0; i < 6; i++) {
      const t = i / 5;
      const jx = (Math.random() - 0.5) * 22;
      const jy = (Math.random() - 0.5) * 22;
      this.ctx.fx.spark(fromX + (slot.x - fromX) * t + jx, fromY + (slot.y - fromY) * t + jy, rar.glow);
    }
    this.slotFlash[c.id] = 1.0;
  }

  /** Center of the cabinet slot a collectible is displayed in (or null if it
   * has no drawn slot). Items live in slots[i+1]; slots[0] holds the plaque. */
  private slotCenterFor(c: Collectible): { x: number; y: number } | null {
    const r = RARITY_ORDER.indexOf(c.rarity);
    if (r < 0) return null;
    const items = byRarity[c.rarity];
    const i = items.findIndex((x) => x.id === c.id);
    const slots = DISPLAY_SLOTS[r];
    if (i >= 0 && i + 1 < slots.length) {
      return { x: DISPLAY.x + slots[i + 1].x * DISPLAY.w, y: DISPLAY.y + slots[i + 1].y * DISPLAY.h };
    }
    return null;
  }

  // ---- background ---------------------------------------------------------

  private drawBackground(g: CanvasRenderingContext2D): void {
    const W = this.ctx.stage.width;
    const H = this.ctx.stage.height;
    const bg = this.ctx.assets.get('capsuleRoomBg');
    if (bg) {
      drawImageSmooth(g, bg, 0, 0, W, H);
      // Light top darkening keeps the counters legible; the room shows through.
      const grad = g.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, 'rgba(6,4,12,0.5)');
      grad.addColorStop(0.2, 'rgba(6,4,12,0.05)');
      grad.addColorStop(1, 'rgba(6,4,12,0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, W, H);
      return;
    }
    vgrad(g, 0, 0, W, H, '#251540', '#07040d');
    vgrad(g, 0, 720, W, H - 720, '#170f2c', '#0a0616');
    g.fillStyle = 'rgba(225,90,216,0.08)';
    g.fillRect(0, 720, W, 2);
  }

  // ---- header -------------------------------------------------------------

  private drawHeader(g: CanvasRenderingContext2D): void {
    drawBackButton(g, this.ctx, () => this.ctx.router.go('room'));

    // Coin counter — the same generated HUD plaque used on home + project detail
    // so the currency reads identically across screens. Tickets and dust are
    // hidden until they have a real sink (MVP economy audit, Option A).
    const HW = 252;
    const HX = 1600 - HW - 24;
    drawCoinHud(g, this.ctx.assets, HX, 14, HW, fmtComma(Math.round(this.displayCoins.value)));
  }

  // ---- capsule machine ----------------------------------------------------

  private drawMachine(g: CanvasRenderingContext2D, now: number): void {
    const shake = this.shakeAmp > 0.1 ? Math.sin(now / 22) * this.shakeAmp : 0;
    const img = this.ctx.assets.get('capsuleMachine');
    if (img) {
      // contact shadow so the machine sits on the alcove floor
      g.save();
      g.fillStyle = 'rgba(0,0,0,0.4)';
      g.beginPath();
      g.ellipse(MACHINE_CX + shake, MACHINE.y + MACHINE.h - 6, MACHINE.w * 0.36, 12, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
      drawImageSmooth(g, img, MACHINE.x + shake, MACHINE.y, MACHINE.w, MACHINE.h);
      // small machine label near the coin slot (not giant foreground text)
      drawText(g, t('ui.insertCoin'), MACHINE_CX + shake, MACHINE.y + MACHINE.h * 0.6, 1.5, GOLD, {
        align: 'center',
        glow: GOLD,
        glowBlur: 3,
        shadow: 'rgba(0,0,0,0.7)',
      });
    } else {
      drawText(g, t('ui.capsule'), MACHINE_CX, 122, 2, MAGENTA, { align: 'center', glow: MAGENTA, glowBlur: 3 });
      drawCapsuleMachine(g, MACHINE.x, MACHINE.y, MACHINE.w, MACHINE.h, { shake, label: t('ui.insertCoin') });
    }

    // Code-owned lever module, drawn over the machine's baked crank and shaken
    // with the machine (same x offset).
    this.drawLever(g, shake);

    // The two pull controls reuse the home shop-card visual language.
    this.drawControlDeck(g);
    this.pullButton(g, PULL_CARD.x1, PULL_CARD.y, PULL_CARD.w, PULL_CARD.h, 'x1', CONFIG.PULL_COST, () => this.doPull(1));
    this.pullButton(g, PULL_CARD.x10, PULL_CARD.y, PULL_CARD.w, PULL_CARD.h, 'x10', CONFIG.PULL10_COST, () => this.doPull(10));
  }

  /** Neon lever housing that occludes the machine's baked crank and animates on
   * a pull. Offset by `shake` so it rides with the machine. */
  private drawLever(g: CanvasRenderingContext2D, shake: number): void {
    // Knob displacement, reused for the housing emphasis and the knob position.
    // `down` is the pressed-down amount (0..1), ignoring the settle bounce so the
    // glow/extra-shake fire only while the lever is being driven DOWN.
    const d = this.leverDisplacement();
    const down = Math.max(0, d);
    // The whole lever module rides the machine shake, and shakes a touch harder
    // than the machine while it's punched down — a small physical emphasis.
    const sx = shake * (1 + 0.6 * down);

    const hx = 496 + sx;
    const hy = 448;
    const hw = 86;
    const hh = 132;

    // Housing panel: dark vertical gradient to match the machine base.
    g.save();
    rrect(g, hx, hy, hw, hh, 14);
    g.clip();
    vgrad(g, hx, hy, hw, hh, '#2c2050', '#171029');
    g.restore();
    // 2px gold rim
    rrect(g, hx, hy, hw, hh, 14);
    g.strokeStyle = '#c98f24';
    g.lineWidth = 2;
    g.stroke();
    // Magenta glow bloom around the housing while the lever is driven down, so
    // the whole module reads as energized during the pull (fades as it returns).
    if (down > 0.01) {
      g.save();
      g.shadowColor = MAGENTA;
      g.shadowBlur = 26 * down;
      rrect(g, hx, hy, hw, hh, 14);
      g.strokeStyle = `rgba(225,90,216,${0.65 * down})`;
      g.lineWidth = 3;
      g.stroke();
      g.restore();
    }
    // subtle magenta inner accent line
    rrect(g, hx + 4, hy + 4, hw - 8, hh - 8, 11);
    g.strokeStyle = 'rgba(225,90,216,0.5)';
    g.lineWidth = 1;
    g.stroke();
    // gold bolt dots near the corners
    g.fillStyle = '#c98f24';
    const bolts: [number, number][] = [
      [hx + 11, hy + 11],
      [hx + hw - 11, hy + 11],
      [hx + 11, hy + hh - 11],
      [hx + hw - 11, hy + hh - 11],
    ];
    for (const [bx, by] of bolts) {
      g.beginPath();
      g.arc(bx, by, 2.5, 0, Math.PI * 2);
      g.fill();
    }

    // Vertical track slot inset in the housing.
    const trackCx = 539 + sx;
    const trackTop = 470;
    const trackBottom = 566;
    const trackW = 16;
    rrect(g, trackCx - trackW / 2, trackTop, trackW, trackBottom - trackTop, 8);
    g.fillStyle = '#0d0a16';
    g.fill();
    rrect(g, trackCx - trackW / 2 + 1, trackTop + 1, trackW - 2, trackBottom - trackTop - 2, 7);
    g.strokeStyle = 'rgba(225,90,216,0.4)';
    g.lineWidth = 1;
    g.stroke();

    // Knob position from the animation. `travel` is capped so the knob bottoms
    // out flush with the housing (knobRestY 486 + travel 78 + knobR 16 = 580 =
    // housing bottom; the knob center 564 stays just above trackBottom 566).
    const knobRestY = 486;
    const travel = 78;
    const knobY = knobRestY + d * travel;

    // Gold shaft running from the knob center down into the slot bottom.
    const shaftW = 12;
    const shaftH = Math.max(2, trackBottom - knobY);
    rrect(g, trackCx - shaftW / 2, knobY, shaftW, shaftH, 6);
    const shaftGrad = g.createLinearGradient(0, knobY, 0, trackBottom);
    shaftGrad.addColorStop(0, '#ffd23f');
    shaftGrad.addColorStop(1, '#c98f24');
    g.fillStyle = shaftGrad;
    g.fill();

    // Magenta ball knob with a glow ring, highlight and lighter core.
    const knobR = 16;
    g.save();
    g.shadowColor = MAGENTA;
    g.shadowBlur = 12;
    g.fillStyle = MAGENTA;
    g.beginPath();
    g.arc(trackCx, knobY, knobR, 0, Math.PI * 2);
    g.fill();
    g.restore();
    g.beginPath();
    g.arc(trackCx, knobY, knobR, 0, Math.PI * 2);
    g.fillStyle = MAGENTA;
    g.fill();
    g.lineWidth = 2;
    g.strokeStyle = '#8a3aa0';
    g.stroke();
    g.beginPath();
    g.arc(trackCx, knobY, knobR * 0.58, 0, Math.PI * 2);
    g.fillStyle = '#f07fe0';
    g.fill();
    g.beginPath();
    g.arc(trackCx - knobR * 0.34, knobY - knobR * 0.34, knobR * 0.22, 0, Math.PI * 2);
    g.fillStyle = 'rgba(255,255,255,0.9)';
    g.fill();
  }

  /** Physical metal base deck that seats the two shop-card pull controls. */
  private drawControlDeck(g: CanvasRenderingContext2D): void {
    const { x: dx, y: dy, w: dw, h: dh } = CONTROL_DECK;

    // drop shadow to seat the deck on the floor
    rrect(g, dx + 3, dy + 5, dw, dh, 16);
    g.fillStyle = 'rgba(0,0,0,0.4)';
    g.fill();

    // dark metal body
    g.save();
    rrect(g, dx, dy, dw, dh, 16);
    g.clip();
    vgrad(g, dx, dy, dw, dh, '#2a2440', '#12101f');
    g.restore();

    // gold rim + a brighter top-edge highlight
    rrect(g, dx, dy, dw, dh, 16);
    g.strokeStyle = 'rgba(201,143,36,0.9)';
    g.lineWidth = 2;
    g.stroke();
    g.strokeStyle = 'rgba(255,210,63,0.5)';
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(dx + 16, dy + 2.5);
    g.lineTo(dx + dw - 16, dy + 2.5);
    g.stroke();

    // subtle magenta neon strip near the bottom
    g.fillStyle = 'rgba(225,90,216,0.28)';
    g.fillRect(dx + 14, dy + dh - 8, dw - 28, 3);

    // bolt studs in the corners
    for (const bx of [dx + 13, dx + dw - 13]) {
      for (const by of [dy + 13, dy + dh - 13]) {
        g.beginPath();
        g.arc(bx, by, 3, 0, Math.PI * 2);
        g.fillStyle = '#0d0a16';
        g.fill();
        g.strokeStyle = 'rgba(201,143,36,0.6)';
        g.lineWidth = 1;
        g.stroke();
      }
    }
  }

  private pullButton(
    g: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    cost: number,
    onClick: () => void,
  ): void {
    const afford = this.ctx.store.state.coins >= cost;
    const hovered = this.ctx.stage.hotspot({ x, y, w, h, cursor: 'pointer', id: 'pull-' + label, onClick });
    const bundle = label === 'x10';
    const frame = this.ctx.assets.get('homeShopCard');
    const icon = this.ctx.assets.get(bundle ? 'shopCapsuleBundle' : 'shopCapsuleSingle');

    // The capsule room reuses the home shop-card frame rather than introducing
    // another generic button treatment. Hover is a halo only: geometry and
    // hitbox stay fixed, and the accepted lever timing remains untouched.
    g.globalAlpha = afford ? 1 : 0.6;
    if (frame) {
      if (hovered && afford) {
        g.save();
        g.shadowColor = MAGENTA;
        g.shadowBlur = 14;
        drawImageSmooth(g, frame, x, y, w, h);
        g.restore();
      }
      drawImageSmooth(g, frame, x, y, w, h);
    } else {
      // Asset-loading fallback only; the regular path is the supplied frame.
      panel(g, x, y, w, h, { radius: 8, fill: '#1b1328', border: GOLD, borderWidth: 2 });
    }

    // Both supplied PNGs were alpha-measured before placement. Their visible
    // bounds are symmetric, so contain-fit centers the real capsule art in the
    // icon bay without stretching; x10 is allowed a slightly wider bay.
    const iconCx = x + w * 0.215;
    const iconCy = y + h * 0.43;
    if (icon) drawImageContain(g, icon, iconCx, iconCy, w * (bundle ? 0.31 : 0.27), h * 0.54);
    else drawCoin(g, iconCx, iconCy, 15); // decoding-only fallback, never a replacement capsule icon

    const shopKey = bundle ? 'pull10' : 'pull1';
    const textX = x + w * 0.39;
    const labelText = t('shop.' + shopKey + '.label');
    const labelMax = w * 0.46;
    let labelScale = 1.8;
    while (labelScale > 1.1 && measureText(labelText, labelScale) > labelMax) labelScale -= 0.1;
    drawText(g, labelText, textX, y + h * 0.19, labelScale, INK, { shadow: 'rgba(0,0,0,0.6)' });
    drawText(g, t('shop.' + shopKey + '.sub'), textX, y + h * 0.42, 1.05, '#b9b3d6');
    const priceCx = x + w * 0.69;
    const priceCy = y + h * 0.72;
    const price = fmtComma(cost);
    const priceW = measureText(price, 2);
    // Align both visible elements to the measured center of the gold socket:
    // `drawCoin` takes a center, while the bitmap number takes a top-left y.
    // At scale 2 the glyph is 14px tall, hence priceCy - 7 for its top edge.
    drawCoin(g, priceCx - priceW / 2 - 10, priceCy, 7);
    drawText(g, price, priceCx - priceW / 2 + 6, priceCy - 7, 2, GOLD);
    g.globalAlpha = 1;
  }

  // ---- trophy cabinet -----------------------------------------------------

  private drawDisplayCabinet(g: CanvasRenderingContext2D): void {
    // Recomputed every frame from the current pointer position.
    this.hoverTip = null;

    const store = this.ctx.store;
    const img = this.ctx.assets.get('achievementDisplay');
    if (!img) {
      this.drawPrizeWallProcedural(g);
      return;
    }
    drawImageSmooth(g, img, DISPLAY.x, DISPLAY.y, DISPLAY.w, DISPLAY.h);

    // Each rarity gets one shelf (top = legendary). Its collectibles fill the
    // shelf's slots, owned lit / locked silhouette. A small nameplate marks the
    // shelf's rarity in slots[0]; collectibles start from the second slot.
    for (let r = 0; r < RARITY_ORDER.length; r++) {
      const rk = RARITY_ORDER[r];
      const rar = RARITIES[rk];
      const slots = DISPLAY_SLOTS[r];

      // Rarity nameplate — a small gold-trimmed tag, readable but not a header.
      const pl = slots[0];
      const plCx = DISPLAY.x + pl.x * DISPLAY.w;
      const plCy = DISPLAY.y + pl.y * DISPLAY.h;
      const plScale = 1.5;
      const plW = rar.label.length * 6 * plScale + 22;
      const plH = 28;
      rrect(g, plCx - plW / 2, plCy - plH / 2, plW, plH, 8);
      g.fillStyle = 'rgba(9,6,18,0.94)';
      g.fill();
      g.save();
      g.shadowColor = rar.glow;
      g.shadowBlur = 6;
      rrect(g, plCx - plW / 2, plCy - plH / 2, plW, plH, 8);
      g.strokeStyle = rar.color;
      g.lineWidth = 2;
      g.stroke();
      g.restore();
      rrect(g, plCx - plW / 2 + 3, plCy - plH / 2 + 3, plW - 6, plH - 6, 6);
      g.strokeStyle = 'rgba(201,143,36,0.5)';
      g.lineWidth = 1;
      g.stroke();
      drawText(g, tRarity(rar.key), plCx, plCy - 5, plScale, rar.color, { align: 'center', glow: rar.glow, glowBlur: 3 });

      const items = byRarity[rk];
      for (let i = 0; i < items.length && i + 1 < slots.length; i++) {
        const c = items[i];
        const cx = DISPLAY.x + slots[i + 1].x * DISPLAY.w;
        const cy = DISPLAY.y + slots[i + 1].y * DISPLAY.h;
        const entry = store.state.owned[c.id];
        const flash = this.slotFlash[c.id] || 0;

        if (entry) {
          // display spotlight glow
          const grad = g.createRadialGradient(cx, cy, 0, cx, cy, 30);
          grad.addColorStop(0, rar.glow.length === 7 ? rar.glow + '55' : rar.glow);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          g.fillStyle = grad;
          g.fillRect(cx - 30, cy - 30, 60, 60);
          // soft contact shadow so the prize sits on the shelf
          g.save();
          g.fillStyle = 'rgba(0,0,0,0.35)';
          g.beginPath();
          g.ellipse(cx, cy + 22, 20, 6, 0, 0, Math.PI * 2);
          g.fill();
          g.restore();

          const icon = collectibleIcon(c.id);
          if (icon) drawIconCentered(g, icon, cx, cy, 56);
          else drawSpriteCentered(g, c.sprite, cx, cy, 50, c.tint);

          // landing flash: an extra bright ring + white bloom while it decays
          if (flash > 0) {
            g.save();
            g.globalAlpha = Math.min(1, flash);
            g.shadowColor = rar.glow;
            g.shadowBlur = 16 * flash;
            g.strokeStyle = rar.color;
            g.lineWidth = 2 + 2 * flash;
            g.beginPath();
            g.arc(cx, cy, 26 + 6 * flash, 0, Math.PI * 2);
            g.stroke();
            g.restore();
            const fg = g.createRadialGradient(cx, cy, 0, cx, cy, 34);
            fg.addColorStop(0, `rgba(255,255,255,${0.35 * flash})`);
            fg.addColorStop(1, 'rgba(0,0,0,0)');
            g.fillStyle = fg;
            g.fillRect(cx - 34, cy - 34, 68, 68);
          }

          if (entry.count > 1) {
            rrect(g, cx + 8, cy + 10, 26, 16, 4);
            g.fillStyle = '#0d0a16';
            g.fill();
            g.strokeStyle = rar.color;
            g.lineWidth = 1;
            g.stroke();
            drawText(g, '×' + entry.count, cx + 12, cy + 13, 1.5, INK);
          }

          const info: TipInfo = { locked: false, c, count: entry.count, cx, cy };
          const hov = this.ctx.stage.hotspot({
            x: cx - 33,
            y: cy - 33,
            w: 66,
            h: 66,
            cursor: 'help',
            id: 'slot-' + c.id,
            onClick: () => {
              this.sticky = { info, life: 2.4 };
            },
          });
          if (hov) this.hoverTip = info;
        } else {
          drawLock(g, cx, cy, '#4a4270');

          const info: TipInfo = { locked: true, cx, cy };
          const hov = this.ctx.stage.hotspot({
            x: cx - 33,
            y: cy - 33,
            w: 66,
            h: 66,
            cursor: 'help',
            id: 'slot-' + c.id,
            onClick: () => {
              this.sticky = { info, life: 2.4 };
            },
          });
          if (hov) this.hoverTip = info;
        }
      }
    }
  }

  /** Procedural fallback prize wall (cabinet asset missing / still loading). */
  private drawPrizeWallProcedural(g: CanvasRenderingContext2D): void {
    const store = this.ctx.store;
    panel(g, WALL.x, WALL.y, WALL.w, WALL.h, { radius: 12, fill: 'rgba(20,15,36,0.6)', border: '#4a4270', borderWidth: 2 });

    const groupH = 152;
    let gy = WALL.y + 30;
    for (const rk of RARITY_ORDER) {
      const rar = RARITIES[rk];
      g.fillStyle = rar.color;
      g.fillRect(WALL.x + 24, gy, 18, 18);
      drawText(g, tRarity(rar.key), WALL.x + 50, gy + 2, 2, rar.color, { glow: rar.glow, glowBlur: 3 });

      const items = byRarity[rk];
      const slot = 74;
      const stride = 84;
      const rowY = gy + 30;
      for (let i = 0; i < items.length; i++) {
        const c = items[i];
        const sx = WALL.x + 24 + i * stride;
        const entry = store.state.owned[c.id];
        if (entry) {
          panel(g, sx, rowY, slot, slot, { radius: 8, fill: '#241a3f', border: rar.color, borderWidth: 2 });
          drawSprite(g, c.sprite, sx + 5, rowY + 5, 4, c.tint);
          if (entry.count > 1) {
            panel(g, sx + slot - 26, rowY + slot - 20, 24, 16, { radius: 4, fill: '#0d0a16', border: rar.color, borderWidth: 1 });
            drawText(g, '×' + entry.count, sx + slot - 22, rowY + slot - 17, 1.5, INK);
          }
          drawText(g, '*', sx + 4, rowY + 4, 1.5, rar.color);
        } else {
          panel(g, sx, rowY, slot, slot, { radius: 8, fill: '#0f0a1c', border: '#2a2440', borderWidth: 2 });
          drawLock(g, sx + slot / 2, rowY + slot / 2, '#3a3352');
        }
      }

      g.fillStyle = '#5c3a26';
      g.fillRect(WALL.x + 24, rowY + slot + 4, WALL.w - 48, 6);
      g.fillStyle = 'rgba(0,0,0,0.3)';
      g.fillRect(WALL.x + 24, rowY + slot + 8, WALL.w - 48, 2);

      gy += groupH;
    }
  }

  // ---- reveal card --------------------------------------------------------

  private drawReveal(g: CanvasRenderingContext2D): void {
    // While any big reveal is playing or queued, a click on the card area (or the
    // SKIP hint) fast-forwards the remaining cards (QA-002 skip affordance).
    if (this.current !== null || this.queue.length > 0) {
      this.ctx.stage.hotspot({
        x: CARD_X - 20,
        y: CARD_Y - 20,
        w: CARD_W + 40,
        h: CARD_H + 64,
        cursor: 'pointer',
        id: 'skip-reveal',
        onClick: () => this.skipReveals(),
      });
    }
    if (!this.current || this.cardLife <= 0) return;
    const c = this.current.collectible;
    const rar = RARITIES[c.rarity];

    const cardW = CARD_W;
    const cardH = CARD_H;
    const cardX = CARD_X;
    const cardY = CARD_Y;

    const age = 2.4 - this.cardLife; // seconds since this card revealed
    const appear = Math.min(1, age / 0.22);
    const alpha = Math.min(1, this.cardLife / 0.4);
    // pop-in with a small scale overshoot that settles to 1.0
    const scale = 0.7 + 0.3 * this.easeOutBack(appear);
    // gentle glow pulse — fast enough to feel alive, never sleepy
    const pulse = 0.85 + 0.15 * Math.sin(age * 8);

    g.save();
    g.globalAlpha = alpha;
    g.translate(cardX + cardW / 2, cardY + cardH / 2);
    g.scale(scale, scale);
    g.translate(-(cardX + cardW / 2), -(cardY + cardH / 2));

    // Per-rarity reveal frame — a pre-cropped transparent single PNG chosen by
    // rarity only (uncommon is a real green frame; no code tint/recolor).
    const frame = revealFrameImage(rar.order);
    if (frame) {
      // sparkle glow behind the card (pulsing)
      const glow = g.createRadialGradient(MACHINE_CX, cardY + cardH * 0.4, 0, MACHINE_CX, cardY + cardH * 0.4, cardW * 0.7);
      glow.addColorStop(0, rar.glow.length === 7 ? rar.glow + '55' : rar.glow);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      const prevA = g.globalAlpha;
      g.globalAlpha = prevA * pulse;
      g.fillStyle = glow;
      g.fillRect(cardX - 60, cardY - 40, cardW + 120, cardH + 80);
      g.globalAlpha = prevA;

      drawImageSmooth(g, frame, cardX, cardY, cardW, cardH);
      // content inside the frame's window
      const iw = { x: cardX + cardW * 0.16, y: cardY + cardH * 0.17, w: cardW * 0.68, h: cardH * 0.6 };
      const cxm = iw.x + iw.w / 2;
      // Generated icon centered on the sprite's old footprint (16x15 @ scale 6),
      // falling back to the code sprite while the PNG loads.
      const icon = collectibleIcon(c.id);
      if (icon) drawIconCentered(g, icon, cxm, iw.y + iw.h * 0.08 + 45, 96);
      else drawSprite(g, c.sprite, cxm - 48, iw.y + iw.h * 0.08, 6, c.tint);
      drawText(g, tCollectibleName(c.id), cxm, iw.y + iw.h * 0.66, 2, INK, { align: 'center', glow: rar.glow, glowBlur: 3 });
      drawText(g, tRarity(rar.key), cxm, iw.y + iw.h * 0.83, 1.75, rar.color, { align: 'center', glow: rar.glow, glowBlur: 3 });
      drawText(
        g,
        this.current.isDup ? t('ui.dup', { n: this.current.count }) : t('ui.newItem'),
        cxm,
        iw.y + iw.h,
        1.75,
        this.current.isDup ? '#ff9a3c' : GOLD,
        { align: 'center' },
      );
    } else {
      // procedural fallback card
      g.save();
      g.shadowColor = rar.glow;
      g.shadowBlur = 22 * pulse;
      panel(g, cardX, cardY, cardW, cardH - 120, { radius: 16, fill: '#160f28', border: rar.color, borderWidth: 4 });
      g.restore();
      // Generated icon centered on the sprite's old footprint (16x15 @ scale 7),
      // sized down a touch to sit inside the smaller fallback panel.
      const icon = collectibleIcon(c.id);
      if (icon) drawIconCentered(g, icon, MACHINE_CX, cardY + 78, 90);
      else drawSprite(g, c.sprite, MACHINE_CX - 56, cardY + 26, 7, c.tint);
      drawText(g, tCollectibleName(c.id), MACHINE_CX, cardY + 168, 3, INK, { align: 'center', glow: rar.glow, glowBlur: 4 });
      drawText(g, tRarity(rar.key), MACHINE_CX, cardY + 210, 2, rar.color, { align: 'center', glow: rar.glow, glowBlur: 3 });
      drawText(
        g,
        this.current.isDup ? t('ui.dup', { n: this.current.count }) : t('ui.newItem'),
        MACHINE_CX,
        cardY + 250,
        2,
        this.current.isDup ? '#ff9a3c' : GOLD,
        { align: 'center' },
      );
    }
    g.restore();

    // When more new cards are queued, hint that clicking skips the rest.
    if (this.queue.length > 0) {
      drawText(g, t('ui.skip') + ' ▸', MACHINE_CX, cardY + cardH - 6, 1.4, '#9a93bd', {
        align: 'center',
        shadow: 'rgba(0,0,0,0.6)',
      });
    }
  }

  // ---- result feed --------------------------------------------------------

  /** Compact code-driven result ticker in the gap between machine and cabinet.
   * Every pull outcome (new + duplicate) stays here as the current pull batch.
   * Rows are generated rarity frames, clipped to the window (no baked panel).
   * Wheel, drag and two compact step controls all drive the same row offset. */
  private drawResultFeed(g: CanvasRenderingContext2D, now: number): void {
    if (this.feed.length === 0) return;
    const winX = FEED.x;
    const winY = FEED.top;
    const winW = FEED.w;
    const winH = FEED.maxVisible * FEED_STRIDE - FEED.gap;
    const maxStart = Math.max(0, this.feed.length - FEED.maxVisible);

    // Register the actual clipped rows as a scroll/drag target. Stage converts
    // both wheel and pointer drags to logical deltas; one gesture advances at
    // least one readable row and is clamped to this batch's first/last item.
    if (maxStart > 0) {
      this.ctx.stage.scrollRegion(winX - 3, winY - 2, winW + 6, winH + 4);
      const delta = this.ctx.stage.takeScrollDelta();
      if (Math.abs(delta) > 0.5) this.scrollFeed(delta > 0 ? 1 : -1);
    }

    // Header carries an unobtrusive range indicator + physical up/down ticks;
    // it makes the four-row viewport obviously reviewable without becoming a
    // web-list scrollbar.
    drawText(g, t('ui.recentRewards'), winX + 46, winY - 21, 1.15, '#9a93bd', { align: 'center' });
    const first = this.feedStart + 1;
    const last = Math.min(this.feed.length, this.feedStart + FEED.maxVisible);
    drawText(g, first + '-' + last + '/' + this.feed.length, winX + 132, winY - 20, 1, '#d8d3eb', { align: 'right' });
    this.drawFeedStep(g, winX + winW - 18, winY - 30, 'up', this.feedStart > 0, () => this.scrollFeed(-1));
    this.drawFeedStep(g, winX + winW - 18, winY - 16, 'down', this.feedStart < maxStart, () => this.scrollFeed(1));

    g.save();
    g.beginPath();
    g.rect(winX - 4, winY - 2, winW + 8, winH + 4);
    g.clip();
    for (let i = 0; i < this.feed.length; i++) {
      const ry = winY + (i - this.feedStart) * FEED_STRIDE;
      if (ry > winY + winH || ry + FEED.rowH < winY) continue; // cull off-window
      this.drawResultRow(g, this.feed[i], winX, ry, winW, FEED.rowH, now, i);
    }
    g.restore();
  }

  /** Move the compact ticker by rows, always staying within this pull batch. */
  private scrollFeed(by: number): void {
    const maxStart = Math.max(0, this.feed.length - FEED.maxVisible);
    this.feedStart = Math.max(0, Math.min(maxStart, this.feedStart + by));
  }

  /** Small mechanical arrow, deliberately compact enough to remain a ticker
   * affordance rather than a web scrollbar. */
  private drawFeedStep(
    g: CanvasRenderingContext2D,
    x: number,
    y: number,
    dir: 'up' | 'down',
    enabled: boolean,
    onClick: () => void,
  ): void {
    const w = 16;
    const h = 12;
    const hovered = enabled && this.ctx.stage.hotspot({ x, y, w, h, cursor: 'pointer', id: 'feed-' + dir, onClick });
    rrect(g, x, y, w, h, 3);
    g.fillStyle = enabled ? (hovered ? '#34274d' : '#1b142b') : '#100c19';
    g.fill();
    g.strokeStyle = enabled ? (hovered ? GOLD : '#74658e') : '#30263f';
    g.lineWidth = 1;
    g.stroke();
    g.beginPath();
    const cx = x + w / 2;
    if (dir === 'up') {
      g.moveTo(cx, y + 3);
      g.lineTo(cx - 4, y + 8);
      g.lineTo(cx + 4, y + 8);
    } else {
      g.moveTo(cx, y + 9);
      g.lineTo(cx - 4, y + 4);
      g.lineTo(cx + 4, y + 4);
    }
    g.closePath();
    g.fillStyle = enabled ? (hovered ? GOLD : '#d8d3eb') : '#4a4159';
    g.fill();
  }

  /** One ticker row: rarity frame + icon (left well) + name (center well) +
   * NEW / ×count chip (right well). Legendary uses its own gold frame. */
  private drawResultRow(g: CanvasRenderingContext2D, row: FeedRow, rx: number, ry: number, rw: number, rh: number, now: number, i: number): void {
    const rar = RARITIES[row.c.rarity];
    const art = resultRowArt(row.c.rarity);
    const img = this.ctx.assets.get(art.asset);
    const freshNew = row.isNew && i === 0 && this.feedStart === 0;
    if (img) {
      if (freshNew) {
        g.save();
        g.shadowColor = rar.glow;
        g.shadowBlur = 8 + 4 * Math.abs(Math.sin(now / 180));
        drawImageSmooth(g, img, rx, ry, rw, rh, art.crop);
        g.restore();
      } else {
        drawImageSmooth(g, img, rx, ry, rw, rh, art.crop);
      }
    } else {
      // Fallback while the row art decodes: a colored rounded row.
      rrect(g, rx, ry, rw, rh, 6);
      g.fillStyle = 'rgba(16,11,30,0.92)';
      g.fill();
      g.strokeStyle = rar.color;
      g.lineWidth = 2;
      g.stroke();
    }

    const w = art.wells;
    const cy = ry + w.cy * rh;
    // icon in the left well
    const icoCx = rx + w.icon * rw;
    const icon = collectibleIcon(row.c.id);
    if (icon) drawIconCentered(g, icon, icoCx, cy, rh * 0.74);
    else drawSpriteCentered(g, row.c.sprite, icoCx, cy, rh * 0.66);
    // name in the center well, auto-fit to the well width
    const nameCx = rx + w.name * rw;
    const maxNameW = w.nameW * rw * 0.96;
    const name = tCollectibleName(row.c.id);
    let ns = 1.4;
    while (ns > 0.8 && measureText(name, ns) > maxNameW) ns -= 0.1;
    drawText(g, name, nameCx, cy - (GLYPH_H * ns) / 2, ns, INK, { align: 'center' });
    // chip in the right well: NEW (rarity color) or ×count (orange for dup)
    const chipCx = rx + w.chip * rw;
    if (row.isNew) {
      drawText(g, t('ui.feedNew'), chipCx, cy - GLYPH_H / 2, 1, rar.color, { align: 'center', glow: rar.glow, glowBlur: 2 });
    } else {
      drawText(g, '×' + row.count, chipCx, cy - GLYPH_H / 2, 1, '#ff9a3c', { align: 'center' });
    }
  }

  private drawMessages(g: CanvasRenderingContext2D): void {
    if (this.notEnough > 0) {
      g.globalAlpha = Math.min(1, this.notEnough / 0.4);
      // Sit in the gap between the machine and the control deck (deck top=790),
      // so the warning never overlaps the pull buttons.
      drawText(g, t('ui.notEnoughCoins'), MACHINE_CX, MACHINE.y + MACHINE.h + 30, 3, '#ff5a6b', {
        align: 'center',
        glow: '#ff5a6b',
        glowBlur: 5,
        shadow: 'rgba(0,0,0,0.6)',
      });
      g.globalAlpha = 1;
    }

    // All-duplicates pull: a short summary pulse over the machine instead of a
    // blocking card, so the player can pull again immediately (QA-002).
    if (this.dupPulse > 0) {
      g.globalAlpha = Math.min(1, this.dupPulse / 0.4);
      drawText(g, t('ui.dup', { n: this.dupPulseCount }), MACHINE_CX, MACHINE.y + MACHINE.h * 0.4, 3, '#ff9a3c', {
        align: 'center',
        glow: '#ff9a3c',
        glowBlur: 5,
        shadow: 'rgba(0,0,0,0.6)',
      });
      g.globalAlpha = 1;
    }
  }

  // ---- cabinet-slot tooltip ----------------------------------------------

  private drawTooltip(g: CanvasRenderingContext2D): void {
    const info: TipInfo | null = this.hoverTip ?? (this.sticky && this.sticky.life > 0 ? this.sticky.info : null);
    if (!info) return;

    const rar = info.locked ? null : RARITIES[info.c.rarity];
    const borderCol = info.locked ? '#8a8aa8' : rar!.color;

    const tipW = 250;
    const pad = 12;
    const innerW = tipW - pad * 2;

    const descText = info.locked ? t('ui.lockedHint') : tCollectibleDesc(info.c.id);
    const descLines = wrapText(descText, 1.3, innerW);
    const ownedLine = !info.locked && info.count > 1 ? t('ui.owned', { n: info.count }) : null;

    // Height from the composed lines (glyph heights: scale2=14, 1.3≈9, 1.4≈10).
    let contentH = 14 + 6; // name + gap
    if (!info.locked) {
      contentH += 9 + 6; // rarity/type line + gap
      contentH += 2 + 8; // divider + gap
    }
    contentH += descLines.length * (9 + 4); // description lines
    if (ownedLine) contentH += 4 + 10; // gap + owned line
    const tipH = Math.round(pad + contentH + pad - 4);

    // Anchor to the right of the slot, flip left if it would run off-canvas,
    // then clamp the whole box on-screen.
    const stageW = this.ctx.stage.width;
    const stageH = this.ctx.stage.height;
    let tipX = info.cx + 30;
    if (tipX + tipW > stageW - 8) tipX = info.cx - 30 - tipW;
    let tipY = info.cy - tipH / 2;
    tipX = Math.max(8, Math.min(stageW - 8 - tipW, tipX));
    tipY = Math.max(8, Math.min(stageH - 8 - tipH, tipY));

    // Box
    rrect(g, tipX, tipY, tipW, tipH, 10);
    g.fillStyle = 'rgba(20,14,38,0.96)';
    g.fill();
    g.save();
    g.shadowColor = borderCol;
    g.shadowBlur = 10;
    rrect(g, tipX, tipY, tipW, tipH, 10);
    g.strokeStyle = borderCol;
    g.lineWidth = 2;
    g.stroke();
    g.restore();

    const lx = tipX + pad;
    let ty = tipY + pad;

    if (info.locked) {
      drawText(g, t('ui.lockedPrize'), lx, ty, 2, '#8a8aa8', { glow: '#8a8aa8', glowBlur: 3 });
      ty += 14 + 6;
    } else {
      // Optional generated thumbnail to the left of the name; shift the name
      // right only when the icon is present so text never overlaps it.
      let nameX = lx;
      const tipIcon = collectibleIcon(info.c.id);
      if (tipIcon) {
        drawIconCentered(g, tipIcon, lx + 12, ty + 7, 24);
        nameX = lx + 30;
      }
      drawText(g, tCollectibleName(info.c.id), nameX, ty, 2, rar!.color, { glow: rar!.glow, glowBlur: 3 });
      ty += 14 + 6;
      // rarity  •  TYPE  — the bullet is a code-drawn dot (font has no glyph).
      const w1 = drawText(g, tRarity(rar!.key), lx, ty, 1.3, rar!.color);
      const dotX = lx + w1 + 6;
      g.fillStyle = rar!.color;
      g.fillRect(dotX, ty + 3, 3, 3);
      drawText(g, tType(info.c.type), dotX + 3 + 6, ty, 1.3, rar!.color);
      ty += 9 + 6;
      // divider
      g.fillStyle = rar!.color;
      g.globalAlpha = 0.55;
      g.fillRect(lx, ty, innerW, 2);
      g.globalAlpha = 1;
      ty += 2 + 8;
    }

    for (const line of descLines) {
      drawText(g, line, lx, ty, 1.3, INK);
      ty += 9 + 4;
    }

    if (ownedLine) {
      ty += 4;
      drawText(g, ownedLine, lx, ty, 1.4, GOLD);
    }
  }

  // ---- actions ------------------------------------------------------------

  private doPull(count: number): void {
    const cost = count === 10 ? CONFIG.PULL10_COST : CONFIG.PULL_COST * count;
    if (this.ctx.store.state.coins < cost) {
      this.ctx.sound.error();
      this.notEnough = 1.6;
      return; // not enough coins — the lever does not move
    }
    const res = this.ctx.store.pull(count);
    if (!res) {
      this.ctx.sound.error();
      return;
    }

    // Fast-forward any reveals still playing from a previous pull so a new pull
    // never stacks a long backlog of cards (QA-002 skip-on-repeat).
    this.skipReveals();

    // Current batch is intentionally retained as a reviewable unit. Showing the
    // latest result first keeps the old ticker convention, while feedStart=0
    // pins the first four until the player wheels, drags, or taps the stepper.
    this.feed = res.results
      .map((r) => ({ c: r.collectible, isNew: !r.isDup, count: r.count }))
      .reverse();
    this.feedStart = 0;

    // Only NEW items get the blocking big-reveal card. Duplicates live only in
    // the feed. If nothing is new, show a short all-duplicates summary pulse.
    const newItems = res.results.filter((r) => !r.isDup);
    for (const r of newItems) this.queue.push(r);
    if (newItems.length === 0) {
      this.dupPulse = 1.3;
      this.dupPulseCount = res.results.length;
    }

    const best = res.results.reduce((a, b) =>
      RARITIES[b.collectible.rarity].order < RARITIES[a.collectible.rarity].order ? b : a,
    );
    this.pullBurstGlow = RARITIES[best.collectible.rarity].glow;

    // Kick the lever. The shake + mouth burst fire once it snaps down (in tick),
    // then the first NEW card reveals after revealDelay. PULL X10 is one stronger
    // pull, not ten — the single lever throw drives the whole batch.
    this.leverT = 0;
    this.leverShook = false;
    this.popFired = false;
    // Hold off the first card until the lever has punched down, held, sprung back,
    // AND the capsule has popped — so the pull reads as a physical action first.
    this.revealDelay = 0.58;
    this.ctx.sound.pull();

    for (const a of res.achievements) this.ctx.fx.toast(tAchName(a.id), tAchDesc(a.id), a.sprite);
  }

  /** Fast-forward the big-reveal queue: drop any pending/current cards. The
   * store already applied every outcome, and the feed already logged them, so
   * skipping only removes the blocking card animation (QA-002 skip). */
  private skipReveals(): void {
    this.queue = [];
    this.current = null;
    this.cardLife = 0;
    this.revealTimer = 0;
    this.revealDelay = 0;
    this.popFired = true;
  }
}
