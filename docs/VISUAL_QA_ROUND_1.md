# Visual QA Round 1

Date: 2026-07-08

Evidence was captured during the original browser review. The temporary
screenshot archive was intentionally removed during repository cleanup.

Reference direction:

![Primary arcade room](../assets/prototypes/primary-arcade-room.png)

## Verdict

The implementation has the right product structure.

It is not failing because of layout. It is failing because the current screen still feels like a flat pixel UI placed on a dark background, while the target is a cozy arcade room the player enters.

Do not rewrite the product loop. Improve the room feeling, visual depth, and reward fantasy.

## What Is Working

- The first screen has the correct core zones: player card, project cabinets, coin bank, prize wall, and spend rail.
- The app avoids tables and transcript history.
- The player character exists, which is important for the "I am in a place" fantasy.
- Project cabinets are visible and feel connected to token usage.
- The central coin bank makes token-to-coin conversion understandable.
- The bottom spend rail makes coin sinks visible.

## Highest Priority Problems

### 1. The Screen Still Reads Too Much Like A HUD

Most objects are clean UI panels on a plain dark backdrop. The reference feels like a room because it has environmental cues: wall, floor, depth, machine silhouettes, shelves, ambient lights, posters, and props.

Required change:

- Add a stronger arcade room environment behind the existing UI.
- Keep current interaction zones, but make them feel mounted in a room.
- The center should feel like a stage, not empty space around a coin bank.

### 2. The Centerpiece Is Not Tempting Enough

The coin bank is understandable, but it does not yet feel like a magical machine that converts effort into reward.

Required change:

- Give the coin bank more physical presence: glass shine, base, coin tray, neon outline, stronger glow.
- Put the player closer to it emotionally and compositionally.
- Make the sync moment feel like coins are being collected into the player's economy, not just a number update.

### 3. Prize Wall Looks Like Empty Slots, Not A Reward Wall

The prize wall is clear, but it currently reads as a grid of unknowns. It should feel like a shelf of future trophies.

Required change:

- Add shelf framing, rarity bands, locked silhouettes, and a few preview shapes.
- Keep locked items mysterious, but make the wall desirable.
- Make "0 / 27 collected" feel like an invitation, not an empty state.

### 4. Project Cabinets Need More Personality

The cabinet list works, but the machines feel like small thumbnails in a list. In the target, each cabinet is a game object with character.

Required change:

- Make cabinet rows feel more like arcade machines standing in the room.
- Add stronger marquee lights, cabinet color variation, and small coin glows.
- Keep names and token numbers readable.

### 5. Visual Density Is Uneven

The left side is dense and functional. The center/right have more empty dark space. This makes the screen feel assembled rather than inhabited.

Required change:

- Add background props and lighting that do not compete with the UI.
- Use floor reflections, wall posters, neon tubes, and small arcade details.
- Avoid adding more text.

## Asset Strategy

The fastest path is not to ask Claude Code to invent better art procedurally.

Use a small set of visual assets:

1. A no-text room background layer matching the current 1600x1000 layout.
2. A stronger coin bank sprite or overlay.
3. A prize wall shelf/background sprite.
4. Optional cabinet skins or cabinet decoration overlays.

All readable text should remain rendered by the app, not baked into generated images.

## Round 1 Acceptance Criteria

- On first glance, the screen feels like an arcade room, not a dashboard.
- The player, coin bank, cabinets, and prize wall feel like objects in the same space.
- The home screen still fits in 1600x1000 without scrolling.
- Text remains readable.
- No chat history, commit/test/doc/PR metrics, productivity scoring, or leaderboards are introduced.
- The existing token -> coins -> rewards loop remains unchanged.

## Claude Code Change Brief

Improve the current home screen visual execution while preserving behavior.

Use `docs/VISUAL_PROTOTYPES.md` as the main target and this QA file as the correction brief.

Do not redesign the game economy or add new product features. Focus on:

- arcade room depth
- stronger center machine
- more desirable prize wall
- more physical cabinet presence
- better atmosphere and reward feeling

If generated visual assets are added, keep them decorative or object-level. Do not bake important text into images.

Use the first asset batch in `GENERATED_ASSETS.md` for the next visual pass.
