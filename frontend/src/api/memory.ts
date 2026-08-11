import { request } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import { memories } from "@/data/memories";
import type { MemoryEntry } from "@/types/memory";

/** GET /memory — api/health.py::memory_status(). Which MemoryType values are registered, nothing more. */
export interface AvailableMemoriesResponse {
  available_memories: string[];
}

export function getAvailableMemoryTypes(signal?: AbortSignal): Promise<AvailableMemoriesResponse> {
  return request<AvailableMemoriesResponse>(ENDPOINTS.memoryAvailable, { signal });
}

/**
 * /memory/store and /memory/get exist (api/health.py) but are hardcoded
 * to a single demo key ("favorite_language") — a wiring smoke test, not
 * a general entries API. There is no route to list, filter, or inspect
 * individual memory entries with content/category/importance/history,
 * so the Memory Explorer's entries stay mock-backed until one exists.
 */
export async function getMemoryEntries(): Promise<MemoryEntry[]> {
  return memories;
}
