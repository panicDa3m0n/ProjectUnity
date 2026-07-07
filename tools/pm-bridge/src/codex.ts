import crypto from "node:crypto";
import path from "node:path";
import { BridgeConfig } from "./config";
import { getGitStatus, runCommand } from "./git";
import { promptPreview, tail, timestampId, writeJsonFile, writeTextFile } from "./logger";

export interface CodexRunRequest {
  prompt: string;
  mode?: "audit" | "task";
  allowCommit?: boolean;
  allowPush?: boolean;
}

export async function runCodex(config: BridgeConfig, request: CodexRunRequest) {
  const prompt = request.prompt.trim();
  if (!prompt) {
    throw new Error("Prompt is required.");
  }

  const before = await getGitStatus(config.repoPath);
  if (before.hasMergeConflicts) {
    throw new Error("Refusing Codex run: merge conflicts are present.");
  }

  const mode = request.mode ?? "audit";
  const instructions: string[] = [prompt];

  if (mode === "audit") {
    instructions.push("Audit only. Do not modify files. Do not commit. Do not push.");
  }

  if (request.allowCommit !== true) {
    instructions.push("Do not commit.");
  }

  if (request.allowPush !== true) {
    instructions.push("Do not push.");
  }

  const finalPrompt = instructions.join("\n\n");
  const runId = `codex-${timestampId()}`;
  const stdoutPath = path.join(config.logDir, `${runId}.stdout.log`);
  const stderrPath = path.join(config.logDir, `${runId}.stderr.log`);
  const recordPath = path.join(config.reportsDir, `${runId}.json`);

  const result = config.dryRun
    ? {
        command: "codex",
        args: ["exec", "--sandbox", config.codexSandbox, finalPrompt],
        cwd: config.repoPath,
        exitCode: 0,
        stdout: "Dry run enabled; Codex was not executed.",
        stderr: ""
      }
    : await runCommand("codex", ["exec", "--sandbox", config.codexSandbox, finalPrompt], config.repoPath, 60 * 60 * 1000);

  const after = await getGitStatus(config.repoPath);
  await writeTextFile(stdoutPath, result.stdout);
  await writeTextFile(stderrPath, result.stderr);

  const record = {
    runId,
    timestamp: new Date().toISOString(),
    mode,
    allowCommit: request.allowCommit === true,
    allowPush: request.allowPush === true,
    dryRun: config.dryRun,
    promptSha256: crypto.createHash("sha256").update(prompt).digest("hex"),
    promptPreview: promptPreview(prompt),
    command: {
      executable: "codex",
      args: ["exec", "--sandbox", config.codexSandbox, "[prompt redacted]"],
      cwd: config.repoPath
    },
    before,
    after,
    exitCode: result.exitCode,
    logs: {
      stdoutPath,
      stderrPath
    },
    stdoutTail: tail(result.stdout),
    stderrTail: tail(result.stderr)
  };

  await writeJsonFile(recordPath, record);

  return {
    runId,
    exitCode: result.exitCode,
    logPaths: {
      stdout: stdoutPath,
      stderr: stderrPath,
      record: recordPath
    },
    stdoutTail: tail(result.stdout),
    stderrTail: tail(result.stderr)
  };
}
