# Implementation Handoff: P1 Trust And Cosmetics

Read first:

```text
docs/P1_PRODUCT_SPEC.md
docs/P1_COSMETIC_ART_DIRECTION.md
docs/P1_COSMETIC_GENERATED_ASSETS.md
docs/PM_LIVE_QA_ISSUES.md
```

Implement **P1A and P1B only**. Do not begin the 50-item content expansion or
the duplicate-dust exchange yet.

## P1A: Truthful Demo Arcade

Build the first-empty-scan decision and persistent demo identity exactly as
defined in `P1_PRODUCT_SPEC.md`.

Required outcome:

1. No readable first local history: show the localized `NO HISTORY FOUND` /
   `未找到历史记录` decision before fictional projects appear.
2. `PLAY DEMO ARCADE` / `进入演示街机厅` intentionally enters a fictional demo
   world. `SCAN AGAIN` / `重新扫描` retries the local scan.
3. Demo mode has a persistent localized `DEMO ARCADE` / `演示街机厅` identity on
   Home, Project Detail, Capsule, and Achievement screens. It must be visible
   without opening Settings and explain itself in the help/tooltip surface.
4. Demo sync feedback must read `DEMO SYNC` / `演示同步`.
5. Settings retains a clear `TRY LIVE SCAN` / `尝试扫描真实记录` action.
6. Live/demo data, wallet, collection, and equipped cosmetics remain isolated.

Use existing HUD/plaque visual language for the demo identity. Do not make a
generic rounded HTML badge or an unframed web modal.

## P1B: Functional Cosmetics

Build a dedicated localized `CUSTOMIZE ARCADE` / `装扮街机厅` screen, reachable
from the Home player card and prize-wall control area.

Required outcome:

1. It has two clear categories: room themes and profile frames.
2. Each cosmetic reads as exactly one of `LOCKED`, `OWNED`, or `EQUIPPED`.
3. A player can equip one room theme and one profile frame, or return to each
   free default.
4. State persists across refresh and remains isolated per live/demo save slot.
5. `Sunset Room Theme`, `Forest Room Theme`, and `Cyan Profile Frame` have the
   immediate visible Home-screen effects defined below.

## Required Asset Mapping

Copy the two P1 generated backgrounds to their documented runtime destinations
and use the exact mappings:

```text
e_sunset -> public/assets/customization/sunset-arcade-room-bg-v1.png
l_forest -> public/assets/customization/forest-arcade-room-bg-v1.png
r_frame  -> public/assets/collectibles/items/r_frame.png
```

Do not recolor, crop, or substitute these assets. Keep all live Home elements
above an equipped background. Use the complete `r_frame` art around the Home
player portrait; its wing tips, diamonds, and corner bolts must remain visible.

## Shop Rules

- `Room Theme` and `Profile Frame` grants choose an unowned matching cosmetic
  whenever one exists.
- If every matching cosmetic is owned, the shop card becomes `COMPLETE` /
  `已集齐` and cannot spend coins for a pointless duplicate.
- New cosmetic acquisition has a short game-like reveal and points the player
  to the customization screen.

## Acceptance Checklist

1. Fresh empty scan does not silently imitate real progress.
2. Entering demo clearly labels every main screen as demo.
3. Each P1 equipped cosmetic survives refresh and causes the intended visible
   Home change immediately.
4. English and Simplified Chinese both fit without overlap or clipping.
5. No existing core loop regresses: live scan, coin minting, cabinet levels,
   pulls, duplicate behavior, achievement gallery, and language switching.
6. Update `docs/PM_LIVE_QA_ISSUES.md` with what was implemented and what still
   needs PM browser verification; do not mark P1 passed without that review.
