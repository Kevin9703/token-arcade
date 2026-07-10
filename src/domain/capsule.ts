/*
 * capsule.ts — the capsule machine's randomness. Weighted rarity rolls, capsule
 * draws, and the guaranteed-grant picker used by the fixed-price shop. An
 * injectable `rng` keeps these deterministic in tests.
 */

import { RARITIES, RARITY_ORDER, byRarity, COLLECTIBLES } from '../content';
import type { RarityKey, Collectible, CollectibleType, OwnedEntry } from '../core/types';

export function rollRarity(rng: () => number = Math.random): RarityKey {
  const r = rng();
  let total = 0;
  for (const k of RARITY_ORDER) total += RARITIES[k].weight;
  let acc = 0;
  const target = r * total;
  for (const k of RARITY_ORDER) {
    acc += RARITIES[k].weight;
    if (target < acc) return k;
  }
  return 'common';
}

export function rollCapsule(rng: () => number = Math.random): Collectible {
  const rarity = rollRarity(rng);
  const pool = byRarity[rarity];
  return pool[Math.floor(rng() * pool.length)];
}

// Pick a guaranteed collectible of a type for the fixed-price shop:
// prefer something not yet owned, else fall back to a random one (dupe).
export function pickGrant(type: CollectibleType, owned: Record<string, OwnedEntry>, rng: () => number = Math.random): Collectible {
  const pool = COLLECTIBLES.filter((c) => c.type === type);
  const fresh = pool.filter((c) => !owned[c.id]);
  const src = fresh.length ? fresh : pool;
  return src[Math.floor(rng() * src.length)];
}
