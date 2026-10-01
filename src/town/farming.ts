import { dimensions, entrance, fromKey, key, pathDistances } from './world';
import type { Board, Building, Evaluation, FarmPhase, FarmRun, FarmState } from './types';
import type { Season } from './world-time';
import type { WalkPoint } from './pedestrians';
import { interiorSpot } from './doorways';

export const FARM_PHASES: FarmPhase[] = ['sowing', 'growing', 'harvesting', 'to-mill', 'milling', 'to-bakery', 'baking', 'returning'];
export const FARM_LABELS: Record<FarmPhase, string> = { sowing: '播种', growing: '麦苗生长', harvesting: '收割小麦', 'to-mill': '把麦子送往磨坊', milling: '风车磨面', 'to-bakery': '把面粉送往面包店', baking: '烘焙面包', returning: '回麦田准备下一季' };
export const freshFarm = (): FarmState => ({ runs: {}, wheat: 0, flour: 0, bread: 0, batches: 0, activeSeconds:0 });
export interface FarmChain { field: Building; mill?: Building; bakery?: Building; toMill: WalkPoint[]; toBakery: WalkPoint[]; returning: WalkPoint[]; problem: string }
export interface FarmJob {chainId?:string;cycles?:number; fieldId: string; phase: FarmPhase; target: WalkPoint; entrance: WalkPoint; buildingId?:string; access?:WalkPoint[]; accessId?:string; carrying: 'wheat' | import('./village').Good | null; harvesting: boolean }
export function bakeryMaterialLabel(id:string,chains:FarmChain[],farm:FarmState,sleep:boolean):string {
  if(sleep)return '夜间休息中';
  const runs=chains.filter(c=>c.bakery?.id===id&&!c.problem).map(c=>farm.runs[c.field.id]).filter(Boolean);
  if(runs.some(r=>r.phase==='baking'))return `烘焙中 · ${Math.max(0,Math.min(100,Math.round(runs.find(r=>r.phase==='baking')!.elapsed/3*100)))}% · 烘焙还需 ${Math.max(0,Math.ceil(3-runs.find(r=>r.phase==='baking')!.elapsed))} 秒`;
  if(runs.some(r=>r.phase==='to-bakery'))return '面粉正在送来';
  return '缺少原材料：面粉';
}
export function roadRoute(roads: Set<string>, a: WalkPoint, b: WalkPoint): WalkPoint[] {
  const start = key(Math.floor(a.x), Math.floor(a.z)), end = key(Math.floor(b.x), Math.floor(b.z));
  if (!roads.has(start) || !roads.has(end)) return [];
  const queue = [start], previous = new Map<string, string | null>([[start, null]]);
  for (let i = 0; i < queue.length && !previous.has(end); i++) {
    const p = fromKey(queue[i]);
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const next = key(p.x + dx, p.z + dz);
      if (roads.has(next) && !previous.has(next)) { previous.set(next, queue[i]); queue.push(next); }
    }
  }
  if (!previous.has(end)) return [];
  const path: WalkPoint[] = []; let cell: string | null = end;
  while (cell !== null) { const p = fromKey(cell); path.unshift({ x: p.x + .5, z: p.z + .5 }); cell = previous.get(cell)!; }
  return path;
}
const entry = (b: Building) => { const p = entrance(b); return { x: p.x + .5, z: p.z + .5 }; };
const workSpot = (b: Building) => { const d = dimensions(b); return { x: b.x + d.w / 2, z: b.z + d.d / 2 }; };
export function farmChains(board: Board, e: Evaluation, farm: FarmState): FarmChain[] {
  const connected = (b: Building) => b.placed && Boolean(e.buildings[b.id]?.connected);
  const mills = board.buildings.filter(b => b.kind === 'mill' && connected(b)), bakeries = board.buildings.filter(b => b.kind === 'bakery' && connected(b));
  return board.buildings.filter(b => b.kind === 'wheatfield' && b.placed).sort((a, b) => a.id.localeCompare(b.id, 'en')).map((field, index) => {
    const nearest = (from: Building, candidates: Building[]) => {
      const p = entrance(from), distances = pathDistances(e.connectedRoads, key(p.x, p.z));
      return [...candidates].sort((a, b) => (distances.get(key(entrance(a).x, entrance(a).z)) ?? Infinity) - (distances.get(key(entrance(b).x, entrance(b).z)) ?? Infinity) || a.id.localeCompare(b.id, 'en'))[0];
    };
    const run = farm.runs[field.id];
    const mill = run && run.phase !== 'sowing' ? mills.find(b => b.id === run.millId) : nearest(field, mills);
    const bakery = run && run.phase !== 'sowing' ? bakeries.find(b => b.id === run.bakeryId) : mill ? nearest(mill, bakeries) : undefined;
    const problem = !connected(field) ? '麦田入口需要连到镇公所' : index >= Math.min(3, e.houses) ? '需要连路住宅安排村民，最多三人务农' : !mill ? '需要一座连路的风车磨坊' : !bakery ? '需要一座连路的面包店' : '';
    const toMill = mill && !problem ? [workSpot(field), ...roadRoute(e.connectedRoads, entry(field), entry(mill))] : [];
    const toBakery = mill && bakery && !problem ? roadRoute(e.connectedRoads, entry(mill), entry(bakery)) : [];
    const returning = bakery && !problem ? [...roadRoute(e.connectedRoads, entry(bakery), entry(field)), workSpot(field)] : [];
    return { field, mill, bakery, toMill, toBakery, returning, problem };
  });
}
export function routeLength(path: WalkPoint[]): number { return path.reduce((sum, p, i) => i ? sum + Math.hypot(p.x - path[i - 1].x, p.z - path[i - 1].z) : sum, 0); }
export function sampleRoute(path: WalkPoint[], fraction: number): WalkPoint {
  let distance = routeLength(path) * Math.max(0, Math.min(1, fraction));
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1], b = path[i], length = Math.hypot(b.x - a.x, b.z - a.z);
    if (distance <= length) return { x: a.x + (b.x - a.x) * distance / (length || 1), z: a.z + (b.z - a.z) * distance / (length || 1) }; distance -= length;
  } return path[path.length - 1] || { x: 0, z: 0 };
}
export function farmDuration(chain: FarmChain, phase: FarmPhase, season: Season): number {
  if (phase === 'to-mill' || phase === 'to-bakery' || phase === 'returning') return Math.max(2, routeLength(phase === 'to-mill' ? chain.toMill : phase === 'to-bakery' ? chain.toBakery : chain.returning) / .5);
  return { sowing: 6, growing: 24 / { spring: 1, summer: 1.15, autumn: .85, winter: .45 }[season], harvesting: 5, milling: 5, baking: 3 }[phase];
}
export function tickFarm(chains: FarmChain[], farm: FarmState, dt: number, sleep: boolean, season: Season, ready?: Set<string>): FarmJob[] {
  if (sleep || !Number.isFinite(dt) || dt < 0) return [];
  const jobs: FarmJob[] = [];
  for (const chain of chains) {
    if (chain.problem || !chain.mill || !chain.bakery) continue;
    const run: FarmRun = farm.runs[chain.field.id] ||= { phase: 'sowing', elapsed: 0, millId: chain.mill.id, bakeryId: chain.bakery.id, batches: 0 };
    if (run.phase === 'sowing') { run.millId = chain.mill.id; run.bakeryId = chain.bakery.id; }
    let remaining = !ready || ready.has(chain.field.id) ? Math.min(dt, 1) : 0;
    while (remaining > 0) {
      const duration = farmDuration(chain, run.phase, season), step = Math.min(remaining, Math.max(0, duration - run.elapsed));
      run.elapsed += step; remaining -= step;
      if (run.elapsed < duration) break;
      if (run.phase === 'harvesting') farm.wheat += 2;
      if (run.phase === 'milling') { farm.wheat = Math.max(0, farm.wheat - 2); farm.flour += 3; }
      if (run.phase === 'baking') { farm.flour = Math.max(0, farm.flour - 2); farm.bread += 4; farm.batches++; run.batches++; }
      run.phase = FARM_PHASES[(FARM_PHASES.indexOf(run.phase) + 1) % FARM_PHASES.length]; run.elapsed = 0;
    }
    const path = run.phase === 'to-mill' ? chain.toMill : run.phase === 'to-bakery' ? chain.toBakery : run.phase === 'returning' ? chain.returning : [];
    const target = path.length ? sampleRoute(path, run.elapsed / farmDuration(chain, run.phase, season)) : ['milling'].includes(run.phase) ? entry(chain.mill) : run.phase === 'baking' ? entry(chain.bakery) : workSpot(chain.field);
    // Distinct loading spots prevent multiple farmers standing in the same doorway.
    if(run.phase==='milling'||run.phase==='baking'){
      const station=run.phase==='milling'?chain.mill:chain.bakery,slot=[-.14,0,.14][chains.indexOf(chain)%3];
      Object.assign(target,interiorSpot(station,slot));
    }
    const fieldSpot=workSpot(chain.field);
    const approach=run.phase==='milling'?entry(chain.mill):run.phase==='baking'?entry(chain.bakery):path.length?[...path].filter(p=>Math.hypot(p.x-fieldSpot.x,p.z-fieldSpot.z)>.001).sort((a,b)=>Math.hypot(a.x-target.x,a.z-target.z)-Math.hypot(b.x-target.x,b.z-target.z))[0]||entry(chain.field):entry(chain.field);
    jobs.push({ cycles:run.batches, fieldId: chain.field.id, phase: run.phase, target, entrance: approach, buildingId:run.phase==='milling'?chain.mill.id:run.phase==='baking'?chain.bakery.id:undefined, carrying: run.phase === 'to-mill' ? 'wheat' : run.phase === 'to-bakery' ? 'flour' : null, harvesting: run.phase === 'harvesting' || run.phase === 'sowing' });
  }
  if(jobs.some(job=>!ready||ready.has(job.fieldId)))farm.activeSeconds+=Math.min(dt,1);
  return jobs;
}
