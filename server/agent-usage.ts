import fs from 'node:fs';
import { StringDecoder } from 'node:string_decoder';
import * as zlib from 'node:zlib';
import { decompress } from 'fzstd';

export interface CreditEvent { key: string; tokens: number; }
export interface AgentScan { cwd: string | null; tokens: number; events: CreditEvent[]; }
type Row = Record<string, any>;
const count = (v: unknown): number => typeof v === 'number' && Number.isSafeInteger(v) && v > 0 ? v : 0;
const kimiTokens = (u: Row): number => count(u.inputOther ?? u.input_other) + count(u.output) + count(u.inputCacheCreation ?? u.input_cache_creation);
const dshTokens = (u: Row): number => count(u.inputTokens) + count(u.outputTokens) + count(u.cacheWriteTokens);
// DSH reasoning is already part of outputTokens; its inputTokens excludes cache hits.

function json(line: string): Row | null {
  try { const v = JSON.parse(line); return v && typeof v === 'object' && !Array.isArray(v) ? v : null; } catch { return null; }
}

/** Complete Zstandard frame boundaries, including concatenated records and torn tails.
 * Node's one-shot decoder stops after the first frame, so decode each frame separately.
 */
export function* zstdFrames(bytes: Buffer): Generator<Buffer> {
  let offset = 0;
  while (offset + 4 <= bytes.length) {
    const start = offset, magic = bytes.readUInt32LE(offset); offset += 4;
    if ((magic >>> 4) === (0x184d2a50 >>> 4)) {
      if (offset + 4 > bytes.length) return;
      offset += 4 + bytes.readUInt32LE(offset);
      if (offset > bytes.length) return;
      continue;
    }
    if (magic !== 0xfd2fb528) throw new Error('Invalid Zstandard frame');
    if (offset >= bytes.length) return;
    const descriptor = bytes[offset++], single = Boolean(descriptor & 32), flag = descriptor >>> 6;
    if (descriptor & 8) throw new Error('Reserved Zstandard header');
    const dictSize = [0, 1, 2, 4][descriptor & 3];
    offset += (single ? 0 : 1) + dictSize + (flag ? [0, 2, 4, 8][flag] : single ? 1 : 0);
    let last = false;
    while (!last) {
      if (offset + 3 > bytes.length) return;
      const block = bytes.readUIntLE(offset, 3), type = (block >>> 1) & 3;
      if (type === 3) throw new Error('Reserved Zstandard block');
      offset += 3 + (type === 1 ? 1 : block >>> 3);
      if (offset > bytes.length) return;
      last = Boolean(block & 1);
    }
    if (descriptor & 4) offset += 4;
    if (offset > bytes.length) return;
    yield bytes.subarray(start, offset);
  }
}

/** Read the entire log in bounded chunks, retaining only accounting/identity rows.
 * A conversation can exceed 8 MB; reading just its tail loses lifetime usage.
 */
export function readAgentLines(file: string): string[] {
  const rows: string[] = [], decoder = new StringDecoder('utf8'); let pending = '';
  const consume = (chunk: Buffer): void => {
    pending += decoder.write(chunk);
    let end: number;
    while ((end = pending.indexOf('\n')) >= 0) {
      const line = pending.slice(0, end); pending = pending.slice(end + 1);
      // Avoid parsing large text/tool rows and never retain their message content.
      if (!/usage|StatusUpdate|"session"|session\/end-seed|llm\/retry-started|"forked"/.test(line)) continue;
      const obj = json(line); if (!obj) continue;
      const type = obj.type || obj.message?.type;
      if (['usage.record', 'StatusUpdate', 'agent.status.updated', 'forked', 'session', 'session/end-seed', 'llm/retry-started', 'assistant/message', 'assistant/attempt', 'llm/stream'].includes(type)) {
        if (type === 'assistant/message' || type === 'assistant/attempt') {
          const data = obj.data || {}; obj.data = { turn: data.turn, step: data.step, usage: data.usage,
            stream: (Array.isArray(data.stream) ? data.stream : []).filter((v: Row) => v.type === 'chunk' && v.chunk?.type === 'usage') };
        }
        if (type === 'StatusUpdate') obj.message = { type, payload: { token_usage: obj.message?.payload?.token_usage, message_id: obj.message?.payload?.message_id } };
        rows.push(JSON.stringify(obj));
      }
    }
  };
  if (file.endsWith('.zstd')) {
    const native = (zlib as unknown as { zstdDecompressSync?: (v: Buffer) => Buffer }).zstdDecompressSync;
    for (const frame of zstdFrames(fs.readFileSync(file))) consume(native ? native(frame) : Buffer.from(decompress(frame)));
  } else {
    const fd = fs.openSync(file, 'r'), buffer = Buffer.alloc(256 * 1024);
    try { let n: number; while ((n = fs.readSync(fd, buffer)) > 0) consume(buffer.subarray(0, n)); } finally { fs.closeSync(fd); }
  }
  // A log's final row without a newline may still be being written. Re-scan on append.
  return rows;
}

export function parseKimiFile(lines: string[], identity = 'kimi-session'): AgentScan {
  const events = new Map<string, number>(); let fork = -1, cumulative = 0;
  // Fork copies are context, not newly consumed tokens; the durable marker ends that prefix.
  for (let i = 0; i < lines.length; i++) if (json(lines[i])?.type === 'forked') fork = i;
  for (let i = fork + 1; i < lines.length; i++) {
    const row = json(lines[i]); if (!row) continue;
    if (row.type === 'usage.record' && row.usage && typeof row.usage === 'object') {
      const u = row.usage, tokens = kimiTokens(u), time = row.time;
      const key = typeof time === 'number' || typeof time === 'string'
        ? `kimi:call:${JSON.stringify([time, row.model, u.inputOther, u.output, u.inputCacheRead, u.inputCacheCreation])}`
        : `kimi:${identity}:${i}`;
      events.set(key, Math.max(events.get(key) || 0, tokens));
    } else {
      const message = row.message || row, data = message.payload || message;
      if (message.type === 'StatusUpdate' && data.token_usage) {
        const key = data.message_id ? `kimi:message:${data.message_id}` : `kimi:${identity}:${row.timestamp ?? i}`;
        events.set(key, Math.max(events.get(key) || 0, kimiTokens(data.token_usage)));
      } else if (row.type === 'agent.status.updated' && row.usage?.total) {
        cumulative = Math.max(cumulative, kimiTokens(row.usage.total));
      }
    }
  }
  // Status totals and context counters are never added to individual calls.
  if (!events.size && cumulative) events.set(`kimi:${identity}:total`, cumulative);
  return { cwd: null, tokens: [...events.values()].reduce((a, b) => a + b, 0), events: [...events].map(([key, tokens]) => ({ key, tokens })) };
}

export function parseDeepSeekFile(lines: string[]): AgentScan {
  const rows = lines.map(json).filter((x): x is Row => Boolean(x)), header = rows.find(x => x.type === 'session');
  if (!header || typeof header.id !== 'string' || !Number.isInteger(header.version) || header.version < 0 || header.version > 4) throw new Error('Unsupported DeepSeek session version');
  let seed = count(header.seedLength), marker = -1;
  if (header.isSeeded) for (let i = 0; i < rows.length; i++) if (rows[i].type === 'session/end-seed' && rows[i].data?.inherited === true) marker = i;
  // A seeded log without its completed cut cannot distinguish owned calls yet.
  if (header.isSeeded && marker < 0) return { cwd: header.cwd || null, tokens: 0, events: [] };
  const events = new Map<string, number>(), slots = new Map<string, string>(); let attempt = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i], data = row.data || {};
    if (i <= marker || row.type === 'session' || (seed && typeof row.seq === 'number' && row.seq < seed)) continue;
    const slot = `${data.turn}:${data.step}`;
    if (row.type === 'llm/retry-started') { slots.delete(slot); attempt++; continue; }
    if (row.type !== 'assistant/message' && row.type !== 'assistant/attempt' && row.type !== 'llm/stream') continue;
    let usage = data.usage;
    if (!usage && Array.isArray(data.stream)) for (const v of data.stream) if (v.type === 'chunk' && v.chunk?.type === 'usage') usage = v.chunk.usage;
    if (row.type === 'llm/stream') usage = data.chunk?.type === 'usage' ? data.chunk.usage : undefined;
    if (!usage || typeof usage !== 'object') continue;
    // Streaming samples and settled messages replace one call; retry boundaries add calls.
    const key = slots.get(slot) || `deepseek:${header.id}:${data.turn}:${data.step}:${attempt}`;
    slots.set(slot, key); events.set(key, dshTokens(usage));
  }
  const result = [...events].map(([key, tokens]) => ({ key, tokens }));
  return { cwd: typeof header.cwd === 'string' ? header.cwd : null, events: result, tokens: result.reduce((n, e) => n + e.tokens, 0) };
}
