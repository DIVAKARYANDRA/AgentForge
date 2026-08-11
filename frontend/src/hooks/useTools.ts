import { useQuery } from "@tanstack/react-query";
import { getAvailableToolNames, getTools } from "@/api/tools";

export const toolsKeys = {
  all: ["tools"] as const,
  availableNames: () => ["tools", "available-names"] as const,
};

/** See api/tools.ts — full Tool objects stay mock-backed; capabilities/health/history have no backing route. */
export function useTools() {
  return useQuery({ queryKey: toolsKeys.all, queryFn: getTools, staleTime: Infinity });
}

/** The one real tool-related endpoint — just names, from the live ToolRegistry. */
export function useAvailableToolNames() {
  return useQuery({
    queryKey: toolsKeys.availableNames(),
    queryFn: ({ signal }) => getAvailableToolNames(signal),
  });
}
