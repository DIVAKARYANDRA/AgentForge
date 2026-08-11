import { useReducedMotion } from "framer-motion";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_COLOR, chartAxisTickStyle, chartTooltipStyle } from "@/components/analytics/chart-theme";
import type { AgentAnalytics } from "@/types/analytics";

interface AgentPerformanceChartProps {
  data: AgentAnalytics[];
}

export function AgentPerformanceChart({ data }: AgentPerformanceChartProps) {
  const reduceMotion = useReducedMotion();
  const chartData = data.map((a) => ({
    name: a.agentName.replace(" Agent", ""),
    executions: a.executions,
    successRate: a.successRate,
  }));

  return (
    <div className="h-64 w-full" role="img" aria-label="Bar chart of executions per agent with a success rate line overlay">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid stroke={CHART_COLOR.border} vertical={false} />
          <XAxis dataKey="name" tick={chartAxisTickStyle} axisLine={{ stroke: CHART_COLOR.border }} tickLine={false} />
          <YAxis
            yAxisId="left"
            tick={chartAxisTickStyle}
            axisLine={{ stroke: CHART_COLOR.border }}
            tickLine={false}
            width={44}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 100]}
            tick={chartAxisTickStyle}
            axisLine={{ stroke: CHART_COLOR.border }}
            tickLine={false}
            width={36}
          />
          <Tooltip
            contentStyle={chartTooltipStyle}
            cursor={{ fill: "var(--color-surface-3)", opacity: 0.4 }}
          />
          <Bar
            yAxisId="left"
            dataKey="executions"
            name="Executions"
            fill={CHART_COLOR.primary}
            radius={[4, 4, 0, 0]}
            isAnimationActive={!reduceMotion}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="successRate"
            name="Success Rate %"
            stroke={CHART_COLOR.success}
            strokeWidth={2}
            dot={{ r: 3, fill: CHART_COLOR.success, strokeWidth: 0 }}
            isAnimationActive={!reduceMotion}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
