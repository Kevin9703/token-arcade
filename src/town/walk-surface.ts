import { groundHeight } from './terrain';
import type { Board, Building, Cell } from './types';

export const BUILDING_GROUND_Y = .04;
export const ROAD_WALK_Y = .105;
export const BRIDGE_STONES = Array.from({ length: 9 }, (_, i) => ({
  z: -.96 + i * .24, y: .19 + .075 * Math.sin(i / 8 * Math.PI), height: .07, depth: .23,
}));

/** Visual contact follows the same stone profile as the exported bridge.
 * Residents keep their simulation route; only the narrow crossing's foot position
 * is fitted between its parapets. Both walking lanes remain distinct.
 */
export function walkSurface(buildings: readonly Building[], point: Cell, board?: Board): Cell & { y: number } {
  const ground = board ? groundHeight(board, point.x, point.z) : 0;
  for(const b of buildings){
    if(!b.placed||b.kind!=='fishinghut')continue;
    const angle=b.rotation*Math.PI/2,c=Math.cos(angle),s=Math.sin(angle),dx=point.x-b.x-1,dz=point.z-b.z-1;
    const x=dx*c-dz*s,z=dx*s+dz*c;
    if(x<-.725||x>.025||z< -1.80||z>-.5)continue;
    const t=Math.max(0,Math.min(1,(-z-.5)/.20)),blend=t*t*(3-2*t);
    return {...point,y:ground+ROAD_WALK_Y+(.16-ROAD_WALK_Y)*blend};
  }
  for (const bridge of buildings) {
    if (!bridge.placed || bridge.kind !== 'bridge') continue;
    const quarter = ((bridge.rotation % 4) + 4) % 4, swapped = quarter % 2;
    const dx = point.x - bridge.x - (swapped ? 1 : .5), dz = point.z - bridge.z - (swapped ? .5 : 1);
    const angle = quarter * Math.PI / 2, c = Math.cos(angle), s = Math.sin(angle);
    const localX = dx * c - dz * s, localZ = dx * s + dz * c, distance = Math.abs(localZ);
    if (Math.abs(localX) > .51 || distance >= 1.5) continue;
    const approach = Math.min(1, Math.max(0, (1.5 - distance) / .4));
    const blend = approach * approach * (3 - 2 * approach);
    const inset = Math.max(-.19, Math.min(.19, localX));
    const fittedX = localX + (inset - localX) * blend;
    // Account for the forward shoe, including the higher stone it straddles.
    const supportZ = Math.max(0, Math.min(.96, distance - .13));
    const deck = BUILDING_GROUND_Y + .225 + .075 * Math.cos(supportZ / .96 * Math.PI / 2);
    return { x: bridge.x + (swapped ? 1 : .5) + fittedX * c + localZ * s,
      z: bridge.z + (swapped ? .5 : 1) - fittedX * s + localZ * c,
      y: ground + ROAD_WALK_Y + (deck + .006 - ROAD_WALK_Y) * blend };
  }
  return { ...point, y: ground + ROAD_WALK_Y };
}
