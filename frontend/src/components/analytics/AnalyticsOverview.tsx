import { SectionHeader } from "@/components/common/SectionHeader";
import { AnalyticsSummaryCards } from "@/components/analytics/AnalyticsSummaryCards";
import type { AnalyticsOverview as AnalyticsOverviewData } from "@/types/analytics";

interface AnalyticsOverviewProps {
  overview: AnalyticsOverviewData;
  knowledgeGrowthCount: number;
}

export function AnalyticsOverview({ overview, knowledgeGrowthCount }: AnalyticsOverviewProps) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Overview"
        description="The fleet at a glance — executions, reliability, and growth."
      />
      <AnalyticsSummaryCards overview={overview} knowledgeGrowthCount={knowledgeGrowthCount} />
    </section>
  );
}
