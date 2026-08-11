import { useQuery } from "@tanstack/react-query";
import { getAvailableMemoryTypes, getMemoryEntries } from "@/api/memory";

export const memoryKeys = {
  all: ["memory"] as const,
  availableTypes: () => ["memory", "available-types"] as const,
};

/** See api/memory.ts — individual entries stay mock-backed; no list/filter/inspect route exists. */
export function useMemoryEntries() {
  return useQuery({ queryKey: memoryKeys.all, queryFn: getMemoryEntries, staleTime: Infinity });
}

/** The real endpoint — which MemoryType values are registered on the live MemoryManager. */
export function useAvailableMemoryTypes() {
  return useQuery({
    queryKey: memoryKeys.availableTypes(),
    queryFn: ({ signal }) => getAvailableMemoryTypes(signal),
  });
}
