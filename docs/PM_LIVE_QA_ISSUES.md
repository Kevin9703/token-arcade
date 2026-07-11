# PM Live QA Issues

Last updated: 2026-07-11

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

### QA-012: Home Value Proposition Floats Under The Logo Instead Of Existing In The Room

Status: Needs Verification (readability correction implemented 2026-07-11; awaiting PM browser acceptance)

Area: Home marquee and Coin Bank staging.

The original Home screen drew `ui.tagline` directly beneath `TOKEN ARCADE` and
the conversion rate above the Coin Bank. That duplicated explanatory copy in
the top band, made the marquee feel like a web header, and failed to use the
physical-world storytelling established by the original Home prototype.

Required outcome:

- The neon marquee contains the `TOKEN ARCADE` sign only.
- A real, localized A-frame guide sign lives on the floor to the lower-left of
  the Coin Bank, with the token-to-coin proposition on its charcoal board face
  and the conversion rate in its physical lower plaque.
- The sign never overlaps the player, Coin Bank, left cabinet column, sync
  standee, or reward rail, and does not become a button.
- Chinese and English fit their dedicated board/plaque slots without clipping
  or shrinking into unreadability.

Approved source and exact handoff:

- `docs/HOME_TOKEN_GUIDE_SIGN_ASSET.md`
- `docs/CLAUDE_HANDOFF_HOME_TOKEN_GUIDE_SIGN.md`

Implementation/browser audit (2026-07-11):

- **Passed structurally:** `ui.tagline` no longer appears below the Home neon;
  the rate no longer floats above the Coin Bank. The transparent A-frame is
  correctly placed to the bank's lower-left, has no black/green rectangle, and
  does not obstruct a scene control.
- **Rejected visually:** the first integration renders the sign only at
  `180 x 233`, with main lines at scale `1.16` and the rate at `0.9`. At the
  normal browser presentation these lines are decorative microtext rather than
  a readable guide. The long English rate is especially impossible to read in
  the narrow brass plaque.

Required correction: keep the same art, move to the approved `210 x 272`
geometry, and use compact explicit guide-sign wording/rate as defined in
`docs/CLAUDE_HANDOFF_V2_WORKSHOP_AND_GUIDE_READABILITY.md`. PM browser
acceptance is still required after that correction.

Readability implementation notes (2026-07-11):

- The existing alpha A-frame now uses the exact `(390,512,210×272)` logical
  rect. It remains non-interactive and keeps clear lanes to the cabinet column,
  Coin Bank, player, sync standee, and reward rail.
- Added dedicated code-rendered guide rows: Chinese uses `代币换金币` / `解锁街机好物`;
  English uses `TOKENS -> COINS` / `UNLOCK ARCADE` / `PRIZES`. Primary rows stay
  at logical scale `>= 1.2`; no background panel or baked text was introduced.
- The lower plaque now reads `{compact token rate} : 1`, with `10K` derived from
  `CONFIG.TOKENS_PER_COIN` through `fmtCompact`, not a duplicated economy value.
- The Home neon remains title-only and no conversion copy was restored above
  the Coin Bank.

PM browser acceptance to perform:

- Inspect Chinese and English at the normal Home viewport for glance-readable
  board text, contained plaque text, physical grounding, and scene clearance.
- Confirm existing Home controls and sync behavior are unchanged and inspect
  the browser console.

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

### QA-008: Public Release Still Needs Longer-Term Rewards

Status: Open — P1C / release-readiness scope (2026-07-10)

Areas: first-run no-history fallback; long-term economy and cosmetic ownership.

- The current 27-item pool is too shallow for the existing heavy-user balance.

The first-run truth boundary and functional theme/frame ownership moved to
QA-009. They are no longer part of this item; its remaining release concern is
the intentional P1C content/economy follow-up.

Required scope and release decision are recorded in `docs/PM_RELEASE_READINESS_2026-07-10.md`.

### QA-009: P1A Trust Boundary And P1B Functional Cosmetics

Status: Passed (2026-07-11, PM browser re-review)

Areas: first-empty live scan; demo disclosure and save isolation; customization;
theme/frame equipment; finite cosmetic-shop completion.

Implemented:

- A first empty or unreadable live scan now persists an explicit `no-history`
  decision state and shows canvas-native `NO HISTORY FOUND` actions: `PLAY DEMO
  ARCADE` and `SCAN AGAIN`. It does not mint coins, seed cabinets, or silently
  select demo mode.
- Demo progress is still stored in an isolated slot. Demo has a persistent
  `DEMO ARCADE` identity plaque on Home, Project Detail, Capsule, and
  Achievements, plus a hover/help disclosure that projects, tokens, coins, and
  collectibles are fictional. Demo sync is labeled `DEMO SYNC`; Settings offers
  `TRY LIVE SCAN` instead of a generic source toggle.
- Added the dedicated `CUSTOMIZE ARCADE` backstage screen with two clear bays:
  `ROOM THEMES` and `PROFILE FRAMES`. Cards show only `LOCKED`, `OWNED`, or
  `EQUIPPED`; only owned cards expose `EQUIP`.
- The existing P1 cosmetics are functional and local-first: `e_sunset` and
  `l_forest` replace the room scene with their supplied full-room art, while
  `r_frame` replaces the profile frame art. Equipment persists separately in
  live and demo slots and changes Home immediately.
- Cosmetic shop picks avoid owned cosmetic grants, blocks completed finite
  cosmetics before deducting coins, and presents an explicit complete state.
  New theme/frame rewards point to Customize rather than presenting an inert
  collectible.
- P1C was intentionally not started: no 50-item pool expansion and no repeat
  item exchange logic were added.

Claude verification:

- `npm run typecheck`, `npm test` (105/105), and `npm run build` pass.
- In-app browser validation on an existing live-history slot confirmed that
  live mode does not receive demo identity, theme/frame purchase and equipment
  work, Forest room art and Cyan profile-frame art render in their full visible
  shapes, equipment survives reload, Chinese and English labels fit, and the
  browser console reported no warnings or errors.
- The local browser's server had real token history, so it could not reproduce
  the first-empty-scan decision in this pass. `node scripts/verify.mjs` could
  not start its headless Chrome process because the browser closed during
  bootstrap; this is recorded as an environment limitation, not a passing
  browser assertion.

PM browser acceptance (isolated empty `HOME`, 2026-07-10):

- **Passed: truthful first run.** An empty scan displayed `NO HISTORY FOUND`
  with `PLAY DEMO ARCADE` and `SCAN AGAIN`; it had no projects, tokens, or
  coins before the explicit choice.
- **Passed: demo/living-data separation.** Demo plaques appeared on Home,
  Project Detail, Capsule, and Achievements. `TRY LIVE SCAN` returned to an
  empty live state and showed the same decision instead of carrying over demo
  data.
- **Passed: functional P1B cosmetics.** Cyan frame, Sunset room, and Forest
  room all unlocked, equipped, changed Home immediately, and survived reload.
  Sunset uses the striped-sun/palms arcade asset; Forest uses the authored
  firefly/vines arcade asset. The Room Theme shop became `COMPLETE` after both
  finite rewards and did not expose another price.
- **Passed: runtime health.** The inspected paths produced no browser console
  warnings or errors. English interface labels and the first-run decision fit.

PM-reported acceptance fixes, now implemented and awaiting re-verification:

1. **Demo sync label overflow (P1 blocker).** On Home, `DEMO SYNC` is rendered
   at the normal large sync-label scale on a fixed small green button. The word
   extends beyond the button and collides with the top-right HUD. Keep the
   persistent `DEMO ARCADE` plaque as the mode disclosure, but make the button
   fit at all locales: use short `SYNC` / `同步` on the physical button and show
   `DEMO SYNC` / `演示同步` only in the sync feedback, or supply a wider dedicated
   demo-button asset. Do not squeeze, crop, or overlap the label.
2. **New-cosmetic reveal obstructs controls (P1 blocker).** Buying either
   theme creates the `NEW COSMETIC`, item name, and `UNLOCKED!` banners over
   the Prize Wall `CUSTOMIZE ARCADE` control and the reward rail. Move the
   reveal into a bounded open-stage safe zone, or use one compact in-world
   toast above the bank. It must never obscure a click target, the right wall,
   or bottom shop labels. Verify both Sunset and Forest purchases.
3. **Cosmetic-card explanatory copy is generic (P2 polish).** Owned/equipped
   cards repeat `CHOOSE THE ROOM AND FRAME THAT CARRY YOUR ARCADE IDENTITY`,
   which is the page-level hint rather than a card-specific explanation. Use
   short product-specific copy, e.g. `Equip this scene in your arcade room.` /
   `装备后替换街机厅场景。` and `Equip around your player portrait.` /
   `装备到玩家头像周围。` Do not change asset mappings.

Regression note observed during the deliberate rapid-sync test: repeated
clicks can stack celebration text and coin particles over the bank. This does
not block P1A/P1B, but later action throttling or effect coalescing would make
the demo stress path calmer.

Implementation notes (2026-07-11):

- Home's physical sync asset now always uses the short `SYNC` / `同步` action
  label. In Demo, the explicit `DEMO SYNC` / `演示同步` acknowledgement renders
  above the Coin Bank rather than inside the top-right button or HUD.
- A newly purchased theme now uses one bounded in-world cosmetic plaque in the
  fixed open-stage gap beside the Coin Bank. The plaque contains the new
  cosmetic, item name, unlock acknowledgement, and Customize route; it does
  not draw over the Prize Wall, its Customize control, the bottom reward rail,
  or the top HUD.
- Usable Room Theme cards now say `Theme: Equip this scene in your arcade
  room.` / `主题：装备后替换街机厅场景。`; usable Profile Frame cards now say
  `Frame: Equip around your player portrait.` / `头像框：装备到玩家头像周围。`
  The page-level identity hint and the exact `LOCKED` / `OWNED` / `EQUIPPED`
  state model remain unchanged.
- No P1C content or repeat-item behavior was added. Existing Sunset, Forest,
  and Cyan Frame asset files and their mappings were not replaced or modified.

PM re-review evidence (isolated empty `HOME`, 2026-07-11):

- **Passed:** the Home physical action is now `SYNC` / `同步`, fully inside the
  supplied green button. The persistent Demo plaque remains present and
  localized; no HUD collision remains.
- **Passed:** new Profile Frame and Room Theme rewards use one bounded plaque
  in the open gap between Coin Bank and Prize Wall. It did not cover the Prize
  Wall, Customize route, top HUD, or bottom reward rail.
- **Passed:** Chinese and English Customize cards fit their state labels,
  specific theme/frame copy, and action text. Cyan Frame and Forest room
  equipped correctly in Home. Browser console was clear of errors/warnings.

Supersession note: that earlier visual-fit claim applied to the pre-V2 pass and
is withdrawn for the current V2 workshop. QA-010 now owns the V2 browser audit:
the V2 physical architecture is correct, while its current text density remains
visually rejected. P1B's functional ownership/equip/persistence result remains
valid.

P2 follow-up: the short-lived `DEMO SYNC` / `演示同步` banner shares the Coin
Bank's busy celebration field with token/coin/level-up text. The persistent
Demo plaque keeps the product truthful, so this does not block P1A, but a later
FX pass should give demo acknowledgement a dedicated, readable line.

### QA-010: Customize Arcade Is Still A Settings Card Layout

Status: Needs Verification (V2 readability re-layout implemented 2026-07-11; awaiting PM browser acceptance)

Area: `Customize Arcade` screen visual architecture.

P1B behavior now works, but the screen still presents five generic rounded
cards inside two bordered columns. The room/theme and frame choices have no
physical context, so the screen reads as a web preferences page rather than
part of the arcade.

Current V2 asset and exact integration handoff:

- `assets/generated/p1-customization/customize-workshop-backdrop-v2.png`
- `docs/CUSTOMIZE_WORKSHOP_GENERATED_ASSET.md`
- `docs/CLAUDE_HANDOFF_CUSTOMIZE_WORKSHOP_V2.md`

The V2 workshop supplies three wide 16:10 magenta Room Theme Projector monitors
and two compact cyan Portrait Calibration wells. It must keep all dynamic,
localized ownership/equip behavior without reviving a generic card layout.

Superseded V1 implementation record (2026-07-11):

- Registered the supplied `customize-workshop-backdrop-v1.png` as the dedicated
  full-canvas Customize background. It is drawn once without a crop, tint,
  blur, recolor, or legacy gradient layer.
- Replaced the two generic section panels and five opaque card shells with
  dynamic content placed directly into the three Room Theme Projector wells and
  two Portrait Calibration wells. Selection uses only a restrained lit bay edge;
  actions are mounted on the supplied lower consoles.
- Preserved all P1A/P1B state behavior, exact `LOCKED` / `OWNED` / `EQUIPPED`
  semantics, i18n copy, routes, ownership checks, and cosmetic mappings.
  Existing Sunset, Forest, and Cyan Frame source assets were not replaced or
  modified; P1C was not started.

Superseded browser acceptance (isolated empty `HOME`, 2026-07-11):

- **Passed:** the old two-column panels and five opaque rounded cards are gone.
  The screen now reads as one physical workshop: a three-bay Room Theme
  Projector Rack and a two-bay Portrait Calibration Station.
- **Passed:** Base, locked Sunset/Forest, owned Forest, base frame, locked
  Cyan frame, and owned/equipped Cyan frame all landed in the intended authored
  wells without clipping or position drift.
- **Passed:** real user interactions used the new hardware coordinates. Cyan
  transitioned `OWNED -> EQUIP -> EQUIPPED`; Forest transitioned
  `OWNED -> EQUIP -> EQUIPPED`; Home updated instantly to the full Forest room
  and full Cyan profile frame. Both persisted after reload.
- **Passed:** English and Simplified Chinese layouts fit in their wells. The
  inspected browser console had no warnings or errors.

PM design correction (2026-07-11):

- The earlier visual approval is withdrawn. The V1 left rack used three tall
  portrait cabinets for horizontal 16:10 room scenes. Each Theme image became
  a small thumbnail at the top of a disproportionately tall empty column. This
  is an aspect-ratio and composition failure, not a minor spacing issue.
- V2 is the replacement: three wide physical projector monitors sized around
  the scene rewards, with compact console metadata below; only profile frames
  remain in compact vertical calibration bays.
- Required files and geometry are recorded in
  `docs/CLAUDE_HANDOFF_CUSTOMIZE_WORKSHOP_V2.md` and
  `docs/CUSTOMIZE_WORKSHOP_GENERATED_ASSET.md`. The V1 asset must be removed
  after V2 integration, not left as unused project clutter.

V2 implementation notes (2026-07-11):

- `customize-workshop-backdrop-v2.png` is now the only Customize workshop
  runtime backdrop. It draws once at the full 1600×1000 logical canvas with no
  crop, tint, blur, recolor, or gradient overlay.
- Room themes now occupy the three authored landscape monitors at
  `(118,382,292×182)`, `(473,382,292×182)`, and `(828,382,292×182)`. Each real
  room scene fills its 16:10 screen edge to edge; locked themes show only a
  centered lock. Title, state, concise copy, and the action stay on the shallow
  physical console immediately below each monitor.
- The two cyan frame bays use their V2 coordinates `(1220,216,232×214)` and
  `(1220,494,232×214)`. The real Cyan Frame and player portrait remain whole;
  their established art mapping and colors are unchanged.
- Removed both rejected V1 workshop backdrop copies from `assets/generated/`
  and `public/assets/`, and removed its runtime URL reference. No P1C or
  economy work was added.

PM browser acceptance to perform:

- At 1600×1000, inspect both Chinese and English: the three theme scenes must
  dominate wide monitor screens with no portrait cabinet or unused tall column.
- Verify locked, owned, and equipped theme states remain readable; verify the
  two compact frame bays still show complete real frame art.
- Equip a theme and frame, reload, confirm persistence, and inspect the browser
  console for warnings or errors.

PM browser audit result (2026-07-11):

- **Passed:** V2 genuinely fixes V1's composition failure. The room rewards are
  real wide monitor images, not landscape thumbnails in portrait boxes. The
  old V1 backdrop is not the runtime background. The real Cyan Frame remains
  whole and correctly mapped.
- **Passed:** Cyan Frame equipped through its cyan station and remained equipped
  after reload; the Home player portrait updated and browser console contained
  no warnings/errors.
- **Rejected:** the theme consoles render name, state, hint, and action inside
  too little vertical space. At the actual browser viewport the text is too
  small to scan, and English becomes overlapping pixel noise on the console.
- **Rejected:** each cyan calibration bay allocates only a narrow right text
  lane for name, state, four-line description, and action. Both Chinese and
  English are unreadable there. The preview art is good; the information
  architecture around it is not.
- **Rejected:** the tiny `customizeHint` subtitle below the page title adds
  website-like explanatory copy while contributing no readable information.

The exact repair is `docs/CLAUDE_HANDOFF_V2_WORKSHOP_AND_GUIDE_READABILITY.md`.
This is a visual-only re-layout. It must not change the accepted V2 art,
collectible mappings, state semantics, persistence, or P1A/P1B behavior.

Readability implementation notes (2026-07-11):

- Theme projector consoles now contain only concise rack display name, state,
  and action/confirmation. The explanatory theme/obtain microcopy was removed;
  names, states, and actions use the required logical scale floors while the
  three monitor bounds and scene mappings remain unchanged.
- Both cyan calibration bays now center the complete real portrait/frame
  preview. Each uses a full-width concise name, a separate lower state, and an
  action on the authored bottom hardware strip; the rejected 78px sidebar and
  frame/obtain descriptions are gone.
- The tiny `customizeHint` subtitle is no longer rendered. The title remains,
  and the two physical fixture labels were enlarged without adding section
  cards or changing the V2 background.
- Ownership checks, exact `LOCKED` / `OWNED` / `EQUIPPED` semantics, equip hit
  areas, theme/frame mappings, demo/live isolation, and persistence logic were
  not changed.

PM browser acceptance to perform:

- Inspect locked, owned, and equipped theme/frame states in Chinese and English
  at the normal viewport for scanability and hardware alignment.
- Equip Base and Cyan Frame, then an owned theme; reload and confirm persistence.
- Confirm V2 assets/mappings remain intact and inspect the browser console.

### QA-011: Cyan Profile Frame Reward Plaque Uses A Generic Placeholder Icon

Status: Passed (P2 visual consistency, 2026-07-11, PM browser re-review)

Area: Home's short `NEW COSMETIC` unlock plaque for the `r_frame` reward.

Observed in browser: unlocking `Cyan Profile Frame` renders a small generic
empty-square sprite in the reward plaque instead of the actual cyan winged
profile-frame art. Forest's plaque showed its real forest-themed item icon, so
the mismatch is specific to the profile-frame reward presentation.

Required outcome: the unlock plaque must show the same complete Cyan Profile
Frame art used by the collectible and Customize calibration well. A new reward
must never be represented by an unrelated placeholder shape. Preserve the
existing safe plaque location, timing, and no-overlap behavior.

Implementation notes (2026-07-11):

- The Home cosmetic plaque now receives the earned collectible id and draws its
  generated collectible PNG when available. For `r_frame`, this is the complete
  existing `public/assets/collectibles/items/r_frame.png` art rather than the
  generic `SPRITES.frame` square.
- The real Cyan Frame item image is prewarmed with normal asset loading so a
  first-time reward reveal has the real art ready. Plaque coordinates, size,
  lifetime, text, and safe-zone layout are unchanged.

PM browser acceptance (isolated empty `HOME`, 2026-07-11):

- Unlocked Cyan Profile Frame through the normal reward path. The plaque showed
  the complete cyan frame silhouette (top gem, side rails, lower socket) rather
  than the retired generic square.
- The plaque remained within its dedicated safe zone and did not overlap the
  top HUD, Prize Wall, Customize route, or bottom reward rail.
- No browser console warnings or errors were produced on the reward path.

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

## 2026-07-11 V1 Completion Pass

### QA-008: Localized Home Token Guide Sign

Status: Passed (PM browser acceptance)

- Replaced runtime lettering with two authored physical A-frame assets.
- Chinese art permanently carries `代币换金币 / 解锁街机好物 / 10K : 1`.
- English art permanently carries `TURN TOKENS / INTO COINS / UNLOCK PRIZES / 10K : 1`.
- Locale switching selects the matching complete bitmap; no canvas text floats
  over the board and neither language collides with the Coin Bank.

### QA-009: Customization State Readability

Status: Passed (PM browser acceptance)

- Room themes use one large physical plaque for `装备 / 已装备 / 未解锁`.
- Profile frames now use the same single-plaque language, removing the old
  duplicated status line plus tiny secondary command.
- Equipped, owned, and locked states were exercised in Chinese and English;
  the selected frame persisted and the base frame was restored after QA.

### QA-P1C: 50-Prize Long-Term Collection

Status: Passed (PM browser acceptance + automated coverage)

- Catalog now contains exactly 50 distinct collectibles with bilingual names
  and playful descriptions. The 23 additions each use an independent generated
  PNG; none is produced by runtime recoloring.
- The capsule showcase is a real 5 x 10 cabinet. All 50 niches are addressable,
  the left rails mark `1-10` through `41-50`, icons sit on measured centers, and
  hover/tap tooltips still expose name, rarity, type, description, and duplicate
  quantity for owned prizes.
- Unique valid ownership drives permanent milestones at 10, 25, 40, and 50.
  Unknown legacy IDs and duplicate quantities do not advance progress; live and
  demo save slots remain isolated.
- Browser-forced visual audit checked every milestone composition before the
  temporary override was removed: neon shelf, header light bank, floor pedestal,
  and final crown marquee remain clear of prize icons, count text, and controls.
- A clean 1600 x 1000 browser session rendered Home, Customize, and Capsule with
  zero console warnings/errors. The first capsule pass exposed a missing color
  constant; it was fixed, rebuilt, and then rechecked in a fresh tab with empty
  logs rather than being waved through.

Automated evidence:

- `npm test`: 120 passing tests.
- `npm run typecheck`: passed.
- `npm run build`: passed.

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
