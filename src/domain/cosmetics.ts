/*
 * cosmetics.ts — the tiny, intentional P1 cosmetic surface.
 *
 * These ids are the collectibles that have an immediate visual role in the
 * arcade. Keeping the mapping explicit prevents a newly-added theme or frame
 * from accidentally becoming equipable before it has real runtime art.
 */

import type { CollectibleType, ProfileFrameId, RoomThemeId } from '../core/types';

export const ROOM_THEME_IDS: readonly Exclude<RoomThemeId, 'base'>[] = ['e_sunset', 'l_forest'];
export const PROFILE_FRAME_IDS: readonly Exclude<ProfileFrameId, 'base'>[] = ['r_frame'];

export function isRoomThemeId(id: string): id is RoomThemeId {
  return id === 'base' || ROOM_THEME_IDS.includes(id as Exclude<RoomThemeId, 'base'>);
}

export function isProfileFrameId(id: string): id is ProfileFrameId {
  return id === 'base' || PROFILE_FRAME_IDS.includes(id as Exclude<ProfileFrameId, 'base'>);
}

/** Only these shop categories have a meaningful finite P1 cosmetic pool. */
export function isP1CosmeticType(type: CollectibleType | undefined): type is 'theme' | 'frame' {
  return type === 'theme' || type === 'frame';
}

