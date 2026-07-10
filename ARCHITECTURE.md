# Token Arcade — Architecture

A local-first pixel arcade that turns AI coding **token usage** into arcade
coins and collectibles. TypeScript throughout, rendered on a single `<canvas>`
with a hand-built bitmap font, served by a zero-dependency Node server.

## Run it

```bash
npm install
npm run dev          # builds the client bundle, then starts the server
# open http://localhost:4173
```

Other scripts:

- `npm run build` — bundle `src/main.ts` → `public/app.js` (esbuild)
- `npm run watch` — rebuild on change
- `npm run start` — serve `public/` (Node runs `server/index.ts` directly via type-stripping)
- `npm run typecheck` — `tsc --noEmit` (strict)
- `npm test` — run the unit suite (esbuild-bundled, Node's built-in `node:test`)
- `node scripts/verify.mjs` — drive the full loop in a real browser (needs the server running)

## Tests

Unit tests live in `test/` and cover the pure logic layers (domain, content,
data, state). There is no test-framework dependency: `scripts/run-tests.mjs`
bundles each `*.test.ts` with esbuild (so the extensionless TS imports resolve)
and runs them through Node's built-in test runner. Browser-only layers
(render / screens / stage) are exercised by `scripts/verify.mjs` instead.
The domain/sync and store suites pin the load-bearing rules: the
anti-double-count diff, the sub-coin residue carry, monotonic cabinets,
legacy-id migration, and live/demo save-slot isolation.

## Layers (dependencies point inward)

```
core/        Shared type contract. Depends on nothing.
  types.ts

domain/      Pure game math. No DOM, no state, no I/O.
  economy.ts   tokens→coins (residue carry), player XP curve, formatting
  levels.ts    cabinet level + progress from lifetime tokens
  capsule.ts   weighted rarity roll, capsule pull, fixed-price grant
  sync.ts      the whole sync transaction as a pure function (computeSync)

content/     Static catalog. Depends on core (+ economy for costs).
  rarities.ts collectibles.ts shop.ts achievements.ts  (index.ts barrel)

data/        Where token totals come from, behind one shape.
  liveSource.ts  GET /api/usage (server scans real history)
  mockSource.ts  a demo world that grows on each sync

state/       The single source of truth + persistence.
  persistence.ts  per-mode save slots (live/demo) + boot-mode meta
  store.ts        GameStore: fetch totals, apply computeSync, pull / buy /
                  achievements. fetchLive is injectable; state is Readonly.

render/      Canvas engine + art. Knows how to draw, not what game it is.
  pixelFont.ts  5×7 bitmap font (every in-world label is pixels)
  canvas.ts     rounded panels, gradients, neon bulbs
  sprites.ts    sprite atlas + player + coin
  cabinet.ts    procedural, level-scaled arcade cabinet
  machines.ts   procedural capsule machine + coin bank
  stage.ts      DPR/letterbox scaling, RAF loop, hotspot hit-testing
  assets.ts     async image loading only (get() is null until decoded)
  atlas.ts      every hand-measured crop/variant table, in one place
  measured.ts   GENERATED anchors (scripts/measure-assets.mjs) — do not edit
  widgets.ts    shared screen helpers: icon/crop blitting, EasedNumber
  fx.ts         coin-rain, banners, cabinet pulses, achievement toasts
  sound.ts      WebAudio bleep kit

screens/     Composition. Reads the store, draws with render/, wires input.
             Screens receive ALL services (stage, store, router, fx, sound,
             assets, modal openers) via ScreenContext — no module singletons.
  roomScreen.ts cabinetScreen.ts capsuleScreen.ts achievementScreen.ts
  (screen.ts + router.ts)

ui/          DOM overlays (help / settings modals only).
i18n/        UI-string tables (en / zh-CN). IDs and save keys never localize.
main.ts      Bootstrap: build the ScreenContext, wire Stage + Store + Router.

server/      Node HTTP (127.0.0.1 only): static files + /api/usage scan with
             an incremental per-file cache keyed by (mtime, size).
```

## Key design decisions

- **One numeric input.** The only signal is tokens consumed. Coins, cabinet
  levels, capsule pulls, and achievements are all derived from it. No
  productivity/quality metrics ever enter the model.
- **Canvas + bitmap font, not CSS cards.** The signature look comes from a 5×7
  pixel font drawn to canvas, so the UI reads as a real pixel game rather than a
  dashboard in a pixel typeface. HTML is used only for the help/settings modals.
- **Anti-double-count by design.** A data source reports each project's
  *lifetime* total. The game keeps `lastTotals` and credits only
  `max(0, current − lastSeen)`. Re-syncing the same totals mints zero coins.
  The whole transaction is a pure function (`domain/sync.ts`) the store applies.
- **Cabinets never shrink.** Levels and lifetime tokens track a high-water
  mark, so pruning old history files can't de-level a cabinet. Diff baselines
  still follow the raw report, so new work counts from the new total.
- **Stable project identity.** The server ids projects by a hash of the full
  cwd path (`~/work/app` ≠ `~/personal/app`) and sends the old name-based id as
  `legacyId`, which the sync migrates in place without re-minting.
- **Sub-coin residue carries forward.** 10,000 tokens = 1 coin; the remainder
  is saved so small sessions still build toward the next coin.
- **Two data sources, one contract.** Live history and the demo world produce
  the same `{ id, name, provider, tokens }[]`, so the game loop is identical and
  fully demoable with no real history.
- **Live and demo saves never mix.** Each mode persists to its own localStorage
  slot. The transparent demo fallback only happens on a first run with no live
  progress; a transient empty scan on a real save is just a no-op sync.
- **Local-first.** All progress lives in `localStorage`; no account, no cloud.
  The server binds 127.0.0.1, only reads local history files, and serves the
  static assets with `no-store` (the bundle is unhashed).

## Token counting

Both scanners count *fresh* tokens — `input + output + cache_creation` for
Claude Code, and `input − cached_input + output + reasoning` for Codex —
deliberately excluding re-read cache tokens, which would otherwise inflate
totals into the billions and max out every cabinet.
