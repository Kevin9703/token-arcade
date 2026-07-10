import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  levelFor,
  levelInfo,
  stageForLevel,
  coinMultiplier,
  LEVEL_THRESHOLDS,
  MAX_LEVEL,
  STAGES,
} from '../../src/domain/levels';

// 50 numeric levels + 5 visual stages, derived purely from lifetime tokens.
// Stage token boundaries (docs/PROJECT_LEVEL_SYSTEM.md):
//   Starter   L1-4    0 .. 99,999
//   Powered   L5-9    100,000 .. 999,999
//   Deluxe    L10-19  1,000,000 .. 9,999,999
//   Neon      L20-34  10,000,000 .. 49,999,999
//   Legendary L35-50  50,000,000+

test('LEVEL_THRESHOLDS — 50 strictly increasing floors starting at 0', () => {
  assert.equal(LEVEL_THRESHOLDS.length, MAX_LEVEL);
  assert.equal(LEVEL_THRESHOLDS[0], 0);
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    assert.ok(LEVEL_THRESHOLDS[i] > LEVEL_THRESHOLDS[i - 1], `threshold not increasing at level ${i + 1}`);
  }
});

test('levelFor — stage boundaries hold exactly', () => {
  assert.equal(levelFor(0), 1);
  // Starter ends at level 4 just below 100k; Powered starts at level 5 at 100k.
  assert.equal(levelFor(99_999), 4);
  assert.equal(levelFor(100_000), 5);
  // Deluxe starts at level 10 at 1M.
  assert.equal(levelFor(999_999), 9);
  assert.equal(levelFor(1_000_000), 10);
  // Neon starts at level 20 at 10M.
  assert.equal(levelFor(9_999_999), 19);
  assert.equal(levelFor(10_000_000), 20);
  // Legendary starts at level 35 at 50M.
  assert.equal(levelFor(49_999_999), 34);
  assert.equal(levelFor(50_000_000), 35);
  // Max level 50 at/above the final threshold.
  assert.equal(levelFor(500_000_000), 50);
  assert.equal(levelFor(10_000_000_000_000), 50);
});

test('stageForLevel — maps levels to the five visual stages', () => {
  assert.equal(STAGES.length, 5);
  assert.equal(stageForLevel(1).key, 'starter');
  assert.equal(stageForLevel(4).key, 'starter');
  assert.equal(stageForLevel(5).key, 'powered');
  assert.equal(stageForLevel(9).key, 'powered');
  assert.equal(stageForLevel(10).key, 'deluxe');
  assert.equal(stageForLevel(19).key, 'deluxe');
  assert.equal(stageForLevel(20).key, 'neon');
  assert.equal(stageForLevel(34).key, 'neon');
  assert.equal(stageForLevel(35).key, 'legendary');
  assert.equal(stageForLevel(50).key, 'legendary');
});

test('levelInfo — carries stage, progress, and multiplier', () => {
  const info = levelInfo(100_000); // exactly level 5 floor
  assert.equal(info.level, 5);
  assert.equal(info.stage.key, 'powered');
  assert.equal(info.base, LEVEL_THRESHOLDS[4]);
  assert.equal(info.next, LEVEL_THRESHOLDS[5]);
  assert.equal(info.progress, 0); // on a fresh floor
  assert.equal(info.isMax, false);
  assert.ok(info.progress >= 0 && info.progress <= 1);
});

test('levelInfo — max level is capped and flagged', () => {
  const info = levelInfo(1_000_000_000);
  assert.equal(info.level, 50);
  assert.equal(info.stage.key, 'legendary');
  assert.equal(info.next, null);
  assert.equal(info.isMax, true);
  assert.equal(info.progress, 1);
  assert.equal(info.toNext, 0);
  assert.equal(info.multiplier, 1.5);
});

test('coinMultiplier — 1.00x at Lv1 rising to 1.50x at Lv50', () => {
  assert.equal(coinMultiplier(1), 1);
  assert.equal(coinMultiplier(50), 1.5);
  // monotonic non-decreasing across the range
  for (let l = 2; l <= 50; l++) assert.ok(coinMultiplier(l) >= coinMultiplier(l - 1));
  // clamps out of range
  assert.equal(coinMultiplier(0), 1);
  assert.equal(coinMultiplier(999), 1.5);
  // mid-curve sanity: ~1.19x around level 20
  assert.ok(Math.abs(coinMultiplier(20) - 1.19) < 0.01);
});
