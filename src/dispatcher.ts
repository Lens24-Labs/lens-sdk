import { debugLog } from "./logger.js";
import type { LensEventPayload } from "./types.js";

export async function dispatchBatch(
  payloads: LensEventPayload[],
  endpoint: string,
  apiKey: string,
  debug: boolean
): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Lens-Batch-Size": payloads.length.toString(),
      },
      body: JSON.stringify({ payloads }),
      signal: controller.signal,
    });

    // 👇 NEW: response handling
    if (!res.ok) {
      let body: string | undefined;

      try {
        body = await res.text();
      } catch {
        body = undefined;
      }

      debugLog(debug, "event_rejected", "warn", {
        status: res.status,
        body,
      });
    }
  } catch (err) {
    debugLog(debug, "event_dispatch_failed", "warn", err);
  } finally {
    clearTimeout(timeout);
  }
}
