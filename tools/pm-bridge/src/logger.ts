import fs from "node:fs/promises";
import path from "node:path";

export function timestampId(date = new Date()): string {
  return date.toISOString().replace(/[:.]/g, "-");
}

export function tail(value: string, maxLength = 4000): string {
  if (value.length <= maxLength) {
    return value;
  }

  return value.slice(value.length - maxLength);
}

export function redact(value: string): string {
  return value
    .replace(/(api[_-]?key|secret|token|password|credential)\s*[:=]\s*["']?[^"'\s]+/gi, "$1=[REDACTED]")
    .replace(/-----BEGIN (RSA |DSA |EC |OPENSSH |)PRIVATE KEY-----[\s\S]*?-----END (RSA |DSA |EC |OPENSSH |)PRIVATE KEY-----/gi, "[REDACTED_PRIVATE_KEY]");
}

export async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

export async function writeTextFile(filePath: string, content: string): Promise<void> {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, redact(content), "utf8");
}

export async function writeJsonFile(filePath: string, value: unknown): Promise<void> {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function promptPreview(prompt: string, maxLength = 500): string {
  return redact(prompt.length <= maxLength ? prompt : `${prompt.slice(0, maxLength)}...`);
}
