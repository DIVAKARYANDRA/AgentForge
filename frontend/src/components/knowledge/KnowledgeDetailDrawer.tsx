import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DrawerSection } from "@/components/common/DrawerSection";
import { StatusBadge } from "@/components/common/StatusBadge";
import { KnowledgeSourcesPanel } from "@/components/knowledge/KnowledgeSourcesPanel";
import { agents } from "@/data/agents";
import { workflows } from "@/data/workflows";
import { AGENT_ROLE_LABELS } from "@/types/agent";
import { WORKFLOW_CATEGORY_LABELS } from "@/types/workflow";
import { confidenceLevel, CONFIDENCE_LEVEL_LABELS, type KnowledgeItem } from "@/types/knowledge";

interface KnowledgeDetailDrawerProps {
  item: KnowledgeItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function titleCase(value: string): string {
  return value
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

export function KnowledgeDetailDrawer({ item, open, onOpenChange }: KnowledgeDetailDrawerProps) {
  if (!item) return null;

  const level = confidenceLevel(item.confidence);
  const relatedAgents = item.relatedAgentIds
    .map((id) => agents.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const relatedWorkflows = item.relatedWorkflowIds
    .map((id) => workflows.find((w) => w.id === id))
    .filter((w): w is NonNullable<typeof w> => Boolean(w));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full gap-0 p-0 sm:max-w-lg"
        aria-describedby={undefined}
      >
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border pl-5 pr-12">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-foreground">{item.title}</h2>
          </div>
          <Badge
            variant={level === "high" ? "success" : level === "medium" ? "warning" : "outline"}
            className="normal-case"
          >
            {CONFIDENCE_LEVEL_LABELS[level]}
          </Badge>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex flex-col gap-6">
            <DrawerSection title="Overview">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="normal-case">
                    {titleCase(item.category)}
                  </Badge>
                  <span className="text-xs text-subtle-foreground">
                    {item.sourceAgentName} · Added {item.createdAt}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
              </div>
            </DrawerSection>

            <Separator />

            <DrawerSection title="Content">
              <p className="rounded-md border border-border bg-surface-2 p-3 text-xs leading-relaxed text-foreground">
                {item.content}
              </p>
            </DrawerSection>

            <Separator />

            <DrawerSection title="Source">
              <KnowledgeSourcesPanel source={item.source} sourceAgentName={item.sourceAgentName} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Related agents">
              {relatedAgents.length === 0 ? (
                <p className="text-xs text-subtle-foreground">No related agents.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {relatedAgents.map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-foreground">{agent.name}</p>
                        <p className="mt-0.5 text-[11px] text-subtle-foreground">
                          {AGENT_ROLE_LABELS[agent.role]}
                        </p>
                      </div>
                      <StatusBadge status={agent.status} />
                    </div>
                  ))}
                </div>
              )}
            </DrawerSection>

            <Separator />

            <DrawerSection title="Related workflows">
              {relatedWorkflows.length === 0 ? (
                <p className="text-xs text-subtle-foreground">No related workflows.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {relatedWorkflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-foreground">{workflow.name}</p>
                        <p className="mt-0.5 text-[11px] text-subtle-foreground">
                          {WORKFLOW_CATEGORY_LABELS[workflow.category]}
                        </p>
                      </div>
                      <StatusBadge status={workflow.status} />
                    </div>
                  ))}
                </div>
              )}
            </DrawerSection>

            <Separator />

            <DrawerSection title="Usage history">
              {item.usageHistory.length === 0 ? (
                <p className="text-xs text-subtle-foreground">Not yet referenced by an agent or workflow.</p>
              ) : (
                <ol className="flex flex-col gap-2.5">
                  {item.usageHistory.map((event) => (
                    <li key={event.id} className="flex items-start gap-2.5">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-subtle-foreground" />
                      <div>
                        <p className="text-xs text-foreground">{event.description}</p>
                        <p className="mt-0.5 text-[11px] text-subtle-foreground">{event.timestamp}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </DrawerSection>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
