# Phase 1H - PM Bridge Token Handling Hardening

## Summary

Hardened the PM Bridge so it refuses to start without a real `PM_BRIDGE_TOKEN`, unless `PROJECTUNITY_DRY_RUN=true` is explicitly set. No Unity files, gameplay systems, or assets were touched.

## Files Changed

- `tools/pm-bridge/src/config.ts`
- `tools/pm-bridge/README.md`
- `tools/pm-bridge/scripts/start-bridge.ps1`
- `tools/pm-bridge/scripts/register-task-scheduler.ps1`
- `reports/codex-runs/phase-1h-pm-bridge-hardening.md`

## Behavior Changes

- Missing, empty, or `change-me` `PM_BRIDGE_TOKEN` now causes startup failure.
- `PROJECTUNITY_DRY_RUN=true` is the only tokenless startup bypass.
- `/health` is only available if the server starts successfully.
- `/health` now reports whether dry-run token bypass is active.
- `start-bridge.ps1` fails early with a clear token setup message.
- Scheduler registration script now documents that the token must be available from a safe user environment variable or an uncommitted `.env`.
- README now states that a real token is mandatory before normal startup.

## Verification

Ran:

```powershell
npm run build
```

Result: success.

Additional smoke checks:

- Startup without `PM_BRIDGE_TOKEN` and with `PROJECTUNITY_DRY_RUN=false` fails with the expected error.
- Startup without a real token and with `PROJECTUNITY_DRY_RUN=true` succeeds; `GET /health` returns valid JSON.

No real Codex task was run through `/api/codex/run`.

## Known Limitations

- The bridge still depends on the caller to store `PM_BRIDGE_TOKEN` securely.
- Scheduled task registration remains manual.
- Runtime logs remain local under `H:\GameDev\PMBridge\logs` and are not committed.

## Commit

The exact pushed commit hash is reported in the Codex final response.
