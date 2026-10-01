import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fmtCompact } from '../../src/town/format';

test('fmtCompact — exact strings at threshold boundaries', () => {
  // Below 1000: raw integer.
  assert.equal(fmtCompact(0), '0');
  assert.equal(fmtCompact(999), '999');

  // [1000, 1e4): one decimal + K.
  assert.equal(fmtCompact(1000), '1.0K');
  // 9999 / 1000 = 9.999, toFixed(1) rounds up to 10.0 -> "10.0K" (still one-decimal branch).
  assert.equal(fmtCompact(9999), '10.0K');

  // [1e4, 1e6): rounded integer + K.
  assert.equal(fmtCompact(10000), '10K');
  assert.equal(fmtCompact(412000), '412K');
  // 999999 / 1000 = 999.999, Math.round -> 1000 -> "1000K".
  assert.equal(fmtCompact(999999), '1000K');

  // [1e6, 1e7): two decimals + M.
  assert.equal(fmtCompact(1000000), '1.00M');
  assert.equal(fmtCompact(2843210), '2.84M');
  // 9999999 / 1e6 = 9.999999, toFixed(2) rounds up to 10.00 -> "10.00M".
  assert.equal(fmtCompact(9999999), '10.00M');

  // [1e7, 1e9): rounded integer + M.
  assert.equal(fmtCompact(10000000), '10M');
  assert.equal(fmtCompact(231000000), '231M');

  // >= 1e9: two decimals + B.
  assert.equal(fmtCompact(1000000000), '1.00B');
  assert.equal(fmtCompact(3300000000), '3.30B');
});
