import { useReducedMotion, motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Sparkles, Database, BookOpen, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";
import { CHART_COLOR, chartAxisTickStyle, chartTooltipStyle } from "@/components/analytics/chart-theme";
import { MEMORY_TYPE_SHORT_LABELS } from "@/types/memory";
import type { MemoryAnalyticsEntry } from "@/types/analytics";

interface MemoryGrowthChartProps {
  data: MemoryAnalyticsEntry[];
}

const TYPE_BAR_COLOR: Record<string, string> = {
  working: CHART_COLOR.info,
  session: CHART_COLOR.primary,
  long_term: CHART_COLOR.warning,
  knowledge: CHART_COLOR.success,
};

const STAGES = [
  { id: "experience", label: "Experience", icon: Sparkles },
  { id: "memory", label: "Memory", icon: Database },
  { id: "knowledge", label: "Knowledge", icon: BookOpen },
];

export function MemoryGrowthChart({ data }: MemoryGrowthChartProps) {
  const reduceMotion = useReducedMotion();
  const chartData = data.map((m) => ({
    name: MEMORY_TYPE_SHORT_LABELS[m.memoryType],
    count: m.count,
    type: m.memoryType,
  }));

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Memory Growth"
        description="How memory is distributed across working, session, long-term, and knowledge storage."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Card className="p-5">
          <div className="h-56 w-full" role="img" aria-label="Bar chart of memory entry counts by type">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid stroke={CHART_COLOR.border} vertical={false} />
                <XAxis dataKey="name" tick={chartAxisTickStyle} axisLine={{ stroke: CHART_COLOR.border }} tickLine={false} />
                <YAxis tick={chartAxisTickStyle} axisLine={{ stroke: CHART_COLOR.border }} tickLine={false} width={32} allowDecimals={false} />
                <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "var(--color-surface-3)", opacity: 0.4 }} />
                <Bar dataKey="count" name="Entries" radius={[4, 4, 0, 0]} isAnimationActive={!reduceMotion}>
                  {chartData.map((entry) => (
                    <Cell key={entry.type} fill={TYPE_BAR_COLOR[entry.type]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center gap-4 p-5">
          <p className="self-start text-xs font-medium text-muted-foreground">
            How memory becomes knowledge
          </p>
          <div className="flex items-center gap-2">
            {STAGES.map((stage, i) => (
              <div key={stage.id} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.3, delay: reduceMotion ? 0 : i * 0.15, ease: "easeOut" }}
                  className="flex flex-col items-center gap-1.5 text-center"
                >
                  <div className="flex size-10 items-center justify-center rounded-full border border-border bg-surface-2 text-muted-foreground">
                    <stage.icon className="size-4" />
                  </div>
                  <p className="text-[11px] font-medium text-foreground">{stage.label}</p>
                </motion.div>
                {i < STAGES.length - 1 && (
                  <ArrowRight className="size-3.5 shrink-0 text-subtle-foreground" />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] leading-relaxed text-subtle-foreground">
            A completed task becomes memory; a reusable pattern in that memory gets promoted into
            shared knowledge.
          </p>
        </Card>
      </div>
    </section>
  );
}
