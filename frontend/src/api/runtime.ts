import { request, type ApiEnvelope } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";

/** Mirrors RuntimeHealthChecker.check() exactly (core/runtime/*health*.py). */
export interface RuntimeHealth {
  runtime: boolean;
  provider: boolean;
  memory: boolean;
  tools: boolean;
  healthy: boolean;
}

export interface PlannerStatus {
  planner_enabled: boolean;
}

export function getRuntimeHealth(signal?: AbortSignal): Promise<RuntimeHealth> {
  return request<RuntimeHealth>(ENDPOINTS.runtimeHealth, { signal });
}

export function getPlannerStatus(signal?: AbortSignal): Promise<PlannerStatus> {
  return request<PlannerStatus>(ENDPOINTS.runtimePlanner, { signal });
}

/**
 * Dispatches a real agent run. `goal` is a plain query param on the
 * backend (async def execute_agent(goal: str), no Pydantic body model),
 * not a JSON body — matched here exactly. The result shape is whatever
 * AgentTask execution returns, which core/runtime doesn't expose a
 * schema for, so it's typed as unknown rather than guessed.
 */
export function executeAgentTask(goal: string, signal?: AbortSignal): Promise<ApiEnvelope<unknown>> {
  return request<ApiEnvelope<unknown>>(ENDPOINTS.runtimeExecute, {
    method: "POST",
    query: { goal },
    signal,
  });
}
