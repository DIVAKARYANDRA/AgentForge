import type { AgentStatus } from "@/types/agent";
import type { MemoryType } from "@/types/memory";

export interface AnalyticsOverview {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageExecutionTime: string;
  activeAgents: number;
  activeWorkflows: number;
  toolExecutions: number;
  memoryEntries: number;
  knowledgeItems: number;
}

export interface AgentAnalytics {
  agentId: string;
  agentName: string;
  executions: number;
  successRate: number;
  averageDuration: string;
  tasksCompleted: number;
  status: AgentStatus;
}

export interface WorkflowAnalyticsEntry {
  workflowId: string;
  workflowName: string;
  runs: number;
  successRate: number;
  averageDuration: string;
  failureCount: number;
}

export interface ToolAnalyticsEntry {
  toolId: string;
  toolName: string;
  executions: number;
  successRate: number;
  averageDuration: string;
}

export interface MemoryAnalyticsEntry {
  memoryType: MemoryType;
  count: number;
  /** Percentage of this type's entries created within the recent window. */
  growthRate: number;
  /** Entries of this type that have been promoted onward. */
  promotions: number;
}

export interface ConfidenceDistribution {
  high: number;
  medium: number;
  low: number;
}

export interface KnowledgeSourceRanking {
  agentName: string;
  contributions: number;
}

export interface KnowledgeAnalyticsSummary {
  totalKnowledge: number;
  promotedItems: number;
  confidenceDistribution: ConfidenceDistribution;
  topSources: KnowledgeSourceRanking[];
}

export interface DailyExecutionPoint {
  /** Short label, e.g. "6d ago" or "Today". */
  label: string;
  successful: number;
  failed: number;
  running: number;
}

export type AnalyticsTimeRange = "24h" | "7d" | "30d";

export type AnalyticsEntity = "agents" | "workflows" | "tools" | "memory" | "knowledge";

export const TIME_RANGE_LABELS: Record<AnalyticsTimeRange, string> = {
  "24h": "Last 24 Hours",
  "7d": "Last 7 Days",
  "30d": "Last 30 Days",
};

export const ENTITY_LABELS: Record<AnalyticsEntity, string> = {
  agents: "Agents",
  workflows: "Workflows",
  tools: "Tools",
  memory: "Memory",
  knowledge: "Knowledge",
};
