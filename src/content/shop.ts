/*
 * shop.ts — the fixed-price spend rail. `kind:'capsule'` opens the capsule
 * flow; `kind:'grant'` gives a guaranteed collectible of `pick` type (nice for
 * players who dislike RNG, per the economy doc).
 */

import type { ShopItem } from '../core/types';

export const SHOP: ShopItem[] = [
  { id: 'pull1', label: 'Pull', sub: 'Capsule ×1', cost: 25, kind: 'capsule', pulls: 1, sprite: 'capsule' },
  { id: 'pull10', label: 'Pull', sub: 'Capsule ×10', cost: 225, kind: 'capsule', pulls: 10, sprite: 'capsule' },
  { id: 'sign', label: 'Neon Sign', sub: 'Unlock a sign', cost: 250, kind: 'grant', pick: 'sign', sprite: 'ggSign' },
  { id: 'frame', label: 'Profile Frame', sub: 'Unlock a frame', cost: 600, kind: 'grant', pick: 'frame', sprite: 'frame' },
  { id: 'theme', label: 'Room Theme', sub: 'Unlock a theme', cost: 1500, kind: 'grant', pick: 'theme', sprite: 'sunsetTheme' },
  { id: 'trophy', label: 'Trophy Card', sub: 'Unlock a trophy', cost: 3000, kind: 'grant', pick: 'trophy', sprite: 'trophy' },
];
