# ProjectUnity PM Bridge

Minimal local HTTP bridge for ProjectUnity Project Manager automation.

The bridge runs on the Windows development machine and can:

- inspect Git state for `H:\ProjectUnity`
- receive a prompt through an HTTP endpoint
- dispatch that prompt through `codex exec`
- save local logs under `H:\GameDev\PMBridge\logs`
- save lightweight execution records under `reports/pm-bridge/`
- optionally write a read-only Git status audit every 10 minutes

It does not automate the VS Code UI. It dispatches work through the Codex CLI in the same repository workspace.

## Install

From the repository root:

```powershell
.\tools\pm-bridge\scripts\install-deps.ps1
```

This runs `npm install` and builds TypeScript.

## Configure

Copy `.env.example` to `.env` only on the local machine if you want persistent local settings. Do not commit `.env`.

Set a strong token before startup. The bridge refuses to start when `PM_BRIDGE_TOKEN` is missing, empty, or equal to `change-me`, unless `PROJECTUNITY_DRY_RUN=true`.

```powershell
[Environment]::SetEnvironmentVariable("PM_BRIDGE_TOKEN", "<set-a-long-random-token>", "Process")
```

For startup at logon, store the token in a safe user environment variable or in a local uncommitted `tools/pm-bridge/.env` file. Do not commit real tokens.

Supported environment variables:

```text
PM_BRIDGE_HOST=127.0.0.1
PM_BRIDGE_PORT=4387
PM_BRIDGE_TOKEN=<set-a-long-random-token>
PM_BRIDGE_REQUIRE_TOKEN_FOR_READ=true
PROJECTUNITY_REPO=H:\ProjectUnity
PROJECTUNITY_LOG_DIR=H:\GameDev\PMBridge\logs
PROJECTUNITY_QUEUE_DIR=H:\GameDev\PMBridge\queue
PROJECTUNITY_CODEX_SANDBOX=workspace-write
PROJECTUNITY_ENABLE_AUTO_AUDIT=true
PROJECTUNITY_AUDIT_INTERVAL_MINUTES=10
PROJECTUNITY_DRY_RUN=false
```

## Start

```powershell
[Environment]::SetEnvironmentVariable("PM_BRIDGE_TOKEN", "<set-a-long-random-token>", "Process")
.\tools\pm-bridge\scripts\start-bridge.ps1
```

Default local URL:

```text
http://127.0.0.1:4387
```

## Example Requests

Health check:

```powershell
curl.exe http://127.0.0.1:4387/health
```

Git status:

```powershell
curl.exe -H "Authorization: Bearer $env:PM_BRIDGE_TOKEN" http://127.0.0.1:4387/api/git/status
```

Send a Codex audit prompt:

```powershell
curl.exe -X POST http://127.0.0.1:4387/api/codex/run `
  -H "Authorization: Bearer $env:PM_BRIDGE_TOKEN" `
  -H "Content-Type: application/json" `
  --data "{`"prompt`":`"Review the current Git status and report blockers only.`",`"mode`":`"audit`",`"allowCommit`":false,`"allowPush`":false}"
```

Send a Codex task prompt:

```powershell
curl.exe -X POST http://127.0.0.1:4387/api/codex/run `
  -H "Authorization: Bearer $env:PM_BRIDGE_TOKEN" `
  -H "Content-Type: application/json" `
  --data "{`"prompt`":`"Implement the assigned repository-only task. Do not touch Unity assets.`",`"mode`":`"task`",`"allowCommit`":false,`"allowPush`":false}"
```

Write a fallback task file without running Codex:

```powershell
curl.exe -X POST http://127.0.0.1:4387/api/pm/task-file `
  -H "Authorization: Bearer $env:PM_BRIDGE_TOKEN" `
  -H "Content-Type: application/json" `
  --data "{`"prompt`":`"Next Project Manager task text here.`"}"
```

## Scheduled Start

The scheduled task is not registered automatically.

Before registering it, make sure `PM_BRIDGE_TOKEN` is available to the scheduled process through a safe user environment variable or a local uncommitted `.env` file. The task will fail fast if the token is missing.

To register bridge startup at user logon, run manually:

```powershell
.\tools\pm-bridge\scripts\register-task-scheduler.ps1
```

To remove it:

```powershell
.\tools\pm-bridge\scripts\unregister-task-scheduler.ps1
```

## Security

- Keep `PM_BRIDGE_HOST=127.0.0.1`.
- Do not expose this bridge publicly without HTTPS, network controls, and a strong token.
- Do not store a real token in Git.
- Do not commit logs from `H:\GameDev\PMBridge`.
- Runtime JSON files under `reports/pm-bridge/` are ignored by Git by default.

## Limitations

- This does not type into VS Code or control the editor UI.
- This uses Codex CLI through `codex exec`.
- `/api/codex/run` can modify files when `mode` is `task`; review prompts carefully.
- Auto audit is read-only for Git and never runs Codex automatically.
