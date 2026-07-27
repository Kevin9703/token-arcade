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
import type { AssetName } from './render/assets';
import { Overlays } from './ui/overlays';
import { Router } from './screens/router';
import type { ScreenContext } from './screens/screen';
import { RoomScreen } from './screens/roomScreen';
import { CabinetScreen } from './screens/cabinetScreen';
import { CapsuleScreen } from './screens/capsuleScreen';
import { AchievementScreen } from './screens/achievementScreen';
import { CustomizeScreen } from './screens/customizeScreen';

let roomScreen: RoomScreen;

const params = new URLSearchParams(window.location.search);
const hostedDemo = params.get('demo') === '1' || window.location.hostname.endsWith('github.io');

const canvas = document.getElementById('stage');
const overlaysRoot = document.getElementById('overlays');
if (!(canvas instanceof HTMLCanvasElement) || !overlaysRoot) {
  throw new Error('Token Arcade: missing #stage canvas or #overlays root');
}

const stage = new Stage(canvas);
const store = new GameStore();
if (hostedDemo) store.setMode('demo');

const currentRoomAsset: AssetName = store.state.cosmetics.roomTheme === 'e_sunset'
  ? 'roomThemeSunset'
  : store.state.cosmetics.roomTheme === 'l_forest'
    ? 'roomThemeForest'
    : 'roomBg';
const currentGuideAsset: AssetName = store.state.settings.language === 'zh-CN'
  ? 'homeTokenGuideBoardZh'
  : 'homeTokenGuideBoardEn';
const HOME_CRITICAL: AssetName[] = [
  currentRoomAsset,
  'coinBank',
  'prizeWall',
  'collectionNeonShelf',
  'collectionPrizeLights',
  'collectionPedestal',
  'collectionCrownMarquee',
  'decorWallBoard',
  'decorFloorRiser',
  'decorBuddyRug',
  'cabinetSkins',
  'homeLevelCabinets',
  'levelUiKit',
  'homeLogo',
  'homePlayer',
  'homePlayerCard',
  currentGuideAsset,
  'homeSyncStates',
  'homeShopCard',
  'homeProjectRow',
  'homeIconBtn',
  'homeUtilityButtons',
  'coinHudPlaque',
  'tokenHudPlaque',
  'priceTagPlaque',
  'coinSocket',
  'shopCapsuleSingle',
  'shopCapsuleBundle',
];

const boot = document.getElementById('boot');
const bootProgress = document.getElementById('boot-progress');
const bootLabel = document.getElementById('boot-label');
function paintBoot(fraction: number): void {
  const pct = Math.max(0, Math.min(100, Math.round(fraction * 100)));
  if (bootProgress instanceof HTMLElement) bootProgress.style.width = pct + '%';
  if (bootLabel) {
    bootLabel.textContent = store.state.settings.language === 'zh-CN'
      ? `街机厅通电中... ${pct}%`
      : `POWERING UP ARCADE... ${pct}%`;
  }
}

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
  hostedDemo
    ? undefined
    : () => {
        // Settings -> real history retry always returns to the arcade room,
        // where an empty result can surface the same truthful decision panel.
        router.go('room');
        void roomScreen.tryLiveScanFromSettings();
      },
);

// Apply the persisted mute setting + frame-rate cap up front.
sound.setMuted(store.state.settings.muted);
stage.setFrameMode(store.state.settings.fps);

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

async function launch(): Promise<void> {
  // Seed the fictional hosted slot and decode the authored Home scene in
  // parallel. The boot curtain prevents the temporary procedural fallbacks
  // from flashing before the final room art is ready.
  await Promise.all([
    hostedDemo && store.state.projects.length === 0 ? store.sync() : Promise.resolve(),
    assets.waitFor(HOME_CRITICAL, paintBoot),
  ]);
  paintBoot(1);

  router.go('room');
  stage.start((ctx, dt, now) => {
    fx.update(dt);
    router.render(ctx, dt, now);
  });

  // Secondary rooms continue loading behind the now-complete Home screen.
  assets.load();
  requestAnimationFrame(() => {
    boot?.classList.add('ta-boot-ready');
    window.setTimeout(() => boot?.remove(), 260);
  });
}

void launch();

// Browsers require a user gesture before audio can start; resume on first tap.
window.addEventListener('pointerdown', () => sound.resume(), { once: true });

// Debug handle for the console.
(window as unknown as { arcade: unknown }).arcade = { store, router, stage, hostedDemo };
