import { StatusBadge } from "@/components/common/StatusBadge";
import { agents } from "@/data/agents";
import { AGENT_ROLE_LABELS } from "@/types/agent";

interface ToolAgentsPanelProps {
  agentIds: string[];
}

export function ToolAgentsPanel({ agentIds }: ToolAgentsPanelProps) {
  const resolvedAgents = agentIds
    .map((id) => agents.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (resolvedAgents.length === 0) {
    return <p className="text-xs text-subtle-foreground">No agents currently use this tool.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {resolvedAgents.map((agent) => (
        <div
          key={agent.id}
          className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3 py-2.5"
        >
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-foreground">{agent.name}</p>
            <p className="mt-0.5 text-[11px] text-subtle-foreground">
              {AGENT_ROLE_LABELS[agent.role]}
            </p>
          </div>
          <StatusBadge status={agent.status} />
        </div>
      ))}
    </div>
  );
}
