import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MetricStat {
  id: string;
  label: string;
  value: string;
  icon?: LucideIcon;
}

interface AgentMetricsProps {
  stats: MetricStat[];
  className?: string;
  /** Compact variant used inside the detail drawer's Overview section. */
  compact?: boolean;
}

export function AgentMetrics({ stats, className, compact }: AgentMetricsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3",
        compact ? "sm:grid-cols-3" : "sm:grid-cols-4",
        className
      )}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: i * 0.04, ease: "easeOut" }}
          className={cn(
            "rounded-lg border border-border bg-surface p-3.5",
            compact && "p-3"
          )}
        >
          <div className="flex items-center gap-2 text-subtle-foreground">
            {stat.icon && <stat.icon className="size-3.5" />}
            <p className="text-xs">{stat.label}</p>
          </div>
          <p
            className={cn(
              "mt-1.5 font-mono font-semibold tabular-nums text-foreground",
              compact ? "text-lg" : "text-xl"
            )}
          >
            {stat.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
