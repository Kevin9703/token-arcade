# Capsule Visual QA Acceptance

Date: 2026-07-08

Scope: Claude Code's capsule / achievement display visual pass.

Reference brief:

- `docs/CAPSULE_GENERATED_ASSETS.md`
- `assets/prototypes/capsule-prize-wall.png`

Evidence was captured during the original browser review. The temporary
screenshot archive was intentionally removed during repository cleanup; the
written verdict below remains the retained record.

## Verdict

Pass, with polish notes.

This is a real improvement over the previous capsule page. The page now reads as a reward room instead of a flat rarity table. The empty background, separate premium capsule machine, separate achievement cabinet, and rarity reveal frames are all being used correctly.

This should be accepted as the current capsule visual baseline.

## What Works

- The background no longer contains a baked-in capsule machine or display cabinet, so the foreground assets do not fight the room art.
- The capsule machine feels physical and tempting enough to be the main action.
- The right side reads as a lit achievement cabinet, not a spreadsheet-like rarity table.
- Pull buttons are no longer competing with a giant `INSERT COIN` label.
- The reveal card uses rarity frames and feels much closer to a prize moment.
- A newly pulled collectible appears in the cabinet during the reveal, which supports the core fantasy: spend coins, get a visible prize.
- Text and counters remain code-rendered and readable.

## Remaining Polish Notes

### 1. Pull Buttons Still Feel Like UI Buttons

The `PULL X1` and `PULL X10` controls are readable and functional, but they still feel like floating UI buttons placed in front of the room.

Next polish direction:

- Make them feel like a physical button deck, ticket counter, or machine base control.
- Keep the same hit areas and labels.
- Do not add more explanatory text.

### 2. Reveal Card Could Use A Stronger Exit / Placement Moment

The reveal card appears well, but the transition into the cabinet is mostly instantaneous. The prize is visible in the cabinet, but the user does not yet feel a strong "it landed there" moment.

Next polish direction:

- Add a short sparkle trail, glow pulse, or shelf flash at the destination slot.
- Keep it simple; do not add a complex animation system.

### 3. Cabinet Rarity Plaques Are Small

The small rarity plaques are the right direction because they avoid table headers. At the current viewport they are readable enough, but they may become fragile on smaller screens.

Next polish direction:

- Slightly increase plaque contrast or size.
- Avoid returning to large section headers.

### 4. Achievement Toast Competes Mildly With The Cabinet Top

The achievement toast is not blocking gameplay, but it sits in the upper center-right and can compete with the cabinet top lighting.

Next polish direction:

- Move achievement toasts a little lower or farther into the empty center wall gap.
- Keep them away from the currency counters and the reveal card.

## Verification

Commands run:

```text
npm run typecheck
npm test
npm run build
node scripts/verify.mjs
```

Results:

- `npm run typecheck`: pass.
- `npm test`: pass, 80 tests.
- `npm run build`: pass.
- `node scripts/verify.mjs`: pass after running outside the sandbox, including app boot, sync, capsule pull, persistence, and zero console/page errors.

## Acceptance Criteria Check

- Reward room feeling: pass.
- Premium capsule machine: pass.
- Achievement cabinet, not table: pass.
- Empty locked slots still desirable: pass.
- Rarity-specific reveal energy: pass.
- Dynamic text remains code-rendered: pass.
- No new gameplay scope added: pass.

## PM Note

This pass is good enough to keep moving.

The next design focus should not be "replace more assets." It should be micro-reward feel:

```text
press pull -> machine reacts -> card pops -> cabinet slot lights up
```

That sequence is the heart of Token Arcade's coin sink.

## Next Product Request: Collectible Hover Cards

The achievement cabinet now looks collectible, but the items do not explain themselves. Hovering an owned item should show a compact tooltip/card with:

- item name
- rarity
- type
- short flavor description
- duplicate count when `count > 1`

Locked slots should not reveal the exact item name. For locked slots, show:

```text
Locked Prize
Keep pulling capsules to discover this slot.
```

Tooltip direction:

- Keep it small and game-like, not a SaaS tooltip.
- Position near the hovered slot, but clamp inside the canvas.
- Use the item's rarity color for border/glow.
- Do not block the pull buttons.
- Do not add a click requirement; hover is enough on desktop.
- On touch/mobile, tapping an owned item can show the same card briefly.

Implementation scope:

- Add a `description` field to each collectible.
- Preserve existing ids, rarities, sprites, and gameplay behavior.
- Use current cabinet slot hit areas for hover detection.
- No new economy, no new collection categories.

### Collectible Names And Descriptions

Use these names and descriptions as the next content pass. They are written to fit a small game tooltip.

| id | rarity | type | name | description |
| --- | --- | --- | --- | --- |
| `c_smiley` | common | badge | Smiley Chip | A tiny grin soldered onto the day. It still believes the build will pass. |
| `c_token` | common | badge | Token Chip | One bright coin-shaped thought, rescued from the model stream. |
| `c_heart` | common | badge | Pixel Heart | Beats at 30 FPS. Somehow still sincere. |
| `c_gg` | common | sign | GG Banner | Hung after small wins, large wins, and suspiciously lucky fixes. |
| `c_mug` | common | decor | Arcade Mug | Contains coffee, tea, or the remains of one more late-night idea. |
| `c_sprout` | common | decor | Little Sprout | Grew from leftover tokens. Needs light, water, and fewer tabs. |
| `u_star` | uncommon | badge | Debug Star | Awarded for finding the problem five minutes after complaining about it. |
| `u_luckycoin` | uncommon | badge | Lucky Coin | Flip it before a risky prompt. It always lands on "ship it." |
| `u_shelf` | uncommon | decor | Code Shelf | Stores tiny manuals for systems nobody fully remembers. |
| `u_1up` | uncommon | sign | 1UP Flag | Grants emotional recovery after deleting the wrong line. |
| `u_gemc` | uncommon | badge | Cyan Cache Gem | A cool little shard of context that survived compression. |
| `r_cat` | rare | buddy | Waving Desk Cat | Waves at every fresh idea like it personally funded the sprint. |
| `r_palm` | rare | decor | Focus Palm | Makes any corner feel 12 percent more like deep work. |
| `r_gameover` | rare | sign | Game Over Sign | A dramatic sign for bugs that were already fixed ten minutes ago. |
| `r_stool` | rare | decor | Cabinet Stool | Perfect height for staring at a loading spinner with dignity. |
| `r_rug` | rare | decor | Star Rug | Marks the exact place where good pulls and bad estimates happen. |
| `r_frame` | rare | frame | Cyan Profile Frame | Adds a clean neon edge to your arcade legend. |
| `e_rainbowcat` | epic | buddy | Rainbow Arcade Cat | Appears when the code works and nobody knows why. |
| `e_astro` | epic | buddy | Space Ranger | Patrols the outer orbit of unfinished side quests. |
| `e_minicab` | epic | decor | Mini Cabinet | A cabinet for your cabinet. Very efficient, very unnecessary. |
| `e_trophy` | epic | trophy | Gold Trophy | Proof that spending tokens can, occasionally, become glory. |
| `e_sunset` | epic | theme | Sunset Room Theme | Turns the arcade golden enough to forgive one more refactor. |
| `e_gemu` | epic | badge | Amethyst Cache Gem | A rare purple chunk of context, still humming with remembered intent. |
| `l_crown` | legendary | badge | Neon Crown | For the player who turned pure model heat into arcade royalty. |
| `l_trophy` | legendary | trophy | Champion Trophy | Heavy, shiny, and almost certainly paid for in tokens. |
| `l_egg` | legendary | buddy | Dragon Egg | Warm to the touch. Do not ask what it was trained on. |
| `l_forest` | legendary | theme | Forest Room Theme | A quiet grove grown from a suspicious amount of computation. |

## Next Product Request: Pull Lever Animation

The pull button currently spends coins and triggers the reveal, but the machine's lever should visibly move.

Desired interaction:

```text
click pull -> lever snaps down -> machine shakes -> glow burst -> reveal card pops
```

Animation feel:

- The right-side lever knob should move downward when `PULL X1` or `PULL X10` is clicked.
- Motion should be quick and tactile: down in about `100-150ms`, brief hold, spring back in about `180-240ms`.
- Add a small bounce on return.
- The machine shake should start after or during the lever-down moment, not before it.
- `PULL X10` should use one stronger lever pull, not ten repeated lever animations.
- If the user does not have enough coins, do not pull the lever. Show the current not-enough feedback instead.

Acceptance:

- A user can visually connect the button click to the physical machine.
- The lever movement is visible but not distracting.
- The reveal timing still feels fast.
- No new gameplay systems are introduced.
