import { test } from 'node:test';
import assert from 'node:assert/strict';

import { rollRarity, rollCapsule, pickGrant } from '../../src/domain/capsule';
import { RARITIES, RARITY_ORDER, byRarity, COLLECTIBLES } from '../../src/content';
import { mulberry32 } from '../helpers';

// rollRarity walks RARITY_ORDER accumulating weights and returns the first tier
// whose cumulative weight exceeds target = rng() * totalWeight. Derive the bands
// from the real weights rather than hardcoding them.
const TOTAL_WEIGHT = RARITY_ORDER.reduce((sum, k) => sum + RARITIES[k].weight, 0);

function cumulativeBands(): { key: string; lo: number; hi: number }[] {
  let acc = 0;
  return RARITY_ORDER.map((key) => {
    const lo = acc;
    acc += RARITIES[key].weight;
    return { key, lo, hi: acc };
  });
}

test('rollRarity — a constant rng in each band returns that tier', () => {
  // Sanity: with these content weights the total is 100 (1+6+13+26+54).
  assert.equal(TOTAL_WEIGHT, 100);

  for (const band of cumulativeBands()) {
    // Aim rng at the middle of the band: target = rng*total lands inside [lo, hi).
    const midTarget = (band.lo + band.hi) / 2;
    const r = midTarget / TOTAL_WEIGHT;
    assert.equal(
      rollRarity(() => r),
      band.key,
      `rng()=${r} (target ${midTarget}) should map to ${band.key}`,
    );
  }
});

test('rollRarity — extreme rng values hit the rarest and commonest tiers', () => {
  // rng()=0 -> target 0, below the first cumulative weight -> rarest tier.
  assert.equal(rollRarity(() => 0), RARITY_ORDER[0]);
  assert.equal(rollRarity(() => 0), 'legendary');

  // rng()=0.9999 -> target just under total -> commonest tier.
  assert.equal(rollRarity(() => 0.9999), RARITY_ORDER[RARITY_ORDER.length - 1]);
  assert.equal(rollRarity(() => 0.9999), 'common');
});

test('rollRarity — cumulative band edges resolve to the upper tier', () => {
  // At an exact cumulative boundary the strict `target < acc` fails for the lower
  // tier and the next tier claims it. Verify against derived boundaries.
  const bands = cumulativeBands();
  for (let i = 1; i < bands.length; i++) {
    const edgeTarget = bands[i].lo; // == bands[i-1].hi
    const r = edgeTarget / TOTAL_WEIGHT;
    assert.equal(
      rollRarity(() => r),
      bands[i].key,
      `edge target ${edgeTarget} should belong to ${bands[i].key}, not ${bands[i - 1].key}`,
    );
  }
});

test('rollCapsule — returns a real collectible whose rarity matches the roll', () => {
  // With a constant rng, both internal rng() calls return the same value, so the
  // capsule's rarity equals rollRarity for that same rng.
  for (const v of [0, 0.005, 0.05, 0.1, 0.3, 0.5, 0.99]) {
    const rng = () => v;
    const got = rollCapsule(rng);
    assert.equal(got.rarity, rollRarity(rng), `rarity mismatch for rng=${v}`);
    assert.ok(COLLECTIBLES.includes(got), 'result must be a member of COLLECTIBLES');
    assert.ok(byRarity[got.rarity].includes(got), 'result must belong to its rarity pool');
  }
});

test('P1C: every rarity pool is non-empty and every catalog entry is drawable', () => {
  for (const rarity of RARITY_ORDER) assert.ok(byRarity[rarity].length > 0, `${rarity} pool is empty`);
  const pooledIds = new Set(RARITY_ORDER.flatMap((rarity) => byRarity[rarity].map((c) => c.id)));
  assert.deepEqual(pooledIds, new Set(COLLECTIBLES.map((c) => c.id)));
});

test('rollCapsule — varying (mulberry32) rng always yields a valid member', () => {
  const rng = mulberry32(7);
  for (let i = 0; i < 200; i++) {
    const got = rollCapsule(rng);
    assert.ok(COLLECTIBLES.includes(got));
  }
});

test('pickGrant — prefers unowned, falls back to a dupe', async (t) => {
  const type = 'theme'; // catalog has exactly two: e_sunset, l_forest
  const themes = COLLECTIBLES.filter((c) => c.type === type);
  assert.ok(themes.length >= 2, 'test assumes >= 2 themes exist');

  await t.test('nothing owned -> returns some collectible of the type', () => {
    const got = pickGrant(type, {}, () => 0);
    assert.equal(got.type, type);
    assert.ok(themes.includes(got));
  });

  await t.test('one owned -> returns one of the remaining unowned ones', () => {
    const ownedTheme = themes[0];
    const owned = { [ownedTheme.id]: { count: 1, firstUnlocked: '2026-01-01' } };
    // Run across a range of rng values; every result must be unowned.
    for (const v of [0, 0.25, 0.5, 0.75, 0.99]) {
      const got = pickGrant(type, owned, () => v);
      assert.equal(got.type, type);
      assert.ok(!owned[got.id], 'must pick from the unowned themes');
      assert.notEqual(got.id, ownedTheme.id);
    }
  });

  await t.test('all owned -> still returns one of that type (a duplicate)', () => {
    const owned: Record<string, { count: number; firstUnlocked: string }> = {};
    for (const c of themes) owned[c.id] = { count: 1, firstUnlocked: '2026-01-01' };
    for (const v of [0, 0.5, 0.99]) {
      const got = pickGrant(type, owned, () => v);
      assert.equal(got.type, type);
      assert.ok(themes.includes(got));
      assert.ok(owned[got.id], 'the fallback is an already-owned theme (a dupe)');
    }
  });
});

test('rollRarity — distribution over ~5000 rolls tracks the weights', () => {
  const rng = mulberry32(1234);
  const N = 5000;
  const counts: Record<string, number> = {};
  for (const k of RARITY_ORDER) counts[k] = 0;
  for (let i = 0; i < N; i++) counts[rollRarity(rng)]++;

  // Every observed share is within a generous absolute tolerance of weight/total.
  for (const k of RARITY_ORDER) {
    const share = counts[k] / N;
    const expected = RARITIES[k].weight / TOTAL_WEIGHT;
    assert.ok(
      Math.abs(share - expected) <= 0.05,
      `${k}: observed ${share.toFixed(3)} vs expected ${expected.toFixed(3)}`,
    );
  }

  // Ordering sanity: common is the most frequent, legendary the least.
  const most = RARITY_ORDER.reduce((a, b) => (counts[a] >= counts[b] ? a : b));
  const least = RARITY_ORDER.reduce((a, b) => (counts[a] <= counts[b] ? a : b));
  assert.equal(most, 'common');
  assert.equal(least, 'legendary');
});
