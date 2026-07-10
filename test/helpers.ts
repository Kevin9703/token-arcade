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

/** Deterministic PRNG (mulberry32) so capsule rolls can be asserted exactly. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
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

/**
 * Install a minimal `window` with addEventListener + a dispatcher, so the
 * store's multi-tab `storage` listener can be exercised under Node. Returns a
 * function that simulates another tab writing localStorage key `key`.
 */
export function installStorageEvents(): (key: string) => void {
  const listeners: ((e: { key: string | null }) => void)[] = [];
  (globalThis as Record<string, unknown>).window = {
    addEventListener: (type: string, cb: (e: { key: string | null }) => void): void => {
      if (type === 'storage') listeners.push(cb);
    },
  };
  return (key: string) => {
    for (const cb of listeners) cb({ key });
  };
}
