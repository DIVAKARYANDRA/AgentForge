import {
  agentAnalytics,
  analyticsOverview,
  dailyExecutionTrend,
  knowledgeAnalytics,
  memoryAnalytics,
  recentKnowledgeCount,
  toolAnalytics,
  workflowAnalytics,
} from "@/data/analytics";
import type {
  AgentAnalytics,
  AnalyticsOverview,
  DailyExecutionPoint,
  KnowledgeAnalyticsSummary,
  MemoryAnalyticsEntry,
  ToolAnalyticsEntry,
  WorkflowAnalyticsEntry,
} from "@/types/analytics";

/**
 * GET /mission-control/analytics is a real route, but MissionControlService
 * is constructed with `analytics=None` in app/lifespan.py — calling it
 * raises server-side (`.summary` on None). There is no working analytics
 * endpoint to migrate to yet, so per this prompt's own precedence
 * ("do not invent endpoints") this stays derived from the other mock
 * datasets (data/analytics.ts), not from arbitrary invented numbers.
 */
export interface AnalyticsSnapshot {
  overview: AnalyticsOverview;
  agents: AgentAnalytics[];
  workflows: WorkflowAnalyticsEntry[];
  tools: ToolAnalyticsEntry[];
  memory: MemoryAnalyticsEntry[];
  knowledge: KnowledgeAnalyticsSummary;
  dailyExecutionTrend: DailyExecutionPoint[];
  recentKnowledgeCount: number;
}

export async function getAnalyticsSnapshot(): Promise<AnalyticsSnapshot> {
  return {
    overview: analyticsOverview,
    agents: agentAnalytics,
    workflows: workflowAnalytics,
    tools: toolAnalytics,
    memory: memoryAnalytics,
    knowledge: knowledgeAnalytics,
    dailyExecutionTrend,
    recentKnowledgeCount,
  };
}
