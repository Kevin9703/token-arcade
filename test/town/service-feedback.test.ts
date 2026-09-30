import test from 'node:test';
import assert from 'node:assert/strict';
import { buildingCoverage, needFeedback, progressHint } from '../../src/town/service-feedback';
import { evaluate, key, makeBuilding, starterBoard } from '../../src/town/world';
import type { Board } from '../../src/town/types';

function street(): Board {
  return { size: 24, terrain: 'meadow', buildings: [makeBuilding('hall', 'hall', 18, 4, 2), makeBuilding('bakery', 'bakery', 1, 4, 2)], roads: Array.from({ length: 19 }, (_, x) => key(x + 1, 3)) };
}

test('bakery feedback and road overlay agree at eight and nine road steps', () => {
  const board = street(), atEight = makeBuilding('eight', 'house', 9, 4, 2), atNine = makeBuilding('nine', 'house', 9, 1);
  board.buildings.push(atEight, atNine);
  const e = evaluate(board), coverage = buildingCoverage(board, e, board.buildings[1]);
  assert.equal(e.food, 1); assert.equal(e.buildings.eight.foodDistance, 8);
  assert.equal(coverage.homes.filter(h => h.served).length, 1);
  assert.ok(coverage.cells.some(p => p.x === 9 && p.z === 3));
  assert.ok(!coverage.cells.some(p => p.x === 10 && p.z === 3));
  assert.match(needFeedback(board, e, atNine, 'food'), /需走 9 格，超过 8 格/);
  board.roads = board.roads.filter(p => p !== key(12, 3));
  const disconnected = evaluate(board);
  assert.equal(disconnected.food, 0); assert.equal(buildingCoverage(board, disconnected, board.buildings[1]).cells.length, 0);
  assert.match(needFeedback(board, disconnected, atEight, 'food'), /住宅门口.*未连/);
});

test('capacity diagnosis distinguishes eligible homes from the six actually served', () => {
  const board = street();
  board.buildings.push(...[3, 5, 7, 9].map((x, i) => makeBuilding(`lower-${i}`, 'house', x, 4, 2)), ...[2, 4, 6].map((x, i) => makeBuilding(`upper-${i}`, 'house', x, 1)));
  const e = evaluate(board), coverage = buildingCoverage(board, e, board.buildings[1]);
  assert.equal(coverage.homes.length, 7); assert.equal(e.food, 6); assert.equal(coverage.homes.filter(h => h.served).length, 6);
  const unserved = board.buildings.find(b => b.kind === 'house' && !e.buildings[b.id].food)!;
  assert.match(needFeedback(board, e, unserved, 'food'), /容量已满/);
  board.buildings.push(makeBuilding('bakery-two', 'bakery', 11, 4, 2));
  const expanded = evaluate(board); assert.equal(expanded.food, 7);
  assert.match(needFeedback(board, expanded, unserved, 'food'), /步行/);
  board.buildings.push(makeBuilding('bakery-three', 'bakery', 13, 4, 2));
  assert.equal(evaluate(board).food, 7, 'duplicate service never adds another unit for an existing home');
});

test('park area and green home frames require both entrances to be connected', () => {
  const board = street(), home = makeBuilding('home', 'house', 4, 4, 2), park = makeBuilding('park', 'park', 4, 8, 2);
  board.buildings.push(home, park);
  board.roads.push(...[4, 5, 6, 7, 8].map(z => key(3, z)), key(4, 7), key(4, 8));
  let e = evaluate(board), coverage = buildingCoverage(board, e, park);
  assert.equal(e.green, 1); assert.equal(coverage.homes[0].distance, 3); assert.equal(coverage.homes[0].served, true);
  assert.ok(coverage.cells.some(p => p.x === 4 && p.z === 5));
  assert.ok(!coverage.cells.some(p => p.x === 4 && p.z === 4));
  home.rotation = 0; e = evaluate(board); coverage = buildingCoverage(board, e, park);
  assert.equal(coverage.active, true); assert.equal(coverage.homes[0].served, false); assert.equal(e.green, 0);
  assert.match(needFeedback(board, e, home, 'green'), /住宅门口.*未连/);
  home.rotation = 2;
  park.rotation = 0; e = evaluate(board); coverage = buildingCoverage(board, e, park);
  assert.equal(e.green, 0); assert.equal(coverage.active, false); assert.equal(coverage.cells.length, 0); assert.equal(coverage.homes[0].served, false);
  assert.match(needFeedback(board, e, home, 'green'), /附近公园入口尚未连路/);
  park.rotation = 2; park.z = 9; e = evaluate(board);
  assert.equal(e.buildings.park.connected, true); assert.equal(e.green, 0);
  assert.match(needFeedback(board, e, home, 'green'), /距离 4 格/);
});

test('multiple parks count unique residential beneficiaries and ignore stored parks', () => {
  const board = street(), park = makeBuilding('park-a', 'park', 3, 8, 2);
  board.buildings.push(makeBuilding('home', 'house', 4, 4, 2), park, makeBuilding('park-b', 'park', 5, 8, 2));
  board.roads.push(...[4, 5, 6, 7].map(z => key(7, z)), ...[3, 4, 5, 6].map(x => key(x, 7)));
  let e = evaluate(board); assert.equal(e.green, 1);
  assert.equal(buildingCoverage(board, e, park).homes.filter(h => h.served).length, 1);
  assert.equal(buildingCoverage(board, e, board.buildings.at(-1)!).homes.filter(h => h.served).length, 1);
  park.placed = false; board.buildings.at(-1)!.placed = false;
  e = evaluate(board); assert.equal(e.green, 0); assert.equal(buildingCoverage(board, e, park).homes.length, 0);
});

test('chapter two tells four serviced homes to add housing rather than more shops', () => {
  const board = starterBoard(); board.roads.push(key(6, 17));
  board.buildings.push(makeBuilding('extra-bakery', 'bakery', 8, 21, 2), makeBuilding('workshop', 'workshop', 3, 21));
  const e = evaluate(board); assert.equal(e.food, 4);
  assert.match(progressHint(2, board, e), /已摆放 4 栋住宅，还需至少 2 栋/);
  const before = JSON.stringify(board); buildingCoverage(board, e, board.buildings[5]); needFeedback(board, e, board.buildings[1], 'green');
  assert.equal(JSON.stringify(board), before, 'feedback never changes a save or layout');
});
