# MVP Feature Acceptance Audit

Date: 2026-07-09

This is the PM acceptance audit for the first Token Arcade version.

The product target remains:

```text
tokens -> coins -> cabinet growth -> capsule pulls -> collection
```

## Verdict

The MVP loop exists, but the first version is not yet acceptable without several PM fixes.

The strongest parts are:

- project cabinets
- capsule room visual direction
- prize wall / display cabinet
- tooltip descriptions
- local persistence

The main blockers are:

- home screen UI still diverges from the original prototype
- project level display inconsistency
- coin economy imbalance
- rough collectible/coin item art
- currencies without visible purpose
- no place to review unlocked achievements
- no Chinese language support / i18n language switch
- sync reward moment not strong enough

## Feature Checklist

### 1. Data Source And Sync

Status: present, needs reward polish.

What works:

- The app can use live/demo data.
- It tracks project lifetime tokens.
- It avoids double counting through last totals.
- It mints coins from new token deltas.

Needs work:

- Sync should show a stronger reward summary:
  - new tokens
  - coins minted
  - project level-ups
  - achievements
- Coin balance should not remain inflated after economy rebalance.

Acceptance:

- A sync feels like collecting arcade rewards, not refreshing a dashboard.

### 2. Project Cabinets

Status: visually strong, logic consistency still blocked.

What works:

- Projects appear as cabinets.
- Stage-specific cabinet art exists.
- Project detail page has strong cabinet assets.

Must fix:

- Displayed level must use token-derived 50-level value everywhere.
- Existing old `proj.level` values must not leak into UI.
- Home and detail views must agree.

Acceptance:

- A high-token project looks and reads like a high-level machine.

### 3. Coin Economy

Status: blocked until rebalance.

Current issue:

- The current ratio and costs make coins too abundant.
- User can have hundreds of thousands of coins with too few meaningful sinks.

Must fix:

- Rebalance conversion and costs as defined in `docs/MVP_GAMEPLAY_ECONOMY_AUDIT.md`.
- Keep the economy generous but not meaningless.

Acceptance:

- The user always has a reason to spend or save coins.

### 4. Capsule Pull

Status: core behavior present, reward feel needs polish.

What works:

- Coins can be spent.
- Capsule grants collectibles.
- Rarity reveal exists.
- Duplicate handling exists.
- Pull x1 and x10 exist.

Needs work:

- Pull lever animation should be visible and tactile.
- Reveal should feel connected to the cabinet slot.
- New item icon art should replace rough sprites.

Acceptance:

- Button click -> lever movement -> machine reaction -> reveal -> prize wall update feels like one satisfying sequence.

### 5. Prize Wall / Collection

Status: structure present, asset quality and capacity need work.

What works:

- Owned/locked slots exist.
- Rarity grouping exists.
- Tooltip shows item name/rarity/type/description/count.

Needs work:

- Replace rough sprites with generated collectible icons.
- Expand collection capacity toward 50-60 slots.
- Hide exact item names for locked prizes.
- Keep locked slots desirable.

Acceptance:

- The collection wall feels like the reason to keep spending coins.

### 6. Achievements

Status: present but not acceptable until gallery exists.

What works:

- Achievement checks exist.
- Achievement toasts exist.
- Unlock dates are already persisted in `state.achievements`.

Needs work:

- Add a dedicated achievement gallery/showcase.
- Add an obvious entry point from the player card and/or prize wall.
- Achievement cards should feel like collectible trophies.
- Locked and unlocked states should both be visible.
- Names/descriptions must be localized once i18n is added.

Acceptance:

- The user can review unlocked achievements after the toast disappears.
- Achievements are a secondary delight, not invisible bookkeeping.

### 7. Currencies

Status: partially blocked.

What works:

- Coins work as main spend currency.
- Tickets and dust are tracked.

Needs work:

- Any visible currency must have a visible use.
- Hide ticket/dust if no sink is implemented.
- If dust remains visible, add crafting/pity use.

Acceptance:

- The user never asks, "What is this currency for?"

### 8. Home Screen

Status: visually blocked until prototype-alignment pass.

What works:

- Room background and core objects are strong.
- Cabinet list, coin bank, prize wall are present.

Must fix:

- Use home UI assets from `docs/HOME_VISUAL_REDESIGN_FROM_PROTOTYPE.md`.
- Replace title sign, player avatar/card, sync button, shop card frames, icon buttons.
- Tighten cabinet rows.

Acceptance:

- First glance should read as a complete arcade game screen.

### 9. i18n / Language Settings

Status: missing.

What works:

- Settings overlay exists.
- Store already persists `settings`.

Must fix:

- Add English and Simplified Chinese support.
- Add a visible Settings language switch: English / 中文.
- Persist language in `settings.language`.
- Default fresh saves from browser language.
- Localize all static UI text, achievements, collectibles, shop labels, rarity/type labels, tooltips, toasts, and DOM overlays.
- Do not translate project names, provider names, stable IDs, or the Token Arcade brand/logo.
- Do not render Chinese through the ASCII-only bitmap `pixelFont`; add a CJK-safe canvas text path.

Acceptance:

- The user can switch language without reload.
- The selected language persists after reload.
- Chinese text does not render as `?`.
- Chinese and English text both fit inside buttons, cards, tooltips, and overlays.

## Claude Code Prompt

Please use this as the PM acceptance checklist for the first Token Arcade version.

Read:

```text
docs/PM_PRODUCT_NORTH_STAR.md
docs/MVP_FEATURE_ACCEPTANCE_AUDIT.md
docs/MVP_GAMEPLAY_ECONOMY_AUDIT.md
docs/HOME_VISUAL_REDESIGN_FROM_PROTOTYPE.md
docs/COLLECTIBLE_GENERATED_ASSETS.md
docs/ACHIEVEMENTS_AND_I18N_REQUIREMENTS.md
docs/PM_QA_2026-07-09_VISUAL_ASSET_COMPLETION.md
```

Implement in priority order:

1. Fix project level display consistency.
2. Rebalance coin economy and visible currencies.
3. Integrate generated home UI assets.
4. Integrate generated collectible/currency icons.
5. Improve pull lever / reveal / prize-wall reward sequence.
6. Improve sync reward summary.
7. Add achievement gallery / showcase.
8. Add English / Simplified Chinese i18n with Settings language switch.
9. Expand collection capacity toward 50-60 slots if time allows.

Do not add non-token scoring inputs.
