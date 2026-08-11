import { useMemo, useState } from "react";
import { PageContainer } from "@/layouts/PageContainer";
import { WorkflowHeader } from "@/components/workflows/WorkflowHeader";
import { WorkflowSearch } from "@/components/workflows/WorkflowSearch";
import { WorkflowFilters } from "@/components/workflows/WorkflowFilters";
import { WorkflowGrid } from "@/components/workflows/WorkflowGrid";
import { WorkflowDetailDrawer } from "@/components/workflows/WorkflowDetailDrawer";
import { workflows } from "@/data/workflows";
import { agents } from "@/data/agents";
import { WORKFLOW_CATEGORY_LABELS, type WorkflowCategory, type WorkflowStatus } from "@/types/workflow";

/** Parses a mock duration string like "8.4s" into seconds. */
function parseSeconds(value: string): number {
  return parseFloat(value.replace("s", "")) || 0;
}

export default function Workflows() {
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState<WorkflowStatus[]>([]);
  const [categories, setCategories] = useState<WorkflowCategory[]>([]);
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);

  const filteredWorkflows = useMemo(() => {
    const q = query.trim().toLowerCase();

    return workflows.filter((workflow) => {
      const matchesStatus = statuses.length === 0 || statuses.includes(workflow.status);
      const matchesCategory = categories.length === 0 || categories.includes(workflow.category);
      if (!matchesStatus || !matchesCategory) return false;
      if (!q) return true;

      const assignedAgentNames = workflow.agents
        .map((a) => agents.find((agent) => agent.id === a.agentId)?.name ?? "")
        .join(" ");

      const haystack = [
        workflow.name,
        WORKFLOW_CATEGORY_LABELS[workflow.category],
        assignedAgentNames,
        ...workflow.tools.map((t) => t.name + " " + t.slug),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query, statuses, categories]);

  const selectedWorkflow = useMemo(
    () => workflows.find((w) => w.id === selectedWorkflowId) ?? null,
    [selectedWorkflowId]
  );

  const totalWorkflows = workflows.length;
  const activeWorkflows = workflows.filter((w) => w.status === "active").length;
  const successfulRuns = workflows.reduce(
    (sum, w) => sum + w.executionMetrics.successfulRuns,
    0
  );
  const averageExecutionTime = (
    workflows.length > 0
      ? workflows.reduce((sum, w) => sum + parseSeconds(w.executionMetrics.avgDuration), 0) /
        workflows.length
      : 0
  ).toFixed(1);

  return (
    <PageContainer className="flex flex-col gap-8">
      <WorkflowHeader
        totalWorkflows={totalWorkflows}
        activeWorkflows={activeWorkflows}
        successfulRuns={successfulRuns}
        averageExecutionTime={`${averageExecutionTime}s`}
      />

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <WorkflowSearch value={query} onChange={setQuery} />
        <WorkflowFilters
          selectedStatuses={statuses}
          onStatusesChange={setStatuses}
          selectedCategories={categories}
          onCategoriesChange={setCategories}
        />
      </div>

      <WorkflowGrid workflows={filteredWorkflows} onSelectWorkflow={setSelectedWorkflowId} />

      <WorkflowDetailDrawer
        workflow={selectedWorkflow}
        open={selectedWorkflowId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedWorkflowId(null);
        }}
      />
    </PageContainer>
  );
}
