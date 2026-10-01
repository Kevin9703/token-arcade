# Codex Task Brief — Token Town / 河谷小镇

This project is a cozy **3D river valley town game**, built with TypeScript and Three.js. Only the town belongs in the current source, assets, tests and builds. Do not restore retired arcade rooms, capsule machines, prize walls or pixel UI. Historical saves must remain untouched; retired code is available in Git history and its archived branch.

Start with `docs/README.md`; read `docs/TOKEN_TOWN.md` and `docs/TOWN_3D_ASSETS.md` before changing the game. `ARCHITECTURE.md` describes the current implementation, `docs/QA.md` records verification, and `docs/ROADMAP.md` records delivered scope and implementation decisions. Keep those statuses distinct and remove superseded documents instead of maintaining conflicting specifications.

During active development, read local `docs/feedback.md` when present at the start of work, after finishing the current batch, and before committing. Preserve the user's wording, mark implemented and verified items complete, and annotate partial or planned items honestly. Record implementation decisions in `docs/ROADMAP.md`; update verification in `docs/QA.md`. The feedback file is intentionally Git-ignored: never stage, force-add or commit it.

## Git publishing

Keep changes local. Push to `main` only after the user explicitly asks again; historical push authorization does not authorize a new batch. Never include local feedback or user-owned Blender / history changes incidentally.

## Product and economy

- `src/town/main.ts` is the main entry. The town itself occupies the main screen; DOM panels support building and planning rather than becoming an analytics dashboard.
- Preserve local Claude Code / Codex / Kimi Code / DeepSeek Harness scanners and `GET /api/usage`. Tokens are the only external reward input. Never score commits, tests, docs, PRs or work quality, and never display conversation history.
- 10,000 newly credited tokens = one coin. Carry fractional residue and monotonic per-project high-water. Workshops have 50 levels and five visual stages, with no coin multiplier.
- Chapter subsidies are one-time entitlements, paid up to 20% of token coins; retain unpaid entitlement for later settlement.
- Town and fixed-inventory planning puzzles have separate boards. Puzzles never spend or generate main-town coins.
- Buildings remain permanent inventory instances. Roads, movement, rotation and storage are free and cannot duplicate objects.
- Real and demo saves use independent `tokenTown` slots. Migrate new optional state without changing the user's balance, inventory, layout or unlocks. Preserve historical saves.

## Town, villagers and production

- The main map is 40 × 40. Start with the south bank's first 26 columns (702 land cells, including roadable slopes); chapter two opens the eastern south-bank land. Northern districts use the first 20 columns before chapter six. Keep the original 24 × 24 core's coordinates, river rows 11/12 and ground elevation unchanged when expanding old saves; never recenter or reset their layouts or ledgers.
- `terrain.ts` owns ground elevations, flat foundations and scenic bounds. Build on level plots, road over the gentle connecting slopes. Buildings, terrain picking, roads, selection, feet, door floors and street cameras must agree on height. River banks, not board midpoint, determine chapter shore counts. Fixed puzzles remain flat and retain their original sizes / inventory. Seeded scenery clears around actual roads and building footprints, returning when the space is freed; it grants no services or rewards.
- Housing and shops connect to the town hall through their actual rotated entrance. Food and leisure use shortest road distance and stable capacity allocation. Main-town cafe coverage is 18 road tiles / 8 homes; parks use nearest footprint edges within six tiles. Fixed puzzles retain cafe 10 / 4 and parks three. Chapter five has no road cap. Goals count unique serviced homes, never the number of shops or parks.
- Roof bubbles show missing needs at the current chapter; explain the actual road, distance or capacity problem. Keep gameplay rules separate from rendering. Retain solvable six-chapter and six-puzzle progression with meaningful three-star layouts.
- Wheat fields → windmill mills → bakeries form a visible, light production loop. Existing villagers sow, harvest, carry wheat, mill flour and deliver it for baking. Crops, cargo and mill blades animate; the farm ledger persists. No automatic coin generation, maintenance fee or offline punishment.
- Vegetable fields / greenhouses, milk and cheese, pigs finding truffles, fishing huts, restaurants and three neighborhood orders are implemented. Orders consume reachable actual stock and unlock decorative blueprints, never coins. Winter pauses outdoor vegetables; greenhouses continue. Wheat mills produce three flour, two reserved for bread and one available for restaurant delivery.
- Community content: three existing residents have three story steps each, anchored to the actual home instance first recorded; movement rechecks goals and storage pauses unfinished goals. Share two real reachable bread, require actual services and nearby footprints, reject repeated expected-step claims. Stories unlock decor, never coins.
- Four seasonal festivals escrow an exact actual-food basket on preparation, retain it across seasons and refreshes, and refund it once on cancellation. Start only in the matching season at a connected park; count unique homes with food and green using real road distance (two within twelve tiles, four within eight for all colors). Store permanent best results. Never reuse an already spent basket.
- Three chapter-gated relics are unique free inventory instances that the player places on empty land. One restoration at a time shares the three-worker budget. Debit supplies on actual pickup, record delivery on actual arrival, and count repair time only while on site. Preserve cargo, deliveries, repair and completed model state across sleep, outages, storage and refreshes. Relics are open scenic attractions, not new production or service multipliers; use actual source-building doors and keep the same worker across trips.
- At most three workers share all production; road outages pause their chain. Production waits for the worker to reach the job, pauses at night, and resumes without duplicating goods. Show missing-material and disconnected-route explanations.
- Six minutes per day; seasons cycle every three days. Persist time without offline progress. Villagers open doors, enter homes, sleep inside and rejoin safe walking lanes in the morning.
- Every enclosed building that villagers enter or leave must use its actual animated door and a real model opening. Use shared doorway anchors for hinges, routes and work points; wait for opening, reserve the doorway, close after passage, and exit before road travel or bedtime. Gates follow the same rule. Open markets need no invented doors; the fishing pier uses the external side path. Preserve articulated hinges in GLBs and the fallback models.
- Road edits must preserve resident objects, positions, gait, seats and bedtime state. Recalculate routes smoothly; never recreate the whole crowd for every painted tile.
- Clicking a visible villager in browse mode opens a stable name, biography and live activity card. Derive destinations and actions from actual resident / production states; never invent jobs, change routes or reward coins for viewing. Names remain stable across work changes and refreshes. Respect building occlusion and preserve placement / road input.
- Time/farm/village/community-only checkpoints must not masquerade as gameplay conflicts or alter token rewards.

## Controls and presentation

- Choose or drag a catalog building: its visible model follows the pointer, click/drop places it. **Q/E rotate the building while placing**; R is an alias. Esc or right-click cancels. Coordinate input is optional accessibility support.
- **WASD pans the camera**, including during placement, at 24 tiles/second by default at zoom 1; offer 12 / 24 / 36 speed preferences and hold Shift for 2× speed. Street walking defaults to 3.6 tiles/second and follows the same preference / boost. Compensate for zoom and normalize diagonal movement. Outside placement, hold Q/E or camera arrows to turn continuously; release stops. Clear held input on blur, hidden tabs and form focus. Never intercept typing or browser shortcuts.
- Observation modes: H hides every HUD layer and H / Esc restores it; V toggles a separate perspective street camera. Street movement uses actual clear roads for entry, avoids building footprints and water, and follows bridge height. Observation never changes resident jobs, rewards or saved layout; construction returns to the orthographic camera.
- Balanced quality targets 30 FPS, up to 1.5 pixel ratio and 1024 shadows; fine quality targets 60 FPS, up to 2 pixel ratio and 2048 shadows. Bound large-display framebuffers, batch repeated scenery, refresh shadows separately, and suspend animation frames while hidden. Keep diagnostic serialization off the per-frame path.
- Trackpad: two-finger vertical scroll changes elevation, horizontal scroll rotates, pinch zooms, Shift + scroll pans. Mouse controls remain selectable. Camera changes stay smooth; no hard jumps.
- Original complete 3D models are the preferred style. Shops must have distinct silhouettes and structure, not merely recolored cottages. Inspect all sides, ground contact, doors and footprints. Hinges, crop patches, livestock and mill fans remain articulated in GLB exports.
- Curated Kenney CC0 scenery is allowed with provenance; the rejected modular house assembly must not return. Preserve the user's open Blender scene. Use scripts/headless exports for reproducible asset work.
- Seasonal background music uses local, licensed recordings, starts after a user gesture, crossfades at season/loop transitions, and has independent volume controls. Preserve attribution and licenses in the shipped assets. Respect mute, reduced motion and hidden-tab pause.

## Validation

Run `npm run typecheck`, `npm test`, and `npm run build`; add meaningful tests for changed rules and use browser checks for changed interactions. Verify farm-to-meal-to-order consumption, all recipes, seasonal choices, actual deliveries, road-edit continuity, night pause/resume, Q/E placement and WASD movement. Production choices, order / story claims, festival baskets and restoration supplies must remain transactional across tabs. Verify every story, both festival layouts, all three repair recipes, real worker delivery and model state restoration. Check screenshots at the user's normal viewport and preserve all user saves. Test through a separate origin or fixture. Do not commit user-owned `.claude`, `.history`, or feedback edits incidentally.

For finding or managing company skills, prefer `skillet search`, `skillet install`, `skillet list`, and `skillet info`.
