import { byId, COLLECTIBLES } from '../content/collectibles';
import type {
  Collectible,
  CollectibleType,
  RoomDecorationPlacement,
  RoomDecorationZone,
} from '../core/types';
import { selectRoomDisplays, type RoomDisplayOwnedMap } from './roomDisplay';

const TYPE_ZONE: Partial<Record<CollectibleType, RoomDecorationZone>> = {
  sign: 'wall',
  badge: 'wall',
  decor: 'floor',
  trophy: 'floor',
  buddy: 'buddy',
};

export const ROOM_DECORATION_CAPACITY: Readonly<Record<RoomDecorationZone, number>> = {
  wall: 4,
  floor: 4,
  buddy: 2,
};

const AUTO_POSITIONS: Readonly<Record<CollectibleType, { x: number; y: number }>> = {
  sign: { x: 0.28, y: 0.34 },
  badge: { x: 0.74, y: 0.6 },
  decor: { x: 0.22, y: 0.56 },
  trophy: { x: 0.72, y: 0.48 },
  buddy: { x: 0.42, y: 0.55 },
  frame: { x: 0.5, y: 0.5 },
  theme: { x: 0.5, y: 0.5 },
};

function owned(ownedMap: RoomDisplayOwnedMap, id: string): boolean {
  const count = ownedMap[id]?.count;
  return typeof count === 'number' && Number.isFinite(count) && count > 0;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/** A quiet 40-step magnetic grid keeps rows and edges crisp while still
 * yielding hundreds of possible positions inside each scenery zone. Exported so
 * the editor's live ghost can preview the exact resting spot before a drop. */
export function alignRoomDecorationCoord(value: number): number {
  return Math.round(clamp01(value) * 40) / 40;
}

const align = alignRoomDecorationCoord;

export function roomDecorationZoneFor(type: CollectibleType): RoomDecorationZone | null {
  return TYPE_ZONE[type] ?? null;
}

export function roomDecorationCollectibles(ownedMap: RoomDisplayOwnedMap): Collectible[] {
  return COLLECTIBLES.filter((collectible) => roomDecorationZoneFor(collectible.type) && owned(ownedMap, collectible.id));
}

export function autoArrangeRoomDecorations(ownedMap: RoomDisplayOwnedMap): RoomDecorationPlacement[] {
  return selectRoomDisplays(ownedMap).flatMap(({ collectible }) => {
    const zone = roomDecorationZoneFor(collectible.type);
    if (!zone) return [];
    const point = AUTO_POSITIONS[collectible.type];
    return [{ collectibleId: collectible.id, zone, x: point.x, y: point.y }];
  });
}

/** Remove stale, unowned, incompatible, duplicated, non-finite and over-capacity
 * entries from a persisted layout. Coordinates are clamped and magnetically
 * aligned, making malformed saves harmless to rendering. */
export function sanitizeRoomDecorations(
  ownedMap: RoomDisplayOwnedMap,
  placements: readonly RoomDecorationPlacement[] | null | undefined,
): RoomDecorationPlacement[] | null {
  if (placements == null) return null;

  const seen = new Set<string>();
  const used: Record<RoomDecorationZone, number> = { wall: 0, floor: 0, buddy: 0 };
  const clean: RoomDecorationPlacement[] = [];

  for (const placement of placements) {
    if (!placement || typeof placement.collectibleId !== 'string') continue;
    const collectible = byId[placement.collectibleId];
    if (!collectible || !owned(ownedMap, collectible.id) || seen.has(collectible.id)) continue;
    const zone = roomDecorationZoneFor(collectible.type);
    if (!zone || placement.zone !== zone || used[zone] >= ROOM_DECORATION_CAPACITY[zone]) continue;
    if (!Number.isFinite(placement.x) || !Number.isFinite(placement.y)) continue;

    clean.push({
      collectibleId: collectible.id,
      zone,
      x: align(placement.x),
      y: align(placement.y),
    });
    seen.add(collectible.id);
    used[zone]++;
  }
  return clean;
}

export function resolveRoomDecorations(
  ownedMap: RoomDisplayOwnedMap,
  placements: readonly RoomDecorationPlacement[] | null | undefined,
): RoomDecorationPlacement[] {
  return placements == null
    ? autoArrangeRoomDecorations(ownedMap)
    : sanitizeRoomDecorations(ownedMap, placements) ?? [];
}
