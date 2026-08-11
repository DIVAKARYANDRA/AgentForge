import { knowledgeItems } from "@/data/knowledge";
import type { KnowledgeItem } from "@/types/knowledge";

/**
 * core/memory/knowledge_memory.py exists server-side (registered as the
 * MemoryType.KNOWLEDGE store in app/lifespan.py) but nothing exposes its
 * contents over HTTP — /memory only reports which memory types are
 * registered, not their entries. There is no title/summary/confidence/
 * source-provenance shape anywhere in the backend today, so the
 * Knowledge Base stays mock-backed.
 */
export async function getKnowledgeItems(): Promise<KnowledgeItem[]> {
  return knowledgeItems;
}
