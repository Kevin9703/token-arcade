# Achievement Gallery And i18n Requirements

Date: 2026-07-09

This document adds two first-version product requirements:

1. A visible achievement gallery so unlocked achievements can be reviewed later.
2. English / Simplified Chinese i18n with a language switch in Settings.

The product loop is still:

```text
tokens -> coins -> cabinet growth -> capsule pulls -> collection
```

Do not add extra scoring inputs. Achievements and language support must make the existing token arcade feel clearer and more collectible, not turn it into a productivity dashboard.

## 1. Achievement Gallery

### Current Problem

Achievements already exist in code:

- `src/content/achievements.ts`
- `state.achievements: Record<string, string>`
- achievement toast through `fx.toast(...)`

But the player has no place to see achievements after the toast disappears. This makes achievements feel like hidden bookkeeping instead of collectible trophies.

### Product Requirement

Add a dedicated achievement gallery / achievement showcase.

Recommended entry points:

- Home player card: clicking the profile/player area opens achievements.
- Prize wall area: clicking the Achievement Cards area opens achievements.
- Optional secondary entry: Settings can include an "Achievements" button, but it should not be the main entry.

Recommended view:

- Use a game-like trophy cabinet / card grid, not a plain settings list.
- Show `unlocked / total` at the top.
- Show every achievement in the order defined by `ACHIEVEMENTS`.
- Unlocked card state:
  - icon/sprite
  - localized name
  - localized description
  - unlocked date
  - lit border / rarity-style glow
- Locked card state:
  - locked silhouette or dim icon
  - localized locked state
  - either show the name + hint, or show "Locked Achievement" plus a short hint
  - achievements may reveal hints because they guide play; this is different from locked prize-wall items
- Hover / tap should show a compact detail tooltip/card.
- The view must be reachable on desktop with mouse and usable on mobile/touch.

### Achievement Content

Keep the existing achievement logic unless there is a real bug. The current first set is fine for MVP:

| id | English name | Chinese name | Chinese description |
| --- | --- | --- | --- |
| `first_coin` | First Coin | 第一枚金币 | 铸出第一枚金币。模型热量开始变成真正的街机货币。 |
| `warm_machine` | Warm Machine | 机台预热 | 累计消耗 10K tokens。机器已经开始发光。 |
| `neon_night` | Neon Night | 霓虹之夜 | 累计消耗 100K tokens。你的街机厅亮起来了。 |
| `million` | Million Token Club | 百万 Token 俱乐部 | 累计消耗 1M tokens。现在这不是小打小闹了。 |
| `royalty` | Cabinet Royalty | 机台王者 | 任意项目机台达到 Lv20。它已经有点像镇店之宝。 |
| `first_pull` | First Pull | 第一次抽取 | 第一次使用胶囊机。命运从投币声开始。 |
| `wall_starter` | Prize Wall Starter | 展示柜入门 | 解锁 10 个收藏品。空柜子终于有了故事。 |
| `dupe_luck` | Duplicate Luck | 重复也是运气 | 获得 5 次重复物品。至少它们都变成了资源。 |
| `legendary_drop` | Legendary Drop | 传说掉落 | 解锁任意传说物品。这个光效值得停下来看一眼。 |

English names/descriptions can remain the current copy, but the implementation must source them from i18n keys so both languages are available.

### Achievement Acceptance

- After unlocking an achievement, the toast appears and the achievement is visible in the gallery.
- After reload, unlocked achievements remain visible with their unlocked date.
- Locked and unlocked counts are correct.
- The gallery does not require another sync/pull to refresh after a new unlock.
- Achievement cards feel like collectible trophies, not a debug table.

## 2. i18n: English And Simplified Chinese

### Current Problem

The UI is hardcoded in English across canvas screens, DOM overlays, content catalogs, tooltips, toasts, and shop cards. `GameSettings` currently only stores `muted`.

There is an extra technical issue: `src/render/pixelFont.ts` is a hand-built 5x7 bitmap font with ASCII glyphs only. Chinese text must not be rendered through this bitmap font, or it will become `?`.

### Product Requirement

Support:

- English: `en`
- Simplified Chinese: `zh-CN`

Add a language control in Settings:

```text
Language: English / 中文
```

Behavior:

- Persist selection in `state.settings.language`.
- Existing saves without `settings.language` must be migrated safely.
- On a fresh save, default from browser language:
  - if `navigator.language` starts with `zh`, use `zh-CN`
  - otherwise use `en`
- Switching language updates the current screen immediately without requiring reload.
- Project names, provider names, numeric values, and IDs are not translated.
- Brand/logo can stay `Token Arcade`; do not generate a Chinese logo for MVP.

### Translation Scope

Localize all user-facing static text:

- Home screen labels:
  - player card labels
  - lifetime token labels
  - sync button labels
  - cabinet section labels
  - empty state
  - coin bank copy
  - prize wall labels
  - bottom shop rail
- Capsule room:
  - back button
  - pull buttons
  - not-enough-coins message
  - rarity labels
  - locked prize labels
  - tooltip scaffolding
  - reveal card labels
- Project detail:
  - project stats labels
  - token/coin power labels
  - next level labels
  - recent rewards labels
- DOM overlays:
  - Help
  - Settings
  - reset progress confirmation/copy if present
- Toasts and reward summaries:
  - achievement title label
  - sync result strings
  - level-up strings
- Content catalogs:
  - achievement names/descriptions
  - collectible names/descriptions
  - shop labels/subtitles
  - collectible type labels
  - rarity labels
  - currency labels

### Architecture Guidance

Recommended implementation shape:

- Add an i18n module, for example `src/i18n/index.ts`.
- Define a typed language union: `type Locale = 'en' | 'zh-CN'`.
- Define a dictionary by stable keys, not by display strings.
- Add `t(key, params?)` and `getLocale()/setLocale()` helpers or equivalent store-backed access.
- Keep stable game IDs separate from localized display text.
- Do not use translated text for logic, sprite lookup, rarity keys, type keys, or storage keys.
- Content can either:
  - replace display fields with `nameKey` / `descKey`, or
  - keep English fallback fields and add localized lookup helpers.

For canvas text:

- Keep the existing pixel bitmap font for English / ASCII where it works.
- Add a localized text drawing path for CJK strings.
- Detect CJK text and render it with canvas `fillText` using a system CJK stack:

```text
"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif
```

- Preserve the arcade feel with color, shadow, glow, tight sizing, and pixel-art containers.
- Do not run Chinese text through `drawText` from `pixelFont.ts`.
- Update measurement and wrapping helpers so Chinese text does not overflow cards/buttons/tooltips.

For numbers:

- Use `Intl.NumberFormat(locale)` or an equivalent formatting helper.
- Keep compact token notation readable in both languages.
- It is acceptable for large numbers to use commas in both languages if that avoids layout churn, but the implementation should be centralized.

### Suggested Chinese UI Copy

Core labels:

| English | Chinese |
| --- | --- |
| Arcade Player | 街机玩家 |
| Lifetime Tokens | 累计 Tokens |
| Sync | 同步 |
| Syncing | 同步中 |
| Cabinets | 项目机台 |
| Prize Wall | 奖品墙 |
| Coin Bank | 金币银行 |
| Pull | 抽取 |
| Capsule | 胶囊 |
| Not Enough Coins | 金币不足 |
| Locked Prize | 未解锁奖品 |
| Settings | 设置 |
| Help | 帮助 |
| Sound | 声音 |
| Data source | 数据来源 |
| Reset progress | 重置进度 |
| Close | 关闭 |
| Back | 返回 |
| Achievement | 成就 |
| Achievements | 成就展示柜 |

Rarity labels:

| English | Chinese |
| --- | --- |
| Common | 普通 |
| Uncommon | 稀有 |
| Rare | 罕见 |
| Epic | 史诗 |
| Legendary | 传说 |

Collectible type labels:

| English | Chinese |
| --- | --- |
| Badge | 徽章 |
| Sign | 招牌 |
| Decor | 装饰 |
| Buddy | 伙伴 |
| Frame | 相框 |
| Trophy | 奖杯 |
| Theme | 主题 |

### i18n Acceptance

- Settings has a visible language switch: English / 中文.
- Switch to 中文:
  - Home screen main labels become Chinese.
  - Capsule page labels/tooltips/reveal cards become Chinese.
  - Achievement gallery names/descriptions become Chinese.
  - Settings/help become Chinese.
- Switch back to English:
  - UI returns to English.
- Reload:
  - selected language persists.
- No Chinese text is rendered as `?`.
- No text overflows or overlaps in buttons, cards, prize-wall slots, achievement cards, or tooltips.

## Claude Code Prompt

Please add two first-version product features to Token Arcade: achievement gallery and i18n.

Read:

```text
docs/ACHIEVEMENTS_AND_I18N_REQUIREMENTS.md
docs/PM_PRODUCT_NORTH_STAR.md
docs/MVP_FEATURE_ACCEPTANCE_AUDIT.md
```

Implement:

1. Achievement gallery / showcase.
   - Use existing `ACHIEVEMENTS` and `state.achievements`.
   - Add a visible entry point from the home player card and/or prize-wall Achievement Cards area.
   - Show unlocked / total count.
   - Show locked and unlocked cards with tooltip/detail.
   - Persisted unlock dates should display after reload.

2. English / Simplified Chinese i18n.
   - Add `settings.language: 'en' | 'zh-CN'`.
   - Add a Settings language switch.
   - Default from browser language on fresh save.
   - Localize all static UI text, achievements, collectibles, shop labels, rarity labels, type labels, tooltips, toasts, and DOM overlays.
   - Do not translate project names or provider names.
   - Do not render Chinese through the ASCII-only pixel bitmap font. Add a CJK-safe canvas text path with a system CJK font fallback.
   - Switching language should update the current UI immediately and persist after reload.

Keep the game local-first and simple. Do not add any non-token scoring inputs.
