import { test } from 'node:test';
import assert from 'node:assert/strict';

import { fetchLive } from '../../src/data/liveSource';
import { stubFetch, stubFetchReject } from '../helpers';

test('fetchLive: maps projects, floors/clamps tokens, and fills id/provider defaults', async () => {
  stubFetch({
    source: 'local',
    projects: [
      { id: 'a', name: 'A', provider: 'claude', tokens: 1234 },
      { name: 'B', tokens: -5 },
    ],
    totals: { projects: 2, tokens: 1229 },
  });

  const result = await fetchLive();

  assert.equal(result.source, 'local');
  assert.deepEqual(result.totals, { projects: 2, tokens: 1229 });
  assert.equal(result.projects.length, 2);

  // Fully-specified project passes through untouched.
  assert.deepEqual(result.projects[0], { id: 'a', name: 'A', provider: 'claude', tokens: 1234 });

  // Missing id falls back to name; missing provider defaults to 'claude';
  // negative tokens are floored + clamped to 0.
  const b = result.projects[1];
  assert.equal(b.id, 'B', 'missing id should fall back to name');
  assert.equal(b.name, 'B');
  assert.equal(b.provider, 'claude', 'missing provider should default to claude');
  assert.equal(b.tokens, 0, 'negative tokens should clamp to 0');
});

test('fetchLive: floors fractional token counts', async () => {
  stubFetch({
    source: 'local',
    projects: [{ id: 'f', name: 'F', provider: 'codex', tokens: 99.9 }],
  });

  const result = await fetchLive();
  assert.equal(result.projects[0].tokens, 99, 'fractional tokens should floor');
});

test('fetchLive: empty projects list returns an empty array without throwing', async () => {
  stubFetch({ projects: [] });

  const result = await fetchLive();
  assert.ok(Array.isArray(result.projects), 'projects not an array');
  assert.deepEqual(result.projects, []);
});

test('fetchLive: a rejected fetch resolves to the error shape (no throw)', async () => {
  stubFetchReject();

  let result: Awaited<ReturnType<typeof fetchLive>> | undefined;
  await assert.doesNotReject(async () => {
    result = await fetchLive();
  });

  assert.ok(result, 'fetchLive returned nothing');
  assert.equal(result!.source, 'error');
  assert.deepEqual(result!.projects, []);
  // The catch branch stringifies the thrown error into `error`.
  assert.equal(typeof result!.error, 'string');
});
