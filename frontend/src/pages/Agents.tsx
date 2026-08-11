import { useMemo, useState } from "react";
import { PageContainer } from "@/layouts/PageContainer";
import { AgentHeader } from "@/components/agents/AgentHeader";
import { AgentSearch } from "@/components/agents/AgentSearch";
import { AgentFilters } from "@/components/agents/AgentFilters";
import { AgentGrid } from "@/components/agents/AgentGrid";
import { AgentDetailDrawer } from "@/components/agents/AgentDetailDrawer";
import { agents } from "@/data/agents";
import type { AgentRole, AgentStatus } from "@/types/agent";

/** Parses a mock duration string like "1.4s" into seconds. */
function parseSeconds(value: string): number {
  return parseFloat(value.replace("s", "")) || 0;
}

export default function Agents() {
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState<AgentStatus[]>([]);
  const [roles, setRoles] = useState<AgentRole[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const filteredAgents = useMemo(() => {
    const q = query.trim().toLowerCase();

    return agents.filter((agent) => {
      const matchesStatus = statuses.length === 0 || statuses.includes(agent.status);
      const matchesRole = roles.length === 0 || roles.includes(agent.role);
      if (!matchesStatus || !matchesRole) return false;
      if (!q) return true;

      const haystack = [
        agent.name,
        agent.role,
        ...agent.capabilities.map((c) => c.name),
        ...agent.tools.map((t) => t.name + " " + t.slug),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query, statuses, roles]);

  const selectedAgent = useMemo(
    () => agents.find((a) => a.id === selectedAgentId) ?? null,
    [selectedAgentId]
  );

  const totalAgents = agents.length;
  const activeAgents = agents.filter(
    (a) => a.status === "healthy" || a.status === "running"
  ).length;
  const successfulExecutions = agents.reduce(
    (sum, a) => sum + Math.round(a.metrics.totalExecutions * (a.metrics.successRate / 100)),
    0
  );
  const averageExecutionTime = (
    agents.length > 0
      ? agents.reduce((sum, a) => sum + parseSeconds(a.metrics.avgExecutionTime), 0) / agents.length
      : 0
  ).toFixed(1);

  return (
    <PageContainer className="flex flex-col gap-8">
      <AgentHeader
        totalAgents={totalAgents}
        activeAgents={activeAgents}
        successfulExecutions={successfulExecutions}
        averageExecutionTime={`${averageExecutionTime}s`}
      />

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <AgentSearch value={query} onChange={setQuery} />
        <AgentFilters
          selectedStatuses={statuses}
          onStatusesChange={setStatuses}
          selectedRoles={roles}
          onRolesChange={setRoles}
        />
      </div>

      <AgentGrid agents={filteredAgents} onSelectAgent={setSelectedAgentId} />

      <AgentDetailDrawer
        agent={selectedAgent}
        open={selectedAgentId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedAgentId(null);
        }}
      />
    </PageContainer>
  );
}
