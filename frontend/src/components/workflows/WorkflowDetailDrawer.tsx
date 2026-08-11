import type { ReactNode } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/common/StatusBadge";
import { WorkflowGraph } from "@/components/workflows/WorkflowGraph";
import { WorkflowMetrics } from "@/components/workflows/WorkflowMetrics";
import { WorkflowAgentsPanel } from "@/components/workflows/WorkflowAgentsPanel";
import { WorkflowToolsPanel } from "@/components/workflows/WorkflowToolsPanel";
import { WorkflowConditionsPanel } from "@/components/workflows/WorkflowConditionsPanel";
import { WorkflowExecutionHistory } from "@/components/workflows/WorkflowExecutionHistory";
import { WORKFLOW_CATEGORY_LABELS, type Workflow } from "@/types/workflow";

interface WorkflowDetailDrawerProps {
  workflow: Workflow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DrawerSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-medium uppercase tracking-wide text-subtle-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function WorkflowDetailDrawer({ workflow, open, onOpenChange }: WorkflowDetailDrawerProps) {
  if (!workflow) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full gap-0 p-0 sm:max-w-lg"
        aria-describedby={undefined}
      >
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border pl-5 pr-12">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-foreground">
              {workflow.name}
            </h2>
          </div>
          <StatusBadge status={workflow.status} />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex flex-col gap-6">
            <DrawerSection title="Overview">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="normal-case">
                    {WORKFLOW_CATEGORY_LABELS[workflow.category]}
                  </Badge>
                  <span className="text-xs text-subtle-foreground">
                    Created {workflow.createdAt} · Last run {workflow.lastExecution}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {workflow.description}
                </p>
              </div>
            </DrawerSection>

            <Separator />

            <DrawerSection title="Workflow graph">
              <WorkflowGraph workflow={workflow} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Workflow metrics">
              <WorkflowMetrics metrics={workflow.executionMetrics} compact />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Agents">
              <WorkflowAgentsPanel assignments={workflow.agents} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Tools">
              <WorkflowToolsPanel tools={workflow.tools} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Conditions">
              <WorkflowConditionsPanel conditions={workflow.conditions} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Execution history">
              <WorkflowExecutionHistory history={workflow.executionHistory} />
            </DrawerSection>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
