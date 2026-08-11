import { useReducedMotion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";
import { CHART_COLOR, chartAxisTickStyle, chartTooltipStyle } from "@/components/analytics/chart-theme";
import type { ToolAnalyticsEntry } from "@/types/analytics";

interface ToolUsageAnalyticsProps {
  data: ToolAnalyticsEntry[];
}

export function ToolUsageAnalytics({ data }: ToolUsageAnalyticsProps) {
  const reduceMotion = useReducedMotion();
  const ranked = [...data].sort((a, b) => b.executions - a.executions);
  const chartData = ranked.map((t) => ({ name: t.toolName, executions: t.executions }));

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Tool Usage Analytics"
        description="Which execution capabilities the fleet relies on most."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-5">
          <div className="h-56 w-full" role="img" aria-label="Bar chart of execution count per tool">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={CHART_COLOR.border} horizontal={false} />
                <XAxis type="number" tick={chartAxisTickStyle} axisLine={{ stroke: CHART_COLOR.border }} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={chartAxisTickStyle}
                  axisLine={{ stroke: CHART_COLOR.border }}
                  tickLine={false}
                  width={90}
                />
                <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "var(--color-surface-3)", opacity: 0.4 }} />
                <Bar
                  dataKey="executions"
                  name="Executions"
                  fill={CHART_COLOR.primary}
                  radius={[0, 4, 4, 0]}
                  isAnimationActive={!reduceMotion}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col gap-2 p-4">
          <p className="text-xs font-medium text-muted-foreground">Ranking</p>
          {ranked.map((tool, i) => (
            <div
              key={tool.toolId}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3 py-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-3 font-mono text-[10px] text-subtle-foreground">
                  {i + 1}
                </span>
                <span className="truncate text-xs font-medium text-foreground">{tool.toolName}</span>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                {tool.executions.toLocaleString()}
              </span>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}
