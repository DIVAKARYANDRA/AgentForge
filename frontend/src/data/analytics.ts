import { agents } from "@/data/agents";
import { workflows } from "@/data/workflows";
import { tools } from "@/data/tools";
import { memories } from "@/data/memories";
import { knowledgeItems } from "@/data/knowledge";
import { confidenceLevel } from "@/types/knowledge";
import type {
  AgentAnalytics,
  AnalyticsOverview,
  ConfidenceDistribution,
  DailyExecutionPoint,
  KnowledgeAnalyticsSummary,
  MemoryAnalyticsEntry,
  ToolAnalyticsEntry,
  WorkflowAnalyticsEntry,
} from "@/types/analytics";
import type { MemoryType } from "@/types/memory";

/** Parses a mock duration string like "1.4s" into seconds. */
function parseSeconds(value: string): number {
  return parseFloat(value.replace("s", "")) || 0;
}

/** Parses relative-time strings ("2 minutes ago", "3 days ago", "4 weeks ago") into days-ago. */
function parseDaysAgo(timestamp: string): number {
  const s = timestamp.toLowerCase();
  if (s.includes("just now") || s.includes("minute") || s.includes("hour")) return 0;
  const weekMatch = s.match(/(\d+)\s*week/);
  if (weekMatch) return parseInt(weekMatch[1], 10) * 7;
  const dayMatch = s.match(/(\d+)\s*day/);
  if (dayMatch) return parseInt(dayMatch[1], 10);
  return 0;
}

/* ---------------------------------------------------------------------- */
/* Overview — aggregated straight from the fleet                          */
/* ---------------------------------------------------------------------- */

export const analyticsOverview: AnalyticsOverview = (() => {
  const totalExecutions = agents.reduce((sum, a) => sum + a.metrics.totalExecutions, 0);
  const successfulExecutions = agents.reduce(
    (sum, a) => sum + Math.round(a.metrics.totalExecutions * (a.metrics.successRate / 100)),
    0
  );
  const averageExecutionTime =
    (agents.length > 0
      ? agents.reduce((sum, a) => sum + parseSeconds(a.metrics.avgExecutionTime), 0) / agents.length
      : 0
    ).toFixed(1) + "s";

  return {
    totalExecutions,
    successfulExecutions,
    failedExecutions: totalExecutions - successfulExecutions,
    averageExecutionTime,
    activeAgents: agents.filter((a) => a.status === "healthy" || a.status === "running").length,
    activeWorkflows: workflows.filter((w) => w.status === "active").length,
    toolExecutions: tools.reduce((sum, t) => sum + t.executionMetrics.totalExecutions, 0),
    memoryEntries: memories.length,
    knowledgeItems: knowledgeItems.length,
  };
})();

/* ---------------------------------------------------------------------- */
/* Per-domain analytics — one row per real entity, no invented ids        */
/* ---------------------------------------------------------------------- */

export const agentAnalytics: AgentAnalytics[] = agents.map((agent) => ({
  agentId: agent.id,
  agentName: agent.name,
  executions: agent.metrics.totalExecutions,
  successRate: agent.metrics.successRate,
  averageDuration: agent.metrics.avgExecutionTime,
  tasksCompleted: agent.executionHistory.filter((e) => e.status === "completed").length,
  status: agent.status,
}));

export const workflowAnalytics: WorkflowAnalyticsEntry[] = workflows.map((workflow) => ({
  workflowId: workflow.id,
  workflowName: workflow.name,
  runs: workflow.executionMetrics.totalRuns,
  successRate: workflow.executionMetrics.totalRuns > 0
    ? Math.round(
        (workflow.executionMetrics.successfulRuns / workflow.executionMetrics.totalRuns) * 100
      )
    : 0,
  averageDuration: workflow.executionMetrics.avgDuration,
  failureCount: workflow.executionMetrics.failedRuns,
}));

export const toolAnalytics: ToolAnalyticsEntry[] = tools.map((tool) => ({
  toolId: tool.id,
  toolName: tool.name,
  executions: tool.executionMetrics.totalExecutions,
  successRate: tool.executionMetrics.successRate,
  averageDuration: tool.executionMetrics.avgExecutionTime,
}));

/* ---------------------------------------------------------------------- */
/* Memory analytics — count/growth/promotions per type, from real entries */
/* ---------------------------------------------------------------------- */

const MEMORY_TYPES: MemoryType[] = ["working", "session", "long_term", "knowledge"];
const RECENT_WINDOW_DAYS = 14;

export const memoryAnalytics: MemoryAnalyticsEntry[] = MEMORY_TYPES.map((type) => {
  const entries = memories.filter((m) => m.type === type);
  const recentEntries = entries.filter((e) => {
    const daysSince = (Date.now() - new Date(e.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    return daysSince <= RECENT_WINDOW_DAYS;
  });
  // Knowledge-type entries are, by definition, already-promoted memory.
  // Other types count entries whose own history records a promotion event.
  const promotions =
    type === "knowledge"
      ? entries.length
      : entries.filter((e) => e.history.some((h) => h.type === "promoted")).length;

  return {
    memoryType: type,
    count: entries.length,
    growthRate: entries.length > 0 ? Math.round((recentEntries.length / entries.length) * 100) : 0,
    promotions,
  };
});

/* ---------------------------------------------------------------------- */
/* Knowledge analytics                                                    */
/* ---------------------------------------------------------------------- */

export const knowledgeAnalytics: KnowledgeAnalyticsSummary = (() => {
  const confidenceDistribution: ConfidenceDistribution = { high: 0, medium: 0, low: 0 };
  for (const item of knowledgeItems) {
    confidenceDistribution[confidenceLevel(item.confidence)] += 1;
  }

  const contributionsByAgent = new Map<string, number>();
  for (const item of knowledgeItems) {
    contributionsByAgent.set(
      item.sourceAgentName,
      (contributionsByAgent.get(item.sourceAgentName) ?? 0) + 1
    );
  }
  const topSources = Array.from(contributionsByAgent.entries())
    .map(([agentName, contributions]) => ({ agentName, contributions }))
    .sort((a, b) => b.contributions - a.contributions)
    .slice(0, 3);

  return {
    totalKnowledge: knowledgeItems.length,
    promotedItems: knowledgeItems.filter((k) => Boolean(k.source.originMemoryId)).length,
    confidenceDistribution,
    topSources,
  };
})();

/** Knowledge items added within the recent window — the "Knowledge Growth" figure. */
export const recentKnowledgeCount = knowledgeItems.filter((item) => {
  const daysSince = (Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return daysSince <= RECENT_WINDOW_DAYS;
}).length;

/* ---------------------------------------------------------------------- */
/* Execution trends — real execution records from agents, workflows, and  */
/* tools, bucketed into the last 7 days                                   */
/* ---------------------------------------------------------------------- */

export const dailyExecutionTrend: DailyExecutionPoint[] = (() => {
  const allRecords: { status: string; timestamp: string }[] = [
    ...agents.flatMap((a) => a.executionHistory.map((e) => ({ status: e.status, timestamp: e.timestamp }))),
    ...workflows.flatMap((w) => w.executionHistory.map((e) => ({ status: e.status, timestamp: e.timestamp }))),
    ...tools.flatMap((t) => t.executionHistory.map((e) => ({ status: e.status, timestamp: e.timestamp }))),
  ];

  const buckets: DailyExecutionPoint[] = [];
  for (let daysAgo = 6; daysAgo >= 0; daysAgo--) {
    const dayRecords = allRecords.filter((r) => parseDaysAgo(r.timestamp) === daysAgo);
    buckets.push({
      label: daysAgo === 0 ? "Today" : `${daysAgo}d ago`,
      successful: dayRecords.filter((r) => r.status === "completed").length,
      failed: dayRecords.filter((r) => r.status === "failed").length,
      running: dayRecords.filter((r) => r.status === "running").length,
    });
  }
  return buckets;
})();
