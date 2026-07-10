/*
 * fx.ts — juice. Particle coin-rain, floating banners, cabinet pulses, and
 * stacked achievement toasts. These effects live above every screen: the main
 * loop calls `fx.update(dt)` then `fx.draw(ctx, W)` after the scene has drawn.
 *
 * Ported from the reference FX object. State is module-scoped and exposed as a
 * single `fx` singleton so any layer can spawn effects without wiring.
 */

import type { Point } from '../core/types';
import { drawCoin, drawSprite, SPRITES } from './sprites';
import { drawText } from './pixelFont';
import { rrect, vgrad } from './canvas';
import { t } from '../i18n';

// ---- particle shapes ------------------------------------------------------

/** A flying coin: rises with gravity, then homes toward the coin pill. */
interface Coin {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  spin: number;
  spinV: number;
  /** Age in seconds; negative while the coin waits out its spawn delay. */
  t: number;
  phase: 'rise' | 'seek';
  target: Point;
  onArrive: (() => void) | undefined;
  arrived: boolean;
}

/** A sparkle mote that fades and falls. */
interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  size: number;
}

/** Floating pixel-text (e.g. "+120" over a cabinet). */
interface Banner {
  text: string;
  x: number;
  y: number;
  color: string;
  life: number;
  max: number;
  scale: number;
  vy: number;
  glow: string | undefined;
}

/** A stacked, top-center achievement notification. */
interface Toast {
  title: string;
  sub: string;
  sprite: string;
  life: number;
  max: number;
  t: number;
}

/** Options for a floating banner. */
export interface BannerOpts {
  life?: number;
  scale?: number;
  vy?: number;
  glow?: string;
}

// ---- module state ---------------------------------------------------------

let coins: Coin[] = []; // flying coin particles
let sparks: Spark[] = []; // sparkle particles
let banners: Banner[] = []; // floating text
let pulses: Record<string, number> = {}; // projectId -> pulse time remaining
let toasts: Toast[] = []; // achievement toasts

// Where the achievement-toast column is anchored (top-center of the stack).
// Screens can move it clear of their busy areas; reset() restores the default.
const DEFAULT_TOAST_ZONE = { cx: 800, top: 150, w: 360 };
let toastZone = { ...DEFAULT_TOAST_ZONE };

/** Anchor the achievement-toast column (center x, top y, box width). */
function setToastZone(cx: number, top: number, w: number): void {
  toastZone = { cx, top, w };
}

function reset(): void {
  coins = [];
  sparks = [];
  banners = [];
  pulses = {};
  toasts = [];
  toastZone = { ...DEFAULT_TOAST_ZONE };
}

// Burst of coins from (x,y) that rise, arc, then home toward the coin pill.
function coinRain(x: number, y: number, count: number, target: Point, onArrive?: () => void): void {
  for (let i = 0; i < count; i++) {
    const delay = Math.random() * 0.5;
    coins.push({
      x: x + (Math.random() - 0.5) * 80,
      y: y + (Math.random() - 0.5) * 30,
      vx: (Math.random() - 0.5) * 120,
      vy: -220 - Math.random() * 180,
      r: 9 + Math.random() * 5,
      spin: Math.random() * Math.PI,
      spinV: 6 + Math.random() * 6,
      t: -delay,
      phase: 'rise',
      target,
      onArrive,
      arrived: false,
    });
  }
  for (let i = 0; i < count * 1.4; i++) {
    spark(x + (Math.random() - 0.5) * 120, y + (Math.random() - 0.5) * 60, '#ffd23f');
  }
}

function spark(x: number, y: number, color?: string): void {
  sparks.push({
    x,
    y,
    vx: (Math.random() - 0.5) * 160,
    vy: -Math.random() * 160,
    life: 0.5 + Math.random() * 0.5,
    max: 1,
    color: color ?? '#fff',
    size: 1 + Math.random() * 2,
  });
}

function burst(x: number, y: number, color: string, n?: number): void {
  const count = n ?? 16;
  for (let i = 0; i < count; i++) {
    spark(x, y, color);
  }
}

function banner(text: string, x: number, y: number, color: string, opts: BannerOpts = {}): void {
  const life = opts.life ?? 1.8;
  banners.push({
    text,
    x,
    y,
    color,
    life,
    max: life,
    scale: opts.scale ?? 5,
    vy: opts.vy == null ? -40 : opts.vy,
    glow: opts.glow,
  });
}

function pulse(projectId: string): void {
  pulses[projectId] = 1.0;
}

function toast(title: string, sub: string, sprite: string): void {
  // Stagger a burst of toasts (e.g. four achievements from one big sync) so they
  // cascade in one at a time instead of covering the screen all at once. The
  // negative start time delays each toast behind the ones already queued.
  const delay = -0.35 * toasts.length;
  toasts.push({ title, sub, sprite, life: 3.4 - delay, max: 3.4, t: delay });
}

function pulseAmount(projectId: string): number {
  return pulses[projectId] || 0;
}

// ---- update + draw --------------------------------------------------------

function update(dt: number): void {
  // coins
  for (let i = coins.length - 1; i >= 0; i--) {
    const c = coins[i];
    c.t += dt;
    if (c.t < 0) {
      continue;
    }
    c.spin += c.spinV * dt;
    if (c.phase === 'rise') {
      c.vy += 620 * dt; // gravity
      c.x += c.vx * dt;
      c.y += c.vy * dt;
      if (c.t > 0.55 && c.target) {
        c.phase = 'seek';
      }
    } else {
      // ease toward target
      const dx = c.target.x - c.x;
      const dy = c.target.y - c.y;
      const d = Math.hypot(dx, dy) || 1;
      const sp = 900;
      c.x += (dx / d) * sp * dt;
      c.y += (dy / d) * sp * dt;
      if (d < 26) {
        if (!c.arrived && c.onArrive) {
          c.onArrive();
        }
        coins.splice(i, 1);
      }
    }
  }
  // sparks
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.life -= dt;
    s.vy += 300 * dt;
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    if (s.life <= 0) {
      sparks.splice(i, 1);
    }
  }
  // banners
  for (let i = banners.length - 1; i >= 0; i--) {
    const b = banners[i];
    b.life -= dt;
    b.y += b.vy * dt;
    if (b.life <= 0) {
      banners.splice(i, 1);
    }
  }
  // pulses
  for (const k in pulses) {
    pulses[k] -= dt * 1.4;
    if (pulses[k] <= 0) {
      delete pulses[k];
    }
  }
  // toasts
  for (let i = toasts.length - 1; i >= 0; i--) {
    const t = toasts[i];
    t.life -= dt;
    t.t += dt;
    if (t.life <= 0) {
      toasts.splice(i, 1);
    }
  }
}

function draw(ctx: CanvasRenderingContext2D, W: number): void {
  // sparks
  for (const s of sparks) {
    ctx.globalAlpha = Math.max(0, s.life / s.max);
    ctx.fillStyle = s.color;
    ctx.fillRect(s.x, s.y, s.size, s.size);
  }
  ctx.globalAlpha = 1;
  // coins
  for (const c of coins) {
    if (c.t < 0) {
      continue;
    }
    drawCoin(ctx, c.x, c.y, c.r, Math.cos(c.spin));
  }
  // banners
  for (const b of banners) {
    const a = Math.min(1, b.life / 0.5);
    ctx.globalAlpha = a;
    drawText(ctx, b.text, b.x, b.y, b.scale, b.color, {
      align: 'center',
      glow: b.glow ?? b.color,
      glowBlur: 5,
      shadow: 'rgba(0,0,0,0.6)',
    });
    ctx.globalAlpha = 1;
  }
  // Achievement toasts, stacked at the configurable zone (screens move this
  // clear of their title/centerpiece). Toasts still in their stagger delay
  // (t < 0) haven't appeared yet, so they take no slot.
  const tw = toastZone.w;
  const tx = toastZone.cx - tw / 2;
  const th = 54;
  let ty = toastZone.top;
  for (const to of toasts) {
    if (to.t < 0) continue;
    const inA = Math.min(1, to.t / 0.3);
    const outA = Math.min(1, to.life / 0.4);
    ctx.globalAlpha = Math.min(inA, outA);
    // subtle drop shadow so toasts read as floating over the room
    rrect(ctx, tx + 3, ty + 4, tw, th, 8);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fill();
    rrect(ctx, tx, ty, tw, th, 8);
    vgrad(ctx, tx, ty, tw, th, '#2a1e4a', '#160f28');
    ctx.fill();
    ctx.strokeStyle = '#ffd23f';
    ctx.lineWidth = 2;
    rrect(ctx, tx, ty, tw, th, 8);
    ctx.stroke();
    const spr = SPRITES[to.sprite];
    if (to.sprite && spr) {
      drawSprite(ctx, spr, tx + 11, ty + 11, 2);
    }
    drawText(ctx, t('ui.achievement'), tx + 44, ty + 11, 1.4, '#ffd23f');
    drawText(ctx, to.title, tx + 44, ty + 29, 1.75, '#f6f4ff');
    ctx.globalAlpha = 1;
    ty += th + 8;
  }
}

function busy(): boolean {
  return coins.length > 0;
}

/** The effects service interface, as handed to screens via ScreenContext. */
export type Fx = typeof fx;

/** The effects singleton, drawn above every screen by the main loop. */
export const fx = {
  reset,
  coinRain,
  spark,
  burst,
  banner,
  pulse,
  pulseAmount,
  toast,
  setToastZone,
  update,
  draw,
  busy,
};
