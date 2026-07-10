# Project Cabinet Stage Sheet

Use these transparent single-cabinet files for the large project-detail cabinet stage art:

```text
public/assets/project-detail/cabinet-stage-1.png
public/assets/project-detail/cabinet-stage-2.png
public/assets/project-detail/cabinet-stage-3.png
public/assets/project-detail/cabinet-stage-4.png
public/assets/project-detail/cabinet-stage-5.png
```

This replaces the earlier ornament-composition direction. Do not build the project-detail cabinet by pasting a small crown, badge, and endcap onto an older base cabinet. The selected project cabinet should be a whole upgraded machine.

The core fantasy is:

```text
More project tokens -> higher project level -> richer arcade cabinet.
```

The cabinet itself should show growth: more lights, brighter screen glow, larger top structure, richer trim, stronger base, and trophy-like side details.

## Stage Matching

| Stage | Levels | Cabinet Read |
| ---: | --- | --- |
| 1 | 1-4 | white-silver starter cabinet, clean metal frame, 1 stage light inside the top light slot |
| 2 | 5-9 | blue powered cabinet, brighter glow, 2 stage lights |
| 3 | 10-19 | magenta deluxe cabinet, crown-shaped top, more buttons and small trinkets, 3 stage lights |
| 4 | 20-34 | purple neon cabinet, large jewel top, side wings, 4 stage lights |
| 5 | 35-50 | amber legendary cabinet, huge integrated gold crown, trophy wings, ornate base, 5 stage lights |

## Implementation Direction

- Use the pre-cropped transparent `cabinet-stage-N.png` files as the source for the large project-detail cabinet stage art.
- Select the matching cabinet by project level stage.
- Do not crop the old full sheet at runtime. Stage 5's crown wings need the wider pre-cropped asset.
- Keep project name, `LV`, token totals, coin values, progress, and dynamic screen content code-rendered.
- Do not use the badge/topper/endcap UI kit as the main project-detail cabinet upgrade.
- The older badge/topper/endcap assets can still be used elsewhere: achievement showcase, reward wall, hover tooltips, rarity cards, or small decorative accents.

## Visual QA

The stage should be readable before looking at the text:

- Stage 1 is simple but clean, not green and not black.
- Stage 2 is obviously more powered than Stage 1.
- Stage 3 gains a real crown-like top structure.
- Stage 4 feels neon and premium.
- Stage 5 feels like a trophy cabinet, not just a gold recolor.

Do not regress to a small sticker-style crown on top of the cabinet. The crown/topper must feel structurally integrated into the machine.
