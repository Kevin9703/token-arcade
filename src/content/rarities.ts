/*
 * rarities.ts — the rarity tiers. Colors and glow feed the cards and prize
 * wall; `weight` drives the capsule machine; `order` sets prize-wall stacking.
 */

import type { Rarity, RarityKey } from '../core/types';

// Rarity tiers, ordered high -> low for prize-wall display.
export const RARITIES: Record<RarityKey, Rarity> = {
  legendary: { key: 'legendary', label: 'Legendary', color: '#ffd23f', glow: '#ffb300', weight: 1, order: 0 },
  epic: { key: 'epic', label: 'Epic', color: '#b98cff', glow: '#9a6cff', weight: 6, order: 1 },
  rare: { key: 'rare', label: 'Rare', color: '#5fb4ff', glow: '#4aa3ff', weight: 13, order: 2 },
  uncommon: { key: 'uncommon', label: 'Uncommon', color: '#6fe07f', glow: '#5fd66f', weight: 26, order: 3 },
  common: { key: 'common', label: 'Common', color: '#c2c2d6', glow: '#8a8aa8', weight: 54, order: 4 },
};

export const RARITY_ORDER: RarityKey[] = ['legendary', 'epic', 'rare', 'uncommon', 'common'];
