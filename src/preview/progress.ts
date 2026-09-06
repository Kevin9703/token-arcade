/** Fictional playtest only. No real history, GameStore, or production save access. */
import { COLLECTIBLES, byId } from '../content/collectibles';
import { rollCapsule } from '../domain/capsule';
import { CONFIG, tokensToCoins } from '../domain/economy';
import { GROWTH_CHAPTERS } from '../domain/growth';

export type Reward = { id: string; duplicate: boolean; dust: number };
export type PlaytestState = {
  version: 2; coins: number; residue: number; syncs: number; tokens: number[];
  owned: Record<string, number>; claims: string[]; dust: number;
  slots: (string | null)[]; pending: Reward[]; favorite: number;
};
export const PLAYTEST_KEY = 'token-arcade:cozy-playtest:v2';
export const CHAPTERS = GROWTH_CHAPTERS.slice(0, 3);
export function freshPlaytest(): PlaytestState {
  return { version: 2, coins: 9, residue: 0, syncs: 0, tokens: [39000, 45000, 6000],
    owned: {}, claims: [], dust: 0, slots: [null, null, null, null, null, null], pending: [], favorite: 0 };
}
export function totalTokens(s: PlaytestState) { return s.tokens.reduce((a, b) => a + b, 0); }
export function collectSession(s: PlaytestState) {
  const amount = [160000, 250000, 500000, 1000000][Math.min(s.syncs, 3)];
  const project = s.syncs % 3;
  const mint = tokensToCoins(s.residue, amount);
  s.tokens[project] += amount; s.coins += mint.coins; s.residue = mint.residue; s.syncs++;
  return { amount, coins: mint.coins, project };
}
function grant(s: PlaytestState, id: string): Reward {
  const duplicate = !!s.owned[id];
  const dust = duplicate ? { common: 1, uncommon: 2, rare: 3, epic: 5, legendary: 10 }[byId[id].rarity] : 0;
  s.owned[id] = (s.owned[id] || 0) + 1; s.dust += dust;
  return { id, duplicate, dust };
}
export function claimChapter(s: PlaytestState, index: number): Reward | null {
  const c = CHAPTERS[index];
  if (!c || s.claims.includes(c.id) || totalTokens(s) < c.tokens) return null;
  s.claims.push(c.id); return grant(s, c.reward);
}
export function pullCapsules(s: PlaytestState, count: number, rng: () => number = Math.random) {
  if ((count !== 1 && count !== 10) || s.pending.length) return false;
  const cost = count === 10 ? CONFIG.PULL10_COST : CONFIG.PULL_COST;
  if (s.coins < cost) return false;
  s.coins -= cost;
  s.pending = Array.from({ length: count }, () => grant(s, rollCapsule(rng).id));
  return true;
}
export function exchangeMissing(s: PlaytestState, rng: () => number = Math.random) {
  const missing = COLLECTIBLES.filter(c => !s.owned[c.id]);
  if (s.dust < 120 || !missing.length || s.pending.length) return false;
  s.dust -= 120; s.pending = [grant(s, missing[Math.floor(rng() * missing.length)].id)]; return true;
}
export function displaySlots(id: string): number[] {
  const item = byId[id]; if (!item) return [];
  if (item.type === 'buddy' || ['r_palm', 'r_stool', 'r_rug', 'u_shelf', 'e_minicab', 'r_vending', 'e_portal'].includes(id)) return [3, 4];
  if (item.type === 'sign' || item.type === 'badge' || item.type === 'frame') return [0, 1, 2, 5];
  if (['c_sprout', 'u_bonsai', 'u_lavalamp'].includes(id)) return [0, 1, 2, 3, 4];
  return [0, 1, 2];
}
export function placePrize(s: PlaytestState, id: string, slot: number) {
  if (!byId[id] || !s.owned[id] || !Number.isInteger(slot) || !displaySlots(id).includes(slot)) return false;
  // One display instance per collectible. Replaced objects remain in inventory.
  s.slots = s.slots.map(v => v === id ? null : v); s.slots[slot] = id; return true;
}
export function readPlaytest(raw: string | null): PlaytestState | null {
  if (!raw) return null;
  try {
    const s = JSON.parse(raw) as PlaytestState;
    const integer = (n: unknown) => Number.isSafeInteger(n) && Number(n) >= 0;
    if (s.version !== 2 || ![s.coins, s.residue, s.syncs, s.dust, s.favorite].every(integer) || s.residue >= 10000 || s.favorite > 2) return null;
    if (!Array.isArray(s.tokens) || s.tokens.length !== 3 || !s.tokens.every(integer) || !Number.isSafeInteger(totalTokens(s))) return null;
    if (!s.owned || typeof s.owned !== 'object' || Array.isArray(s.owned) || !Object.entries(s.owned).every(([id, n]) => !!byId[id] && integer(n) && n > 0)) return null;
    if (!Array.isArray(s.claims) || !s.claims.every(id => CHAPTERS.some(c => c.id === id)) || new Set(s.claims).size !== s.claims.length) return null;
    if (!Array.isArray(s.slots) || s.slots.length !== 6 || !s.slots.every(id => id === null || !!s.owned[id])) return null;
    if (new Set(s.slots.filter(Boolean)).size !== s.slots.filter(Boolean).length) return null;
    if (!Array.isArray(s.pending) || s.pending.length > 10 || !s.pending.every(r => r && !!s.owned[r.id] && typeof r.duplicate === 'boolean' && integer(r.dust))) return null;
    return s;
  } catch { return null; }
}
