/*
 * collection.ts — pure P1C collection-progress rules.
 *
 * Milestones are deliberately derived from the current catalog and owned map.
 * They add no save fields or currencies, ignore stale unknown IDs, and work
 * identically for live/demo because each mode already owns an isolated save.
 */

import { COLLECTIBLES } from '../content/collectibles';
import type { Collectible, CollectionMilestone, OwnedEntry } from '../core/types';

export const MISSING_PRIZE_DUST_COST = 120;

export interface NextCollectionMilestone {
  milestone: CollectionMilestone;
  remaining: number;
}

export const COLLECTION_MILESTONES: readonly CollectionMilestone[] = [
  {
    id: 'neon-shelf',
    tier: 1,
    threshold: 10,
    nameKey: 'collection.milestone.10.name',
    descKey: 'collection.milestone.10.desc',
  },
  {
    id: 'prize-lights',
    tier: 2,
    threshold: 25,
    nameKey: 'collection.milestone.25.name',
    descKey: 'collection.milestone.25.desc',
  },
  {
    id: 'collector-pedestal',
    tier: 3,
    threshold: 40,
    nameKey: 'collection.milestone.40.name',
    descKey: 'collection.milestone.40.desc',
  },
  {
    id: 'crown-marquee',
    tier: 4,
    threshold: 50,
    nameKey: 'collection.milestone.50.name',
    descKey: 'collection.milestone.50.desc',
  },
] as const;

const VALID_IDS = new Set(COLLECTIBLES.map((collectible) => collectible.id));

/** Count unique, currently valid catalog entries with a positive owned count. */
export function validOwnedCount(owned: Readonly<Record<string, OwnedEntry>>): number {
  let count = 0;
  for (const [id, entry] of Object.entries(owned)) {
    if (VALID_IDS.has(id) && entry.count > 0) count++;
  }
  return count;
}

/** Valid catalog prizes whose owned count is absent or non-positive. */
export function missingCollectibles(owned: Readonly<Record<string, OwnedEntry>>): Collectible[] {
  return COLLECTIBLES.filter((collectible) => (owned[collectible.id]?.count ?? 0) <= 0);
}

/** All permanent display upgrades earned at the supplied valid unique count. */
export function earnedCollectionMilestones(uniqueCount: number): CollectionMilestone[] {
  return COLLECTION_MILESTONES.filter((milestone) => uniqueCount >= milestone.threshold);
}

/** Highest permanent display tier earned so far (0 for a fresh collection). */
export function collectionMilestoneTier(uniqueCount: number): number {
  const earned = earnedCollectionMilestones(uniqueCount);
  return earned.length ? earned[earned.length - 1].tier : 0;
}

/** The first permanent collection goal not yet reached. */
export function nextCollectionMilestone(uniqueCount: number): NextCollectionMilestone | null {
  const milestone = COLLECTION_MILESTONES.find((candidate) => candidate.threshold > uniqueCount);
  return milestone ? { milestone, remaining: milestone.threshold - uniqueCount } : null;
}

/** Every threshold crossed by one mutation, always in ascending threshold order. */
export function crossedCollectionMilestones(before: number, after: number): CollectionMilestone[] {
  if (after <= before) return [];
  return COLLECTION_MILESTONES.filter(
    (milestone) => before < milestone.threshold && after >= milestone.threshold,
  );
}
