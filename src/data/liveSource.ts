/*
 * liveSource.ts — real token totals from the local server.
 *
 * GET /api/usage returns a list of projects with their *lifetime* token totals
 * (the server scans ~/.claude and ~/.codex history). Any failure resolves to an
 * empty result so the store can transparently fall back to the demo world.
 */

import type { ProjectUsage } from '../core/types';

/** Loose shape of a project entry as it arrives over the wire. */
interface RawProject {
  id?: string;
  name: string;
  provider?: string;
  tokens?: number;
  /** Old lowercased-name id, sent by the server for save migration. */
  legacyId?: string;
}

/** Loose shape of the /api/usage response body. */
interface UsageResponse {
  source: string;
  projects?: RawProject[];
  totals?: { projects: number; tokens: number };
}

export async function fetchLive(): Promise<{
  source: string;
  projects: ProjectUsage[];
  totals?: { projects: number; tokens: number };
  error?: string;
}> {
  try {
    const res = await fetch('/api/usage', { cache: 'no-store' });
    const data = (await res.json()) as UsageResponse;
    const projects: ProjectUsage[] = (data.projects || []).map((p) => ({
      id: p.id || p.name,
      name: p.name,
      provider: p.provider || 'claude',
      tokens: Math.max(0, Math.floor(p.tokens || 0)),
      ...(p.legacyId ? { legacyId: p.legacyId } : {}),
    }));
    return { source: data.source, projects, totals: data.totals };
  } catch (e) {
    return { source: 'error', projects: [], error: String(e) };
  }
}
