# MVP Spec

## Goal

Build the smallest local-first version that proves the core loop:

```text
tokens -> coins -> arcade reward -> visible collection
```

## Main Screens

### Arcade Room

The default screen.

It should show:

- total coin balance
- total lifetime tokens
- project arcade cabinets
- capsule machine
- prize wall preview
- sync/collect action

The arcade room should be visually dominant. Stats should support the room, not replace it.

### Project Cabinets

Each project appears as an arcade cabinet.

Minimum cabinet data:

- project name
- provider/source if known
- lifetime tokens
- coins generated
- cabinet level

Cabinet levels can be based only on lifetime project tokens.

Suggested level thresholds:

```text
Level 1: 0 tokens
Level 2: 10,000 tokens
Level 3: 100,000 tokens
Level 4: 1,000,000 tokens
Level 5: 10,000,000 tokens
```

Higher-level cabinets should look more impressive.

### Coin Drop / Sync Moment

When new tokens are discovered, show a short reward moment:

```text
New tokens: 128,430
Coins minted: +128
Bonus tickets: +3
```

The exact animation is an implementation choice, but the feeling matters: coins should feel earned and collected.

### Capsule Machine

The first coin sink.

Minimum behavior:

- spend coins
- receive a collectible
- rarity reveal
- duplicate handling
- collection updates immediately

Suggested cost:

```text
1 pull = 10 coins
10-pull = 90 coins
```

### Prize Wall

Shows unlocked collectibles.

Minimum collectible fields:

- id
- name
- rarity
- type
- unlocked count
- first unlocked date

## Data Sources

The app should aim to read local token usage from Claude Code and Codex history. Other providers can come later.

If local data is missing, unreadable, or unsupported, the MVP must still provide a mock/demo data mode. The game loop should be testable without real history.

## Persistence

Persist locally:

- token usage cursor or snapshot
- lifetime tokens by project
- total coins earned
- current coin balance
- unlocked collectibles
- cabinet levels
- settings

The product should avoid double-counting the same tokens after repeated syncs.

## Out Of Scope For MVP

- full chat transcript viewer
- AI-generated summaries
- commits/tests/docs/PR scoring
- multiplayer
- leaderboards
- cloud sync
- real-money currency
- combat mechanics
- complex idle simulation
- project quality scoring

## MVP Success Criteria

- The app can run with mock data.
- A user can collect coins after a sync.
- A user can spend coins and unlock a collectible.
- Projects are visible as arcade cabinets.
- Closing and reopening preserves the collection and coin balance.
