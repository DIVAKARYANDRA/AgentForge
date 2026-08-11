import { motion } from "framer-motion";
import { DemoDataBadge } from "@/components/common/DemoDataBadge";
import { ToolMetrics } from "@/components/tools/ToolMetrics";

interface ToolHeaderProps {
  totalTools: number;
  healthyTools: number;
  totalExecutions: number;
  averageExecutionTime: string;
}

export function ToolHeader({
  totalTools,
  healthyTools,
  totalExecutions,
  averageExecutionTime,
}: ToolHeaderProps) {
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
            Tools
          </h1>
          <DemoDataBadge />
        </div>
        <p className="mt-1.5 max-w-lg text-sm text-muted-foreground sm:text-base">
          Manage execution capabilities available to autonomous agents.
        </p>
      </div>

      <ToolMetrics
        totalTools={totalTools}
        healthyTools={healthyTools}
        totalExecutions={totalExecutions}
        averageExecutionTime={averageExecutionTime}
      />
    </motion.div>
  );
}
