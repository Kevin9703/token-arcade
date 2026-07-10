/*
 * collectibles.ts — the collectible pool the capsule machine draws from.
 * `sprite` names a map in the sprite atlas; `tint` optionally recolors it.
 * Types drive the fixed-price shop and prize-wall grouping.
 */

import type { Collectible, RarityKey } from '../core/types';
import { RARITY_ORDER } from './rarities';

// tint helpers: recolor a gem/frame sprite for palette variants.
const gemTint = (main: string, hi?: string): Record<string, string> => ({ C: main, W: hi || '#ffffff' });
const frameTint = (c: string): Record<string, string> => ({ Y: c });

export const COLLECTIBLES: Collectible[] = [
  // --- Common ---
  { id: 'c_smiley', name: 'Smiley Chip', rarity: 'common', type: 'badge', description: 'A tiny grin soldered onto the day. It still believes the build will pass.', sprite: 'smiley' },
  { id: 'c_token', name: 'Token Chip', rarity: 'common', type: 'badge', description: 'One bright coin-shaped thought, rescued from the model stream.', sprite: 'tokenChip' },
  { id: 'c_heart', name: 'Pixel Heart', rarity: 'common', type: 'badge', description: 'Beats at 30 FPS. Somehow still sincere.', sprite: 'heart' },
  { id: 'c_gg', name: 'GG Banner', rarity: 'common', type: 'sign', description: 'Hung after small wins, large wins, and suspiciously lucky fixes.', sprite: 'ggSign' },
  { id: 'c_mug', name: 'Arcade Mug', rarity: 'common', type: 'decor', description: 'Contains coffee, tea, or the remains of one more late-night idea.', sprite: 'mug' },
  { id: 'c_sprout', name: 'Little Sprout', rarity: 'common', type: 'decor', description: 'Grew from leftover tokens. Needs light, water, and fewer tabs.', sprite: 'plantSmall' },
  // --- Uncommon ---
  { id: 'u_star', name: 'Debug Star', rarity: 'uncommon', type: 'badge', description: 'Awarded for finding the problem five minutes after complaining about it.', sprite: 'starBadge' },
  { id: 'u_luckycoin', name: 'Lucky Coin', rarity: 'uncommon', type: 'badge', description: 'Flip it before a risky prompt. It always lands on "ship it."', sprite: 'goldCoin' },
  { id: 'u_shelf', name: 'Code Shelf', rarity: 'uncommon', type: 'decor', description: 'Stores tiny manuals for systems nobody fully remembers.', sprite: 'bookShelf' },
  { id: 'u_1up', name: '1UP Flag', rarity: 'uncommon', type: 'sign', description: 'Grants emotional recovery after deleting the wrong line.', sprite: 'oneupFlag' },
  { id: 'u_gemc', name: 'Cyan Cache Gem', rarity: 'uncommon', type: 'badge', description: 'A cool little shard of context that survived compression.', sprite: 'gem' },
  // --- Rare ---
  { id: 'r_cat', name: 'Waving Desk Cat', rarity: 'rare', type: 'buddy', description: 'Waves at every fresh idea like it personally funded the sprint.', sprite: 'luckyCat' },
  { id: 'r_palm', name: 'Focus Palm', rarity: 'rare', type: 'decor', description: 'Makes any corner feel 12 percent more like deep work.', sprite: 'palm' },
  { id: 'r_gameover', name: 'Game Over Sign', rarity: 'rare', type: 'sign', description: 'A dramatic sign for bugs that were already fixed ten minutes ago.', sprite: 'gameoverSign' },
  { id: 'r_stool', name: 'Cabinet Stool', rarity: 'rare', type: 'decor', description: 'Perfect height for staring at a loading spinner with dignity.', sprite: 'stool' },
  { id: 'r_rug', name: 'Star Rug', rarity: 'rare', type: 'decor', description: 'Marks the exact place where good pulls and bad estimates happen.', sprite: 'starRug' },
  { id: 'r_frame', name: 'Cyan Profile Frame', rarity: 'rare', type: 'frame', description: 'Adds a clean neon edge to your arcade legend.', sprite: 'frame', tint: frameTint('#5fe6d6') },
  // --- Epic ---
  { id: 'e_rainbowcat', name: 'Rainbow Arcade Cat', rarity: 'epic', type: 'buddy', description: 'Appears when the code works and nobody knows why.', sprite: 'rainbowCat' },
  { id: 'e_astro', name: 'Space Ranger', rarity: 'epic', type: 'buddy', description: 'Patrols the outer orbit of unfinished side quests.', sprite: 'astronaut' },
  { id: 'e_minicab', name: 'Mini Cabinet', rarity: 'epic', type: 'decor', description: 'A cabinet for your cabinet. Very efficient, very unnecessary.', sprite: 'miniCabinet' },
  { id: 'e_trophy', name: 'Gold Trophy', rarity: 'epic', type: 'trophy', description: 'Proof that spending tokens can, occasionally, become glory.', sprite: 'trophy' },
  { id: 'e_sunset', name: 'Sunset Room Theme', rarity: 'epic', type: 'theme', description: 'Turns the arcade golden enough to forgive one more refactor.', sprite: 'sunsetTheme' },
  { id: 'e_gemu', name: 'Amethyst Cache Gem', rarity: 'epic', type: 'badge', description: 'A rare purple chunk of context, still humming with remembered intent.', sprite: 'gem', tint: gemTint('#b98cff', '#e6d6ff') },
  // --- Legendary ---
  { id: 'l_crown', name: 'Neon Crown', rarity: 'legendary', type: 'badge', description: 'For the player who turned pure model heat into arcade royalty.', sprite: 'neonCrown' },
  { id: 'l_trophy', name: 'Champion Trophy', rarity: 'legendary', type: 'trophy', description: 'Heavy, shiny, and almost certainly paid for in tokens.', sprite: 'legendaryTrophy' },
  { id: 'l_egg', name: 'Dragon Egg', rarity: 'legendary', type: 'buddy', description: 'Warm to the touch. Do not ask what it was trained on.', sprite: 'dragonEgg' },
  { id: 'l_forest', name: 'Forest Room Theme', rarity: 'legendary', type: 'theme', description: 'A quiet grove grown from a suspicious amount of computation.', sprite: 'forestTheme' },
];

export const byId: Record<string, Collectible> = {};
COLLECTIBLES.forEach((c) => (byId[c.id] = c));

export const byRarity: Record<RarityKey, Collectible[]> = {
  legendary: [],
  epic: [],
  rare: [],
  uncommon: [],
  common: [],
};
RARITY_ORDER.forEach((r) => {
  byRarity[r] = COLLECTIBLES.filter((c) => c.rarity === r);
});
