import { test } from 'node:test';
import assert from 'node:assert/strict';

import { seedMock, advanceMock, NAME_POOL } from '../../src/data/mockSource';

function totalTokens(world: { projects: { tokens: number }[] }): number {
  return world.projects.reduce((sum, p) => sum + p.tokens, 0);
}

function tokensById(world: { projects: { id: string; tokens: number }[] }): Map<string, number> {
  const m = new Map<string, number>();
  for (const p of world.projects) m.set(p.id, p.tokens);
  return m;
}

// ---- seedMock -------------------------------------------------------------

test('seedMock: returns a world with exactly 6 projects', () => {
  const world = seedMock();
  assert.ok(world && Array.isArray(world.projects), 'world.projects not an array');
  assert.equal(world.projects.length, 6);
});

test('seedMock: every project has id, name, provider, and positive tokens', () => {
  const world = seedMock();
  for (const p of world.projects) {
    assert.equal(typeof p.id, 'string', 'project id not a string');
    assert.ok(p.id.length > 0, 'project id empty');
    assert.equal(typeof p.name, 'string', 'project name not a string');
    assert.ok(p.name.length > 0, 'project name empty');
    assert.equal(typeof p.provider, 'string', 'project provider not a string');
    assert.ok(p.provider.length > 0, 'project provider empty');
    assert.equal(typeof p.tokens, 'number', 'project tokens not a number');
    assert.ok(p.tokens > 0, `project ${p.id} tokens not > 0`);
  }
});

test('seedMock: project ids are unique', () => {
  const world = seedMock();
  const ids = world.projects.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate project id in seed');
});

// ---- advanceMock ----------------------------------------------------------

test('advanceMock: a single call strictly increases the total token sum', () => {
  const world = seedMock();
  const before = totalTokens(world);
  advanceMock(world);
  const after = totalTokens(world);
  assert.ok(after > before, `total did not increase: ${before} -> ${after}`);
});

test('advanceMock: no individual project ever loses tokens in one call', () => {
  const world = seedMock();
  const before = tokensById(world);
  advanceMock(world);
  for (const p of world.projects) {
    const prev = before.get(p.id);
    if (prev !== undefined) {
      assert.ok(p.tokens >= prev, `project ${p.id} decreased: ${prev} -> ${p.tokens}`);
    }
  }
});

test('advanceMock: passing null returns a freshly seeded+advanced world', () => {
  const world = advanceMock(null);
  assert.ok(world && Array.isArray(world.projects), 'null advance did not seed');
  assert.ok(world.projects.length >= 6, 'null advance produced < 6 projects');
});

test('advanceMock: over many calls, totals grow, per-project never decreases, count stays 6..9', () => {
  const world = seedMock();
  assert.equal(world.projects.length, 6);

  for (let i = 0; i < 50; i++) {
    const beforeTotal = totalTokens(world);
    const beforeById = tokensById(world);
    const beforeCount = world.projects.length;

    advanceMock(world);

    // Total strictly grows every call (at least one bump of >= 4000).
    const afterTotal = totalTokens(world);
    assert.ok(afterTotal > beforeTotal, `iter ${i}: total not growing (${beforeTotal} -> ${afterTotal})`);

    // Per-project tokens are monotonic non-decreasing.
    for (const p of world.projects) {
      const prev = beforeById.get(p.id);
      if (prev !== undefined) {
        assert.ok(p.tokens >= prev, `iter ${i}: project ${p.id} decreased (${prev} -> ${p.tokens})`);
      }
    }

    // Count only ever stays the same or grows by one, and never exceeds 9.
    assert.ok(world.projects.length >= beforeCount, `iter ${i}: project count shrank`);
    assert.ok(world.projects.length <= 9, `iter ${i}: project count exceeded 9`);
    assert.ok(world.projects.length >= 6, `iter ${i}: project count dropped below 6`);

    // Ids remain unique even as new cabinets appear.
    const ids = world.projects.map((p) => p.id);
    assert.equal(new Set(ids).size, ids.length, `iter ${i}: duplicate project id`);
  }
});

// ---- NAME_POOL ------------------------------------------------------------

test('NAME_POOL: is a non-empty array of strings', () => {
  assert.ok(Array.isArray(NAME_POOL), 'NAME_POOL not an array');
  assert.ok(NAME_POOL.length > 0, 'NAME_POOL is empty');
  for (const n of NAME_POOL) {
    assert.equal(typeof n, 'string', 'NAME_POOL entry not a string');
    assert.ok(n.length > 0, 'NAME_POOL entry empty');
  }
});
