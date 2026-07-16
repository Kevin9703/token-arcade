import { test } from 'node:test';
import assert from 'node:assert/strict';

import { GameStore } from '../../src/state/store';
import { SLOT_KEYS } from '../../src/state/persistence';
import { MISSING_PRIZE_DUST_COST } from '../../src/domain/collection';
import { COLLECTIBLES, SHOP } from '../../src/content';
import { installLocalStorage, installStorageEvents } from '../helpers';
import type { GameState, ProjectUsage } from '../../src/core/types';

/** Injectable fetchLive stub returning a fixed usage payload. */
function liveWith(projects: ProjectUsage[]): () => Promise<{ source: string; projects: ProjectUsage[] }> {
  return async () => ({ source: 'live', projects });
}

/** Escape hatch for tests that need to poke state directly. */
function mut(store: GameStore): GameState {
  return store.state as GameState;
}

const P1C_UNLOCKED_AT = '2026-07-11T00:00:00.000Z';

function grantOwned(store: GameStore, ids: string[]): void {
  for (const id of ids) mut(store).owned[id] = { count: 1, firstUnlocked: P1C_UNLOCKED_AT };
}

// ---------------------------------------------------------------------------
// CONSTRUCTION / LOAD
// ---------------------------------------------------------------------------

test('construction: a fresh store (empty storage) has zeroed defaults', () => {
  installLocalStorage();
  const store = new GameStore();
  const s = store.state;

  assert.equal(s.coins, 0);
  assert.deepEqual(s.projects, []);
  assert.deepEqual(s.owned, {});
  assert.equal(s.mode, 'live');
  assert.equal(s.historyScan, 'unscanned');
  assert.deepEqual(s.cosmetics, { roomTheme: 'base', profileFrame: 'base' });
  assert.equal(s.roomDecorations, null);
  assert.equal(s.coinResidue, 0);
  assert.equal(s.tickets, 0);
  assert.equal(s.shards, 0);
  assert.deepEqual(s.stats, { lifetimeTokens: 0, coinsEarned: 0, pulls: 0, duplicates: 0, syncs: 0 });
  assert.equal(store.ownedCount(), 0);
});

// ---------------------------------------------------------------------------
// SYNC — anti-double-count (critical)
// ---------------------------------------------------------------------------

test('sync: anti-double-count — same totals mint 0 coins the second time', async () => {
  installLocalStorage();
  const store = new GameStore({
    fetchLive: liveWith([
      { id: 'p1', name: 'p1', provider: 'claude', tokens: 500000 },
      { id: 'p2', name: 'p2', provider: 'codex', tokens: 300000 },
    ]),
  });

  const r1 = await store.sync();
  assert.equal(r1.source, 'live');
  assert.equal(r1.newTokens, 800000);
  // Economy V2: 10,000 tokens/coin. 800,000 new tokens -> 80 coins.
  assert.equal(r1.coinsMinted, 80);
  assert.equal(r1.residue, 0);
  assert.equal(r1.tickets, 1); // floor(80 / 50)

  assert.equal(store.state.coins, 80);
  assert.equal(store.state.coinResidue, 0);
  assert.equal(store.state.tickets, 1);
  assert.equal(store.state.stats.lifetimeTokens, 800000);
  assert.equal(store.state.projects.length, 2);

  // 50-level curve: levelFor(500000) === 8, levelFor(300000) === 7. First sync
  // mints at the base rate (new projects, no level bonus); coins === tokens/10000.
  const p1 = store.state.projects.find((p) => p.id === 'p1')!;
  const p2 = store.state.projects.find((p) => p.id === 'p2')!;
  assert.equal(p1.level, 8);
  assert.equal(p2.level, 7);
  assert.equal(p1.coins, 50);
  assert.equal(p2.coins, 30);

  // Sync the SAME totals again — nothing new should be minted.
  const r2 = await store.sync();
  assert.equal(r2.newTokens, 0);
  assert.equal(r2.coinsMinted, 0);
  assert.equal(r2.tickets, 0);
  assert.equal(store.state.coins, 80); // unchanged
});

// ---------------------------------------------------------------------------
// SYNC — residue carry
// ---------------------------------------------------------------------------

test('sync: sub-coin residue carries forward across syncs', async () => {
  installLocalStorage();
  // Economy V2 (10,000 tokens/coin). First sync: 5,007,500 tokens -> 500 coins,
  // residue 7500 (5,007,500 % 10,000).
  let payload: ProjectUsage[] = [{ id: 'p1', name: 'p1', provider: 'claude', tokens: 5007500 }];
  const store = new GameStore({ fetchLive: async () => ({ source: 'live', projects: payload }) });

  const r1 = await store.sync();
  assert.equal(r1.newTokens, 5007500);
  assert.equal(r1.coinsMinted, 500);
  assert.equal(r1.residue, 7500);
  assert.equal(store.state.coins, 500);
  assert.equal(store.state.coinResidue, 7500);

  // Second sync: raise to 5,032,500 -> gained 25,000 raw tokens. p1 is now level
  // 16, so the coin multiplier (~1.153x) applies to these FUTURE tokens:
  // round(25000 * 1.15306) = 28,827 effective. 7500 + 28,827 = 36,327 -> +3 coins,
  // residue 6327.
  payload = [{ id: 'p1', name: 'p1', provider: 'claude', tokens: 5032500 }];
  const r2 = await store.sync();
  assert.equal(r2.newTokens, 25000); // raw new tokens (pre-multiplier)
  assert.equal(r2.coinsMinted, 3);
  assert.equal(r2.residue, 6327);
  assert.equal(store.state.coins, 503); // increased by exactly 3
  assert.equal(store.state.coinResidue, 6327);
});

// ---------------------------------------------------------------------------
// SYNC — new project + level up
// ---------------------------------------------------------------------------

test('sync: new project appears and an existing project levels up', async () => {
  installLocalStorage();
  let payload: ProjectUsage[] = [
    { id: 'p1', name: 'p1', provider: 'claude', tokens: 500000 },
    { id: 'p2', name: 'p2', provider: 'codex', tokens: 300000 },
  ];
  const store = new GameStore({ fetchLive: async () => ({ source: 'live', projects: payload }) });
  await store.sync(); // p2 now exists at level 7 (levelFor(300000))

  // p1 unchanged; p2 crosses the 1,000,000 threshold (lvl 7 -> 10); p3 is brand new.
  payload = [
    { id: 'p1', name: 'p1', provider: 'claude', tokens: 500000 },
    { id: 'p2', name: 'p2', provider: 'codex', tokens: 1200000 },
    { id: 'p3', name: 'p3', provider: 'gemini', tokens: 50000 },
  ];
  const r = await store.sync();

  // New project surfaces in newProjects with isNew true.
  const newP3 = r.newProjects.find((p) => p.id === 'p3');
  assert.ok(newP3, 'p3 should be reported as a new project');
  assert.equal(newP3!.isNew, true);
  assert.equal(newP3!.level, 4); // levelFor(50000) === 4

  // Its perProject entry also carries isNew true.
  const perP3 = r.perProject.find((p) => p.id === 'p3');
  assert.ok(perP3);
  assert.equal(perP3!.isNew, true);

  // Level up fires only because p2 already existed with level > 0.
  const lvlUp = r.levelUps.find((l) => l.id === 'p2');
  assert.ok(lvlUp, 'p2 should appear in levelUps');
  assert.equal(lvlUp!.from, 7);
  assert.equal(lvlUp!.to, 10);
  // 7 (Powered) -> 10 (Deluxe) also promotes the visual stage.
  assert.equal(lvlUp!.stageTo, 'DELUXE');

  const perP2 = r.perProject.find((p) => p.id === 'p2');
  assert.ok(perP2);
  assert.equal(perP2!.leveledTo, 10);
  assert.equal(perP2!.isNew, false);

  // p1 gained nothing, so it is not reported this sync.
  assert.equal(r.perProject.find((p) => p.id === 'p1'), undefined);
});

// ---------------------------------------------------------------------------
// SYNC — monotonic cabinets (pruned history must not de-level)
// ---------------------------------------------------------------------------

test('sync: a shrunken reported total never lowers a cabinet, and future gains count from the new baseline', async () => {
  installLocalStorage();
  let payload: ProjectUsage[] = [{ id: 'p1', name: 'p1', provider: 'claude', tokens: 500000 }];
  const store = new GameStore({ fetchLive: async () => ({ source: 'live', projects: payload }) });
  await store.sync();
  const before = store.state.projects.find((p) => p.id === 'p1')!;
  assert.equal(before.level, 8);
  const coinsBefore = store.state.coins;

  // History pruned: the source now reports far fewer lifetime tokens.
  payload = [{ id: 'p1', name: 'p1', provider: 'claude', tokens: 100000 }];
  const r = await store.sync();
  assert.equal(r.coinsMinted, 0); // shrink mints nothing
  const after = store.state.projects.find((p) => p.id === 'p1')!;
  assert.equal(after.tokens, 500000); // high-water mark kept
  assert.equal(after.level, 8); // no de-level
  assert.equal(store.state.coins, coinsBefore);

  // New work on the pruned history counts from the NEW raw baseline (100k).
  payload = [{ id: 'p1', name: 'p1', provider: 'claude', tokens: 130000 }];
  const r2 = await store.sync();
  assert.equal(r2.newTokens, 30000);
  assert.ok(r2.coinsMinted > 0);
});

// ---------------------------------------------------------------------------
// SYNC — concurrency guard
// ---------------------------------------------------------------------------

test('sync: overlapping calls share one in-flight sync (no double-minting)', async () => {
  installLocalStorage();
  const store = new GameStore({
    fetchLive: async () => {
      await new Promise((r) => setTimeout(r, 10));
      return { source: 'live', projects: [{ id: 'p1', name: 'p1', provider: 'claude', tokens: 500000 }] };
    },
  });

  const [a, b] = await Promise.all([store.sync(), store.sync()]);
  assert.equal(a, b); // literally the same result object
  assert.equal(store.state.coins, 50);
  assert.equal(store.state.stats.syncs, 1);
});

// ---------------------------------------------------------------------------
// SYNC — truthful first scan + explicit demo mode + save-slot isolation
// ---------------------------------------------------------------------------

test('P1A: an empty first live scan stays empty and records a demo decision instead of minting fiction', async () => {
  installLocalStorage();
  const store = new GameStore({ fetchLive: liveWith([]) });
  assert.equal(store.state.mode, 'live');

  const r = await store.sync();
  assert.equal(store.state.mode, 'live');
  assert.equal(r.source, 'no-history');
  assert.equal(r.coinsMinted, 0);
  assert.deepEqual(store.state.projects, []);
  assert.equal(store.state.coins, 0);
  assert.equal(store.state.stats.syncs, 0);
  assert.equal(store.state.historyScan, 'no-history');
  assert.equal(store.state.firstRunDone, false);
});

test('sync: an empty live payload does NOT switch a save with real progress into demo', async () => {
  installLocalStorage();
  let payload: ProjectUsage[] = [{ id: 'p1', name: 'p1', provider: 'claude', tokens: 500000 }];
  const store = new GameStore({ fetchLive: async () => ({ source: 'live', projects: payload }) });
  await store.sync();
  assert.equal(store.state.coins, 50);

  // Transient failure: the scan comes back empty.
  payload = [];
  const r = await store.sync();
  assert.equal(r.source, 'live-empty');
  assert.equal(r.coinsMinted, 0);
  assert.equal(store.state.mode, 'live'); // still live
  assert.equal(store.state.coins, 50); // no fake coins
  assert.equal(store.state.projects.length, 1); // cabinets intact
});

test('QA-007: project.coins stays at floor(tokens/10000) after sync and after an empty follow-up scan', async () => {
  installLocalStorage();
  let payload: ProjectUsage[] = [{ id: 'p1', name: 'p1', provider: 'claude', tokens: 115_000_000 }];
  const store = new GameStore({ fetchLive: async () => ({ source: 'live', projects: payload }) });

  await store.sync();
  const p1 = store.state.projects.find((p) => p.id === 'p1')!;
  // Large totals retain the active 10,000-tokens/coin base-coin conversion.
  assert.equal(p1.coins, 11500);
  assert.equal(p1.tokens, 115_000_000);

  // A later empty scan must not revert or inflate the per-project base coins.
  payload = [];
  await store.sync();
  const p1After = store.state.projects.find((p) => p.id === 'p1')!;
  assert.equal(p1After.coins, 11500, 'empty follow-up scan leaves base coins at the derived value');
  assert.equal(p1After.tokens, 115_000_000, 'monotonic token total preserved');
});

test('sync: setMode(demo) mints coins from the mock world without touching fetch', async () => {
  installLocalStorage();
  const store = new GameStore({
    fetchLive: async () => {
      throw new Error('demo mode must not fetch');
    },
  });
  store.setMode('demo');
  assert.equal(store.state.mode, 'demo');

  const r = await store.sync();
  assert.equal(r.source, 'demo');
  assert.ok(r.coinsMinted > 0);
  assert.ok(store.state.projects.length > 0);
  assert.ok(store.state.mockWorld !== null);
});

test('mode slots: demo progress never leaks into the live save', async () => {
  installLocalStorage();
  let payload: ProjectUsage[] = [{ id: 'p1', name: 'p1', provider: 'claude', tokens: 500000 }];
  const store = new GameStore({ fetchLive: async () => ({ source: 'live', projects: payload }) });
  await store.sync();
  assert.equal(store.state.coins, 50);

  store.setMode('demo');
  await store.sync(); // demo coins minted into the demo slot
  assert.ok(store.state.coins > 0);
  const demoCoins = store.state.coins;

  store.setMode('live');
  assert.equal(store.state.coins, 50); // live slot untouched by demo play
  assert.equal(store.state.mode, 'live');

  // And flipping back restores the demo slot.
  store.setMode('demo');
  assert.equal(store.state.coins, demoCoins);
});

test('P1A: choosing demo is explicit and a later live retry enters an isolated live slot', async () => {
  installLocalStorage();
  let payload: ProjectUsage[] = [];
  const store = new GameStore({ fetchLive: async () => ({ source: 'live', projects: payload }) });
  await store.sync();
  assert.equal(store.state.historyScan, 'no-history');

  const demo = await store.playDemoArcade();
  assert.equal(demo.source, 'demo');
  assert.equal(store.state.mode, 'demo');
  assert.ok(store.state.projects.length > 0);
  const demoCoins = store.state.coins;

  payload = [{ id: 'real', name: 'real', provider: 'codex', tokens: 500_000 }];
  const live = await store.tryLiveScan();
  assert.equal(live.source, 'live');
  assert.equal(store.state.mode, 'live');
  assert.equal(store.state.projects.length, 1);
  assert.equal(store.state.projects[0].id, 'real');
  assert.equal(store.state.historyScan, 'live-history');
  assert.equal(store.state.coins, 50);

  store.setMode('demo');
  assert.equal(store.state.coins, demoCoins);
  assert.ok(store.state.projects.some((p) => p.id !== 'real'));
});

// ---------------------------------------------------------------------------
// PULL
// ---------------------------------------------------------------------------

test('pull: a successful pull spends 25 coins and grants a collectible', async () => {
  installLocalStorage();
  const store = new GameStore({ fetchLive: liveWith([{ id: 'p1', name: 'p1', provider: 'claude', tokens: 500000 }]) });
  await store.sync(); // 50 coins (500,000 tokens / 10,000)

  const before = store.state.coins;
  const res = store.pull(1);
  assert.ok(res, 'pull should succeed with sufficient coins');
  assert.equal(res!.cost, 25);
  assert.equal(res!.results.length, 1);
  assert.equal(store.state.coins, before - 25);
  assert.equal(store.state.stats.pulls, 1);
  assert.ok(store.ownedCount() >= 1);
});

test('pull: insufficient coins returns null and mutates nothing', () => {
  installLocalStorage();
  const store = new GameStore();
  mut(store).coins = 5; // below PULL_COST (25)

  const res = store.pull(1);
  assert.equal(res, null);
  assert.equal(store.state.coins, 5); // unchanged
  assert.equal(store.state.stats.pulls, 0);
  assert.equal(store.ownedCount(), 0);
});

test('pull: pull(10) costs 225', () => {
  installLocalStorage();
  const store = new GameStore();
  mut(store).coins = 1000;

  const res = store.pull(10);
  assert.ok(res);
  assert.equal(res!.cost, 225); // PULL10_COST, not 25 * 10
  assert.equal(res!.results.length, 10);
  assert.equal(store.state.coins, 775);
});

test('pull: forcing Math.random gives a deterministic legendary; a duplicate adds shards', () => {
  installLocalStorage();
  const store = new GameStore();
  mut(store).coins = 100;

  const originalRandom = Math.random;
  try {
    // random() === 0 -> rarest tier (legendary) + first item in its pool (l_crown).
    Math.random = () => 0;

    const first = store.pull(1);
    assert.ok(first);
    assert.equal(first!.results[0].collectible.rarity, 'legendary');
    assert.equal(first!.results[0].collectible.id, 'l_crown');
    assert.equal(first!.results[0].isDup, false);
    assert.equal(first!.results[0].count, 1);
    assert.equal(store.state.shards, 0);

    // Pull the same forced item again -> duplicate.
    const second = store.pull(1);
    assert.ok(second);
    assert.equal(second!.results[0].collectible.id, 'l_crown');
    assert.equal(second!.results[0].isDup, true);
    assert.equal(second!.results[0].count, 2);
    assert.equal(store.state.stats.duplicates, 1);
    assert.equal(store.state.shards, 10); // legendary shard value
  } finally {
    Math.random = originalRandom;
  }
});

test('P1C pull: a ten-pull returns the crossed unique-collection milestone', () => {
  installLocalStorage();
  const store = new GameStore();
  grantOwned(store, COLLECTIBLES.filter((c) => c.rarity !== 'common').slice(0, 9).map((c) => c.id));
  mut(store).coins = 1000;

  const commonCount = COLLECTIBLES.filter((c) => c.rarity === 'common').length;
  let call = 0;
  const originalRandom = Math.random;
  Math.random = () => {
    const pairIndex = Math.floor(call++ / 2);
    return call % 2 === 1 ? 0.99 : (pairIndex + 0.1) / commonCount;
  };
  try {
    const result = store.pull(10)!;
    assert.equal(result.results.filter((outcome) => !outcome.isDup).length, 10);
    assert.deepEqual(result.milestones.map((m) => m.threshold), [10]);
    assert.equal(store.ownedCount(), 19);
  } finally {
    Math.random = originalRandom;
  }
});

test('P1C pull: a duplicate does not advance unique progress or unlock a milestone', () => {
  installLocalStorage();
  const store = new GameStore();
  grantOwned(store, [
    'l_crown',
    ...COLLECTIBLES.filter((c) => c.id !== 'l_crown').slice(0, 8).map((c) => c.id),
  ]);
  mut(store).coins = 100;
  const originalRandom = Math.random;
  Math.random = () => 0;
  try {
    const result = store.pull(1)!;
    assert.equal(result.results[0].collectible.id, 'l_crown');
    assert.equal(result.results[0].isDup, true);
    assert.deepEqual(result.milestones, []);
    assert.equal(store.ownedCount(), 9);
  } finally {
    Math.random = originalRandom;
  }
});

// ---------------------------------------------------------------------------
// BUY
// ---------------------------------------------------------------------------

test('buy: a grant item spends coins and adds a collectible of its pick type', () => {
  installLocalStorage();
  const store = new GameStore();
  const sign = SHOP.find((i) => i.id === 'sign')!; // kind 'grant', pick 'sign', cost 250
  assert.equal(sign.kind, 'grant');
  mut(store).coins = 500;

  const res = store.buy(sign);
  assert.ok(res, 'buy should succeed with enough coins');
  assert.equal(store.state.coins, 250); // 500 - 250
  assert.equal(res!.collectible.type, 'sign');
  assert.equal(res!.isDup, false);
  assert.equal(res!.count, 1);
  assert.ok(store.state.owned[res!.collectible.id]);
});

test('P1C buy: a newly granted item can cross a collection milestone', () => {
  installLocalStorage();
  const store = new GameStore();
  grantOwned(store, COLLECTIBLES.filter((c) => c.type !== 'sign').slice(0, 24).map((c) => c.id));
  mut(store).coins = 500;
  const sign = SHOP.find((i) => i.id === 'sign')!;
  const result = store.buy(sign)!;
  assert.equal(result.isDup, false);
  assert.deepEqual(result.milestones.map((m) => m.threshold), [25]);
  assert.equal(store.collectionMilestoneTier(), 2);
  assert.deepEqual(store.collectionMilestones().map((m) => m.threshold), [10, 25]);
});

test('P1C ownedCount ignores stale unknown IDs', () => {
  installLocalStorage();
  const store = new GameStore();
  grantOwned(store, COLLECTIBLES.slice(0, 9).map((c) => c.id));
  mut(store).owned.retired_prize = { count: 999, firstUnlocked: P1C_UNLOCKED_AT };
  assert.equal(store.ownedCount(), 9);
  assert.equal(store.collectionMilestoneTier(), 0);
});

test('P1C collection tiers remain isolated between live and demo slots', () => {
  installLocalStorage();
  const store = new GameStore();
  grantOwned(store, COLLECTIBLES.slice(0, 10).map((c) => c.id));
  store.save();
  assert.equal(store.collectionMilestoneTier(), 1);

  store.setMode('demo');
  assert.equal(store.collectionMilestoneTier(), 0);
  grantOwned(store, COLLECTIBLES.slice(0, 25).map((c) => c.id));
  store.save();
  assert.equal(store.collectionMilestoneTier(), 2);

  store.setMode('live');
  assert.equal(store.collectionMilestoneTier(), 1);
  assert.equal(store.ownedCount(), 10);
});

test('P2 next collection goal follows the current valid unique count', () => {
  installLocalStorage();
  const store = new GameStore();
  assert.equal(store.nextCollectionMilestone()?.milestone.threshold, 10);
  assert.equal(store.nextCollectionMilestone()?.remaining, 10);

  grantOwned(store, COLLECTIBLES.slice(0, 10).map((c) => c.id));
  assert.equal(store.nextCollectionMilestone()?.milestone.threshold, 25);
  assert.equal(store.nextCollectionMilestone()?.remaining, 15);

  grantOwned(store, COLLECTIBLES.map((c) => c.id));
  assert.equal(store.nextCollectionMilestone(), null);
});

// ---------------------------------------------------------------------------
// MISSING PRIZE EXCHANGE
// ---------------------------------------------------------------------------

test('missing-prize exchange: insufficient dust is a mutation-free, unsaved no-op', () => {
  installLocalStorage();
  const store = new GameStore();
  mut(store).shards = MISSING_PRIZE_DUST_COST - 1;
  const before = JSON.stringify(store.state);

  assert.equal(store.exchangeMissingPrize(), null);
  assert.equal(JSON.stringify(store.state), before);
  assert.equal(localStorage.getItem(SLOT_KEYS.live), null);
});

test('missing-prize exchange: selects a guaranteed new prize, spends exactly 120 dust, and persists', () => {
  installLocalStorage();
  const store = new GameStore();
  const alreadyOwned = COLLECTIBLES.slice(0, 2);
  grantOwned(store, alreadyOwned.map((c) => c.id));
  mut(store).shards = 200;
  const missing = COLLECTIBLES.filter((collectible) => !alreadyOwned.some((owned) => owned.id === collectible.id));
  const expected = missing[Math.floor(missing.length / 2)];
  const originalRandom = Math.random;
  Math.random = () => 0.5;
  try {
    const result = store.exchangeMissingPrize();
    assert.ok(result);
    assert.equal(result.collectible.id, expected.id);
    assert.equal(result.cost, MISSING_PRIZE_DUST_COST);
    assert.equal(result.shardsRemaining, 80);
    assert.equal(store.state.shards, 80);
    assert.equal(store.state.owned[expected.id].count, 1);
    assert.equal(Number.isNaN(Date.parse(store.state.owned[expected.id].firstUnlocked)), false);
    assert.equal(store.state.stats.duplicates, 0);

    const reloaded = new GameStore();
    assert.equal(reloaded.state.shards, 80);
    assert.deepEqual(reloaded.state.owned[expected.id], store.state.owned[expected.id]);
  } finally {
    Math.random = originalRandom;
  }
});

test('missing-prize exchange: grants the final missing legendary when it is the only prize left', () => {
  installLocalStorage();
  const store = new GameStore();
  const finalPrize = COLLECTIBLES[COLLECTIBLES.length - 1];
  assert.equal(finalPrize.rarity, 'legendary');
  grantOwned(store, COLLECTIBLES.slice(0, -1).map((c) => c.id));
  mut(store).shards = MISSING_PRIZE_DUST_COST;

  const result = store.exchangeMissingPrize();
  assert.ok(result);
  assert.equal(result.collectible.id, finalPrize.id);
  assert.equal(result.shardsRemaining, 0);
  assert.equal(store.state.owned[finalPrize.id].count, 1);
  assert.equal(store.ownedCount(), COLLECTIBLES.length);
});

test('missing-prize exchange: a complete collection is a mutation-free, unsaved no-op', () => {
  installLocalStorage();
  const store = new GameStore();
  grantOwned(store, COLLECTIBLES.map((c) => c.id));
  mut(store).shards = MISSING_PRIZE_DUST_COST;
  const before = JSON.stringify(store.state);

  assert.equal(store.exchangeMissingPrize(), null);
  assert.equal(JSON.stringify(store.state), before);
  assert.equal(localStorage.getItem(SLOT_KEYS.live), null);
});

test('missing-prize exchange: reports crossed collection milestones and achievements', () => {
  installLocalStorage();
  const store = new GameStore();
  grantOwned(store, COLLECTIBLES.slice(0, 9).map((c) => c.id));
  mut(store).shards = MISSING_PRIZE_DUST_COST;
  const originalRandom = Math.random;
  Math.random = () => 0;
  try {
    const result = store.exchangeMissingPrize();
    assert.ok(result);
    assert.equal(store.ownedCount(), 10);
    assert.deepEqual(result.milestones.map((milestone) => milestone.threshold), [10]);
    assert.equal(result.achievements.some((achievement) => achievement.id === 'wall_starter'), true);
  } finally {
    Math.random = originalRandom;
  }
});

test('buy: insufficient coins returns null', () => {
  installLocalStorage();
  const store = new GameStore();
  const sign = SHOP.find((i) => i.id === 'sign')!;
  mut(store).coins = 5;

  const res = store.buy(sign);
  assert.equal(res, null);
  assert.equal(store.state.coins, 5); // unchanged
  assert.equal(store.ownedCount(), 0);
});

test('buy: a capsule-kind item returns null (and does not spend)', () => {
  installLocalStorage();
  const store = new GameStore();
  const capsule = SHOP.find((i) => i.id === 'pull1')!; // kind 'capsule', cost 10
  assert.equal(capsule.kind, 'capsule');
  mut(store).coins = 500; // enough coins, so only the kind guard can reject it

  const res = store.buy(capsule);
  assert.equal(res, null);
  assert.equal(store.state.coins, 500); // untouched
});

test('P1B: cosmetic shop grants prefer unowned cosmetics and become complete without charging duplicates', () => {
  installLocalStorage();
  const store = new GameStore();
  const theme = SHOP.find((i) => i.id === 'theme')!;
  const frame = SHOP.find((i) => i.id === 'frame')!;
  mut(store).coins = 10_000;

  const firstTheme = store.buy(theme);
  const secondTheme = store.buy(theme);
  assert.ok(firstTheme && secondTheme);
  assert.equal(firstTheme!.collectible.type, 'theme');
  assert.equal(secondTheme!.collectible.type, 'theme');
  assert.notEqual(firstTheme!.collectible.id, secondTheme!.collectible.id);
  assert.equal(store.isGrantComplete(theme), true);
  const coinsAfterThemes = store.state.coins;
  assert.equal(store.buy(theme), null);
  assert.equal(store.state.coins, coinsAfterThemes, 'complete theme card cannot spend coins for a duplicate');

  const firstFrame = store.buy(frame);
  assert.ok(firstFrame);
  assert.equal(firstFrame!.collectible.id, 'r_frame');
  assert.equal(store.isGrantComplete(frame), true);
  const coinsAfterFrame = store.state.coins;
  assert.equal(store.buy(frame), null);
  assert.equal(store.state.coins, coinsAfterFrame, 'complete frame card cannot spend coins for a duplicate');
});

test('P1B: equipped cosmetics persist per slot and require ownership', () => {
  installLocalStorage();
  const store = new GameStore();
  assert.equal(store.equipRoomTheme('e_sunset'), false);
  assert.equal(store.equipProfileFrame('r_frame'), false);

  mut(store).owned.e_sunset = { count: 1, firstUnlocked: '2026-07-10T00:00:00.000Z' };
  mut(store).owned.r_frame = { count: 1, firstUnlocked: '2026-07-10T00:00:00.000Z' };
  assert.equal(store.equipRoomTheme('e_sunset'), true);
  assert.equal(store.equipProfileFrame('r_frame'), true);
  assert.deepEqual(store.state.cosmetics, { roomTheme: 'e_sunset', profileFrame: 'r_frame' });

  const reloaded = new GameStore();
  assert.deepEqual(reloaded.state.cosmetics, { roomTheme: 'e_sunset', profileFrame: 'r_frame' });
  reloaded.setMode('demo');
  assert.deepEqual(reloaded.state.cosmetics, { roomTheme: 'base', profileFrame: 'base' });
  mut(reloaded).owned.l_forest = { count: 1, firstUnlocked: '2026-07-10T00:00:00.000Z' };
  assert.equal(reloaded.equipRoomTheme('l_forest'), true);
  reloaded.setMode('live');
  assert.deepEqual(reloaded.state.cosmetics, { roomTheme: 'e_sunset', profileFrame: 'r_frame' });
});

// ---------------------------------------------------------------------------
// ACHIEVEMENTS
// ---------------------------------------------------------------------------

test('achievements: first_coin + million unlock and re-checking is idempotent', async () => {
  installLocalStorage();
  // 1,200,000 tokens -> lifetimeTokens crosses the 1M threshold in one sync.
  const store = new GameStore({ fetchLive: liveWith([{ id: 'p1', name: 'p1', provider: 'claude', tokens: 1200000 }]) });

  const r = await store.sync();
  const unlockedIds = r.achievements.map((a) => a.id);
  assert.ok(unlockedIds.includes('first_coin'));
  assert.ok(unlockedIds.includes('million'));

  assert.ok(store.state.achievements['first_coin']);
  assert.ok(store.state.achievements['million']);

  // Re-checking should not unlock anything new (no duplicates).
  const again = store.checkAchievements();
  assert.deepEqual(again, []);
});

// ---------------------------------------------------------------------------
// PERSISTENCE ROUND-TRIP THROUGH A NEW STORE
// ---------------------------------------------------------------------------

test('persistence: a new GameStore loads identical state after sync + pull', async () => {
  installLocalStorage(); // one storage shared by both stores
  const fetchStub = liveWith([{ id: 'p1', name: 'p1', provider: 'claude', tokens: 500000 }]);

  const store = new GameStore({ fetchLive: fetchStub });
  await store.sync();
  store.pull(1);

  const expectedCoins = store.state.coins;
  const expectedOwned = store.ownedCount();
  const expectedProjects = store.state.projects.length;
  const expectedStats = store.state.stats;

  const reloaded = new GameStore({ fetchLive: fetchStub }); // reads the same localStorage
  assert.equal(reloaded.state.coins, expectedCoins);
  assert.equal(reloaded.ownedCount(), expectedOwned);
  assert.equal(reloaded.state.projects.length, expectedProjects);
  assert.deepEqual(reloaded.state.stats, expectedStats);
});

test('room decorations: a custom arrangement is sanitized, saved and restored', () => {
  installLocalStorage();
  const store = new GameStore();
  grantOwned(store, ['c_gg', 'c_mug']);
  store.setRoomDecorations([
    { collectibleId: 'c_gg', zone: 'wall', x: 0.333, y: 0.677 },
    { collectibleId: 'c_mug', zone: 'wall', x: 0.5, y: 0.5 },
    { collectibleId: 'not_owned', zone: 'floor', x: 0.5, y: 0.5 },
  ]);

  assert.deepEqual(store.state.roomDecorations, [
    { collectibleId: 'c_gg', zone: 'wall', x: 0.325, y: 0.675 },
  ]);
  assert.deepEqual(new GameStore().state.roomDecorations, store.state.roomDecorations);
});

test('room decorations: null restores automatic mode and an empty array remains an intentional empty room', () => {
  installLocalStorage();
  const store = new GameStore();
  grantOwned(store, ['c_gg']);
  store.setRoomDecorations([]);
  assert.deepEqual(store.state.roomDecorations, []);
  store.setRoomDecorations(null);
  assert.equal(store.state.roomDecorations, null);
});

// ---------------------------------------------------------------------------
// RESET
// ---------------------------------------------------------------------------

test('reset: clears the current slot so a new store loads fresh', async () => {
  installLocalStorage();
  const store = new GameStore({ fetchLive: liveWith([{ id: 'p1', name: 'p1', provider: 'claude', tokens: 500000 }]) });
  await store.sync();
  store.pull(1);
  assert.ok(store.state.coins > 0);

  store.reset();
  assert.equal(store.state.coins, 0);
  assert.deepEqual(store.state.owned, {});
  assert.deepEqual(store.state.projects, []);
  assert.equal(store.state.mode, 'live'); // reset keeps the mode

  const reloaded = new GameStore();
  assert.equal(reloaded.state.coins, 0);
  assert.deepEqual(reloaded.state.projects, []);
  assert.equal(reloaded.state.mode, 'live');
});

// ---------------------------------------------------------------------------
// MULTI-TAB — another tab's save must not be clobbered by our stale state
// ---------------------------------------------------------------------------

test('multi-tab: adopting another tab\'s slot write prevents last-writer-wins coin loss', async () => {
  installLocalStorage(); // both "tabs" share this storage
  const fireStorage = installStorageEvents();
  try {
    const payload: ProjectUsage[] = [{ id: 'p1', name: 'p1', provider: 'claude', tokens: 500000 }];

    // Tab A boots and earns 50 coins.
    const tabA = new GameStore({ fetchLive: async () => ({ source: 'live', projects: payload }) });
    await tabA.sync();
    assert.equal(tabA.state.coins, 50);

    // Tab B boots from the same save, spends 25 coins on a pull, and saves.
    const tabB = new GameStore({ fetchLive: async () => ({ source: 'live', projects: payload }) });
    assert.equal(tabB.state.coins, 50);
    tabB.pull(1);
    assert.equal(tabB.state.coins, 25);

    // The browser notifies tab A of tab B's write; tab A adopts the new state
    // instead of holding a stale 50-coin copy.
    fireStorage(SLOT_KEYS.live);
    assert.equal(tabA.state.coins, 25);
    assert.equal(tabA.ownedCount(), 1);

    // Tab A's next save now writes the adopted state — B's pull isn't undone.
    tabA.save();
    const reloaded = new GameStore({ fetchLive: async () => ({ source: 'live', projects: payload }) });
    assert.equal(reloaded.state.coins, 25);
    assert.equal(reloaded.ownedCount(), 1);
  } finally {
    delete (globalThis as Record<string, unknown>).window;
  }
});

// ---------------------------------------------------------------------------
// playerLevel()
// ---------------------------------------------------------------------------

test('playerLevel: reports a valid level that grows with coinsEarned', () => {
  installLocalStorage();
  const low = new GameStore();
  const lowLevel = low.playerLevel();
  assert.ok(lowLevel.level >= 1);
  assert.ok(lowLevel.need > 0);
  assert.equal(lowLevel.into, 0);
  assert.equal(lowLevel.level, 1); // fresh store: 0 coins earned

  installLocalStorage();
  const high = new GameStore();
  mut(high).stats.coinsEarned = 5000;
  const highLevel = high.playerLevel();
  assert.ok(highLevel.level > lowLevel.level);
  assert.ok(highLevel.need > 0);
});
