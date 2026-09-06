import type { GameState } from '../core/types';

/** Permanent milestones; no daily timers, decay, or additional activity signal. */
export const GROWTH_CHAPTERS = [
  { id: 'first-light', tokens: 10_000, reward: 'c_sprout', zh: '第一盏灯', en: 'The first light', storyZh: '给刚开张的小店添一点绿。', storyEn: 'A little green for your new corner.' },
  { id: 'settle-in', tokens: 100_000, reward: 'c_mug', zh: '在这里安家', en: 'Make yourself at home', storyZh: '放好杯子，慢慢来就好。', storyEn: 'Set down your mug. Take your time.' },
  { id: 'new-friend', tokens: 250_000, reward: 'r_cat', zh: '迎接新朋友', en: 'A friend moves in', storyZh: '你的街机厅，有猫了。', storyEn: 'Your arcade now has a cat.' },
  { id: 'neon-bloom', tokens: 1_000_000, reward: 'r_rug', zh: '星光小天地', en: 'A place among the stars', storyZh: '铺上星星地毯，让小店更像家。', storyEn: 'A starry rug makes this place yours.' },
  { id: 'golden-hour', tokens: 5_000_000, reward: 'e_sunset', zh: '把黄昏留下', en: 'Keep the golden hour', storyZh: '解锁整间街机厅的落日主题。', storyEn: 'Unlock a sunset for your whole arcade.' },
  { id: 'space-friend', tokens: 10_000_000, reward: 'e_astro', zh: '来自星空的客人', en: 'A visitor from space', storyZh: '新的伙伴，新的冒险。', storyEn: 'A new companion for the next adventure.' },
  { id: 'forest-home', tokens: 50_000_000, reward: 'l_forest', zh: '森林里的传说', en: 'A little forest legend', storyZh: '让你的街机厅生长成一座森林。', storyEn: 'Let your arcade grow into a forest.' },
] as const;

export function growthStatus(state: Pick<GameState, 'stats' | 'growthClaims'>) {
  return GROWTH_CHAPTERS.map(chapter => ({
    ...chapter,
    ready: state.stats.lifetimeTokens >= chapter.tokens,
    claimed: state.growthClaims.includes(chapter.id),
    progress: Math.max(0, Math.min(1, state.stats.lifetimeTokens / chapter.tokens)),
  }));
}

export function companionGrowth(tokens: number) {
  const thresholds = [0, 100_000, 1_000_000, 10_000_000];
  const stage = thresholds.reduce((current, value, index) => tokens >= value ? index : current, 0);
  const next = thresholds[stage + 1] ?? null;
  return { stage, next, progress: next === null ? 1 : Math.max(0, (tokens - thresholds[stage]) / (next - thresholds[stage])) };
}
