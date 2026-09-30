# Codex Task Brief — Token Town / 河谷小镇

This project is a cozy **3D river valley town game**, built with TypeScript and Three.js. The former pixel arcade has been retired from the main experience. Do not implement new arcade rooms, capsule machines, prize walls, or pixel UI. Historical files and saves may remain for compatibility, but must not guide new work.

Start with `docs/README.md`; read `docs/TOKEN_TOWN.md` and `docs/TOWN_3D_ASSETS.md` before changing the game. `ARCHITECTURE.md` describes the current implementation, `docs/QA.md` records verification, and `docs/ROADMAP.md` records delivered scope and implementation decisions. Keep those statuses distinct and remove superseded documents instead of maintaining conflicting specifications.

During active development, read local `docs/feedback.md` when present at the start of work, after finishing the current batch, and before committing. Preserve the user's wording, mark implemented and verified items complete, and annotate partial or planned items honestly. Record implementation decisions in `docs/ROADMAP.md`; update verification in `docs/QA.md`. The feedback file is intentionally Git-ignored: never stage, force-add or commit it.

## Product and economy

- `src/town/main.ts` is the main entry. The town itself occupies the main screen; DOM panels support building and planning rather than becoming an analytics dashboard.
- Preserve local Claude Code / Codex / Kimi Code / DeepSeek Harness scanners and `GET /api/usage`. Tokens are the only external reward input. Never score commits, tests, docs, PRs or work quality, and never display conversation history.
- 10,000 newly credited tokens = one coin. Carry fractional residue and monotonic per-project high-water. Workshops have 50 levels and five visual stages, with no coin multiplier.
- Chapter subsidies are one-time entitlements, paid up to 20% of token coins; retain unpaid entitlement for later settlement.
- Town and fixed-inventory planning puzzles have separate boards. Puzzles never spend or generate main-town coins.
- Buildings remain permanent inventory instances. Roads, movement, rotation and storage are free and cannot duplicate objects.
- Real and demo saves use independent `tokenTown` slots. Migrate new optional state without changing the user's balance, inventory, layout or unlocks. Preserve historical saves.

## Town, villagers and production

- The main map is 24 × 24. Start with the south bank's first 18 columns; chapter two opens the remaining south-bank land. Northern districts still follow chapter progression.
- Housing and shops connect to the town hall through their actual rotated entrance. Food and leisure use shortest road distance and stable capacity allocation. Main-town cafe coverage is 18 road tiles / 8 homes; parks use nearest footprint edges within six tiles. Fixed puzzles retain cafe 10 / 4 and parks three. Chapter five has no road cap. Goals count unique serviced homes, never the number of shops or parks.
- Roof bubbles show missing needs at the current chapter; explain the actual road, distance or capacity problem. Keep gameplay rules separate from rendering. Retain solvable six-chapter and six-puzzle progression with meaningful three-star layouts.
- Wheat fields → windmill mills → bakeries form a visible, light production loop. Existing villagers sow, harvest, carry wheat, mill flour and deliver it for baking. Crops, cargo and mill blades animate; the farm ledger persists. No automatic coin generation, maintenance fee or offline punishment.
- Vegetable fields / greenhouses, milk and cheese, pigs finding truffles, fishing huts, restaurants and three neighborhood orders are implemented. Orders consume reachable actual stock and unlock decorative blueprints, never coins. Winter pauses outdoor vegetables; greenhouses continue. Wheat mills produce three flour, two reserved for bread and one available for restaurant delivery.
- At most three workers share all production; road outages pause their chain. Production waits for the worker to reach the job, pauses at night, and resumes without duplicating goods. Show missing-material and disconnected-route explanations.
- Six minutes per day; seasons cycle every three days. Persist time without offline progress. Villagers open doors, enter homes, sleep inside and rejoin safe walking lanes in the morning.
- Road edits must preserve resident objects, positions, gait, seats and bedtime state. Recalculate routes smoothly; never recreate the whole crowd for every painted tile.
- Time/farm/village-only checkpoints must not masquerade as gameplay conflicts or alter token rewards.

## Controls and presentation

- Choose or drag a catalog building: its visible model follows the pointer, click/drop places it. **Q/E rotate the building while placing**; R is an alias. Esc or right-click cancels. Coordinate input is optional accessibility support.
- **WASD pans the camera**, including during placement, at 12 tiles/second at zoom 1; compensate for zoom and normalize diagonal movement. Outside placement, hold Q/E or camera arrows to turn continuously; release stops. Clear held input on blur, hidden tabs and form focus. Never intercept typing or browser shortcuts.
- Trackpad: two-finger vertical scroll changes elevation, horizontal scroll rotates, pinch zooms, Shift + scroll pans. Mouse controls remain selectable. Camera changes stay smooth; no hard jumps.
- Original complete 3D models are the preferred style. Shops must have distinct silhouettes and structure, not merely recolored cottages. Inspect all sides, ground contact, doors and footprints. Hinges, crop patches, livestock and mill fans remain articulated in GLB exports.
- Curated Kenney CC0 scenery is allowed with provenance; the rejected modular house assembly must not return. Preserve the user's open Blender scene. Use scripts/headless exports for reproducible asset work.
- Seasonal background music uses local, licensed recordings, starts after a user gesture, crossfades at season/loop transitions, and has independent volume controls. Preserve attribution and licenses in the shipped assets. Respect mute, reduced motion and hidden-tab pause.

## Validation

Run `npm run typecheck`, `npm test`, and `npm run build`; add meaningful tests for changed rules and use browser checks for changed interactions. Verify farm-to-meal-to-order consumption, all recipes, seasonal choices, actual deliveries, road-edit continuity, night pause/resume, Q/E placement and WASD movement. Production choices and order claims must remain transactional across tabs. Check screenshots at the user's normal viewport and preserve all user saves. Test through a separate origin or fixture. Do not commit user-owned `.claude`, `.history`, or feedback edits incidentally.

For finding or managing company skills, prefer `skillet search`, `skillet install`, `skillet list`, and `skillet info`.
