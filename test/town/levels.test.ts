import test from 'node:test';
import assert from 'node:assert/strict';
import { levelFor, levelInfo, stageForLevel, LEVEL_THRESHOLDS, MAX_LEVEL, STAGES } from '../../src/town/levels';

test('all 50 workshop thresholds retain their inclusive level boundaries', () => {
  assert.equal(LEVEL_THRESHOLDS.length, MAX_LEVEL);
  assert.equal(LEVEL_THRESHOLDS[0], 0);
  LEVEL_THRESHOLDS.forEach((tokens, index) => {
    assert.equal(levelFor(tokens), index + 1);
    if (index > 0) {
      assert.ok(tokens > LEVEL_THRESHOLDS[index - 1]);
      assert.equal(levelFor(tokens - 1), index);
    }
  });
  assert.equal(levelFor(10_000_000_000_000), 50);
});

test('workshop appearance changes at the existing token anchors', () => {
  const anchors = [[0, 1], [8_000, 2], [100_000, 5], [1_000_000, 10], [10_000_000, 20], [50_000_000, 35], [500_000_000, 50]];
  for (const [tokens, level] of anchors) assert.equal(levelFor(tokens), level);
  assert.equal(STAGES.length, 5);
  for (const stage of STAGES) {
    assert.equal(stageForLevel(stage.loLevel).index, stage.index);
    assert.equal(stageForLevel(stage.hiLevel).index, stage.index);
  }
  assert.equal(stageForLevel(0).index, 0);
  assert.equal(stageForLevel(999).index, 4);
});

test('workshop progress starts at each level floor and measures remaining tokens', () => {
  for (let index = 0; index < MAX_LEVEL - 1; index++) {
    const base = LEVEL_THRESHOLDS[index], next = LEVEL_THRESHOLDS[index + 1];
    const start = levelInfo(base);
    assert.equal(start.level, index + 1);
    assert.equal(start.base, base);
    assert.equal(start.next, next);
    assert.equal(start.progress, 0);
    assert.equal(start.toNext, next - base);
    assert.equal(start.isMax, false);
    const tokens = Math.floor((base + next) / 2), middle = levelInfo(tokens);
    assert.equal(middle.toNext, next - tokens);
    assert.ok(Math.abs(middle.progress - 0.5) < 0.001);
  }
});

test('maximum workshop level stays complete without a next threshold', () => {
  const info = levelInfo(1_000_000_000);
  assert.equal(info.level, 50);
  assert.equal(info.stage.index, 4);
  assert.equal(info.next, null);
  assert.equal(info.progress, 1);
  assert.equal(info.toNext, 0);
  assert.equal(info.isMax, true);
});
