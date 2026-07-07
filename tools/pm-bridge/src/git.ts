import { spawn } from "node:child_process";

export interface CommandResult {
  command: string;
  args: string[];
  cwd: string;
  exitCode: number | null;
  stdout: string;
  stderr: string;
}

export interface GitStatusSnapshot {
  repoPath: string;
  currentBranch: string;
  remoteOrigin: string;
  latestCommitHash: string;
  latestCommitMessage: string;
  statusShort: string;
  isClean: boolean;
  hasUntrackedFiles: boolean;
  hasMergeConflicts: boolean;
  timestamp: string;
}

export function runCommand(command: string, args: string[], cwd: string, timeoutMs = 10 * 60 * 1000): Promise<CommandResult> {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      shell: false,
      windowsHide: true
    });

    let stdout = "";
    let stderr = "";
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        stderr += `\nCommand timed out after ${timeoutMs} ms.`;
        child.kill();
      }
    }, timeoutMs);

    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve({ command, args, cwd, exitCode: -1, stdout, stderr: `${stderr}\n${error.message}` });
      }
    });

    child.on("close", (exitCode) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve({ command, args, cwd, exitCode, stdout, stderr });
      }
    });
  });
}

async function git(repoPath: string, args: string[]): Promise<CommandResult> {
  return runCommand("git", args, repoPath, 2 * 60 * 1000);
}

function trimOutput(result: CommandResult): string {
  return result.stdout.trim();
}

function detectMergeConflicts(statusShort: string): boolean {
  return statusShort
    .split(/\r?\n/)
    .filter(Boolean)
    .some((line) => /^(UU|AA|DD|AU|UD|DU|UA)\s/.test(line));
}

export async function getGitStatus(repoPath: string): Promise<GitStatusSnapshot> {
  const [branch, origin, commitHash, commitMessage, status] = await Promise.all([
    git(repoPath, ["branch", "--show-current"]),
    git(repoPath, ["remote", "get-url", "origin"]),
    git(repoPath, ["rev-parse", "HEAD"]),
    git(repoPath, ["log", "-1", "--pretty=%s"]),
    git(repoPath, ["status", "--short"])
  ]);

  const statusShort = trimOutput(status);
  return {
    repoPath,
    currentBranch: trimOutput(branch),
    remoteOrigin: trimOutput(origin),
    latestCommitHash: trimOutput(commitHash),
    latestCommitMessage: trimOutput(commitMessage),
    statusShort,
    isClean: statusShort.length === 0,
    hasUntrackedFiles: statusShort.split(/\r?\n/).some((line) => line.startsWith("??")),
    hasMergeConflicts: detectMergeConflicts(statusShort),
    timestamp: new Date().toISOString()
  };
}

export async function gitPull(repoPath: string): Promise<{ before: GitStatusSnapshot; pull: CommandResult; after: GitStatusSnapshot }> {
  const before = await getGitStatus(repoPath);
  if (before.hasMergeConflicts) {
    throw new Error("Refusing git pull: merge conflicts are present.");
  }

  const pull = await git(repoPath, ["pull"]);
  const after = await getGitStatus(repoPath);
  return { before, pull, after };
}

export async function gitFetch(repoPath: string): Promise<CommandResult> {
  return git(repoPath, ["fetch"]);
}
