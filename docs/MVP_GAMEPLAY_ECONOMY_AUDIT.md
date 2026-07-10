# MVP Gameplay And Economy Audit

Date: 2026-07-09

This document audits whether Token Arcade's first MVP loop is present and whether the current economy feels reasonable.

The first lovable version should prove:

```text
tokens -> coins -> cabinet growth -> capsule pulls -> collection
```

The game should make token usage feel rewarding, but it should not let coins become meaningless.

## Current MVP Status

### Exists

- Token usage can become global coins.
- Projects are shown as arcade cabinets.
- Projects have token-based level/stage logic.
- The capsule machine can spend coins and grant collectibles.
- Collectibles have name, rarity, type, description, count, and ownership state.
- Prize wall/display cabinet shows owned and locked items.
- Hover tooltip explains owned and locked prizes.
- Duplicate pulls increment counts and create dust/shards.
- Achievements exist as state milestones.
- Local persistence exists.
- Demo/mock mode exists.

### Still Weak Or Incomplete

- Project level display can still leak old `proj.level` values instead of computed 50-level values.
- Coins are far too abundant for the current sink prices.
- Tickets and dust appear as currencies but have little or no meaningful use yet.
- Fixed-price shop grants are too cheap relative to coin income.
- The current collectible pool is small for the amount of currency a heavy token user can mint.
- Sync reward moment needs to feel like a reward event, not only a state update.
- Achievements exist, but they are not yet strongly surfaced as collectible "achievement cards" on the home/prize wall experience.

## P1 Economy Problem: Coins Are Too Easy To Ignore

Illustrative pre-V2 balance example:

```text
300,000 coins
300,000,000 lifetime tokens
```

Current economy:

```text
1,000 tokens = 1 coin
Pull x1 = 10 coins
Pull x10 = 90 coins
Neon Sign = 50 coins
Room Theme = 250 coins
Trophy Card = 400 coins
```

This means the current player can buy:

```text
3,181 ten-pulls
715 trophy cards at 400 coins
```

That breaks the core motivation. The player does not need to choose what to spend on, and the capsule machine stops feeling like a reward sink.

## Economy Direction

Do not make the game stingy. Token Arcade should stay generous.

But the first version needs a basic economy shape:

```text
small session -> progress toward one pull
good coding session -> a few pulls
big project history -> many pulls, but not infinite
heavy user -> can buy premium rewards, but still has long-term goals
```

## Recommended Economy V2

Use this as a starting point for Claude Code to implement and tune.

### Conversion

Change the base conversion to:

```text
10,000 tokens = 1 coin
```

Rationale:

- `100K` tokens gives `10 coins`, visible progress.
- `250K` tokens gives `25 coins`, enough for one basic pull if pull cost is 25.
- `1M` tokens gives `100 coins`, enough for several pulls.
- `286M` tokens gives about `28,638 coins`, still a lot, but no longer absurd.

If this feels too slow during demo mode, increase demo token gains rather than keeping the real economy inflated.

### Pull Costs

Recommended:

```text
Pull x1 = 25 coins
Pull x10 = 225 coins
```

Rationale:

- A meaningful coding session can produce a pull.
- A large session can produce a 10-pull.
- The 10-pull discount is still clear.
- A heavy user can pull a lot, but not thousands of times immediately.

### Fixed Shop Costs

Recommended:

```text
Neon Sign = 250 coins
Profile Frame = 600 coins
Room Theme = 1,500 coins
Trophy Card = 3,000 coins
Legendary Showcase / premium decor = 8,000+ coins
```

Rationale:

- Fixed rewards should be the deliberate coin sink for users who dislike RNG.
- Higher-value cosmetics should create saving goals.
- Trophy-tier rewards should not cost less than a few 10-pulls.

### Collection Size

Current collectible count is too small for a high-token user.

Target first complete version:

```text
at least 50-60 collectible slots
```

This does not need 60 unique hand-drawn sprites immediately. It can use carefully named variants and tint variants, but the prize wall should feel like it has room to grow.

Suggested distribution:

```text
Common: 18
Uncommon: 16
Rare: 12
Epic: 8
Legendary: 6
```

### Duplicate Dust

Current dust/shards exist, but they are not satisfying unless they can do something.

For MVP, choose one:

Option A, simpler:

- Hide dust from the main UI until it has a use.
- Duplicates only increment owned count and show `xN`.

Option B, better:

- Use dust as a pity/crafting currency.
- Let the user craft a missing collectible by rarity.

Suggested craft costs:

```text
Common = 20 dust
Uncommon = 50 dust
Rare = 120 dust
Epic = 300 dust
Legendary = 800 dust
```

If Option B is too much for the first pass, use Option A.

### Tickets

Tickets currently appear as a currency but do not carry enough product meaning.

For MVP, choose one:

Option A:

- Remove/hide tickets from visible UI until a ticket sink exists.

Option B:

- Make tickets a pity meter for capsule pulls.
- Example: every 10 pulls earns 1 ticket; 10 tickets can force a Rare+ pull.

Do not show tickets prominently if the user cannot spend them.

## Reward Moment

The sync reward moment should be explicit and satisfying.

Minimum expected sync result:

```text
New tokens: +128,430
Coins minted: +12
Project level ups: PROJECT ALPHA Lv39 -> Lv40
New unlocks / achievements if any
```

The home coin bank should visually receive the coins, but the text summary also matters.

## MVP Acceptance Checklist

The first version is acceptable when:

- A fresh/demo user can sync and earn enough for at least one meaningful action.
- A heavy user cannot trivially exhaust all rewards in a few clicks.
- Coins have at least two meaningful sinks: pulls and fixed cosmetic buys.
- Any visible currency has a visible use.
- Project cabinet levels are token-derived and consistent everywhere.
- Capsule pulls feel satisfying and update the prize wall immediately.
- Prize wall tooltips make each item understandable.
- The home screen clearly shows what to do next without becoming a dashboard.

## Claude Code Prompt

Please do a PM-guided MVP gameplay/economy pass for Token Arcade.

Read first:

```text
docs/PM_PRODUCT_NORTH_STAR.md
docs/MVP_SPEC.md
docs/GAME_ECONOMY.md
docs/MVP_GAMEPLAY_ECONOMY_AUDIT.md
docs/HOME_VISUAL_REDESIGN_FROM_PROTOTYPE.md
```

Goal:

Make the MVP loop feel balanced and intentional:

```text
tokens -> coins -> cabinet growth -> capsule pulls -> collection
```

Required:

1. Rebalance the economy so coins do not become meaningless.
   - Recommended starting point: `10,000 tokens = 1 coin`.
   - Recommended pull costs: `x1 = 25`, `x10 = 225`.
   - Recommended fixed shop costs: sign `250`, frame `600`, theme `1,500`, trophy `3,000`, premium decor `8,000+`.
   - Update UI copy such as `TOKENS = 1 COIN` to match the new conversion.

2. Handle existing saved balances carefully.
   - Avoid leaving old inflated coin balances after changing conversion.
   - Either migrate/recalculate coins from current lifetime totals, or include a clear one-time reset/migration behavior for demo state.
   - Do not wipe the user's owned collectibles unless explicitly necessary.

3. Give every visible currency a purpose.
   - If tickets have no spend/use, hide them from the main UI.
   - If dust has no craft/use, hide it from the main UI.
   - If keeping dust, add a simple crafting/pity use or document why it is visible.

4. Increase long-term collection capacity.
   - Target 50-60 collectible slots for the first complete version.
   - Use careful variants/tints if needed, but make the prize wall feel like it has room to grow.

5. Improve the sync reward moment.
   - Show new tokens, coins minted, level-ups, and achievements in a clear reward summary.
   - The reward moment should feel celebratory, not like a log line.

6. Keep the product rule:
   - Do not add commits/tests/docs/PRs as scoring inputs.
   - Token usage remains the only gameplay input.
