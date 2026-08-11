import { useReducedMotion } from "framer-motion";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";
import { CHART_COLOR, chartAxisTickStyle, chartTooltipStyle } from "@/components/analytics/chart-theme";
import type { DailyExecutionPoint } from "@/types/analytics";

interface ExecutionTrendsProps {
  data: DailyExecutionPoint[];
}

export function ExecutionTrends({ data }: ExecutionTrendsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Execution Trends"
        description="Successful and failed executions across agents, workflows, and tools, last 7 days."
      />

      <Card className="p-5">
        <div className="h-64 w-full" role="img" aria-label="Line chart of daily successful and failed executions over the last 7 days">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid stroke={CHART_COLOR.border} vertical={false} />
              <XAxis dataKey="label" tick={chartAxisTickStyle} axisLine={{ stroke: CHART_COLOR.border }} tickLine={false} />
              <YAxis tick={chartAxisTickStyle} axisLine={{ stroke: CHART_COLOR.border }} tickLine={false} width={32} allowDecimals={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Line
                type="monotone"
                dataKey="successful"
                name="Successful"
                stroke={CHART_COLOR.success}
                strokeWidth={2}
                dot={{ r: 3, fill: CHART_COLOR.success, strokeWidth: 0 }}
                isAnimationActive={!reduceMotion}
              />
              <Line
                type="monotone"
                dataKey="failed"
                name="Failed"
                stroke={CHART_COLOR.destructive}
                strokeWidth={2}
                dot={{ r: 3, fill: CHART_COLOR.destructive, strokeWidth: 0 }}
                isAnimationActive={!reduceMotion}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ backgroundColor: CHART_COLOR.success }} />
            <span className="text-muted-foreground">Successful</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ backgroundColor: CHART_COLOR.destructive }} />
            <span className="text-muted-foreground">Failed</span>
          </span>
        </div>
      </Card>
    </section>
  );
}
