import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  COLLECTION_MILESTONES,
  MISSING_PRIZE_DUST_COST,
  collectionMilestoneTier,
  crossedCollectionMilestones,
  earnedCollectionMilestones,
  missingCollectibles,
  nextCollectionMilestone,
  validOwnedCount,
} from '../../src/domain/collection';
import { COLLECTIBLES } from '../../src/content';
import { getLocale, setLocale, t } from '../../src/i18n';
import type { OwnedEntry } from '../../src/core/types';

const FIRST_UNLOCKED = '2026-07-11T00:00:00.000Z';

function ownedIds(ids: string[]): Record<string, OwnedEntry> {
  return Object.fromEntries(ids.map((id) => [id, { count: 1, firstUnlocked: FIRST_UNLOCKED }]));
}

test('P1C milestones are the permanent 10/25/40/50 tiers in order', () => {
  assert.deepEqual(COLLECTION_MILESTONES.map((m) => m.threshold), [10, 25, 40, 50]);
  assert.deepEqual(COLLECTION_MILESTONES.map((m) => m.tier), [1, 2, 3, 4]);
  assert.equal(new Set(COLLECTION_MILESTONES.map((m) => m.id)).size, 4);
});

test('validOwnedCount ignores unknown IDs, zero counts, and duplicate quantities', () => {
  const owned = ownedIds(COLLECTIBLES.slice(0, 2).map((c) => c.id));
  owned[COLLECTIBLES[0].id].count = 99;
  owned[COLLECTIBLES[2].id] = { count: 0, firstUnlocked: FIRST_UNLOCKED };
  owned.retired_prize = { count: 50, firstUnlocked: FIRST_UNLOCKED };
  assert.equal(validOwnedCount(owned), 2);
});

test('missingCollectibles returns every catalog prize not positively owned', () => {
  const [positive, zero, negative] = COLLECTIBLES;
  const owned = ownedIds([positive.id, zero.id, negative.id]);
  owned[positive.id].count = 4;
  owned[zero.id].count = 0;
  owned[negative.id].count = -1;
  owned.retired_prize = { count: 10, firstUnlocked: FIRST_UNLOCKED };

  const missing = missingCollectibles(owned);
  assert.equal(missing.length, COLLECTIBLES.length - 1);
  assert.equal(missing.some((collectible) => collectible.id === positive.id), false);
  assert.equal(missing.some((collectible) => collectible.id === zero.id), true);
  assert.equal(missing.some((collectible) => collectible.id === negative.id), true);
  assert.equal(missing.some((collectible) => collectible.id === 'retired_prize'), false);
});

test('earned milestones and tier are derived from valid unique count only', () => {
  const cases = [
    { count: 0, tiers: [], tier: 0 },
    { count: 9, tiers: [], tier: 0 },
    { count: 10, tiers: [10], tier: 1 },
    { count: 24, tiers: [10], tier: 1 },
    { count: 25, tiers: [10, 25], tier: 2 },
    { count: 40, tiers: [10, 25, 40], tier: 3 },
    { count: 50, tiers: [10, 25, 40, 50], tier: 4 },
  ];
  for (const c of cases) {
    assert.deepEqual(earnedCollectionMilestones(c.count).map((m) => m.threshold), c.tiers);
    assert.equal(collectionMilestoneTier(c.count), c.tier);
  }
});

test('nextCollectionMilestone reports the first goal above each boundary', () => {
  const cases = [
    { count: 0, threshold: 10, remaining: 10 },
    { count: 9, threshold: 10, remaining: 1 },
    { count: 10, threshold: 25, remaining: 15 },
    { count: 24, threshold: 25, remaining: 1 },
    { count: 25, threshold: 40, remaining: 15 },
    { count: 39, threshold: 40, remaining: 1 },
    { count: 40, threshold: 50, remaining: 10 },
    { count: 49, threshold: 50, remaining: 1 },
  ];
  for (const c of cases) {
    const next = nextCollectionMilestone(c.count);
    assert.ok(next);
    assert.equal(next.milestone.threshold, c.threshold);
    assert.equal(next.remaining, c.remaining);
  }
  assert.equal(nextCollectionMilestone(50), null);
  assert.equal(nextCollectionMilestone(51), null);
});

test('missing-prize exchange cost is fixed at 120 dust', () => {
  assert.equal(MISSING_PRIZE_DUST_COST, 120);
});

test('crossedCollectionMilestones returns every crossed threshold in ascending order', () => {
  assert.deepEqual(crossedCollectionMilestones(9, 10).map((m) => m.threshold), [10]);
  assert.deepEqual(crossedCollectionMilestones(24, 25).map((m) => m.threshold), [25]);
  assert.deepEqual(crossedCollectionMilestones(39, 40).map((m) => m.threshold), [40]);
  assert.deepEqual(crossedCollectionMilestones(49, 50).map((m) => m.threshold), [50]);
  assert.deepEqual(crossedCollectionMilestones(24, 40).map((m) => m.threshold), [25, 40]);
  assert.deepEqual(crossedCollectionMilestones(9, 50).map((m) => m.threshold), [10, 25, 40, 50]);
  assert.deepEqual(crossedCollectionMilestones(40, 40), []);
  assert.deepEqual(crossedCollectionMilestones(50, 49), []);
});

test('P1C milestone feedback has complete, distinct English and Chinese copy', () => {
  const previous = getLocale();
  try {
    setLocale('en');
    const english = COLLECTION_MILESTONES.map((milestone) => ({
      name: t(milestone.nameKey),
      desc: t(milestone.descKey),
    }));
    setLocale('zh-CN');
    COLLECTION_MILESTONES.forEach((milestone, index) => {
      const zhName = t(milestone.nameKey);
      const zhDesc = t(milestone.descKey);
      assert.notEqual(english[index].name, milestone.nameKey, `${milestone.id} English name key is missing`);
      assert.notEqual(english[index].desc, milestone.descKey, `${milestone.id} English description key is missing`);
      assert.notEqual(zhName, milestone.nameKey, `${milestone.id} Chinese name key is missing`);
      assert.notEqual(zhDesc, milestone.descKey, `${milestone.id} Chinese description key is missing`);
      assert.notEqual(zhName, english[index].name, `${milestone.id} Chinese name fell back to English`);
      assert.notEqual(zhDesc, english[index].desc, `${milestone.id} Chinese description fell back to English`);
    });
  } finally {
    setLocale(previous);
  }
});
