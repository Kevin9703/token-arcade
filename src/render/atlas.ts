/*
 * atlas.ts — every hand-measured crop rectangle and art-variant table for the
 * generated sprite sheets, in ONE place. When a sheet is regenerated, re-measure
 * and update here; screens never carry their own magic sx/sy numbers.
 *
 * (Anchors produced automatically by scripts/measure-assets.mjs live in
 * ./measured.ts, which is generated. This file is the hand-measured
 * counterpart.)
 */

import { assets } from './assets';
import { hashStr } from './cabinet';
import type { AssetName, CropRect } from './assets';
import type { RarityKey } from '../core/types';

// ---------------------------------------------------------------------------
// cabinet-skins.png (2032x774) — the five small home-cabinet skins
// ---------------------------------------------------------------------------

// Bounding boxes measured from the alpha channel. Order matches the sheet:
// lab, shop, sidequest, deploy, trophy.
export const CABINET_CROPS: CropRect[] = [
  { sx: 83, sy: 108, sw: 316, sh: 563 },
  { sx: 469, sy: 109, sw: 320, sh: 562 },
  { sx: 856, sy: 109, sw: 318, sh: 562 },
  { sx: 1231, sy: 109, sw: 347, sh: 562 },
  { sx: 1625, sy: 108, sw: 325, sh: 563 },
];

// Neon accent per cabinet skin, aligned with CABINET_CROPS: lab (blue), shop
// (orange), sidequest (purple), deploy (teal), trophy (gold). Used to tint the
// per-project power meter so each row reads as its own machine.
export const CABINET_ACCENTS = ['#5fb4ff', '#ff9a3c', '#b98cff', '#5fe6d6', '#ffd23f'];

/** Stable cabinet-skin index (0..4) for a project id. */
export function cabinetSkinIndex(id: string): number {
  return hashStr(id) % CABINET_CROPS.length;
}

/** Stable cabinet-skin crop for a project id. */
export function cabinetCropFor(id: string): CropRect {
  return CABINET_CROPS[cabinetSkinIndex(id)];
}

/** Neon accent color for a project's cabinet skin. */
export function cabinetAccentFor(id: string): string {
  return CABINET_ACCENTS[cabinetSkinIndex(id)];
}

// ---------------------------------------------------------------------------
// cabinet-stage-N.png — the five large project-detail cabinet variants
// ---------------------------------------------------------------------------

/** A blank window inside a cabinet PNG (fraction of the drawn cabinet rect). */
export interface CabWindow {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** A large project-detail cabinet variant: which recolored PNG to draw, the
 * matching neon accent for code overlays, and the measured marquee/monitor/
 * power-slot windows (they differ between the white cabinet and the rest). */
export interface CabinetVariant {
  key: 'white' | 'blue' | 'magenta' | 'purple' | 'amber';
  asset: AssetName;
  accent: string;
  glow: string;
  marquee: CabWindow;
  screen: CabWindow;
  power: CabWindow;
}

// Window anchors (fraction of the drawn cabinet rect) for the code overlays —
// PER VISUAL STAGE. The five cabinets do NOT share an internal layout: the crown
// + wings on the later stages push the marquee band, monitor screen, and control
// LED strip progressively downward, so a single shared window set drifts (on
// Stage 5 the old fixed marquee sat on the crown gem and the power fill landed on
// the controls — PM QA 2026-07-09). These were measured from each PNG's recessed
// dark bands by scripts/measure-cabinets.mjs. `marquee`/`screen` place the name +
// level readout; `power` is retained for completeness (the code power fill was
// removed, see cabinetScreen.drawBigCabinet).
const CAB_WINDOWS: Record<CabinetVariant['key'], { marquee: CabWindow; screen: CabWindow; power: CabWindow }> = {
  white: {
    marquee: { x: 0.075, y: 0.142, w: 0.901, h: 0.056 },
    screen: { x: 0.099, y: 0.194, w: 0.853, h: 0.303 },
    power: { x: 0.089, y: 0.502, w: 0.874, h: 0.023 },
  },
  blue: {
    marquee: { x: 0.033, y: 0.157, w: 0.895, h: 0.056 },
    screen: { x: 0.043, y: 0.207, w: 0.875, h: 0.302 },
    power: { x: 0.036, y: 0.514, w: 0.895, h: 0.021 },
  },
  magenta: {
    marquee: { x: 0.051, y: 0.206, w: 0.878, h: 0.056 },
    screen: { x: 0.064, y: 0.254, w: 0.849, h: 0.284 },
    power: { x: 0.048, y: 0.543, w: 0.878, h: 0.02 },
  },
  purple: {
    marquee: { x: 0.046, y: 0.211, w: 0.902, h: 0.056 },
    screen: { x: 0.08, y: 0.263, w: 0.834, h: 0.276 },
    power: { x: 0.064, y: 0.543, w: 0.865, h: 0.02 },
  },
  amber: {
    marquee: { x: 0.071, y: 0.249, w: 0.858, h: 0.056 },
    screen: { x: 0.111, y: 0.301, w: 0.776, h: 0.26 },
    power: { x: 0.108, y: 0.563, w: 0.789, h: 0.019 },
  },
};

// One cabinet variant per VISUAL STAGE (0..4), per docs/PROJECT_LEVEL_SYSTEM.md:
//   1 Starter, 2 Powered, 3 Deluxe, 4 Neon, 5 Legendary. Each is Codex's final
//   pre-cropped transparent single PNG (cabinet-stage-N.png) — drawn whole, NOT
//   sliced from a sheet, and NOT composited with separate topper/badge art (the
//   crown/wings are baked into the sprite). `accent`/`glow` tint the code-drawn
//   name + level overlays to match the stage color.
export const STAGE_CABINETS: CabinetVariant[] = [
  { key: 'white', asset: 'projCabStage1', accent: '#e8ecf5', glow: '#aab6cf', ...CAB_WINDOWS.white },
  { key: 'blue', asset: 'projCabStage2', accent: '#5fb4ff', glow: '#4aa3ff', ...CAB_WINDOWS.blue },
  { key: 'magenta', asset: 'projCabStage3', accent: '#e15ad8', glow: '#c23cc0', ...CAB_WINDOWS.magenta },
  { key: 'purple', asset: 'projCabStage4', accent: '#b98cff', glow: '#9a6cff', ...CAB_WINDOWS.purple },
  { key: 'amber', asset: 'projCabStage5', accent: '#ff9a3c', glow: '#ff7a1a', ...CAB_WINDOWS.amber },
];

/** Detail-cabinet variant for a visual stage index (0..4). */
export function stageCabinet(stageIndex: number): CabinetVariant {
  const i = Math.max(0, Math.min(STAGE_CABINETS.length - 1, stageIndex | 0));
  return STAGE_CABINETS[i];
}

/** Neon accent color per visual stage (0..4) — used for code overlays. */
export function stageAccent(stageIndex: number): string {
  return stageCabinet(stageIndex).accent;
}

// ---------------------------------------------------------------------------
// home-level-cabinets.png (1774x887) — level-staged home cabinet bodies
// ---------------------------------------------------------------------------

// One per visual stage in order (starter white-silver .. legendary amber-gold).
// Alpha-bounded per column from the redrawn v5 sheet — do NOT reuse the older
// v1 crops.
export const HOME_LEVEL_CABINET_CROPS: CropRect[] = [
  { sx: 35, sy: 141, sw: 299, sh: 637 },
  { sx: 392, sy: 141, sw: 307, sh: 636 },
  { sx: 746, sy: 141, sw: 304, sh: 636 },
  { sx: 1079, sy: 102, sw: 336, sh: 676 },
  { sx: 1426, sy: 102, sw: 315, sh: 676 },
];

/** Home cabinet body crop for a visual stage index (0..4). */
export function homeLevelCabinetCrop(stageIndex: number): CropRect {
  const i = Math.max(0, Math.min(HOME_LEVEL_CABINET_CROPS.length - 1, stageIndex | 0));
  return HOME_LEVEL_CABINET_CROPS[i];
}

// project-level-ui-kit.png (1708x921): 5 columns (one per stage) x 4 rows.
// Row 0 = topper (its FRONT-STRIP bulbs count the stage: 1..5), 1 = stage badge,
// 2 = progress endcap (also 1..5 lights), 3 = level-up sparkle. Measured from the
// redrawn v6 sheet by splitting each column at its transparent gaps — the topper
// crop MUST reach the bottom bulb row, so we use the full alpha band (the doc's
// shorter reference crop clips the stage bulbs). Index [row][stageIndex].
export const LEVEL_UIKIT_CROPS: CropRect[][] = [
  [
    { sx: 42, sy: 69, sw: 289, sh: 180 },
    { sx: 389, sy: 71, sw: 281, sh: 178 },
    { sx: 711, sy: 68, sw: 284, sh: 181 },
    { sx: 1036, sy: 46, sw: 330, sh: 203 },
    { sx: 1366, sy: 43, sw: 299, sh: 206 },
  ],
  [
    { sx: 77, sy: 286, sw: 215, sh: 230 },
    { sx: 411, sy: 293, sw: 233, sh: 226 },
    { sx: 727, sy: 279, sw: 246, sh: 255 },
    { sx: 1054, sy: 272, sw: 267, sh: 277 },
    { sx: 1381, sy: 279, sw: 281, sh: 266 },
  ],
  [
    { sx: 41, sy: 566, sw: 277, sh: 99 },
    { sx: 384, sy: 567, sw: 275, sh: 98 },
    { sx: 711, sy: 567, sw: 276, sh: 98 },
    { sx: 1036, sy: 567, sw: 285, sh: 98 },
    { sx: 1372, sy: 570, sw: 279, sh: 93 },
  ],
  [
    { sx: 82, sy: 708, sw: 184, sh: 150 },
    { sx: 422, sy: 712, sw: 193, sh: 146 },
    { sx: 761, sy: 715, sw: 185, sh: 145 },
    { sx: 1078, sy: 714, sw: 185, sh: 148 },
    { sx: 1419, sy: 714, sw: 183, sh: 142 },
  ],
];

// Measured screen-window center (fraction of the home cabinet crop) per stage.
// The redrawn v5 sprites are all well-centered (~0.50); measured from alpha.
export const HOME_CABINET_SCREEN: { cx: number; cy: number }[] = [
  { cx: 0.5, cy: 0.364 },
  { cx: 0.5, cy: 0.364 },
  { cx: 0.502, cy: 0.364 },
  { cx: 0.512, cy: 0.364 },
  { cx: 0.498, cy: 0.364 },
];

/** Home cabinet screen-window center (fraction of crop) for a stage index. */
export function homeCabinetScreen(stageIndex: number): { cx: number; cy: number } {
  const i = Math.max(0, Math.min(HOME_CABINET_SCREEN.length - 1, stageIndex | 0));
  return HOME_CABINET_SCREEN[i];
}

function uiKitCrop(row: number, stageIndex: number): CropRect {
  const s = Math.max(0, Math.min(4, stageIndex | 0));
  return LEVEL_UIKIT_CROPS[row][s];
}
/** UI-kit crops for a visual stage index (0..4). */
export const uiKitTopper = (stage: number): CropRect => uiKitCrop(0, stage);
export const uiKitBadge = (stage: number): CropRect => uiKitCrop(1, stage);
export const uiKitEndcap = (stage: number): CropRect => uiKitCrop(2, stage);
export const uiKitSparkle = (stage: number): CropRect => uiKitCrop(3, stage);

// ---------------------------------------------------------------------------
// home-ui sheets — player character + sync button states
// ---------------------------------------------------------------------------

// player-character-v1-trimmed.png (1562x797) holds three figures, measured from
// the alpha channel: [0] front full-body, [1] side full-body w/ token jar, and
// [2] a head+shoulders bust. The bust is the player-card portrait; the front
// full-body stands beside the coin bank.
export const PLAYER_PORTRAIT_CROP: CropRect = { sx: 1065, sy: 128, sw: 478, sh: 532 };
export const PLAYER_BODY_CROP: CropRect = { sx: 18, sy: 22, sw: 356, sh: 751 };

// sync-button-states-v2-trimmed.png (2009x557): default | hover | pressed, all
// sy:0 sh:557. Pressed (dim) reads as the in-flight "SYNCING" state.
export const SYNC_STATE_CROPS: { default: CropRect; hover: CropRect; pressed: CropRect } = {
  default: { sx: 18, sy: 0, sw: 580, sh: 557 },
  hover: { sx: 723, sy: 0, sw: 567, sh: 557 },
  pressed: { sx: 1409, sy: 0, sw: 582, sh: 557 },
};

// Neon-title flicker frames (all 1567x712). Their VISIBLE art fills the shared
// canvas by slightly different amounts — the steady frame reaches ~1-2% wider
// than the dropout/burst frames — so drawing all three into one nominal rect
// makes the sign appear to shrink when it flickers. These are the measured
// alpha bounds (scripts/measure-logo.mjs, fractions of the png); the screen maps
// each frame's bbox onto the SAME on-screen box so the sign never changes size.
export type LogoFrameKey = 'homeLogo' | 'homeLogoDropout' | 'homeLogoBurst';
export const LOGO_FRAME_ALPHA: Record<LogoFrameKey, { x0: number; y0: number; x1: number; y1: number }> = {
  homeLogo: { x0: 0.0115, y0: 0.0253, x1: 0.9872, y1: 0.9733 },
  homeLogoDropout: { x0: 0.0217, y0: 0.0309, x1: 0.9764, y1: 0.9677 },
  homeLogoBurst: { x0: 0.0217, y0: 0.0309, x1: 0.977, y1: 0.9677 },
};

// ---------------------------------------------------------------------------
// reveal-card frames — per-rarity single PNGs
// ---------------------------------------------------------------------------

// Codex's final per-rarity transparent single PNGs (no sheet slicing, no code
// recolor). One asset per RARITY_ORDER index:
//   0 legendary (gold), 1 epic (purple), 2 rare (blue), 3 uncommon (GREEN),
//   4 common (silver). Uncommon is a real green frame from the new art.
const REVEAL_FRAME_ASSETS: AssetName[] = [
  'revealFrameLegendary',
  'revealFrameEpic',
  'revealFrameRare',
  'revealFrameUncommon',
  'revealFrameCommon',
];

/** The reveal-frame single-PNG image for a rarity (by RARITY_ORDER index), or
 * null while it's still loading. Pick by rarity only — never tint/recolor. */
export function revealFrameImage(rarityOrderIndex: number): HTMLImageElement | null {
  const i = Math.max(0, Math.min(REVEAL_FRAME_ASSETS.length - 1, rarityOrderIndex | 0));
  return assets.get(REVEAL_FRAME_ASSETS[i]);
}

// ---------------------------------------------------------------------------
// HUD + achievement-showcase item PNGs — id→asset maps and measured content
// windows (all fractions of the FULL png, which is drawn whole into a dest
// rect; dynamic text/icons then sit at dst.x + frac*dst.w). Measured with
// scripts/measure-frames.mjs + visual check — never recolor the art.
// ---------------------------------------------------------------------------

/** Generated icon asset for an achievement id (see docs PM mapping). */
export function achIconAsset(id: string): AssetName {
  const map: Record<string, AssetName> = {
    first_coin: 'achFirstCoin',
    warm_machine: 'achWarmMachine',
    neon_night: 'achNeonNight',
    million: 'achMillion',
    royalty: 'achRoyalty',
    first_pull: 'achFirstPull',
    wall_starter: 'achWallStarter',
    dupe_luck: 'achDupeLuck',
    legendary_drop: 'achLegendaryDrop',
  };
  return map[id] ?? 'achFirstCoin';
}

/** Stat-tile key used by the project-detail stats board. */
export type StatTileKey =
  | 'tokensSync'
  | 'lifetimeTokens'
  | 'coinsMinted'
  | 'cabinetLevel'
  | 'provider'
  | 'coinPower'
  | 'recentToken'
  | 'recentCoin';

/** Generated stat-tile icon asset for a stat key. */
export function statTileAsset(key: StatTileKey): AssetName {
  const map: Record<StatTileKey, AssetName> = {
    tokensSync: 'statTokensSync',
    lifetimeTokens: 'statLifetimeTokens',
    coinsMinted: 'statCoinsMinted',
    cabinetLevel: 'statCabinetLevel',
    provider: 'statProvider',
    coinPower: 'statCoinPower',
    recentToken: 'statRecentToken',
    recentCoin: 'statRecentCoin',
  };
  return map[key];
}

/** A content window inside a frame png (fractions of the full png). */
export interface FrameWindow {
  cx: number;
  cy: number;
  w: number;
  h: number;
}

/** Measured content anchors for the new frame assets. Draw the png whole into a
 * dest rect, then place text/icons using these fractions. */
export const FRAME_ANCHORS = {
  // coin_hud_plaque / token_hud_plaque (698x215): baked coin/token medallion on
  // the LEFT; the number sits in the dark recessed window to its right.
  hudPlaque: { aspect: 698 / 215, textWin: { cx: 0.62, cy: 0.52, w: 0.6, h: 0.52 } as FrameWindow },
  // price_tag_plaque (377x165): baked coin left, price in the window to its right.
  priceTag: { aspect: 377 / 165, textWin: { cx: 0.63, cy: 0.5, w: 0.56, h: 0.6 } as FrameWindow },
  // title_plaque (766x430): title text centered in the dark banner window.
  titlePlaque: { aspect: 766 / 430, textWin: { cx: 0.5, cy: 0.52, w: 0.9, h: 0.4 } as FrameWindow },
  // progress_plaque (520x131): unlocked count centered in the thin window.
  progressPlaque: { aspect: 520 / 131, textWin: { cx: 0.5, cy: 0.4, w: 0.86, h: 0.5 } as FrameWindow },
  // back_button (185x119): cyan arrow baked left; optional label in right window.
  backButton: { aspect: 185 / 119, textWin: { cx: 0.64, cy: 0.5, w: 0.5, h: 0.6 } as FrameWindow },
  // reward_ticket_frame (326x197): icon + label inside the central window.
  rewardTicket: { aspect: 326 / 197, win: { cx: 0.5, cy: 0.5, w: 0.62, h: 0.82 } as FrameWindow },
  // card_unlocked (283x450): star topper (top ~16%), inner display window, coin
  // medallion (bottom ~18%). Icon/name/desc/date sit inside the window.
  cardUnlocked: {
    aspect: 283 / 450,
    win: { cx: 0.5, cy: 0.49, w: 0.8, h: 0.62 } as FrameWindow,
    icon: { cx: 0.5, cy: 0.34 },
    name: { cx: 0.5, cy: 0.55 },
    desc: { cx: 0.5, cy: 0.64 },
    date: { cx: 0.5, cy: 0.75 },
  },
  // card_locked (288x447): gem topper, inner window, baked padlock at bottom.
  cardLocked: {
    aspect: 288 / 447,
    win: { cx: 0.5, cy: 0.49, w: 0.8, h: 0.62 } as FrameWindow,
    icon: { cx: 0.5, cy: 0.36 },
    name: { cx: 0.5, cy: 0.58 },
    locked: { cx: 0.5, cy: 0.72 },
  },
} as const;

// ---------------------------------------------------------------------------
// home-utility-buttons-sheet-v2.png (1536x1024) — 4 columns x 3 rows.
//   columns: 0 sound-on, 1 muted, 2 settings, 3 help
//   rows:    0 normal,   1 hover,  2 pressed
// The buttons sit on a uniform grid, so each cell is drawn WHOLE into the same
// on-screen box; using the fixed grid cell as the crop (not each state's opaque
// bbox, which bleeds glow across cells) keeps hover/pressed from shifting size.
// ---------------------------------------------------------------------------

const UTIL_COLS = 4;
const UTIL_ROWS = 3;
const UTIL_CELL_W = 1536 / UTIL_COLS; // 384
const UTIL_CELL_H = 1024 / UTIL_ROWS; // ~341.33

export type UtilButtonKey = 'soundOn' | 'muted' | 'settings' | 'help';
export type UtilButtonState = 'normal' | 'hover' | 'pressed';
const UTIL_COL: Record<UtilButtonKey, number> = { soundOn: 0, muted: 1, settings: 2, help: 3 };
const UTIL_ROW: Record<UtilButtonState, number> = { normal: 0, hover: 1, pressed: 2 };

/** Fixed grid crop for a utility button (column) in a given state (row). */
export function utilityButtonCrop(key: UtilButtonKey, state: UtilButtonState): CropRect {
  return {
    sx: UTIL_COL[key] * UTIL_CELL_W,
    sy: UTIL_ROW[state] * UTIL_CELL_H,
    sw: UTIL_CELL_W,
    sh: UTIL_CELL_H,
  };
}

// ---------------------------------------------------------------------------
// Capsule result-feed rows.
//   capsule-result-item-rows-v2.png (972x1618): stacked rows — 0 common,
//     1 uncommon, 2 rare, 3 epic (rows 4/5 are a damaged gold row, NOT used).
//   capsule-result-item-row-legendary-v1.png (834x195): the correct gold row,
//     cut from a green source so its gold border/glow is intact.
// Each row frame has three recessed wells: left icon, center name, right chip.
// Crops + well anchors measured by scripts/measure-rowbands.mjs + measure-qa.mjs.
// ---------------------------------------------------------------------------

/** Well anchors inside a drawn result row (fractions of the drawn row rect). */
export interface ResultRowWells {
  icon: number; // left well center x
  name: number; // center well center x
  chip: number; // right well center x
  nameW: number; // center well width (for name auto-fit)
  cy: number; // vertical center of the content band
}

interface ResultRowArt {
  asset: AssetName;
  crop: CropRect;
  wells: ResultRowWells;
}

// v2 non-legendary rows share one internal layout; legendary has its own.
const V2_WELLS: ResultRowWells = { icon: 0.168, name: 0.502, chip: 0.832, nameW: 0.47, cy: 0.5 };
const LEG_WELLS: ResultRowWells = { icon: 0.118, name: 0.503, chip: 0.879, nameW: 0.5, cy: 0.5 };

const V2_ROW_CROPS: Record<Exclude<RarityKey, 'legendary'>, CropRect> = {
  common: { sx: 0, sy: 126, sw: 972, sh: 202 },
  uncommon: { sx: 0, sy: 407, sw: 972, sh: 203 },
  rare: { sx: 0, sy: 690, sw: 972, sh: 203 },
  epic: { sx: 0, sy: 971, sw: 972, sh: 202 },
};

/** The row frame art + crop + well anchors for a rarity. Legendary uses the
 * separate gold asset; the others slice the v2 sheet (never the gold row). */
export function resultRowArt(rarity: RarityKey): ResultRowArt {
  if (rarity === 'legendary') {
    return { asset: 'capsuleResultRowLegendary', crop: { sx: 4, sy: 4, sw: 825, sh: 186 }, wells: LEG_WELLS };
  }
  return { asset: 'capsuleResultRows', crop: V2_ROW_CROPS[rarity], wells: V2_WELLS };
}
