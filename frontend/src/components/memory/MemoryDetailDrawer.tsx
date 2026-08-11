import { Plus, RefreshCcw, ArrowUpCircle, Link2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DrawerSection } from "@/components/common/DrawerSection";
import {
  MEMORY_IMPORTANCE_LABELS,
  MEMORY_TYPE_LABELS,
  type MemoryEntry,
  type MemoryHistoryEventType,
} from "@/types/memory";

interface MemoryDetailDrawerProps {
  entry: MemoryEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HISTORY_ICON: Record<MemoryHistoryEventType, typeof Plus> = {
  created: Plus,
  updated: RefreshCcw,
  promoted: ArrowUpCircle,
  referenced: Link2,
};

export function MemoryDetailDrawer({ entry, open, onOpenChange }: MemoryDetailDrawerProps) {
  if (!entry) return null;

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
              {MEMORY_TYPE_LABELS[entry.type]}
            </h2>
          </div>
          <Badge
            variant={entry.importance === "high" ? "destructive" : entry.importance === "medium" ? "warning" : "outline"}
            className="normal-case"
          >
            {MEMORY_IMPORTANCE_LABELS[entry.importance]} importance
          </Badge>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex flex-col gap-6">
            <DrawerSection title="Overview">
              <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                <dt className="text-subtle-foreground">Memory Type</dt>
                <dd className="text-right text-foreground">{MEMORY_TYPE_LABELS[entry.type]}</dd>

                <dt className="text-subtle-foreground">Agent</dt>
                <dd className="text-right text-foreground">{entry.agentName}</dd>

                <dt className="text-subtle-foreground">Created</dt>
                <dd className="text-right text-muted-foreground">
                  {new Date(entry.createdAt).toLocaleString()}
                </dd>

                <dt className="text-subtle-foreground">Updated</dt>
                <dd className="text-right text-muted-foreground">
                  {new Date(entry.updatedAt).toLocaleString()}
                </dd>
              </dl>
            </DrawerSection>

            <Separator />

            <DrawerSection title="Content">
              <pre className="whitespace-pre-wrap rounded-md border border-border bg-surface-2 p-3 font-mono text-xs leading-relaxed text-foreground">
                {entry.content}
              </pre>
            </DrawerSection>

            <Separator />

            <DrawerSection title="Metadata">
              <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                <dt className="text-subtle-foreground">Source</dt>
                <dd className="text-right text-muted-foreground">{entry.source}</dd>

                <dt className="text-subtle-foreground">Category</dt>
                <dd className="text-right text-muted-foreground">{entry.category}</dd>

                <dt className="text-subtle-foreground">Importance</dt>
                <dd className="text-right text-muted-foreground">
                  {MEMORY_IMPORTANCE_LABELS[entry.importance]}
                </dd>

                <dt className="text-subtle-foreground">Related workflow</dt>
                <dd className="text-right text-muted-foreground">
                  {entry.metadata.relatedWorkflowName ?? "—"}
                </dd>
              </dl>

              {entry.metadata.tags.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {entry.metadata.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="normal-case">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </DrawerSection>

            <Separator />

            <DrawerSection title="History">
              <ol className="flex flex-col gap-3">
                {entry.history.map((event) => {
                  const Icon = HISTORY_ICON[event.type];
                  return (
                    <li key={event.id} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-subtle-foreground">
                        <Icon className="size-3" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-foreground">{event.description}</p>
                        <p className="mt-0.5 text-[11px] text-subtle-foreground">
                          {event.timestamp}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </DrawerSection>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
