import { StatusBadge } from "@/components/common/StatusBadge";
import { agents } from "@/data/agents";
import { AGENT_ROLE_LABELS } from "@/types/agent";
import type { WorkflowAgentAssignment } from "@/types/workflow";

interface WorkflowAgentsPanelProps {
  assignments: WorkflowAgentAssignment[];
}

export function WorkflowAgentsPanel({ assignments }: WorkflowAgentsPanelProps) {
  if (assignments.length === 0) {
    return <p className="text-xs text-subtle-foreground">No agents assigned.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {assignments.map((assignment) => {
        const agent = agents.find((a) => a.id === assignment.agentId);
        if (!agent) return null;

        return (
          <div
            key={assignment.agentId}
            className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">
                {agent.name}
                <span className="ml-1.5 text-subtle-foreground">
                  · {AGENT_ROLE_LABELS[agent.role]}
                </span>
              </p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                {assignment.roleInWorkflow}
              </p>
            </div>
            <StatusBadge status={agent.status} />
          </div>
        );
      })}
    </div>
  );
}
