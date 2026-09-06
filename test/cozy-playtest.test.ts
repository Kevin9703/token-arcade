import test from 'node:test';
import assert from 'node:assert/strict';
import { freshPlaytest, totalTokens, collectSession, claimChapter, pullCapsules, placePrize, readPlaytest, exchangeMissing } from '../src/preview/progress';

test('first fictional collection funds a pull and unlocks the first three gifts', () => {
  const s = freshPlaytest();
  assert.equal(claimChapter(s, 2), null);
  const receipt = collectSession(s);
  assert.equal(receipt.coins, 16); assert.equal(s.coins, 25); assert.equal(totalTokens(s), 250000);
  for (let i = 0; i < 3; i++) { assert.ok(claimChapter(s, i)); assert.equal(claimChapter(s, i), null); }
  assert.equal(Object.keys(s.owned).length, 3);
});
test('a pending reveal blocks double spending and survives serialization', () => {
  const s = freshPlaytest(); collectSession(s);
  assert.equal(pullCapsules(s, 1, () => .8), true);
  assert.equal(s.coins, 0); assert.equal(pullCapsules(s, 1), false);
  const restored = readPlaytest(JSON.stringify(s)); assert.deepEqual(restored, s);
  s.pending = []; assert.equal(pullCapsules(s, 1), false);
  assert.equal(pullCapsules(s, -1), false); assert.equal(pullCapsules(s, 2), false);
});
test('ten pulls cost 225, keep every result and compensate duplicates', () => {
  const s = freshPlaytest(); for (let i = 0; i < 5; i++) collectSession(s);
  const coins = s.coins; assert.ok(pullCapsules(s, 10, () => .8));
  assert.equal(s.coins, coins - 225); assert.equal(s.pending.length, 10);
  assert.equal(s.pending.filter(r => r.duplicate).length, 9); assert.equal(s.dust, 9);
});
test('placing or moving a prize never deletes the replaced inventory', () => {
  const s = freshPlaytest(); collectSession(s); claimChapter(s, 0); claimChapter(s, 1);
  assert.ok(placePrize(s, 'c_sprout', 0)); assert.ok(placePrize(s, 'c_mug', 0));
  assert.equal(s.owned.c_sprout, 1); assert.ok(placePrize(s, 'c_mug', 2)); assert.equal(s.slots[0], null);
  assert.equal(placePrize(s, 'c_mug', 4), false);
  assert.equal(placePrize(s, 'r_cat', 1), false); assert.equal(placePrize(s, 'c_mug', 6), false);
});
test('dust exchange grants a missing prize and requires sufficient dust', () => {
  const s = freshPlaytest(); assert.equal(exchangeMissing(s), false); s.dust = 120;
  assert.ok(exchangeMissing(s, () => 0)); assert.equal(s.dust, 0); assert.equal(s.pending[0].duplicate, false);
});
test('malformed playtest saves are rejected instead of reaching the renderer', () => {
  const s = freshPlaytest(); assert.equal(readPlaytest('{'), null);
  assert.equal(readPlaytest(JSON.stringify({ ...s, slots: ['unknown'] })), null);
  assert.equal(readPlaytest(JSON.stringify({ ...s, pending: [null] })), null);
  assert.equal(readPlaytest(JSON.stringify({ ...s, coins: -1 })), null);
  assert.deepEqual(readPlaytest(JSON.stringify(s)), s);
});

import { floorPath } from '../src/preview/navigation';
test('walking routes around a displayed floor prize and stays inside the room', () => {
  const obstacle = {x: 550, y: 790};
  const path = floorPath({x: 370,y: 790}, {x: 850,y: 790}, [obstacle]);
  assert.ok(path.length > 0);
  assert.ok(path.every(p => Math.hypot(p.x-obstacle.x,p.y-obstacle.y)>=50));
  assert.deepEqual(path.at(-1), {x: 850,y: 790});
  assert.ok(floorPath({x:790,y:830},{x:-500,y:5000},[]).every(p=>p.x>=350&&p.y<=890));
});
