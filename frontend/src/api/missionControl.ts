import { request, type ApiEnvelope } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";

/**
 * app/lifespan.py constructs MissionControlService with
 * `queue=None, scheduler=None, analytics=None, event_manager=None` —
 * only `runtime` is a real, live dependency. That means:
 *   - /mission-control/runtime  -> backed by a real RuntimeManager, safe to call
 *   - /mission-control/health   -> calls MonitoringService.snapshot(...) with
 *                                  those Nones; may or may not tolerate them
 *   - /mission-control/dashboard -> same snapshot call, same caveat
 *   - /mission-control/queue, /scheduler, /analytics -> call `.summary` on
 *                                  None and WILL raise server-side (500)
 *     until the backend wires real services in.
 * All six are still implemented here because the routes are real; the
 * hook layer's error/retry UI is what actually surfaces this gap to a
 * user rather than silently mapping it to fake data.
 */

type NotInitialized = { status: "not_initialized" };

export function isNotInitialized(value: unknown): value is NotInitialized {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    (value as { status?: unknown }).status === "not_initialized"
  );
}

export interface DashboardData {
  runtime: Record<string, unknown>;
  queue: Record<string, unknown>;
  scheduler: Record<string, unknown>;
  analytics: Record<string, unknown>;
  metrics: Record<string, unknown>;
  health: Record<string, unknown>;
}

function get<T>(path: string, signal?: AbortSignal) {
  return request<ApiEnvelope<T> | NotInitialized>(path, { signal });
}

export const missionControlApi = {
  dashboard: (signal?: AbortSignal) => get<DashboardData>(ENDPOINTS.missionDashboard, signal),
  runtime: (signal?: AbortSignal) => get<Record<string, unknown>>(ENDPOINTS.missionRuntime, signal),
  queue: (signal?: AbortSignal) => get<Record<string, unknown>>(ENDPOINTS.missionQueue, signal),
  scheduler: (signal?: AbortSignal) => get<Record<string, unknown>>(ENDPOINTS.missionScheduler, signal),
  analytics: (signal?: AbortSignal) => get<Record<string, unknown>>(ENDPOINTS.missionAnalytics, signal),
  health: (signal?: AbortSignal) => get<Record<string, unknown>>(ENDPOINTS.missionHealth, signal),
};
