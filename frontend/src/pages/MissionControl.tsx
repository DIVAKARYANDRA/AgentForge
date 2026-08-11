import { PageContainer } from "@/layouts/PageContainer";
import { MissionControlHeader } from "@/components/mission-control/MissionControlHeader";
import { SystemHealthSection } from "@/components/mission-control/SystemHealthSection";
import { ExecutionPipelineSection } from "@/components/mission-control/ExecutionPipelineSection";
import { ToolRegistrySection } from "@/components/mission-control/ToolRegistrySection";
import { RecentExecutionsSection } from "@/components/mission-control/RecentExecutionsSection";
import { MemorySummarySection } from "@/components/mission-control/MemorySummarySection";
import { KnowledgeBaseSummarySection } from "@/components/mission-control/KnowledgeBaseSummarySection";
import { QuickActionsSection } from "@/components/mission-control/QuickActionsSection";

/**
 * Mission Control — the platform's homepage. Real-time (mock/static)
 * overview of platform health, the execution pipeline, available tools,
 * recent runs, memory/knowledge state, and quick actions.
 *
 * No backend integration yet — every number and row here is static data
 * from src/data/mission-control.ts.
 */
export default function MissionControl() {
  return (
    <PageContainer className="flex flex-col gap-10">
      <MissionControlHeader />
      <SystemHealthSection />
      <ExecutionPipelineSection />
      <ToolRegistrySection />
      <RecentExecutionsSection />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MemorySummarySection />
        <KnowledgeBaseSummarySection />
      </div>

      <QuickActionsSection />
    </PageContainer>
  );
}
