/*
 * Test helpers — small shims so the pure logic layers can run under Node's
 * built-in test runner without a browser (no localStorage, no fetch, no DOM).
 */

/** Install an in-memory localStorage on globalThis; returns a reset handle. */
export function installLocalStorage(): { clear: () => void } {
  const m = new Map<string, string>();
  const ls = {
    getItem: (k: string): string | null => (m.has(k) ? (m.get(k) as string) : null),
    setItem: (k: string, v: string): void => {
      m.set(k, String(v));
    },
    removeItem: (k: string): void => {
      m.delete(k);
    },
    clear: (): void => {
      m.clear();
    },
    key: (i: number): string | null => Array.from(m.keys())[i] ?? null,
    get length(): number {
      return m.size;
    },
  };
  (globalThis as Record<string, unknown>).localStorage = ls;
  return { clear: () => m.clear() };
}

/** Stub global fetch so liveSource / store see a fixed /api/usage payload. */
export function stubFetch(payload: unknown): void {
  (globalThis as Record<string, unknown>).fetch = async () => ({
    json: async () => payload,
  });
}

/** Stub global fetch to reject, simulating a network failure. */
export function stubFetchReject(): void {
  (globalThis as Record<string, unknown>).fetch = async () => {
    throw new Error('network down');
  };
}
