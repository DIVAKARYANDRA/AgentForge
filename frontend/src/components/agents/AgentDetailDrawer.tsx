import { CheckCircle2, Clock, Hash } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/common/StatusBadge";
import { AgentMetrics, type MetricStat } from "@/components/agents/AgentMetrics";
import { AgentCapabilities } from "@/components/agents/AgentCapabilities";
import { AgentToolsPanel } from "@/components/agents/AgentToolsPanel";
import { AgentMemoryPanel } from "@/components/agents/AgentMemoryPanel";
import { AgentWorkflowPanel } from "@/components/agents/AgentWorkflowPanel";
import { AgentExecutionHistory } from "@/components/agents/AgentExecutionHistory";
import { AGENT_ROLE_LABELS, type Agent } from "@/types/agent";

interface AgentDetailDrawerProps {
  agent: Agent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DrawerSectionProps {
  title: string;
  children: React.ReactNode;
}

function DrawerSection({ title, children }: DrawerSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-medium uppercase tracking-wide text-subtle-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function AgentDetailDrawer({ agent, open, onOpenChange }: AgentDetailDrawerProps) {
  if (!agent) return null;

  const overviewStats: MetricStat[] = [
    { id: "success", label: "Success rate", value: `${agent.metrics.successRate}%`, icon: CheckCircle2 },
    { id: "avg-time", label: "Avg time", value: agent.metrics.avgExecutionTime, icon: Clock },
    { id: "total", label: "Total runs", value: agent.metrics.totalExecutions.toLocaleString(), icon: Hash },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full gap-0 p-0 sm:max-w-md"
        aria-describedby={undefined}
      >
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border pl-5 pr-12">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-foreground">
              {agent.name}
            </h2>
          </div>
          <StatusBadge status={agent.status} />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex flex-col gap-6">
            <DrawerSection title="Overview">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-subtle-foreground">
                  {AGENT_ROLE_LABELS[agent.role]} · Created {agent.createdAt} · Last
                  active {agent.lastActive}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {agent.description}
                </p>
              </div>
              <AgentMetrics stats={overviewStats} compact />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Capabilities">
              <AgentCapabilities capabilities={agent.capabilities} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Tools">
              <AgentToolsPanel tools={agent.tools} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Memory">
              <AgentMemoryPanel memory={agent.memory} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Workflows">
              <AgentWorkflowPanel workflows={agent.workflows} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Execution history">
              <AgentExecutionHistory history={agent.executionHistory} />
            </DrawerSection>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
