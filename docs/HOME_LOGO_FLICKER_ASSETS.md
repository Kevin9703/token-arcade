# Home Logo Flicker Assets

The home title sign should feel like a living arcade neon sign, not a static UI header. Keep the existing normal sign as the steady frame and add two short flicker frames.

## Assets

Normal frame, already used:

```text
public/assets/home-ui/logo-sign-v1-trimmed.png
```

New transparent flicker frames:

```text
public/assets/home-ui/logo-sign-flicker-dropout-v1.png
public/assets/home-ui/logo-sign-flicker-burst-v1.png
```

Source chroma images:

```text
assets/generated/home-ui/source/logo-sign-flicker-dropout-v1-chroma.png
assets/generated/home-ui/source/logo-sign-flicker-burst-v1-chroma.png
```

Review sheet:

```text
docs/home-ui-assets/logo-flicker-contact-sheet-v1.png
```

## PM Intent

- `dropout`: a quick underpowered frame. A few tubes and bulbs go low, but `TOKEN ARCADE` remains readable.
- `burst`: a quick over-bright frame. The sign pops brighter with extra sparkle.
- The sign should flicker occasionally, like a premium arcade sign with personality. It should not strobe constantly.

## Implementation Requirements For Claude

1. Register the two new assets in the asset store, for example `homeLogoDropout` and `homeLogoBurst`.
2. Draw all three logo frames into the exact same destination rect currently used for `homeLogo` in `RoomScreen.drawMarquee`.
3. Do not move, scale, or re-measure the logo during the flicker. The sign must not jump.
4. Do not redraw the logo with canvas text. Use the PNG frames.
5. Suggested timing:

```text
idle normal: 2800-4600ms
dropout: 45ms
normal: 60ms
dropout: 35ms
burst: 70ms
normal: back to idle
```

6. Add a small random offset to the idle duration so the flicker does not feel mechanical.
7. Avoid continuous flashing. The whole flicker burst should be under ~250ms and should not repeat more than once every ~2.5s.
8. If reduced-motion support exists or is added later, keep the normal frame only.

## Acceptance Criteria

- The home title reads `TOKEN ARCADE` clearly in every frame.
- The sign occasionally flickers without layout shift.
- The title never covers the tagline or coin bank.
- The animation feels like a neon arcade sign, not an error state.
