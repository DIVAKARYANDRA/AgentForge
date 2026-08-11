import { useMemo, useState } from "react";
import { PageContainer } from "@/layouts/PageContainer";
import { MemoryHeader } from "@/components/memory/MemoryHeader";
import { MemoryOverview } from "@/components/memory/MemoryOverview";
import { MemoryTimeline } from "@/components/memory/MemoryTimeline";
import { AgentMemoryPanel } from "@/components/memory/AgentMemoryPanel";
import { MemorySearch } from "@/components/memory/MemorySearch";
import { MemoryFilters } from "@/components/memory/MemoryFilters";
import { MemoryExplorer } from "@/components/memory/MemoryExplorer";
import { MemoryDetailDrawer } from "@/components/memory/MemoryDetailDrawer";
import { memories } from "@/data/memories";
import type { MemoryImportance, MemoryType } from "@/types/memory";

export default function Memory() {
  const [query, setQuery] = useState("");
  const [types, setTypes] = useState<MemoryType[]>([]);
  const [importance, setImportance] = useState<MemoryImportance[]>([]);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  const toggleType = (type: MemoryType) => {
    setTypes((current) =>
      current.includes(type) ? current.filter((t) => t !== type) : [...current, type]
    );
  };

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();

    return memories.filter((entry) => {
      const matchesType = types.length === 0 || types.includes(entry.type);
      const matchesImportance = importance.length === 0 || importance.includes(entry.importance);
      if (!matchesType || !matchesImportance) return false;
      if (!q) return true;

      const haystack = [entry.content, entry.agentName, entry.type, entry.category]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query, types, importance]);

  const selectedEntry = useMemo(
    () => memories.find((e) => e.id === selectedEntryId) ?? null,
    [selectedEntryId]
  );

  const totalMemories = memories.length;
  const workingCount = memories.filter((e) => e.type === "working").length;
  const sessionCount = memories.filter((e) => e.type === "session").length;
  const knowledgeCount = memories.filter((e) => e.type === "knowledge").length;

  return (
    <PageContainer className="flex flex-col gap-10">
      <MemoryHeader
        totalMemories={totalMemories}
        workingCount={workingCount}
        sessionCount={sessionCount}
        knowledgeCount={knowledgeCount}
      />

      <MemoryOverview entries={memories} activeTypes={types} onToggleType={toggleType} />

      <MemoryTimeline />

      <AgentMemoryPanel entries={memories} />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <MemorySearch value={query} onChange={setQuery} />
          <MemoryFilters
            selectedTypes={types}
            onTypesChange={setTypes}
            selectedImportance={importance}
            onImportanceChange={setImportance}
          />
        </div>

        <MemoryExplorer entries={filteredEntries} onSelectEntry={setSelectedEntryId} />
      </div>

      <MemoryDetailDrawer
        entry={selectedEntry}
        open={selectedEntryId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedEntryId(null);
        }}
      />
    </PageContainer>
  );
}
