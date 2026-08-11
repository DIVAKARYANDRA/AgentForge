import { cn } from "@/lib/utils";
import type { AgentWorkflowRef } from "@/types/agent";

interface AgentWorkflowPanelProps {
  workflows: AgentWorkflowRef[];
}

const WORKFLOW_STATUS_STYLES: Record<AgentWorkflowRef["status"], string> = {
  active: "bg-success-muted text-success",
  paused: "bg-warning-muted text-warning",
  completed: "bg-surface-3 text-muted-foreground",
};

export function AgentWorkflowPanel({ workflows }: AgentWorkflowPanelProps) {
  if (workflows.length === 0) {
    return (
      <p className="text-xs text-subtle-foreground">
        Not currently assigned to a workflow.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {workflows.map((wf) => (
        <div
          key={wf.id}
          className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3 py-2.5"
        >
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-foreground">{wf.name}</p>
            <p className="mt-0.5 text-[11px] text-subtle-foreground">{wf.stage}</p>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide",
              WORKFLOW_STATUS_STYLES[wf.status]
            )}
          >
            {wf.status}
          </span>
        </div>
      ))}
    </div>
  );
}
