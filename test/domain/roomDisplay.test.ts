import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  ROOM_DISPLAY_CATEGORIES,
  selectRoomDisplays,
  type RoomDisplayOwnedMap,
} from '../../src/domain/roomDisplay';
import type { OwnedEntry } from '../../src/core/types';

const EARLY = '2026-01-01T00:00:00.000Z';
const LATE = '2026-07-01T00:00:00.000Z';

function owned(entries: Array<[string, string, number?]>): Record<string, OwnedEntry> {
  return Object.fromEntries(
    entries.map(([id, firstUnlocked, count = 1]) => [id, { count, firstUnlocked }]),
  );
}

test('declares the supported categories in stable Home rendering order', () => {
  assert.deepEqual(ROOM_DISPLAY_CATEGORIES, ['sign', 'buddy', 'decor', 'trophy', 'badge']);
});

test('returns an empty display for an empty owned map', () => {
  assert.deepEqual(selectRoomDisplays({}), []);
});

test('filters unsupported collectible categories and returns at most one per category', () => {
  const result = selectRoomDisplays(owned([
    ['e_sunset', LATE],
    ['r_frame', LATE],
    ['c_gg', EARLY],
    ['u_1up', LATE],
    ['c_smiley', LATE],
  ]));

  assert.deepEqual(result.map(({ category, collectible }) => [category, collectible.id]), [
    ['sign', 'u_1up'],
    ['badge', 'c_smiley'],
  ]);
  assert.equal(new Set(result.map(({ category }) => category)).size, result.length);
});

test('selects the most recently first-unlocked collectible in every category', () => {
  const result = selectRoomDisplays(owned([
    ['l_crown', LATE],
    ['c_smiley', EARLY],
    ['e_trophy', LATE],
    ['l_trophy', EARLY],
    ['r_palm', LATE],
    ['c_mug', EARLY],
    ['r_cat', EARLY],
    ['e_astro', LATE],
    ['c_gg', LATE],
    ['r_gameover', EARLY],
  ]));

  assert.deepEqual(result.map(({ category, collectible }) => [category, collectible.id]), [
    ['sign', 'c_gg'],
    ['buddy', 'e_astro'],
    ['decor', 'r_palm'],
    ['trophy', 'e_trophy'],
    ['badge', 'l_crown'],
  ]);
});

test('ignores non-positive or invalid counts and stale catalog ids', () => {
  const malformed: RoomDisplayOwnedMap = {
    c_gg: { count: 0, firstUnlocked: LATE },
    u_1up: { count: -3, firstUnlocked: LATE },
    r_gameover: { count: Number.NaN, firstUnlocked: LATE },
    c_smiley: { count: 1, firstUnlocked: EARLY },
    retired_trophy: { count: 10, firstUnlocked: LATE },
    missing_entry: null,
  };

  assert.deepEqual(selectRoomDisplays(malformed).map(({ collectible }) => collectible.id), [
    'c_smiley',
  ]);
});

test('invalid or missing dates rank behind valid dates without throwing', () => {
  const malformed: RoomDisplayOwnedMap = {
    c_gg: { count: 1 },
    u_1up: { count: 1, firstUnlocked: 'definitely-not-a-date' },
    r_gameover: { count: 1, firstUnlocked: EARLY },
    c_mug: { count: 1, firstUnlocked: null },
  };

  assert.deepEqual(selectRoomDisplays(malformed).map(({ category, collectible }) => [
    category,
    collectible.id,
  ]), [
    ['sign', 'r_gameover'],
    ['decor', 'c_mug'],
  ]);
});

test('equal timestamps use catalog order regardless of owned-map insertion order', () => {
  const forward = selectRoomDisplays(owned([
    ['c_gg', LATE],
    ['u_1up', LATE],
  ]));
  const reverse = selectRoomDisplays(owned([
    ['u_1up', LATE],
    ['c_gg', LATE],
  ]));

  assert.equal(forward[0]?.collectible.id, 'c_gg');
  assert.deepEqual(reverse, forward);
});
