import { motion } from "framer-motion";
import { Wrench, ListOrdered, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { agents } from "@/data/agents";
import { WORKFLOW_CATEGORY_LABELS, type Workflow } from "@/types/workflow";

interface WorkflowCardProps {
  workflow: Workflow;
  index: number;
  onSelect: (workflowId: string) => void;
}

export function WorkflowCard({ workflow, index, onSelect }: WorkflowCardProps) {
  const successRate = workflow.executionMetrics.totalRuns > 0
    ? Math.round(
        (workflow.executionMetrics.successfulRuns / workflow.executionMetrics.totalRuns) * 100
      )
    : 0;
  const assignedAgents = workflow.agents
    .map((a) => agents.find((agent) => agent.id === a.agentId))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const visibleAgents = assignedAgents.slice(0, 2);
  const overflowAgents = assignedAgents.length - visibleAgents.length;

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
        aria-label={`View details for ${workflow.name}`}
        onClick={() => onSelect(workflow.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(workflow.id);
          }
        }}
        className={cn(
          "flex h-full cursor-pointer flex-col gap-4 p-4 transition-colors",
          "hover:border-primary/50 hover:bg-surface-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {workflow.name}
            </p>
            <p className="mt-0.5 text-xs text-subtle-foreground">
              {WORKFLOW_CATEGORY_LABELS[workflow.category]}
            </p>
          </div>
          <StatusBadge status={workflow.status} />
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {workflow.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {visibleAgents.map((agent) => (
            <Badge key={agent.id} variant="outline" className="normal-case">
              {agent.name}
            </Badge>
          ))}
          {overflowAgents > 0 && (
            <Badge variant="outline" className="normal-case text-subtle-foreground">
              +{overflowAgents} more
            </Badge>
          )}
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-subtle-foreground">
              <ListOrdered className="size-3" />
            </div>
            <p className="mt-1 font-mono text-xs font-medium text-foreground">
              {workflow.steps.length}
            </p>
            <p className="text-[10px] text-subtle-foreground">Steps</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-subtle-foreground">
              <Wrench className="size-3" />
            </div>
            <p className="mt-1 font-mono text-xs font-medium text-foreground">
              {workflow.tools.length}
            </p>
            <p className="text-[10px] text-subtle-foreground">Tools</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-subtle-foreground">
              <TrendingUp className="size-3" />
            </div>
            <p className="mt-1 font-mono text-xs font-medium text-foreground">
              {successRate}%
            </p>
            <p className="text-[10px] text-subtle-foreground">Success</p>
          </div>
        </div>

        <Badge variant="outline" className="w-fit normal-case text-subtle-foreground">
          Last run {workflow.lastExecution}
        </Badge>
      </Card>
    </motion.div>
  );
}
