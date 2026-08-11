import { Activity, CheckCircle2, Timer } from "lucide-react";
import { AgentMetrics, type MetricStat } from "@/components/agents/AgentMetrics";
import type { ToolExecutionMetrics } from "@/types/tool";

interface ToolUsagePanelProps {
  metrics: ToolExecutionMetrics;
}

export function ToolUsagePanel({ metrics }: ToolUsagePanelProps) {
  const stats: MetricStat[] = [
    { id: "total", label: "Total Executions", value: metrics.totalExecutions.toLocaleString(), icon: Activity },
    { id: "success", label: "Success Rate", value: `${metrics.successRate}%`, icon: CheckCircle2 },
    { id: "avg-time", label: "Avg Execution Time", value: metrics.avgExecutionTime, icon: Timer },
  ];

  return <AgentMetrics stats={stats} compact />;
}
