import { CATALOG, CHAPTERS } from './catalog';
import type { Board, Building, BuildingKind, Cell, Evaluation, Goal, TownState } from './types';

export const key = (x: number, z: number): string => `${x},${z}`;
export const STARTER_WIDTH = 18;
export const fromKey = (s: string): Cell => { const [x, z] = s.split(',').map(Number); return { x, z }; };
export const activeChapter = (s: TownState): number => Math.min(6, s.chapterStars.findIndex(n => n === 0) < 0 ? 7 : s.chapterStars.findIndex(n => n === 0) + 1);
export function dimensions(b: Pick<Building, 'kind' | 'rotation'>): { w: number; d: number } {
  const def = CATALOG[b.kind]; return b.rotation % 2 ? { w: def.d, d: def.w } : { w: def.w, d: def.d };
}
export function cells(b: Building): Cell[] {
  const { w, d } = dimensions(b); const out: Cell[] = [];
  for (let z = 0; z < d; z++) for (let x = 0; x < w; x++) out.push({ x: b.x + x, z: b.z + z });
  return out;
}
export function entrance(b: Building): Cell {
  const { w, d } = CATALOG[b.kind]; const x = Math.floor(w / 2), z = d;
  const p = b.rotation === 0 ? [x, z] : b.rotation === 1 ? [d - 1 - z, x] : b.rotation === 2 ? [w - 1 - x, d - 1 - z] : [z, w - 1 - x];
  return { x: b.x + p[0], z: b.z + p[1] };
}
export function water(board: Board, x: number, z: number): boolean {
  return x >= 0 && x < board.size && (board.terrain === 'valley' ? z === 11 || z === 12 : board.terrain === 'river' ? z === 5 || z === 6 : false);
}
export const bridgeSlots = (board: Board): number[] => board.terrain === 'valley' ? [4, 10, 16, 20] : board.terrain === 'river' ? [6] : [];
export function unlocked(s: TownState, board: Board, x: number, z: number): boolean {
  if (x < 0 || z < 0 || x >= board.size || z >= board.size) return false;
  if (board.terrain !== 'valley') return true;
  if (z >= 13) return x < STARTER_WIDTH || s.chapterStars[1] > 0;
  if (z >= 11) return s.chapterStars[2] > 0;
  return s.chapterStars[5] > 0 || (x < 12 && (s.chapterStars[3] > 0 || s.chapterStars[2] > 0 && z >= 3));
}
export function canPlace(s: TownState, board: Board, b: Building): string | null {
  if (!Number.isInteger(b.x) || !Number.isInteger(b.z) || !Number.isInteger(b.rotation) || b.rotation < 0 || b.rotation > 3) return '请使用地图内的完整格子和四个朝向';
  const occupied = new Set(board.buildings.filter(v => v.placed && v.id !== b.id).flatMap(v => cells(v).map(p => key(p.x, p.z))));
  if (b.kind === 'bridge') {
    const row = board.terrain === 'valley' ? 11 : 5;
    if (board.terrain === 'meadow' || b.rotation !== 0 || b.z !== row || !bridgeSlots(board).includes(b.x)) return '石桥需要放在河道标记的桥位上';
  }
  for (const p of cells(b)) {
    if (!unlocked(s, board, p.x, p.z)) return '这片土地还没有开放，先完成当前委托';
    if (water(board, p.x, p.z) !== (b.kind === 'bridge')) return '建筑要放在陆地上，跨河请使用石桥';
    if (occupied.has(key(p.x, p.z))) return '这里已经有建筑了，试试另一块空地';
    if (board.roads.includes(key(p.x, p.z))) return '先擦除这里的道路，再放置建筑';
  }
  return null;
}
export function canRoad(s: TownState, board: Board, x: number, z: number): boolean {
  return Number.isInteger(x) && Number.isInteger(z) && unlocked(s, board, x, z) && !water(board, x, z) && !board.buildings.some(b => b.placed && cells(b).some(p => p.x === x && p.z === z));
}
export function pathDistances(roads: Set<string>, start: string): Map<string, number> {
  const distances = new Map<string, number>(); if (!roads.has(start)) return distances;
  const queue = [start]; distances.set(start, 0);
  for (let i = 0; i < queue.length; i++) {
    const p = fromKey(queue[i]); const d = distances.get(queue[i])!;
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const k = key(p.x + dx, p.z + dz);
      if (roads.has(k) && !distances.has(k)) { distances.set(k, d + 1); queue.push(k); }
    }
  }
  return distances;
}
export function edgeDistance(a: Building, b: Building): number {
  const aa = dimensions(a), bb = dimensions(b);
  return Math.max(0, a.x - (b.x + bb.w - 1), b.x - (a.x + aa.w - 1)) + Math.max(0, a.z - (b.z + bb.d - 1), b.z - (a.z + aa.d - 1));
}
export function evaluate(board: Board): Evaluation {
  const placed = board.buildings.filter(b => b.placed).sort((a, b) => a.id.localeCompare(b.id, 'en'));
  const obstacles = new Set(placed.filter(b => b.kind !== 'bridge').flatMap(b => cells(b).map(p => key(p.x, p.z))));
  const roads = new Set(board.roads.filter(k => !obstacles.has(k)));
  for (const b of placed.filter(b => b.kind === 'bridge')) for (const p of cells(b)) roads.add(key(p.x, p.z));
  const hall = placed.find(b => b.kind === 'hall');
  const hallEntry = hall ? entrance(hall) : { x: -1, z: -1 };
  const connected = new Set(pathDistances(roads, key(hallEntry.x, hallEntry.z)).keys());
  const e: Evaluation = { buildings: {}, connectedRoads: connected, population: 0, houses: 0, food: 0, leisure: 0, green: 0, satisfied: 0, northFood: 0, southFood: 0, northSatisfied: 0, southSatisfied: 0, roadCount: board.roads.length, bridge: false, clock: false, serviceUsed: {} };
  for (const b of placed) { const p = entrance(b); e.buildings[b.id] = { connected: b.kind === 'hall' ? connected.size > 0 : connected.has(key(p.x, p.z)), entrance: p, food: null, leisure: null, green: false }; }
  const homes = placed.filter(b => b.kind === 'house' && e.buildings[b.id].connected);
  for (const type of ['food', 'leisure'] as const) {
    const providers = placed.filter(b => CATALOG[b.kind].service === type && e.buildings[b.id].connected);
    const candidates: { home: Building; shop: Building; distance: number }[] = [];
    for (const shop of providers) {
      const p = entrance(shop); const distances = pathDistances(connected, key(p.x, p.z));
      for (const home of homes) {
        const h = entrance(home); const distance = distances.get(key(h.x, h.z));
        if (distance !== undefined && distance <= CATALOG[shop.kind].range!) candidates.push({ home, shop, distance });
      }
    }
    candidates.sort((a, b) => a.distance - b.distance || a.shop.id.localeCompare(b.shop.id, 'en') || a.home.id.localeCompare(b.home.id, 'en'));
    for (const { home, shop, distance } of candidates) {
      if (e.buildings[home.id][type] || (e.serviceUsed[shop.id] || 0) >= CATALOG[shop.kind].capacity!) continue;
      e.buildings[home.id][type] = shop.id; e.buildings[home.id][`${type}Distance`] = distance; e.serviceUsed[shop.id] = (e.serviceUsed[shop.id] || 0) + 1;
    }
  }
  const parks = placed.filter(b => b.kind === 'park' && e.buildings[b.id].connected);
  for (const h of homes) {
    const status = e.buildings[h.id]; status.green = parks.some(p => edgeDistance(h, p) <= 3);
    e.houses++; e.population += 10;
    if (status.food) { e.food++; h.z < board.size / 2 ? e.northFood++ : e.southFood++; }
    if (status.leisure) e.leisure++;
    if (status.green) e.green++;
    if (status.food && status.leisure && status.green) { e.satisfied++; h.z < board.size / 2 ? e.northSatisfied++ : e.southSatisfied++; }
  }
  e.bridge = placed.some(b => b.kind === 'bridge' && cells(b).some(p => connected.has(key(p.x, p.z))));
  e.clock = placed.some(b => b.kind === 'clock' && e.buildings[b.id].connected);
  return e;
}
const goal = (label: string, current: number, need: number): Goal => ({ label, current, need, met: current >= need });
export function chapterGoals(chapter: number, e: Evaluation): { base: Goal[]; bonus: Goal[] } {
  switch (chapter) {
    case 1: return { base: [goal('四栋住宅接通道路并获得面包', e.food, 4)], bonus: [goal('至少两栋住宅邻近公园', e.green, 2), goal('道路不超过 16 格', e.roadCount <= 16 ? 1 : 0, 1)] };
    case 2: return { base: [goal('六栋住宅获得食物服务', e.food, 6), goal('四栋住宅邻近公园', e.green, 4)], bonus: [goal('六栋住宅都邻近公园', e.green, 6), goal('道路不超过 24 格', e.roadCount <= 24 ? 1 : 0, 1)] };
    case 3: return { base: [goal('八栋住宅获得食物服务', e.food, 8), goal('六栋住宅获得休闲服务', e.leisure, 6)], bonus: [goal('八栋住宅获得休闲服务', e.leisure, 8), goal('六栋住宅满足全部需求', e.satisfied, 6)] };
    case 4: return { base: [goal('一座石桥连通两岸', e.bridge ? 1 : 0, 1), goal('对岸两栋住宅获得食物服务', e.northFood, 2), goal('原岸四栋住宅获得食物服务', e.southFood, 4)], bonus: [goal('对岸四栋住宅获得食物服务', e.northFood, 4), goal('两岸各有住宅满足全部需求', e.northSatisfied > 0 && e.southSatisfied > 0 ? 1 : 0, 1)] };
    case 5: return { base: [goal('十二栋住宅满足全部需求', e.satisfied, 12), goal('道路不超过 40 格', e.roadCount <= 40 ? 1 : 0, 1)], bonus: [goal('道路不超过 36 格', e.roadCount <= 36 ? 1 : 0, 1), goal('十四栋住宅满足全部需求', e.satisfied, 14)] };
    default: return { base: [goal('十六栋住宅满足全部需求', e.satisfied, 16), goal('两岸各有至少四栋满意住宅', Math.min(e.northSatisfied, e.southSatisfied), 4), goal('河谷钟楼接通道路', e.clock ? 1 : 0, 1)], bonus: [goal('二十栋住宅满足全部需求', e.satisfied, 20), goal('道路不超过 64 格', e.roadCount <= 64 ? 1 : 0, 1)] };
  }
}
export function starsForChapter(chapter: number, e: Evaluation): number {
  const goals = chapterGoals(chapter, e); return goals.base.every(g => g.met) ? 1 + goals.bonus.filter(g => g.met).length : 0;
}
export function makeBuilding(id: string, kind: BuildingKind, x: number, z: number, rotation = 0): Building { return { id, kind, x, z, rotation, placed: true, variant: 0 }; }
export function starterBoard(): Board {
  const buildings = [makeBuilding('hall', 'hall', 5, 19, 2), ...[1, 3, 8].map((x, i) => ({ ...makeBuilding(`home-${i + 1}`, 'house', x, 14), variant: i })), { ...makeBuilding('home-4', 'house', 9, 18, 2), variant: 3 }, makeBuilding('bakery-1', 'bakery', 6, 14), makeBuilding('park-1', 'park', 1, 18, 2)];
  return { size: 24, terrain: 'valley', buildings, roads: [...Array.from({ length: 11 }, (_, i) => key(i + 1, 16)), key(1, 17), key(9, 17), key(6, 18)] };
}
export function subsidyEntitlement(s: TownState): number { return CHAPTERS.reduce((sum, c, i) => sum + (s.chapterStars[i] > 0 ? c.subsidy : 0), 0); }
