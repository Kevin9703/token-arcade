# Codex Task Brief

You are implementing the first playable version of Token Arcade.

The product manager has intentionally avoided prescribing engineering architecture. Choose the implementation approach that best fits the project, but preserve the product behavior and scope described in `docs/`.

## What To Build

Build a local-first app that turns AI coding token usage into a cozy pixel arcade.

Before building UI, read `docs/VISUAL_PROTOTYPES.md`. The visual target is important: this should feel like a playable arcade room with a player character, project cabinets, a coin bank, and a prize wall. Avoid turning it into a token analytics dashboard with pixel styling.

For the visual polish pass, also read `docs/GENERATED_ASSETS.md`, `docs/CAPSULE_GENERATED_ASSETS.md`, `docs/PROJECT_DETAIL_GENERATED_ASSETS.md`, and `docs/PROJECT_LEVEL_SYSTEM.md`. Use generated assets as room/object layers while keeping dynamic text, state, hit areas, and fallback rendering in code.

The user should be able to:

1. Open the app and see a pixel arcade room.
2. Sync or load token usage.
3. See token usage grouped by project.
4. Receive arcade coins from newly discovered tokens.
5. See each project represented as an arcade cabinet.
6. Watch project cabinets grow through 50 levels and 5 visual stages.
7. Spend coins on a capsule machine.
8. View unlocked collectibles on a prize wall.
9. Keep progress after closing and reopening the app.

## Product Rules

- Token usage is the only gameplay input.
- Do not use commits, tests, docs, PRs, file edits, or any productivity-quality metric.
- Do not display full conversation history.
- The app may show token totals, project names, coin balances, cabinet levels, collectibles, and achievements.
- If real local token history is not available, the app must still be demoable with mock data.
- All state should be local-first. No account is required.

## Desired Feel

This should feel like a small Steam-style pixel game, not an analytics dashboard.

The satisfying moments are:

- coins dropping after sync
- arcade cabinets lighting up
- pulling a capsule
- unlocking a new badge or decoration
- watching a project cabinet become more impressive over time

The capsule screen should feel like a reward room with a premium machine and a lit achievement cabinet, not a rarity table.

The project detail screen should feel like walking up to one selected project's personal arcade cabinet, not opening a token stats dashboard. Different projects should be able to use different large cabinet variants.

Project levels are not just labels. They should make cabinets visually evolve, use level-stage colors on both the home screen and detail screen, and provide a small future coin multiplier while still using token usage as the only gameplay input.

## Acceptance Criteria

- A first-time user can understand the loop without reading documentation.
- The main screen is the arcade room, not a stats table.
- The app is fun with mock data.
- The app remains useful with only one numeric signal: token usage.
- The MVP avoids scope creep and does not become a generic history viewer.
