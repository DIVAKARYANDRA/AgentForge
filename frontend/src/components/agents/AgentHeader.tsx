import { motion } from "framer-motion";
import { Plus, Bot, Activity, CheckCircle2, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoDataBadge } from "@/components/common/DemoDataBadge";
import { AgentMetrics, type MetricStat } from "@/components/agents/AgentMetrics";

interface AgentHeaderProps {
  totalAgents: number;
  activeAgents: number;
  successfulExecutions: number;
  averageExecutionTime: string;
}

export function AgentHeader({
  totalAgents,
  activeAgents,
  successfulExecutions,
  averageExecutionTime,
}: AgentHeaderProps) {
  const stats: MetricStat[] = [
    { id: "total", label: "Total Agents", value: totalAgents.toString(), icon: Bot },
    { id: "active", label: "Active Agents", value: activeAgents.toString(), icon: Activity },
    {
      id: "successful",
      label: "Successful Executions",
      value: successfulExecutions.toLocaleString(),
      icon: CheckCircle2,
    },
    {
      id: "avg-time",
      label: "Average Execution Time",
      value: averageExecutionTime,
      icon: Timer,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-6 border-b border-border pb-8"
    >
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Agents
            </h1>
            <DemoDataBadge />
          </div>
          <p className="mt-1.5 max-w-lg text-sm text-muted-foreground sm:text-base">
            Manage autonomous AI agents, capabilities, and execution behavior.
          </p>
        </div>

        <Button className="w-fit gap-2">
          <Plus className="size-4" />
          Create Agent
        </Button>
      </div>

      <AgentMetrics stats={stats} />
    </motion.div>
  );
}
