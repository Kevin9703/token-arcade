import { test } from 'node:test';
import assert from 'node:assert/strict';

import { computeSync } from '../../src/domain/sync';
import type { SyncSlice } from '../../src/domain/sync';
import type { ProjectUsage } from '../../src/core/types';

function emptySlice(): SyncSlice {
  return { projects: [], lastTotals: {}, coinResidue: 0 };
}

function usage(id: string, tokens: number, legacyId?: string): ProjectUsage {
  return { id, name: id, provider: 'claude', tokens, legacyId };
}

test('computeSync: pure — inputs are not mutated', () => {
  const slice: SyncSlice = {
    projects: [{ id: 'a', name: 'a', provider: 'claude', tokens: 20000, level: 2, coins: 2 }],
    lastTotals: { a: 20000 },
    coinResidue: 500,
  };
  const snapshot = JSON.parse(JSON.stringify(slice));
  computeSync(slice, [usage('a', 45000)]);
  assert.deepEqual(slice, snapshot);
});

test('computeSync: first sync mints at base rate and seeds baselines', () => {
  const c = computeSync(emptySlice(), [usage('a', 500000), usage('b', 300000)]);
  assert.equal(c.newTokens, 800000);
  assert.equal(c.coinsMinted, 80);
  assert.equal(c.ticketsAwarded, 1);
  assert.equal(c.lastTotals.a, 500000);
  assert.equal(c.projects.length, 2);
  assert.equal(c.projects[0].id, 'a'); // sorted by tokens desc
  assert.ok(c.perProject.every((p) => p.isNew));
});

test('computeSync: identical totals mint zero', () => {
  const first = computeSync(emptySlice(), [usage('a', 500000)]);
  const again = computeSync(
    { projects: first.projects, lastTotals: first.lastTotals, coinResidue: first.coinResidue },
    [usage('a', 500000)],
  );
  assert.equal(again.coinsMinted, 0);
  assert.equal(again.newTokens, 0);
  assert.equal(again.perProject.length, 0);
});

test('computeSync: legacyId renames the baseline and project without re-minting', () => {
  const first = computeSync(emptySlice(), [usage('old-name', 500000)]);
  assert.equal(first.coinsMinted, 50);

  // Server switches to path-hash ids; same project, same totals, new id.
  const renamed = computeSync(
    { projects: first.projects, lastTotals: first.lastTotals, coinResidue: first.coinResidue },
    [usage('p1abc', 500000, 'old-name')],
  );
  assert.equal(renamed.coinsMinted, 0, 'rename must not re-mint');
  assert.equal(renamed.newTokens, 0);
  assert.equal(renamed.projects.length, 1);
  assert.equal(renamed.projects[0].id, 'p1abc');
  assert.equal(renamed.lastTotals['p1abc'], 500000);
  assert.equal('old-name' in renamed.lastTotals, false, 'legacy baseline pruned');

  // And gains after the rename count normally.
  const grown = computeSync(
    { projects: renamed.projects, lastTotals: renamed.lastTotals, coinResidue: renamed.coinResidue },
    [usage('p1abc', 520000, 'old-name')],
  );
  assert.equal(grown.newTokens, 20000);
  assert.equal(grown.coinsMinted, 2);
});

test('computeSync: shrunken totals keep the high-water mark and mint nothing', () => {
  const first = computeSync(emptySlice(), [usage('a', 500000)]);
  const shrunk = computeSync(
    { projects: first.projects, lastTotals: first.lastTotals, coinResidue: first.coinResidue },
    [usage('a', 100000)],
  );
  assert.equal(shrunk.coinsMinted, 0);
  assert.equal(shrunk.projects[0].tokens, 500000); // monotonic
  assert.equal(shrunk.projects[0].level, first.projects[0].level);
  // Diff baseline follows the RAW report so future gains count from 100k.
  assert.equal(shrunk.lastTotals.a, 100000);
});

test('computeSync: residue carries and higher levels boost future gains', () => {
  const first = computeSync({ ...emptySlice(), coinResidue: 0 }, [usage('a', 5007500)]);
  assert.equal(first.coinsMinted, 500);
  assert.equal(first.coinResidue, 7500);

  // Level 16 multiplier ≈ 1.15306: round(25000 * 1.15306) = 28827 effective;
  // 7500 + 28827 = 36327 -> 3 coins, residue 6327.
  const second = computeSync(
    { projects: first.projects, lastTotals: first.lastTotals, coinResidue: first.coinResidue },
    [usage('a', 5032500)],
  );
  assert.equal(second.newTokens, 25000);
  assert.equal(second.coinsMinted, 3);
  assert.equal(second.coinResidue, 6327);
});

test('computeSync: a project missing from the report is kept untouched', () => {
  const first = computeSync(emptySlice(), [usage('a', 500000), usage('b', 300000)]);
  const partial = computeSync(
    { projects: first.projects, lastTotals: first.lastTotals, coinResidue: first.coinResidue },
    [usage('a', 510000)], // b absent this scan
  );
  const b = partial.projects.find((p) => p.id === 'b');
  assert.ok(b, 'missing project is not dropped');
  assert.equal(b!.tokens, 300000);
  assert.equal(partial.lastTotals.b, 300000, 'its baseline survives for the next scan');
});
