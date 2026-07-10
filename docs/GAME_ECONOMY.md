# Game Economy

## Principle

Token Arcade has exactly one external input:

```text
model tokens consumed
```

Everything else is derived from that.

The game should not reward "good work" or "real output." It rewards token spend because that is the fantasy.

## Base Conversion

Suggested starting point:

```text
1,000 tokens = 1 coin
```

Carry fractional progress forward so small sessions still feel like they are building toward the next coin.

Example:

```text
750 new tokens -> 0 coins, 750 token residue
500 new tokens later -> 1 coin, 250 token residue
```

## Project Coins

Coins come from newly discovered tokens. They can be attributed to projects for cabinet growth, but the spendable wallet can be global.

Recommended:

- project lifetime tokens determine cabinet level
- global coins are spendable anywhere
- project coin contribution can be shown as flavor

## Reward Currencies

Keep the MVP simple:

- `coins`: main spend currency
- `tickets`: optional bonus currency for special pulls

If tickets add complexity, cut them from MVP.

## Coin Sinks

### Capsule Machine

The most important sink.

Costs:

```text
Single pull: 10 coins
10-pull: 90 coins
```

Rarity table:

```text
Common: 65%
Rare: 25%
Epic: 8%
Legendary: 2%
```

Duplicate handling:

- duplicates add `shards`
- shards can later unlock fixed prizes
- if shards are too much for MVP, duplicates simply increment owned count

### Prize Wall

Fixed-cost rewards for users who dislike random pulls.

Examples:

```text
Project nameplate: 25 coins
Neon sign: 50 coins
Cabinet skin: 100 coins
Room theme: 250 coins
Legendary trophy: 1000 coins
```

### Cabinet Upgrades

Optional in MVP.

Cabinet visual level should come from project lifetime tokens. Cosmetic cabinet skins can cost coins.

## Collectible Types

Good first collectible categories:

- badges
- cabinet skins
- room themes
- neon signs
- profile titles
- avatar frames
- trophy cards

All rewards are cosmetic.

## Achievement Ideas

Achievements are secondary. Add only if easy.

Token milestones:

- First Coin: mint 1 coin
- Warm Machine: spend 10,000 tokens
- Neon Night: spend 100,000 tokens
- Million Token Club: spend 1,000,000 tokens
- Cabinet Royalty: one project reaches level 5

Arcade milestones:

- First Pull: use the capsule machine once
- Prize Wall Starter: unlock 10 collectibles
- Duplicate Luck: receive 5 duplicates
- Legendary Drop: unlock a legendary collectible

## Anti-Frustration Rules

- Show progress toward next coin.
- Show progress toward next cabinet level.
- Let the user do at least one action with mock data.
- Avoid long empty states.
- Avoid punishing users for spending tokens.
- Avoid moralizing about token use.

## Balance Philosophy

This is not a competitive game. It is a feel-good conversion layer for personal usage.

Generosity is fine.
