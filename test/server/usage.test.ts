import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import * as zlib from 'node:zlib';
import { createUsageScanner } from '../../server/usage';
import { parseKimiFile, parseDeepSeekFile, readAgentLines, zstdFrames } from '../../server/agent-usage';
import { freshTown, syncTown } from '../../src/town/store';

const line = (obj: unknown) => JSON.stringify(obj);
const header = (id = 'dsh-one', extra = {}) => ({ type: 'session', id, version: 4, cwd: '/work/town', isSeeded: false, ...extra });
const usage = (inputTokens = 500, outputTokens = 50) => ({ inputTokens, outputTokens, cacheReadTokens: 9000, cacheWriteTokens: 10, reasoningTokens: 30 });
const settlement = (seq: number, extra: Record<string, unknown> = {}) => ({ type: 'assistant/message', seq, time: seq + 100, data: { turn: 1, step: seq, usage: usage(), ...extra } });
const kimiCall = (time = 100, extra = {}) => ({ type: 'usage.record', time, model: 'kimi', usage: { inputOther: 400, output: 60, inputCacheRead: 9000, inputCacheCreation: 20 }, ...extra });
const nativeCompress = (zlib as unknown as { zstdCompressSync?: (v: Buffer) => Buffer }).zstdCompressSync;
// Raw valid single-segment Zstandard frames let the fallback test run on all Node 22 versions.
function zstd(text: string): Buffer {
  if (nativeCompress) return nativeCompress(Buffer.from(text));
  const bytes = Buffer.from(text), out = Buffer.alloc(12 + bytes.length);
  out.writeUInt32LE(0xfd2fb528, 0); out[4] = 0xa0; out.writeUInt32LE(bytes.length, 5);
  out.writeUIntLE((bytes.length << 3) | 1, 9, 3); bytes.copy(out, 12); return out;
}
function fixture(t: any) {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'token-town-agents-')); t.after(() => fs.rmSync(home, { recursive: true, force: true }));
  const write = (name: string, rows: unknown[], compressed = false) => {
    const file = path.join(home, name); fs.mkdirSync(path.dirname(file), { recursive: true });
    const text = rows.map(line).join('\n') + '\n'; fs.writeFileSync(file, compressed ? Buffer.concat(rows.map(v => zstd(line(v) + '\n'))) : text); return file;
  };
  return { home, write, scanner: createUsageScanner({ home, env: {} }) };
}

test('Kimi native calls exclude cache reads; cumulative status does not add them again', () => {
  const rows = [kimiCall(), kimiCall(), kimiCall(101), { type: 'agent.status.updated', usage: { total: { inputOther: 800, output: 120, inputCacheCreation: 40 } } }, { type: 'token_counting.measured', tokens: 100000 }];
  assert.equal(parseKimiFile(rows.map(line)).tokens, 960);
});
test('Kimi legacy StatusUpdate uses message IDs and ignores measured context', () => {
  const event = { timestamp: 1, message: { type: 'StatusUpdate', payload: { message_id: 'legacy-id', token_usage: { input_other: 900, output: 80, input_cache_read: 5000, input_cache_creation: 20 }, context_tokens: 6000 } } };
  assert.equal(parseKimiFile([line(event), line(event), '{', line({ role: '_usage', token_count: 6000 })]).tokens, 1000);
});
test('forked Kimi agents credit only calls made after the durable fork marker', () => {
  assert.equal(parseKimiFile([kimiCall(), { type: 'forked' }, kimiCall(101)].map(line)).tokens, 480);
});
test('DeepSeek commits replace stream usage and do not double-count reasoning or cached input', () => {
  const rows = [header(), settlement(0, { stream: [{ type: 'chunk', chunk: { type: 'usage', usage: usage(900) } }] }), settlement(0)];
  assert.equal(parseDeepSeekFile(rows.map(line)).tokens, 560);
});
test('DeepSeek attempts use last embedded usage; retries are separate consumed calls', () => {
  const stream = [usage(100), usage(200)].map(u => ({ type: 'chunk', chunk: { type: 'usage', usage: u } }));
  const rows = [header(), { type: 'assistant/attempt', data: { turn: 1, step: 0, stream } }, { type: 'llm/retry-started', data: { turn: 1, step: 0 } }, settlement(0)];
  assert.equal(parseDeepSeekFile(rows.map(line)).tokens, 260 + 560);
});
test('DeepSeek seeded versions skip inherited calls, including incomplete seed snapshots', () => {
  assert.equal(parseDeepSeekFile([header('child', { isSeeded: true }), settlement(0), { type: 'session/end-seed', data: { inherited: true } }, settlement(1)].map(line)).tokens, 560);
  assert.equal(parseDeepSeekFile([header('child', { isSeeded: true }), settlement(0)].map(line)).tokens, 0);
  assert.equal(parseDeepSeekFile([header('old', { version: 0, seedLength: 1 }), settlement(0), settlement(1)].map(line)).tokens, 560);
});
test('compressed multi-frame logs read every frame and ignore a still-being-written tail', t => {
  const { write } = fixture(t), file = write('.dsh/sessions/project/id/session.v4.jsonl.zstd', [header(), settlement(0), settlement(1)], true);
  fs.appendFileSync(file, zstd(line(settlement(2)) + '\n').subarray(0, 6));
  assert.equal([...zstdFrames(fs.readFileSync(file))].length, 3);
  assert.equal(parseDeepSeekFile(readAgentLines(file)).tokens, 1120);
});
test('scanner joins agents by full cwd while preserving the existing Codex/Claude ID', t => {
  const { write, scanner } = fixture(t);
  write('.codex/sessions/year/c.jsonl', [{ payload: { cwd: '/work/town', info: { total_token_usage: { input_tokens: 4000, cached_input_tokens: 1000, output_tokens: 1000 } } } }]);
  const original = scanner.scan()[0];
    // state.json also supplies cwd when the optional index has not yet been appended.
  const stateFile = write('.kimi-code/sessions/bucket/k/state.json', []); fs.writeFileSync(stateFile, line({ cwd: '/work/town' }));
  write('.kimi-code/sessions/bucket/k/agents/main/wire.jsonl', [kimiCall()]);
  write('.dsh/sessions/project/id/session.v4.jsonl.zstd', [header(), settlement(0)], true);
  const combined = scanner.scan()[0]; assert.equal(combined.id, original.id); assert.equal(combined.provider, 'mixed'); assert.equal(combined.tokens, 5040);
  assert.equal(scanner.scan()[0].tokens, 5040); const town = freshTown('live'); syncTown(town, scanner.scan()); assert.equal(syncTown(town, scanner.scan()).newTokens, 0);
});
test('Kimi old/new copies and DeepSeek version migrations do not duplicate usage', t => {
  const { home, write, scanner } = fixture(t), cwd = '/work/town', bucket = createHash('md5').update(cwd).digest('hex');
  fs.mkdirSync(path.join(home, '.kimi'), { recursive: true }); fs.writeFileSync(path.join(home, '.kimi/kimi.json'), line({ work_dirs: [{ path: cwd }] }));
  const legacy = { timestamp: 1, message: { type: 'StatusUpdate', payload: { message_id: 'same', token_usage: { input_other: 400, output: 60, input_cache_creation: 20 } } } };
  write(`.kimi/sessions/${bucket}/old/wire.jsonl`, [legacy]);
  write('.kimi-code/session_index.jsonl', [{ sessionDir: path.join(home, '.kimi-code/sessions/new/old'), workDir: cwd }]);
  write('.kimi-code/sessions/new/old/agents/main/wire.jsonl', [legacy, kimiCall()]);
  write('.dsh/sessions/project/id/session.jsonl', [header('d', { version: 0 }), settlement(0)]);
  write('.dsh/sessions/project/id/session.v4.jsonl.zstd', [header('d'), settlement(0), settlement(1)], true);
  assert.equal(scanner.scan()[0].tokens, 2080);
});
test('file growth, partial writes, deletion/recovery and fractional coin carry do not repeat coins', t => {
  const { write, scanner } = fixture(t), town = freshTown('live');
  const call = (time: number) => kimiCall(time, { usage: { inputOther: 6000, output: 500, inputCacheRead: 80000 } });
  write('.kimi-code/session_index.jsonl', [{ sessionDir: '/missing', workDir: '/work/town' }]);
  const file = write('.kimi-code/sessions/b/id/agents/main/wire.jsonl', [call(1)]);
  assert.equal(syncTown(town, scanner.scan()).coins, 0); assert.equal(town.residue, 6500);
  fs.appendFileSync(file, line(call(2)).slice(0, 10)); assert.equal(syncTown(town, scanner.scan()).newTokens, 0);
  fs.appendFileSync(file, line(call(2)).slice(10) + '\n'); assert.equal(syncTown(town, scanner.scan()).coins, 1); assert.equal(town.residue, 3000);
  const content = fs.readFileSync(file); fs.unlinkSync(file); assert.equal(scanner.scan().length, 0); fs.writeFileSync(file, content);
  assert.equal(syncTown(town, scanner.scan()).newTokens, 0);
});
test('missing providers and malformed usage are safe; custom agent homes work', t => {
  const { home, write } = fixture(t); assert.deepEqual(createUsageScanner({ home, env: {} }).scan(), []);
  write('custom/sessions/p/id/session.v4.jsonl', [header(), settlement(0, { usage: { inputTokens: -4, outputTokens: '900', cacheWriteTokens: null } }), settlement(1)]);
  const scanner = createUsageScanner({ home, env: { DSH_HOME: path.join(home, 'custom') } }); assert.equal(scanner.scan()[0].tokens, 560);
  write('custom/sessions/p/id/session.v5.jsonl', [header('future', { version: 5 })]); assert.equal(scanner.scan()[0].tokens, 560); assert.equal(scanner.warnings.length, 1);
});
test('large logs retain early usage and discard conversation text before parsing accounting', t => {
  const { write } = fixture(t), file=write('large/wire.jsonl',[kimiCall(1)]);
  fs.appendFileSync(file,line({type:'user',text:'x'.repeat(9*1024*1024)})+'\n'+line(kimiCall(2))+'\n');
  const rows=readAgentLines(file);assert.equal(rows.length,2);assert.equal(parseKimiFile(rows).tokens,960);
});
