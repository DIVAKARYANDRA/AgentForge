import { useReducedMotion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BookOpen, ArrowUpCircle } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";
import { CHART_COLOR, chartAxisTickStyle, chartTooltipStyle } from "@/components/analytics/chart-theme";
import type { KnowledgeAnalyticsSummary } from "@/types/analytics";

interface KnowledgeAnalyticsProps {
  data: KnowledgeAnalyticsSummary;
}

const CONFIDENCE_COLOR: Record<string, string> = {
  High: CHART_COLOR.success,
  Medium: CHART_COLOR.warning,
  Low: CHART_COLOR.subtleForeground,
};

export function KnowledgeAnalytics({ data }: KnowledgeAnalyticsProps) {
  const reduceMotion = useReducedMotion();
  const confidenceData = [
    { name: "High", count: data.confidenceDistribution.high },
    { name: "Medium", count: data.confidenceDistribution.medium },
    { name: "Low", count: data.confidenceDistribution.low },
  ];

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Knowledge Analytics"
        description="What the fleet has learned, and where it came from."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card className="flex items-center gap-3 p-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary-muted text-primary-hover">
            <BookOpen className="size-4" />
          </div>
          <div>
            <p className="font-mono text-xl font-semibold tabular-nums text-foreground">
              {data.totalKnowledge}
            </p>
            <p className="text-[11px] text-subtle-foreground">Total Knowledge Items</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-success-muted text-success">
            <ArrowUpCircle className="size-4" />
          </div>
          <div>
            <p className="font-mono text-xl font-semibold tabular-nums text-foreground">
              {data.promotedItems}
            </p>
            <p className="text-[11px] text-subtle-foreground">Promoted Memories</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card className="p-5">
          <p className="mb-3 text-xs font-medium text-muted-foreground">Confidence Distribution</p>
          <div className="h-44 w-full" role="img" aria-label="Bar chart of knowledge items by confidence level">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={confidenceData} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={CHART_COLOR.border} horizontal={false} />
                <XAxis type="number" tick={chartAxisTickStyle} axisLine={{ stroke: CHART_COLOR.border }} tickLine={false} allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={chartAxisTickStyle}
                  axisLine={{ stroke: CHART_COLOR.border }}
                  tickLine={false}
                  width={56}
                />
                <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "var(--color-surface-3)", opacity: 0.4 }} />
                <Bar dataKey="count" name="Items" radius={[0, 4, 4, 0]} isAnimationActive={!reduceMotion}>
                  {confidenceData.map((entry) => (
                    <Cell key={entry.name} fill={CONFIDENCE_COLOR[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col gap-2 p-4">
          <p className="text-xs font-medium text-muted-foreground">Top Knowledge Sources</p>
          {data.topSources.map((source, i) => (
            <div
              key={source.agentName}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3 py-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-3 font-mono text-[10px] text-subtle-foreground">
                  {i + 1}
                </span>
                <span className="truncate text-xs font-medium text-foreground">{source.agentName}</span>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                {source.contributions}
              </span>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}
