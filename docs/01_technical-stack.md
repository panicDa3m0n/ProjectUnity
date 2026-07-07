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

## Phase 1 Toolchain Audit

- Repository path: `H:\ProjectUnity`
- Unity project path: `H:\ProjectUnity\unity\TheArchive`
- Unity Hub: `3.19.3`, installed at `H:\GameDev\UnityHub`
- Unity Editor: `6000.5.2f1`, installed at `H:\GameDev\UnityEditors\6000.5.2f1`
- Unity Editor install root configured in Hub: `H:\GameDev\UnityEditors`
- Session temp path used for command-line operations: `H:\GameDev\Temp`
- Build output target path: `H:\GameDev\Builds`
- URP package target: `com.unity.render-pipelines.universal` `17.5.0`
- Android modules status: blocked. Android Build Support installer left an incomplete `AndroidPlayer` directory without `SDK`, `NDK`, `OpenJDK`, or `UnityEditor.Android.Extensions.dll`; the incomplete directory was preserved as `H:\GameDev\UnityEditors\6000.5.2f1\Editor\Data\PlaybackEngines\AndroidPlayer.incomplete-20260707`.
- Unity Package Manager status: blocked during project validation. Batch Editor launches stop at `project:resolve-packages`, so the Bootstrap scene generation method did not run.
- Unity MCP status: not installed or not discoverable in the project/package metadata during Phase 1.
