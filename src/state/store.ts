/*
 * store.ts — the single source of truth for player progress.
 *
 * Owns persistence (via ./persistence) and every mutation: syncing tokens into
 * coins, pulling capsules, buying fixed prizes, and unlocking achievements.
 * Screens read `store.state` (exposed read-only) and call these methods; they
 * never mutate directly. The sync math itself lives in domain/sync as a pure
 * function — the store fetches totals, applies the computation, and saves.
 *
 * Save isolation: live and demo progress live in separate localStorage slots
 * (see ./persistence). A live save can never be polluted by demo coins: a
 * first empty scan persists a no-history decision state, and the player must
 * explicitly choose the separate demo slot before anything fictional is minted.
 */

import { CONFIG, playerLevelFor } from '../domain/economy';
import { computeSync } from '../domain/sync';
import { rollCapsule, pickGrant } from '../domain/capsule';
import {
  collectionMilestoneTier,
  crossedCollectionMilestones,
  earnedCollectionMilestones,
  MISSING_PRIZE_DUST_COST,
  missingCollectibles,
  nextCollectionMilestone as getNextCollectionMilestone,
  validOwnedCount,
} from '../domain/collection';
import type { NextCollectionMilestone } from '../domain/collection';
import { isP1CosmeticType, isProfileFrameId, isRoomThemeId } from '../domain/cosmetics';
import { sanitizeRoomDecorations } from '../domain/roomDecorations';
import { ACHIEVEMENTS, COLLECTIBLES } from '../content';
import { fetchLive } from '../data/liveSource';
import { seedMock, advanceMock } from '../data/mockSource';
import { loadState, saveState, clearState, loadMeta, saveMeta, peekLegacyMode, onExternalSaveChange } from './persistence';
import { detectLocale, setLocale } from '../i18n';
import { SAVE_VERSION } from '../core/types';
import type {
  GameState,
  ProjectUsage,
  Collectible,
  ShopItem,
  Achievement,
  SyncResult,
  PullResult,
  PullOutcome,
  BuyResult,
  DataMode,
  ProfileFrameId,
  RarityKey,
  RoomThemeId,
  GameSettings,
  MissingPrizeExchangeResult,
  RoomDecorationPlacement,
} from '../core/types';

function freshState(mode: DataMode, settings?: GameSettings): GameState {
  return {
    version: SAVE_VERSION,
    firstRunDone: false,
    mode,
    historyScan: 'unscanned',
    coins: 0,
    tickets: 0,
    shards: 0, // dust from duplicates
    coinResidue: 0, // sub-coin token remainder carried forward
    stats: { lifetimeTokens: 0, coinsEarned: 0, pulls: 0, duplicates: 0, syncs: 0 },
    projects: [], // { id, name, provider, tokens, coins, level }
    lastTotals: {}, // id -> last-synced lifetime tokens (diff basis)
    owned: {}, // collectibleId -> { count, firstUnlocked }
    achievements: {}, // id -> ISO date unlocked
    mockWorld: null,
    cosmetics: { roomTheme: 'base', profileFrame: 'base' },
    roomDecorations: null,
    settings: settings ? { ...settings } : { muted: false, language: detectLocale(), fps: 'auto', playerName: '' },
  };
}

/** Injectable seams, so tests never have to stub globals. */
export interface GameStoreOptions {
  /** Live usage fetcher; defaults to the real /api/usage client. */
  fetchLive?: typeof fetchLive;
}

export class GameStore {
  private _state: GameState;

  private readonly fetchLiveFn: typeof fetchLive;

  /** In-flight sync; concurrent callers share it instead of double-minting. */
  private syncInFlight: Promise<SyncResult> | null = null;

  constructor(opts: GameStoreOptions = {}) {
    this.fetchLiveFn = opts.fetchLive ?? fetchLive;
    const bootMode = loadMeta()?.lastMode ?? peekLegacyMode() ?? 'live';
    this._state = this.loadSlot(bootMode);
    // Point the i18n layer at the persisted (or freshly-defaulted) language.
    setLocale(this._state.settings.language);
    // Multi-tab: when ANOTHER tab writes our save slot, adopt its state so our
    // next save can't clobber that progress with a stale copy (last-writer-wins
    // on a stale read is how coins would get lost).
    onExternalSaveChange((mode) => {
      if (mode !== this._state.mode) return;
      this._state = this.loadSlot(mode);
      setLocale(this._state.settings.language);
    });
  }

  /** Player progress. Read-only outside the store: mutate via methods only. */
  get state(): Readonly<GameState> {
    return this._state;
  }

  // ---- persistence ------------------------------------------------------

  /** Load the save slot for `mode`, overlaying fresh defaults so saves written
   * before a field existed still get it (nested objects merged explicitly). */
  private loadSlot(mode: DataMode): GameState {
    const fresh = freshState(mode);
    const saved = loadState(mode);
    if (!saved) return fresh;
    const merged: GameState = {
      ...fresh,
      ...saved,
      stats: { ...fresh.stats, ...saved.stats },
      cosmetics: { ...fresh.cosmetics, ...(saved.cosmetics || {}) },
      settings: { ...fresh.settings, ...saved.settings },
    };
    merged.mode = mode; // the slot decides the mode, not the blob
    if (!merged.settings.language) merged.settings.language = detectLocale();
    if (!merged.settings.fps) merged.settings.fps = 'auto'; // saves predating the fps setting
    if (merged.settings.playerName == null) merged.settings.playerName = ''; // saves predating custom names
    if (!['unscanned', 'no-history', 'live-history'].includes(merged.historyScan)) merged.historyScan = 'unscanned';
    if (!isRoomThemeId(merged.cosmetics.roomTheme)) merged.cosmetics.roomTheme = 'base';
    if (!isProfileFrameId(merged.cosmetics.profileFrame)) merged.cosmetics.profileFrame = 'base';
    merged.roomDecorations = sanitizeRoomDecorations(merged.owned, saved.roomDecorations);
    return merged;
  }

  save(): void {
    saveState(this._state.mode, this._state);
    saveMeta({ lastMode: this._state.mode });
  }

  /** Switch UI language, update the i18n layer live, and persist. */
  setLanguage(language: GameState['settings']['language']): void {
    this._state.settings.language = language;
    setLocale(language);
    this.save();
  }

  /** Set the render frame-rate cap ('auto' | 30 | 60) and persist. Applying it
   * to the Stage is done by the caller (main.ts) since the store is UI-agnostic. */
  setFps(fps: GameState['settings']['fps']): void {
    this._state.settings.fps = fps;
    this.save();
  }

  /** The player's custom display name, or '' when unset (callers fall back to
   * the localized default). Lives in settings so it survives resets + slots. */
  playerName(): string {
    return this._state.settings.playerName || '';
  }

  /** Set (or clear, via empty string) the player's display name and persist.
   * Trimmed and length-capped so it always fits the card's nameplate. */
  setPlayerName(name: string): void {
    this._state.settings.playerName = name.trim().slice(0, 14);
    this.save();
  }

  /** Persist a custom room arrangement. Passing null restores the live
   * automatic layout that always showcases the newest prize in each family. */
  setRoomDecorations(placements: readonly RoomDecorationPlacement[] | null): void {
    this._state.roomDecorations = sanitizeRoomDecorations(this._state.owned, placements);
    this.save();
  }

  // ---- player level (flavor XP from coins earned) -----------------------

  playerLevel(): { level: number; into: number; need: number } {
    return playerLevelFor(this._state.stats.coinsEarned);
  }

  // ---- sync: tokens -> coins --------------------------------------------

  private advanceDemoWorld(): ProjectUsage[] {
    this._state.mockWorld = advanceMock(this._state.mockWorld || seedMock());
    return this._state.mockWorld.projects.map((p) => ({ ...p }));
  }

  private hasProgress(): boolean {
    const s = this._state;
    return s.stats.syncs > 0 || s.projects.length > 0 || s.coins > 0 || s.stats.lifetimeTokens > 0 || Object.keys(s.owned).length > 0;
  }

  private async getTotals(): Promise<{ source: string; projects: ProjectUsage[] }> {
    if (this._state.mode === 'demo') {
      return { source: 'demo', projects: this.advanceDemoWorld() };
    }
    const live = await this.fetchLiveFn();
    if (live.projects && live.projects.length) {
      this._state.historyScan = 'live-history';
      return { source: 'live', projects: live.projects };
    }
    if (this.hasProgress()) {
      // The scan came back empty but this save has real progress. Treat it as
      // a no-op sync — a transient failure must never switch a real save into
      // demo mode (that used to mint fake coins into live progress).
      return { source: 'live-empty', projects: [] };
    }
    // First run with no local history must remain truthful: persist the empty
    // result and let the room present the explicit demo-or-retry decision.
    // Crucially, this does not create mock projects or switch save slots.
    this._state.historyScan = 'no-history';
    this.save();
    return { source: 'no-history', projects: [] };
  }

  async sync(): Promise<SyncResult> {
    // Serialize: overlapping calls (double-click, impatient retry) share one
    // sync instead of racing the diff baselines.
    if (this.syncInFlight) return this.syncInFlight;
    this.syncInFlight = this.doSync().finally(() => {
      this.syncInFlight = null;
    });
    return this.syncInFlight;
  }

  private async doSync(): Promise<SyncResult> {
    const { source, projects: totals } = await this.getTotals();
    if (source === 'no-history') {
      return {
        source,
        newTokens: 0,
        coinsMinted: 0,
        residue: this._state.coinResidue,
        tickets: 0,
        perProject: [],
        levelUps: [],
        newProjects: [],
        achievements: [],
      };
    }
    const s = this._state;
    const c = computeSync({ projects: s.projects, lastTotals: s.lastTotals, coinResidue: s.coinResidue }, totals);

    s.projects = c.projects;
    s.lastTotals = c.lastTotals;
    s.coinResidue = c.coinResidue;
    s.coins += c.coinsMinted;
    s.tickets += c.ticketsAwarded;
    s.stats.coinsEarned += c.coinsMinted;
    s.stats.lifetimeTokens = c.lifetimeTokens;
    s.stats.syncs++;

    const newlyUnlocked = this.checkAchievements();
    s.firstRunDone = true;
    this.save();

    return {
      source,
      newTokens: c.newTokens,
      coinsMinted: c.coinsMinted,
      residue: c.coinResidue,
      tickets: c.ticketsAwarded,
      perProject: c.perProject,
      levelUps: c.levelUps,
      newProjects: c.perProject.filter((p) => p.isNew),
      achievements: newlyUnlocked,
    };
  }

  // ---- collectibles -----------------------------------------------------

  private addOwned(collectible: Collectible): boolean {
    const cur = this._state.owned[collectible.id];
    if (cur) {
      cur.count++;
      this._state.stats.duplicates++;
      this._state.shards += this.shardValue(collectible.rarity);
      return true; // duplicate
    }
    this._state.owned[collectible.id] = { count: 1, firstUnlocked: new Date().toISOString() };
    return false;
  }

  private shardValue(rarity: RarityKey): number {
    return { common: 1, uncommon: 2, rare: 3, epic: 5, legendary: 10 }[rarity] || 1;
  }

  // Pull the capsule machine `count` times. Assumes cost already checked by UI,
  // but re-checks here to stay authoritative.
  pull(count: number): PullResult | null {
    const cost = count === 10 ? CONFIG.PULL10_COST : CONFIG.PULL_COST * count;
    if (this._state.coins < cost) return null;
    const ownedBefore = this.ownedCount();
    this._state.coins -= cost;
    const results: PullOutcome[] = [];
    for (let i = 0; i < count; i++) {
      const c = rollCapsule();
      const isDup = this.addOwned(c);
      this._state.stats.pulls++;
      results.push({ collectible: c, isDup, count: this._state.owned[c.id].count });
    }
    const achievements = this.checkAchievements();
    const milestones = crossedCollectionMilestones(ownedBefore, this.ownedCount());
    this.save();
    return { cost, results, achievements, milestones };
  }

  buy(item: ShopItem): BuyResult | null {
    if (this._state.coins < item.cost) return null;
    if (item.kind === 'grant') {
      // Room themes and profile frames have a finite, useful P1 pool. Once it
      // is complete we refuse the transaction before coins move; a duplicate
      // would create no new identity and is therefore never a valid purchase.
      if (isP1CosmeticType(item.pick) && this.isGrantComplete(item)) return null;
      const ownedBefore = this.ownedCount();
      this._state.coins -= item.cost;
      // Grant items always carry a `pick` type in the shop catalog.
      const c = pickGrant(item.pick!, this._state.owned);
      const isDup = this.addOwned(c);
      const achievements = this.checkAchievements();
      const milestones = crossedCollectionMilestones(ownedBefore, this.ownedCount());
      this.save();
      return { collectible: c, isDup, count: this._state.owned[c.id].count, achievements, milestones };
    }
    return null;
  }

  exchangeMissingPrize(): MissingPrizeExchangeResult | null {
    if (this._state.shards < MISSING_PRIZE_DUST_COST) return null;
    const missing = missingCollectibles(this._state.owned);
    if (!missing.length) return null;

    const ownedBefore = this.ownedCount();
    const collectible = missing[Math.floor(Math.random() * missing.length)];
    this._state.shards -= MISSING_PRIZE_DUST_COST;
    this._state.owned[collectible.id] = { count: 1, firstUnlocked: new Date().toISOString() };
    const achievements = this.checkAchievements();
    const milestones = crossedCollectionMilestones(ownedBefore, this.ownedCount());
    this.save();
    return {
      collectible,
      cost: MISSING_PRIZE_DUST_COST,
      shardsRemaining: this._state.shards,
      achievements,
      milestones,
    };
  }

  checkAchievements(): Achievement[] {
    const unlocked: Achievement[] = [];
    for (const a of ACHIEVEMENTS) {
      if (!this._state.achievements[a.id] && a.check(this._state)) {
        this._state.achievements[a.id] = new Date().toISOString();
        unlocked.push(a);
      }
    }
    return unlocked;
  }

  // ---- misc -------------------------------------------------------------

  ownedCount(): number {
    return validOwnedCount(this._state.owned);
  }

  totalCollectibles(): number {
    return COLLECTIBLES.length;
  }

  /** Permanent collection-display upgrades currently earned by this slot. */
  collectionMilestones() {
    return earnedCollectionMilestones(this.ownedCount());
  }

  /** Highest permanent collection-display tier earned by this slot (0..4). */
  collectionMilestoneTier(): number {
    return collectionMilestoneTier(this.ownedCount());
  }

  /** The next permanent collection goal for the current slot. */
  nextCollectionMilestone(): NextCollectionMilestone | null {
    return getNextCollectionMilestone(this.ownedCount());
  }

  /** True when a cosmetic shop card has no unowned matching reward left. */
  isGrantComplete(item: ShopItem): boolean {
    if (item.kind !== 'grant' || !isP1CosmeticType(item.pick)) return false;
    return !COLLECTIBLES.some((c) => c.type === item.pick && !this._state.owned[c.id]);
  }

  /** Equip the selected P1 room. The base room is always free; a reward room
   * must have been genuinely unlocked in this mode's save slot. */
  equipRoomTheme(id: RoomThemeId): boolean {
    if (!isRoomThemeId(id) || (id !== 'base' && !this._state.owned[id])) return false;
    this._state.cosmetics.roomTheme = id;
    this.save();
    return true;
  }

  /** Equip the selected P1 profile frame under the same per-slot ownership
   * rule as room themes. */
  equipProfileFrame(id: ProfileFrameId): boolean {
    if (!isProfileFrameId(id) || (id !== 'base' && !this._state.owned[id])) return false;
    this._state.cosmetics.profileFrame = id;
    this.save();
    return true;
  }

  /** Begin an intentional fictional arcade. This is only called by the
   * no-history decision panel, never by a scan fallback. */
  async playDemoArcade(): Promise<SyncResult> {
    this.setMode('demo');
    return this.sync();
  }

  /** Return to the isolated live slot and immediately retry the local scan. */
  async tryLiveScan(): Promise<SyncResult> {
    this.setMode('live');
    return this.sync();
  }

  /** Switch between the live and demo save slots. The current slot is saved
   * first; settings (sound, language) carry across so they feel global. */
  setMode(mode: DataMode): void {
    if (mode === this._state.mode) return;
    const settings = this._state.settings;
    this.save();
    this._state = this.loadSlot(mode);
    this._state.settings = { ...settings };
    this.save();
  }

  toggleMute(): boolean {
    this._state.settings.muted = !this._state.settings.muted;
    this.save();
    return this._state.settings.muted;
  }

  /** Wipe the CURRENT mode's progress only. Settings carry over. */
  reset(): void {
    const { mode, settings } = this._state;
    clearState(mode);
    this._state = freshState(mode, settings);
    this.save();
  }
}
