# Token Arcade P1: Trust And Lasting Rewards

Date: 2026-07-10

## Why This Is P1

The arcade loop already works:

```text
tokens -> coins -> cabinets -> pulls -> collection
```

P1 makes that loop trustworthy and lasting. A player must always know whether
the arcade is using their own history, and every meaningful coin spend must
leave a visible mark on their arcade identity.

This is not a request for more productivity metrics, real-money currency,
social features, or a complicated crafting economy.

## P1A: Truthful Demo Arcade

### Product Rule

Synthetic progress must never resemble a user's scanned history without an
explicit explanation.

### First Empty Scan

When the first local scan finds no readable Claude Code or Codex history, show
a compact, game-styled `NO HISTORY FOUND` decision panel before generating any
fictional projects.

English copy:

```text
NO HISTORY FOUND
No local Claude Code or Codex usage was found.

PLAY DEMO ARCADE
Explore a fictional arcade with sample projects and prizes.

SCAN AGAIN
Retry the local history scan.
```

Simplified Chinese copy:

```text
未找到历史记录
没有发现本地 Claude Code 或 Codex 用量记录。

进入演示街机厅
使用虚构项目和奖励体验完整玩法。

重新扫描
再次检查本地历史记录。
```

### Persistent Demo Identity

After a player chooses demo mode:

- Show a small but permanent `DEMO ARCADE` / `演示街机厅` plaque beside the
  top currency HUD on Home, Project Detail, Capsule, and Achievement screens.
- The plaque must say that projects, tokens, coins, and collectibles are
  fictional when hovered or opened in the info overlay.
- `SYNC` in demo mode may advance the sample world, but its feedback must call
  it `DEMO SYNC` / `演示同步` rather than imply a real local scan.
- Settings must retain a one-click `TRY LIVE SCAN` / `尝试扫描真实记录` action.
- Live and demo save slots remain isolated. Switching source must never merge
  token totals, wallet coins, owned items, or equipped cosmetics.

### Acceptance

1. A first-time user cannot see fictional cabinets until choosing demo mode.
2. A demo user can identify demo mode from every main screen without opening
   Settings.
3. A real-history user never sees demo labels or fictional projects.
4. A retry that finds history moves into a separate live save without copying
   demo rewards.

## P1B: Cosmetics Must Change The Arcade

### Product Rule

An owned room theme or profile frame is not a statistic. It is a selectable
part of the player's arcade identity.

### Customization Screen

Add a dedicated `CUSTOMIZE ARCADE` / `装扮街机厅` screen, reachable from the
player card and from the prize-wall control area. It should feel like a small
backstage dressing room, not a web settings form.

The screen has two clear bays:

```text
ROOM THEMES       PROFILE FRAMES
```

For every cosmetic card, show exactly one state:

- `LOCKED`: silhouette, how to obtain it, no equip control.
- `OWNED`: full art and a clear `EQUIP` / `装备` action.
- `EQUIPPED`: full art, lit selection mark, and no ambiguous second state.

The player may equip one room theme and one profile frame. A default base-room
theme and default player frame always exist and can be re-equipped for free.

### First Usable Cosmetics

P1 must make these existing rewards functional:

| Collectible | Required visible result |
| --- | --- |
| `Sunset Room Theme` | Home room switches to a warm late-evening arcade background, with amber/pink ambient lamps while all gameplay UI remains readable. |
| `Forest Room Theme` | Home room switches to a neon indoor grove arcade background, with green/cyan ambient lamps while all gameplay UI remains readable. |
| `Cyan Profile Frame` | The home player card portrait receives the cyan arcade frame. It must be obvious at a glance, not a one-pixel tint. |

Equipping must update the Home screen immediately, persist after refresh, and
be visible in a demo or live slot independently.

### Shop And Ownership Rules

- `Room Theme` and `Profile Frame` shop grants must award an unowned matching
  cosmetic whenever one exists.
- Once every matching cosmetic is owned, the corresponding shop card must read
  `COMPLETE` / `已集齐` and cannot take coins for a meaningless duplicate.
- An unlock should land with a short `NEW COSMETIC` moment and point the player
  to `CUSTOMIZE ARCADE`.
- Do not add an inventory grid, loadouts, stats, or paid currency.

### Acceptance

1. Buying or pulling an eligible cosmetic creates an owned state.
2. Equipping each P1 cosmetic creates an immediately visible home-screen change.
3. Changing mode or refreshing preserves the right equipped state for that
   mode only.
4. The default look is always recoverable without spending coins.

## P1C: A Long-Term Collection Goal

P1A and P1B make the current loop honest and tangible. The following next
slice makes it durable enough for high-token users.

### Collection Target

Expand the collection from 27 items to a first-complete target of **50 items**.
Do not add near-identical recolors. New items need a room role, profile role,
or collectible story: signs, decor, buddies, frames, trophies, and themes.

### Visible Milestones

At `10`, `25`, `40`, and `50` unique discoveries, unlock one permanent arcade
display improvement. Examples: a neon shelf, prize-wall lighting tier, a floor
pedestal, and a final crown marquee. These are collection milestones, not new
currencies.

### Duplicate Direction

Duplicates may continue to accumulate dust internally, but dust must not become
a prominent visible currency until it has one simple, satisfying use. The first
candidate is a single `MISSING PRIZE` exchange that lets a player trade a fixed
amount of duplicate dust for one unowned non-legendary item. This belongs after
the cosmetic slice and must remain one clear action, not a crafting tree.

## Delivery Order

1. P1A: first-empty-scan decision and permanent demo identity.
2. P1B: customization screen, equipped persistence, functional existing
   themes/frame, and the required visual assets.
3. P1C: 50-item collection expansion and visible collection milestones.

P1A and P1B are the next implementation handoff. P1C is intentionally the
next content pass, so this release does not mix a trust fix with an oversized
asset batch.

For cosmetic visual mapping and runtime asset rules, read
`docs/P1_COSMETIC_ART_DIRECTION.md`.

Final generated background assets and their runtime mapping are in
`docs/P1_COSMETIC_GENERATED_ASSETS.md`.
