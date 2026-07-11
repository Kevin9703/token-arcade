# P1C Collection Assets

This is the runtime map for the 50-prize collection pass.

## Collectible Icons

- Runtime: `public/assets/collectibles/items/<collectible-id>.png`
- P1C generation sources: `assets/generated/p1c/items/*-chroma.png`
- Every P1C item is a separate generated bitmap. Runtime tinting is not used.

## Showcase Cabinet

- Runtime: `public/assets/capsule/display-50-v1.png`
- Source: `assets/generated/p1c/cabinet/display-50-v1-chroma.png`
- Geometry: five shelves with ten item niches each; the separate left rail does
  not consume a prize slot.
- Measured centers: `src/render/measured.ts`.

## Permanent Home Upgrades

- 10 unique: `public/assets/collection/neon-shelf.png`
- 25 unique: `public/assets/collection/prize-lights.png`
- 40 unique: `public/assets/collection/collector-pedestal.png`
- 50 unique: `public/assets/collection/crown-marquee.png`

Chroma-key generation sources live under `assets/generated/p1c/milestones/`.
Milestones are derived from valid unique ownership and require no new save field
or visible currency.
