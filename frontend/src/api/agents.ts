import { agents } from "@/data/agents";
import type { Agent } from "@/types/agent";

/**
 * No agent-registry endpoint exists in this backend snapshot — searching
 * api/ turns up only health.py, runtime.py, and mission_control/. There
 * is no route that lists agents, their capabilities, or their execution
 * history, even though core/agents/agent_registry.py exists server-side.
 *
 * Per this prompt's instruction not to invent endpoints, this module
 * does not call `request()` at all. It exposes the same function shape
 * a real client would (an async function returning Agent[]) so
 * hooks/useAgents.ts — and every page that calls it — doesn't need to
 * change when a real /agents route ships; only this file will.
 */
export async function getAgents(): Promise<Agent[]> {
  return agents;
}
