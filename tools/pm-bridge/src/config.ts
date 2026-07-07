import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

export interface BridgeConfig {
  host: string;
  port: number;
  token: string;
  requireTokenForRead: boolean;
  repoPath: string;
  logDir: string;
  queueDir: string;
  codexSandbox: string;
  enableAutoAudit: boolean;
  auditIntervalMinutes: number;
  dryRun: boolean;
  reportsDir: string;
}

function boolFromEnv(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value.trim() === "") {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function intFromEnv(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const config: BridgeConfig = {
  host: process.env.PM_BRIDGE_HOST ?? "127.0.0.1",
  port: intFromEnv(process.env.PM_BRIDGE_PORT, 4387),
  token: process.env.PM_BRIDGE_TOKEN ?? "change-me",
  requireTokenForRead: boolFromEnv(process.env.PM_BRIDGE_REQUIRE_TOKEN_FOR_READ, true),
  repoPath: process.env.PROJECTUNITY_REPO ?? "H:\\ProjectUnity",
  logDir: process.env.PROJECTUNITY_LOG_DIR ?? "H:\\GameDev\\PMBridge\\logs",
  queueDir: process.env.PROJECTUNITY_QUEUE_DIR ?? "H:\\GameDev\\PMBridge\\queue",
  codexSandbox: process.env.PROJECTUNITY_CODEX_SANDBOX ?? "workspace-write",
  enableAutoAudit: boolFromEnv(process.env.PROJECTUNITY_ENABLE_AUTO_AUDIT, true),
  auditIntervalMinutes: intFromEnv(process.env.PROJECTUNITY_AUDIT_INTERVAL_MINUTES, 10),
  dryRun: boolFromEnv(process.env.PROJECTUNITY_DRY_RUN, false),
  reportsDir: path.join(process.env.PROJECTUNITY_REPO ?? "H:\\ProjectUnity", "reports", "pm-bridge")
};

export function publicConfig() {
  return {
    host: config.host,
    port: config.port,
    repoPath: config.repoPath,
    logDir: config.logDir,
    queueDir: config.queueDir,
    codexSandbox: config.codexSandbox,
    enableAutoAudit: config.enableAutoAudit,
    auditIntervalMinutes: config.auditIntervalMinutes,
    dryRun: config.dryRun,
    requireTokenForRead: config.requireTokenForRead,
    tokenConfigured: config.token.length > 0 && config.token !== "change-me"
  };
}
