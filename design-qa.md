# Token Town — community models, resident life and seasons QA

final result: passed

## Service progress follow-up — 2026-09-30

- Progress counts unique residential beneficiaries, not purchased facilities. Added placed / connected / food / green totals, contextual goal hints, per-home missing-service diagnosis and clickable provider / home locations. Workshop buildings are explicitly excluded from residential counts.
- Corrected park feedback: an unconnected park no longer paints nearby homes green. Both park and home must have connected entrances; a shared helper uses the exact road / edge distances and allocations from `evaluate`. Park area cells and served / unmet home frames now appear above and outside building foundations.
- `service-progress-audit.png` verifies the native demo snapshot: 397 coins, chapter 2, five placed homes, four connected / fed homes, one green home. Its fifth home at horizontal 6 / vertical 23 reports an unconnected entrance. `park-service-coverage.png` verifies the park area in the town. This snapshot was read through the UI without purchases, layout edits, rewards or save resets; the automatic world clock continued normally.
- `npm run typecheck`, `npm test` (192 passed / 0 failed), and `npm run build` pass. New regression cases cover the eight / nine road-step boundary, six-home shop capacity and duplicate coverage, three / four park-edge distance, rotated disconnected entries, stored parks and insufficient housing feedback. Native browser logs contain no warnings / errors.

## Findings and comparison history

- **P1, fixed — shops shared the same cottage structure.** Earlier `art/qa/community-model-gallery.png` reused a cottage for grocer / florist. The user explicitly rejected this. `models.ts` now builds a squat brick-oven bakery, two-storey terrace cafe, low open hipped-roof grocer, masonry / glass florist, and broad reading shop. Distinct roof profiles, height, massing, openings and entrances are visible in `distinct-shops-front.png`; rear / side windows and structure are visible in `distinct-shops-back.png`. `shops-before-vs-after.png` opens the before and after together, with equal tiles and preserved aspect ratios. Sharing timber / window materials is intentional; sharing whole cottage structure is no longer used for these shops.
- **P1, closed by user direction — external house replacement.** The previous report was blocked after the broken Kenney modular assembly. It remains withdrawn. The user subsequently said “算了还是你自己来建模吧”, accepting our original house direction and asking for more types. The current work follows that instruction, rather than claiming an external house replacement was completed. Earlier report preserved at `art/qa/design-qa-before-community-life.md`, with older history at `design-qa-before-asset-polish.md`.
- **P2, fixed — twitching / accumulated crowds.** Per-frame evasive direction selection was replaced with a rounded, inset pavement circuit, distance gait and stable forward spacing. Entry / exit reservations prevent residents waiting on top of a passing lane. `crowd-before-vs-after.png` pairs the user's crowd screenshot with the actual current street. Twelve simulated minutes on four road topologies check every frame for clearance, bounded turning and continued movement. Two full sleep / wake cycles check clearance during both evening and morning. Native preview ran through both transitions without an accumulated crowd; latest nearest visible pair was 0.622 grid.
- **P2, fixed — bench seating height / straight legs.** Shared seat anchors use the real seat height and transformed building position. Sitting models have horizontal thighs, bent knees and lower legs below the seat. `seating-before-vs-after.png` pairs the user's misplaced sitting resident with a fresh browser-rendered close-up. `seating-after.png` verifies bench / park / gazebo together; rotated seat contact is covered by geometry tests.
- **P2, fixed — night HUD readability.** Brand / clock / mode copy become light on the dark scene, while cream panels retain their dark text. Blue night illumination, warm porch lights, snow and window light remain readable in `town-winter-night.png`.
- **P2, fixed — clock checkpoints caused a spurious save-conflict notice.** Only newer storage revisions are adopted. A progress fingerprint distinguishes clock / preference checkpoints from actual gameplay changes; clock-only updates no longer cancel pending placement. The regression test retains the existing cross-window economic conflict protection. The final native reload had no conflict notice and retained 397 coins / chapter 2 / original layout.

## Source and browser-rendered evidence

- Art direction source: `art/qa/reference.jpg`, 928×853, the supplied XHS page / video capture; video crop x260, y64, 408×464. The source video density is unknown. Original buildings are explicitly user-approved original 3D models, not a claim of copying those specific video assets.
- Issue sources: user attachments `codex-clipboard-5d589094-2005-4046-898e-ee6db70f349d.png` (206×292 crowd) and `codex-clipboard-66bcb1ae-fba1-40d9-baaf-67ebe74a46a6.png` (204×265 seating), supplied in this conversation.
- Actual main game: http://127.0.0.1:4173/?demo=1. `town-final.png`: 574×853 CSS-pixel viewport; canvas 1148×1706, pixel ratio 2. Existing demo, 397 coins, chapter 2, medium quality, yaw 37.9°, elevation 40°, zoom 1.45. Automatic time / seasons restored; final observation spring, 19.10 game hours, eight walkers and one seated resident.
- Full-view source comparison: `reference-vs-current-town.png`, 1200×600, source and actual autumn screenshot each fitted into 600×600 without stretching. This compares the quiet miniature landscape direction, not exact article/UI composition. The source depicts a later developed town; our screenshot preserves the user's early town.
- Focused comparisons: `shops-before-vs-after.png` 1280×380; `crowd-before-vs-after.png` 1000×400; `seating-before-vs-after.png` 800×340. Each pair uses equal contained tiles without distortion. Sitting after evidence comes from a closer orthographic camera (`seating-close-up.png`, 1280×760) instead of enlarging a tiny distant character. Native street and user crops have different zoom levels; precise pixel equality is not asserted.
- Original asset gallery: `distinct-shops-front.png` / `distinct-shops-back.png`, 1280×760 browser screenshots, actual meshes and shadows on a 1200×760 CSS canvas at pixel ratio 2. The source model is also exported into runtime GLBs. Footprints / pivots were tested; the gallery is additional model QA, not a substitute for checking the actual town.
- Time / season evidence: `town-autumn.png`, `town-summer.png`, `town-winter-night.png`, `town-doors-opening.png`. In the opening capture four doors report open=1 and four actors are leaving; subsequent native observation returns to eight walkers and one seated resident. Nighttime refresh starts all nine indoors with closed doors. Winter shader / snow, autumn leaves and summer green were checked in the actual game.
- Placement evidence: `new-grocer-placement.png`, actual new original model preview, invalid-road indication, R / cancel ribbon. Esc cancels without spending money. Existing pointer / drag / camera workflows remain covered by earlier native verification; this pass did not repeat every physical trackpad gesture.

## Required fidelity surfaces

- **Fonts / typography:** Avenir Next / PingFang SC modern DOM text, clear title / goal / action hierarchy, tabular clock digits. No pixel font. The source is compressed video, so no exact font match is claimed. Chinese clock, settings, prices and unlock text were readable and did not clip in the observed 574×853 main viewport.
- **Spacing / layout:** Header wallet / sync, small clock, goal card, bottom tool strip and camera controls remain on screen. Settings and catalog scroll while the town stays behind them. Clock wrapping and compact-width project-count hiding avoid header crowding. The actual 574px panel and 1280px QA gallery were observed; a fresh phone or full-width desktop pass was not performed.
- **Colors / tokens:** Cream / sage interface; clay, slate, green and timber models. Daylight and dusk use continuous interpolation; night has blue ambient color and local warm porch lighting. Seasons interpolate shared ground / foliage / roof uniforms, retaining timber / road colors. Summer green, gold autumn and snowy winter differ visibly; spring is lighter green. Reduced motion disables snow.
- **Image quality / assets:** Actual Three.js / GLB geometry, rounded edges, tiled roofs, windows and coherent scales. No scene raster, CSS house imitation, scene pixel filter or depth-of-field blur. New shops retain independent structures on all sides. Original model source follows the user's explicit modeling choice; background Kenney trees / props retain CC0 provenance. `door-hinge` survives material batching and was independently found as a movingPart node in exported `house-0.glb`.
- **Copy / content:** Plain Chinese names / costs / unlock chapters. Resource-themed greenhouse / granary / boathouse are explicitly decorations, without inventing a production economy. Time settings explain six-minute days, three-day seasons, sleeping and pausing while away. Technical modeling / shader language stays out of normal player controls.

## Verification

- `npm run typecheck`: passed, including final QA gallery change.
- `npm test`: 187 passed, zero failed. Includes existing economy / inventory / six chapters / six puzzles plus long-run traffic, rotated seats / doors, new shop footprints / services, save migration, time / season progression, sleep / wake reservation and clock-only cross-window checkpoints.
- `npm run build`: passed after gameplay / model / clock changes. 121 original GLBs exported; existing legacy client / preview / local server built. Final standalone QA gallery was separately bundled.
- Native main game: day → night → sleep → morning → walking / seated; nighttime reload; winter / autumn / summer / automatic spring; new shop preview / cancel; settings / clock persistence. All nine residents slept; all nine returned to daytime activity. No console warnings / errors after final checked reload.
- Observed medium-quality preview 57–60 FPS; final 59 FPS, 926 draw calls including shadows, 570876 triangles at 2× backing density on this machine. This does not certify every laptop or every large-town layout.
- Existing live / demo / legacy money and inventory were preserved. No new real sync or purchase was performed. Demo remains 397 coins. User-owned Blender unsaved GUI edits and untracked `.claude` files were preserved.

## Implementation checklist

- [x] Separate shop architecture and side / rear detail.
- [x] Six additional community / resource buildings with permanent inventory rules.
- [x] Stable walking, seated contact, no long-run crowd or jitter in tested layouts.
- [x] Continuous time, four seasons, nighttime home entry / door animation and morning exit.
- [x] Clock / setting migration and economic isolation.
- [x] Browser-rendered evidence, comparisons, tests, full build and console check.

## Follow-up polish / limitations

- P3: Dedicated windmill / leaf-fall animation and further roof / yard variety could deepen the scene.
- Physical touchpad feel, phone widths and arbitrary dense-plaza traffic remain manual test gaps; no known actionable P0/P1/P2 issue was found in the tested town and fixtures.
