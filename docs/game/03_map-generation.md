# Map Generation

## Goal

The first Hospital map should prove modular navigation, room identity, incomplete information, and extraction routing. It does not need advanced procedural generation.

## First Slice Layout

- one Hospital floor
- 8 room presets
- corridor connector system
- one start point
- one normal extraction
- one locked extraction
- at least one high-risk optional branch
- no minimap

## Generation Approach

Use a conservative graph-first layout:

1. Select required room presets.
2. Build a connected room graph.
3. Place start near lower-risk rooms.
4. Place normal extraction at a reachable medium-depth point.
5. Place locked extraction on a branch or deeper route.
6. Connect rooms with corridor modules.
7. Assign loot, gems, enemies, and sound surfaces from data.

The first implementation can be deterministic with a seed and fixed room list. Randomized placement can come later after the rules are testable.

## Room Preset Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Stable room preset id. |
| `displayName` | string | yes | Human-readable room name. |
| `mapTheme` | enum | yes | `hospital` for first slice. |
| `sizeClass` | enum | yes | `small`, `medium`, `large`. |
| `connectorSockets` | list | yes | Allowed north/east/south/west corridor sockets. |
| `riskTier` | int | yes | 1 to 5 risk rating. |
| `lootTags` | list | yes | Tags used for loot placement. |
| `gemWeight` | int | yes | Relative chance for gems of the void. |
| `enemySpawnTags` | list | yes | Enemy archetype tags allowed in room. |
| `soundProfile` | string | yes | Default acoustics profile. |
| `coverNodes` | int | no | Placeholder count for hiding/line-of-sight blockers. |
| `interactionNodes` | list | no | Doors, containers, terminals, locked extraction hooks. |
| `mobileReadabilityNotes` | string | no | Notes for silhouette and camera clarity. |

## Extraction Point Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | Stable extraction id. |
| `displayName` | string | yes | In-world/system label. |
| `type` | enum | yes | `normal` or `locked`. |
| `roomTags` | list | yes | Rooms or zones where it can appear. |
| `activationSeconds` | number | yes | Time required before extraction resolves. |
| `requiresMinigame` | bool | yes | True for locked extraction placeholder. |
| `soundEventId` | string | yes | Sound emitted when extraction starts. |
| `riskTier` | int | yes | 1 to 5 extraction risk rating. |
| `botUsable` | bool | yes | Whether simulation can use it. |
| `failureBehavior` | string | no | Placeholder failure result for locked extraction. |

## First 8 Room Presets

| ID | Name | Size | Risk | Primary Use |
| --- | --- | --- | --- | --- |
| `hospital_reception` | Reception | medium | 1 | Start-adjacent orientation |
| `hospital_waiting_ward` | Waiting Ward | large | 2 | Open movement and sound learning |
| `hospital_patient_room` | Patient Room | small | 3 | Common loot and close threat |
| `hospital_operating_room` | Operating Room | medium | 5 | High-value loot and high sound risk |
| `hospital_pharmacy` | Pharmacy | small | 3 | Utilities and locked storage placeholder |
| `hospital_records_office` | Records Office | medium | 3 | Archive clue and gem chance |
| `hospital_maintenance` | Maintenance | small | 4 | Tool loot and tight traversal |
| `hospital_isolation_room` | Isolation Room | medium | 5 | Rare gem and high enemy pressure |

## Acceptance Criteria

- A generated slice map always has a connected path from start to normal extraction.
- Locked extraction is reachable but can sit on a higher-risk branch.
- Room ids and connector sockets can be validated from data.
- Map does not rely on a minimap.
- Layout supports bot path queries at room/corridor level.
