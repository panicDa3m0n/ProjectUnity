# Technical Stack

## Core Stack

- Engine: Unity 6+
- Target platform: Android first
- Rendering: Universal Render Pipeline for mobile
- Camera: top-down 3D, preferably orthographic
- Code: C#
- IDE: Visual Studio Code with Codex
- Version control: Git and Git LFS
- Unity project folder: `unity/TheArchive/`

## Planned Tooling

- Unity MCP is planned for future editor automation and safer Unity-side validation.
- Validation scripts should live under `tools/validation/`.
- Asset pipeline tools should live under `tools/asset-pipeline/`.
- Build tools should live under `tools/build/`.
- Codex run reports should be written to `reports/codex-runs/`.

## Architecture Direction

Runtime scripts should live under `Assets/_Project/Scripts/` once the Unity project exists. Prefabs should live under `Assets/_Project/Prefabs/`, ScriptableObjects and data under `Assets/_Project/Data/`, and prototype visuals under `Assets/_Project/Prototype/`.

Gameplay logic should remain separate from presentation. Session logic should not depend on future multiplayer transport. Economy-sensitive state should be designed with future server authority in mind and should not trust final production inventory decisions to the client.
