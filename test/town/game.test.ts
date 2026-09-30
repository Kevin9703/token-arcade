import test from 'node:test';
import assert from 'node:assert/strict';
import { installLocalStorage } from '../helpers';
import { TownStore, freshTown, syncTown, parseTown, settleSubsidy, TOWN_KEYS } from '../../src/town/store';
import { canPlace, dimensions, entrance, evaluate, key, makeBuilding, starsForChapter, chapterGoals, cells, unlocked } from '../../src/town/world';
import { PUZZLES, puzzleGoals, puzzleStars } from '../../src/town/puzzles';
import type { Board, TownState } from '../../src/town/types';
import { CATALOG } from '../../src/town/catalog';

const usage = (tokens: number, id = 'project') => [{ id, name: '河谷项目', provider: 'codex', tokens }];
test('new town never touches old arcade storage and starts with the authored kit', () => {
  installLocalStorage(); localStorage.setItem('tokenArcade.slot.live.v1', 'old-save');
  const store = new TownStore('live'); assert.equal(store.state.coins, 0); assert.equal(store.board.buildings.length, 7);
  assert.equal(evaluate(store.board).food, 0); assert.equal(store.road(6, 17), null); assert.equal(evaluate(store.board).food, 4);
  assert.equal(starsForChapter(1, evaluate(store.board)), 3);
  assert.equal(localStorage.getItem('tokenArcade.slot.live.v1'), 'old-save'); assert.ok(parseTown(JSON.stringify(store.state), 'live'));
});
test('token high-water prevents duplicate money even after history shrinks and returns', () => {
  const s = freshTown('live'); assert.equal(syncTown(s, usage(7500)).coins, 0); assert.equal(syncTown(s, usage(12500)).coins, 1); assert.equal(s.residue, 2500);
  assert.equal(syncTown(s, usage(12500)).coins, 0); assert.equal(syncTown(s, usage(100)).newTokens, 0);
  assert.equal(syncTown(s, usage(12500)).newTokens, 0); assert.equal(syncTown(s, usage(22500)).coins, 1); assert.equal(s.coins, 2); assert.equal(s.projects[0].tokens, 22500);
});
test('high-level projects have no coin multiplier and duplicate IDs are not rewarded twice', () => {
  const s = freshTown('live'); syncTown(s, usage(500_000_000));
  const result = syncTown(s, [...usage(500_100_000), ...usage(500_100_000)]); assert.equal(result.coins, 10); assert.equal(result.newTokens, 100000); assert.equal(s.town.buildings.filter(b => b.kind === 'workshop').length, 1);
});
test('legacy project IDs rename without losing the credited high-water or workshop identity', () => {
  const s = freshTown('live'); syncTown(s, usage(30000, 'old'));
  assert.equal(syncTown(s, [{ ...usage(40000, 'new')[0], legacyId: 'old' }]).coins, 1);
  assert.equal(s.projects.length, 1); assert.equal(s.town.buildings.find(b => b.kind === 'workshop')!.projectId, 'new');
});
test('subsidy is capped, entitlement is retained and only the unpaid amount settles', () => {
  const s = freshTown('live'); s.chapterStars[0] = 1; assert.equal(settleSubsidy(s), 0);
  syncTown(s, usage(100000)); assert.equal(s.tokenCoins, 10); assert.equal(s.subsidyPaid, 2); assert.equal(s.coins, 12);
  assert.equal(settleSubsidy(s), 0); syncTown(s, usage(250000)); assert.equal(s.subsidyPaid, 5); assert.equal(s.coins, 30);
  s.chapterStars[1] = 1; assert.equal(settleSubsidy(s), 0); syncTown(s, usage(750000)); assert.equal(s.subsidyPaid, 15); assert.equal(s.coins, 90);
});
test('buying charges once, invalid placement never spends, moving and storage preserve identity', () => {
  installLocalStorage(); const store = new TownStore('demo'); store.syncDemo(); const before = store.state.coins;
  assert.ok(store.place('house', 1, 14, 0)); assert.equal(store.state.coins, before);
  assert.equal(store.place('house', 8, 21, 0), null); assert.equal(store.state.coins, before - 8);
  const id = store.board.buildings.at(-1)!.id, count = store.board.buildings.length;
  assert.ok(store.stash(id)); assert.equal(store.stash(id), false); assert.equal(store.place('house', 9, 21, 2, id), null);
  assert.equal(store.state.coins, before - 8); assert.equal(store.board.buildings.length, count); assert.equal(store.board.buildings.filter(b => b.id === id).length, 1);
  assert.ok(parseTown(JSON.stringify(store.state), 'demo'));
});
test('new scenery is permanent paid inventory and survives storage and reload without adding services', () => {
  for(const kind of ['fountain','cart','hedge','barrel','planter','gazebo','grocer','florist','library','greenhouse','granary','boathouse'] as const){
    installLocalStorage(); const store=new TownStore('demo');store.syncDemo();store.road(6,17);store.claimChapter(0);store.state.chapterStars[1]=1;store.commit();
    const before=store.state.coins, services=evaluate(store.board);
    assert.equal(store.place(kind,8,21,0),null);const id=store.board.buildings.at(-1)!.id;
    assert.equal(store.state.coins,before-CATALOG[kind].cost);assert.equal(store.stash(id),true);
    const restored=new TownStore('demo');assert.equal(restored.place(kind,9,21,1,id),null);
    assert.equal(restored.state.coins,before-CATALOG[kind].cost);assert.equal(restored.board.buildings.filter(b=>b.id===id).length,1);
    assert.equal(evaluate(restored.board).food,services.food);assert.equal(evaluate(restored.board).green,services.green);
  }
});
test('rotation transforms footprint and entrance and bridge cannot be placed on land', () => {
  const s = freshTown('demo'); s.chapterStars = [1, 1, 1, 0, 0, 0];
  const b = makeBuilding('b', 'hall', 0, 0, 1); assert.deepEqual(entrance(b), { x: -1, z: 1 });
  assert.deepEqual(dimensions(makeBuilding('bridge', 'bridge', 0, 0, 1)), { w: 2, d: 1 });
  assert.ok(canPlace(s, s.town, makeBuilding('bridge', 'bridge', 4, 14)));
  assert.equal(canPlace(s, s.town, makeBuilding('bridge', 'bridge', 4, 11)), null);
  assert.ok(canPlace(s, s.town, makeBuilding('bridge', 'bridge', 5, 11)));
});
test('shops respect capacity, actual road distance, root connectivity, and stable ties', () => {
  const board = structuredClone(PUZZLES[2].solution); const e = evaluate(board); assert.equal(e.food, 6); assert.equal(e.leisure, 6);
  board.buildings.push(makeBuilding('extra-home', 'house', 0, 8, 2)); board.roads.push(key(0, 7), key(0, 6), key(0, 5), key(0, 4), key(0, 3));
  assert.ok(evaluate(board).food <= 6);
  const shuffled = structuredClone(board); shuffled.buildings.reverse(); shuffled.roads.reverse(); assert.deepEqual(evaluate(shuffled).buildings, evaluate(board).buildings);
  board.roads = []; assert.equal(evaluate(board).food, 0); assert.equal(evaluate(board).population, 0);
});
test('all six puzzle solutions are physically valid and achieve three stars', () => {
  for (const p of PUZZLES) {
    const board = p.solution, state = freshTown('demo'); const e = evaluate(board);
    for (const b of board.buildings) assert.equal(canPlace(state, board, b), null, `${p.id}: ${b.id}`);
    assert.equal(puzzleStars(p, e), 3, `${p.id}: ${JSON.stringify(puzzleGoals(p, e))}; green=${e.green}`);
    assert.equal(new Set(board.roads).size, board.roads.length);
    const occupied = new Set(board.buildings.flatMap(b => cells(b).map(c => key(c.x, c.z)))); assert.ok(board.roads.every(r => !occupied.has(r)), p.id);
  }
});
test('puzzle runs never use main coins, repeat rewards do not mint money and progress resumes', () => {
  installLocalStorage(); const store = new TownStore('demo'); store.syncDemo(); const coins = store.state.coins; const main = structuredClone(store.state.town);
  store.enterPuzzle('short-roads'); assert.ok(store.place('house', 1, 1, 0));
  store.state.puzzleBoards['short-roads'] = structuredClone(PUZZLES[0].solution);
  assert.deepEqual(store.claimPuzzle(), { stars: 3, first: true }); assert.equal(store.claimPuzzle(), null); assert.equal(store.state.coins, coins); assert.deepEqual(store.state.town, main);
  assert.ok(store.unlockedKind('flower') === false); // fixed puzzle inventory still controls availability
  store.leavePuzzle(); assert.equal(store.unlockedKind('flower'), true); assert.equal(store.state.puzzleStars['short-roads'], 3);
  const restored = new TownStore('demo'); restored.enterPuzzle('short-roads'); assert.equal(evaluate(restored.board).food, 4);
});
test('live and demo money, project identity and layouts never mix', () => {
  installLocalStorage(); const store = new TownStore('demo'); store.syncDemo(); store.road(6, 17); const demoCoins = store.state.coins;
  store.setMode('live'); assert.equal(store.state.coins, 0); assert.equal(store.state.projects.length, 0); assert.equal(evaluate(store.board).food, 0);
  store.sync(usage(10000)); store.setMode('demo'); assert.equal(store.state.coins, demoCoins); assert.equal(evaluate(store.board).food, 4); assert.equal(store.state.projects.length, 4);
});
test('malformed saves fail safely and an unsuccessful import preserves the town', () => {
  installLocalStorage(); const s = freshTown('demo'); assert.equal(parseTown('{', 'demo'), null); assert.equal(parseTown(JSON.stringify(s), 'live'), null);
  assert.equal(parseTown(JSON.stringify({ ...s, coins: -1 }), 'demo'), null); assert.equal(parseTown(JSON.stringify({ ...s, coins: 999 }), 'demo'), null);
  const duplicate = structuredClone(s); duplicate.town.buildings.push(duplicate.town.buildings[0]); assert.equal(parseTown(JSON.stringify(duplicate), 'demo'), null);
  const store = new TownStore('demo'); const before = JSON.stringify(store.state); assert.equal(store.importSave('{}'), false); assert.equal(JSON.stringify(store.state), before);
});
test('newer saves from another tab are retained instead of being overwritten', () => {
  installLocalStorage(); const a = new TownStore('demo'), b = new TownStore('demo'); a.syncDemo(); b.road(6, 17);
  assert.equal(b.conflict, true); assert.equal(b.state.coins, a.state.coins); assert.equal(parseTown(localStorage.getItem(TOWN_KEYS.demo), 'demo')!.coins, a.state.coins);
});

function southSolution(): Board {
  const buildings = [makeBuilding('hall', 'hall', 15, 16, 1), ...[1, 3, 5, 7, 9, 11].flatMap((x, i) => [makeBuilding(`h-top-${i}`, 'house', x, 13), makeBuilding(`h-bottom-${i}`, 'house', x, 18)]), makeBuilding('h-extra-a', 'house', 15, 21, 2), makeBuilding('h-extra-b', 'house', 17, 21, 2), makeBuilding('food-top', 'bakery', 5, 16, 2), makeBuilding('food-bottom', 'bakery', 3, 21, 2), makeBuilding('market', 'market', 18, 17), makeBuilding('cafe-top-a', 'cafe', 3, 16, 2), makeBuilding('cafe-top-b', 'cafe', 13, 13), makeBuilding('cafe-bottom-a', 'cafe', 7, 21, 2), makeBuilding('cafe-bottom-b', 'cafe', 11, 21, 2), ...[1, 7, 9, 11].map((x, i) => makeBuilding(`park-top-${i}`, 'park', x, 16, 2)), ...[1, 5, 9].map((x, i) => makeBuilding(`park-bottom-${i}`, 'park', x, 21, 2)), makeBuilding('park-extra', 'park', 19, 21, 2)];
  const roads = [...Array.from({ length: 14 }, (_, i) => key(i + 1, 15)), ...Array.from({ length: 18 }, (_, i) => key(i + 2, 20)), ...[16, 17, 18, 19].map(z => key(14, z))];
  return { size: 24, terrain: 'valley', buildings, roads };
}
function fullSolution(): Board {
  const board = southSolution();
  const crossingHome = board.buildings.find(b => b.id === 'h-top-4')!; crossingHome.x = 13; crossingHome.z = 21; crossingHome.rotation = 2;
  for (const [i, x] of [0, 2, 4, 6, 8, 10].entries()) board.buildings.push(makeBuilding(`north-home-${i}`, 'house', x, 1));
  board.buildings.push(makeBuilding('north-bakery', 'bakery', 7, 4, 2), makeBuilding('north-cafe-a', 'cafe', 3, 4, 2), makeBuilding('north-cafe-b', 'cafe', 7, 7, 2), ...[1, 5, 9].map(x => makeBuilding(`north-park-${x}`, 'park', x, 4, 2)), makeBuilding('bridge', 'bridge', 10, 11), makeBuilding('clock', 'clock', 21, 21, 2));
  board.roads.push(...Array.from({ length: 11 }, (_, i) => key(i + 1, 3)), ...[4, 5, 6, 7, 8, 9, 10].map(z => key(11, z)), key(10, 10), ...[7, 8, 9, 10].map(x => key(x, 6)), ...[13, 14].map(z => key(10, z)), key(20, 20), key(21, 20), key(22, 20));
  return board;
}
test('authored main-town layouts demonstrate a solvable progression through all six chapters', () => {
  const south = southSolution(), full = fullSolution(), s = freshTown('demo'); s.chapterStars = [1, 1, 1, 1, 1, 1];
  for (const board of [south, full]) for (const b of board.buildings) assert.equal(canPlace(s, board, b), null, b.id);
  const e = evaluate(south); assert.equal(e.roadCount, 36); assert.equal(e.satisfied, 14); assert.equal(starsForChapter(5, e), 2);
  for (const chapter of [1, 2, 3, 5]) assert.ok(starsForChapter(chapter, e) > 0, `${chapter}: ${JSON.stringify(chapterGoals(chapter, e))}`);
  const f = evaluate(full); assert.ok(starsForChapter(4, f) > 0); assert.ok(starsForChapter(6, f) > 0, JSON.stringify(chapterGoals(6, f))); assert.equal(f.satisfied, 20); assert.equal(starsForChapter(6, f), 3);
  const state: TownState = { ...s, town: full }; assert.ok(parseTown(JSON.stringify(state), 'demo'));
});
test('the first opposite-bank district opens before the crossing goal is required', () => {
  const s = freshTown('demo'); assert.equal(unlocked(s, s.town, 5, 4), false);
  s.chapterStars = [1, 1, 1, 0, 0, 0]; assert.equal(unlocked(s, s.town, 5, 4), true); assert.equal(unlocked(s, s.town, 5, 1), false);
  s.chapterStars[3] = 1; assert.equal(unlocked(s, s.town, 5, 1), true); assert.equal(unlocked(s, s.town, 18, 4), false);
});
test('all chapter three-star goals can be reached using only content available in that chapter', () => {
  const first = freshTown('demo').town; first.roads.push(key(6, 17)); Object.assign(first.buildings.find(b => b.kind === 'park')!, { x: 3, z: 17 });
  const second: Board = { size: 24, terrain: 'valley', buildings: [makeBuilding('hall', 'hall', 5, 20, 2), ...[0, 2, 4, 6, 8, 10].map(x => makeBuilding(`home-${x}`, 'house', x, 13)), makeBuilding('bakery', 'bakery', 3, 16, 2), ...[1, 5, 9].map(x => makeBuilding(`park-${x}`, 'park', x, 16, 2))], roads: [...Array.from({ length: 11 }, (_, i) => key(i + 1, 15)), ...[16, 17, 18, 19].map(z => key(11, z)), ...[6, 7, 8, 9, 10].map(x => key(x, 19))] };
  const third = southSolution(); third.buildings = third.buildings.filter(b => b.kind !== 'market');
  const fourth = fullSolution(); fourth.buildings = fourth.buildings.filter(b => !b.id.startsWith('north-') && b.kind !== 'clock'); fourth.roads = fourth.roads.filter(r => Number(r.split(',')[1]) >= 13);
  fourth.buildings.push(...[1, 3, 7, 9].map(x => makeBuilding(`north-${x}`, 'house', x, 4)), makeBuilding('north-bakery', 'bakery', 5, 4), makeBuilding('north-cafe', 'cafe', 5, 8, 2), ...[1, 3, 8].map(x => makeBuilding(`north-park-${x}`, 'park', x, 8, 2)));
  fourth.roads.push(...Array.from({ length: 10 }, (_, i) => key(i + 1, 6)), ...[1, 3, 5, 8].map(x => key(x, 7)), ...[7, 8, 9, 10].map(z => key(10, z)));
  for (const [index, board] of [first, second, third, fourth, fullSolution(), fullSolution()].entries()) {
    const state = freshTown('demo'); state.chapterStars = state.chapterStars.map((_, i) => i < index ? 1 : 0); state.town = board; if(index===4)board.buildings=board.buildings.filter(b=>b.kind!=='clock');
    for (const b of board.buildings) assert.equal(canPlace(state, board, b), null, `chapter ${index + 1}: ${b.id}`);
    assert.equal(starsForChapter(index + 1, evaluate(board)), 3, `chapter ${index + 1}: ${JSON.stringify(chapterGoals(index + 1, evaluate(board)))}`);
  }
});
test('extra-star appearances remain unlocked after changing the town layout', () => {
  installLocalStorage(); const store = new TownStore('demo'); store.syncDemo(); store.road(6, 17); store.claimChapter(0);
  assert.equal(store.state.tutorialDone, true); assert.equal(store.place('tree', 0, 21, 0), null);
  const tree = store.board.buildings.at(-1)!; assert.equal(store.recolor(tree.id), true); assert.equal(tree.variant, 1);
  store.stash(tree.id); assert.equal(store.place('tree', 0, 22, 0, tree.id), null); assert.equal(tree.variant, 1);
  assert.equal(new TownStore('demo').state.chapterStars[0], 3);
});
