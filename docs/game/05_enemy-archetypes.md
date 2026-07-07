# Enemy Archetypes

## Goal

Enemies should create psychological and tactical pressure rather than arcade combat targets. The first slice uses three archetypes with clear roles and data fields suitable for bot-compatible simulation.

## Enemy Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Stable enemy archetype id. |
| `displayName` | string | yes | Debug/readable name. |
| `role` | enum | yes | `listener`, `patrol`, `warden`. |
| `health` | number | yes | Prototype durability. |
| `moveSpeed` | number | yes | Standard movement speed. |
| `chaseSpeed` | number | yes | Speed when alerted. |
| `visionRange` | number | yes | Sight detection range. |
| `hearingSensitivity` | number | yes | Multiplier for sound event radius. |
| `damage` | number | yes | Damage to avatar on hit/contact. |
| `attackCooldown` | number | yes | Seconds between attacks. |
| `preferredRooms` | list | yes | Room tags where enemy can spawn or patrol. |
| `investigationSeconds` | number | yes | Time spent investigating sound. |
| `botThreatWeight` | number | yes | Simulation risk rating. |

## First Slice Archetypes

| ID | Name | Role | Behavior |
| --- | --- | --- | --- |
| `enemy_listener` | Listener | Sound hunter | Low vision confidence, high hearing sensitivity, investigates sound aggressively. |
| `enemy_drifter` | Drifter | Patrol/search | Patrols corridors and rooms, reacts moderately to sight and sound. |
| `enemy_warden` | Warden | Area denial | Slow, dangerous, guards high-value rooms or extraction-adjacent branches. |

## Behavioral States

| State | Meaning |
| --- | --- |
| Dormant | Not active or waiting for trigger. |
| Patrol | Moving between room/corridor nodes. |
| Investigate | Moving toward last sound event. |
| Search | Looking near a lost target or sound area. |
| Chase | Avatar detected with high confidence. |
| Attack | In range and able to damage avatar. |
| Return | Returning to assigned route or room. |

## Acceptance Criteria

- Each archetype has distinct detection and movement behavior.
- All archetypes can be represented by data and state machine rules.
- Enemies can be simulated without relying on final animations.
- Combat with enemies is possible but risky and not the main objective.
- Session metrics record encounters, detections, and damage events.
