# P1 Cosmetic Art Direction

Date: 2026-07-10

This document locks the visual contract between the existing collectible art
and the P1 customization experience. An equipped cosmetic must look like the
collectible the player earned. Do not create a generic "nice background" or a
generic colored UI border.

## Source-Of-Truth Mapping

| Cosmetic | Existing collectible asset | Visual DNA that must carry into the equipped state |
| --- | --- | --- |
| Sunset Room Theme | `public/assets/collectibles/items/e_sunset.png` | Purple/magenta vaporwave dusk, large striped orange sun, black palm silhouettes, distant city skyline, reflective water/floor, gold-and-amethyst framing energy. |
| Forest Room Theme | `public/assets/collectibles/items/l_forest.png` | Deep emerald forest arcade, glowing yellow-green fireflies, vine canopy, mossy stone path, central green arcade cabinet, premium gold-and-emerald legendary energy. |
| Cyan Profile Frame | `public/assets/collectibles/items/r_frame.png` | Dark blue metal chassis, electric cyan edge light, winged top diamond, lower diamond socket, four round blue corner bolts. |

## Background Invariants

Both equipped room backgrounds must preserve the base Home-room composition:

```text
left dark vertical zone      = cabinet-list UI remains readable
center foreground/floor      = coin bank and player remain readable
right structural zone        = prize wall remains readable
top center                   = Token Arcade marquee remains readable
```

The background never contains baked HUD, readable labels, a coin bank, a prize
wall foreground prop, or a player. Those stay live/state-driven layers.

## Sunset Room Theme

The background is a **Vaporwave Sunset Arcade**, not an orange recolor.

- Keep the same arcade-room architecture and perspective as the base room.
- The rear wall/window reveals a wide striped orange sun behind a purple-pink
  city skyline.
- Palm silhouettes belong around the rear and side edges, never in front of
  the left cabinet list or central coin bank.
- Floor reflections lean magenta, coral, and warm violet. Cyan remains only a
  supporting arcade accent.
- The mood is an Epic reward: glamorous, night-time, saturated, and polished.
- The equipped preview card may use a small crop of the same sunset scene so
  the player recognizes the object they earned.

## Forest Room Theme

The background is a **Legendary Forest Arcade**, not a dark arcade room with a
green filter.

- Keep the same arcade-room architecture and perspective as the base room.
- The rear opening becomes a moonlit forest clearing with a subtle mossy stone
  path and an unoccupied green arcade cabinet set far in the background.
- Vines and broad ferns frame the room at the ceiling and outer corners. They
  must not invade the left cabinet-list, coin-bank, prize-wall, or marquee
  safety zones.
- Yellow-green firefly pixels and emerald/cyan glow create the sense of rare
  living light. A few gold highlights reference the legendary collectible's
  gold frame.
- The mood is a quiet, magical trophy room: rarer and calmer than Sunset, not
  a bright cartoon jungle.

## Cyan Profile Frame

The existing frame art is the runtime source of truth. Do not redraw it or
replace it with a CSS/canvas outline.

- In the equipped Home player card, the frame encloses the portrait, with the
  winged diamond centered above the avatar and the lower diamond visibly below.
- The portrait must sit inside the dark interior window and never cover any of
  the bolts, wing tips, or cyan light rails.
- An equipped frame should be obvious before reading text: full frame art,
  a short cyan ignition pulse when equipped, then steady low glow.
- The customization card uses the same full asset, contain-fit inside its
  preview well. Never crop the wing tips or gems.

## Asset Naming

Generated P1 background assets must be saved as new versioned files:

```text
assets/generated/p1-customization/sunset-arcade-room-bg-v1.png
assets/generated/p1-customization/forest-arcade-room-bg-v1.png
```

They are full-scene backgrounds, not transparent cutouts. The current
`e_sunset`, `l_forest`, and `r_frame` collectible PNGs remain the item art.
