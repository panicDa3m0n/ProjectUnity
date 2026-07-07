# 0002 - Local Toolchain Workspace Visibility

## Status

Accepted.

## Decision

Open both `H:\ProjectUnity` and `H:\GameDev` in the local IDE workspace when Codex is expected to repair or audit the Unity toolchain.

`H:\ProjectUnity` remains the Git repository and game project workspace. `H:\GameDev` remains the local development/toolchain workspace for Unity Hub, Unity Editors, Android tooling, cache, temporary files, probe projects, and build outputs.

## Rationale

The Unity toolchain repair work needs visibility into both the game repository and local toolchain state. Keeping `H:\GameDev` visible to Codex makes installer state, logs, Android modules, probe projects, and build outputs easier to inspect without moving large machine-specific binaries into the repository.

## Consequences

- Unity Editors and Android SDK/NDK/JDK installations should remain outside Git.
- Future reports should distinguish repository changes from local machine/toolchain changes.
- `H:\GameDev\UnityProjects\UnityProbe6000` is acceptable as a temporary probe project path.
- `H:\GameDev\Builds\TheArchive` remains the Android build output target and must not be committed.
- Any Unity Hub downloads staged on `C:` should be monitored and moved to `H:` only after installers stop using them.
