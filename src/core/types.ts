/**
 * Shared domain contract for Token Arcade.
 *
 * Every layer (domain, content, data, state, render, screens) imports its
 * vocabulary from here. Keeping the types in one place is what lets the code
 * base be built as independent modules without drifting apart.
 */

// ---- collectibles & rarity ------------------------------------------------

export type RarityKey = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Rarity {
  key: RarityKey;
  label: string;
  /** Fill/text color for cards and prize-wall rows. */
  color: string;
  /** Glow color for neon/shadow. */
  glow: string;
  /** Relative draw weight for the capsule machine. */
  weight: number;
  /** Display order, 0 = rarest (top of the prize wall). */
  order: number;
}

export type CollectibleType = 'badge' | 'sign' | 'decor' | 'buddy' | 'frame' | 'trophy' | 'theme';

export interface Collectible {
  id: string;
  name: string;
  rarity: RarityKey;
  type: CollectibleType;
  /** Short game-tooltip flavor line, shown when hovering the cabinet slot. */
  description: string;
  /** Key into the sprite atlas (render/sprites). */
  sprite: string;
  /** Optional palette override applied when the sprite is drawn. */
  tint?: Record<string, string>;
}

// ---- usage / projects -----------------------------------------------------

export type Provider = 'claude' | 'codex' | 'gemini' | 'mixed' | string;

/** A project's *lifetime* token total as reported by a data source. */
export interface ProjectUsage {
  id: string;
  name: string;
  provider: Provider;
  tokens: number;
  /** The id this project had under the old lowercased-name scheme. Used once
   * to migrate a save's sync baseline after the server switched to path-hash
   * ids; never displayed. */
  legacyId?: string;
}

/** A project as tracked inside the game (adds derived game fields). */
export interface Project extends ProjectUsage {
  /** Cabinet level 1..50 derived from lifetime tokens. */
  level: number;
  /** Coins this project has generated (flavor: tokens / TOKENS_PER_COIN). */
  coins: number;
  /** Tokens gained in the most recent sync (for the cabinet detail screen). */
  lastGained?: number;
}

// ---- persistent game state ------------------------------------------------

/** The current save-blob version. The ONLY place this number is defined;
 * persistence migrations and freshState() both derive from it. */
export const SAVE_VERSION = 2;

export interface OwnedEntry {
  count: number;
  firstUnlocked: string; // ISO date
}

export interface GameStats {
  lifetimeTokens: number;
  coinsEarned: number;
  pulls: number;
  duplicates: number;
  syncs: number;
}

export type DataMode = 'live' | 'demo';

/** Whether the live-history slot has discovered usable local usage yet. This
 * is deliberately persisted so an empty first scan cannot silently turn into
 * a fictional arcade after a refresh. */
export type HistoryScanState = 'unscanned' | 'no-history' | 'live-history';

/** P1 cosmetics are identity choices, not another currency or inventory. The
 * base choices are always available and every non-base id must be owned before
 * it can be equipped. */
export type RoomThemeId = 'base' | 'e_sunset' | 'l_forest';
export type ProfileFrameId = 'base' | 'r_frame';

export interface EquippedCosmetics {
  roomTheme: RoomThemeId;
  profileFrame: ProfileFrameId;
}

export interface MockWorld {
  projects: ProjectUsage[];
}

/** UI language. Stable game IDs/keys are never localized — only display text. */
export type Locale = 'en' | 'zh-CN';

/** Render frame-rate cap. 'auto' runs the quiet 30fps baseline but bursts to
 * 60fps during interaction (scroll/drag/celebration); 30 and 60 are flat caps. */
export type FrameMode = 'auto' | 30 | 60;

export interface GameSettings {
  muted: boolean;
  language: Locale;
  fps: FrameMode;
  /** Custom player display name. Empty = fall back to the localized default. */
  playerName: string;
}

export interface GameState {
  version: typeof SAVE_VERSION;
  firstRunDone: boolean;
  mode: DataMode;
  historyScan: HistoryScanState;
  coins: number;
  tickets: number;
  shards: number;
  /** Sub-coin token remainder carried forward between syncs. */
  coinResidue: number;
  stats: GameStats;
  projects: Project[];
  /** Project id -> last-synced lifetime tokens; the diff basis that prevents
   * double-counting tokens across repeated syncs. */
  lastTotals: Record<string, number>;
  owned: Record<string, OwnedEntry>;
  achievements: Record<string, string>; // id -> ISO unlock date
  mockWorld: MockWorld | null;
  /** Equipped room/profile identity. Stored inside each mode slot, never in
   * the shared settings payload, so demo and live arcades cannot bleed into
   * one another. */
  cosmetics: EquippedCosmetics;
  settings: GameSettings;
}

// ---- results returned by store mutations ----------------------------------

export interface PerProjectSync {
  id: string;
  name: string;
  provider: Provider;
  gained: number;
  level: number;
  isNew: boolean;
  /** Set to the new level if this sync pushed the cabinet up a level. */
  leveledTo: number | null;
}

export interface SyncResult {
  source: string;
  newTokens: number;
  coinsMinted: number;
  residue: number;
  tickets: number;
  perProject: PerProjectSync[];
  /** Projects that gained one or more levels this sync. `stageTo` is the new
   * visual-stage name when the sync also promoted the cabinet to a new stage. */
  levelUps: { id: string; name: string; from: number; to: number; stageTo: string | null }[];
  newProjects: PerProjectSync[];
  achievements: Achievement[];
}

export interface PullOutcome {
  collectible: Collectible;
  isDup: boolean;
  count: number;
}

export type CollectionMilestoneId = 'neon-shelf' | 'prize-lights' | 'collector-pedestal' | 'crown-marquee';

/** A permanent visual upgrade derived from unique, valid collection entries. */
export interface CollectionMilestone {
  readonly id: CollectionMilestoneId;
  readonly tier: number;
  readonly threshold: number;
  readonly nameKey: string;
  readonly descKey: string;
}

export interface PullResult {
  cost: number;
  results: PullOutcome[];
  achievements: Achievement[];
  milestones: CollectionMilestone[];
}

export interface BuyResult extends PullOutcome {
  achievements: Achievement[];
  milestones: CollectionMilestone[];
}

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  sprite: string;
  check: (s: GameState) => boolean;
}

// ---- shop -----------------------------------------------------------------

export interface ShopItem {
  id: string;
  label: string;
  sub: string;
  cost: number;
  kind: 'capsule' | 'grant';
  /** capsule: number of pulls. */
  pulls?: number;
  /** grant: collectible type to hand out. */
  pick?: CollectibleType;
  sprite: string;
}

// ---- render contracts -----------------------------------------------------

export interface Sprite {
  /** Rows of the pixel map; each char is a palette key ('.' = transparent). */
  d: string[];
  /** Cached max row width (filled in by the atlas). */
  w?: number;
}

export interface TextOpts {
  align?: 'left' | 'center' | 'right';
  glow?: string | null;
  glowBlur?: number;
  shadow?: string;
}

export interface CabinetOpts {
  name: string;
  level: number;
  id?: string;
  /** 0..1 neon intensity (used to dim un-synced cabinets). */
  glow?: number;
  /** Whether the cabinet is powered on (synced). */
  on?: boolean;
  /** 0..1 progress toward the next level for the bottom bar. */
  progress?: number;
  skin?: CabinetSkin;
  scene?: string;
}

export interface CabinetSkin {
  neon: string;
  dark: string;
  mid: string;
  name: string;
}

/** A clickable region registered with the Stage during a frame. */
export interface Hotspot {
  x: number;
  y: number;
  w: number;
  h: number;
  onClick?: () => void;
  onHover?: (hovering: boolean) => void;
  cursor?: string;
  /** Identifier used to preserve hover state across frames. */
  id?: string;
}

export interface Point {
  x: number;
  y: number;
}
