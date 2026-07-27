#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const nodeMajor = Number(process.versions.node.split('.')[0]);
if (nodeMajor < 22) {
  console.error('Token Arcade requires Node.js 22 or newer.');
  process.exit(1);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = path.join(root, 'dist', 'server.mjs');
const port = Number(process.env.PORT) || 4173;
const url = `http://127.0.0.1:${port}`;

const child = spawn(
  process.execPath,
  [server],
  {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
  },
);

function openBrowser() {
  if (process.env.TOKEN_ARCADE_NO_OPEN === '1') return;

  const command = process.platform === 'darwin'
    ? ['open', [url]]
    : process.platform === 'win32'
      ? ['cmd', ['/c', 'start', '', url]]
      : ['xdg-open', [url]];

  const opener = spawn(command[0], command[1], {
    detached: true,
    stdio: 'ignore',
  });
  opener.unref();
}

const openTimer = setTimeout(openBrowser, 900);

function stop(signal) {
  clearTimeout(openTimer);
  child.kill(signal);
}

process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));
child.on('exit', (code, signal) => {
  clearTimeout(openTimer);
  process.exitCode = signal ? 1 : (code ?? 0);
});
