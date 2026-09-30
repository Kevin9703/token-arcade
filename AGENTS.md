# Codex Task Brief — Token Town

Implement the approved 3D river valley town game. Read `docs/TOKEN_TOWN.md` and `docs/TOWN_3D_ASSETS.md`; older pixel arcade documents are historical references.

- Main entry is `src/town/main.ts`: TypeScript + Three.js, orthographic town view, DOM interface.
- Preserve local Claude Code / Codex scanners and `GET /api/usage`.
- Tokens are the only external reward input. Never add commits, tests, PRs or quality scoring. Do not expose conversation histories.
- 10,000 newly credited tokens = 1 coin, carry residue, monotonic per-project high-water, no workshop multiplier.
- Chapters grant one-time subsidy entitlements; paid subsidy is capped at 20% of token coins. Keep pending entitlement.
- Main town and fixed-inventory puzzles have separate boards; puzzles never change main coins.
- Buildings are permanent inventory instances. Moving, rotation, roads and storage are free and cannot duplicate objects.
- Live / demo saves are independent `tokenTown` slots. Preserve all original arcade saves and source.
- The town stays the main view. Choose or drag a building from the catalog; visible model follows the mouse, click/drop places, R rotates, right-click / Esc cancels. Coordinate input is optional accessibility support.
- Hold Q / E or camera controls for continuous smooth rotation; release stops. Never return to hard view jumps.
- Buildings currently use the original complete GLBs. Curated Kenney CC0 trees / props use `scripts/build-curated-town.py`; retain provenance and licensing. The modular house assembly was rejected and removed. The user subsequently chose our own models. Continue original modeling; each shop needs a distinct silhouette and structure, not merely a recolored cottage. Visually inspect all sides, ground contact, door / road access and footprint. Original Blender workflow lives in `scripts/blender-town-library.py`.
- Automatic day/night lasts six minutes per day; seasons cycle every three days. Persist world time without offline progress. Residents animate doors, sleep indoors and rejoin reserved pavement slots in the morning. Clock-only checkpoints must never cause a gameplay conflict or affect rewards.
- Keep rules independent of render/animation and validate six chapters / six puzzles with achievable three-star layouts.
- Run `npm run typecheck`, `npm test`, `npm run build`, plus browser checks appropriate to changes.
- Do not reset or clear the user's saves while testing. Use isolated demo data and preserve user-owned untracked files.

For finding or managing company skills, prefer `skillet search`, `skillet install`, `skillet list`, and `skillet info`.
