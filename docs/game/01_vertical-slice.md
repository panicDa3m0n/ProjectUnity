# Vertical Slice

## Purpose

The first playable vertical slice proves the core extraction horror loop without solving the full production game. It should demonstrate that The Archive can create tension through incomplete information, modular map traversal, sound risk, limited resources, gems of the void, and extraction decisions on Android.

## Slice Scope

| Area | Requirement |
| --- | --- |
| Lobby | Archive lobby, mission launch, post-run result summary |
| Map | Hospital, one floor |
| Session length | 15 minutes maximum |
| Camera | Top-down 3D, preferably orthographic |
| Rooms | 8 room presets |
| Layout | Corridor connector system |
| Extractions | 1 normal extraction, 1 locked extraction with placeholder minigame |
| Enemies | 3 archetypes |
| Loot | 8 loot items |
| Gems | 12 gems of the void |
| Weapons/tools | 3 weapons/tools |
| Utilities | 5 utility items |
| Simulation | Bot-compatible session simulation |

## First Slice Content

### Lobby: Archive

The lobby is not a social hub yet. It is an operator interface into the Archive.

Required functions:

- show operator status
- show current loadout
- launch Hospital session
- show recovered loot and gems after extraction
- show lost carried items after avatar loss
- display short system messages addressed to the external human

Placeholder acceptable:

- flat UI
- temporary icons
- simple loadout list
- local-only inventory values

### Hospital Map

The Hospital is a one-floor modular map built from 8 room presets and corridor connectors. The first goal is readability and tension, not advanced procedural novelty.

Required room presets:

| Room Preset | Purpose | Risk Profile |
| --- | --- | --- |
| Reception | Initial orientation and low-value loot | Low |
| Waiting Ward | Open sightlines, sound learning | Low-medium |
| Patient Room | Common loot and hiding geometry | Medium |
| Operating Room | High-value loot, high sound risk | High |
| Pharmacy | Utility loot, locked container placeholder | Medium |
| Records Office | Archive clues and gem chance | Medium |
| Maintenance | Tool loot, narrow movement | Medium-high |
| Isolation Room | Enemy pressure and rare gem chance | High |

### Extractions

| Extraction | Behavior |
| --- | --- |
| Normal extraction | Available after short activation delay, creates audible extraction signal |
| Locked extraction | Requires placeholder minigame interaction, higher risk, may offer safer route after completion |

### Enemy Archetypes

| Enemy | Role |
| --- | --- |
| Listener | Reacts strongly to sound, teaches noise discipline |
| Drifter | Patrols and searches, creates route pressure |
| Warden | Slow, dangerous area denial enemy for high-value rooms |

### Loot, Gems, and Tools

The slice includes:

- 8 loot items for recovery/economy testing
- 12 gems of the void as core objective variants
- 3 weapons/tools for tactical choices
- 5 utility items for survival and extraction decisions

## Explicitly Not In First Slice

- no real marketplace
- no real multiplayer yet
- no paid monetization
- no advanced procedural generation
- no final art
- no account backend
- no server-authoritative economy
- no ranked PvP
- no full seasonal content
- no final enemy roster

## Acceptance Criteria

### Playable

- The operator can start in the Archive lobby and enter the Hospital.
- A one-floor Hospital layout can be generated or assembled from 8 room presets.
- The avatar can move through rooms and corridors with a top-down camera.
- Loot and gems can be collected.
- At least one enemy can threaten the avatar in a readable way for each archetype.
- The operator can extract through the normal extraction.
- The locked extraction can be activated through a placeholder minigame flow.
- A run can end by extraction, avatar loss, or timer expiration.

### Measurable

- session duration
- extraction success/failure
- gems recovered
- loot recovered
- enemies encountered
- sound events emitted
- enemy detections triggered by sound
- damage taken
- utility items used
- extraction type used

### Testable

- room preset data validates required fields
- layout has connected start and extraction paths
- no minimap is present
- sound events produce detection inputs
- enemies can run under bot-compatible simulation input
- timer ends session at or before 15 minutes

### Placeholder Allowed

- visuals
- audio clips
- locked extraction minigame
- lobby UI styling
- enemy animation
- economy values
- bot behavior sophistication
