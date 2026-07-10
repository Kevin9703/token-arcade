import { test } from 'node:test';
import assert from 'node:assert/strict';

import { tokensToCoins, fmtCompact, fmtComma, CONFIG, baseCoinsFor } from '../../src/domain/economy';

test('tokensToCoins — conversion & residue carry', async (t) => {
  await t.test('exact 10000 tokens/coin conversion', () => {
    assert.deepEqual(tokensToCoins(0, 10000), { coins: 1, residue: 0 });
    assert.deepEqual(tokensToCoins(0, 30000), { coins: 3, residue: 0 });
    // 34500 tokens -> 3 coins with 4500 left over.
    assert.deepEqual(tokensToCoins(0, 34500), { coins: 3, residue: 4500 });
  });

  await t.test('sub-coin residue carries forward across calls', () => {
    const first = tokensToCoins(0, 7500);
    assert.deepEqual(first, { coins: 0, residue: 7500 });
    // Feed the residue back in with 5000 more: 7500 + 5000 = 12500 -> 1 coin, 2500 residue.
    const second = tokensToCoins(first.residue, 5000);
    assert.deepEqual(second, { coins: 1, residue: 2500 });
  });

  await t.test('residue exactly completes a coin', () => {
    // 9999 carried + 1 new = 10000 -> 1 coin, no residue.
    assert.deepEqual(tokensToCoins(9999, 1), { coins: 1, residue: 0 });
  });

  await t.test('exact multiples leave zero residue', () => {
    assert.deepEqual(tokensToCoins(0, 20000), { coins: 2, residue: 0 });
    assert.deepEqual(tokensToCoins(0, 100000), { coins: 10, residue: 0 });
  });

  await t.test('zero newTokens mints no coins', () => {
    assert.deepEqual(tokensToCoins(0, 0), { coins: 0, residue: 0 });
    // Existing residue is preserved, not consumed.
    assert.deepEqual(tokensToCoins(500, 0), { coins: 0, residue: 500 });
  });

  await t.test('negative newTokens is treated as zero (Math.max(0, ...))', () => {
    assert.deepEqual(tokensToCoins(0, -500), { coins: 0, residue: 0 });
    // Residue survives a negative delta; the negative newTokens contributes nothing.
    assert.deepEqual(tokensToCoins(200, -9999), { coins: 0, residue: 200 });
  });

  await t.test('large values', () => {
    assert.deepEqual(tokensToCoins(0, 12_345_678), { coins: 1_234, residue: 5_678 });
    assert.deepEqual(tokensToCoins(678, 12_345_678), { coins: 1_234, residue: 6_356 });
  });
});

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

test('fmtComma — grouped thousands, floors fractions', () => {
  assert.equal(fmtComma(0), '0');
  assert.equal(fmtComma(1234567), '1,234,567');
  // Fractions are floored before grouping.
  assert.equal(fmtComma(1234567.89), '1,234,567');
  assert.equal(fmtComma(999.99), '999');
});

test('CONFIG — economy constants', () => {
  assert.equal(CONFIG.TOKENS_PER_COIN, 10000);
  // Level thresholds moved to ./levels (50-level curve); CONFIG no longer owns them.
  assert.equal(CONFIG.PULL_COST, 25);
  assert.equal(CONFIG.PULL10_COST, 225);
});

test('baseCoinsFor — flat floor(tokens / TOKENS_PER_COIN), the single project-coins rule', () => {
  // The Economy V2 rate: 10,000 tokens = 1 base coin.
  assert.equal(baseCoinsFor(0), 0);
  assert.equal(baseCoinsFor(9999), 0); // sub-coin, floors to 0
  assert.equal(baseCoinsFor(10000), 1);
  assert.equal(baseCoinsFor(120_000_000), 12000); // a large project must use the current 10k-to-1 rate
  assert.equal(baseCoinsFor(300_000_000), 30000); // covers a high lifetime-total migration case
  // Defensive: bad/missing input must not throw and must read as 0.
  assert.equal(baseCoinsFor(undefined), 0);
  assert.equal(baseCoinsFor(null), 0);
  assert.equal(baseCoinsFor(NaN), 0);
});
