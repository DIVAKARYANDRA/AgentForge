import { useQuery } from "@tanstack/react-query";
import { getKnowledgeItems } from "@/api/knowledge";

export const knowledgeKeys = { all: ["knowledge"] as const };

/** See api/knowledge.ts — mock-backed; no route exposes KnowledgeMemory contents at all. */
export function useKnowledgeItems() {
  return useQuery({ queryKey: knowledgeKeys.all, queryFn: getKnowledgeItems, staleTime: Infinity });
}
