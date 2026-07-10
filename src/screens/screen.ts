/*
 * screen.ts — the contract every screen implements and the shared context they
 * are handed. A screen is a thin object: it draws to the canvas each frame and
 * registers its own hotspots via the Stage. All shared services (stage, store,
 * router, effects, sound, assets, and the DOM modal openers) arrive through
 * ScreenContext so screens never reach into globals or module singletons.
 */

import type { Stage } from '../render/stage';
import type { GameStore } from '../state/store';
import type { Fx } from '../render/fx';
import type { Sound } from '../render/sound';
import type { AssetStore } from '../render/assets';
import type { Router } from './router';

/** Services every screen receives at construction time. */
export interface ScreenContext {
  stage: Stage;
  store: GameStore;
  router: Router;
  /** Particle/banner/toast effects layer, drawn above the active screen. */
  fx: Fx;
  /** Chiptune bleep kit. */
  sound: Sound;
  /** Generated-art loader; get() returns null until an image is decoded. */
  assets: AssetStore;
  /** Open the DOM help modal. */
  openHelp(): void;
  /** Open the DOM settings modal. */
  openSettings(): void;
  /** Open the DOM rename dialog for the player's display name. */
  editPlayerName(): void;
}

/** A single full-screen view. Screens are registered with the Router by name. */
export interface Screen {
  /** Unique route name, e.g. 'room', used by the Router. */
  readonly name: string;
  /** Called when the router navigates to this screen. */
  enter?(params?: unknown): void;
  /** Called when the router navigates away from this screen. */
  leave?(): void;
  /** Draw one frame. `dt` is seconds since last frame, `now` is ms. */
  render(ctx: CanvasRenderingContext2D, dt: number, now: number): void;
}
