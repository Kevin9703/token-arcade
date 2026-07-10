/*
 * widgets.ts — small drawing/animation helpers shared by the screens: icon and
 * crop blitting that preserves aspect ratio, radial glows, and the eased
 * number used by every coin readout. Pure presentation; no game knowledge.
 */

import { drawImageSmooth } from './assets';
import type { CropRect } from './assets';

/**
 * A number that eases toward its target each frame — the coin counters use
 * this so balances climb/fall instead of snapping.
 */
export class EasedNumber {
  private shown = 0;

  /** Jump straight to `v` (screen enter, no animation). */
  set(v: number): void {
    this.shown = v;
  }

  /** Advance toward `target`; returns the value to display this frame. */
  toward(target: number, dt: number): number {
    this.shown += (target - this.shown) * Math.min(1, dt * 6);
    if (Math.abs(target - this.shown) < 0.5) this.shown = target;
    return this.shown;
  }

  get value(): number {
    return this.shown;
  }
}

/**
 * Draw a whole image centered on (cx, cy), contain-fit into a square of
 * `size` preserving aspect (the larger dimension equals `size`). Used for
 * generated collectible/currency icons, which are never tinted.
 */
export function drawIconCentered(g: CanvasRenderingContext2D, img: HTMLImageElement, cx: number, cy: number, size: number): void {
  const nw = img.naturalWidth || size;
  const nh = img.naturalHeight || size;
  const ar = nw / nh;
  let w = size;
  let h = size;
  if (ar >= 1) h = size / ar;
  else w = size * ar;
  drawImageSmooth(g, img, cx - w / 2, cy - h / 2, w, h);
}

/**
 * Contain-fit a WHOLE image into a `maxW × maxH` box, preserving aspect,
 * centered on (cx, cy). Unlike drawIconCentered (square target) this keeps a
 * non-square icon at its true proportions — a wide asset stays wide instead of
 * being squeezed. Used for the shop capsule icons (x10 is wider than x1).
 */
export function drawImageContain(g: CanvasRenderingContext2D, img: HTMLImageElement, cx: number, cy: number, maxW: number, maxH: number): void {
  const nw = img.naturalWidth || maxW;
  const nh = img.naturalHeight || maxH;
  const ar = nw / nh;
  let w = maxW;
  let h = maxW / ar;
  if (h > maxH) {
    h = maxH;
    w = maxH * ar;
  }
  drawImageSmooth(g, img, cx - w / 2, cy - h / 2, w, h);
}

/**
 * Contain-fit a CROP of an image inside a box, preserving the crop's aspect.
 * `alignBottom` sits the art on the box floor (for standing characters).
 */
export function drawCropContain(
  g: CanvasRenderingContext2D,
  img: HTMLImageElement,
  crop: CropRect,
  x: number,
  y: number,
  w: number,
  h: number,
  alignBottom = false,
): void {
  const ar = crop.sw / crop.sh;
  let dw = w;
  let dh = w / ar;
  if (dh > h) {
    dh = h;
    dw = h * ar;
  }
  const dx = x + (w - dw) / 2;
  const dy = alignBottom ? y + (h - dh) : y + (h - dh) / 2;
  drawImageSmooth(g, img, dx, dy, dw, dh, crop);
}

/** A soft radial glow centered on (cx, cy), fading to transparent at `r`. */
export function radial(g: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string): void {
  const grad = g.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, color);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(cx - r, cy - r, r * 2, r * 2);
}
