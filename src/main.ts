/*
 * main.ts — bootstrap. Wire the canvas Stage, the GameStore, the DOM overlays,
 * and the screen Router together, then run the render loop.
 *
 * The loop is intentionally tiny: advance effects, render the active screen
 * (which draws fx on top). Screens own everything else.
 */

import { Stage } from './render/stage';
import { GameStore } from './state/store';
import { fx } from './render/fx';
import { sound } from './render/sound';
import { assets } from './render/assets';
import { Overlays } from './ui/overlays';
import { Router } from './screens/router';
import type { ScreenContext } from './screens/screen';
import { RoomScreen } from './screens/roomScreen';
import { CabinetScreen } from './screens/cabinetScreen';
import { CapsuleScreen } from './screens/capsuleScreen';
import { AchievementScreen } from './screens/achievementScreen';
import { CustomizeScreen } from './screens/customizeScreen';

let roomScreen: RoomScreen;

const canvas = document.getElementById('stage');
const overlaysRoot = document.getElementById('overlays');
if (!(canvas instanceof HTMLCanvasElement) || !overlaysRoot) {
  throw new Error('Token Arcade: missing #stage canvas or #overlays root');
}

const stage = new Stage(canvas);
const store = new GameStore();
const overlays = new Overlays(
  overlaysRoot,
  store,
  () => {
    // Keep the audio engine + render cap in sync with persisted settings.
    sound.setMuted(store.state.settings.muted);
    stage.setFrameMode(store.state.settings.fps);
  },
  () => {
    // Settings -> Achievements: close the modal and route to the gallery.
    overlays.close();
    router.go('achievements');
  },
  () => {
    // Settings -> real history retry always returns to the arcade room, where
    // an empty result can surface the same truthful decision panel.
    router.go('room');
    void roomScreen.tryLiveScanFromSettings();
  },
);

// Apply the persisted mute setting + frame-rate cap up front.
sound.setMuted(store.state.settings.muted);
stage.setFrameMode(store.state.settings.fps);

// Start loading the generated room art. Screens fall back to procedural art
// until each image is ready, so this never blocks first paint.
assets.load();

// The router needs the context, and the context references the router, so the
// context is supplied lazily via a closure.
let context: ScreenContext;
const router = new Router(() => context);
context = {
  stage,
  store,
  router,
  fx,
  sound,
  assets,
  openHelp: () => overlays.openHelp(),
  openSettings: () => overlays.openSettings(),
  editPlayerName: () => overlays.openPlayerName(),
};

roomScreen = new RoomScreen(context);
router.register(roomScreen);
router.register(new CabinetScreen(context));
router.register(new CapsuleScreen(context));
router.register(new AchievementScreen(context));
router.register(new CustomizeScreen(context));
router.go('room');

stage.start((ctx, dt, now) => {
  fx.update(dt);
  router.render(ctx, dt, now);
});

// Browsers require a user gesture before audio can start; resume on first tap.
window.addEventListener('pointerdown', () => sound.resume(), { once: true });

// Debug handle for the console.
(window as unknown as { arcade: unknown }).arcade = { store, router, stage };
