export type KnowledgeConfidenceLevel = "high" | "medium" | "low";

export interface KnowledgeSource {
  /** Human-readable origin, e.g. "Promoted from Research Agent experience". */
  label: string;
  /** The memory entry this knowledge was promoted from, if any (see data/memories.ts). */
  originMemoryId?: string;
}

export interface KnowledgeUsageEvent {
  id: string;
  description: string;
  timestamp: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  sourceAgentId: string;
  sourceAgentName: string;
  /** 0-100. Bucketed into KnowledgeConfidenceLevel for filtering/display. */
  confidence: number;
  createdAt: string;
  source: KnowledgeSource;
  relatedAgentIds: string[];
  relatedWorkflowIds: string[];
  usageHistory: KnowledgeUsageEvent[];
}

export function confidenceLevel(score: number): KnowledgeConfidenceLevel {
  if (score >= 85) return "high";
  if (score >= 60) return "medium";
  return "low";
}

export const CONFIDENCE_LEVEL_LABELS: Record<KnowledgeConfidenceLevel, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
};
