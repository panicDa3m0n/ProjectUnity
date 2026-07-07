import path from "node:path";
import { BridgeConfig } from "./config";
import { getGitStatus, gitFetch } from "./git";
import { timestampId, writeJsonFile } from "./logger";

export async function runGitAudit(config: BridgeConfig) {
  const fetch = await gitFetch(config.repoPath);
  const status = await getGitStatus(config.repoPath);
  const snapshot = {
    timestamp: new Date().toISOString(),
    fetch: {
      exitCode: fetch.exitCode,
      stdout: fetch.stdout,
      stderr: fetch.stderr
    },
    status
  };

  await writeJsonFile(path.join(config.reportsDir, "latest-status.json"), snapshot);
  await writeJsonFile(path.join(config.reportsDir, "history", `status-${timestampId()}.json`), snapshot);
  return snapshot;
}

export function startAutoAudit(config: BridgeConfig): NodeJS.Timeout | undefined {
  if (!config.enableAutoAudit) {
    return undefined;
  }

  const intervalMs = config.auditIntervalMinutes * 60 * 1000;
  void runGitAudit(config).catch((error) => {
    console.error("Initial PM bridge auto-audit failed:", error);
  });

  return setInterval(() => {
    void runGitAudit(config).catch((error) => {
      console.error("PM bridge auto-audit failed:", error);
    });
  }, intervalMs);
}
