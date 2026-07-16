import { COLLECTIBLES } from '../content/collectibles';
import type { Collectible, CollectibleType } from '../core/types';

/** Stable slot order used by the Home room renderer. */
export const ROOM_DISPLAY_CATEGORIES = [
  'sign',
  'buddy',
  'decor',
  'trophy',
  'badge',
] as const satisfies readonly CollectibleType[];

export type RoomDisplayCategory = (typeof ROOM_DISPLAY_CATEGORIES)[number];

/** Tolerant persisted shape: older or damaged saves may lack either field. */
export interface RoomDisplayOwnedEntry {
  readonly count?: number | null;
  readonly firstUnlocked?: string | null;
}

export type RoomDisplayOwnedMap = Readonly<
  Record<string, RoomDisplayOwnedEntry | null | undefined>
>;

export interface RoomDisplaySelection {
  readonly category: RoomDisplayCategory;
  readonly collectible: Collectible;
}

interface RankedSelection extends RoomDisplaySelection {
  readonly unlockedAt: number;
}

const CATEGORY_SET: ReadonlySet<CollectibleType> = new Set(ROOM_DISPLAY_CATEGORIES);

function isRoomDisplayCategory(type: CollectibleType): type is RoomDisplayCategory {
  return CATEGORY_SET.has(type);
}

function unlockedAt(firstUnlocked: string | null | undefined): number {
  if (typeof firstUnlocked !== 'string' || firstUnlocked.trim() === '') {
    return Number.NEGATIVE_INFINITY;
  }
  const timestamp = Date.parse(firstUnlocked);
  return Number.isFinite(timestamp) ? timestamp : Number.NEGATIVE_INFINITY;
}

/**
 * Pick the newest owned collectible for each supported Home room category.
 * Catalog iteration makes equal (including invalid) timestamps deterministic.
 */
export function selectRoomDisplays(owned: RoomDisplayOwnedMap): RoomDisplaySelection[] {
  const selected = new Map<RoomDisplayCategory, RankedSelection>();

  for (const collectible of COLLECTIBLES) {
    if (!isRoomDisplayCategory(collectible.type)) continue;

    const entry = owned[collectible.id];
    if (!entry || typeof entry.count !== 'number' || !Number.isFinite(entry.count) || entry.count <= 0) {
      continue;
    }

    const candidate: RankedSelection = {
      category: collectible.type,
      collectible,
      unlockedAt: unlockedAt(entry.firstUnlocked),
    };
    const current = selected.get(collectible.type);
    if (!current || candidate.unlockedAt > current.unlockedAt) {
      selected.set(collectible.type, candidate);
    }
  }

  return ROOM_DISPLAY_CATEGORIES.flatMap((category) => {
    const match = selected.get(category);
    return match ? [{ category: match.category, collectible: match.collectible }] : [];
  });
}
