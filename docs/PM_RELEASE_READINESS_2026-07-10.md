# Token Arcade V0.1 Release Readiness

Date: 2026-07-10

## PM Decision

**No-Go for a public V0.1 release.**

The playable arcade MVP is now visually coherent and its main loop is present, but the current build is not yet trustworthy enough to call a user's real AI usage history a game record. It can be shared as a **private visual prototype / internal alpha**, not as the first public local product.

## What Is Ready

The core journey is present and browser-checked at the desktop target:

1. Home room: project cabinets, token/coin HUD, sync action, prize-wall preview, shop rail, and player/achievement entry all render as one arcade scene.
2. Project detail: a token-derived Level 40 legendary cabinet, stage lighting, stat board, and recent-reward rail read as a cabinet, not a dashboard.
3. Capsule room: x1/x10 are framed pixel-shop controls; the display cabinet, new-item reveals, duplicates, and reviewable x10 ticker are all in place.
4. Achievement gallery: a dedicated trophy-card gallery exists and is reachable from Settings/player identity.
5. Settings: English and Simplified Chinese switch instantly and persist; sound, data mode, frame rate, player name, and reset are exposed.
6. Data/persistence foundation: the local server scans Claude Code/Codex history, sync uses a diff baseline, and demo/live progress use separate save slots.

## Resolved P0

### P0: Existing projects showed coins at the retired 1,000-token rate

Status: Resolved and PM browser-accepted on 2026-07-10.

Evidence from a reproducible synthetic migration case:

- A 120M-token project at the retired rate would show `120,000 COINS` in the
  home cabinet row and project detail.
- The active Economy V2 rule is `10,000 tokens = 1 coin`, so that same project
  must show `12,000 BASE COINS` before any clearly labeled modifier.

Cause:

- `src/state/persistence.ts` migration recalculates the global coin balance from lifetime tokens, but preserves each old `project.coins` field.
- `src/domain/sync.ts` only recalculates `project.coins` for projects returned by a later successful live sync. A saved project can therefore keep the old 1,000-token conversion indefinitely when a scan is empty/unavailable.

Required before launch:

- Recalculate every persisted `project.coins` from its monotonic token total during the V1->V2 migration and/or normal load repair.
- Decide whether a cabinet's number means base minted coins or multiplier-adjusted coins, label it accordingly, and make home/detail/reward rail agree.
- Add a migration test covering an old project coin value and an empty follow-up live scan.

Resolution:

- `baseCoinsFor(tokens)` is now the shared source of truth for the derived project value in sync and save-load repair.
- Existing V1 and V2 saves repair every `project.coins` value on load without changing wallet coins, earned coins, tokens, collections, achievements, or diff baselines.
- Browser evidence now shows the synthetic `120,000,000 tokens -> 12,000 基础金币`
  migration case in home and project detail. Chinese and English labels fit their
  existing layouts.

## Remaining Release Blockers

### P1: Heavy users can exhaust the reward pool before the arcade has a long-term goal

Evidence from the current build:

- The current pool has 27 collectibles (`src/content/collectibles.ts`).
- A representative heavy-user scenario with 30,000 spendable coins permits about
  133 ten-pulls at 225 coins before fixed shop purchases.
- The shop has only four fixed grants, and `Room Theme` / `Profile Frame` are collected as items but have no equip/apply state or visible room/profile effect.

This is not an economy number tweak alone. The product tells a heavy token user to save for a room theme or profile frame, but there is no moment where that purchase changes their room or identity. The collection becomes a short RNG checklist, not a lasting arcade.

Required before a public V0.1:

- Either expand the collection to the agreed first-complete target (roughly 50-60 slots) and add at least one long-term cosmetic goal, or deliberately ship a smaller **prototype** scope without promising progression longevity.
- Add equip/apply behavior for at least one paid cosmetic category, preferably room theme or player frame.

### P1: Demo fallback is invisible at the moment trust matters

`GameStore.getTotals()` silently swaps a fresh user with no readable local history into `demo` mode. The setting can later reveal `DEMO`, but the first sync does not explain that the cabinets and coins are synthetic.

Required before public release:

- Show a compact first-run choice or clearly labeled `Demo Arcade` banner when fallback happens, with an explicit way to retry local scan.
- Do not make a user infer that invented token history is theirs.

Implementation scope and acceptance criteria: `docs/P1_PRODUCT_SPEC.md`.

## Release Scope Recommendation

- **Now:** private alpha / shared prototype for people who understand it is local, desktop-first, and still under economy/content tuning.
- **After the P0 migration fix:** invite-only V0.1 beta is reasonable.
- **After P1 progression and demo-trust fixes:** public V0.1 is defensible.

## Evidence Captured This Pass

Browser evidence was captured during PM acceptance on 2026-07-10. The
temporary screenshot archive was intentionally removed during repository
cleanup; the written findings and release decision above remain the record.

## Audit Limits

- The desktop experience was visually checked at 1600x1000. The narrow in-app viewport was not used to set the release platform requirement; Token Arcade is currently a desktop-first local application.
- Real Claude Code/Codex scanner coverage was reviewed from code and the current live save, but a clean-machine first-run / unreadable-history journey still needs an explicit end-to-end test after the demo disclosure is added.
