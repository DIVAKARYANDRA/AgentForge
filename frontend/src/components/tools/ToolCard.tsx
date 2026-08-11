import { motion, useReducedMotion } from "framer-motion";
import { Zap, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ToolCapabilities } from "@/components/tools/ToolCapabilities";
import { TOOL_CATEGORY_LABELS, type Tool } from "@/types/tool";

interface ToolCardProps {
  tool: Tool;
  index: number;
  onSelect: (toolId: string) => void;
}

export function ToolCard({ tool, index, onSelect }: ToolCardProps) {
  const reduceMotion = useReducedMotion();
  const isHealthy = tool.status === "healthy";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index, 8) * 0.04, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      layout
    >
      <Card
        role="button"
        tabIndex={0}
        aria-label={`View details for ${tool.name}`}
        onClick={() => onSelect(tool.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(tool.id);
          }
        }}
        className={cn(
          "flex h-full cursor-pointer flex-col gap-4 p-4 transition-colors",
          "hover:border-primary/50 hover:bg-surface-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex size-9 shrink-0 items-center justify-center rounded-md bg-surface-2 text-muted-foreground">
              <tool.icon className="size-4" />
              {isHealthy && (
                <motion.span
                  className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-success"
                  animate={
                    !reduceMotion
                      ? { boxShadow: ["0 0 0 0px rgba(52, 211, 153, 0.5)", "0 0 0 4px rgba(52, 211, 153, 0)"] }
                      : undefined
                  }
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{tool.name}</p>
              <p className="mt-0.5 text-xs text-subtle-foreground">
                {TOOL_CATEGORY_LABELS[tool.category]}
              </p>
            </div>
          </div>
          <StatusBadge status={tool.status} />
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {tool.description}
        </p>

        <ToolCapabilities capabilities={tool.capabilities} limit={2} />

        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-border pt-3 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-subtle-foreground">
              <Zap className="size-3" />
            </div>
            <p className="mt-1 font-mono text-xs font-medium text-foreground">
              {tool.executionMetrics.totalExecutions.toLocaleString()}
            </p>
            <p className="text-[10px] text-subtle-foreground">Executions</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-subtle-foreground">
              <Database className="size-3" />
            </div>
            <p className="mt-1 font-mono text-xs font-medium text-foreground">
              {tool.executionMetrics.successRate}%
            </p>
            <p className="text-[10px] text-subtle-foreground">Success</p>
          </div>
        </div>

        <p className="text-[11px] text-subtle-foreground">
          Last run {tool.lastExecution}
        </p>
      </Card>
    </motion.div>
  );
}
