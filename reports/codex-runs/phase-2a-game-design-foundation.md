# Phase 2A - Game Design Foundation and Vertical Slice Spec

## Summary

Created the foundational design documentation for the first playable vertical slice of The Archive. The docs preserve the CEO vision and define the Hospital slice scope, core loop, modular map direction, sound/detection model, enemy archetypes, items/gems, combat risk, economy placeholders, bot/multiplayer constraints, and mobile UX requirements.

No Unity installation, Unity Editor, gameplay code, assets, or PM bridge files were touched.

## Files Created

- `docs/game/00_design-pillars.md`
- `docs/game/01_vertical-slice.md`
- `docs/game/02_core-loop.md`
- `docs/game/03_map-generation.md`
- `docs/game/04_sound-and-detection.md`
- `docs/game/05_enemy-archetypes.md`
- `docs/game/06_items-and-gems.md`
- `docs/game/07_combat-and-risk.md`
- `docs/game/08_progression-and-economy.md`
- `docs/game/09_multiplayer-and-bots.md`
- `docs/game/10_mobile-ux.md`
- `reports/codex-runs/phase-2a-game-design-foundation.md`

## Key Decisions Captured

- Android-first F2P extraction horror.
- Top-down 3D / orthographic camera direction.
- 15 minute maximum sessions.
- The player is addressed as an external human operator, not only the avatar.
- Hospital is the first modular map.
- No minimap; incomplete information and sound ripples drive awareness.
- Gems of the void are the core objective.
- Combat is tactical and risky, not arcade PvP.
- First slice is bot-compatible but not real multiplayer.

## Vertical Slice Scope

- Lobby: Archive.
- One Hospital map, one floor.
- 8 room presets.
- Corridor connector system.
- 1 normal extraction.
- 1 locked extraction with minigame placeholder.
- 3 enemy archetypes.
- 8 loot items.
- 12 gems.
- 3 weapons/tools.
- 5 utility items.
- Bot-compatible session simulation.

## Explicitly Out Of Scope

- Real marketplace.
- Real multiplayer.
- Paid monetization.
- Advanced procedural generation.
- Final art.
- Account backend.

## Data Tables Added

- Room preset fields.
- Extraction point fields.
- Sound event fields.
- Enemy fields.
- Loot item fields.
- Gem fields.

## Verification

Reviewed created Markdown files for requested scope and acceptance criteria. No code build or Unity validation was required because this task is documentation-only.

## Known Limitations

- Values are design-level placeholders, not final balance.
- No ScriptableObject schemas or gameplay implementation exist yet.
- No Unity scene or prefab changes were made.

## Recommended Next Step

Create the initial data schema plan for the vertical slice, mapping these docs into Unity ScriptableObject definitions and validation rules before gameplay implementation begins.

## Commit

The exact pushed commit hash is reported in the Codex final response.
