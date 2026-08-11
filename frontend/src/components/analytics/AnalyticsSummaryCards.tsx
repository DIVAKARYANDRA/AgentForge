import { motion } from "framer-motion";
import { Activity, Users, Sparkles, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SuccessRatePanel } from "@/components/analytics/SuccessRatePanel";
import type { AnalyticsOverview } from "@/types/analytics";

interface AnalyticsSummaryCardsProps {
  overview: AnalyticsOverview;
  knowledgeGrowthCount: number;
}

export function AnalyticsSummaryCards({ overview, knowledgeGrowthCount }: AnalyticsSummaryCardsProps) {
  const cards = [
    {
      id: "executions",
      title: "Executions",
      content: (
        <div>
          <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">
            {overview.totalExecutions.toLocaleString()}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-success">
            <TrendingUp className="size-3" />
            total runs across the fleet
          </p>
        </div>
      ),
      icon: Activity,
    },
    {
      id: "success-rate",
      title: "Success Rate",
      content: (
        <SuccessRatePanel
          successful={overview.successfulExecutions}
          failed={overview.failedExecutions}
        />
      ),
      icon: TrendingUp,
    },
    {
      id: "agent-activity",
      title: "Agent Activity",
      content: (
        <div>
          <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">
            {overview.activeAgents}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">agents currently active</p>
        </div>
      ),
      icon: Users,
    },
    {
      id: "knowledge-growth",
      title: "Knowledge Growth",
      content: (
        <div>
          <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">
            +{knowledgeGrowthCount}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-success">
            <TrendingUp className="size-3" />
            new knowledge items recently
          </p>
        </div>
      ),
      icon: Sparkles,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.25, delay: i * 0.05, ease: "easeOut" }}
        >
          <Card className="flex h-full flex-col gap-3 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">{card.title}</p>
              <card.icon className="size-3.5 text-subtle-foreground" />
            </div>
            {card.content}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
