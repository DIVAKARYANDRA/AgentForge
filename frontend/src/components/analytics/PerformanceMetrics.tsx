import { SectionHeader } from "@/components/common/SectionHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { AgentPerformanceChart } from "@/components/analytics/AgentPerformanceChart";
import type { AgentAnalytics } from "@/types/analytics";

interface PerformanceMetricsProps {
  data: AgentAnalytics[];
}

export function PerformanceMetrics({ data }: PerformanceMetricsProps) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Agent Performance"
        description="Execution volume and reliability for every agent in the fleet."
      />

      <Card className="p-5">
        <AgentPerformanceChart data={data} />
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-subtle-foreground">
                  Agent
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-subtle-foreground">
                  Executions
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-subtle-foreground">
                  Success Rate
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-subtle-foreground">
                  Avg Duration
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-subtle-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((agent) => (
                <tr key={agent.agentId} className="border-b border-border last:border-b-0 hover:bg-surface-2">
                  <td className="px-4 py-3 font-medium text-foreground">{agent.agentName}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground tabular-nums">
                    {agent.executions.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground tabular-nums">
                    {agent.successRate}%
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground tabular-nums">
                    {agent.averageDuration}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={agent.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}
