/**
 * Mirrors the backend's MemoryType enum exactly (working/session/
 * long_term/knowledge) — no relabeling needed here, these already read
 * correctly as UI categories.
 */
export type MemoryType = "working" | "session" | "long_term" | "knowledge";

export type MemoryImportance = "high" | "medium" | "low";

/**
 * UI-facing lifecycle event. The backend's MemoryEventType is
 * created/updated/deleted/cleared (raw storage events); this adds
 * "promoted" (working/session memory graduating into long-term or
 * knowledge memory) and "referenced" (another agent or workflow reading
 * this entry), since those are what an operator inspecting memory
 * actually wants to see. "deleted"/"cleared" map onto storage internals
 * an inspector view doesn't need to surface.
 */
export type MemoryHistoryEventType = "created" | "updated" | "promoted" | "referenced";

export interface MemoryHistoryEvent {
  id: string;
  type: MemoryHistoryEventType;
  timestamp: string;
  description: string;
}

export interface MemoryMetadata {
  relatedWorkflowId?: string;
  relatedWorkflowName?: string;
  tags: string[];
}

export interface MemoryEntry {
  id: string;
  type: MemoryType;
  agentId: string;
  agentName: string;
  content: string;
  category: string;
  importance: MemoryImportance;
  createdAt: string;
  updatedAt: string;
  source: string;
  metadata: MemoryMetadata;
  history: MemoryHistoryEvent[];
}

export const MEMORY_TYPE_LABELS: Record<MemoryType, string> = {
  working: "Working Memory",
  session: "Session Memory",
  long_term: "Long Term Memory",
  knowledge: "Knowledge Memory",
};

export const MEMORY_TYPE_SHORT_LABELS: Record<MemoryType, string> = {
  working: "Working",
  session: "Session",
  long_term: "Long Term",
  knowledge: "Knowledge",
};

export const MEMORY_IMPORTANCE_LABELS: Record<MemoryImportance, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};
