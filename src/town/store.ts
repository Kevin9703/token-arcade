import {freshVillage,validVillage,ORDERS,completeOrder} from './village';
import {worldTime} from './world-time';
import { levelFor } from './levels';
import type { ProjectUsage } from '../data/types';
import type { DataMode } from './types';
import { CATALOG, CHAPTER_COSMETICS } from './catalog';
import { activeChapter, canPlace, canRoad, evaluate, makeBuilding, starsForChapter, starterBoard, subsidyEntitlement, key, cells, water, fromKey, bridgeSlots, fishingShore } from './world';
import { PUZZLES, freshPuzzle, puzzleStars } from './puzzles';
import { atHour } from './world-time';
import { freshFarm, FARM_PHASES } from './farming';
import type { Board, Building, BuildingKind, TownState } from './types';

export const TOWN_KEYS = { live: 'tokenTown.slot.live.v1', demo: 'tokenTown.slot.demo.v1' };
const META = 'tokenTown.mode.v1';
const progressFingerprint=(s:TownState):string=>{const {revision,worldSeconds,settings,farm,village,...progress}=s;return JSON.stringify({...progress,villageProgress:{completed:village.completed,activeOrder:village.activeOrder,choices:village.choices}});};
export function freshTown(mode: DataMode): TownState {
  return { version: 1, mode, revision: 0, coins: 0, tokenCoins: 0, residue: 0, subsidyPaid: 0, chapterStars: [0, 0, 0, 0, 0, 0], puzzleStars: {}, projects: [], town: starterBoard(), puzzleBoards: {}, demoStep: 0, nextId: 20, tutorialDone: false, history: 'unscanned', worldSeconds: 0, farm: freshFarm(), village:freshVillage(), settings: { music: true, musicVolume: .28, clockMode: 'cycle', season: 'cycle', muted: false, lighting: 'day', quality: 'medium', reducedMotion: false, cameraInput: 'trackpad', goalCollapsed: false } };
}
function validBoard(board: Board): boolean {
  if (!board || !Number.isInteger(board.size) || board.size < 8 || board.size > 24 || !['valley', 'meadow', 'river'].includes(board.terrain) || !Array.isArray(board.buildings) || !Array.isArray(board.roads)) return false;
  const ids = new Set<string>(), occupied = new Set<string>();
  for (const b of board.buildings) {
    if (!b || typeof b.id !== 'string' || ids.has(b.id) || !CATALOG[b.kind] || !Number.isInteger(b.rotation) || b.rotation < 0 || b.rotation > 3 || !Number.isInteger(b.x) || !Number.isInteger(b.z) || typeof b.placed !== 'boolean' || !Number.isInteger(b.variant) || b.variant < 0 || b.variant > 4) return false;
    ids.add(b.id);
    if (b.placed && b.kind === 'bridge' && (board.terrain === 'meadow' || b.rotation !== 0 || b.z !== (board.terrain === 'valley' ? 11 : 5) || !bridgeSlots(board).includes(b.x))) return false;
    if (b.placed&&b.kind==='fishinghut'&&!fishingShore(board,b))return false;
    if (b.placed) for (const p of cells(b)) { const k = key(p.x, p.z); if (p.x < 0 || p.z < 0 || p.x >= board.size || p.z >= board.size || occupied.has(k) || water(board, p.x, p.z) !== (b.kind === 'bridge')) return false; occupied.add(k); }
  }
  if (board.buildings.filter(b => b.kind === 'hall' && b.placed).length !== 1) return false;
  return board.roads.every(k => typeof k === 'string' && /^\d+,\d+$/.test(k) && k.split(',').every(n => Number(n) < board.size) && !occupied.has(k) && !water(board, fromKey(k).x, fromKey(k).z)) && new Set(board.roads).size === board.roads.length;
}
export function parseTown(raw: string | null, mode: DataMode): TownState | null {
  if (!raw) return null;
  try {
    const s = JSON.parse(raw) as TownState;
    if (!s || s.version !== 1 || s.mode !== mode || !validBoard(s.town) || s.town.size !== 24 || s.town.terrain !== 'valley') return null;
    for (const n of [s.coins, s.tokenCoins, s.residue, s.subsidyPaid, s.nextId, s.demoStep, s.revision]) if (!Number.isSafeInteger(n) || n < 0) return null;
    if (s.residue >= 10000 || !Array.isArray(s.chapterStars) || s.chapterStars.length !== 6 || s.chapterStars.some(n => !Number.isInteger(n) || n < 0 || n > 3)) return null;
    const firstUnfinished = s.chapterStars.indexOf(0); if (firstUnfinished >= 0 && s.chapterStars.slice(firstUnfinished).some(n => n > 0)) return null;
    if (!s.puzzleStars || !s.puzzleBoards || Object.values(s.puzzleStars).some(n => !Number.isInteger(n) || n < 0 || n > 3) || Object.values(s.puzzleBoards).some(b => !validBoard(b))) return null;
    if (!Array.isArray(s.projects) || s.projects.some(p => !p || typeof p.id !== 'string' || typeof p.name !== 'string' || !Number.isSafeInteger(p.credited) || p.credited < 0 || !Number.isSafeInteger(p.tokens) || p.tokens < p.credited) || new Set(s.projects.map(p => p.id)).size !== s.projects.length) return null;
    if (s.projects.some(p => typeof p.provider !== 'string' || s.town.buildings.filter(b => b.kind === 'workshop' && b.projectId === p.id).length !== 1) || s.town.buildings.some(b => b.kind === 'workshop' && !s.projects.some(p => p.id === b.projectId))) return null;
    if (typeof s.tutorialDone !== 'boolean' || !['unscanned', 'empty', 'ready'].includes(s.history) || Array.isArray(s.puzzleStars) || Array.isArray(s.puzzleBoards) || typeof s.puzzleStars !== 'object' || typeof s.puzzleBoards !== 'object') return null;
    for (const [id, board] of Object.entries(s.puzzleBoards)) { const puzzle = PUZZLES.find(p => p.id === id); if (!puzzle || board.size !== puzzle.solution.size || board.terrain !== puzzle.solution.terrain || board.buildings.length !== puzzle.solution.buildings.length || board.roads.length > puzzle.roadBudget || board.buildings.some(b => !puzzle.solution.buildings.some(o => o.id === b.id && o.kind === b.kind))) return null; }
    if (Object.keys(s.puzzleStars).some(id => !PUZZLES.some(p => p.id === id))) return null;
    if (s.subsidyPaid > Math.min(Math.floor(s.tokenCoins / 5), subsidyEntitlement(s)) || s.coins > s.tokenCoins + s.subsidyPaid || !s.settings || typeof s.settings.muted !== 'boolean' || typeof s.settings.reducedMotion !== 'boolean' || !['day', 'sunset', 'night'].includes(s.settings.lighting) || !['high', 'medium', 'low'].includes(s.settings.quality)) return null;
    s.settings.goalCollapsed ??= false; if (typeof s.settings.goalCollapsed !== 'boolean') return null;
    s.settings.cameraInput ??= 'trackpad'; // Preserve existing town saves.
    s.settings.clockMode ??= 'cycle'; s.settings.season ??= 'cycle'; s.worldSeconds ??= 0;
    if (!['cycle','fixed'].includes(s.settings.clockMode) || !['cycle','spring','summer','autumn','winter'].includes(s.settings.season) || !Number.isFinite(s.worldSeconds) || s.worldSeconds < 0) return null;
    if (!['trackpad', 'mouse'].includes(s.settings.cameraInput)) return null;
    s.settings.music ??= true; s.settings.musicVolume ??= .28; s.farm ??= freshFarm();
    s.farm.activeSeconds ??= 0;
    if (typeof s.settings.music !== 'boolean' || !Number.isFinite(s.settings.musicVolume) || s.settings.musicVolume < 0 || s.settings.musicVolume > 1) return null;
    if (!s.farm || !s.farm.runs || Array.isArray(s.farm.runs) || typeof s.farm.runs !== 'object' || [s.farm.wheat,s.farm.flour,s.farm.bread,s.farm.batches].some(n=>!Number.isSafeInteger(n)||n<0)) return null;
    if(!Number.isFinite(s.farm.activeSeconds)||s.farm.activeSeconds<0)return null;
    if (Object.values(s.farm.runs).some(r=>!r||!FARM_PHASES.includes(r.phase)||!Number.isFinite(r.elapsed)||r.elapsed<0||typeof r.millId!=='string'||typeof r.bakeryId!=='string'||!Number.isSafeInteger(r.batches)||r.batches<0)) return null;
    s.village ??= freshVillage();if(!validVillage(s.village))return null;
    return s;
  } catch { return null; }
}
export function settleSubsidy(s: TownState): number {
  const available = Math.min(subsidyEntitlement(s), Math.floor(s.tokenCoins / 5));
  const gain = Math.max(0, available - s.subsidyPaid); s.subsidyPaid += gain; s.coins += gain; return gain;
}
export interface TownSync { newTokens: number; coins: number; subsidy: number; newProjects: number; grown: string[] }
export function syncTown(s: TownState, totals: ProjectUsage[]): TownSync {
  let gained = 0, newProjects = 0; const grown: string[] = []; const seen = new Set<string>();
  for (const t of totals) {
    if (!t || typeof t.id !== 'string' || typeof t.name !== 'string' || !Number.isFinite(t.tokens) || t.tokens < 0 || seen.has(t.id)) continue;
    seen.add(t.id); const tokens = Math.min(Number.MAX_SAFE_INTEGER, Math.floor(t.tokens));
    let p = s.projects.find(p => p.id === t.id);
    if (!p && t.legacyId && !s.projects.some(p => p.id === t.id)) {
      p = s.projects.find(p => p.id === t.legacyId);
      if (p) { const previousId = p.id; p.id = t.id; for (const b of s.town.buildings) if (b.projectId === previousId) b.projectId = t.id; }
    }
    if (!p) {
      p = { id: t.id, name: t.name, provider: t.provider, tokens: 0, credited: 0 }; s.projects.push(p); newProjects++;
      s.town.buildings.push({ ...makeBuilding(`project-${s.nextId++}`, 'workshop', 0, 0), placed: false, projectId: t.id });
    }
    const before = levelFor(p.tokens); gained += Math.max(0, tokens - p.credited);
    p.credited = Math.max(p.credited, tokens); p.tokens = Math.max(p.tokens, tokens); p.name = t.name; p.provider = t.provider;
    if (levelFor(p.tokens) > before) grown.push(p.name);
  }
  const pool = s.residue + gained; const coins = Math.floor(pool / 10000); s.residue = pool % 10000; s.tokenCoins += coins; s.coins += coins;
  const subsidy = settleSubsidy(s); if (s.projects.length > 0) s.history = 'ready';
  return { newTokens: gained, coins, subsidy, newProjects, grown };
}
export function mockTotals(step: number): ProjectUsage[] {
  const base = [1_850_000, 1_040_000, 740_000, 370_000];
  return ['河谷笔记', '纸飞机', '小小星图', '口袋花园'].map((name, i) => ({ id: `demo-project-${i}`, name, provider: i % 2 ? 'claude' : 'codex', tokens: base[i] + step * [270_000, 230_000, 180_000, 120_000][i] }));
}
export class TownStore {
  state: TownState; activePuzzle: string | null = null; persistenceError = ''; conflict = false;
  private listeners = new Set<() => void>();
  private persistedProgress:string;
  constructor(mode?: DataMode) {
    let savedMode: DataMode = 'live'; try { if (localStorage.getItem(META) === 'demo') savedMode = 'demo'; } catch { /* handled by save */ }
    this.state = this.read(mode || savedMode);
    this.persistedProgress=progressFingerprint(this.state);
    if (typeof window !== 'undefined') window.addEventListener('storage', e => {
      if (e.key === TOWN_KEYS[this.state.mode] && e.newValue) { const s = parseTown(e.newValue, this.state.mode); if (s&&s.revision>this.state.revision) {
        if(progressFingerprint(s)===this.persistedProgress){const preferences=JSON.stringify(this.state.settings)!==JSON.stringify(s.settings);this.state.revision=s.revision;this.state.worldSeconds=s.worldSeconds;if(s.farm.activeSeconds>this.state.farm.activeSeconds)this.state.farm=s.farm;if(s.village.activeSeconds>this.state.village.activeSeconds)this.state.village=s.village;this.state.settings=s.settings;if(preferences)this.emit();}
        else{this.state=s;this.persistedProgress=progressFingerprint(s);this.conflict=true;this.emit();}
      } }
    });
  }
  private read(mode: DataMode): TownState { try { return parseTown(localStorage.getItem(TOWN_KEYS[mode]), mode) || freshTown(mode); } catch { return freshTown(mode); } }
  subscribe(f: () => void): () => void { this.listeners.add(f); return () => this.listeners.delete(f); }
  private emit(): void { for (const f of this.listeners) f(); }
  commit(notify=true): boolean {
    // Read the latest revision before writing; another tab never silently loses progress.
    try {
      const disk = parseTown(localStorage.getItem(TOWN_KEYS[this.state.mode]), this.state.mode);
      if (disk && disk.revision > this.state.revision) {
        if(progressFingerprint(disk)===this.persistedProgress){this.state.revision=disk.revision;if(disk.farm.activeSeconds>this.state.farm.activeSeconds)this.state.farm=disk.farm;if(disk.village.activeSeconds>this.state.village.activeSeconds)this.state.village=disk.village;}
        else{this.state=disk;this.persistedProgress=progressFingerprint(disk);this.conflict=true;this.emit();return false;}
      }
      this.state.revision++; localStorage.setItem(TOWN_KEYS[this.state.mode], JSON.stringify(this.state)); localStorage.setItem(META, this.state.mode); this.persistenceError = '';
      this.persistedProgress=progressFingerprint(this.state);
    } catch { this.persistenceError = '浏览器未能保存进度，请在设置中导出存档'; }
    if(notify)this.emit();return !this.persistenceError;
  }
  setMode(mode: DataMode): void { if (mode === this.state.mode) return; this.state = this.read(mode);this.persistedProgress=progressFingerprint(this.state); this.activePuzzle = null; this.conflict = false; this.commit(); }
  get board(): Board { return this.activePuzzle ? this.state.puzzleBoards[this.activePuzzle] : this.state.town; }
  get puzzle() { return PUZZLES.find(p => p.id === this.activePuzzle); }
  unlockedKind(kind: BuildingKind): boolean {
    if (this.activePuzzle) return this.board.buildings.some(b => b.kind === kind);
    const order=ORDERS.find(o=>o.reward===kind);if(order)return (this.state.village.completed[order.id]||0)>0;
    const p = PUZZLES.find(p => p.reward === kind); return p ? (this.state.puzzleStars[p.id] || 0) > 0 : CATALOG[kind].chapter <= activeChapter(this.state);
  }
  sync(totals: ProjectUsage[]): TownSync { const result = syncTown(this.state, totals); this.commit(); return result; }
  syncDemo(): TownSync { const result = syncTown(this.state, mockTotals(this.state.demoStep++)); this.commit(); return result; }
  road(x: number, z: number, erase = false): string | null {
    const k = key(x, z); const index = this.board.roads.indexOf(k);
    if (erase) { if (index >= 0) { this.board.roads.splice(index, 1); this.commit(); } return null; }
    if (index >= 0) return null;
    if (!canRoad(this.state, this.board, x, z)) return '道路需要铺在已开放的空地上';
    if (this.puzzle && this.board.roads.length >= this.puzzle.roadBudget) return `本关最多使用 ${this.puzzle.roadBudget} 格道路，可擦除或重新规划`;
    this.board.roads.push(k); this.commit(); return null;
  }
  place(kind: BuildingKind, x: number, z: number, rotation: number, id?: string): string | null {
    if (!this.unlockedKind(kind)) return '先完成对应的委托或规划关，解锁这张蓝图';
    const existing = id ? this.board.buildings.find(b => b.id === id && b.kind === kind) : undefined;
    if (id && !existing) return '这栋建筑不在当前库存中';
    if (this.activePuzzle && !existing) return '规划关使用固定库存，请选择一个已有建筑';
    const candidate: Building = existing ? { ...existing, x, z, rotation, placed: true } : { ...makeBuilding(`building-${this.state.nextId}`, kind, x, z, rotation), variant: kind === 'house' ? this.state.nextId % 4 : 0 };
    const invalid = canPlace(this.state, this.board, candidate); if (invalid) return invalid;
    if (!existing) {
      if (kind === 'workshop' || kind === 'hall') return '请从库存选择已有的建筑';
      if (this.state.coins < CATALOG[kind].cost) return '金币还不够。同步 token，或先试试免费的规划关';
      this.state.coins -= CATALOG[kind].cost; this.state.nextId++; this.board.buildings.push(candidate);
    } else Object.assign(existing, candidate);
    this.commit(); return null;
  }
  stash(id: string): boolean { const b = this.board.buildings.find(b => b.id === id); if (!b || b.kind === 'hall' || !b.placed) return false; b.placed = false; this.commit(); return true; }
  rotate(id: string): string | null { const b = this.board.buildings.find(b => b.id === id); if (!b) return '建筑不存在'; if (b.kind === 'bridge') return '石桥沿河道方向放置'; return this.place(b.kind, b.x, b.z, (b.rotation + 1) % 4, id); }
  recolor(id: string): boolean {
    const b = this.board.buildings.find(b => b.id === id); if (!b) return false;
    const p = PUZZLES.find(p => p.reward === b.kind);
    if (p && (this.state.puzzleStars[p.id] || 0) < 3) return false;
    if (this.activePuzzle) return false;
    const chapter = CHAPTER_COSMETICS.indexOf(b.kind), stars = this.state.chapterStars[chapter] || 0;
    if (chapter >= 0 && stars < 2) return false;
    b.variant = (b.variant + 1) % (p || chapter >= 0 && stars === 2 ? 2 : 4); this.commit(); return true;
  }
  claimChapter(index: number): { stars: number; subsidy: number; improved: boolean } | null {
    if (this.activePuzzle || index < 0 || index >= 6 || (index > 0 && this.state.chapterStars[index - 1] === 0)) return null;
    const stars = starsForChapter(index + 1, evaluate(this.state.town)); if (stars <= this.state.chapterStars[index]) return null;
    this.state.chapterStars[index] = stars; if (index === 0) this.state.tutorialDone = true;
    const subsidy = settleSubsidy(this.state); this.commit(); return { stars, subsidy, improved: true };
  }
  enterPuzzle(id: string): boolean { const p = PUZZLES.find(p => p.id === id); if (!p) return false; if (!this.state.puzzleBoards[id]) this.state.puzzleBoards[id] = freshPuzzle(p); this.activePuzzle = id; this.commit(); return true; }
  leavePuzzle(): void { this.activePuzzle = null; this.emit(); }
  restartPuzzle(): void { if (this.puzzle) { this.state.puzzleBoards[this.puzzle.id] = freshPuzzle(this.puzzle); this.commit(); } }
  claimPuzzle(): { stars: number; first: boolean } | null {
    const p = this.puzzle; if (!p) return null; const stars = puzzleStars(p, evaluate(this.board)); const previous = this.state.puzzleStars[p.id] || 0;
    if (stars <= previous) return null; this.state.puzzleStars[p.id] = stars; this.commit(); return { stars, first: previous === 0 };
  }
  chooseProduction(id:string,choice:string):void {const run=this.state.village.runs[id];if(!run||!['milk','cheese','carrot','potato','soup','fish'].includes(choice))return;this.state.village.choices[id]=choice;if(run.phase==='work'&&run.elapsed===0&&!Object.keys(run.cargo).length)run.choice=choice;else run.nextChoice=choice;this.commit();}
  selectOrder(id:string|null):void {if(this.activePuzzle)return;if(id===null||ORDERS.some(o=>o.id===id)){this.state.village.activeOrder=id;this.commit();}}
  fulfillOrder(id:string):string {if(this.activePuzzle)return '请回到主城完成订单';if(!this.commit(false))return '城镇记录已更新，请再试一次';const problem=completeOrder(this.state,evaluate(this.state.town),id,worldTime(this.state.worldSeconds,this.state.settings).season);if(!problem){this.state.village.activeSeconds+=.001;this.commit();}return problem;}
  updateSettings(update: Partial<TownState['settings']>): void { Object.assign(this.state.settings, update); this.commit(); }
  clock(seconds:number,save=false):void { this.state.worldSeconds=seconds; if(save)this.commit(false); }
  visitHour(hour:number):void { this.state.worldSeconds=atHour(this.state.worldSeconds,hour); this.state.settings.clockMode='cycle'; this.commit(); }
  importSave(raw: string): boolean { const parsed = parseTown(raw, this.state.mode); if (!parsed) return false; parsed.revision = this.state.revision; this.state = parsed; this.activePuzzle = null; this.commit(); return true; }
}
