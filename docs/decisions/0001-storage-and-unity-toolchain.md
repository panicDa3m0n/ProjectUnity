# 0001 - Storage and Unity Toolchain Location

## Status

Accepted.

## Decision

The Archive repository and Unity project live in the workspace at `H:\ProjectUnity`, with the Unity project under `H:\ProjectUnity\unity\TheArchive`.

Large toolchain, cache, temporary, and build-output data should stay on `H:`:

- Unity Hub: `H:\GameDev\UnityHub`
- Unity Editors: `H:\GameDev\UnityEditors`
- Unity caches: `H:\GameDev\UnityCaches`
- Android tooling target: `H:\GameDev\Android`
- Command-line temp path for setup runs: `H:\GameDev\Temp`
- Build outputs: `H:\GameDev\Builds`

Unity Hub may temporarily stage downloads under the user's Unity Hub application data on `C:` when unavoidable. This is acceptable only while free space remains sufficient and the staged files are cleaned or moved after installers no longer need them.

## Rationale

`C:` has limited free space and should not be used for Unity Editors, Android SDK/NDK/JDK modules, generated project caches, builds, or generated assets. `H:` is the dedicated project and development drive and has sufficient capacity for large Unity and Android artifacts.

## Consequences

- Future Codex runs should treat `H:\ProjectUnity` as the repository workspace.
- Future Unity project work should use `H:\ProjectUnity\unity\TheArchive`, not `H:\GameDev\UnityProjects\TheArchive`.
- `H:\GameDev` may be included in the local IDE workspace for Codex visibility into editors, caches, probe projects, and build output, but it remains external local toolchain state rather than repository content.
- Generated Unity folders such as `Library`, `Temp`, `Obj`, `Build`, `Builds`, `Logs`, and `UserSettings` must remain ignored by Git.
- Toolchain installers that require temporary `C:` staging should be monitored and reported, not silently allowed to fill the system drive.
