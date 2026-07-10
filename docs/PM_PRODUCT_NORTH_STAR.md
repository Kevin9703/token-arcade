# Token Arcade PM North Star

Date: 2026-07-09

This is the product memory and PM acceptance standard for Token Arcade.

Token Arcade is not an AI workbench, not a productivity tracker, and not a task system. Codex, Claude Code, and similar tools already cover the workbench use case. Token Arcade exists for a different reason:

```text
Turn AI coding token usage into a playful arcade progression loop.
```

The user should feel that their AI coding history has become a physical game room: projects become machines, tokens become coins and power, coins become capsule pulls, and capsule pulls become collectibles in a prize wall.

## Core Rule

Only one gameplay input matters:

```text
model token usage
```

Do not add scoring inputs for commits, tests, documentation, PRs, issue count, file edits, productivity quality, streaks, or manual task completion.

Those can exist as project metadata someday, but they must not drive the game loop.

## Main Loop

The first version should stay simple and satisfying:

1. Read Claude Code / Codex project token history.
2. Convert new token usage into coins.
3. Show each project as an arcade cabinet.
4. More lifetime project tokens make that project's cabinet level up.
5. Coins let the user pull capsules.
6. Capsule rewards fill the display cabinet / prize wall.
7. Hovering items should reveal their name, rarity, type, description, and count.

The game should make token spending feel like visible progress without making the user manage chores.

## Project Cabinet Fantasy

Every project is its own machine.

When the user clicks a project, the feeling should be:

```text
I have spent tokens here.
This project has grown because of that.
This cabinet belongs to this project.
If I keep working here, it becomes more impressive.
```

The project detail page should feel like walking up to a cabinet in an arcade, not opening a SaaS dashboard.

## Level System

Project levels are not decorative. They are the long-term proof that tokens were invested into a project.

Use:

```text
50 numeric levels
5 visual stages
```

Visual stages:

| Stage | Numeric Levels | Name | Color / Read |
| ---: | --- | --- | --- |
| 1 | Lv 1-4 | Starter | white-silver, simple cabinet, 1 stage light |
| 2 | Lv 5-9 | Powered | blue, brighter cabinet, 2 stage lights |
| 3 | Lv 10-19 | Deluxe | magenta, crown-like top, 3 stage lights |
| 4 | Lv 20-34 | Neon | purple, jewel top, richer glow, 4 stage lights |
| 5 | Lv 35-50 | Legendary | amber-gold trophy cabinet, crown/wings, 5 stage lights |

Important:

- Use token-derived level information as the source of truth.
- Existing old saves that still contain 1-5 `proj.level` values must not cause the UI to display the wrong 50-level number.
- Home cabinet, project detail cabinet, stats board, and reward tickets should all agree on the same numeric level and stage.

## Visual Bar

The app should feel like a Steam-adjacent pixel arcade, not a plain UI with pixel font.

Good Token Arcade visual language:

- physical cabinets, shelves, ticket rails, coin banks, capsule machines
- strong silhouettes and visible stage growth
- readable token/coin values
- neon glow used to support hierarchy
- real generated bitmap assets for big objects
- code-rendered dynamic text only where data must change

Bad Token Arcade visual language:

- generic rounded cards pretending to be arcade UI
- tiny stickers pasted onto old machines as "upgrades"
- reused green cabinet for every project stage
- script recoloring that destroys detail or creates overexposed assets
- dashboard-first layouts where the cabinet becomes decoration

## Asset Policy

Use image generation for new art or color/design changes.

Python/scripts are allowed for:

- cropping
- chroma-key cutout
- alpha cleanup
- technical inspection

Python/scripts should not be used for:

- recoloring stage art
- repainting rarity assets
- generating design variants
- faking visual detail

The current official project-detail cabinet assets are:

```text
public/assets/project-detail/cabinet-stage-1.png
public/assets/project-detail/cabinet-stage-2.png
public/assets/project-detail/cabinet-stage-3.png
public/assets/project-detail/cabinet-stage-4.png
public/assets/project-detail/cabinet-stage-5.png
```

The current official reveal frame assets are:

```text
public/assets/capsule/reveal-frame-legendary.png
public/assets/capsule/reveal-frame-epic.png
public/assets/capsule/reveal-frame-rare.png
public/assets/capsule/reveal-frame-uncommon.png
public/assets/capsule/reveal-frame-common.png
```

## PM Acceptance Red Lines

Do not accept a version if:

- project detail reads like a generic stats page
- stage color and displayed level disagree
- a high-token project shows an old `LVL 5` instead of its real 50-level value
- cabinet controls are covered by code-drawn rectangles
- Stage 5 crown/wings are clipped
- Uncommon reveal/card assets look transparent or not green
- prize-wall items do not explain what they are on hover
- pull interaction lacks a satisfying lever movement
- visual upgrades feel like small pasted stickers instead of richer machines

## Current Product Bias

When choosing between complexity and focus:

```text
Prefer a simpler game loop with better feedback.
```

The product should not become a management sim yet. The first lovable version is a tight token-to-arcade loop:

```text
tokens -> coins -> cabinet growth -> capsule pulls -> collection
```
