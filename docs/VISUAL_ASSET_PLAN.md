# Visual Asset Plan

Token Arcade should use generated visual assets selectively.

The goal is not to replace the canvas renderer with a giant screenshot. The goal is to give the current canvas implementation better atmosphere and object quality while keeping UI text, hit areas, and state-driven rendering in code.

## Asset 1: Arcade Room Background

Priority: highest

Purpose:

- Turn the home screen from a flat HUD into a room.
- Provide wall, floor, ambient lighting, and props.
- Leave clear zones for current UI objects.

Spec:

- Size: 1600x1000.
- Pixel-art style, dark cozy arcade, warm neon.
- No readable text.
- No UI labels.
- Leave clear visual space for:
  - top-left player card
  - left cabinet column
  - center coin bank
  - right prize wall
  - bottom spend rail
- Include subtle floor reflections, wall lights, posters/sign shapes, distant cabinets, shelves, and cables.

## Asset 2: Coin Bank Machine

Priority: high

Purpose:

- Make the central sync target feel like the game's main magical object.

Spec:

- Transparent PNG preferred if practical; otherwise chroma-key removable background.
- No readable text.
- Front-facing arcade token converter machine.
- Glass chamber, coin pile, neon cyan/gold glow, chunky base.
- Fits roughly 360x520 logical pixels.

## Asset 3: Prize Wall Shelf

Priority: high

Purpose:

- Make collectibles feel desirable even when locked.

Spec:

- No readable text.
- Shelf or cabinet frame with 4 columns and 6-7 rows of reward slots.
- Dark wood/metal arcade shelf, magenta neon trim.
- Slot placeholders should support code-rendered collectibles or lock marks on top.
- Fits roughly 360x750 logical pixels.

## Asset 4: Cabinet Skin Set

Priority: medium

Purpose:

- Make each project feel like a distinct cabinet instead of a row item.

Spec:

- 4-5 cabinet color variants.
- No readable text.
- Each should support code-rendered project name, level, token count, and progress overlay.
- Small, readable silhouette at roughly 84x130 logical pixels.

## Asset 5: Reward Collectible Icons

Priority: later

Purpose:

- Improve capsule reveal and prize wall delight.

Spec:

- Small pixel collectible icons.
- Categories: badge, trophy card, room theme, cabinet buddy, profile frame.
- Rarity should be expressed through code border/glow rather than baked labels.

## Capsule Screen Asset Set

Priority: high

Purpose:

- Turn the capsule page from a procedural screen into a reward room.
- Make the pull action feel tempting.
- Make the achievement display cabinet feel collectible even when mostly locked.

Generated asset brief:

```text
docs/CAPSULE_GENERATED_ASSETS.md
```

Assets:

- `assets/generated/capsule/capsule-room-bg-v2-empty-1600x1000.png`
- `assets/generated/capsule/capsule-machine-v1.png`
- `assets/generated/capsule/achievement-display-v1.png`
- `assets/generated/capsule/reveal-card-frames-v2-transparent.png`

## Project Detail Screen Asset Set

Priority: high

Purpose:

- Turn the clicked project page from a stats UI into a physical arcade inspection bay.
- Make the selected project feel like a large personal cabinet.
- Preserve cabinet identity by supporting multiple color variants.

Generated asset brief:

```text
docs/PROJECT_DETAIL_GENERATED_ASSETS.md
```

Assets:

- `public/assets/project-detail/cabinet-stage-1.png`
- `public/assets/project-detail/cabinet-stage-2.png`
- `public/assets/project-detail/cabinet-stage-3.png`
- `public/assets/project-detail/cabinet-stage-4.png`
- `public/assets/project-detail/cabinet-stage-5.png`
- `assets/generated/project-detail/project-room-bg-v1-1600x1000.png`
- `assets/generated/project-detail/project-stats-board-v1.png`
- `assets/generated/project-detail/recent-rewards-rail-v1.png`

Use the five `cabinet-stage-N.png` files as the primary large cabinet stage art for the project detail page. Do not compose the main project cabinet by placing a tiny topper/badge on an older cabinet, and do not crop the full sheet at runtime. Do not use the green cabinet as a default Stage 1 cabinet. The current 5-stage level mapping is white, blue, magenta, purple, amber.

## Project Level System Asset Set

Priority: high

Purpose:

- Make project level feel like cabinet growth, not a tiny number.
- Connect home-screen cabinet colors with project-detail cabinet colors.
- Add small visual rewards for leveling without adding a complex second game.

Product brief:

```text
docs/PROJECT_LEVEL_SYSTEM.md
```

Assets:

- `assets/generated/level-system/home-level-cabinets-v5-redrawn.png`
- `public/assets/level-system/home-level-cabinets.png`
- `assets/generated/level-system/project-level-ui-kit-v6-counted-lights.png`
- `public/assets/level-system/project-level-ui-kit.png`
- `public/assets/project-detail/cabinet-stage-1.png`
- `public/assets/project-detail/cabinet-stage-2.png`
- `public/assets/project-detail/cabinet-stage-3.png`
- `public/assets/project-detail/cabinet-stage-4.png`
- `public/assets/project-detail/cabinet-stage-5.png`

Use:

- Home-screen level-colored cabinet sprites.
- Stage badges.
- Cabinet toppers.
- Progress-meter endcaps.
- Level-up sparkles.
- Max-level shine.

Important:

- Use 50 numeric levels and 5 visual stages.
- Use existing large cabinet variants as stage colors.
- Home-screen cabinet stage should match project-detail cabinet stage.
- Keep all project names, numbers, progress, and coin values code-rendered.
- In the level UI kit topper, the front-strip bulbs must count the stage: 1, 2, 3, 4, 5.
- The progress-meter endcap row should echo the same 1-5 light count.
- The large project-detail cabinet should come from the whole-cabinet stage sheet, not a pasted crown/badge composition.
- Re-measure crops for the latest replacement sprite sheets; do not reuse older v1/v2 crop rectangles.

## Implementation Guidance For Claude Code

- Keep existing gameplay and state logic.
- Keep important text in canvas code.
- Use assets as background/object layers.
- Avoid making the app dependent on one static full-screen mockup.
- If asset loading fails, keep the app usable with procedural fallback art.

Generated assets are listed in `GENERATED_ASSETS.md`.
