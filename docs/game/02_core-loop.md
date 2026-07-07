# Core Loop

## Session Loop

1. The external human enters the Archive lobby.
2. The operator chooses a minimal loadout.
3. The operator connects an avatar to the Hospital fragment.
4. The avatar searches rooms for gems of the void, loot, tools, and extraction information.
5. Movement, interaction, combat, and mistakes create sound ripples.
6. Enemies interpret sight and sound and pressure the route.
7. The operator decides whether to push for more value or extract.
8. The run ends by extraction, avatar loss, or the 15 minute session cap.
9. The Archive returns a result summary: recovered, lost, observed, and unresolved.

## Decision Pressure

The core question is not "can I clear the map?" It is "how much can I risk before the Archive understands me?"

| Pressure | Source | Intended Effect |
| --- | --- | --- |
| Time | 15 minute maximum session | Forces routing decisions |
| Inventory | limited carry space placeholder | Forces value comparison |
| Sound | footsteps, doors, tools, combat | Makes action costly |
| Vision | top-down local visibility only | Preserves uncertainty |
| Enemy memory | enemies investigate recent events | Punishes careless repetition |
| Extraction | normal vs locked extraction | Creates route and risk choice |

## Run Outcomes

| Outcome | Meaning |
| --- | --- |
| Clean extraction | Avatar leaves with carried gems and loot |
| Damaged extraction | Avatar leaves but cost metrics are recorded |
| Avatar loss | Carried items are lost in local prototype rules |
| Timeout | Archive overwhelms the avatar; run fails |
| Abort placeholder | Developer/debug-only ending for testing |

## Bot-Compatible Simulation

The first slice should be playable by a simple bot controller later. Systems should expose clear state and deterministic actions:

- current room
- known exits
- visible loot
- visible threats
- recent sound events
- carried value
- health/risk state
- extraction route knowledge

Bot logic can remain placeholder, but session rules must not depend on human-only UI assumptions.

## Acceptance Criteria

- A complete session can be represented as a deterministic state flow.
- Start, collect, encounter, extract, fail, and timeout events are recordable.
- The loop works without real account backend, real multiplayer, or marketplace.
- The operator language remains distinct from avatar state.
