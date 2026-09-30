import { CATALOG } from './catalog';
import { parkRange, serviceDefinition, dimensions, edgeDistance, entrance, fromKey, key, pathDistances, water } from './world';
import type { Board, Building, Cell, Evaluation } from './types';

export type Need = 'food' | 'leisure' | 'green';
export interface Coverage {
  active: boolean;
  cells: Cell[];
  homes: { home: Building; distance: number; connected: boolean; served: boolean }[];
}

// Coverage uses the same entry points, distance and allocation as evaluate().
// Being in range and actually receiving service are separate facts.
export function buildingCoverage(board: Board, e: Evaluation, provider: Building): Coverage {
  const def = serviceDefinition(board,provider.kind), active = provider.placed && Boolean(e.buildings[provider.id]?.connected);
  const coverage: Coverage = { active, cells: [], homes: [] };
  if (!provider.placed || (!def.service && provider.kind !== 'park')) return coverage;
  const p = entrance(provider), distances = pathDistances(e.connectedRoads, key(p.x, p.z));
  if (provider.kind === 'park') {
    const { w, d } = dimensions(provider),range=parkRange(board);
    if (active) for (let z = Math.max(0, provider.z - range); z < Math.min(board.size, provider.z + d + range); z++) {
      for (let x = Math.max(0, provider.x - range); x < Math.min(board.size, provider.x + w + range); x++) {
        const distance = Math.max(0, provider.x - x, x - (provider.x + w - 1)) + Math.max(0, provider.z - z, z - (provider.z + d - 1));
        if (distance <= range && !water(board, x, z)) coverage.cells.push({ x, z });
      }
    }
  } else if (active) coverage.cells = [...distances].filter(([, distance]) => distance <= def.range!).map(([cell]) => fromKey(cell));
  for (const home of board.buildings.filter(b => b.placed && b.kind === 'house')) {
    const status = e.buildings[home.id], entry = entrance(home);
    const distance = provider.kind === 'park' ? edgeDistance(home, provider) : distances.get(key(entry.x, entry.z));
    if (distance === undefined || distance > (provider.kind === 'park' ? parkRange(board) : def.range!)) continue;
    coverage.homes.push({ home, distance, connected: Boolean(status?.connected), served: active && Boolean(status?.connected) && (provider.kind === 'park' || status?.[def.service!] === provider.id) });
  }
  coverage.homes.sort((a, b) => a.distance - b.distance || a.home.id.localeCompare(b.home.id, 'en'));
  return coverage;
}

export function buildingLabel(b: Building): string { return `${CATALOG[b.kind].name} · 横 ${b.x + 1} / 纵 ${b.z + 1}`; }

export function needFeedback(board: Board, e: Evaluation, home: Building, need: Need): string {
  const status = e.buildings[home.id];
  if (!status?.connected) return '住宅门口的道路尚未连到镇公所';
  if (need !== 'green' && status[need]) {
    const provider = board.buildings.find(b => b.id === status[need])!;
    return `${CATALOG[provider.kind].name} · 步行 ${status[`${need}Distance`]} 格`;
  }
  if (need === 'green' && status.green) return `已在连路公园的 ${parkRange(board)} 格范围内`;
  const providers = board.buildings.filter(b => b.placed && (need === 'green' ? b.kind === 'park' : CATALOG[b.kind].service === need));
  if (!providers.length) return need === 'green' ? `还没有公园，需在住宅 ${parkRange(board)} 格内布置` : `还没有${need === 'food' ? '食物' : '休闲'}商店`;
  if (need === 'green') {
    if (providers.some(b => edgeDistance(home, b) <= parkRange(board))) return '附近公园入口尚未连路，绿地未生效';
    return `最近公园距离 ${Math.min(...providers.map(b => edgeDistance(home, b)))} 格，需不超过 ${parkRange(board)} 格`;
  }
  const connected = providers.filter(b => e.buildings[b.id]?.connected);
  if (!connected.length) return '商店入口尚未连到镇公所';
  const entry = entrance(home), distances = pathDistances(e.connectedRoads, key(entry.x, entry.z));
  const options = connected.map(b => ({ b, distance: distances.get(key(entrance(b).x, entrance(b).z))! }));
  if (options.some(({ b, distance }) => distance <= serviceDefinition(board,b.kind).range!)) return '范围内商店的容量已满，可搬近其他商店或新增一家';
  options.sort((a, b) => (a.distance - serviceDefinition(board,a.b.kind).range!) - (b.distance - serviceDefinition(board,b.b.kind).range!) || a.b.id.localeCompare(b.b.id, 'en'));
  const closest = options[0];
  return `${CATALOG[closest.b.kind].name}需走 ${closest.distance} 格，超过 ${serviceDefinition(board,closest.b.kind).range} 格范围`;
}

export function progressHint(chapter: number, board: Board, e: Evaluation): string {
  if (chapter === 4) return '目标按两岸获得服务的住宅计算，点击委托查看详情';
  const required = [4, 6, 8, 6, 12, 16][chapter - 1], total = board.buildings.filter(b => b.placed && b.kind === 'house').length;
  if (total < required) return `已摆放 ${total} 栋住宅，还需至少 ${required - total} 栋；加商店不会增加住宅数量`;
  if (e.houses < required) return `${total - e.houses} 栋住宅未连路，先接通门口到镇公所`;
  if (e.food < required) return '住宅食物尚未满足：查看商店连路、步行范围与容量';
  if (chapter === 2 && e.green < 4) return '食物已满足，需让四栋住宅进入连路公园的六格范围';
  if (chapter >= 3 && e.leisure < (chapter === 3 ? 6 : required)) return '住宅还缺休闲：查看咖啡馆等设施的步行范围与容量';
  if (chapter >= 5 && e.green < required) return '住宅还缺绿地：公园需连路，最近边缘距离不超过六格';
  return '目标按获得服务的住宅计算，同一需求每栋只计一次';
}
