/*
 * Test runner. The source uses extensionless TS imports (resolved by esbuild /
 * tsc), which Node's native ESM loader can't follow, so we bundle each test
 * file with esbuild first and then hand the output to Node's built-in test
 * runner. No test framework dependency — just esbuild (already installed) and
 * `node --test`.
 */
import { build } from 'esbuild';
import { readdirSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';

const TEST_DIR = 'test';
const OUT = '.test-build';

function findTests(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...findTests(p));
    else if (e.name.endsWith('.test.ts')) out.push(p);
  }
  return out;
}

const entries = findTests(TEST_DIR);
if (entries.length === 0) {
  console.error('No test files found under', TEST_DIR);
  process.exit(1);
}

rmSync(OUT, { recursive: true, force: true });

await build({
  entryPoints: entries,
  outdir: OUT,
  outbase: TEST_DIR,
  bundle: true,
  platform: 'node',
  format: 'esm',
  sourcemap: 'inline',
  outExtension: { '.js': '.mjs' },
  logLevel: 'warning',
});

// Map each source test to its bundled output and hand the explicit list to
// Node's test runner (a bare directory arg isn't reliably discovered).
const built = entries.map((e) => join(OUT, relative(TEST_DIR, e).replace(/\.ts$/, '.mjs')));

const res = spawnSync(process.execPath, ['--test', ...built], { stdio: 'inherit' });
process.exit(res.status ?? 1);
