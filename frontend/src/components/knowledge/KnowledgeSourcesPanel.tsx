import { Link } from "react-router-dom";
import { ArrowUpRight, GitCommitHorizontal } from "lucide-react";
import { memories } from "@/data/memories";
import { MEMORY_TYPE_SHORT_LABELS } from "@/types/memory";
import type { KnowledgeSource } from "@/types/knowledge";

interface KnowledgeSourcesPanelProps {
  source: KnowledgeSource;
  sourceAgentName: string;
}

export function KnowledgeSourcesPanel({ source, sourceAgentName }: KnowledgeSourcesPanelProps) {
  const originMemory = source.originMemoryId
    ? memories.find((m) => m.id === source.originMemoryId)
    : undefined;

  return (
    <div className="flex flex-col gap-2.5 rounded-md border border-border bg-surface-2 p-3">
      <div className="flex items-center gap-1.5 text-xs text-foreground">
        <GitCommitHorizontal className="size-3.5 text-subtle-foreground" />
        {source.label}
      </div>
      <p className="text-[11px] text-subtle-foreground">Contributed by {sourceAgentName}</p>

      {originMemory && (
        <div className="mt-1 flex flex-col gap-1.5 border-t border-border pt-2.5">
          <p className="text-[11px] text-subtle-foreground">
            Promoted from {MEMORY_TYPE_SHORT_LABELS[originMemory.type]} memory
          </p>
          <p className="line-clamp-2 font-mono text-[11px] text-muted-foreground">
            {originMemory.content}
          </p>
          <Link
            to="/memory"
            className="inline-flex w-fit items-center gap-1 text-[11px] text-primary-hover hover:underline"
          >
            View in Memory Explorer
            <ArrowUpRight className="size-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
