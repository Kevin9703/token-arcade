/*
 * achievements.ts — milestone badges. Each `check` runs against the live game
 * state; the store unlocks any that newly pass after a mutation.
 */

import type { Achievement, GameState } from '../core/types';
import { COLLECTIBLES } from './collectibles';

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_coin', name: 'First Coin', desc: 'Mint your first coin', sprite: 'goldCoin', check: (s: GameState) => s.stats.coinsEarned >= 1 },
  { id: 'warm_machine', name: 'Warm Machine', desc: 'Spend 10K tokens', sprite: 'tokenChip', check: (s: GameState) => s.stats.lifetimeTokens >= 10000 },
  { id: 'neon_night', name: 'Neon Night', desc: 'Spend 100K tokens', sprite: 'starBadge', check: (s: GameState) => s.stats.lifetimeTokens >= 100000 },
  { id: 'million', name: 'Million Token Club', desc: 'Spend 1M tokens', sprite: 'trophy', check: (s: GameState) => s.stats.lifetimeTokens >= 1000000 },
  { id: 'royalty', name: 'Cabinet Royalty', desc: 'A cabinet reaches Lv20', sprite: 'neonCrown', check: (s: GameState) => s.projects.some((p) => p.level >= 20) },
  { id: 'first_pull', name: 'First Pull', desc: 'Use the capsule machine', sprite: 'gem', check: (s: GameState) => s.stats.pulls >= 1 },
  { id: 'wall_starter', name: 'Prize Wall Starter', desc: 'Unlock 10 collectibles', sprite: 'ggSign', check: (s: GameState) => Object.keys(s.owned).length >= 10 },
  { id: 'dupe_luck', name: 'Duplicate Luck', desc: 'Receive 5 duplicates', sprite: 'luckyCat', check: (s: GameState) => s.stats.duplicates >= 5 },
  { id: 'legendary_drop', name: 'Legendary Drop', desc: 'Unlock a legendary', sprite: 'legendaryTrophy', check: (s: GameState) => COLLECTIBLES.some((c) => c.rarity === 'legendary' && Boolean(s.owned[c.id])) },
];
