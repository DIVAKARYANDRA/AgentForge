import { useReducedMotion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Award, AlertTriangle } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";
import { CHART_COLOR, chartAxisTickStyle, chartTooltipStyle } from "@/components/analytics/chart-theme";
import type { WorkflowAnalyticsEntry } from "@/types/analytics";

interface WorkflowAnalyticsProps {
  data: WorkflowAnalyticsEntry[];
}

export function WorkflowAnalytics({ data }: WorkflowAnalyticsProps) {
  const reduceMotion = useReducedMotion();
  const best = [...data].sort((a, b) => b.successRate - a.successRate)[0];
  const worst = [...data].sort((a, b) => b.failureCount - a.failureCount)[0];

  const chartData = data.map((w) => ({
    name: w.workflowName.replace(" Workflow", "").replace(" Automation", ""),
    runs: w.runs,
  }));

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Workflow Analytics"
        description="Run volume, reliability, and failure counts per workflow."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card className="flex items-center gap-3 p-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-success-muted text-success">
            <Award className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-subtle-foreground">Highest performing workflow</p>
            <p className="truncate text-sm font-medium text-foreground">{best?.workflowName}</p>
            <p className="text-xs text-muted-foreground">{best?.successRate}% success rate</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-destructive-muted text-destructive">
            <AlertTriangle className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-subtle-foreground">Most failed workflow</p>
            <p className="truncate text-sm font-medium text-foreground">{worst?.workflowName}</p>
            <p className="text-xs text-muted-foreground">{worst?.failureCount} failed runs</p>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="h-56 w-full" role="img" aria-label="Bar chart of total runs per workflow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid stroke={CHART_COLOR.border} vertical={false} />
              <XAxis dataKey="name" tick={chartAxisTickStyle} axisLine={{ stroke: CHART_COLOR.border }} tickLine={false} />
              <YAxis tick={chartAxisTickStyle} axisLine={{ stroke: CHART_COLOR.border }} tickLine={false} width={40} />
              <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "var(--color-surface-3)", opacity: 0.4 }} />
              <Bar
                dataKey="runs"
                name="Runs"
                fill={CHART_COLOR.primary}
                radius={[4, 4, 0, 0]}
                isAnimationActive={!reduceMotion}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-subtle-foreground">
                  Workflow
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-subtle-foreground">
                  Runs
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-subtle-foreground">
                  Success Rate
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-subtle-foreground">
                  Failures
                </th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-subtle-foreground">
                  Avg Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((workflow) => (
                <tr key={workflow.workflowId} className="border-b border-border last:border-b-0 hover:bg-surface-2">
                  <td className="px-4 py-3 font-medium text-foreground">{workflow.workflowName}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground tabular-nums">
                    {workflow.runs.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground tabular-nums">
                    {workflow.successRate}%
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground tabular-nums">
                    {workflow.failureCount}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground tabular-nums">
                    {workflow.averageDuration}
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
