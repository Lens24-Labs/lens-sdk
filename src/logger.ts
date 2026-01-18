const LoggedMessages = new Set<string>();

export function debugLog(
  enabled: boolean,
  message: string,
  level: "info" | "warn" = "info",
  ...arg: unknown[]
): void {
  if (!enabled) return;

  const prefix = `[lens-sdk]`;

  if (level === "info") {
    // Normal operational logs (like shutdown signals)
    console.log(prefix, message, ...arg);
  } else {
    // Warning logs with deduplication (like invalid tokens)
    if (LoggedMessages.has(message)) return;
    LoggedMessages.add(message);
    console.warn(prefix, `⚠️ ${message}`, ...arg);
  }
}
