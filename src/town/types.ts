import type { ProjectUsage } from '../data/types';

export type DataMode = 'live' | 'demo';

export type BuildingKind = 'hall' | 'house' | 'bakery' | 'cafe' | 'market' | 'park' | 'bridge' | 'clock' | 'workshop' | 'tree' | 'bench' | 'lamp' | 'flower' | 'picnic' | 'birdhouse' | 'windmill' | 'statue' | 'gardenlamp' | 'fountain' | 'cart' | 'hedge' | 'barrel' | 'planter' | 'gazebo' | 'grocer' | 'florist' | 'library' | 'greenhouse' | 'granary' | 'boathouse' | 'wheatfield' | 'mill' | 'vegetablefield' | 'cowshed' | 'pigpen' | 'fishinghut' | 'restaurant' | 'apronstand' | 'harvesttable' | 'wheatbanner';
export type FarmPhase = 'sowing' | 'growing' | 'harvesting' | 'to-mill' | 'milling' | 'to-bakery' | 'baking' | 'returning';
export interface FarmRun { phase: FarmPhase; elapsed: number; millId: string; bakeryId: string; batches: number }
export interface FarmState { runs: Record<string, FarmRun>; wheat: number; flour: number; bread: number; batches: number; activeSeconds:number }
export interface Cell { x: number; z: number }
export interface Building extends Cell { id: string; kind: BuildingKind; rotation: number; placed: boolean; variant: number; projectId?: string }
export interface Board { size: number; terrain: 'valley' | 'meadow' | 'river'; buildings: Building[]; roads: string[] }
export interface TownProject extends ProjectUsage { credited: number }
export interface TownState {
  version: 1; mode: DataMode; revision: number; coins: number; tokenCoins: number;
  residue: number; subsidyPaid: number; chapterStars: number[];
  puzzleStars: Record<string, number>; projects: TownProject[];
  town: Board; puzzleBoards: Record<string, Board>; demoStep: number; nextId: number;
  tutorialDone: boolean; history: 'unscanned' | 'empty' | 'ready';
  worldSeconds: number;
  farm: FarmState;
  village: import('./village').VillageState;
  settings: { music: boolean; musicVolume: number; muted: boolean; lighting: 'day' | 'sunset' | 'night'; clockMode: 'cycle' | 'fixed'; season: 'cycle' | 'spring' | 'summer' | 'autumn' | 'winter'; quality: 'high' | 'medium' | 'low'; reducedMotion: boolean; cameraInput: 'trackpad' | 'mouse'; cameraSpeed?: 12 | 24 | 36; goalCollapsed?: boolean };
}
export interface BuildingDefinition {
  kind: BuildingKind; name: string; description: string; cost: number; w: number; d: number;
  category: 'homes' | 'services' | 'landmarks' | 'decor' | 'production'; chapter: number;
  service?: 'food' | 'leisure'; capacity?: number; range?: number;
}
export interface BuildingStatus { connected: boolean; entrance: Cell; food: string | null; leisure: string | null; green: boolean; foodDistance?: number; leisureDistance?: number }
export interface Evaluation {
  buildings: Record<string, BuildingStatus>; connectedRoads: Set<string>;
  population: number; houses: number; food: number; leisure: number; green: number; satisfied: number;
  northFood: number; southFood: number; northSatisfied: number; southSatisfied: number;
  roadCount: number; bridge: boolean; clock: boolean; serviceUsed: Record<string, number>;
}
export interface Goal { label: string; current: number; need: number; met: boolean }
export interface Chapter { id: number; title: string; story: string; reward: string; subsidy: number }
export interface Puzzle { id: string; title: string; description: string; family: string; roadBudget: number; efficientBudget: number; required: number; greenGoal: number; leisureGoal: number; reward: BuildingKind; solution: Board }
