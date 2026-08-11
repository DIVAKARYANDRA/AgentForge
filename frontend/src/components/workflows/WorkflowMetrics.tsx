import { Activity, CheckCircle2, XCircle, Timer } from "lucide-react";
import { AgentMetrics, type MetricStat } from "@/components/agents/AgentMetrics";
import type { WorkflowExecutionMetrics } from "@/types/workflow";

interface WorkflowMetricsProps {
  metrics: WorkflowExecutionMetrics;
  compact?: boolean;
}

/**
 * Thin domain wrapper around the shared AgentMetrics stat grid — keeps
 * the visual primitive in one place while giving workflows their own
 * stat vocabulary (total/successful/failed runs, avg duration).
 */
export function WorkflowMetrics({ metrics, compact }: WorkflowMetricsProps) {
  const stats: MetricStat[] = [
    { id: "total", label: "Total Runs", value: metrics.totalRuns.toLocaleString(), icon: Activity },
    { id: "successful", label: "Successful Runs", value: metrics.successfulRuns.toLocaleString(), icon: CheckCircle2 },
    { id: "failed", label: "Failed Runs", value: metrics.failedRuns.toLocaleString(), icon: XCircle },
    { id: "avg-duration", label: "Avg Duration", value: metrics.avgDuration, icon: Timer },
  ];

  return <AgentMetrics stats={stats} compact={compact} />;
}
