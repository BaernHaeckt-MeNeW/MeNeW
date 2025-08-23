import type { Path } from "../model/trace";
import { buildPathPayload } from "../utils/payload";

// TODO: Check Janic bro
export async function sendDecisionPath(
    path: Path,
    endpoint = "/api/decision-path"
): Promise<unknown> {
    const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPathPayload(path))
    });
    if (!res.ok) throw new Error("Request failed: " + res.status);
    return res.json().catch(() => ({}));
}