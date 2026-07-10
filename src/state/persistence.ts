/*
 * persistence.ts — the only place the logic layers touch the DOM (localStorage).
 * Load/save/clear the versioned save blobs, swallowing every error so a corrupt
 * or unavailable store never breaks the game.
 *
 * Live and demo progress live in SEPARATE slots. The original sin this fixes:
 * one shared blob meant a demo fallback could mint fake coins into a real save.
 * Now `tokenArcade.slot.live` and `tokenArcade.slot.demo` never mix, and a tiny
 * meta record remembers which mode the player last used.
 *
 * Legacy migration: the old single-blob save (`tokenArcade.v1`) is moved into
 * the slot matching its own `mode` field the first time that slot is loaded.
 */

import { SAVE_VERSION } from '../core/types';
import type { DataMode, GameState } from '../core/types';
import { CONFIG, baseCoinsFor } from '../domain/economy';

/** Legacy single-blob key (pre-slot saves). Kept exported for tests. */
export const STORAGE_KEY = 'tokenArcade.v1';
export const SLOT_KEYS: Record<DataMode, string> = {
  live: 'tokenArcade.slot.live.v1',
  demo: 'tokenArcade.slot.demo.v1',
};
export const META_KEY = 'tokenArcade.meta.v1';
export { SAVE_VERSION };

export interface SaveMeta {
  /** Mode the player was in when the game last saved; the boot mode. */
  lastMode: DataMode;
}

/**
 * Economy V2 migration: v1 saves minted coins at 1,000 tokens/coin; v2 uses
 * 10,000. Recompute the coin balance (and total earned, for the player XP level)
 * from lifetime tokens at the new rate so old inflated balances don't persist.
 * Owned collectibles, projects, achievements, and other stats are preserved.
 */
function migrateV1toV2(s: GameState): GameState {
  const coins = Math.floor((s.stats?.lifetimeTokens || 0) / CONFIG.TOKENS_PER_COIN);
  return {
    ...s,
    version: SAVE_VERSION,
    coins,
    coinResidue: 0,
    stats: { ...s.stats, coinsEarned: coins },
  };
}

/**
 * Idempotent save repair for the per-project base-coin value. `Project.coins`
 * is a derived flavor value (`baseCoinsFor(tokens)`), but saves written before
 * the Economy V2 rate change (and even early V2 saves migrated by
 * `migrateV1toV2`, which only healed the GLOBAL balance) still carry each
 * project's coins at the retired 1,000-tokens/coin rate — so cabinets read
 * ~10x too high. Recompute every project's coins from its monotonic token total
 * on load, using the SAME rule as `computeSync`. This never touches the
 * spendable balance, coinsEarned, owned, achievements, tokens, ids, or diff
 * baselines. Safe on empty/missing/malformed project lists; a no-op for saves
 * that are already correct (so repeated loads never change a good save).
 */
function repairProjectCoins(s: GameState): GameState {
  const projects = (s as { projects?: unknown }).projects;
  if (!Array.isArray(projects)) return s;
  for (const p of projects) {
    if (p && typeof p === 'object') {
      const proj = p as { tokens?: number; coins?: number };
      proj.coins = baseCoinsFor(proj.tokens);
    }
  }
  return s;
}

function parseBlob(raw: string | null): GameState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as (GameState & { version?: number }) | null;
    if (!parsed || typeof parsed.version !== 'number') return null;
    // Resolve to the current version, then run the idempotent per-project coin
    // repair on EVERY load (V1-migrated AND native V2) so stale 10x cabinet
    // values are healed without a further version bump.
    if (parsed.version === SAVE_VERSION) return repairProjectCoins(parsed);
    if (parsed.version === 1) return repairProjectCoins(migrateV1toV2(parsed));
    // Unknown/newer version -> start fresh rather than trust it.
    return null;
  } catch {
    return null;
  }
}

function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Which mode a pre-slot legacy save was in, or null if there is none. */
export function peekLegacyMode(): DataMode | null {
  const legacy = parseBlob(getItem(STORAGE_KEY));
  return legacy ? (legacy.mode === 'demo' ? 'demo' : 'live') : null;
}

/**
 * Load the save slot for `mode`. If the slot is empty but the legacy
 * single-blob save exists AND belonged to this mode, it is migrated in (moved,
 * so it can only ever seed one slot).
 */
export function loadState(mode: DataMode): GameState | null {
  const slot = parseBlob(getItem(SLOT_KEYS[mode]));
  if (slot) return slot;
  const legacy = parseBlob(getItem(STORAGE_KEY));
  if (legacy && (legacy.mode === 'demo' ? 'demo' : 'live') === mode) {
    saveState(mode, legacy);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    return legacy;
  }
  return null;
}

export function saveState(mode: DataMode, state: GameState): void {
  try {
    localStorage.setItem(SLOT_KEYS[mode], JSON.stringify(state));
  } catch {
    // quota exceeded or storage unavailable -> ignore
  }
}

export function clearState(mode: DataMode): void {
  try {
    localStorage.removeItem(SLOT_KEYS[mode]);
  } catch {
    // ignore
  }
}

export function loadMeta(): SaveMeta | null {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SaveMeta | null;
    if (!parsed || (parsed.lastMode !== 'live' && parsed.lastMode !== 'demo')) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveMeta(meta: SaveMeta): void {
  try {
    localStorage.setItem(META_KEY, JSON.stringify(meta));
  } catch {
    // ignore
  }
}

/**
 * Subscribe to save-slot writes made by OTHER tabs. The browser fires
 * `storage` only in tabs that did not perform the write, so this is exactly
 * the "someone else changed my save" signal. `cb` receives the mode whose
 * slot changed. No-op outside a browser (unit tests, SSR).
 */
export function onExternalSaveChange(cb: (mode: DataMode) => void): void {
  if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') return;
  window.addEventListener('storage', (e: StorageEvent) => {
    if (e.key === SLOT_KEYS.live) cb('live');
    else if (e.key === SLOT_KEYS.demo) cb('demo');
  });
}
