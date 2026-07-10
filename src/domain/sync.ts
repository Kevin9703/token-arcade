/*
 * sync.ts — the sync transaction as pure game math. No state, no DOM, no I/O:
 * given the current progress slice and a batch of reported lifetime totals,
 * compute the next progress slice plus everything the UI needs to celebrate
 * (per-project gains, level-ups, coins minted). The store applies the result;
 * this module never mutates its inputs.
 *
 * Rules pinned here (and by test/domain/sync.test.ts + test/state/store.test.ts):
 *
 * - Anti-double-count: coins mint only on max(0, reported - lastSeen) per
 *   project. Re-syncing identical totals mints zero.
 * - Monotonic progress: a cabinet's tokens/level/coins never go DOWN. If the
 *   user prunes old history files the reported total can shrink; the cabinet
 *   keeps its high-water mark, and the diff baseline tracks the raw reported
 *   value so future gains still count from the new, lower total.
 * - Legacy id migration: when a data source renames a project's id (the server
 *   moved from lowercased-basename ids to path-hash ids), `legacyId` carries
 *   the old key. The project and its diff baseline are renamed in place, so no
 *   tokens are ever re-counted as new.
 * - Level multiplier: gains mint at the level the tokens were EARNED at (the
 *   pre-sync level); brand-new projects mint at the base rate.
 * - Sub-coin residue carries forward so small sessions still build a coin.
 */

import { CONFIG, tokensToCoins, baseCoinsFor } from './economy';
import { levelFor, coinMultiplier, stageForLevel } from './levels';
import type { PerProjectSync, Project, ProjectUsage, SyncResult } from '../core/types';

/** The slice of GameState that sync reads and replaces. */
export interface SyncSlice {
  projects: Project[];
  /** Project id -> last-synced RAW reported total (the diff basis). */
  lastTotals: Record<string, number>;
  /** Sub-coin token remainder carried in from previous syncs. */
  coinResidue: number;
}

/** A computed sync: the next slice plus the celebration payload. */
export interface SyncComputation {
  /** Replacement projects array, sorted by tokens descending. */
  projects: Project[];
  /** Replacement diff baselines (stale/renamed keys pruned). */
  lastTotals: Record<string, number>;
  coinResidue: number;
  coinsMinted: number;
  ticketsAwarded: number;
  /** Raw (pre-multiplier) newly-discovered tokens across all projects. */
  newTokens: number;
  /** Sum of every cabinet's (monotonic) lifetime tokens. */
  lifetimeTokens: number;
  perProject: PerProjectSync[];
  levelUps: SyncResult['levelUps'];
}

export function computeSync(slice: SyncSlice, totals: ProjectUsage[]): SyncComputation {
  // Work on copies; the caller decides when (and whether) to apply.
  const projects: Project[] = slice.projects.map((p) => ({ ...p }));
  const lastTotals: Record<string, number> = { ...slice.lastTotals };
  const byId = new Map<string, Project>(projects.map((p) => [p.id, p]));

  const perProject: PerProjectSync[] = [];
  const levelUps: SyncComputation['levelUps'] = [];
  let newTokensTotal = 0;
  // Multiplier-adjusted new tokens: higher-level cabinets mint coins a little
  // better on FUTURE gains. The residue pool is fed by this effective total.
  let effectiveNewTotal = 0;

  for (const t of totals) {
    // Rename-in-place when the source carries this project's previous id, so
    // its diff baseline and cabinet progress survive the id scheme change.
    if (t.legacyId && t.legacyId !== t.id && !(t.id in lastTotals) && t.legacyId in lastTotals) {
      lastTotals[t.id] = lastTotals[t.legacyId];
      delete lastTotals[t.legacyId];
      const legacyProj = byId.get(t.legacyId);
      if (legacyProj && !byId.has(t.id)) {
        legacyProj.id = t.id;
        byId.delete(t.legacyId);
        byId.set(t.id, legacyProj);
      }
    }

    const prevTotal = lastTotals[t.id] || 0;
    const gained = Math.max(0, t.tokens - prevTotal);
    const existing = byId.get(t.id);
    const oldLevel = existing ? existing.level : 0;

    // Monotonic lifetime tokens: never let a cabinet shrink because history
    // files were pruned. Level and flavor coins derive from the high-water mark.
    const mono = Math.max(existing ? existing.tokens : 0, t.tokens);
    const newLevel = levelFor(mono);

    const proj: Project = existing || { id: t.id, name: t.name, provider: t.provider, tokens: mono, level: newLevel, coins: 0 };
    proj.name = t.name;
    proj.provider = t.provider;
    proj.tokens = mono;
    proj.level = newLevel;
    proj.coins = baseCoinsFor(mono); // flat base-coins flavor value; see economy.baseCoinsFor
    proj.lastGained = gained; // surfaced on the cabinet detail screen
    if (!existing) {
      projects.push(proj);
      byId.set(t.id, proj);
    }
    lastTotals[t.id] = t.tokens; // RAW reported value, not the monotonic one

    if (gained > 0 || !existing) {
      perProject.push({
        id: t.id,
        name: t.name,
        provider: t.provider,
        gained,
        level: newLevel,
        isNew: !existing,
        leveledTo: newLevel > oldLevel && oldLevel > 0 ? newLevel : null,
      });
    }
    if (newLevel > oldLevel && oldLevel > 0) {
      const oldStage = stageForLevel(oldLevel);
      const newStage = stageForLevel(newLevel);
      levelUps.push({
        id: t.id,
        name: t.name,
        from: oldLevel,
        to: newLevel,
        stageTo: newStage.index > oldStage.index ? newStage.name : null,
      });
    }
    newTokensTotal += gained;
    // Coins mint at the level the tokens were earned at (pre-sync level). New
    // projects earn at the base rate (no retro bonus on first discovery).
    // Rounded per project so the sub-coin residue stays a whole number.
    const multLevel = oldLevel > 0 ? oldLevel : 1;
    effectiveNewTotal += Math.round(gained * coinMultiplier(multLevel));
  }

  // Drop baselines that no longer belong to any tracked project (renamed
  // legacy keys, projects whose history vanished AND were never tracked).
  for (const id of Object.keys(lastTotals)) {
    if (!byId.has(id)) delete lastTotals[id];
  }

  // Convert the multiplier-adjusted batch of new tokens, carrying sub-coin
  // residue. Unchanged totals -> effectiveNewTotal 0 -> 0 coins minted.
  const { coins, residue } = tokensToCoins(slice.coinResidue, effectiveNewTotal);

  projects.sort((a, b) => b.tokens - a.tokens);

  return {
    projects,
    lastTotals,
    coinResidue: residue,
    coinsMinted: coins,
    ticketsAwarded: Math.floor(coins / CONFIG.COINS_PER_TICKET),
    newTokens: newTokensTotal,
    lifetimeTokens: projects.reduce((s, p) => s + p.tokens, 0),
    perProject: perProject.sort((a, b) => b.gained - a.gained),
    levelUps,
  };
}
