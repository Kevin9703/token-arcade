# Token Town design QA

Final result: passed

## Comparison target and evidence

- Source visual truth: `art/qa/reference.jpg`, captured from the public video in https://xhslink.cn/o/2dgOLxz6G0u. The visible reference is a miniature voxel village with warm roofs, planted streets, a muted green / cream palette and an oblique camera. It is an art-direction reference, not a request to clone that product's interface, content or buildings.
- Implementation: http://127.0.0.1:4173/?demo=1; browser capture `art/qa/town-main.jpg`. Additional evidence: `art/qa/town-overview-final.jpg`, `art/qa/town-placement.jpg`, `art/qa/town-trackpad-placement.jpg`, `art/qa/blender-house-0.png`.
- State: independent demo town, 397 coins, chapter 2, day lighting, medium quality, 40° elevation and 37.9° yaw. Main capture has no panel / preview / toast obscuring the town. Existing town layout is preserved. The reference shows a developed village with a menu; this town is at an early development stage. Density and content differences are intentional.
- Source screenshot: 928 × 853 pixels; its video region is x260 / y64 / 408 × 464. The video's original rendering resolution and CSS dimensions are unknown; do not infer pixel-perfect font or asset matches from a compressed video.
- Final implementation screenshot: 655 × 853 pixels, CSS viewport 655 × 853; renderer backing canvas 1310 × 1706 with pixel ratio 2. Browser screenshots are normalized to CSS pixels. Earlier browser checks also used 928 × 853 and 965 × 853; the in-app panel's width changed during the session.
- Full-view comparison: `art/qa/reference-vs-town.jpg`, 1280 × 644. The source video crop and implementation are placed together in 640 × 600 tiles, retaining their aspect ratios, with a 44-pixel caption. No stretching or browser chrome is included.
- Focused comparison: `art/qa/reference-vs-town-detail.jpg`, 1200 × 500. Source crop x261 / y210 / 250 × 190 and town crop x120 / y270 / 480 × 320 are fitted into 600 × 456 tiles. Both images were opened together and inspected, including roofs, frames, awning, paving, water and shadows.
- Blender detail comparison: `art/qa/blender-window-comparison.png`, 1200 × 600, combines the actual before / after Cycles renders of the same house. Source renders are 1024 × 1024 each. `art/qa/blender-roundtrip-verification.json` records identical bounds after Blender GLB export, preserving origin and scale.

## Findings and comparison history

No actionable P0 / P1 / P2 findings remain in the tested laptop and compact in-app views.

1. **[P2, closed] Side window lost its glazing.** The left half of `blender-window-comparison.png` shows a dark door-like rectangle where the house needs a window. Individual component rotation left the glass behind the frame. The fix rotates the entire local window group. The right half shows visible glazing and crossbars; the revised model is also loaded in the final browser screenshot. This restores the intended detailed, warm miniature building treatment.
2. **[P2, closed] Small secondary text had insufficient contrast.** The previous `#6d795f` foreground on cream was about 4.21:1. Text used for goal counts, descriptions, setting labels and service summaries now uses `#63715c`, about 4.73:1. The revised full-view and detail comparisons were inspected after the CSS change. Semantic satisfied / unmet states retain distinct colors and explicit text.
3. **[P2, closed] Placement actions competed with camera controls in compact views.** The placement ribbon now occupies a separate tier above the camera controls at widths below 1050 and 720. `town-placement.jpg` and `town-trackpad-placement.jpg` show the corrected separation, with the town and valid / invalid preview still visible. Camera movement reprojects the preview under the same pointer instead of leaving it at an old world cell.
4. **[P2, closed] Trackpad scrolling only zoomed, and view transitions lacked a consistent response.** The new explicit trackpad mode maps vertical motion to elevation, horizontal motion to yaw, pinch / Ctrl-wheel to zoom, and Shift-wheel to pan. A separate mouse mode preserves wheel zoom. Gestures, focus, overview and zoom buttons use short, time-based smoothing. Tilt is bounded to 26°–72° with no roll, and overscroll does not delay reversing direction. The focus animation also handles its first zero-delta frame correctly. Post-fix native browser observations and unit tests are recorded below.

## Required fidelity surfaces

- **Fonts and typography:** Avenir Next with PingFang SC / Microsoft YaHei fallbacks; the display title uses a heavier weight and tight spacing, while Chinese instructions remain modern and readable. Heading / goal / secondary text hierarchy is consistent. Font rendering is smooth at the tested density, labels wrap within their panels, and icon-only controls retain accessible names. The compressed video is not sufficient to identify its exact font; our modern DOM typography is an intentional implementation of the approved brief.
- **Spacing and layout rhythm:** Coin balance and sync stay in the header, the current goal stays at the upper left, construction tools at the bottom and optional information in a dismissible panel. Most of the screen remains the 3D town. Camera and placement controls do not collide in tested 655 / 928 / 965-pixel widths. The town uses a larger presentation than the source video's developed miniature and menu split, matching the user's request that the town be the main screen.
- **Colors and visual tokens:** Cream panels, sage terrain, muted timber / plaster and warm clay roofs carry the source direction. Model variants introduce coordinated green, blue and ochre roofs. Soft shadows, pale turquoise water and warm window glazing make the scene readable. Status colors have text and outlines, so meaning is not carried by color alone. No neon dashboard styling or pixel fonts remain in the new main experience.
- **Image quality and asset fidelity:** Runtime uses actual original 3D geometry and GLB assets, not a raster background or placeholder image of the town. Roof seams, timber supports, stone foundations, shutters, porches, chimney, glazing and shop awnings are visible in the detail comparison. River motion, groves, terraced hills, shoreline details and layered map edges are visible in the overview. Original modular geometry is authorized by the product brief; it deliberately does not reproduce the reference's buildings. The renderer uses antialiasing and a 2× backing resolution on this machine; catalog thumbnails are 384 × 384. Blender imports actual editable meshes and was used to render / round-trip the model; the authored source remains the TypeScript prefab library, not a claim of manual Blender sculpting.
- **Copy and content:** The interface explains token → coins → buildings → connected streets → chapter unlocks in concise Chinese. The current goal names the actual unmet need. Invalid placements explain occupied / locked / water cells; demo mode is visibly distinct. No implementation jargon is placed in the ordinary building flow. Technical usage and save details are confined to settings / project details.

## Interactions and verification

- Native browser: initial town tutorial street connection; actual local usage sync; immediate repeat sync without duplicate coins; switching back to demo preserves its independent balance. No save reset or old arcade-state migration was performed.
- Native browser: catalog click enters a following 3D preview and closes the panel; dragging a catalog item places directly; rotation, invalid placement, right-click / Escape cancellation and free layout adjustments work. A preview alone keeps coins at 397.
- Native browser: first free planning puzzle completed with 14 roads / three stars, unlocking its blueprint and palette without adding or spending town coins. All six authored puzzle solutions and chapter three-star fixtures are separately validated by the rules tests.
- Native trackpad input path: vertical scroll changes elevation from 40° to about 59.3° without zooming; horizontal scroll changes yaw from 37.9° to 27.4° while preserving elevation and zoom. Further upward input settles at 72°; downward input settles at 26°; reversing immediately raises elevation to 30°. Camera remains level.
- Native mouse mode: vertical scroll changes zoom from 1.45 to about 1.304 without changing yaw / elevation. The selected mode persists after refresh; it was restored to trackpad for handoff. Scrolling the settings panel leaves the scene camera unchanged.
- Native preview during orbit: the same pointer's preview changes from cell `10,20` to `9,21`, matching the rotated ground projection; coins remain 397. Hold-and-release rotation changes yaw from 9.1° to 7.4°, then remains at 7.4° after release. Returning to town restores 40° elevation with a smooth transition.
- Console: no new warning / error logs after the final reload. Final runtime observation is saved in `art/qa/camera-browser-verification.json`.
- Performance: final medium-quality view reports about 59–60 FPS, pixel ratio 2, approximately 537 draw calls including shadow passes. This is measured on the current machine, not a benchmark guarantee for every laptop. Low quality offers 30-FPS rendering without shadows.
- Automated validation: `npm run typecheck`, `npm test` (172 passing tests), client build. Earlier full asset / legacy / server build and package dry run also passed. Tests include token high-water / residue, capped subsidy / deferred payment, inventory identity, rotation / road / service rules, save corruption checks, mode isolation, all authored solutions, gesture mapping / bounds / frame-rate-independent smoothing and preference migration.

## Residual test gaps and follow-up polish

- Physical pinch and Shift-plus-two-finger gestures cannot be generated by the current computer-use input API. Their browser WheelEvent mappings and modifier precedence are tested in code; actual hardware gesture feel still benefits from hands-on use. No claim of a physical pinch test is made.
- The browser viewport override did not produce the requested 390 × 844 CSS viewport on this host, even after reload. It was reset. Desktop / compact in-app views are verified; a phone-size browser is not claimed as tested. Mobile input is outside this laptop-focused validation.
- The current Blender GUI contains unsaved user edits; those were preserved. Disk library generation and isolated GLB / preview export are verified. Artist-edited exports require switching the asset-generation build step before relying on them, as documented in `docs/TOWN_3D_ASSETS.md`.
- **P3:** More individually authored courtyard / shoreline arrangements could increase variety as the town develops. This does not block the current original modular miniature direction.

## Implementation checklist

- [x] Render and compare source / implementation together, including a detail crop.
- [x] Correct side window, text contrast and compact placement-control separation; inspect post-fix evidence.
- [x] Verify native orbit / tilt / wheel-zoom / release-stop and preserved town economy.
- [x] Complete rules / gesture tests, typecheck and client build.
- [x] Restore default trackpad mode, main town view and browser deliverable; preserve real / demo / legacy saves.

final result: passed
