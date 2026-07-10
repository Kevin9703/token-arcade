# Claude Handoff 2026-07-09

This is the single prompt to send to Claude Code tomorrow.

## Prompt

Please do a PM-guided first-version completion pass for Token Arcade.

The user and Codex PM have agreed that the product is:

```text
tokens -> coins -> cabinet growth -> capsule pulls -> collection
```

Token usage is the only gameplay input. Do not add commits, tests, docs, PRs, or productivity-quality scoring.

Read these docs first:

```text
docs/PM_PRODUCT_NORTH_STAR.md
docs/MVP_FEATURE_ACCEPTANCE_AUDIT.md
docs/MVP_GAMEPLAY_ECONOMY_AUDIT.md
docs/HOME_VISUAL_REDESIGN_FROM_PROTOTYPE.md
docs/COLLECTIBLE_GENERATED_ASSETS.md
docs/ACHIEVEMENTS_AND_I18N_REQUIREMENTS.md
docs/PROJECT_LEVEL_SYSTEM.md
docs/PROJECT_DETAIL_GENERATED_ASSETS.md
docs/CAPSULE_GENERATED_ASSETS.md
docs/PM_QA_2026-07-09_VISUAL_ASSET_COMPLETION.md
```

Use these new assets:

```text
public/assets/home-ui/logo-sign-v1-trimmed.png
public/assets/home-ui/player-character-v1-trimmed.png
public/assets/home-ui/player-card-frame-v1-trimmed.png
public/assets/home-ui/coin-counter-plaque-v1-trimmed.png
public/assets/home-ui/sync-button-states-v2-trimmed.png
public/assets/home-ui/shop-card-frame-v1-trimmed.png
public/assets/home-ui/project-row-frame-v1-trimmed.png
public/assets/home-ui/icon-button-frame-v1-trimmed.png
public/assets/collectibles/items/
public/assets/collectibles/sheets/
public/assets/achievement-showcase/items/
public/assets/hud/items/
```

Priority order:

1. Fix project level display consistency.
   - Display `levelInfo(project.tokens).level` everywhere.
   - Do not leak old 1-5 `proj.level` values.
   - A 120M-token project should read around Lv40 and Legendary stage.
   - A 10M-token project should read around Lv19 and Deluxe stage.

2. Rebalance economy.
   - Recommended base: `10,000 tokens = 1 coin`.
   - Recommended pull costs: x1 = 25, x10 = 225.
   - Recommended shop costs: sign 250, frame 600, theme 1500, trophy 3000, premium decor 8000+.
   - Handle existing saved balances carefully.
   - Update all UI copy for token-to-coin conversion.

3. Give visible currencies a purpose.
   - If tickets have no sink, hide them.
   - If dust has no sink, hide it.
   - If keeping dust, add a simple crafting/pity use.

4. Bring home screen back toward the original prototype.
   - Replace the title with `logo-sign-v1-trimmed.png`.
   - Replace the blocky player with `player-character-v1-trimmed.png`.
   - Use `player-card-frame-v1-trimmed.png` for the profile card.
   - Use `coin-counter-plaque-v1-trimmed.png` for coin counter.
   - Use `sync-button-states-v2-trimmed.png` for sync button states.
   - Use `shop-card-frame-v1-trimmed.png` for bottom purchase cards.
   - Use `project-row-frame-v1-trimmed.png` or match it for project rows.
   - Use `icon-button-frame-v1-trimmed.png` for mute/settings/help.
   - Keep all numbers/text dynamic in code.

5. Replace rough collectible and currency sprites.
   - Use `public/assets/collectibles/items/{collectibleId}.png`.
   - Use `docs/COLLECTIBLE_GENERATED_ASSETS.md` for mapping.
   - Use these in reveal card, prize wall, tooltip, shop, and achievement cards where applicable.
   - Keep fallback to old code sprites if image assets fail.

6. Improve reward feel.
   - Pull button -> lever snaps down -> machine shakes -> glow burst -> reveal card pops -> prize wall slot lights up.
   - Sync should show new tokens, coins minted, level-ups, achievements.

7. Add an achievement gallery / showcase.
   - Achievements already unlock and persist in `state.achievements`, but the user has no place to review them.
   - Add a visible entry point from the home player card and/or prize-wall Achievement Cards area.
   - Show locked and unlocked achievement cards, `unlocked / total`, localized names/descriptions, and unlocked dates.
   - Keep it game-like: trophy cards / achievement cabinet, not a plain debug list.

8. Add English / Simplified Chinese i18n.
   - Add `settings.language: 'en' | 'zh-CN'`.
   - Add a Settings language switch: English / 中文.
   - Default from browser language for fresh saves; persist after reload.
   - Localize all static UI strings, achievements, collectibles, shop labels, rarity/type labels, tooltips, toasts, and DOM overlays.
   - Do not translate project names, provider names, stable IDs, or the Token Arcade brand/logo.
   - Important: `src/render/pixelFont.ts` is ASCII-only. Do not render Chinese through it. Add a CJK-safe canvas text path using a system CJK font fallback.

9. Expand long-term collection if time allows.
   - Target 50-60 collectible slots for first complete version.
   - Existing v1 generated icons cover current collectibles; add variants/tints carefully if expanding.

Constraints:

- Do not recolor/repaint generated assets with scripts.
- Scripts are allowed for crop measurement, source rects, and alpha inspection only.
- Do not redesign unrelated screens unless required by the PM docs.
- Keep the app local-first and simple.

Acceptance:

- Home screen first glance feels like a complete arcade game screen.
- Coins no longer feel impossible to spend.
- Every visible currency has a purpose.
- Every collectible has a high-quality generated icon.
- Every visible static coin uses the generated coin/HUD/price assets consistently.
- Achievement page uses generated showcase cards/icons and no longer looks like a web grid.
- Project detail stat/recent reward icons use generated milestone assets.
- Project level/stage agrees everywhere.
- Capsule pull and prize wall are satisfying enough to make token spend feel rewarding.
- The user can review unlocked achievements after the toast disappears.
- The user can switch between English and Simplified Chinese in Settings, and Chinese text does not become `?`.
