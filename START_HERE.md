# Start Here

Build Token Arcade.

Read these files first:

1. `README.md`
2. `CLAUDE.md`
3. `docs/PRODUCT_BRIEF.md`
4. `docs/MVP_SPEC.md`
5. `docs/GAME_ECONOMY.md`
6. `docs/EXPERIENCE_PRINCIPLES.md`
7. `docs/VISUAL_PROTOTYPES.md`
8. `docs/GENERATED_ASSETS.md`
9. `docs/CAPSULE_GENERATED_ASSETS.md`
10. `docs/PROJECT_DETAIL_GENERATED_ASSETS.md`
11. `docs/PROJECT_LEVEL_SYSTEM.md`

## Product Intent

Token Arcade is not a transcript viewer, usage dashboard, or productivity scorer.

It is a small local game that converts AI coding token usage into arcade coins and cosmetic rewards.

The first playable version should make this loop feel good:

```text
tokens were spent
-> coins drop
-> project cabinets light up
-> user spends coins
-> prize wall fills
```

## PM Direction

Engineering choices are open.

Prioritize:

- a working local app
- a fun mock-data demo path
- clean token-to-coin conversion
- project-level aggregation
- 50-level project cabinet growth with 5 visual stages
- visible arcade room
- capsule pull and collection persistence
- generated visual assets as object/background layers, not static mockup replacements

Defer anything that turns this into a large platform.

## First Milestone

Deliver a playable vertical slice:

- demo token data creates coins
- home screen follows the primary arcade room direction from `docs/VISUAL_PROTOTYPES.md`
- player card, project cabinets, coin bank, prize wall, and spend rail are visible
- user can collect coins
- user can spend coins on a capsule pull
- unlocked collectible appears on the prize wall
- refresh/reopen preserves progress
