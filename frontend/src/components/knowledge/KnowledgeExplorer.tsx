import { AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { KnowledgeItemCard } from "@/components/knowledge/KnowledgeItemCard";
import type { KnowledgeItem } from "@/types/knowledge";

interface KnowledgeExplorerProps {
  items: KnowledgeItem[];
  onSelectItem: (itemId: string) => void;
}

export function KnowledgeExplorer({ items, onSelectItem }: KnowledgeExplorerProps) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Knowledge Explorer"
        description={`${items.length} ${items.length === 1 ? "item" : "items"} matching your search and filters.`}
      />

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
          <SearchX className="size-6 text-subtle-foreground" />
          <p className="text-sm font-medium text-foreground">No knowledge items match</p>
          <p className="text-xs text-muted-foreground">
            Try a different search term or clear the active filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AnimatePresence initial={false}>
            {items.map((item, i) => (
              <KnowledgeItemCard key={item.id} item={item} index={i} onSelect={onSelectItem} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
