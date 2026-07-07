# Phase 1G - ProjectUnity PM Bridge App

## Summary

Created a minimal local Node.js/TypeScript PM bridge under `tools/pm-bridge`. The bridge exposes local HTTP endpoints for health, Git status, guarded `git pull`, fallback PM task-file writing, and guarded Codex CLI dispatch through `codex exec`.

No gameplay, Unity game systems, Unity assets, Unity installation, or Android tooling were modified.

## Files Created

- `tools/pm-bridge/package.json`
- `tools/pm-bridge/package-lock.json`
- `tools/pm-bridge/tsconfig.json`
- `tools/pm-bridge/README.md`
- `tools/pm-bridge/.env.example`
- `tools/pm-bridge/src/index.ts`
- `tools/pm-bridge/src/config.ts`
- `tools/pm-bridge/src/git.ts`
- `tools/pm-bridge/src/codex.ts`
- `tools/pm-bridge/src/audit.ts`
- `tools/pm-bridge/src/logger.ts`
- `tools/pm-bridge/scripts/install-deps.ps1`
- `tools/pm-bridge/scripts/start-bridge.ps1`
- `tools/pm-bridge/scripts/register-task-scheduler.ps1`
- `tools/pm-bridge/scripts/unregister-task-scheduler.ps1`
- `reports/pm-bridge/.gitkeep`

## Files Updated

- `.gitignore`

Added ignores for `node_modules`, bridge build output, `pm-next-task.md`, and PM bridge runtime JSON.

## Dependencies Installed

Installed npm dependencies in `tools/pm-bridge`:

- `express`
- `dotenv`
- `typescript`
- `@types/node`
- `@types/express`

`npm install` completed successfully with 0 reported vulnerabilities.

## Build Result

Command:

```powershell
npm run build
```

Result: success.

## Smoke Test Result

Started the compiled bridge locally with:

- `PM_BRIDGE_HOST=127.0.0.1`
- `PM_BRIDGE_PORT=4387`
- a temporary non-secret smoke test token
- `PROJECTUNITY_ENABLE_AUTO_AUDIT=false`

Tested:

- `GET /health`
- `GET /api/git/status` with `Authorization: Bearer smoke-test-token`

Result: both endpoints returned valid JSON.

Smoke logs were written under `H:\GameDev\PMBridge\logs` and were not committed.

`POST /api/codex/run` was implemented but not tested with a real Codex task, per task instructions.

## Endpoint List

- `GET /health`
- `GET /api/git/status`
- `POST /api/git/pull`
- `POST /api/codex/run`
- `POST /api/pm/task-file`

Write/action endpoints require a bearer token from `PM_BRIDGE_TOKEN`. Read endpoints require a token by default except `/health`.

## How To Start

Install and build:

```powershell
.\tools\pm-bridge\scripts\install-deps.ps1
```

Start locally:

```powershell
[Environment]::SetEnvironmentVariable("PM_BRIDGE_TOKEN", "<set-a-long-random-token>", "Process")
.\tools\pm-bridge\scripts\start-bridge.ps1
```

Default URL:

```text
http://127.0.0.1:4387
```

## Scheduled Task

Scheduled task was not registered.

Scripts were added so the CEO can manually register or unregister it later:

- `tools/pm-bridge/scripts/register-task-scheduler.ps1`
- `tools/pm-bridge/scripts/unregister-task-scheduler.ps1`

## Known Limitations

- The bridge does not automate VS Code UI.
- It uses `codex exec` from the Codex CLI.
- Runtime logs are local under `H:\GameDev\PMBridge\logs`.
- Runtime JSON records under `reports/pm-bridge/` are ignored by Git by default.
- `/api/codex/run` can modify the repo when called in task mode; prompts must be reviewed carefully.
- Auto audit is read-only and does not run Codex automatically.

## Security Notes

- Keep host bound to `127.0.0.1`.
- Do not expose publicly without HTTPS, network controls, and a strong token.
- Do not commit `.env` or real tokens.
- No secrets were committed.

## Final Commit

The exact pushed commit hash is reported in the Codex final response. A Git commit cannot reliably contain its own final hash.
