# Collectible Generated Assets

Date: 2026-07-09

This document defines the new generated collectible and currency icon assets.

The old code-drawn collectible sprites are too rough for the current visual bar. The first complete version should use richer generated pixel-art icons for the prize wall, reveal card, shop cards, achievements, and tooltips.

## Asset Paths

Transparent full sheets:

```text
public/assets/collectibles/sheets/currency-icons-v1.png
public/assets/collectibles/sheets/common-icons-v1.png
public/assets/collectibles/sheets/uncommon-icons-v1.png
public/assets/collectibles/sheets/rare-icons-v1.png
public/assets/collectibles/sheets/epic-icons-v1.png
public/assets/collectibles/sheets/legendary-icons-v1.png
```

Direct-use individual icons:

```text
public/assets/collectibles/items/
```

Source chroma-key images:

```text
assets/generated/collectibles/source/
```

Review contact sheet:

```text
docs/collectible-assets/collectible-items-contact-sheet-v1.png
```

## Currency Icons

Use these for currency counters and reward summaries:

| File | Use |
| --- | --- |
| `currency_coin.png` | main spendable coin |
| `currency_token_chip.png` | lifetime/new token counter |
| `currency_ticket.png` | ticket currency, only if tickets remain visible |
| `currency_dust.png` | duplicate dust/shards, only if dust has a use |

Important:

- If tickets or dust do not have a meaningful spend/use, hide those currencies from the main UI even though icons exist.
- `currency_coin.png` should replace rough procedural coin art where a static icon is acceptable.
- Coin animation can still use code if needed, but the static counter/reward icon should use this asset.

## Collectible Item Mapping

Each current collectible now has an individual transparent PNG.

### Common

| id | asset |
| --- | --- |
| `c_smiley` | `public/assets/collectibles/items/c_smiley.png` |
| `c_token` | `public/assets/collectibles/items/c_token.png` |
| `c_heart` | `public/assets/collectibles/items/c_heart.png` |
| `c_gg` | `public/assets/collectibles/items/c_gg.png` |
| `c_mug` | `public/assets/collectibles/items/c_mug.png` |
| `c_sprout` | `public/assets/collectibles/items/c_sprout.png` |

### Uncommon

| id | asset |
| --- | --- |
| `u_star` | `public/assets/collectibles/items/u_star.png` |
| `u_luckycoin` | `public/assets/collectibles/items/u_luckycoin.png` |
| `u_shelf` | `public/assets/collectibles/items/u_shelf.png` |
| `u_1up` | `public/assets/collectibles/items/u_1up.png` |
| `u_gemc` | `public/assets/collectibles/items/u_gemc.png` |

### Rare

| id | asset |
| --- | --- |
| `r_cat` | `public/assets/collectibles/items/r_cat.png` |
| `r_palm` | `public/assets/collectibles/items/r_palm.png` |
| `r_gameover` | `public/assets/collectibles/items/r_gameover.png` |
| `r_stool` | `public/assets/collectibles/items/r_stool.png` |
| `r_rug` | `public/assets/collectibles/items/r_rug.png` |
| `r_frame` | `public/assets/collectibles/items/r_frame.png` |

### Epic

| id | asset |
| --- | --- |
| `e_rainbowcat` | `public/assets/collectibles/items/e_rainbowcat.png` |
| `e_astro` | `public/assets/collectibles/items/e_astro.png` |
| `e_minicab` | `public/assets/collectibles/items/e_minicab.png` |
| `e_trophy` | `public/assets/collectibles/items/e_trophy.png` |
| `e_sunset` | `public/assets/collectibles/items/e_sunset.png` |
| `e_gemu` | `public/assets/collectibles/items/e_gemu.png` |

### Legendary

| id | asset |
| --- | --- |
| `l_crown` | `public/assets/collectibles/items/l_crown.png` |
| `l_trophy` | `public/assets/collectibles/items/l_trophy.png` |
| `l_egg` | `public/assets/collectibles/items/l_egg.png` |
| `l_forest` | `public/assets/collectibles/items/l_forest.png` |

## Implementation Guidance

Recommended:

- Add image assets for collectible icons instead of drawing them from the character-map sprite atlas.
- Keep `Collectible.sprite` or add a new `asset` field. Choose the smaller engineering change.
- Existing code-rendered names, rarity labels, descriptions, and duplicate counts should stay dynamic.
- Draw each icon centered in its prize-wall slot, reveal card, tooltip, and shop card.
- Preserve fallback to current code sprites if an image fails to load.

Do not:

- Use these icons as backgrounds for text.
- Bake item names into icons.
- Recolor these icons with code.
- Stretch icons non-uniformly.

## Asset Quality Notes

This is a v1 generated icon pass. It is much closer to the target than the current rough sprite atlas, but still should be visually reviewed after integration.

Acceptance after integration:

- Each item is recognizable at display-cabinet size.
- Reveal card item art feels rewarding, not tiny or blurry.
- Prize wall slots feel like actual collectible objects.
- Tooltip names/descriptions still match the icon.
- Duplicate count badges do not cover the icon's main silhouette.

## Claude Code Prompt

Please replace the rough code-drawn collectible item art with the generated collectible assets.

Read first:

```text
docs/PM_PRODUCT_NORTH_STAR.md
docs/COLLECTIBLE_GENERATED_ASSETS.md
docs/MVP_GAMEPLAY_ECONOMY_AUDIT.md
docs/CAPSULE_GENERATED_ASSETS.md
```

Use direct-use icons from:

```text
public/assets/collectibles/items/
```

Required:

1. Load generated collectible icons as image assets.
2. Map every existing collectible id to its matching PNG listed in this document.
3. Use generated icons in:
   - capsule reveal card
   - prize/display cabinet slots
   - owned-item tooltip if an icon is shown
   - shop cards when the item type has a representative icon
   - achievement cards where applicable
4. Use generated currency icons for coin/token/ticket/dust counters where static icons make sense.
5. Keep all item names, rarity labels, descriptions, counts, and prices code-rendered.
6. Keep a fallback to existing code sprites if image loading fails.
7. Do not recolor or repaint generated icons in code.
8. Hide ticket/dust counters if those currencies still have no use after the economy pass.

Validation:

- Open capsule room.
- Pull several times.
- Confirm reveal card uses the generated icon.
- Confirm prize wall uses generated icons.
- Hover owned item and confirm tooltip still matches the item.
- Confirm duplicate count badge is visible but not covering the icon.
