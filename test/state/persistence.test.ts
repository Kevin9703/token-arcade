import { test } from 'node:test';
import assert from 'node:assert/strict';

import { STORAGE_KEY, SLOT_KEYS, META_KEY, loadState, saveState, clearState, loadMeta, saveMeta, peekLegacyMode } from '../../src/state/persistence';
import { GameStore } from '../../src/state/store';
import { installLocalStorage } from '../helpers';
import type { GameState } from '../../src/core/types';

test('slot keys are distinct non-empty strings', () => {
  installLocalStorage();
  assert.ok(SLOT_KEYS.live.length > 0);
  assert.ok(SLOT_KEYS.demo.length > 0);
  assert.notEqual(SLOT_KEYS.live, SLOT_KEYS.demo);
  assert.notEqual(SLOT_KEYS.live, STORAGE_KEY);
});

test('saveState -> loadState round-trips a deep-equal current-version state per slot', () => {
  installLocalStorage();
  // freshState() is not exported; a fresh store gives us a valid GameState.
  const s = { ...new GameStore().state };
  assert.equal(s.version, 2);

  // Mutate coins + owned so the round-trip is non-trivial.
  s.coins = 4321;
  s.owned['c_smiley'] = { count: 2, firstUnlocked: '2026-01-01T00:00:00.000Z' };

  saveState('live', s);
  const loaded = loadState('live');

  assert.deepEqual(loaded, s);
  assert.equal(loaded?.coins, 4321);
  // The demo slot is untouched.
  assert.equal(loadState('demo'), null);
});

test('legacy single-blob save migrates into the slot matching its own mode', () => {
  installLocalStorage();
  const legacy = { ...new GameStore().state, coins: 77, mode: 'live' as const };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));

  assert.equal(peekLegacyMode(), 'live');
  // Loading the demo slot must NOT consume a live legacy blob.
  assert.equal(loadState('demo'), null);
  assert.equal(localStorage.getItem(STORAGE_KEY) !== null, true);

  const migrated = loadState('live');
  assert.ok(migrated);
  assert.equal(migrated!.coins, 77);
  // The legacy blob is consumed (moved, not copied).
  assert.equal(localStorage.getItem(STORAGE_KEY), null);
  // And now lives in the live slot.
  assert.equal(loadState('live')!.coins, 77);
});

test('loadState migrates a v1 legacy save: recomputes coins at 10,000/coin, keeps owned', () => {
  installLocalStorage();
  // A legacy v1 blob with inflated coins from the old 1,000-tokens/coin economy.
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: 1,
      mode: 'live',
      coins: 299900,
      coinResidue: 640,
      stats: { lifetimeTokens: 300000000, coinsEarned: 299900, pulls: 3, duplicates: 1, syncs: 5 },
      owned: { c_smiley: { count: 2, firstUnlocked: '2026-01-01T00:00:00.000Z' } },
    }),
  );
  const loaded = loadState('live');
  assert.ok(loaded);
  assert.equal(loaded!.version, 2);
  // 300,000,000 lifetime tokens / 10,000 -> 30,000 coins.
  assert.equal(loaded!.coins, 30000);
  assert.equal(loaded!.coinResidue, 0);
  assert.equal(loaded!.stats.coinsEarned, 30000);
  // Collectibles are preserved through migration.
  assert.deepEqual(loaded!.owned['c_smiley'], { count: 2, firstUnlocked: '2026-01-01T00:00:00.000Z' });
});

test('loadState with empty storage returns null', () => {
  installLocalStorage();
  assert.equal(loadState('live'), null);
  assert.equal(loadState('demo'), null);
});

test('loadState with corrupt JSON returns null (no throw)', () => {
  installLocalStorage();
  localStorage.setItem(SLOT_KEYS.live, '{not json');
  assert.doesNotThrow(() => loadState('live'));
  assert.equal(loadState('live'), null);
});

test('loadState with an unknown/newer version returns null', () => {
  installLocalStorage();
  localStorage.setItem(SLOT_KEYS.live, JSON.stringify({ version: 99, coins: 999 }));
  assert.equal(loadState('live'), null);
});

test('clearState removes only its own slot', () => {
  installLocalStorage();
  const s = { ...new GameStore().state };
  s.coins = 10;
  saveState('live', s);
  saveState('demo', { ...s, coins: 55 });

  clearState('live');
  assert.equal(loadState('live'), null);
  assert.equal(loadState('demo')!.coins, 55);
});

test('meta round-trips lastMode and rejects junk', () => {
  installLocalStorage();
  assert.equal(loadMeta(), null);
  saveMeta({ lastMode: 'demo' });
  assert.deepEqual(loadMeta(), { lastMode: 'demo' });
  localStorage.setItem(META_KEY, JSON.stringify({ lastMode: 'bogus' }));
  assert.equal(loadMeta(), null);
});

// ---------------------------------------------------------------------------
// QA-007: per-project base-coin repair on load.
// ---------------------------------------------------------------------------

/** Build a current-version save blob with arbitrary projects. */
function saveWithProjects(projects: unknown[]): unknown {
  return {
    ...new GameStore().state,
    projects,
  };
}

test('QA-007: a V2 save with stale (old 1,000-tokens/coin) project.coins is repaired on load', () => {
  installLocalStorage();
  // A large project at 120M tokens. Under the retired rate this saved as
  // 120,000; under the active 10,000-tokens/coin rate it must read 12,000.
  const stale = saveWithProjects([
    { id: 'large-project', name: 'large-project', provider: 'claude', tokens: 120_000_000, level: 40, coins: 120000 },
    { id: 'small', name: 'small', provider: 'codex', tokens: 9_999, level: 1, coins: 9 },
  ]);
  localStorage.setItem(SLOT_KEYS.live, JSON.stringify(stale));

  const loaded = loadState('live');
  assert.ok(loaded);
  const largeProject = loaded!.projects.find((p) => p.id === 'large-project')!;
  const small = loaded!.projects.find((p) => p.id === 'small')!;
  assert.equal(largeProject.coins, 12000, '120M tokens -> 12K base coins, not 120,000');
  assert.equal(small.coins, 0, '9,999 tokens is sub-coin -> 0 base coins (was stale 9)');
  // The spendable balance, earned total, tokens, ids are all left untouched.
  assert.equal(loaded!.coins, 0);
  assert.equal(loaded!.stats.coinsEarned, 0);
  assert.equal(largeProject.tokens, 120_000_000);
  assert.equal(largeProject.id, 'large-project');
});

test('QA-007: an already-correct V2 save round-trips unchanged (repair is idempotent)', () => {
  installLocalStorage();
  const correct = saveWithProjects([
    { id: 'a', name: 'a', provider: 'claude', tokens: 500_000, level: 5, coins: 50 }, // 500k/10k = 50
    { id: 'b', name: 'b', provider: 'codex', tokens: 12_345, level: 1, coins: 1 }, // 12345/10k = 1
  ]);
  localStorage.setItem(SLOT_KEYS.live, JSON.stringify(correct));

  const once = loadState('live')!;
  // Load again from the same on-disk blob — repeated loads must not drift.
  const twice = loadState('live')!;
  assert.equal(once.projects[0].coins, 50);
  assert.equal(once.projects[1].coins, 1);
  assert.deepEqual(twice.projects, once.projects);
});

test('QA-007: empty / missing / malformed project lists do not throw on load', () => {
  installLocalStorage();
  // No projects field at all — loadState returns the blob as-is (the store's
  // loadSlot normalizes a missing projects field to []). The repair must not
  // throw on a missing array.
  localStorage.setItem(SLOT_KEYS.live, JSON.stringify({ ...new GameStore().state, projects: undefined }));
  let loaded: GameState | null = null;
  assert.doesNotThrow(() => {
    loaded = loadState('live');
  });
  assert.ok(loaded, 'a save with no projects field still loads');

  // Empty projects array.
  localStorage.setItem(SLOT_KEYS.live, JSON.stringify(saveWithProjects([])));
  loaded = loadState('live');
  assert.ok(loaded);
  assert.deepEqual(loaded!.projects, []);

  // A project missing its tokens field is treated as 0 base coins, not a crash.
  localStorage.setItem(SLOT_KEYS.live, JSON.stringify(saveWithProjects([{ id: 'weird', name: 'w', provider: 'claude', level: 1, coins: 999 }])));
  loaded = loadState('live');
  assert.ok(loaded);
  assert.equal(loaded!.projects[0].coins, 0, 'missing tokens -> 0 base coins, no throw');
});

test('QA-007: a v1 save that already carried projects repairs their coins too', () => {
  installLocalStorage();
  // A v1 blob (pre-Economy-V2) that happened to persist projects at the old rate.
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      version: 1,
      mode: 'live',
      coins: 5000, // inflated global balance
      coinResidue: 0,
      stats: { lifetimeTokens: 50_000_000, coinsEarned: 5000, pulls: 0, duplicates: 0, syncs: 1 },
      projects: [{ id: 'p', name: 'p', provider: 'claude', tokens: 50_000_000, level: 30, coins: 50000 }],
    }),
  );
  const loaded = loadState('live')!;
  assert.equal(loaded.version, 2);
  // Global balance is recomputed by the v1->v2 migration (50M / 10k = 5000).
  assert.equal(loaded.coins, 5000);
  assert.equal(loaded.stats.coinsEarned, 5000);
  // The per-project value is repaired by the load repair (was stale 50,000).
  assert.equal(loaded.projects[0].coins, 5000);
  assert.equal(loaded.projects[0].tokens, 50_000_000);
});
