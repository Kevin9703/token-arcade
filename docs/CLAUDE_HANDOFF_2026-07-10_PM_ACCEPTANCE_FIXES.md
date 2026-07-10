# Claude Handoff: PM Acceptance Fixes 2026-07-10

Please read this first:

`docs/PM_LIVE_QA_ISSUES.md`

This handoff follows the PM browser acceptance pass on 2026-07-10.

## Do Not Rework These Passed Items

Do not spend time reworking these unless a new PM issue is added later:

- QA-002 core behavior: duplicates no longer block as full large reveal cards.
- QA-003 result row asset mapping: legendary uses the separate gold asset; deprecated panel/chroma sheets are not used.
- QA-004 home bottom-left utility controls: PM fixed the asset sheet itself, and browser verification passed.
- Capsule lever feedback: still accepted.
- Project detail stat icons, reward rail, and return buttons: still accepted from earlier passes.

QA-001 neon logo flicker remains `Needs Verification`, not a required code task right now. The code logic matches the requested frame-orchestration approach, but PM still needs live human viewing to judge the feel. Do not add new logo masks or draw new neon segments in code.

## Must Fix: QA-005 Capsule Result Feed History

Problem:

The x10 result feed currently shows only four rows at a time. It scrolls/settles too quickly and cannot be manually reviewed. In PM browser verification, wheel scrolling over the feed did not change the visible rows, so the first six results of a x10 pull can effectively disappear.

Evidence: the original user and PM browser screenshots were intentionally
removed during repository cleanup. The interaction requirements below remain
the retained handoff record.

Required behavior:

1. A x10 pull must let the player inspect all 10 results.
2. It is fine to keep only 4 rows visible at once, but the current batch must be reviewable.
3. Add manual review interaction over the result feed:
   - mouse wheel should scroll through the current batch/history;
   - drag or small up/down controls are also acceptable if they feel arcade-like;
   - keep the interaction inside the compact ticker area, not a web table.
4. After a pull finishes, keep the latest batch pinned long enough to read.
5. Do not let the newest four rows immediately make the earlier six unreadable.
6. If a new pull starts, it can replace or prepend the previous batch, but the current x10 result should not vanish before the player can understand it.
7. Keep the existing design direction:
   - compact ticker;
   - generated row assets;
   - no baked full panel image;
   - no HTML table / web list feeling.

Recommended presentation:

- Keep the `最近奖励 / Recent Rewards` header.
- Add a tiny pixel hint such as `1-4 / 10` or small up/down ticks when the latest batch has more rows than visible.
- The feed may auto-scroll softly once, but after that it should settle into a manually reviewable state.
- Mouse wheel over the feed should update the visible rows and clamp at the top/bottom.

Acceptance checks:

1. Pull x10.
2. Confirm all 10 result rows are reachable.
3. Scroll up/down over the feed and screenshot before/after; visible rows must change.
4. Confirm the feed still does not cover the machine, pull buttons, or showcase cabinet.
5. Confirm duplicates still do not open large reveal cards.
6. Update `docs/PM_LIVE_QA_ISSUES.md`: QA-005 should become `Needs Verification`, with screenshots listed.

## Polish Issue: QA-006 Capsule Pull Buttons

Problem:

The capsule page bottom-left `抽取 X1 / 抽取 X10` controls are functional but still look like generic purple rounded UI buttons. They are visually weaker than the surrounding capsule machine, showcase cabinet, and home shop cards.

Evidence: the original PM browser screenshots were intentionally removed during
repository cleanup. The visual direction below remains the retained handoff record.

Direction:

- Do not draw a brand-new button style in code.
- Prefer reusing the existing home shop-card visual language/assets if they fit:
  - `public/assets/home-ui/shop-card-frame-v1-trimmed.png`
  - `public/assets/shop/items/shop_capsule_single.png`
  - `public/assets/shop/items/shop_capsule_bundle.png`
- The pull controls should feel like premium arcade shop controls, with icon, label, and coin cost centered cleanly inside a pixel frame.
- Keep the existing lever feedback untouched.

This is lower priority than QA-005. If reuse of existing assets does not fit cleanly, leave QA-006 open and wait for PM/Codex to provide a dedicated pull-button asset.

## PM Asset Note

PM fixed the utility button sheet by repacking the existing button art:

- Runtime asset now fixed:
  `public/assets/home-ui/home-utility-buttons-sheet-v2.png`
- Old bad backup moved out of runtime assets:
  `docs/home-controls-assets/home-utility-buttons-sheet-v2-unclean-backup.png`

Do not restore the old bad sheet.
