# Shop Capsule Generated Assets

The bottom shop rail capsule icons were still using the procedural `drawCapsuleIcon(...)` helper. That temporary icon is too flat for the current visual bar.

Use these generated transparent PNGs instead:

```text
public/assets/shop/items/shop_capsule_single.png
public/assets/shop/items/shop_capsule_bundle.png
```

Source chroma-key images:

```text
assets/generated/shop/source/shop-capsule-single-v1-chroma.png
assets/generated/shop/source/shop-capsule-bundle-v1-chroma.png
```

Review contact sheet:

```text
docs/shop-assets/shop-capsule-icons-contact-sheet-v1.png
```

## Mapping

```text
shop item pull1  -> shop_capsule_single.png
shop item pull10 -> shop_capsule_bundle.png
```

## Implementation Notes For Claude

- Stop using `drawCapsuleIcon(...)` for the bottom shop rail.
- Add these two PNGs to the asset loader.
- For `pull1`, draw `shop_capsule_single.png`.
- For `pull10`, draw `shop_capsule_bundle.png`.
- Fit the icon by visible alpha bounds inside the shop-card icon window.
- Keep a procedural fallback only while the image has not loaded.
- Do not recolor the PNGs.

The x10 bundle is visually wider than the single capsule, so it should be scaled by max height and centered optically rather than stretched to a square.
