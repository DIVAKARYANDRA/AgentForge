import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DrawerSection } from "@/components/common/DrawerSection";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ToolCapabilities } from "@/components/tools/ToolCapabilities";
import { ToolHealthPanel } from "@/components/tools/ToolHealthPanel";
import { ToolUsagePanel } from "@/components/tools/ToolUsagePanel";
import { ToolAgentsPanel } from "@/components/tools/ToolAgentsPanel";
import { ToolWorkflowsPanel } from "@/components/tools/ToolWorkflowsPanel";
import { ToolExecutionHistory } from "@/components/tools/ToolExecutionHistory";
import { TOOL_CATEGORY_LABELS, type Tool } from "@/types/tool";

interface ToolDetailDrawerProps {
  tool: Tool | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ToolDetailDrawer({ tool, open, onOpenChange }: ToolDetailDrawerProps) {
  if (!tool) return null;

  const schemaEntries = Object.entries(tool.inputSchema);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full gap-0 p-0 sm:max-w-lg"
        aria-describedby={undefined}
      >
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border pl-5 pr-12">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-surface-2 text-muted-foreground">
              <tool.icon className="size-3.5" />
            </div>
            <h2 className="truncate text-sm font-semibold text-foreground">{tool.name}</h2>
          </div>
          <StatusBadge status={tool.status} />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex flex-col gap-6">
            <DrawerSection title="Overview">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="normal-case font-mono">
                    {tool.slug}
                  </Badge>
                  <span className="text-xs text-subtle-foreground">
                    {TOOL_CATEGORY_LABELS[tool.category]} · Registered {tool.createdAt}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </DrawerSection>

            <Separator />

            <DrawerSection title="Capabilities">
              <ToolCapabilities capabilities={tool.capabilities} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Health">
              <ToolHealthPanel health={tool.health} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Usage">
              <ToolUsagePanel metrics={tool.executionMetrics} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Input schema">
              {schemaEntries.length === 0 ? (
                <p className="text-xs text-subtle-foreground">This tool takes no input parameters.</p>
              ) : (
                <pre className="overflow-x-auto rounded-md border border-border bg-surface-2 p-3 font-mono text-[11px] leading-relaxed text-foreground">
{"{\n"}
                  {schemaEntries.map(([key, description], i) => (
                    <span key={key}>
                      {"  "}
                      <span className="text-primary-hover">&quot;{key}&quot;</span>
                      {": "}
                      <span className="text-muted-foreground">&quot;{description}&quot;</span>
                      {i < schemaEntries.length - 1 ? "," : ""}
                      {"\n"}
                    </span>
                  ))}
{"}"}
                </pre>
              )}
            </DrawerSection>

            <Separator />

            <DrawerSection title="Agents">
              <ToolAgentsPanel agentIds={tool.agentIds} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Workflows">
              <ToolWorkflowsPanel workflowIds={tool.workflowIds} />
            </DrawerSection>

            <Separator />

            <DrawerSection title="Execution history">
              <ToolExecutionHistory history={tool.executionHistory} />
            </DrawerSection>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
