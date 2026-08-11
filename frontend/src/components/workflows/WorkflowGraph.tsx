import { useMemo, useState, useCallback } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from "reactflow";
import "reactflow/dist/base.css";
import { useReducedMotion } from "framer-motion";
import { Bot, Wrench, Cog, GitBranch, type LucideIcon } from "lucide-react";
import { WorkflowNode, type WorkflowNodeData } from "@/components/workflows/WorkflowNode";
import { SelectedStepPanel } from "@/components/workflows/SelectedStepPanel";
import { agents } from "@/data/agents";
import type { Workflow, WorkflowStepType } from "@/types/workflow";

const nodeTypes = { workflowStep: WorkflowNode };

const STEP_TYPE_ICON: Record<WorkflowStepType, LucideIcon> = {
  agent: Bot,
  tool: Wrench,
  process: Cog,
  decision: GitBranch,
};

const NODE_SPACING_X = 224;

interface WorkflowGraphProps {
  workflow: Workflow;
}

/**
 * Renders a workflow's steps as a left-to-right orchestration pipeline
 * using React Flow, rather than a generic boxes-and-arrows chart: each
 * node carries a step-type icon, resolved agent/tool subtitle, and a
 * live status badge, and only the active step's connector animates.
 */
export function WorkflowGraph({ workflow }: WorkflowGraphProps) {
  const reduceMotion = useReducedMotion();
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  const sortedSteps = useMemo(
    () => [...workflow.steps].sort((a, b) => a.order - b.order),
    [workflow.steps]
  );

  const nodes: Node<WorkflowNodeData>[] = useMemo(
    () =>
      sortedSteps.map((step, i) => {
        const agent = step.agentId ? agents.find((a) => a.id === step.agentId) : undefined;
        const toolRef = step.toolSlug
          ? workflow.tools.find((t) => t.slug === step.toolSlug)
          : undefined;

        return {
          id: step.id,
          type: "workflowStep",
          position: { x: i * NODE_SPACING_X, y: 0 },
          data: {
            step,
            icon: toolRef?.icon ?? STEP_TYPE_ICON[step.type],
            subtitle: agent?.name ?? toolRef?.name,
          },
          draggable: false,
          selectable: true,
        };
      }),
    [sortedSteps, workflow.tools]
  );

  const edges: Edge[] = useMemo(
    () =>
      sortedSteps.slice(1).map((step, i) => {
        const source = sortedSteps[i];
        const isLive = !reduceMotion && step.status === "running";
        return {
          id: `${source.id}-${step.id}`,
          source: source.id,
          target: step.id,
          type: "smoothstep",
          animated: isLive,
          style: {
            stroke: isLive ? "var(--color-primary)" : "var(--color-border-strong)",
            strokeWidth: 1.5,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isLive ? "var(--color-primary)" : "var(--color-border-strong)",
            width: 14,
            height: 14,
          },
        };
      }),
    [sortedSteps, reduceMotion]
  );

  const selectedStep = useMemo(
    () => sortedSteps.find((s) => s.id === selectedStepId) ?? null,
    [sortedSteps, selectedStepId]
  );

  const handleNodeClick = useCallback<NodeMouseHandler>((_, node) => {
    setSelectedStepId((current) => (current === node.id ? null : node.id));
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div
        className="h-64 w-full overflow-hidden rounded-lg border border-border bg-surface-2"
        role="group"
        aria-label={`${workflow.name} step graph — zoom, pan, or select a step`}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          fitView
          fitViewOptions={{ padding: 0.25 }}
          minZoom={0.5}
          maxZoom={1.5}
          nodesDraggable={false}
          nodesConnectable={false}
          proOptions={{ hideAttribution: true }}
          className="bg-transparent"
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={16}
            size={1}
            color="var(--color-border)"
          />
          <Controls
            showInteractive={false}
            className="!border-border !bg-surface-2 !shadow-none [&>button]:!border-border [&>button]:!bg-surface-2 [&>button]:!text-muted-foreground [&>button:hover]:!bg-surface-3"
          />
        </ReactFlow>
      </div>

      <SelectedStepPanel workflow={workflow} step={selectedStep} />
    </div>
  );
}
