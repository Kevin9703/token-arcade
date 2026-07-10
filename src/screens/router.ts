/*
 * router.ts — a tiny screen stack.
 *
 * Screens are registered by name and swapped with go()/back(). The router keeps
 * a small history stack so a detail screen can pop back to wherever the user
 * came from (defaulting to the arcade room). On every navigation the effects
 * layer is reset so particles/banners from one screen don't bleed into the next.
 *
 * render() draws the active screen and then layers the shared fx on top, so
 * coin-rain and toasts always sit above whatever screen is showing.
 */

import type { Screen, ScreenContext } from './screen';

export class Router {
  private readonly screens = new Map<string, Screen>();
  private readonly stack: string[] = [];
  private activeName: string | null = null;

  /** `getContext` is deferred so main.ts can wire the context after the router
   * exists (the context itself holds a reference back to the router). */
  constructor(private readonly getContext: () => ScreenContext) {}

  register(screen: Screen): void {
    this.screens.set(screen.name, screen);
  }

  /** The currently active screen. Throws if the router has not been started. */
  get current(): Screen {
    const s = this.activeName ? this.screens.get(this.activeName) : undefined;
    if (!s) throw new Error('Router: no active screen — call go() first');
    return s;
  }

  /** Navigate forward to `name`, remembering the current screen for back(). */
  go(name: string, params?: unknown): void {
    if (!this.screens.has(name)) return;
    if (this.activeName && this.activeName !== name) this.stack.push(this.activeName);
    this.activate(name, params);
  }

  /** Pop the history stack, defaulting to the arcade room. */
  back(): void {
    const prev = this.stack.pop() ?? 'room';
    this.activate(prev, undefined);
  }

  private activate(name: string, params?: unknown): void {
    const next = this.screens.get(name);
    if (!next) return;
    const active = this.activeName ? this.screens.get(this.activeName) : undefined;
    if (active && active !== next) active.leave?.();
    this.activeName = name;
    this.getContext().fx.reset();
    next.enter?.(params);
  }

  /** Render the active screen, then draw the effects layer above it. */
  render(ctx: CanvasRenderingContext2D, dt: number, now: number): void {
    const { fx, stage } = this.getContext();
    this.current.render(ctx, dt, now);
    fx.draw(ctx, stage.width);
  }
}
