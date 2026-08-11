import { Wrench, HeartPulse, Activity, Timer } from "lucide-react";
import { AgentMetrics, type MetricStat } from "@/components/agents/AgentMetrics";

interface ToolMetricsProps {
  totalTools: number;
  healthyTools: number;
  totalExecutions: number;
  averageExecutionTime: string;
}

export function ToolMetrics({
  totalTools,
  healthyTools,
  totalExecutions,
  averageExecutionTime,
}: ToolMetricsProps) {
  const stats: MetricStat[] = [
    { id: "total", label: "Total Tools", value: totalTools.toString(), icon: Wrench },
    { id: "healthy", label: "Healthy Tools", value: healthyTools.toString(), icon: HeartPulse },
    { id: "executions", label: "Total Executions", value: totalExecutions.toLocaleString(), icon: Activity },
    { id: "avg-time", label: "Average Execution Time", value: averageExecutionTime, icon: Timer },
  ];

  return <AgentMetrics stats={stats} />;
}
