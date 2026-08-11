import { request } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import { tools } from "@/data/tools";
import type { Tool } from "@/types/tool";

/** GET /tools — api/health.py::tools(). The ONLY real tool-related endpoint; just names. */
export interface AvailableToolsResponse {
  available_tools: string[];
}

export function getAvailableToolNames(signal?: AbortSignal): Promise<AvailableToolsResponse> {
  return request<AvailableToolsResponse>(ENDPOINTS.toolNames, { signal });
}

/**
 * The Tools page needs categories, capabilities, health/availability,
 * usage metrics, and agent/workflow relationships — none of which any
 * backend route returns (the registry's richer methods, like
 * health_status() and list_categories(), are called during startup
 * logging in app/lifespan.py but never exposed over HTTP). So the full
 * Tool objects stay mock-backed until a real /tools detail route exists.
 */
export async function getTools(): Promise<Tool[]> {
  return tools;
}
