/*
 * mockSource.ts — a self-contained demo world.
 *
 * Grows a little on every sync so the core loop is always demoable with no real
 * history: a few cabinets gain tokens each session, and occasionally a brand-new
 * cabinet shows up. Same shape as the live source: lifetime token totals.
 */

import type { MockWorld } from '../core/types';

export const NAME_POOL: string[] = ['neon-forge', 'byte-bazaar', 'quest-engine', 'moss-garden', 'star-router', 'pixel-press', 'echo-lab', 'tidepool'];

// Seed world roughly mirrors the prototype line-up so the demo feels curated.
export function seedMock(): MockWorld {
  return {
    projects: [
      { id: 'claude-shop', name: 'claude-shop', provider: 'claude', tokens: 512000 },
      { id: 'pixel-deploy', name: 'pixel-deploy', provider: 'codex', tokens: 310000 },
      { id: 'codex-lab', name: 'codex-lab', provider: 'codex', tokens: 245000 },
      { id: 'sidequest', name: 'sidequest', provider: 'claude', tokens: 180000 },
      { id: 'data-desk', name: 'data-desk', provider: 'gemini', tokens: 96000 },
      { id: 'story-lab', name: 'story-lab', provider: 'claude', tokens: 42000 },
    ],
  };
}

// Simulate a fresh coding session: bump a few projects, occasionally add a
// whole new project. Returns the same world object with grown totals.
export function advanceMock(world: MockWorld | null): MockWorld {
  if (!world || !world.projects) world = seedMock();
  const ps = world.projects;
  const bumps = 1 + Math.floor(Math.random() * 3); // 1..3 projects gained tokens
  for (let i = 0; i < bumps; i++) {
    const p = ps[Math.floor(Math.random() * ps.length)];
    // A session ranges from a quick fix to a deep multi-hour build.
    const gain = Math.floor(4000 + Math.pow(Math.random(), 2) * 140000);
    p.tokens += gain;
  }
  // ~18% chance a brand-new cabinet shows up.
  if (Math.random() < 0.18 && ps.length < 9) {
    const used = new Set(ps.map((p) => p.id));
    const name = NAME_POOL.find((n) => !used.has(n));
    if (name) {
      ps.push({
        id: name,
        name,
        provider: ['claude', 'codex', 'gemini'][Math.floor(Math.random() * 3)],
        tokens: Math.floor(6000 + Math.random() * 40000),
      });
    }
  }
  return world;
}
