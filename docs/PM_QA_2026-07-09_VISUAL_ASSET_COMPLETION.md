# PM QA 2026-07-09: Visual Asset Completion

Token Arcade north star remains:

```text
tokens -> coins -> cabinet growth -> capsule pulls -> collection
```

The product should feel like a playable pixel arcade, not a dashboard. Token usage is the only gameplay input. Do not add commits, tests, docs, or productivity scoring as gameplay.

## Current QA Evidence

The original local browser screenshots and temporary contact sheets were
intentionally removed during repository cleanup. The individual runtime assets
and written requirements in this document remain the source of truth.

## New / Updated Assets

Achievement showcase assets:

```text
public/assets/achievement-showcase/items/title_plaque.png
public/assets/achievement-showcase/items/card_unlocked.png
public/assets/achievement-showcase/items/card_locked.png
public/assets/achievement-showcase/items/icon_niche.png
public/assets/achievement-showcase/items/small_plaque.png
public/assets/achievement-showcase/items/back_button.png
public/assets/achievement-showcase/items/progress_plaque.png
public/assets/achievement-showcase/items/ach_first_coin.png
public/assets/achievement-showcase/items/ach_warm_machine.png
public/assets/achievement-showcase/items/ach_neon_night.png
public/assets/achievement-showcase/items/ach_million.png
public/assets/achievement-showcase/items/ach_royalty.png
public/assets/achievement-showcase/items/ach_first_pull.png
public/assets/achievement-showcase/items/ach_wall_starter.png
public/assets/achievement-showcase/items/ach_dupe_luck.png
public/assets/achievement-showcase/items/ach_legendary_drop.png
```

HUD and project-detail icon assets:

```text
public/assets/hud/items/coin_hud_plaque.png
public/assets/hud/items/token_hud_plaque.png
public/assets/hud/items/price_tag_plaque.png
public/assets/hud/items/coin_socket.png
public/assets/hud/items/reward_ticket_frame.png
public/assets/hud/items/stat_tokens_sync.png
public/assets/hud/items/stat_lifetime_tokens.png
public/assets/hud/items/stat_coins_minted.png
public/assets/hud/items/stat_cabinet_level.png
public/assets/hud/items/stat_provider.png
public/assets/hud/items/stat_coin_power.png
public/assets/hud/items/stat_recent_token.png
public/assets/hud/items/stat_recent_coin.png
```

Currency icons already available:

```text
public/assets/collectibles/items/currency_coin.png
public/assets/collectibles/items/currency_token_chip.png
public/assets/collectibles/items/currency_ticket.png
public/assets/collectibles/items/currency_dust.png
```

## Required Fixes

### P0: Unify Every Visible Coin

Several pages still use code-drawn coins instead of the generated coin asset. This breaks the premium pixel-art style because the same currency looks different across screens.

Replace static visible coin drawing with generated assets:

```text
public/assets/collectibles/items/currency_coin.png
public/assets/hud/items/coin_hud_plaque.png
public/assets/hud/items/price_tag_plaque.png
```

Known remaining code-drawn coin locations from `rg drawCoin(`:

```text
src/screens/roomScreen.ts
src/screens/capsuleScreen.ts
src/screens/cabinetScreen.ts
src/render/machines.ts
src/render/cabinet.ts
src/render/fx.ts
```

Expected behavior:

- Home top-right coin counter uses the generated HUD plaque and generated coin.
- Home project rows use generated coin icons beside project coin totals.
- Bottom shop prices use generated coin icons or the generated price-tag plaque.
- Capsule page top-right coin counter uses the same generated HUD language as home.
- Capsule pull buttons use the generated coin icon, not a code coin.
- Project detail top-right coin counter uses the same generated HUD language.
- Project detail coin-power stat uses generated icon art.
- Flying coin effects may keep procedural motion, but the rendered coin image should visually match `currency_coin.png`.

### P0: Redesign Achievement Page

Current screenshot `14-current-achievements-after-claude.png` proves the achievement page still reads as a web grid: rectangular cards, code-drawn icons, flat background, no display-cabinet fantasy.

Use the new achievement assets above. Direction:

- Use `title_plaque.png` as the page title plate.
- Use `back_button.png` for the back button.
- Use `progress_plaque.png` or `small_plaque.png` for unlocked count.
- Use `card_unlocked.png` for unlocked achievements.
- Use `card_locked.png` for locked achievements.
- Place each generated achievement icon inside `card_unlocked.png`.
- Locked cards should use the locked card art plus a dimmed icon or lock overlay.
- The page should feel like an arcade trophy wall / achievement showcase, not a website card list.

Achievement icon mapping:

```text
first_coin       -> ach_first_coin.png
warm_machine     -> ach_warm_machine.png
neon_night       -> ach_neon_night.png
million          -> ach_million.png
royalty          -> ach_royalty.png
first_pull       -> ach_first_pull.png
wall_starter     -> ach_wall_starter.png
dupe_luck        -> ach_dupe_luck.png
legendary_drop   -> ach_legendary_drop.png
```

### P0: Fix Project Detail Assets

The project detail page still has old/code-drawn HUD pieces:

- Top-right coin/token counters are not using the new HUD assets.
- Project stats icons are code-drawn.
- Recent reward/milestone icons are code-drawn.
- Current screenshot also showed an orange rectangular overlay sitting over the stage-5 cabinet controls. This should be removed or clipped correctly.

Use:

```text
coin_hud_plaque.png
token_hud_plaque.png
stat_tokens_sync.png
stat_lifetime_tokens.png
stat_coins_minted.png
stat_cabinet_level.png
stat_provider.png
stat_coin_power.png
stat_recent_token.png
stat_recent_coin.png
reward_ticket_frame.png
```

Acceptance:

- The top-right HUD looks like the home/capsule HUD.
- Stat rows have generated pixel icons.
- Recent rewards read as physical ticket/reward plaques.
- No overlay rectangle covers the large cabinet art.

### P1: Capsule Page Polish

The current capsule room is much stronger now, but still needs consistency work:

- Top-right coin HUD should use `coin_hud_plaque.png`.
- Pull buttons should use generated coin icons for price.
- Tooltip copy and Chinese line breaks are mostly good; keep them compact.
- Pull lever animation should visibly move down and spring back on pull.

### P1: Home Polish

The home screen is now much closer to the original arcade prototype, but it still needs final consistency:

- Title/logo should not be clipped by the top viewport edge.
- Player card text should stay readable over the dark frame.
- Project row coins and bottom shop price coins must use generated coin assets.
- Keep the left project machines visually tied to project stage color.
- Do not let text sit in very dark or overly detailed parts of the raster frames.

### P1: Chinese Copy

Chinese source copy was tightened in `src/i18n/index.ts` and rebuilt into `public/app.js`.

Use these achievement descriptions:

```text
第一枚金币: 第一枚金币入袋，模型热量开铸。
机台预热: 10K tokens 入炉，机台开始发光。
霓虹之夜: 100K tokens 点亮整间街机厅。
百万 Token 俱乐部: 1M tokens 入账，正式加入大玩家席位。
机台王者: 任意机台冲到 Lv20，镇店之宝诞生。
第一次抽取: 第一次拉下胶囊机拉杆，命运开转。
展示柜入门: 10 件收藏品上墙，空柜子有故事了。
重复也是运气: 5 次重复也不亏，余料都是资源。
传说掉落: 传说物品出仓，值得停下来看一眼。
```

Chinese text must not leave a single punctuation mark on its own line. If a sentence wraps badly, shorten the copy or reduce the text size inside that card.

## Economy Check

Current first-version economy direction is acceptable:

```text
10,000 tokens = 1 coin
Pull x1 = 25 coins
Pull x10 = 225 coins
Shop cosmetics: 250 / 600 / 1500 / 5000+
```

However, high-token users can still accumulate a lot of coins quickly. Do not add complicated mechanics for MVP. Instead, make sure coins have clear simple sinks:

- capsule pulls for collection completion
- high-cost room themes
- high-cost profile frames
- trophy cards
- future premium prize slots

For MVP, it is okay if a heavy user has a large balance, as long as the page makes spending feel rewarding and the remaining locked collection gives them a reason to pull.

## Claude Implementation Prompt

Please do a visual completion pass focused only on asset integration and current PM QA issues.

Read:

```text
docs/PM_QA_2026-07-09_VISUAL_ASSET_COMPLETION.md
docs/GENERATED_ASSETS.md
```

Then implement:

1. Replace all static visible code-drawn coins with generated coin/HUD/price assets.
2. Apply the generated coin HUD to home, capsule, and project-detail top-right counters.
3. Replace project-detail stat/recent reward icons with generated HUD milestone assets.
4. Redesign the achievement screen with generated achievement card/title/icon assets.
5. Fix the stage-5 project-detail cabinet overlay rectangle.
6. Keep Chinese and English working; do not regress i18n.
7. Preserve existing gameplay/state logic.

Do not recolor or repaint generated assets with scripts. Cropping, alpha inspection, and placement measurement are fine.
