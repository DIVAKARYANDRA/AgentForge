import { GitBranch } from "lucide-react";
import type { WorkflowCondition } from "@/types/workflow";

interface WorkflowConditionsPanelProps {
  conditions: WorkflowCondition[];
}

export function WorkflowConditionsPanel({ conditions }: WorkflowConditionsPanelProps) {
  if (conditions.length === 0) {
    return (
      <p className="text-xs text-subtle-foreground">
        This workflow runs unconditionally — every step executes in sequence.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {conditions.map((condition) => (
        <div
          key={condition.id}
          className="flex flex-col gap-1.5 rounded-md border border-border bg-surface-2 p-3"
        >
          <div className="flex items-center gap-1.5 text-[11px] text-subtle-foreground">
            <GitBranch className="size-3" />
            Gates <span className="font-medium text-muted-foreground">{condition.stepName}</span>
          </div>
          <code className="w-fit rounded-sm bg-surface-3 px-1.5 py-0.5 font-mono text-[11px] text-primary-hover">
            {condition.rule}
          </code>
          <p className="text-xs text-muted-foreground">{condition.description}</p>
        </div>
      ))}
    </div>
  );
}
