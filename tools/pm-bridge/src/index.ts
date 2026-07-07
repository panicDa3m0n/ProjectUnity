import fs from "node:fs/promises";
import path from "node:path";
import express, { Request, Response, NextFunction } from "express";
import { config, publicConfig } from "./config";
import { startAutoAudit } from "./audit";
import { getGitStatus, gitPull } from "./git";
import { runCodex, CodexRunRequest } from "./codex";
import { ensureDir } from "./logger";

const app = express();
app.use(express.json({ limit: "1mb" }));

function bearerToken(req: Request): string | undefined {
  const header = req.header("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  return match?.[1];
}

function requireToken(req: Request, res: Response, next: NextFunction) {
  if (bearerToken(req) !== config.token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}

function maybeRequireReadToken(req: Request, res: Response, next: NextFunction) {
  if (!config.requireTokenForRead) {
    next();
    return;
  }

  requireToken(req, res, next);
}

function asyncRoute(handler: (req: Request, res: Response) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res).catch(next);
  };
}

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    timestamp: new Date().toISOString(),
    config: publicConfig()
  });
});

app.get("/api/git/status", maybeRequireReadToken, asyncRoute(async (_req, res) => {
  res.json(await getGitStatus(config.repoPath));
}));

app.post("/api/git/pull", requireToken, asyncRoute(async (_req, res) => {
  res.json(await gitPull(config.repoPath));
}));

app.post("/api/codex/run", requireToken, asyncRoute(async (req, res) => {
  const body = req.body as Partial<CodexRunRequest>;
  if (typeof body.prompt !== "string" || body.prompt.trim() === "") {
    res.status(400).json({ error: "Body field 'prompt' is required." });
    return;
  }

  if (body.mode !== undefined && body.mode !== "audit" && body.mode !== "task") {
    res.status(400).json({ error: "Body field 'mode' must be 'audit' or 'task'." });
    return;
  }

  res.json(await runCodex(config, {
    prompt: body.prompt,
    mode: body.mode ?? "audit",
    allowCommit: body.allowCommit === true,
    allowPush: body.allowPush === true
  }));
}));

app.post("/api/pm/task-file", requireToken, asyncRoute(async (req, res) => {
  const prompt = typeof req.body?.prompt === "string" ? req.body.prompt.trim() : "";
  if (!prompt) {
    res.status(400).json({ error: "Body field 'prompt' is required." });
    return;
  }

  await ensureDir(config.queueDir);
  const taskFile = path.join(config.repoPath, "pm-next-task.md");
  await fs.writeFile(taskFile, `${prompt}\n`, "utf8");
  res.json({
    ok: true,
    taskFile,
    timestamp: new Date().toISOString()
  });
}));

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    error: error.message,
    timestamp: new Date().toISOString()
  });
});

async function main() {
  await Promise.all([
    ensureDir(config.logDir),
    ensureDir(config.queueDir),
    ensureDir(config.reportsDir)
  ]);

  startAutoAudit(config);

  app.listen(config.port, config.host, () => {
    console.log(`ProjectUnity PM bridge listening on http://${config.host}:${config.port}`);
  });
}

void main().catch((error) => {
  console.error("Failed to start ProjectUnity PM bridge:", error);
  process.exit(1);
});
