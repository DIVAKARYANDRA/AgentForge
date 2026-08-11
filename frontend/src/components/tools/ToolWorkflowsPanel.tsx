import { StatusBadge } from "@/components/common/StatusBadge";
import { workflows } from "@/data/workflows";
import { WORKFLOW_CATEGORY_LABELS } from "@/types/workflow";

interface ToolWorkflowsPanelProps {
  workflowIds: string[];
}

export function ToolWorkflowsPanel({ workflowIds }: ToolWorkflowsPanelProps) {
  const resolvedWorkflows = workflowIds
    .map((id) => workflows.find((w) => w.id === id))
    .filter((w): w is NonNullable<typeof w> => Boolean(w));

  if (resolvedWorkflows.length === 0) {
    return <p className="text-xs text-subtle-foreground">No workflows currently include this tool.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {resolvedWorkflows.map((workflow) => (
        <div
          key={workflow.id}
          className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3 py-2.5"
        >
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-foreground">{workflow.name}</p>
            <p className="mt-0.5 text-[11px] text-subtle-foreground">
              {WORKFLOW_CATEGORY_LABELS[workflow.category]}
            </p>
          </div>
          <StatusBadge status={workflow.status} />
        </div>
      ))}
    </div>
  );
}
