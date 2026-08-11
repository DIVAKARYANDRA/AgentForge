import { useReducedMotion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CHART_COLOR, chartTooltipStyle } from "@/components/analytics/chart-theme";

interface SuccessRatePanelProps {
  successful: number;
  failed: number;
}

export function SuccessRatePanel({ successful, failed }: SuccessRatePanelProps) {
  const total = successful + failed;
  const successRate = total > 0 ? Math.round((successful / total) * 100) : 0;
  const reduceMotion = useReducedMotion();

  const data = [
    { name: "Successful", value: successful, color: CHART_COLOR.success },
    { name: "Failed", value: failed, color: CHART_COLOR.destructive },
  ];

  return (
    <div className="flex items-center gap-4">
      <div className="relative size-24 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={32}
              outerRadius={44}
              paddingAngle={2}
              stroke="none"
              isAnimationActive={!reduceMotion}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={chartTooltipStyle}
              formatter={(value, name) => [
                typeof value === "number" ? value.toLocaleString() : String(value),
                String(name),
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-sm font-semibold text-foreground">{successRate}%</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full" style={{ backgroundColor: CHART_COLOR.success }} />
          <span className="text-muted-foreground">Successful</span>
          <span className="font-mono text-foreground">{successful.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full" style={{ backgroundColor: CHART_COLOR.destructive }} />
          <span className="text-muted-foreground">Failed</span>
          <span className="font-mono text-foreground">{failed.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
