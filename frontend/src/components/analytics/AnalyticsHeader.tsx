import { motion } from "framer-motion";
import { Activity, CheckCircle2, Users, TrendingUp } from "lucide-react";
import { DemoDataBadge } from "@/components/common/DemoDataBadge";
import { AgentMetrics, type MetricStat } from "@/components/agents/AgentMetrics";

interface AnalyticsHeaderProps {
  totalExecutions: number;
  successRate: number;
  activeAgents: number;
  knowledgeGrowth: number;
}

export function AnalyticsHeader({
  totalExecutions,
  successRate,
  activeAgents,
  knowledgeGrowth,
}: AnalyticsHeaderProps) {
  const stats: MetricStat[] = [
    { id: "executions", label: "Total Executions", value: totalExecutions.toLocaleString(), icon: Activity },
    { id: "success", label: "Success Rate", value: `${successRate}%`, icon: CheckCircle2 },
    { id: "active-agents", label: "Active Agents", value: activeAgents.toString(), icon: Users },
    { id: "knowledge-growth", label: "Knowledge Growth", value: `+${knowledgeGrowth}`, icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-6 border-b border-border pb-8"
    >
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Analytics
          </h1>
          <DemoDataBadge />
        </div>
        <p className="mt-1.5 max-w-lg text-sm text-muted-foreground sm:text-base">
          Monitor AI performance, execution intelligence, and system evolution.
        </p>
      </div>

      <AgentMetrics stats={stats} />
    </motion.div>
  );
}
