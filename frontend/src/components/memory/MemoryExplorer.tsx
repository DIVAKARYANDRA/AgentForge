import { AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MemoryEntryCard } from "@/components/memory/MemoryEntryCard";
import type { MemoryEntry } from "@/types/memory";

interface MemoryExplorerProps {
  entries: MemoryEntry[];
  onSelectEntry: (entryId: string) => void;
}

export function MemoryExplorer({ entries, onSelectEntry }: MemoryExplorerProps) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Memory Explorer"
        description={`${entries.length} ${entries.length === 1 ? "entry" : "entries"} matching your search and filters.`}
      />

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
          <SearchX className="size-6 text-subtle-foreground" />
          <p className="text-sm font-medium text-foreground">No memory entries match</p>
          <p className="text-xs text-muted-foreground">
            Try a different search term or clear the active filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AnimatePresence initial={false}>
            {entries.map((entry, i) => (
              <MemoryEntryCard key={entry.id} entry={entry} index={i} onSelect={onSelectEntry} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
