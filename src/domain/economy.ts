/*
 * economy.ts — pure game math. No state, no DOM. Everything that turns tokens
 * into coins lives here so it's easy to reason about. (Cabinet levels live in
 * ./levels, capsule rolls in ./capsule.)
 */

export const CONFIG: {
  TOKENS_PER_COIN: number;
  PULL_COST: number;
  PULL10_COST: number;
  COINS_PER_TICKET: number;
} = {
  TOKENS_PER_COIN: 10000, // 10,000 tokens = 1 coin (Economy V2, MVP audit)
  PULL_COST: 25,
  PULL10_COST: 225,
  COINS_PER_TICKET: 50, // bonus ticket per N coins minted in one sync
};
// Cabinet level thresholds now live in ./levels (50-level curve + 5 stages).

// ---- player XP level ------------------------------------------------------

/**
 * Flavor XP: the player's level grows with total coins earned. Each level
 * needs 30% more coins than the last, starting at 120.
 */
export function playerLevelFor(coinsEarned: number): { level: number; into: number; need: number } {
  let lvl = 1;
  let need = 120;
  let acc = 0;
  while (coinsEarned >= acc + need) {
    acc += need;
    lvl++;
    need = Math.round(need * 1.3);
  }
  return { level: lvl, into: coinsEarned - acc, need };
}

// ---- number formatting --------------------------------------------------

export function fmtCompact(n: number): string {
  n = Math.floor(n || 0);
  const abs = Math.abs(n);
  if (abs < 1000) return String(n);
  if (abs < 1e6) return abs < 1e4 ? (n / 1e3).toFixed(1) + 'K' : Math.round(n / 1e3) + 'K';
  if (abs < 1e9) return abs < 1e7 ? (n / 1e6).toFixed(2) + 'M' : Math.round(n / 1e6) + 'M';
  return (n / 1e9).toFixed(2) + 'B';
}

export function fmtComma(n: number): string {
  return Math.floor(n || 0).toLocaleString('en-US');
}

// ---- conversion ---------------------------------------------------------

/**
 * Base coins derived from a project's lifetime tokens at the flat economy rate
 * (tokens / TOKENS_PER_COIN, floored). This is a FLAVOR value shown on cabinet
 * rows / detail — it is NOT the player's spendable balance and does NOT include
 * level-multiplier bonuses. It is the single source of truth for
 * `Project.coins`: both `computeSync` and the save repair call this so a stored
 * cabinet can never drift to a stale rate (Economy V2 once left old saves at
 * the retired 1,000-tokens/coin rate). Tolerates bad/missing input.
 */
export function baseCoinsFor(tokens: number | null | undefined): number {
  return Math.floor((Number(tokens) || 0) / CONFIG.TOKENS_PER_COIN);
}

// Convert newly-discovered tokens into whole coins, carrying the sub-coin
// remainder forward so small sessions still build toward the next coin.
export function tokensToCoins(residue: number, newTokens: number): { coins: number; residue: number } {
  const pool = (residue || 0) + Math.max(0, newTokens || 0);
  const coins = Math.floor(pool / CONFIG.TOKENS_PER_COIN);
  return { coins, residue: pool % CONFIG.TOKENS_PER_COIN };
}
