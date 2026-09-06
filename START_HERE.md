# Start Here

## 2026-09-05 · V2 重新策划

当前先阅读 [V2 策划与制作入口](docs/v2/README.md)，再看下方历史 MVP 背景。用户已要求先完成完整游戏策划，再推导美术、UI 和程序。V2 v0.1 是待评审提案，旧网页式 UI 实验不算最终方向；新机制、实施顺序和数值冲突以该入口的状态说明为准。

2026-09-05 后续进度：[P1-A 可交互桌面样板](docs/v2/P1A_SAMPLE.md) 已实现。启动本地服务后访问 `/cozy.html`；样板使用独立示例内存状态，不写正式存档。

## 历史 MVP 背景

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
