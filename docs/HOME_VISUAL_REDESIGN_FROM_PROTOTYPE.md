# Home Visual Redesign From Original Prototype

Date: 2026-07-09

This document compares the current Token Arcade home screen against the original home prototype and defines the next visual pass.

The current home screen has stronger generated room assets than before, but the UI layer has drifted away from the prototype. The result is that the room looks rich, while the buttons, title, player avatar, counters, and shop rail still feel partly temporary.

The target is not to copy the prototype pixel-for-pixel. The target is to recover its product feeling:

```text
an actual arcade game home screen, not a canvas app with pixel font
```

## Reference Images

Original target prototype: reviewed during the initial design pass. The
temporary local screenshot was intentionally not retained in the public repo.

Current audited home screen: reviewed in the original PM browser pass. The
temporary screenshot archive was intentionally removed during repository cleanup.

New usable home UI assets:

```text
public/assets/home-ui/logo-sign-v1-trimmed.png
public/assets/home-ui/player-character-v1-trimmed.png
public/assets/home-ui/player-card-frame-v1-trimmed.png
public/assets/home-ui/coin-counter-plaque-v1-trimmed.png
public/assets/home-ui/sync-button-states-v2-trimmed.png
public/assets/home-ui/shop-card-frame-v1-trimmed.png
public/assets/home-ui/project-row-frame-v1-trimmed.png
public/assets/home-ui/icon-button-frame-v1-trimmed.png
```

Source chroma-key images:

```text
assets/generated/home-ui/source/
```

Contact sheet for review:

```text
docs/homepage-redesign-assets/home-ui-assets-contact-sheet-v1.png
```

## What The Prototype Does Better

### 1. Title Sign

Prototype:

- The `TOKEN ARCADE` title is a real neon sign.
- It has hot pink top text, cyan lower text, tube bars, bulbs, and a metal backplate.
- It is the strongest first-read signal on the screen.

Current:

- The title is code-drawn text.
- It is readable, but it does not feel like a physical arcade sign.
- It lacks the premium marquee silhouette that the prototype had.

Required:

- Use `public/assets/home-ui/logo-sign-v1-trimmed.png` as the home title sign.
- Do not draw the main title only as pixel text.
- Keep supporting copy code-rendered under it if needed.

### 2. Player Card And Avatar

Prototype:

- The player card looks like a game HUD panel.
- The avatar has expression, hair, clothing, and personality.
- The XP bar and level text feel integrated.

Current:

- The player avatar is a blocky temporary character.
- The profile card is functional but not rich enough for the game's fantasy.

Required:

- Use `player-card-frame-v1-trimmed.png` as the player card background.
- Draw the player name, level, XP, and XP fill in code.
- Use the portrait from `player-character-v1-trimmed.png` for the player-card portrait.
- Use the full-body player from the same character sheet near the coin bank if the layout keeps a character beside the machine.
- Do not keep the current blocky placeholder character.

### 3. Coin Counter And Sync Button

Prototype:

- Coins are shown inside a thick physical plaque.
- The primary action button has a chunky arcade-machine feel.

Current:

- The coin counter is closer, but still feels like a thin pill.
- The Sync button is a large green rectangle with weak arcade detailing.

Required:

- Use `coin-counter-plaque-v1-trimmed.png` for the main coin counter container.
- Draw the coin icon and value in code or with existing sprites.
- Use `sync-button-states-v2-trimmed.png` for default/hover/pressed visual states.
- Draw the `SYNC` text in code on top of the selected button state.
- Do not use a plain rounded green rectangle for the main action.

### 4. Cabinet List

Prototype:

- Each row is a dense cabinet card: mini machine, project name, tokens, progress, coin badge.
- The row feels like a machine slot, not a text list.

Current:

- The row has good stage cabinet sprites, but the row layout is visually loose.
- The badge/level/progress pieces do not yet feel like one cohesive physical component.

Required:

- Use `project-row-frame-v1-trimmed.png` as the row container, or match its thickness and structure procedurally.
- Place the stage cabinet sprite inside the left bay.
- Draw project name, tokens, level, progress, and coin value in code.
- Keep row height and spacing consistent.
- The level plate should use the 50-level value from `levelInfo(project.tokens).level`.

### 5. Bottom Spend Rail

Prototype:

- Shop cards are thick, object-led, and priced like physical purchase cards.
- Each card has a clear object slot, title area, and gold price button.

Current:

- Bottom rail is functional but too flat and too line-based.
- The cards read more like UI buttons than arcade reward cards.

Required:

- Use `shop-card-frame-v1-trimmed.png` for each shop card.
- Draw item sprite, title, subtext, and price in code.
- Keep text inside the empty lanes; do not stretch the card so text floats outside.
- Preserve hover/disabled affordances, but style them as lit/dim arcade cards.

### 6. Icon Buttons

Prototype:

- Speaker/settings/help buttons are small physical controls.

Current:

- They are close, but can be made more premium and consistent with the rest.

Required:

- Use `icon-button-frame-v1-trimmed.png` as the empty frame.
- Draw speaker/settings/help icons in code or existing sprite functions.
- Use lit/dim states rather than changing the whole button shape.

## Asset Usage Rules

- These new UI assets are empty containers. Do not bake live text or numbers into them.
- Dynamic values must remain code-rendered:
  - player name
  - player level
  - XP number
  - coin count
  - lifetime token count
  - project names
  - project token totals
  - shop item labels and prices
- If an asset sheet contains multiple states, crop by source rect in code rather than redrawing the state by hand.
- Keep the original generated source files in `assets/generated/home-ui/source/`.

## Claude Code Prompt

Please do a focused home-screen visual redesign pass using the original Token Arcade prototype as the target.

Read first:

```text
docs/PM_PRODUCT_NORTH_STAR.md
docs/HOME_VISUAL_REDESIGN_FROM_PROTOTYPE.md
docs/MVP_GAMEPLAY_ECONOMY_AUDIT.md
docs/PM_QA_2026-07-09_VISUAL_ASSET_COMPLETION.md
```

Use these new home UI assets:

```text
public/assets/home-ui/logo-sign-v1-trimmed.png
public/assets/home-ui/player-character-v1-trimmed.png
public/assets/home-ui/player-card-frame-v1-trimmed.png
public/assets/home-ui/coin-counter-plaque-v1-trimmed.png
public/assets/home-ui/sync-button-states-v2-trimmed.png
public/assets/home-ui/shop-card-frame-v1-trimmed.png
public/assets/home-ui/project-row-frame-v1-trimmed.png
public/assets/home-ui/icon-button-frame-v1-trimmed.png
```

Goal:

Bring the home screen back toward the original prototype's arcade-game UI quality. Do not redesign the product flow. Replace weak code-drawn UI shells with the provided empty asset containers, then render dynamic text/data on top.

Must fix:

1. Replace the current code-drawn `TOKEN ARCADE` title with the generated neon sign asset.
2. Replace the blocky homepage character with the new generated player character.
3. Replace the player profile card background with the empty player-card frame.
4. Replace the Sync button with the three-state asset sheet. Text stays code-rendered.
5. Replace or visually match the bottom shop card frame with the empty shop-card asset.
6. Tighten the project cabinet rows so they read like physical arcade list rows.
7. Use the empty icon-button frame for mute/settings/help.
8. Keep all live values code-rendered. Do not bake numbers into images.
9. Keep the current good room/cabinet/prize-wall assets unless they conflict with the new home composition.

Do not use scripts to recolor or repaint assets. Script usage is only acceptable for crop measurement, source-rect calculation, or alpha inspection.
