# Design QA: Room Decoration Mode

Date: 2026-07-16

Reference: `assets/prototypes/room-decoration-mode-v1.png`

Status: PASS

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
