import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  autoArrangeRoomDecorations,
  resolveRoomDecorations,
  roomDecorationCollectibles,
  sanitizeRoomDecorations,
} from '../../src/domain/roomDecorations';
import type { OwnedEntry, RoomDecorationPlacement } from '../../src/core/types';

const EARLY = '2026-01-01T00:00:00.000Z';
const LATE = '2026-07-01T00:00:00.000Z';

function owned(entries: Array<[string, string]>): Record<string, OwnedEntry> {
  return Object.fromEntries(entries.map(([id, firstUnlocked]) => [id, { count: 1, firstUnlocked }]));
}

test('automatic layout chooses the newest owned prize in each display family', () => {
  const map = owned([
    ['c_gg', EARLY],
    ['u_1up', LATE],
    ['c_mug', LATE],
    ['r_cat', LATE],
    ['e_trophy', LATE],
    ['c_smiley', LATE],
    ['r_frame', LATE],
    ['e_sunset', LATE],
  ]);

  assert.deepEqual(autoArrangeRoomDecorations(map).map((placement) => [placement.collectibleId, placement.zone]), [
    ['u_1up', 'wall'],
    ['r_cat', 'buddy'],
    ['c_mug', 'floor'],
    ['e_trophy', 'floor'],
    ['c_smiley', 'wall'],
  ]);
});

test('sanitizer clamps, magnetically aligns and rejects incompatible or stale entries', () => {
  const map = owned([['c_gg', LATE], ['c_mug', LATE], ['r_cat', LATE]]);
  const raw: RoomDecorationPlacement[] = [
    { collectibleId: 'c_gg', zone: 'wall', x: 1.4, y: 0.333 },
    { collectibleId: 'c_gg', zone: 'wall', x: 0.2, y: 0.2 },
    { collectibleId: 'c_mug', zone: 'wall', x: 0.5, y: 0.5 },
    { collectibleId: 'r_cat', zone: 'buddy', x: Number.NaN, y: 0.5 },
    { collectibleId: 'retired_prize', zone: 'floor', x: 0.5, y: 0.5 },
  ];

  assert.deepEqual(sanitizeRoomDecorations(map, raw), [
    { collectibleId: 'c_gg', zone: 'wall', x: 1, y: 0.325 },
  ]);
});

test('a custom empty layout remains empty while null resolves to automatic', () => {
  const map = owned([['c_gg', LATE]]);
  assert.deepEqual(resolveRoomDecorations(map, []), []);
  assert.equal(resolveRoomDecorations(map, null)[0]?.collectibleId, 'c_gg');
});

test('inventory only exposes owned prizes that can physically decorate the room', () => {
  const map = owned([['c_gg', LATE], ['r_frame', LATE], ['e_sunset', LATE], ['e_trophy', LATE]]);
  assert.deepEqual(roomDecorationCollectibles(map).map((collectible) => collectible.id), ['c_gg', 'e_trophy']);
});
