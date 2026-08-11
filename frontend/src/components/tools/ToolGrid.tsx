import { AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";
import { ToolCard } from "@/components/tools/ToolCard";
import type { Tool } from "@/types/tool";

interface ToolGridProps {
  tools: Tool[];
  onSelectTool: (toolId: string) => void;
}

export function ToolGrid({ tools, onSelectTool }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
        <SearchX className="size-6 text-subtle-foreground" />
        <p className="text-sm font-medium text-foreground">No tools match your filters</p>
        <p className="text-xs text-muted-foreground">
          Try a different search term or clear the active filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AnimatePresence initial={false}>
        {tools.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} onSelect={onSelectTool} />
        ))}
      </AnimatePresence>
    </div>
  );
}
