# Room Display Infrastructure Assets

These sprites are empty display infrastructure. Dynamic prizes and the buddy
must be rendered separately on top of them.

## Production Assets

| Purpose | Asset | Logical size |
| --- | --- | --- |
| Wall prize display | `/assets/collection/wall-display-board.png` | 198 x 248 |
| Floor trophy display | `/assets/collection/floor-display-riser.png` | 232 x 48 |
| Buddy display | `/assets/collection/buddy-rug.png` | 148 x 70 |

## Rendering Contract

- Draw each sprite at its native logical size with nearest-neighbor sampling.
- Draw the infrastructure first, then draw prizes or the buddy above it.
- Do not crop, tint, recolor, stretch, or add CSS/canvas-generated frames.
- The wall rails and floor riser are visual staging, not placement slots. Keep
  the existing magnetic placement behavior.
- Place the buddy rug underneath the buddy's feet; the character must not be
  baked into the rug.

## Editable Sources

Chroma-key originals and high-resolution alpha masters live in:

`assets/generated/p1c/display-infrastructure/`

The production PNGs have transparent backgrounds, transparent corners, and a
small safe margin so glow and outer pixel edges are not clipped.
