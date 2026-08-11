import { useState } from "react";
import { PageContainer } from "@/layouts/PageContainer";
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters";
import { AnalyticsOverview } from "@/components/analytics/AnalyticsOverview";
import { PerformanceMetrics } from "@/components/analytics/PerformanceMetrics";
import { WorkflowAnalytics } from "@/components/analytics/WorkflowAnalytics";
import { ToolUsageAnalytics } from "@/components/analytics/ToolUsageAnalytics";
import { ExecutionTrends } from "@/components/analytics/ExecutionTrends";
import { MemoryGrowthChart } from "@/components/analytics/MemoryGrowthChart";
import { KnowledgeAnalytics } from "@/components/analytics/KnowledgeAnalytics";
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
import type { AnalyticsEntity, AnalyticsTimeRange } from "@/types/analytics";

/**
 * Analytics — the intelligence layer. Every number here comes from
 * src/data/analytics.ts, which derives it from the real Agents, Workflows,
 * Tools, Memory, and Knowledge datasets rather than inventing fresh mock
 * figures — this page is a lens on data that already exists, not a sixth
 * data source.
 */
export default function Analytics() {
  const [timeRange, setTimeRange] = useState<AnalyticsTimeRange>("7d");
  const [selectedEntities, setSelectedEntities] = useState<AnalyticsEntity[]>([]);

  const showSection = (entity: AnalyticsEntity) =>
    selectedEntities.length === 0 || selectedEntities.includes(entity);

  const successRate =
    analyticsOverview.totalExecutions > 0
      ? Math.round(
          (analyticsOverview.successfulExecutions / analyticsOverview.totalExecutions) * 100
        )
      : 0;

  return (
    <PageContainer className="flex flex-col gap-10">
      <AnalyticsHeader
        totalExecutions={analyticsOverview.totalExecutions}
        successRate={successRate}
        activeAgents={analyticsOverview.activeAgents}
        knowledgeGrowth={recentKnowledgeCount}
      />

      <AnalyticsFilters
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        selectedEntities={selectedEntities}
        onEntitiesChange={setSelectedEntities}
      />

      <AnalyticsOverview overview={analyticsOverview} knowledgeGrowthCount={recentKnowledgeCount} />

      <ExecutionTrends data={dailyExecutionTrend} />

      {showSection("agents") && <PerformanceMetrics data={agentAnalytics} />}
      {showSection("workflows") && <WorkflowAnalytics data={workflowAnalytics} />}
      {showSection("tools") && <ToolUsageAnalytics data={toolAnalytics} />}
      {showSection("memory") && <MemoryGrowthChart data={memoryAnalytics} />}
      {showSection("knowledge") && <KnowledgeAnalytics data={knowledgeAnalytics} />}
    </PageContainer>
  );
}
