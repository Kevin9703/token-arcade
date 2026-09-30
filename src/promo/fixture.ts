import { freshTown, mockTotals, parseTown, syncTown } from '../town/store';
import { CATALOG } from '../town/catalog';
import { canPlace, canRoad, key, makeBuilding } from '../town/world';
import type { BuildingKind, TownState } from '../town/types';

// An in-memory, fictional showcase. Never reads or writes a player's slots.
export function promoTown(): TownState {
  const s = freshTown('demo');
  syncTown(s, mockTotals(8));
  s.chapterStars = [3, 3, 3, 3, 3, 3];
  s.tutorialDone = true;
  Object.assign(s.settings, { clockMode: 'fixed', lighting: 'day', season: 'spring', quality: 'high', music: false, muted: true });
  const road = (x: number, z: number) => {
    if (!s.town.roads.includes(key(x, z))) {
      if (!canRoad(s, s.town, x, z)) throw Error(`Invalid showcase road ${x},${z}`);
      s.town.roads.push(key(x, z));
    }
  };
  road(6, 17);
  for (let x = 12; x <= 22; x++) road(x, 16);
  for (let x = 9; x <= 22; x++) road(x, 17);
  for (let z = 13; z <= 15; z++) road(10, z);
  for (let z = 3; z <= 10; z++) road(10, z);
  for (let x = 4; x <= 18; x++) road(x, 10);
  road(14, 7);
  for (let z = 7; z <= 9; z++) road(15, z);
  road(8, 5); road(9, 5);
  const add = (kind: BuildingKind, x: number, z: number, r = 0, variant = 0) => {
    const b = { ...makeBuilding(`promo-${s.nextId++}`, kind, x, z, r), variant };
    const problem = canPlace(s, s.town, b); if (problem) throw Error(`${kind}: ${problem}`);
    if (s.coins < CATALOG[kind].cost) throw Error('Insufficient showcase coins');
    s.coins -= CATALOG[kind].cost; s.town.buildings.push(b);
    return b;
  };
  add('bridge', 10, 11);
  add('library', 18, 14); add('greenhouse', 21, 14);
  add('cafe', 11, 18, 2); add('grocer', 18, 18, 2); add('florist', 21, 18, 2);
  add('fountain', 2, 21); add('planter', 4, 21); add('bench', 8, 21);
  add('lamp', 9, 20); add('tree', 10, 22); add('gazebo', 11, 21);
  add('granary', 18, 21); add('barrel', 17, 22); add('cart', 14, 22);
  [5, 7, 11, 13].forEach((x, i) => add('house', x, 8, 0, i));
  add('market', 16, 7); add('cafe', 11, 5, 1, 2); add('park', 13, 5);
  add('clock', 5, 4, 3);
  const positions = [[1, 8], [1, 4], [18, 3], [21, 8]];
  s.town.buildings.filter(b => b.kind === 'workshop').forEach((b, i) => {
    Object.assign(b, { x: positions[i][0], z: positions[i][1], placed: true });
    const problem = canPlace(s, s.town, b); if (problem) throw Error(`Workshop: ${problem}`);
  });
  const field = add('wheatfield', 12, 14), mill = add('mill', 15, 18, 2);
  field.placed = false; mill.placed = false;
  if (!parseTown(JSON.stringify(s), 'demo')) throw Error('Invalid showcase save');
  return s;
}
