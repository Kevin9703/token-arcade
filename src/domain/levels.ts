/*
 * levels.ts — cabinet level math. A project's cabinet level (1..50) and its
 * visual stage (1..5) are derived purely from lifetime tokens.
 *
 * 50 numeric levels give frequent progression; 5 visual stages drive cabinet
 * color/ornament. Higher levels also grant a small coin multiplier on FUTURE
 * token gains (1.00x at Lv1 -> 1.50x at Lv50). See docs/PROJECT_LEVEL_SYSTEM.md.
 */

export const MAX_LEVEL = 50;

// Level thresholds are generated from a smooth piecewise-geometric curve pinned
// to fixed stage boundaries so the ranges below always hold:
//   Starter   L1-4   0 .. 99,999
//   Powered   L5-9   100,000 .. 999,999
//   Deluxe    L10-19 1,000,000 .. 9,999,999
//   Neon      L20-34 10,000,000 .. 49,999,999
//   Legendary L35-50 50,000,000+
const ANCHORS: [number, number][] = [
  [1, 0],
  [2, 8_000],
  [5, 100_000],
  [10, 1_000_000],
  [20, 10_000_000],
  [35, 50_000_000],
  [50, 500_000_000],
];

function buildThresholds(): number[] {
  const th: number[] = [];
  for (let lvl = 1; lvl <= MAX_LEVEL; lvl++) {
    // find the anchor segment [a,b] containing this level
    let a = ANCHORS[0];
    let b = ANCHORS[ANCHORS.length - 1];
    for (let i = 0; i < ANCHORS.length - 1; i++) {
      if (lvl >= ANCHORS[i][0] && lvl <= ANCHORS[i + 1][0]) {
        a = ANCHORS[i];
        b = ANCHORS[i + 1];
        break;
      }
    }
    const [la, ta] = a;
    const [lb, tb] = b;
    const f = (lvl - la) / (lb - la); // 0..1 within the segment
    // geometric interpolation in token space; the first segment starts at 0 so
    // it interpolates linearly (only its two endpoints, L1=0 and L2, are used).
    const tok = ta <= 0 ? Math.round(tb * f) : Math.round(ta * Math.pow(tb / ta, f));
    th.push(tok);
  }
  th[0] = 0;
  return th;
}

/** Minimum lifetime tokens to be AT level i+1 (index 0 = level 1 = 0 tokens). */
export const LEVEL_THRESHOLDS: number[] = buildThresholds();

export type StageKey = 'starter' | 'powered' | 'deluxe' | 'neon' | 'legendary';

export interface Stage {
  /** 0..4 */
  index: number;
  key: StageKey;
  /** Display name, e.g. "NEON". */
  name: string;
  /** Inclusive level range for this stage. */
  loLevel: number;
  hiLevel: number;
}

export const STAGES: Stage[] = [
  { index: 0, key: 'starter', name: 'STARTER', loLevel: 1, hiLevel: 4 },
  { index: 1, key: 'powered', name: 'POWERED', loLevel: 5, hiLevel: 9 },
  { index: 2, key: 'deluxe', name: 'DELUXE', loLevel: 10, hiLevel: 19 },
  { index: 3, key: 'neon', name: 'NEON', loLevel: 20, hiLevel: 34 },
  { index: 4, key: 'legendary', name: 'LEGENDARY', loLevel: 35, hiLevel: 50 },
];

/** Visual stage for a numeric level (1..50). */
export function stageForLevel(level: number): Stage {
  const lvl = Math.max(1, Math.min(MAX_LEVEL, level));
  for (const s of STAGES) if (lvl >= s.loLevel && lvl <= s.hiLevel) return s;
  return STAGES[STAGES.length - 1];
}

/** Numeric level (1..50) for a lifetime token total. */
export function levelFor(tokens: number): number {
  let lvl = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) if (tokens >= LEVEL_THRESHOLDS[i]) lvl = i + 1;
  return lvl;
}

/**
 * Coin multiplier applied to FUTURE token gains for a project at this level.
 * 1.00x at level 1, rising linearly to 1.50x at level 50.
 */
export function coinMultiplier(level: number): number {
  const lvl = Math.max(1, Math.min(MAX_LEVEL, level));
  return 1 + ((lvl - 1) / (MAX_LEVEL - 1)) * 0.5;
}

export interface LevelInfo {
  level: number; // 1..50
  stage: Stage; // visual stage
  base: number; // threshold at the current level
  next: number | null; // threshold at the next level (null at max)
  progress: number; // 0..1 within the current level
  toNext: number; // tokens remaining to next level
  isMax: boolean; // level === 50
  multiplier: number; // coin multiplier for future gains
}

/** Level, stage, progress toward next level, and coin multiplier for a total. */
export function levelInfo(tokens: number): LevelInfo {
  const level = levelFor(tokens);
  const base = LEVEL_THRESHOLDS[level - 1];
  const next = level < LEVEL_THRESHOLDS.length ? LEVEL_THRESHOLDS[level] : null;
  const stage = stageForLevel(level);
  const multiplier = coinMultiplier(level);
  if (next == null) {
    return { level, stage, base, next: null, progress: 1, toNext: 0, isMax: true, multiplier };
  }
  const progress = Math.max(0, Math.min(1, (tokens - base) / (next - base)));
  return { level, stage, base, next, progress, toNext: Math.max(0, next - tokens), isMax: false, multiplier };
}
