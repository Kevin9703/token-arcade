import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  COLLECTIBLES,
  byId,
  byRarity,
  RARITIES,
  RARITY_ORDER,
  SHOP,
  ACHIEVEMENTS,
} from '../../src/content';
import { SPRITES } from '../../src/render/sprites';

// The CollectibleType union from core/types.ts (types are stripped at bundle
// time, so we mirror the allowed values here as runtime data).
const COLLECTIBLE_TYPES = ['badge', 'sign', 'decor', 'buddy', 'frame', 'trophy', 'theme'];
// The RarityKey union — also the set of keys in the RARITIES table.
const RARITY_KEYS = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

// A minimal-but-plausible fresh GameState, covering every field the
// achievement `check` functions read (stats.*, projects[].level, owned).
function freshState(): any {
  return {
    version: 1,
    firstRunDone: false,
    mode: 'demo',
    coins: 0,
    tickets: 0,
    shards: 0,
    coinResidue: 0,
    stats: { lifetimeTokens: 0, coinsEarned: 0, pulls: 0, duplicates: 0, syncs: 0 },
    projects: [],
    lastTotals: {},
    owned: {},
    achievements: {},
    mockWorld: null,
    settings: { muted: false },
  };
}

// ---- COLLECTIBLES ---------------------------------------------------------

test('COLLECTIBLES: ids are unique', () => {
  const ids = COLLECTIBLES.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate collectible id found');
});

test('COLLECTIBLES: every rarity is a key of RARITIES', () => {
  for (const c of COLLECTIBLES) {
    assert.ok(
      Object.prototype.hasOwnProperty.call(RARITIES, c.rarity),
      `collectible ${c.id} has unknown rarity ${c.rarity}`,
    );
    // Also a member of the documented RarityKey union.
    assert.ok(RARITY_KEYS.includes(c.rarity), `collectible ${c.id} rarity not in union`);
  }
});

test('COLLECTIBLES: every type is a valid CollectibleType', () => {
  for (const c of COLLECTIBLES) {
    assert.ok(COLLECTIBLE_TYPES.includes(c.type), `collectible ${c.id} has invalid type ${c.type}`);
  }
});

test('COLLECTIBLES: every sprite is a non-empty string present in the atlas', () => {
  for (const c of COLLECTIBLES) {
    assert.equal(typeof c.sprite, 'string', `collectible ${c.id} sprite not a string`);
    assert.ok(c.sprite.length > 0, `collectible ${c.id} sprite is empty`);
    assert.ok(
      Object.prototype.hasOwnProperty.call(SPRITES, c.sprite),
      `collectible ${c.id} sprite "${c.sprite}" missing from SPRITES atlas`,
    );
  }
});

test('COLLECTIBLES: tint, when present, is an object', () => {
  for (const c of COLLECTIBLES) {
    if (c.tint !== undefined) {
      assert.equal(typeof c.tint, 'object', `collectible ${c.id} tint not an object`);
      assert.notEqual(c.tint, null, `collectible ${c.id} tint is null`);
      assert.ok(!Array.isArray(c.tint), `collectible ${c.id} tint is an array`);
    }
  }
});

// ---- byId -----------------------------------------------------------------

test('byId: maps every collectible id back to the same object', () => {
  for (const c of COLLECTIBLES) {
    assert.strictEqual(byId[c.id], c, `byId[${c.id}] is not the same object`);
  }
});

test('byId: size equals COLLECTIBLES.length', () => {
  assert.equal(Object.keys(byId).length, COLLECTIBLES.length);
});

// ---- byRarity -------------------------------------------------------------

test('byRarity: each bucket only holds its own rarity', () => {
  for (const r of RARITY_ORDER) {
    for (const c of byRarity[r]) {
      assert.equal(c.rarity, r, `byRarity[${r}] contains a ${c.rarity}`);
    }
  }
});

test('byRarity: buckets partition COLLECTIBLES with no loss or dupe', () => {
  let total = 0;
  const seen = new Set<string>();
  for (const r of RARITY_ORDER) {
    for (const c of byRarity[r]) {
      total += 1;
      assert.ok(!seen.has(c.id), `collectible ${c.id} appears in more than one bucket`);
      seen.add(c.id);
    }
  }
  assert.equal(total, COLLECTIBLES.length, 'byRarity total length mismatch');
  assert.equal(seen.size, COLLECTIBLES.length, 'byRarity partition missing entries');
});

// ---- RARITY_ORDER / RARITIES ---------------------------------------------

test('RARITY_ORDER: contains exactly the 5 rarity keys', () => {
  assert.equal(RARITY_ORDER.length, 5);
  assert.deepEqual([...RARITY_ORDER].sort(), [...RARITY_KEYS].sort());
});

test('RARITY_ORDER: ordered by RARITIES[key].order ascending', () => {
  for (let i = 1; i < RARITY_ORDER.length; i++) {
    const prev = RARITIES[RARITY_ORDER[i - 1]].order;
    const cur = RARITIES[RARITY_ORDER[i]].order;
    assert.ok(prev < cur, `RARITY_ORDER not ascending at index ${i}`);
  }
  // legendary first (rarest, order 0), common last.
  assert.equal(RARITY_ORDER[0], 'legendary');
  assert.equal(RARITY_ORDER[RARITY_ORDER.length - 1], 'common');
});

test('RARITIES: each entry has positive weight and color/glow strings', () => {
  for (const key of RARITY_KEYS) {
    const r = RARITIES[key];
    assert.ok(r, `RARITIES missing key ${key}`);
    assert.ok(r.weight > 0, `RARITIES[${key}].weight not > 0`);
    assert.equal(typeof r.color, 'string', `RARITIES[${key}].color not a string`);
    assert.ok(r.color.length > 0, `RARITIES[${key}].color empty`);
    assert.equal(typeof r.glow, 'string', `RARITIES[${key}].glow not a string`);
    assert.ok(r.glow.length > 0, `RARITIES[${key}].glow empty`);
  }
});

// ---- SHOP -----------------------------------------------------------------

test('SHOP: ids are unique', () => {
  const ids = SHOP.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate shop id found');
});

test('SHOP: every cost is positive and every sprite is a non-empty string', () => {
  for (const item of SHOP) {
    assert.ok(item.cost > 0, `shop item ${item.id} cost not > 0`);
    assert.equal(typeof item.sprite, 'string', `shop item ${item.id} sprite not a string`);
    assert.ok(item.sprite.length > 0, `shop item ${item.id} sprite empty`);
  }
});

test('SHOP: capsule items have a numeric pulls >= 1', () => {
  const capsules = SHOP.filter((s) => s.kind === 'capsule');
  assert.ok(capsules.length > 0, 'expected at least one capsule item');
  for (const item of capsules) {
    assert.equal(typeof item.pulls, 'number', `capsule ${item.id} pulls not numeric`);
    assert.ok((item.pulls as number) >= 1, `capsule ${item.id} pulls < 1`);
  }
});

test('SHOP: grant items pick a valid, obtainable CollectibleType', () => {
  const grants = SHOP.filter((s) => s.kind === 'grant');
  assert.ok(grants.length > 0, 'expected at least one grant item');
  for (const item of grants) {
    assert.ok(
      COLLECTIBLE_TYPES.includes(item.pick as string),
      `grant ${item.id} pick "${item.pick}" not a valid CollectibleType`,
    );
    // pickGrant can only succeed if at least one collectible has that type.
    assert.ok(
      COLLECTIBLES.some((c) => c.type === item.pick),
      `grant ${item.id} pick "${item.pick}" has no matching collectible`,
    );
  }
});

// ---- ACHIEVEMENTS ---------------------------------------------------------

test('ACHIEVEMENTS: ids are unique', () => {
  const ids = ACHIEVEMENTS.map((a) => a.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate achievement id found');
});

test('ACHIEVEMENTS: each has name, desc, non-empty sprite, and a check function', () => {
  for (const a of ACHIEVEMENTS) {
    assert.equal(typeof a.name, 'string', `achievement ${a.id} name not a string`);
    assert.ok(a.name.length > 0, `achievement ${a.id} name empty`);
    assert.equal(typeof a.desc, 'string', `achievement ${a.id} desc not a string`);
    assert.ok(a.desc.length > 0, `achievement ${a.id} desc empty`);
    assert.equal(typeof a.sprite, 'string', `achievement ${a.id} sprite not a string`);
    assert.ok(a.sprite.length > 0, `achievement ${a.id} sprite empty`);
    assert.equal(typeof a.check, 'function', `achievement ${a.id} check not a function`);
  }
});

test('ACHIEVEMENTS: check runs on a fresh state without throwing (returns boolean)', () => {
  const s = freshState();
  for (const a of ACHIEVEMENTS) {
    let result: unknown;
    assert.doesNotThrow(() => {
      result = a.check(s);
    }, `achievement ${a.id} check threw on fresh state`);
    assert.equal(typeof result, 'boolean', `achievement ${a.id} check did not return boolean`);
    // Every milestone is unearned on a truly fresh state.
    assert.equal(result, false, `achievement ${a.id} unexpectedly true on fresh state`);
  }
});
