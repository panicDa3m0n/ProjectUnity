# Mobile UX

## Goal

The first slice must be readable and playable on Android. The game can be visually placeholder, but controls, camera, UI hierarchy, and feedback must respect mobile constraints.

## Camera

- top-down 3D
- preferably orthographic
- stable framing
- no fast camera shake
- room geometry readable at phone scale
- enemy silhouettes and hazards readable without final art

## Controls

| Control | Slice Direction |
| --- | --- |
| Movement | Virtual stick or drag movement placeholder. |
| Interact | Context button for loot, doors, extraction, and minigame placeholder. |
| Tool/weapon | 1 to 3 quick slots. |
| Inventory | Compact carried item list. |
| Extraction | Clear activation prompt and timer. |

## Information Design

No minimap in the first slice. Replace it with:

- discovered room memory through layout familiarity
- extraction signal once found/activated
- sound ripple feedback
- enemy cues
- time remaining
- carried value summary

## Mobile Readability Rules

- Use high contrast placeholders.
- Keep text short and operator-facing.
- Do not cover the avatar or immediate threat area with UI.
- Avoid tiny item icons as the only identifier.
- Use stable buttons and avoid accidental taps.
- Keep room exits visually clear.

## Acceptance Criteria

- Core session can be played with touch controls.
- UI shows health/risk, time, carried gems/loot, and current quick slots.
- No minimap is present.
- Sound and extraction feedback are visible or audible enough for testing.
- Placeholder visuals are acceptable if the game remains readable.
