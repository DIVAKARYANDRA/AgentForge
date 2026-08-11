import { useQuery } from "@tanstack/react-query";
import { getWorkflows } from "@/api/workflows";

export const workflowsKeys = { all: ["workflows"] as const };

/** See api/workflows.ts — mock-backed until a real /workflows route exists. */
export function useWorkflows() {
  return useQuery({ queryKey: workflowsKeys.all, queryFn: getWorkflows, staleTime: Infinity });
}
