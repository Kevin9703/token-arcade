# Design QA: Room Decoration Mode

Date: 2026-07-16

Reference: `assets/prototypes/room-decoration-mode-v1.png`

Status: CONDITIONAL PASS

## Visual Review

- The prize cabinet no longer carries the unrelated cyan/magenta shelf bar.
- The 10-prize neon shelf now physically supports the wall-display zone.
- The 40-prize collector pedestal now belongs to the floor-display zone.
- Normal Home keeps decoration guides hidden; edit-only guides cannot read as permanent UI.
- The inventory is a low physical control bench, with no clipped or borrowed reward slots.
- Wall, floor, and buddy displays stay clear of cabinets, the coin bank, player, and prize wall.
- English and Simplified Chinese labels fit the title, filters, notices, and action buttons.

## Interaction Review

- Dragging from inventory to a compatible zone places a prize.
- Dragging a placed prize moves it freely inside its zone with quiet magnetic alignment.
- Incompatible drops are rejected, explained, and leave the previous position intact.
- Dragging a placed prize back to the inventory removes it from the room.
- Auto Arrange, Reset, Save, and Close all work after a drag gesture.
- Saved custom layouts persist; automatic mode continues to follow the newest prize per family.

## Intentional Deviation From The Mock

The mock shows hard glowing sockets. The implementation uses broad magnetic scenery zones instead. This is intentional: the player controls the composition, while the game only protects functional machinery and keeps edges aligned. Guides appear only during editing.

## Verification

- Browser viewport: 1280 x 720, Home and Decorate Mode.
- Browser-tested: valid drag, invalid drag, auto-arrange, reset, save, close, and language switch.
- `npm run typecheck`: pass.
- `npm test`: 142 tests pass.
- `npm run build`: pass.

## Re-Audit: 2026-07-20

Viewport: 1600 x 1000. Reviewed Home, Decorate Mode, inventory selection,
click-to-place, drag-to-place, incompatible drops, Auto Arrange, and the
unsaved-changes close flow.

### Passed

- Decorate Mode now reads as a real editing state rather than loose controls on
  top of Home. Zone outlines, capacity counters, the inventory bench, filters,
  paging, and actions form one understandable workflow.
- Click placement and drag placement both work. Compatible drops land cleanly;
  incompatible drops preserve the current layout and explain the rejection.
- Inventory tiles distinguish placed prizes, selected prizes, and available
  prizes. The Home entry badge exposes that there are prizes still available to
  place.
- Auto Arrange gives immediate confirmation. Unsaved changes produce a clear,
  high-contrast warning before a normal single-click close can discard them.

### Blocking Interaction Issue

- Rapidly activating `CLOSE` twice can close the editor on the first activation
  and send the second activation to the Home shop card occupying the same screen
  coordinates. This was reproduced with the 3,000-coin Trophy Card purchase.
- Acceptance criterion: closing or discarding Decorate Mode must consume the
  active pointer sequence and temporarily suppress Home hotspots until the
  pointer is released. A rapid second activation must never spend coins or
  trigger any Home command.

### Remaining Visual/Product Issues

- The editor is substantially better than the resting Home composition. Outside
  edit mode, wall prizes still float in a bare rectangle and floor prizes read as
  separate objects placed near each other, not a deliberately staged display.
- The Home `DECOR` entry sits in leftover floor space between the player and Prize
  Wall. It is functional, but it does not yet feel physically integrated into
  the arcade scene.
- The badge says how many prizes are available to place, but the editor opens on
  a mixed `ALL` inventory. Add an `UNPLACED` filter or open on unplaced prizes
  when the badge is non-zero so the promised task is immediately visible.
- At reduced browser widths the fixed canvas scales the entire editor down;
  helper text, filters, and counters become too small before the layout changes.

### Accessibility Risk

- The browser accessibility tree exposes the app as one generic canvas instead
  of named controls. The visual editor can be reviewed with a mouse, but keyboard
  operation and screen-reader access are not currently available.
