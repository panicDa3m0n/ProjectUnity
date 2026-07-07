# Design Pillars

## Identity

The Archive is an Android-first free-to-play extraction horror game. The first production direction is top-down 3D with an orthographic camera, mobile-readable silhouettes, and sessions capped at 15 minutes.

The player is addressed as an external human connecting into a hostile archive-like system through an avatar. UI, prompts, mission language, and failure states should preserve that distance. The avatar can be damaged, lost, or extracted; the human operator is being observed, tested, and manipulated by the Archive.

## Pillars

| Pillar | Meaning | Vertical Slice Requirement |
| --- | --- | --- |
| External operator | The player is not just the character; they are a human interfacing with a hostile system. | Lobby and mission copy address the operator directly. |
| Tension over spectacle | Fear comes from uncertainty, sound, pursuit, limited time, and costly decisions. | No arcade pacing, score-chasing, or kill-feed language. |
| Extraction pressure | Every run asks whether the operator should push deeper or leave with what they have. | Gems, loot, timer, and extraction points are present in the first slice. |
| Incomplete information | The player should never have perfect map or enemy certainty. | No minimap; room awareness comes from sight, sound ripples, and memory. |
| Sound as system | Noise is both feedback and risk. | Sound events have radius, intensity, decay, and detection impact. |
| Modular spaces | Maps are assembled from readable room and corridor modules. | Hospital is the first map, one floor, 8 room presets, corridor connector system. |
| Tactical combat | Combat is deliberate, risky, and resource-sensitive. | Weapons/tools have clear tradeoffs; fighting is not the main reward loop. |
| Bot-compatible logic | Session rules should work for future bots and multiplayer. | Vertical slice systems must be deterministic enough for simulation. |

## Tone Rules

- Use psychological, clinical, archival, and systemic language.
- Avoid arcade terms such as kill streak, headshot bonus, arena, round winner, or PvP domination.
- Treat enemies as archive manifestations, patients, staff echoes, or corrupted procedures rather than simple targets.
- Treat gems of the void as anomalous objectives, not generic currency pickups.
- Make success feel like survival and recovery, not conquest.

## First Slice North Star

A 10 to 15 minute mobile session where the operator enters a one-floor hospital fragment, navigates rooms without a minimap, creates and interprets sound, recovers gems of the void, avoids or tactically handles three enemy types, and extracts through either a normal exit or a locked exit with a placeholder minigame.

## Non-Negotiables

- Android-first UX and performance.
- Top-down 3D / orthographic readability.
- Session cap: 15 minutes maximum.
- Hospital first.
- No final marketplace, paid monetization, real account backend, or real multiplayer in the first slice.
- No final art requirement; placeholder visuals are acceptable if readable.
