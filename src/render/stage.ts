/*
 * stage.ts — the canvas engine.
 *
 * The whole game is authored in a fixed LOGICAL coordinate space (1600x1000).
 * The Stage is the single place that knows how that logical space maps onto the
 * real device: it letterboxes the logical area into whatever size the canvas
 * element happens to be, scales for `devicePixelRatio` so pixels stay crisp,
 * and inverts that same transform for pointer input so hit-testing can be done
 * in logical coordinates too.
 *
 * A frame callback draws in logical units and never has to think about DPR,
 * resizing, or letterbox bars. Clickable regions are declared per-frame via
 * `hotspot()`; the Stage remembers the last rendered frame's hotspots and uses
 * them to route `click` events and drive the cursor.
 */

import type { FrameMode, Hotspot, Point } from '../core/types';

/** Options accepted by the Stage constructor. */
export interface StageOptions {
  /** Logical width of the play area. Default 1600. */
  width?: number;
  /** Logical height of the play area. Default 1000. */
  height?: number;
  /** Background/letterbox fill color. Default '#050308'. */
  background?: string;
}

/** The per-frame draw callback. `dt` is seconds, `now` is performance.now() ms. */
export type FrameCallback = (ctx: CanvasRenderingContext2D, dt: number, now: number) => void;

export class Stage {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  /** Logical width — everything is authored against this. */
  readonly width: number;
  /** Logical height — everything is authored against this. */
  readonly height: number;
  /** Pointer position in LOGICAL coordinates (updated on every pointermove). */
  mouse: Point = { x: 0, y: 0 };

  // ---- internal render state ----------------------------------------------
  private readonly background: string;
  private frameFn: FrameCallback | null = null;
  private rafId: number | null = null;
  private lastNow = 0;

  // Frame pacing. This is a pixel-art app, so capping the device-pixel-ratio
  // and frame rate looks effectively identical while cutting GPU/CPU work
  // several-fold (a retina 2x, 60fps full-scene redraw is what spins the fan).
  // But continuous motion — scrolling, dragging, hover — reads as stutter at
  // 30fps, so the loop ADAPTS: it renders at 60fps for a short window after any
  // interaction (or an explicit wake()), then settles back to the quiet 30fps
  // baseline once things go still. Idle bobs/flicker never needed 60.
  private readonly maxDpr = 1.5;
  private readonly idleFrameMs = 1000 / 30; // ~30fps at rest
  private readonly activeFrameMs = 1000 / 60; // ~60fps while interacting
  private readonly activeWindowMs = 600; // hold 60fps this long after activity
  private activeUntil = 0; // performance.now() deadline for the 60fps window
  private lastPaint = 0;
  // User-selectable cap: 'auto' = adaptive (30 idle / 60 active), or a flat
  // 30/60. Set via setFrameMode(); defaults to the adaptive baseline.
  private frameMode: FrameMode = 'auto';

  // Backing-store size we last configured; used to only resize when needed.
  private backingW = -1;
  private backingH = -1;

  // Current logical->CSS mapping, cached so pointer events can invert it.
  private scale = 1;
  private offsetX = 0;
  private offsetY = 0;

  // Hotspots registered during the frame currently being rendered.
  private frameHotspots: Hotspot[] = [];
  // Hotspots from the last completed frame; the basis for click hit-testing.
  private activeHotspots: Hotspot[] = [];

  // Scrollable regions declared this frame (logical rects); the last frame's
  // set is what wheel events hit-test against. A screen registers a region with
  // scrollRegion() and reads the accumulated wheel delta with takeScrollDelta().
  private frameScrollRegions: Array<{ x: number; y: number; w: number; h: number }> = [];
  private activeScrollRegions: Array<{ x: number; y: number; w: number; h: number }> = [];
  // Vertical wheel/drag delta (in logical px) accumulated over a scroll region
  // since the last takeScrollDelta(); lets multiple events between frames sum.
  private wheelAccumY = 0;
  private dragPointerId: number | null = null;
  private dragLastY = 0;
  private dragDistance = 0;
  private dragHotspot: Hotspot | null = null;
  private dragHotspotPointerId: number | null = null;
  private dragHotspotDistance = 0;
  private dragHotspotLast: Point = { x: 0, y: 0 };
  private suppressClicksUntil = 0;

  // Bound listeners (kept for the object's lifetime so start/stop can toggle
  // rendering without losing pointer tracking).
  private readonly onPointerMove: (e: PointerEvent) => void;
  private readonly onPointerDown: (e: PointerEvent) => void;
  private readonly onPointerUp: (e: PointerEvent) => void;
  private readonly onClick: (e: MouseEvent) => void;
  private readonly onWheel: (e: WheelEvent) => void;
  private readonly onResize: () => void;

  constructor(canvas: HTMLCanvasElement, opts: StageOptions = {}) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Stage: 2D canvas context is unavailable');
    }
    this.ctx = ctx;
    this.width = opts.width ?? 1600;
    this.height = opts.height ?? 1000;
    this.background = opts.background ?? '#050308';

    this.onPointerMove = (e: PointerEvent): void => {
      this.updateMouse(e.clientX, e.clientY);
      if (this.dragHotspotPointerId === e.pointerId && this.dragHotspot) {
        const dx = this.mouse.x - this.dragHotspotLast.x;
        const dy = this.mouse.y - this.dragHotspotLast.y;
        this.dragHotspotDistance += Math.hypot(dx, dy);
        this.dragHotspotLast = { ...this.mouse };
        this.dragHotspot.onDragMove?.({ ...this.mouse });
      }
      if (this.dragPointerId === e.pointerId) {
        const dy = this.dragLastY - this.mouse.y;
        this.dragLastY = this.mouse.y;
        this.dragDistance += Math.abs(dy);
        this.wheelAccumY += dy;
      }
      this.wake(); // smooth hover + drag: run at 60fps while the pointer moves
    };
    this.onPointerDown = (e: PointerEvent): void => {
      this.updateMouse(e.clientX, e.clientY);
      for (let i = this.activeHotspots.length - 1; i >= 0; i--) {
        const hotspot = this.activeHotspots[i];
        if (!hotspot.onDragStart || !this.isHover(hotspot.x, hotspot.y, hotspot.w, hotspot.h)) continue;
        this.dragHotspot = hotspot;
        this.dragHotspotPointerId = e.pointerId;
        this.dragHotspotDistance = 0;
        this.dragHotspotLast = { ...this.mouse };
        this.canvas.setPointerCapture(e.pointerId);
        hotspot.onDragStart({ ...this.mouse });
        this.wake();
        return;
      }
      if (!this.pointerInScrollRegion()) return;
      this.dragPointerId = e.pointerId;
      this.dragLastY = this.mouse.y;
      this.dragDistance = 0;
      this.canvas.setPointerCapture(e.pointerId);
      this.wake();
    };
    this.onPointerUp = (e: PointerEvent): void => {
      this.updateMouse(e.clientX, e.clientY);
      if (this.dragHotspotPointerId === e.pointerId && this.dragHotspot) {
        if (this.dragHotspotDistance > 3) this.suppressClicksUntil = performance.now() + 180;
        this.dragHotspot.onDragEnd?.({ ...this.mouse });
        this.dragHotspot = null;
        this.dragHotspotPointerId = null;
        if (this.canvas.hasPointerCapture(e.pointerId)) this.canvas.releasePointerCapture(e.pointerId);
        this.wake();
        return;
      }
      if (this.dragPointerId !== e.pointerId) return;
      if (this.dragDistance > 3) this.suppressClicksUntil = performance.now() + 180;
      this.dragPointerId = null;
      if (this.canvas.hasPointerCapture(e.pointerId)) this.canvas.releasePointerCapture(e.pointerId);
      this.wake();
    };
    this.onClick = (e: MouseEvent): void => {
      this.wake(); // a click often kicks off an animation (coin rain, level-up)
      if (performance.now() < this.suppressClicksUntil) {
        return;
      }
      this.handleClick(e.clientX, e.clientY);
    };
    // Wheel over a registered scroll region pans that region instead of the
    // page. deltaY is normalized to logical px (line/page modes scaled up, then
    // divided by the letterbox scale) and summed until the frame consumes it.
    this.onWheel = (e: WheelEvent): void => {
      this.updateMouse(e.clientX, e.clientY);
      if (!this.pointerInScrollRegion()) return;
      e.preventDefault();
      this.wake(); // 60fps for the duration of the scroll gesture
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? this.height : 1;
      this.wheelAccumY += (e.deltaY * unit) / (this.scale || 1);
    };
    // Invalidate the cached backing size so the next frame reconfigures it.
    this.onResize = (): void => {
      this.backingW = -1;
      this.backingH = -1;
    };

    this.canvas.addEventListener('pointermove', this.onPointerMove);
    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    this.canvas.addEventListener('pointerup', this.onPointerUp);
    this.canvas.addEventListener('pointercancel', this.onPointerUp);
    this.canvas.addEventListener('click', this.onClick);
    // passive:false so preventDefault() can stop the page from scrolling.
    this.canvas.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('resize', this.onResize);
  }

  /** Begin the render loop. Safe to call again; a running loop is replaced. */
  start(frame: FrameCallback): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.frameFn = frame;
    this.lastNow = performance.now();
    const loop = (now: number): void => {
      // Re-arm first so a stop() call inside the frame can cancel it.
      this.rafId = requestAnimationFrame(loop);
      // Throttle to the current cap. Flat 30/60 when the user pinned one;
      // otherwise adaptive — 60fps inside an active window, else 30fps. Skipped
      // frames keep accumulating dt.
      const minFrameMs =
        this.frameMode === 60
          ? this.activeFrameMs
          : this.frameMode === 30
            ? this.idleFrameMs
            : now < this.activeUntil
              ? this.activeFrameMs
              : this.idleFrameMs;
      if (now - this.lastPaint < minFrameMs) return;
      this.lastPaint = now;
      this.renderFrame(now);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  /**
   * Request a burst of 60fps rendering. Input handlers call this automatically,
   * but screens can call it too when they kick off a self-driven animation that
   * isn't tied to an input event (e.g. a multi-second coin rain after sync) so
   * it stays smooth instead of falling back to the 30fps idle cap.
   */
  wake(ms: number = this.activeWindowMs): void {
    const until = performance.now() + ms;
    if (until > this.activeUntil) this.activeUntil = until;
  }

  /** Set the frame-rate cap: 'auto' (30fps idle, 60fps while interacting), or a
   * flat 30 / 60. Applied on the very next frame. */
  setFrameMode(mode: FrameMode): void {
    this.frameMode = mode;
  }

  /** Cancel the render loop. Pointer listeners remain so start() can resume. */
  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.frameFn = null;
  }

  /**
   * Register a clickable region for THIS frame and report hover immediately.
   * Call once per interactive element every frame. Returns true when the
   * pointer is currently over the region; also fires `h.onHover` if present.
   */
  hotspot(h: Hotspot): boolean {
    this.frameHotspots.push(h);
    const hovering = this.isHover(h.x, h.y, h.w, h.h);
    if (h.onHover) {
      h.onHover(hovering);
    }
    return hovering;
  }

  /** Whether the logical pointer is inside the given logical rect. */
  isHover(x: number, y: number, w: number, h: number): boolean {
    const m = this.mouse;
    return m.x >= x && m.x <= x + w && m.y >= y && m.y <= y + h;
  }

  /**
   * Declare a scrollable region for THIS frame. While the pointer is over it,
   * wheel events pan the region (and are kept off the page) instead of scrolling
   * the document. Read the accumulated motion with takeScrollDelta().
   */
  scrollRegion(x: number, y: number, w: number, h: number): void {
    this.frameScrollRegions.push({ x, y, w, h });
  }

  /** Consume the vertical wheel delta (logical px) collected over scroll
   * regions since the last call, resetting the accumulator. Positive = down. */
  takeScrollDelta(): number {
    const v = this.wheelAccumY;
    this.wheelAccumY = 0;
    return v;
  }

  /** Whether the logical pointer is inside any of the last frame's scroll
   * regions (used by the wheel handler to decide whether to intercept). */
  private pointerInScrollRegion(): boolean {
    for (const r of this.activeScrollRegions) {
      if (this.isHover(r.x, r.y, r.w, r.h)) return true;
    }
    return false;
  }

  // ---- internals ----------------------------------------------------------

  /** Render a single frame: fit, clear, transform, draw, then settle hotspots. */
  private renderFrame(now: number): void {
    const fn = this.frameFn;
    if (!fn) {
      return;
    }

    // dt in seconds, clamped so a backgrounded tab doesn't produce a huge jump.
    let dt = (now - this.lastNow) / 1000;
    if (dt > 0.05) {
      dt = 0.05;
    } else if (dt < 0) {
      dt = 0;
    }
    this.lastNow = now;

    const ctx = this.ctx;
    const canvas = this.canvas;

    // ---- size the backing store to device pixels (only when it changed) ---
    // Cap DPR: past ~1.5x the extra pixels are wasted work for pixel art.
    const dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);
    const clientW = canvas.clientWidth || this.width;
    const clientH = canvas.clientHeight || this.height;
    const bw = Math.max(1, Math.round(clientW * dpr));
    const bh = Math.max(1, Math.round(clientH * dpr));
    if (bw !== this.backingW || bh !== this.backingH) {
      canvas.width = bw;
      canvas.height = bh;
      this.backingW = bw;
      this.backingH = bh;
    }

    // ---- fit the logical area into the client rect, centered (letterbox) --
    // scale maps 1 logical unit -> `scale` CSS px; the smaller axis wins so the
    // whole 1600x1000 area is visible with bars on the longer axis.
    const scale = Math.min(clientW / this.width, clientH / this.height);
    const offsetX = (clientW - this.width * scale) / 2;
    const offsetY = (clientH - this.height * scale) / 2;
    this.scale = scale;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    // ---- clear the entire backing store to the background color -----------
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, bw, bh);

    // ---- apply the logical transform --------------------------------------
    // device = (logical * scale + offset) * dpr, so a=d=scale*dpr and the
    // translation is the letterbox offset expressed in device pixels.
    ctx.setTransform(scale * dpr, 0, 0, scale * dpr, offsetX * dpr, offsetY * dpr);
    ctx.imageSmoothingEnabled = false;

    // ---- run the user frame with fresh hotspot + scroll-region lists ------
    this.frameHotspots = [];
    this.frameScrollRegions = [];
    fn(ctx, dt, now);

    // Promote this frame's hotspots + scroll regions as the hit-test sets.
    this.activeHotspots = this.frameHotspots;
    this.activeScrollRegions = this.frameScrollRegions;

    // ---- cursor feedback --------------------------------------------------
    let cursor = 'default';
    for (let i = this.activeHotspots.length - 1; i >= 0; i--) {
      const h = this.activeHotspots[i];
      if ((h.onClick || h.onDragStart) && this.isHover(h.x, h.y, h.w, h.h)) {
        cursor = h.cursor ?? 'pointer';
        break;
      }
    }
    if (canvas.style.cursor !== cursor) {
      canvas.style.cursor = cursor;
    }
  }

  /** Convert client (viewport) coordinates into logical coordinates. */
  private updateMouse(clientX: number, clientY: number): void {
    const rect = this.canvas.getBoundingClientRect();
    // Position within the canvas element, in CSS pixels.
    const cssX = clientX - rect.left;
    const cssY = clientY - rect.top;
    // Invert the letterbox+scale mapping: logical = (css - offset) / scale.
    this.mouse.x = (cssX - this.offsetX) / this.scale;
    this.mouse.y = (cssY - this.offsetY) / this.scale;
  }

  /** Route a click to the topmost matching hotspot from the last frame. */
  private handleClick(clientX: number, clientY: number): void {
    // Refresh the logical pointer from the click position first.
    this.updateMouse(clientX, clientY);
    // Iterate in reverse so the last-registered (topmost) hotspot wins.
    for (let i = this.activeHotspots.length - 1; i >= 0; i--) {
      const h = this.activeHotspots[i];
      if (h.onClick && this.isHover(h.x, h.y, h.w, h.h)) {
        h.onClick();
        return;
      }
    }
  }
}
