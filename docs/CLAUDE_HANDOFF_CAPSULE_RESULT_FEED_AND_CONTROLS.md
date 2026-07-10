# Claude Handoff: Capsule Result Feed And Home Controls

Date: 2026-07-09

This handoff covers the next implementation pass for Token Arcade. The goal is to improve the capsule pull experience and replace the rough home bottom-left utility buttons with the PM-provided pixel assets.

## Product Intent

Token Arcade should feel like a polished pixel arcade game, not a web UI with pixel decorations. The user should get strong feedback when spending coins, but should not be forced to watch duplicate rewards one card at a time.

The capsule pull experience should become:

- New rewards feel exciting and get a large reveal.
- Duplicate rewards are acknowledged quickly in a compact rolling result feed.
- The player can immediately understand what came out of a pull without waiting through repeated full-card animations.
- The UI should use the provided pixel assets and code-driven layout/animation, not newly hand-drawn web boxes.

## Assets To Use

### Home Bottom-Left Utility Buttons

Use this spritesheet for the home page bottom-left utility buttons:

`public/assets/home-ui/home-utility-buttons-sheet-v2.png`

Sheet layout:

- 4 columns: sound on, muted, settings, help
- 3 rows: normal, hover, pressed

Implementation notes:

- The sound button must switch between the sound-on column and muted column based on current mute state.
- Do not keep the previous rough icon buttons if this sheet is available.
- Keep the hit areas stable and centered; the visual sprite should not drift between states.
- These buttons are small utility controls, so they should be visually quiet but crisp.

### Capsule Result Feed Item Rows

Use row assets for the capsule result feed. The feed itself should be implemented in code; do not use a baked full panel image with scrollbar.

Use this row sheet for non-legendary rows:

`public/assets/capsule/capsule-result-item-rows-v2.png`

Use only the common, uncommon, rare, and epic rows from this sheet.

Use this separate row for legendary/gold:

`public/assets/capsule/capsule-result-item-row-legendary-v1.png`

Important: do not use the gold/legendary row inside `capsule-result-item-rows-v2.png`. That sheet was cut from a red chroma source and the gold row was damaged. The separate `capsule-result-item-row-legendary-v1.png` was cut from a green source specifically to preserve the gold border and glow.

## Assets Not To Use

Do not use these rejected/working assets:

- `public/assets/capsule/capsule-result-feed-panel-v1.png`
- `public/assets/capsule/capsule-result-feed-panel-v1-chroma.png`
- `public/assets/capsule/capsule-result-item-rows-v1-chroma.png`
- the legendary/gold row inside `public/assets/capsule/capsule-result-item-rows-v2.png`

Reasons:

- The panel asset bakes in a scroll rail and full board, but the result feed must be dynamic.
- The green chroma row sheet can damage green UI.
- The red chroma row sheet damages gold/legendary UI.

## Capsule Pull UX Change

Current problem:

When the player clicks pull, especially x10 repeatedly, every card reveals one by one. Duplicates also block the flow. This makes the player wait too long and makes spending coins feel sluggish.

New behavior:

1. Keep the lever/pull feedback. The user already confirmed the lever animation feels good.
2. After a pull, split outcomes by `isDup`.
3. Only rewards where `isDup === false` should enter the large center reveal queue.
4. All results from the pull should appear in a compact result feed, including duplicates and new rewards.
5. Duplicate results should not create a blocking full-card reveal.
6. If a pull has no new rewards, show the result feed plus a short duplicate-summary pulse, then let the player pull again quickly.
7. The player should be able to skip or fast-forward remaining large reveals by clicking again or using an obvious skip affordance.

Data reminder:

- `PullOutcome` already has `collectible`, `isDup`, and `count`.
- The implementation should mostly live in the capsule screen UI layer, not in the core pull/economy logic.

## Result Feed Design

The result feed should sit near the lower-left area of the capsule page, close enough to the machine that it feels attached to the pull result.

Feed behavior:

- Show about 3 to 5 rows at once.
- Auto-scroll through the current pull's results if there are more rows.
- The list should be code-driven: mask/clip the visible area and animate rows vertically.
- Do not draw the scrollbar or the whole rolling track into an image.
- It should feel like a slot-machine receipt or arcade ticker, not a website table.

Each row should contain:

- left: collectible icon
- middle: collectible name
- small rarity label or rarity color
- right: `NEW` chip for newly acquired items, or `DUP xN` / owned count for duplicates

Tone:

- New rewards: brighter pulse, short sparkle, can also appear in the full reveal.
- Duplicates: quick compact acknowledgement, no blocking card.

## Layout And Alignment Rules

- All item icons must be centered inside their row slots.
- Rarity row background must not be stretched unevenly.
- Text must not touch the ornamental borders.
- The row asset should be treated as a frame/background, with content laid over it in code.
- Keep row heights consistent so the scrolling feed does not wobble.
- On 1600x1000 and normal desktop sizes, the feed should not cover the pull buttons or the capsule machine controls.

## Acceptance Checks

Please verify in browser screenshots:

1. Home page: bottom-left controls use `home-utility-buttons-sheet-v2.png`; sound button has both sound-on and muted states.
2. Capsule idle page: no rejected full result panel is visible.
3. Pull x1 with a new item: large reveal appears and the result feed also shows one row with `NEW`.
4. Pull x10 mixed results: only new items enter the large reveal queue; duplicates appear only in the feed.
5. Pull x10 duplicate-heavy results: the player is not forced to watch ten full-card animations.
6. Legendary row: uses `capsule-result-item-row-legendary-v1.png` and the gold border/glow is intact.
7. Green/uncommon row: green frame/background is intact and not cut transparent.

## PM Notes

This pass is not about changing the economy numbers. It is about making coin spending feel faster and more game-like. The user wants the motivation loop to be:

tokens -> coins -> pull/shop -> visible collection progress

So the pull result should give fast feedback and visible progress without wasting the user's attention on duplicate cards.
