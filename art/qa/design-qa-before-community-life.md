# Token Town — asset polish QA (2026-09-30)

final result: blocked

## Findings

- **P1, open — complete house replacement is not accepted.** The user rejected the Kenney modular-house assembly because wall / roof alignment was visibly wrong. This is a genuine quality failure, not a stylistic preference to dismiss. Runtime routing for house / hall / bakery / cafe now restores the original complete prefabs. Failed assembled-house GLBs were removed and the asset script no longer generates them. Complete prebuilt houses from Quaternius Medieval Village Pack and KayKit Medieval Hexagon Pack are now presented as candidates; neither is claimed as integrated. The final house selection / replacement remains outstanding.
- **P1, closed for rollback — visibly broken building envelope.** `art/qa/town-polish-main.png` records the rejected assembled houses; `art/qa/town-restored-houses.png` is the actual post-rollback browser capture. The latter shows intact plaster walls, timber frame, porch, roof tiles and dormer. Reverting fixes the regression, but does not satisfy the requested replacement by itself.
- **P2, fixed — feet had no independent movement and residents overlapped.** Character-wide merging previously removed leg pivots. The character now retains four limb pivots, gait follows distance actually travelled, opposite directions have separate lanes, and walking candidates maintain 0.35-grid centre clearance. Blocked residents steer / back out at the same walking speed. Native observations after reload show changing positions and leg / arm poses, nearest pair 0.369 grid; no new console errors. This is not a claim of exhaustive traffic testing for every possible town.

## Source, implementation and comparison

- Source art direction: `art/qa/reference.jpg` (928×853 source capture), visible XHS video crop x260 / y64 / 408×464; original video rendering density is unknown. New external asset reference: `art/qa/kenney-reference.png` (918×515 author sample) was inspected, but its assembled-house approach failed and is not retained as the replacement direction.
- Actual implementation: http://127.0.0.1:4173/?demo=1, `art/qa/town-restored-houses.png` (740×853 CSS-pixel screenshot). Canvas 1480×1706 at pixel ratio 2. Existing demo town: 397 coins, chapter 2, day / medium quality. Latest capture yaw 65.3°, elevation 26°, zoom 3.1335, as operated during the session. The original reference has a developed town / side menu; this capture has an early town zoomed into its street. Exact composition / asset matching is not asserted.
- Full comparison opened together: `art/qa/polish-reference-vs-restored.png` (1200×600); each source / implementation is fitted into a 600×600 tile without stretching. Source raster and browser screenshot were normalized into these equal tiles. The visible restored house envelope is sound, but the intended new house direction is still outstanding.
- Focused evidence: `art/qa/curated-house-0.png` (1024×1024 Blender preview) exposed the failed assembly's duplicated gables; native post-rollback capture is already zoomed in enough to inspect timber, roof seams, paving and pedestrians. No claim that the Blender render alone verifies the game.
- Earlier QA / interaction history preserved at `art/qa/design-qa-before-asset-polish.md`.

## Required fidelity surfaces

- **Fonts / typography:** Existing Avenir Next / PingFang SC modern DOM typography retained; Chinese goals and controls stay readable in 740×853 viewport. Reference is compressed video, so exact typeface matching is not inferred.
- **Spacing / layout:** Header coins / sync, goal panel, bottom tools and camera controls remain visible. At this zoom the goal panel covers part of the left street; it is not an all-map composition. No phone-width pass claimed.
- **Colors / tokens:** Cream HUD, sage ground, clay / green / slate / ochre roofs remain coordinated. Kenney trees / props use a softened shared palette. Stone streets replace the yellow square tiles.
- **Image quality / assets:** Actual antialiased GLB / Three.js geometry, 2× backing resolution. Roads have individual varied stones, seams and exposed-edge curbs. River adds shallows, reeds, rocks, lilies and ducks; forest mixes conifers and round-canopy trees. Complete new houses remain the open P1 item. Original buildings are restored temporarily rather than described as an accepted external replacement.
- **Copy / content:** New decor uses ordinary Chinese names / prices and explicitly says pure decoration; no change to services or money rules. No technical asset/license jargon added to the ordinary game flow.

## Validation and limitations

- `npm run typecheck`: passed. `npm test`: 178 passed, 0 failed. Added meaningful checks for opposite lanes, clearance, stalled-resident passing at walking speed, limb pivots / distance-based gait, stone-road batching preserving logical layout, and six new decorations preserving paid instance identity through storage / reload without adding services.
- Full asset / client / legacy / preview / server build: passed. 97 original fallback GLBs; 17 retained Kenney CC0 derived prop / tree / park / market GLBs. Source and original license retained, license ships with public assets.
- Native browser after rollback: original intact houses visibly restored; current canvas reports about 57 FPS on this machine, 780 draw calls including shadows, 547266 triangles. These measurements do not promise performance on every laptop. No warning/error console entries after the checked reload.
- Existing demo balance remains 397 and the town layout is preserved. Original Blender GUI unsaved edits and all live / demo / legacy saves were preserved.
- Latest work did not repeat all older camera / puzzle / economy browser scenarios; their code remains covered by the full regression tests and prior browser evidence. Physical trackpad feel and long-run dense-town traffic remain hands-on test gaps.

## Next implementation step

Select a complete prebuilt house style, then import a small sample, inspect all sides, ground origin, proportions, door / road clearance and actual browser lighting before replacing town buildings. Do not resurrect the rejected modular-house exporter. Overall house polish is not signed off.
