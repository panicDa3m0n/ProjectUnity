# Sound and Detection

## Goal

Sound is a core horror system. The operator should learn that every action can become information for the Archive.

The first slice needs sound as data and detection input, even if final audio clips are placeholders.

## Sound Ripple Model

Sound events are emitted by actions such as:

- walking or sprinting
- opening doors
- searching containers
- dropping items
- using tools
- firing or striking with weapons
- starting extraction
- failing locked extraction minigame placeholder

Each event creates a ripple with radius, intensity, decay, and tags. Enemies respond based on archetype hearing sensitivity and current state.

## Sound Event Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Stable sound event id. |
| `displayName` | string | yes | Debug/readable name. |
| `sourceType` | enum | yes | `movement`, `door`, `loot`, `tool`, `weapon`, `enemy`, `extraction`, `ui`. |
| `radiusMeters` | number | yes | Detection radius before modifiers. |
| `intensity` | number | yes | 0 to 1 loudness value. |
| `decaySeconds` | number | yes | How long the event remains queryable. |
| `lineOfSightModifier` | number | no | Optional modifier for open rooms. |
| `roomOcclusionModifier` | number | no | Optional modifier through walls/doors. |
| `enemyInterestTags` | list | yes | Tags used by enemy hearing logic. |
| `botVisible` | bool | yes | Whether bots can reason about it. |
| `debugColor` | string | no | Optional editor/debug visualization color. |

## Detection Rules

| Rule | First Slice Behavior |
| --- | --- |
| Vision | Enemies detect avatar inside field/range if not blocked by room geometry placeholder. |
| Hearing | Enemies receive sound events within modified radius. |
| Investigation | Enemies can move toward last sound position. |
| Escalation | Repeated loud events increase local threat pressure. |
| Forgetting | Events decay; enemies can return to patrol/search state. |

## No Minimap

The first slice should not include a minimap. Awareness should come from:

- visible room geometry
- sound ripple UI or subtle debug visualization during prototype
- enemy audio/visual cues
- remembered route
- extraction indicators only when discovered or activated

## Acceptance Criteria

- At least 6 sound event definitions exist for prototype use.
- Movement, door interaction, searching, weapon/tool use, and extraction emit distinct events.
- The Listener enemy reacts more strongly to sound than other archetypes.
- Sound events are recorded as session metrics.
- Debug visualization can be placeholder, but the underlying data must be testable.
