# PM Live QA Issues

Last updated: 2026-07-10

This is the running QA memory for Token Arcade. Every visual/product acceptance pass should update this file before giving the user a final conclusion.

## How To Use This File

- `Open`: confirmed issue, not yet fixed.
- `Needs Verification`: Claude or assets have changed, but PM/browser verification has not passed yet.
- `Passed`: verified in browser or by asset inspection.
- `Won't Fix For MVP`: intentionally deferred.

Each QA pass should add:

- the page or feature inspected
- screenshot path if available
- pass/fail status
- exact fix request for Claude if failed

## Current QA Items

### QA-007: Economy V2 Migration Leaves Stale Per-Project Coin Counts

Status: Passed (2026-07-10, PM)

Area: Home cabinet rows and project-detail per-project coin statistic after the Economy V2 conversion changed from 1,000 to 10,000 tokens per coin.

Root cause:

- The V1->V2 migration (`migrateV1toV2`) recomputed only the GLOBAL coin balance
  and `coinsEarned` from lifetime tokens. It never touched each persisted
  `project.coins`, so a saved cabinet kept its old 1,000-tokens/coin value.
- `computeSync` only rewrites `project.coins` for projects returned by a later
  successful live scan, so a save with an empty/unavailable scan stayed stale
  indefinitely. Native V2 saves were affected too, not just V1.

Fix strategy (idempotent load repair, no save-version bump):

- `Project.coins` is now defined as the flat flavor value
  `floor(project.tokens / TOKENS_PER_COIN)` — NOT the spendable balance and NOT
  multiplier-adjusted history. Extracted as one pure function
  `baseCoinsFor(tokens)` in `src/domain/economy.ts`.
- `computeSync` (`src/domain/sync.ts`) now sets `proj.coins = baseCoinsFor(mono)`
  via that same function, so runtime sync and save repair share one rule and
  cannot drift again.
- New `repairProjectCoins(state)` in `src/state/persistence.ts` recomputes every
  project's `coins` from its `tokens`. It runs inside `parseBlob` on EVERY load —
  both the V1->V2-migrated path and native V2 — so existing V2 saves are healed
  without a version bump. It is idempotent (a correct save is a no-op) and
  defensive (empty / missing / non-array `projects`, and projects missing
  `tokens`, never throw). It touches ONLY `project.coins`; the spendable
  `state.coins`, `coinsEarned`, owned, achievements, pulls, token totals, diff
  baselines, and project ids are all left untouched. No visual / capsule /
  achievement / i18n-layout changes.

Versions affected / handled:

- V1 saves: global balance migrated by `migrateV1toV2`, then per-project coins
  repaired by `repairProjectCoins`.
- Existing V2 saves (the reported case): per-project coins repaired on next load.
- Already-correct saves: repair is a no-op (idempotent), repeated loads unchanged.
- Empty / missing / malformed project lists: no throw, loads normally.

Label accuracy (copy only, no layout change):

- The per-project derived value is now labeled `BASE COINS` / `基础金币`
  (`ui.baseCoins`) at all four display sites — home cabinet row, project-detail
  stat row, project-detail fallback stat row, and the detail reward-rail ticket
  — so it no longer implies it equals the player's wallet balance. `ui.coins`
  (the real spendable balance) is unchanged.

Test results (`npm test`, 102/102 pass; was 96):

- `baseCoinsFor` unit test: 120M tokens -> 12,000 (not 120,000); defensive
  against undefined/null/NaN.
- persistence: stale V2 save repaired on load (120,000 -> 12,000); correct V2
  save round-trips unchanged (idempotent); empty/missing/malformed projects do
  not throw; a V1 save carrying projects also gets them repaired.
- store: after sync, `project.coins === floor(tokens/10000)`; after a follow-up
  empty live scan, `project.coins` is unchanged.
- `npx tsc --noEmit` clean; `npm run build` ok; `node scripts/verify.mjs`
  ALL CHECKS PASSED (0 console errors).

Remaining for PM: browser visual verification that a large project's home row
and project-detail stat now show the corrected `BASE COINS` value, and that the
relabeled copy fits the existing row layout. Claude did not make any visual
judgments.

PM browser acceptance:

- Chinese home row: `12,000 基础金币` fits inside the compact cabinet row with
  clear breathing room; no collision with the stage meter or row edge.
- English home row: `12,000 BASE COINS` also fits without wrapping, clipping,
  or moving the cabinet art. The detail stat row and reward-rail ticket retain
  enough width for the same label.
- A synthetic 120M-token migration case correctly reads `12,000` in home +
  project detail instead of the retired 1,000-token-rate value `120,000`.
- Browser console: no warnings or errors.

PM evidence: browser acceptance completed on 2026-07-10. The temporary
screenshot archive was intentionally removed during repository cleanup.

### QA-008: Public Release Needs Real Demo-Mode Disclosure And Longer-Term Rewards

Status: Open - P1 release blocker (2026-07-10, PM)

Areas: first-run no-history fallback; long-term economy and cosmetic ownership.

- A fresh unreadable/no-history install silently switches into demo mode.
- The current 27-item pool is too shallow for the existing heavy-user balance.
- `Room Theme` / `Profile Frame` are only collected items; they do not yet equip or change the room/profile.

Required scope and release decision are recorded in `docs/PM_RELEASE_READINESS_2026-07-10.md`.

### QA-001: Home Neon Logo Flicker Needs More Art Direction

Status: Needs Verification (2026-07-10, PM)

Area: Home page, `TOKEN ARCADE` neon sign.

What changed:

- Rewrote `RoomScreen.logoFlickerFrame` as a two-state machine: the sign holds the
  normal frame for an irregular **2.2–5.5s** gap, then plays a SINGLE short flick
  (dropout **40–80ms**, or ~1-in-5 a burst **60–90ms**), then a fresh randomized
  gap. Re-randomizing the gap after every flick guarantees no back-to-back
  double-blink; the sign is on the normal frame >95% of the time.
- Added a very subtle whole-sign "breathing" in `drawMarquee`: globalAlpha
  **0.93–1.0** and a soft cyan glow on a ~4.3s sine — always readable.
- Only orchestration/timing changed. Still uses the three existing PNG frames
  (`logo-sign-v1-trimmed`, `-flicker-dropout-v1`, `-flicker-burst-v1`) drawn into
  the identical size-locked rect (LOGO_FRAME_ALPHA), no code-drawn tubes/letters.

How verified: the normal, dropout, and burst frames were captured at the same
size with no layout jump; `verify.mjs` reported 0 console errors. The temporary
screenshot archive was intentionally removed during repository cleanup.

Remaining for PM: watch a live 5-8s capture to confirm the cadence feels alive
but not mechanical (timing is not visible in a static screenshot).

PM verification result:

- Static/browser screenshots confirm the logo remains readable.
- Code inspection confirms the current implementation uses only the three
  provided logo frames and a randomized state machine: normal frame for
  2.2-5.5s, then one short dropout or rare burst, then a fresh long normal gap.
- The logic should prevent the earlier double-click-like paired flash.
- Visual frame capture did not reliably catch the 40-90ms flicker event, so this
  remains `Needs Verification` until a live human watch/short video confirms the
  feel.

Evidence: static/browser frame evidence was captured during PM acceptance. The
temporary screenshot archive was intentionally removed during repository cleanup.

### QA-002: Capsule Pull Result Flow Should Not Block On Duplicates

Status: Passed (2026-07-10, PM)

Area: Capsule page, x1/x10 pull result experience.

What changed (all in `capsuleScreen.ts`, no economy/core changes):

- Split outcomes by `isDup`: only `isDup === false` items enter the big center
  reveal queue. Duplicates never open a blocking card.
- Added a compact, code-driven result feed (ticker) in the empty gap between the
  machine and the trophy cabinet. EVERY outcome (new + dup) is logged newest-first;
  the batch slides in from the top; it clips + scrolls in code (no baked panel).
  Shows 4 rows at once (`FEED.maxVisible`), capped history 24.
- Each row: collectible icon (left well), name auto-fit (center well), `NEW`
  (rarity color) or `×count` (orange, for dups) chip (right well).
- All-duplicate pulls show a short `重复 ×N` / `DUPLICATE ×N` summary pulse over the
  machine instead of any card, so the player can pull again immediately.
- Skip/fast-forward: a click on the reveal-card area (a `SKIP ▸` hint is shown)
  or clicking pull again clears the remaining big reveals (`skipReveals`).
- Lever/pull feedback (previously accepted) untouched.

How verified:

- `06-capsule-feed-en.png` / `07-capsule-feed-zh.png` — x10 mixed: only the new
  item shows the big card (`EPIC / NEW!`), duplicates appear only in the ticker
  with `×N` chips; feed sits clear of the pull buttons, machine, cabinet, toasts.
- `10-x10-all-duplicates-summary.png` — a dup-heavy x10 shows the `重复 ×10` pulse
  and feed rows, no ten-card sequence.
- 96/96 unit tests pass; `verify.mjs` still pulls x1 and persists correctly.

PM verification result:

- Passed for the core behavior: duplicates no longer block the player as large
  reveal cards.
- Browser x10 test shows new items can still use the large reveal card while
  duplicates appear in the compact result feed with `×N`.
- A separate usability problem remains: the feed itself is not reviewable enough
  for x10. Tracked as QA-005.

Evidence: browser x10 behavior was captured during PM acceptance. The temporary
screenshot archive was intentionally removed during repository cleanup.

### QA-003: Capsule Result Legendary Row Must Use Separate Gold Asset

Status: Passed (2026-07-10, PM)

Area: Capsule result feed rows.

What changed:

- `atlas.resultRowArt(rarity)` maps common/uncommon/rare/epic to the four TOP
  rows of `capsule-result-item-rows-v2.png` (the damaged gold row 4/5 is never
  sliced), and legendary to the separate `capsule-result-item-row-legendary-v1.png`.
- The deprecated `capsule-result-feed-panel-v1(.png/-chroma)` and
  `-item-rows-v1-chroma` are not referenced anywhere.

How verified:

- `08-rows-legendary-epic-rare-uncommon.png` + `09-rows-common-legendary.png` —
  legendary gold border + bulb strips are warm gold and complete (no dark/dirty
  spots, no transparent holes); the uncommon green frame is intact (not cut
  transparent); rare=cyan, epic=magenta, common=silver all correct.

PM verification result:

- Passed by code inspection and browser screenshots.
- Deprecated full panel and damaged chroma sheets are not referenced by runtime
  asset mapping.
- Browser x10 feed shows green/uncommon rows intact and gold rows visually intact.

Evidence: browser result-row behavior was captured during PM acceptance. The
temporary screenshot archive was intentionally removed during repository cleanup.

### QA-004: Home Bottom-Left Utility Controls Need Asset Integration

Status: Passed (2026-07-10, PM)

Area: Home page, bottom-left sound/settings/help buttons.

What changed (all in `roomScreen.ts`):

- Replaced the old `homeIconBtn` + code-glyph buttons with
  `home-utility-buttons-sheet-v2.png` via `atlas.utilityButtonCrop(key, state)`
  (4 cols sound-on/muted/settings/help × 3 rows normal/hover/pressed).
- The sound button picks the `soundOn` vs `muted` column from the mute state.
- Fixed dest rect per button (identical across states — only the source crop
  changes), so hover never shifts/resizes; hit area is stable and centered.
- Removed the dead `iconButton`/`drawSpeaker` code (kept a neutral placeholder
  only while the sheet is still decoding).

How verified:

- `02-utility-buttons-idle.png` / `03-utility-buttons-hover.png` — buttons match
  the sheet; hover brightens with zero position/size change.
- `04-utility-buttons-muted.png` — clicking sound switches to the muted (pink
  slash) art.

PM verification result:

- Failed. The current spritesheet/crop is not clean enough for production use.
- In hover state, a black strip leaks above buttons.
- Muted state has leftover button art leaking on the left.
- Normal sound button is clipped on the right.
- Normal settings button has extra neighboring art on the right.
- Root cause observed in asset/code inspection: `home-utility-buttons-sheet-v2.png`
  is `1536x1024`, but code treats it as a 4x3 grid, so each row is
  `1024 / 3 = 341.333...px`. Pixel UI sprites must not rely on fractional source
  crops. The sheet also has button opaque pixels touching/crossing naive cell
  boundaries.

Required fix:

- Rebuild the utility button sheet into a clean integer grid.
- Each button state must be a separate, centered sprite inside an identical cell
  with transparent padding.
- No state may include neighboring button fragments, black divider strips, or
  clipped edges.
- Update the crop constants to the new integer cell size.

PM fix applied:

- Repacked the existing button sprites into a cleaner transparent sheet at the
  same runtime path:
  `public/assets/home-ui/home-utility-buttons-sheet-v2.png`
- This was only a crop/repack of the existing artwork. No recolor, redraw, or
  style change was performed.
- Moved the bad source backup out of runtime assets:
  `docs/home-controls-assets/home-utility-buttons-sheet-v2-unclean-backup.png`

PM verification result:

- Passed after the asset repack.
- Idle, hover, and muted screenshots no longer show the top black strip, side
  fragments, or clipped button edges.

Evidence: idle, hover, and muted states were browser-checked after repacking.
The temporary screenshot archive was intentionally removed during repository cleanup.

### QA-005: Capsule Result Feed History Is Too Fast And Not Reviewable

Status: Passed (2026-07-10, PM)

Area: Capsule page, x10 result feed.

Current observation:

- The result feed prevents duplicate cards from blocking the large reveal, which
  is directionally correct.
- However, after x10 the feed scrolls too fast and only the latest four rows are
  visible.
- The first six results can disappear before the player understands what they
  got.
- There is no manual way to scroll/review the full batch.

Expected behavior:

- For x10, the player must be able to inspect all 10 results.
- Show 4 rows at a time is acceptable, but the feed needs either:
  - slower/stepped reveal with enough dwell time per row, and/or
  - manual wheel/drag/arrow/page control to review the current batch.
- The latest results should not immediately erase the player's ability to read
  earlier results.
- It should still feel fast, but not disposable.

Required fix:

- Keep the compact ticker design, but add reviewability.
- Recommended: after a pull finishes, keep the batch pinned for several seconds;
  allow mouse wheel/drag over the feed to scroll through all rows in the current
  batch; optionally add small up/down arrows or a subtle scroll hint.
- Do not replace this with a web table or a baked full panel image.

Evidence: the original user screenshot and PM browser screenshots were
intentionally removed during repository cleanup. The observed failure and
requirements above remain the retained record.

PM verification result:

- Failed. Mouse wheel over the result feed did not change the visible rows.
- The before/after wheel screenshots are identical, confirming the feed is not
  manually reviewable.

Claude fix applied:

- The feed is now a pinned current-pull batch, not an auto-running transient
  history. A x10 result keeps all ten rows available until the player starts a
  new pull; the initial viewport is a stable `1-4/10`.
- Registered the actual four-row ticker viewport as a `Stage.scrollRegion` and
  consume its wheel deltas in `CapsuleScreen`, clamped to the first/last row.
- Added pointer-drag support to the shared canvas scroll-region input and two
  compact code-drawn up/down ticks in the ticker header. All three interactions
  drive one row-index state, so they cannot drift out of sync.
- Kept generated rarity row assets, the compact clip window, and the accepted
  duplicate/reveal rules unchanged. No baked result panel or HTML table was
  added.

How verified in browser:

- A real x10 click produced a stable `1-4/10` ticker.
- The down tick changed it to `2-5/10`.
- Wheel scrolling progressed through the middle batch, and pointer dragging
  reached `7-10/10`; each screenshot visibly changes the four rendered rows.
- `npm run typecheck`, `npm test` (96/96), `npm run build`, and
  `node scripts/verify.mjs` all passed with zero browser console errors.

Evidence for PM verification: the browser test captured the top, wheel, and
drag states. The temporary screenshot archive was intentionally removed during
repository cleanup.

PM browser acceptance:

- Ran a real x10 pull in the in-app browser. The result viewport opened at
  `1-4/10`; clicking the compact down tick changed the visible range to
  `2-5/10`; scrolling the pointer over the ticker changed it again to `3-6/10`.
  This confirms the current batch is pinned and the visible rows genuinely move.
- The ticker stays in the center gap without covering the pull cards, capsule
  machine, or showcase cabinet. The large reveal still appears only for the
  genuinely new item; the other results remain compact rows.
- No browser console warnings or errors were present during this pass.

PM evidence: a live x10 browser pass confirmed the starting, down-control, and
wheel states. The temporary screenshot archive was intentionally removed during
repository cleanup.

### QA-006: Capsule Pull Buttons Still Look Like Generic UI

Status: Passed (2026-07-10, PM)

Area: Capsule page, bottom-left `Pull x1 / Pull x10` buttons.

Current observation:

- The capsule page environment and cabinet assets are premium pixel art, but the
  two action buttons still read as plain purple rounded UI buttons.
- They are functional and legible, but visually weaker than the surrounding
  machine, reward cabinet, and home shop cards.
- This is especially visible now that other areas have been upgraded with
  dedicated pixel assets.

Expected behavior:

- Pull buttons should feel like arcade machine controls or premium token shop
  controls, not generic web buttons.
- They should use or be replaced by dedicated pixel-art button/frame assets.
- The existing lever feedback should remain unchanged.

Evidence: browser capsule states were captured during PM acceptance. The
temporary screenshot archive was intentionally removed during repository cleanup.

Claude fix applied:

- Replaced the procedural purple faces with the existing
  `home-ui/shop-card-frame-v1-trimmed.png` shop-card frame.
- Uses the official transparent `shop_capsule_single.png` for x1 and
  `shop_capsule_bundle.png` for x10. The images are contain-fit into the card's
  measured left icon bay at their original aspect ratio; x10 gets a slightly
  wider bay without crossing into the title/price lanes.
- Labels, localized sublabels, coin cost, and hit areas are code-rendered in
  the same slots used by the home shop cards. Hover is glow-only, so dimensions
  and hitboxes remain stable. Lever feedback was not changed.

How verified in browser:

- `01-capsule-pull-controls.png` shows both controls at idle in Chinese mode:
  the x1/x10 PNGs are centered, uncropped, and clear of localized text and
  prices. The x10 bundle remains visibly wider than x1.

Evidence for PM verification: the idle pull-control state was browser-checked.
The temporary screenshot archive was intentionally removed during repository cleanup.

PM browser acceptance:

- Both `Pull x1` and `Pull x10` now read as compact arcade shop cards rather
  than generic purple web buttons. Their capsule artwork, localized labels,
  and coin-price lanes are centered and visually contained by the shared pixel
  frame.
- The x10 capsule is visibly distinct from x1, while neither image collides
  with its price or text. No crop fragments, off-center art, or layout shifts
  were observed in the idle state.

PM evidence: the wide capsule state was browser-checked. The temporary
screenshot archive was intentionally removed during repository cleanup.

## Passed Recently

### QA-P001: Project Detail Stat Icons Alignment

Status: Passed

Evidence: project-detail stat icon placement was browser-checked. The temporary
screenshot archive was intentionally removed during repository cleanup.

Notes:

- Earlier right-side stat icons were too large and biased up-left.
- Latest checked screenshot showed them centered enough for the current pass.

### QA-P002: Project Detail Reward Rail Alignment

Status: Passed

Evidence: project-detail reward-rail placement was browser-checked. The
temporary screenshot archive was intentionally removed during repository cleanup.

Notes:

- Earlier bottom reward rail items were drifting inside their slots.
- Latest checked screenshot showed the rail items centered enough for the current pass.

### QA-P003: Capsule Lever Feedback

Status: Passed

Notes:

- User confirmed the lever feedback is obvious and acceptable.
- Do not spend more time changing the lever unless a new issue appears.

## QA Checklist For Every Future Acceptance Pass

Before reporting back:

1. Open the app in browser and capture screenshots for every touched page.
2. Compare against the product intent: premium pixel arcade, not web UI.
3. Check asset correctness: no wrong source asset, no deprecated asset, no damaged chroma cutout.
4. Check alignment: icon centered, row centered, text not touching borders.
5. Check interaction pacing: no unnecessary waiting, no distracting animation rhythm.
6. Update this file with every failed, passed, or needs-verification item.
7. Only then send the user the acceptance result and Claude prompt if needed.
