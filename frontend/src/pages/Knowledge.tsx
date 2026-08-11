import { useMemo, useState } from "react";
import { PageContainer } from "@/layouts/PageContainer";
import { KnowledgeHeader } from "@/components/knowledge/KnowledgeHeader";
import { KnowledgeOverview } from "@/components/knowledge/KnowledgeOverview";
import { KnowledgeSearch } from "@/components/knowledge/KnowledgeSearch";
import { KnowledgeFilters } from "@/components/knowledge/KnowledgeFilters";
import { KnowledgeExplorer } from "@/components/knowledge/KnowledgeExplorer";
import { KnowledgeDetailDrawer } from "@/components/knowledge/KnowledgeDetailDrawer";
import { knowledgeItems } from "@/data/knowledge";
import type { KnowledgeConfidenceLevel } from "@/types/knowledge";
import { confidenceLevel } from "@/types/knowledge";

const RECENT_WINDOW_DAYS = 14;

export default function Knowledge() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [confidenceFilter, setConfidenceFilter] = useState<KnowledgeConfidenceLevel[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setCategories((current) =>
      current.includes(category) ? current.filter((c) => c !== category) : [...current, category]
    );
  };

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    return knowledgeItems.filter((item) => {
      const matchesCategory = categories.length === 0 || categories.includes(item.category);
      const matchesAgent = selectedAgents.length === 0 || selectedAgents.includes(item.sourceAgentName);
      const matchesConfidence =
        confidenceFilter.length === 0 || confidenceFilter.includes(confidenceLevel(item.confidence));
      if (!matchesCategory || !matchesAgent || !matchesConfidence) return false;
      if (!q) return true;

      const haystack = [item.title, item.category, item.sourceAgentName, item.source.label]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query, categories, selectedAgents, confidenceFilter]);

  const selectedItem = useMemo(
    () => knowledgeItems.find((i) => i.id === selectedItemId) ?? null,
    [selectedItemId]
  );

  const totalItems = knowledgeItems.length;
  const sourceCount = new Set(knowledgeItems.map((i) => i.sourceAgentId)).size;
  const categoryCount = new Set(knowledgeItems.map((i) => i.category)).size;
  const recentlyAddedCount = knowledgeItems.filter((i) => {
    const daysSince = (Date.now() - new Date(i.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    return daysSince <= RECENT_WINDOW_DAYS;
  }).length;

  return (
    <PageContainer className="flex flex-col gap-10">
      <KnowledgeHeader
        totalItems={totalItems}
        sourceCount={sourceCount}
        categoryCount={categoryCount}
        recentlyAddedCount={recentlyAddedCount}
      />

      <KnowledgeOverview
        items={knowledgeItems}
        activeCategories={categories}
        onToggleCategory={toggleCategory}
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <KnowledgeSearch value={query} onChange={setQuery} />
          <KnowledgeFilters
            selectedCategories={categories}
            onCategoriesChange={setCategories}
            selectedAgents={selectedAgents}
            onAgentsChange={setSelectedAgents}
            selectedConfidence={confidenceFilter}
            onConfidenceChange={setConfidenceFilter}
          />
        </div>

        <KnowledgeExplorer items={filteredItems} onSelectItem={setSelectedItemId} />
      </div>

      <KnowledgeDetailDrawer
        item={selectedItem}
        open={selectedItemId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedItemId(null);
        }}
      />
    </PageContainer>
  );
}
