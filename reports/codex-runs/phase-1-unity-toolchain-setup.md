# Phase 1 - Unity Toolchain Setup

## Summary

Phase 1 is partially complete. Unity Hub and Unity Editor 6000.5.2f1 are installed on `H:`, and the Unity project folder exists at the repo-approved path `H:\ProjectUnity\unity\TheArchive`. Android support and Unity validation are blocked by an incomplete Android module install and a Unity Package Manager resolve hang.

## Repository and Storage

- Current repo path: `H:\ProjectUnity`
- Repo drive: `H:`
- Approved Unity project path: `H:\ProjectUnity\unity\TheArchive`
- Incorrect temporary project path created earlier from the original task text: `H:\GameDev\UnityProjects\TheArchive`
- Initial disk free space observed: `C:` about 48.45 GB free, `H:` about 1634 GB free
- Lowest `C:` free space observed during installs: about 31.59 GB free
- Final disk free space observed after moving Unity Hub downloads: `C:` 42.20 GB free, `H:` 1619.64 GB free
- Unity Hub download staging on `C:` was emptied after installers stopped.
- Preserved Unity Hub downloads on `H:`: `H:\GameDev\UnityCaches\UnityHubDownloads\20260707`, about 5.45 GB across 7 files

## Created Toolchain Folders

- `H:\GameDev\UnityEditors`
- `H:\GameDev\UnityProjects`
- `H:\GameDev\UnityCaches`
- `H:\GameDev\Android`
- `H:\GameDev\Temp`
- `H:\GameDev\Builds`

`H:\GameDev` is toolchain/cache/build storage only. The project workspace is `H:\ProjectUnity`.

## Unity Hub

- Unity Hub version: `3.19.3`
- Unity Hub path: `H:\GameDev\UnityHub\Unity Hub.exe`
- Editor install location configured for Hub: `H:\GameDev\UnityEditors`

## Unity Editor

- Unity Editor version: `6000.5.2f1`
- Unity Editor path: `H:\GameDev\UnityEditors\6000.5.2f1\Editor\Unity.exe`
- Version command result: `6000.5.2f1`
- Install source: Unity Hub downloads/direct installer

## Android Modules

Status: blocked.

Expected modules:

- Android Build Support
- Android SDK and NDK Tools
- OpenJDK

Observed result:

- `H:\GameDev\UnityEditors\6000.5.2f1\Editor\Data\PlaybackEngines\AndroidPlayer` was created but did not contain `SDK`, `NDK`, `OpenJDK`, or `UnityEditor.Android.Extensions.dll`.
- Unity Hub refused module installation because the Editor was installed through the direct Editor installer after Hub CLI download/install instability.
- The incomplete Android module directory was preserved as `H:\GameDev\UnityEditors\6000.5.2f1\Editor\Data\PlaybackEngines\AndroidPlayer.incomplete-20260707` so Unity would not try to load a broken platform module.

## Unity Project

- Project path: `H:\ProjectUnity\unity\TheArchive`
- Unity version file updated to `6000.5.2f1 (eb73d3b415a1)`
- URP dependency added in `Packages/manifest.json`: `com.unity.render-pipelines.universal` `17.5.0`
- Editor generation script added: `Assets/_Project/Scripts/Editor/BootstrapSceneGenerator.cs`

The intended scene is `Assets/_Project/Scenes/Bootstrap.unity`, with an orthographic top-down camera, floor plane, capsule placeholder player, directional light, and mobile-friendly starting settings. Unity did not reach the `BootstrapSceneGenerator.Generate` method because Package Manager resolution hung first, so the scene file was not created in this run.

## Validation

- Unity project creation: completed.
- Unity batch open: blocked. Unity starts but stalls during package resolution.
- Unity Package Manager log last stable point: `project:resolve-packages <-- Request received`.
- Compile errors: no C# compile errors were reached or reported; validation did not progress far enough to prove a clean compile.
- Android platform target: not set because Android platform support is not installed.
- Android development build: not attempted because Android SDK/NDK/JDK and Android Build Support are missing.

## Unity AI / MCP

Status: not installed or not discoverable.

No Unity MCP package or Unity AI/MCP project metadata was found during the Phase 1 search. No subscription/login-gated setup was forced.

## Screenshots and Logs

- Unity generation logs:
  - `H:\GameDev\Temp\unity-generate-bootstrap.log`
  - `H:\GameDev\Temp\unity-generate-bootstrap-2.log`
  - `H:\GameDev\Temp\unity-generate-bootstrap-3.log`
  - `H:\GameDev\Temp\unity-generate-bootstrap-4.log`
- Unity Package Manager log: `H:\ProjectUnity\unity\TheArchive\Logs\upm.log`
- Screenshots: not captured. The Editor did not open to a stable validated project state, and Android settings were unavailable because Android modules are missing.

## Problems Encountered

- Unity Hub CLI had instability during Editor/module installation in this shell.
- Direct Editor install succeeded on `H:`, but Hub module install then refused to attach Android modules because the Editor was not recognized as Hub-installed.
- Direct Android Build Support installer produced an incomplete `AndroidPlayer` folder.
- Unity Package Manager hangs resolving project packages before Editor automation can run.
- A temporary project was initially created under `H:\GameDev\UnityProjects\TheArchive` from the original task path. The repo-approved project path is now `H:\ProjectUnity\unity\TheArchive`.

## Files Changed

- `.codex/config.toml`
- `docs/01_technical-stack.md`
- `docs/decisions/0001-storage-and-unity-toolchain.md`
- `reports/codex-runs/phase-1-unity-toolchain-setup.md`
- `unity/TheArchive/Packages/manifest.json`
- `unity/TheArchive/ProjectSettings/ProjectVersion.txt`
- `unity/TheArchive/Assets/_Project/Scripts/Editor/BootstrapSceneGenerator.cs`

## Recommended Next Step

Repair the Unity installation through Unity Hub so the Editor is recognized as Hub-installed, then install Android Build Support, Android SDK/NDK Tools, and OpenJDK from Hub. After that, reopen `H:\ProjectUnity\unity\TheArchive`, let Package Manager resolve URP, run `BootstrapSceneGenerator.Generate`, set Android as the active platform, and attempt a development build.
