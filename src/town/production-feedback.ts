import { productionLabel, stationProblem, stationSpot } from './village';
import type { Building, Evaluation, TownState } from './types';
import type { Season } from './world-time';

export interface ProductionWorker { name: string; working: boolean; enRoute: boolean }

/** Describe the real assigned worker; blocked or full stations never imply work. */
export function productionStatus(s: TownState, e: Evaluation, b: Building, season: Season, sleep: boolean, worker?: ProductionWorker): string {
  const label = productionLabel(s, e, b, season, sleep);
  if (sleep || stationProblem(s, e, b, season)) return label;
  if (!worker) return '等待空闲村民 · 生产设施共用最多三位邻居，轮流工作';
  if (!worker.working) return `${worker.name}准备返岗 · ${label}`;
  if (worker.enRoute) return `${worker.name}正在前往 · ${label}`;
  if (b.kind === 'fishinghut' && label.startsWith('抛竿等待收鱼')) return `${worker.name}正在码头钓鱼 · ${label.split(' · ').at(-1)}`;
  return `${worker.name} · ${label}`;
}

/** River-side view reveals the pier, which is behind the hut from the town side. */
export function fishingView(b: Building) {
  return { target: stationSpot(b), azimuth: -b.rotation * Math.PI / 2 - Math.PI + .55, elevation: 50 * Math.PI / 180, zoom: 2.5 };
}
