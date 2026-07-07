# Combat and Risk

## Goal

Combat should be tactical, costly, and avoidable. The first slice must prove that the avatar can defend itself, but it should not become an arcade shooter or PvP arena.

## Combat Principles

- Fighting is a risk management tool, not the main reward source.
- Every weapon/tool has a sound or resource tradeoff.
- Enemies are dangerous enough that avoidance, distraction, and extraction remain valid.
- Damage and detection should be readable on mobile.
- Combat must work in top-down orthographic view without precision shooter controls.

## First Slice Combat Model

| Element | Slice Requirement |
| --- | --- |
| Health | Simple avatar health value. |
| Damage | Enemy contact/attack damage and tool/weapon damage. |
| Cooldowns | Tools/weapons have basic cooldowns. |
| Noise | Attacks or tool use emit sound events. |
| Recovery | Bandage utility item restores small health amount. |
| Escape | Door wedge, noise disc, and sedative mist support non-lethal play. |

## Risk Budget

The operator should evaluate:

- health remaining
- carried gem value
- enemy pressure
- distance to extraction
- sound created by next action
- time remaining
- utility count

## Acceptance Criteria

- The player can survive without killing every enemy.
- Combat creates measurable sound and risk.
- At least one tool supports avoidance rather than damage.
- Enemy defeat, escape, and extraction are all valid outcomes.
- No PvP-specific combat systems are required in the first slice.
