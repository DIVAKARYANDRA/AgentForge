import { GitBranch } from "lucide-react";
import { StatusBadge } from "@/components/common/StatusBadge";
import { agents } from "@/data/agents";
import type { Workflow, WorkflowStep } from "@/types/workflow";

interface SelectedStepPanelProps {
  workflow: Workflow;
  step: WorkflowStep | null;
}

export function SelectedStepPanel({ workflow, step }: SelectedStepPanelProps) {
  if (!step) {
    return (
      <p className="text-xs text-subtle-foreground">
        Select a step on the graph to see its details.
      </p>
    );
  }

  const agent = step.agentId ? agents.find((a) => a.id === step.agentId) : undefined;
  const toolRef = step.toolSlug
    ? workflow.tools.find((t) => t.slug === step.toolSlug)
    : undefined;

  return (
    <div className="flex flex-col gap-2.5 rounded-md border border-border bg-surface-2 p-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-foreground">{step.name}</p>
        <StatusBadge status={step.status} />
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
        <dt className="text-subtle-foreground">Agent</dt>
        <dd className="text-right text-muted-foreground">
          {agent ? agent.name : "—"}
        </dd>

        <dt className="text-subtle-foreground">Tool</dt>
        <dd className="text-right text-muted-foreground">
          {toolRef ? toolRef.name : "—"}
        </dd>

        <dt className="flex items-center gap-1 text-subtle-foreground">
          <GitBranch className="size-3" />
          Condition
        </dt>
        <dd className="text-right font-mono text-[11px] text-muted-foreground">
          {step.condition ?? "Unconditional"}
        </dd>
      </dl>
    </div>
  );
}
