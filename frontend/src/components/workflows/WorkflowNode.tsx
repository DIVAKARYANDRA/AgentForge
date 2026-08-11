import { Handle, Position, type NodeProps } from "reactflow";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { WorkflowStep, WorkflowStepType } from "@/types/workflow";

export interface WorkflowNodeData {
  step: WorkflowStep;
  icon: LucideIcon;
  /** Resolved agent or tool name for this step, shown as a subtitle. */
  subtitle?: string;
}

const TYPE_LABEL: Record<WorkflowStepType, string> = {
  agent: "Agent",
  tool: "Tool",
  process: "Process",
  decision: "Decision",
};

/**
 * Renders one step in a workflow's execution pipeline. Handles sit on the
 * left/right edges so edges read left-to-right, matching the horizontal
 * "orchestration pipeline" language established on Mission Control.
 */
export function WorkflowNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  const { step, icon: Icon, subtitle } = data;
  const reduceMotion = useReducedMotion();
  const isRunning = step.status === "running";

  return (
    <div
      role="img"
      aria-label={`${step.name}, ${TYPE_LABEL[step.type]}, ${step.status}`}
      className={cn(
        "flex w-44 flex-col gap-2.5 rounded-lg border bg-surface p-3 shadow-sm shadow-black/20 transition-colors",
        isRunning
          ? "border-primary"
          : selected
            ? "border-primary/60"
            : "border-border"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-2 !border-border-strong !bg-surface-3"
      />

      <div className="flex items-center justify-between gap-2">
        <motion.div
          className={cn(
            "flex size-7 items-center justify-center rounded-md",
            isRunning
              ? "bg-primary-muted text-primary-hover"
              : "bg-surface-2 text-muted-foreground"
          )}
          animate={
            isRunning && !reduceMotion
              ? {
                  boxShadow: [
                    "0 0 0 0px rgba(79, 91, 238, 0.45)",
                    "0 0 0 5px rgba(79, 91, 238, 0)",
                  ],
                }
              : undefined
          }
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        >
          <Icon className="size-3.5" />
        </motion.div>
        <StatusBadge status={step.status} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-foreground">{step.name}</p>
        <p className="truncate text-[10px] text-subtle-foreground">
          {TYPE_LABEL[step.type]}
          {subtitle ? ` · ${subtitle}` : ""}
        </p>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!size-2 !border-border-strong !bg-surface-3"
      />
    </div>
  );
}
