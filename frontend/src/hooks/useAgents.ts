import { useQuery } from "@tanstack/react-query";
import { getAgents } from "@/api/agents";

export const agentsKeys = { all: ["agents"] as const };

/** See api/agents.ts — mock-backed until a real /agents route exists; this hook's shape won't change when it does. */
export function useAgents() {
  return useQuery({ queryKey: agentsKeys.all, queryFn: getAgents, staleTime: Infinity });
}
