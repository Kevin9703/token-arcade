/*
 * canvas.ts — low-level geometry helpers shared by every drawer.
 *
 * These wrap the handful of Canvas2D primitives that the arcade art leans on:
 * rounded rectangles, vertical gradients, beveled panels, and marquee bulbs.
 */

/** Trace a rounded-rectangle path (radius is clamped to fit the box). */
export function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

// Fill a rect with a subtle top-to-bottom gradient between two colors.
export function vgrad(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, top: string, bottom: string): void {
  const g = ctx.createLinearGradient(0, y, 0, y + h);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, h);
}

// A panel with a chunky beveled border, used for in-world boxes.
export function panel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  opts?: { radius?: number; fill?: string; border?: string; borderWidth?: number },
): void {
  const o = opts || {};
  const r = o.radius == null ? 8 : o.radius;
  rrect(ctx, x, y, w, h, r);
  if (o.fill) {
    ctx.fillStyle = o.fill;
    ctx.fill();
  }
  if (o.border) {
    ctx.lineWidth = o.borderWidth || 3;
    ctx.strokeStyle = o.border;
    ctx.stroke();
  }
}

// A small dot of light — used for marquee bulbs and neon studs.
export function bulb(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, on: boolean): void {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  if (on) {
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = r * 3;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  } else {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}
