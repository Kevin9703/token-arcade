# Project Level System

Date: 2026-07-08

This document defines what project cabinet levels are for.

Token Arcade should not treat project level as a decorative number beside token totals. A project level is the long-term proof that the user has kept feeding tokens into that project. More tokens should make the project's cabinet feel more powerful, more valuable, and more fun to revisit.

## Product Goal

When the user clicks into a project, the feeling should be:

```text
This project has its own machine.
I have spent tokens here.
The machine has grown because of that.
If I keep working on this project, it will become flashier and mint slightly better rewards.
```

Project levels exist for three reasons:

1. Visual evolution: the project cabinet becomes more impressive over time.
2. Reward momentum: higher-level cabinets mint a small coin bonus from future token gains.
3. Collection identity: high-level projects feel like prized machines in the arcade.

The system must still obey the main product rule:

```text
Token usage is the only gameplay input.
```

Do not use commits, tests, docs, PRs, file edits, or productivity-quality metrics.

## Level Count

The current max level of 5 is too small.

For the first complete version, projects should support:

```text
50 numeric levels
5 visual stages
```

This gives the user frequent progression while keeping the visual system simple.

Numeric levels are for progress, reward bonus, and the project detail stats.

Visual stages are for whole-cabinet growth, glow intensity, and home-screen readability. The project should feel like it is upgrading from a simple machine into a trophy arcade cabinet, not just receiving a small sticker.

## Visual Stages

Use the new large cabinet stage sheet as the primary project-detail stage language.

| Stage | Levels | Name | Cabinet Read | Feeling |
| --- | ---: | --- | --- | --- |
| 1 | 1-4 | Starter Cabinet | white-silver machine, 1 top-slot light | A newly powered project machine, simple and clean |
| 2 | 5-9 | Powered Cabinet | blue machine, 2 top-slot lights | Stable, brighter, clearly active |
| 3 | 10-19 | Deluxe Cabinet | magenta machine, 3 top-slot lights, crown-like top | The project has become a real attraction |
| 4 | 20-34 | Neon Cabinet | purple machine, 4 top-slot lights, large jewel top | High-investment project, strong arcade glow |
| 5 | 35-50 | Legendary Cabinet | amber-gold trophy machine, 5 top-slot lights, huge crown | A trophy machine, the pride of the room |

Primary project-detail asset paths:

```text
public/assets/project-detail/cabinet-stage-1.png
public/assets/project-detail/cabinet-stage-2.png
public/assets/project-detail/cabinet-stage-3.png
public/assets/project-detail/cabinet-stage-4.png
public/assets/project-detail/cabinet-stage-5.png
```

Important:

- The project detail page must choose the large pre-cropped cabinet image by level stage.
- The home screen left-side project cabinets must also communicate the same level stage.
- Do not keep home cabinet color as only a random project-id skin if that makes level unreadable.
- Stable project identity can still come from project name, monitor scene, small decals, and icon details.
- Level stage color is the primary growth signal.
- Do not implement the project-detail cabinet as an old base cabinet plus a tiny pasted crown. The crown/top structure should be part of the cabinet silhouette.

## New Level UI Kit Asset

Use these generated transparent sprite sheets for level-stage polish.

Home cabinet stage sheet:

```text
assets/generated/level-system/home-level-cabinets-v5-redrawn.png
public/assets/level-system/home-level-cabinets.png
```

Source image:

```text
assets/generated/level-system/source/home-level-cabinets-v5-redrawn-chroma.png
```

Use it for:

- home-screen left-side project cabinet sprites
- small cabinet previews
- first-read level color language

The sheet contains five cabinets in one horizontal row, matching the five stage colors:

1. Starter / white-silver
2. Powered / blue
3. Deluxe / magenta
4. Neon / purple
5. Legendary / amber-gold

Project-detail large cabinet stage assets:

```text
public/assets/project-detail/cabinet-stage-1.png
public/assets/project-detail/cabinet-stage-2.png
public/assets/project-detail/cabinet-stage-3.png
public/assets/project-detail/cabinet-stage-4.png
public/assets/project-detail/cabinet-stage-5.png
```

Use it for:

- the selected large cabinet on the project detail page
- level-stage cabinet growth from Starter to Legendary
- the main visual proof that project tokens became a richer machine

Do not crop the full sheet at runtime, and do not use the older topper/badge/endcap UI kit as the primary upgrade layer for the large project-detail cabinet. That path made the crown read like a sticker. The large cabinet should be selected as a whole stage machine.

Level ornament UI kit:

```text
assets/generated/level-system/project-level-ui-kit-v6-counted-lights.png
public/assets/level-system/project-level-ui-kit.png
```

Source image:

```text
assets/generated/level-system/source/project-level-ui-kit-v6-counted-lights-chroma.png
```

The sheet contains five columns, one for each visual stage:

1. Starter / white-silver
2. Powered / blue-cyan
3. Deluxe / magenta-pink
4. Neon / royal purple
5. Legendary / amber-gold

Stage-light rule:

- The front lower light strip on each topper must show a countable stage signal.
- Stage 1 has exactly 1 front-strip bulb.
- Stage 2 has exactly 2 front-strip bulbs.
- Stage 3 has exactly 3 front-strip bulbs.
- Stage 4 has exactly 4 front-strip bulbs.
- Stage 5 has exactly 5 front-strip bulbs.
- The progress-meter endcap row should echo the same 1-5 light count.
- Decorative crown gems above the front strip are allowed and should keep the arcade luxury feeling, but they should not be treated as the countable stage-light signal.

Use it for:

- small stage badge on home cabinet rows
- progress-meter endcaps
- level-up sparkles
- max-level shine
- achievement showcase and reward-wall decorations
- hover/tooltips or small UI accents where a badge-sized asset makes sense

For project-detail cabinet usage, also see:

```text
docs/PROJECT_CABINET_ORNAMENT_PLACEMENT.md
public/assets/project-detail/cabinet-stage-1.png
public/assets/project-detail/cabinet-stage-5.png
```

Implementation note:

These replacement sheets have new dimensions and new crop positions. Re-measure the alpha bounds and update any sprite-sheet crop constants instead of reusing the older v1/v2 crop rectangles.

Reference measured bounds from the current transparent PNGs:

Home cabinet sheet `public/assets/level-system/home-level-cabinets.png`, size `1774x887`:

| Stage | Crop `{ sx, sy, sw, sh }` |
| ---: | --- |
| 1 | `{ sx: 35, sy: 140, sw: 299, sh: 638 }` |
| 2 | `{ sx: 391, sy: 140, sw: 308, sh: 637 }` |
| 3 | `{ sx: 746, sy: 140, sw: 304, sh: 637 }` |
| 4 | `{ sx: 1079, sy: 101, sw: 336, sh: 677 }` |
| 5 | `{ sx: 1426, sy: 102, sw: 316, sh: 676 }` |

Level UI kit `public/assets/level-system/project-level-ui-kit.png`, size `1708x921`:

| Row | Meaning |
| ---: | --- |
| 0 | topper / marquee ornament |
| 1 | badge / sticker emblem |
| 2 | progress-meter endcap |
| 3 | level-up sparkle token |

Reference crops are measured per row and stage in that order. Claude Code can either reuse these or re-measure from alpha if it changes the sheets again.

| Row | Stage 1 | Stage 2 | Stage 3 | Stage 4 | Stage 5 |
| ---: | --- | --- | --- | --- | --- |
| 0 | `{ sx: 42, sy: 68, sw: 289, sh: 162 }` | `{ sx: 389, sy: 71, sw: 281, sh: 159 }` | `{ sx: 711, sy: 68, sw: 284, sh: 162 }` | `{ sx: 1036, sy: 46, sw: 330, sh: 184 }` | `{ sx: 1366, sy: 43, sw: 299, sh: 187 }` |
| 1 | `{ sx: 57, sy: 230, sw: 259, sh: 230 }` | `{ sx: 405, sy: 230, sw: 250, sh: 230 }` | `{ sx: 727, sy: 230, sw: 253, sh: 230 }` | `{ sx: 1053, sy: 230, sw: 268, sh: 230 }` | `{ sx: 1381, sy: 230, sw: 281, sh: 230 }` |
| 2 | `{ sx: 41, sy: 460, sw: 277, sh: 205 }` | `{ sx: 383, sy: 460, sw: 276, sh: 205 }` | `{ sx: 711, sy: 460, sw: 276, sh: 205 }` | `{ sx: 1036, sy: 460, sw: 286, sh: 205 }` | `{ sx: 1372, sy: 460, sw: 279, sh: 203 }` |
| 3 | `{ sx: 82, sy: 707, sw: 184, sh: 152 }` | `{ sx: 421, sy: 711, sw: 194, sh: 147 }` | `{ sx: 760, sy: 714, sw: 186, sh: 147 }` | `{ sx: 1078, sy: 713, sw: 185, sh: 149 }` | `{ sx: 1419, sy: 713, sw: 183, sh: 145 }` |

Do not use it as a replacement for dynamic text. Level number, project name, token totals, progress, and coin values must stay code-rendered.

## Level Curve

The level curve should satisfy these product constraints:

- Early levels should arrive quickly so a new project becomes alive after a small amount of usage.
- Mid levels should feel earned, not automatic.
- Late levels should be aspirational for long-running projects.
- Existing large-token projects should not all collapse into the same stage unless they are truly huge.

Recommended stage thresholds:

| Stage | Level Range | Approx Token Range |
| --- | ---: | ---: |
| Starter | 1-4 | 0 to 99,999 |
| Powered | 5-9 | 100,000 to 999,999 |
| Deluxe | 10-19 | 1,000,000 to 9,999,999 |
| Neon | 20-34 | 10,000,000 to 49,999,999 |
| Legendary | 35-50 | 50,000,000+ |

The exact per-level thresholds can be generated from a smooth curve, but the stage boundaries above should remain true.

At or above the final threshold, the project is level 50 and shows max-level treatment.

## Reward Bonus

Level should have a small economic purpose, but it must not overpower the basic token-to-coin loop.

Base rule stays:

```text
1,000 tokens = 1 coin
```

Project level adds a small bonus to coins minted from future newly discovered tokens for that project:

```text
coin multiplier = 1.00x at level 1
coin multiplier = about 1.50x at level 50
```

Suggested examples:

| Level | Multiplier |
| ---: | ---: |
| 1 | 1.00x |
| 5 | 1.04x |
| 10 | 1.09x |
| 20 | 1.19x |
| 35 | 1.34x |
| 50 | 1.50x |

Important:

- Bonus comes only from token-derived project level.
- Do not retroactively mint old coins every time the multiplier changes.
- Repeated syncs with unchanged token totals must still mint 0 new coins.
- The user should understand this as "higher-level cabinets mint coins a little better", not as a complicated finance system.

## Home Screen Requirements

The left cabinet list should stop reading as a generic list of projects.

Each project row should show:

- project cabinet with stage color
- project name
- numeric level, for example `LV 17`
- stage badge or small stage ornament
- token total
- coins minted
- next-level progress

Home cabinet visual requirements:

- Lv 1-4 cabinets should be simpler and dimmer.
- Lv 5-9 cabinets should visibly light up.
- Lv 10-19 cabinets should gain stronger trim and topper treatment.
- Lv 20-34 cabinets should glow more aggressively.
- Lv 35-50 cabinets should feel like a trophy cabinet.
- Prefer `home-level-cabinets.png` for the cabinet body if it integrates cleanly.
- If keeping the older `cabinet-skins.png`, the cabinet color/stage must still visibly match the project's level stage.

The home row does not need a giant explanation. The cabinet itself should tell the story.

## Project Detail Requirements

The project detail page should make level feel meaningful.

Add or improve:

- large cabinet variant chosen by level stage
- large `LV` number near the cabinet
- stage name, for example `NEON CABINET`
- token power meter
- next-level preview unless max level
- coin multiplier line, for example `COIN POWER 1.19x`
- level-up hint when progress is above 80%

At max level:

- Show `MAX LEVEL`
- Use the legendary cabinet treatment
- Replace next-level preview with a max-level shine or trophy plate

## Level-Up Moment

When a sync pushes a project across one or more levels:

- show a short level-up toast
- pulse that project's cabinet on the home screen
- if the user is on the project detail page, flash the stage badge / topper
- if the project enters a new visual stage, make the color change obvious

Copy direction:

```text
<PROJECT> CABINET POWERED UP
LV 18 -> LV 19
```

For a stage promotion:

```text
<PROJECT> BECAME A NEON CABINET
```

Keep this fun and compact. Do not open a modal.

## Non-Goals

Do not add:

- quests
- leaderboards
- manual grinding
- commit/test/doc scoring
- transcript scoring
- productivity judgments
- complex skill trees
- cabinet equipment stats

This is a small growth layer, not a second game.

## Acceptance Criteria

This pass is done when:

- Projects support 50 numeric levels.
- There are 5 visual stages.
- Home screen cabinet color/stage matches project level.
- Project detail cabinet variant matches project level.
- Higher levels give a small future coin multiplier.
- Sync still avoids double-counting unchanged token totals.
- Max level is clearly represented and no longer appears at level 5.
- The user can understand why upgrading a project matters without reading this document.

The intended feeling:

```text
More tokens make this project cabinet bigger, brighter, and slightly better at minting coins.
```
