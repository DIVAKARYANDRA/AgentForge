import { useMemo, useState } from "react";
import { PageContainer } from "@/layouts/PageContainer";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { ToolSearch } from "@/components/tools/ToolSearch";
import { ToolFilters } from "@/components/tools/ToolFilters";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { ToolDetailDrawer } from "@/components/tools/ToolDetailDrawer";
import { tools } from "@/data/tools";
import { agents } from "@/data/agents";
import type { ToolCategory, ToolStatus } from "@/types/tool";

/** Parses a mock duration string like "1.4s" into seconds. */
function parseSeconds(value: string): number {
  return parseFloat(value.replace("s", "")) || 0;
}

export default function Tools() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<ToolCategory[]>([]);
  const [statuses, setStatuses] = useState<ToolStatus[]>([]);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory = categories.length === 0 || categories.includes(tool.category);
      const matchesStatus = statuses.length === 0 || statuses.includes(tool.status);
      if (!matchesCategory || !matchesStatus) return false;
      if (!q) return true;

      const agentNames = tool.agentIds
        .map((id) => agents.find((a) => a.id === id)?.name ?? "")
        .join(" ");

      const haystack = [tool.name, tool.category, ...tool.capabilities, agentNames]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query, categories, statuses]);

  const selectedTool = useMemo(
    () => tools.find((t) => t.id === selectedToolId) ?? null,
    [selectedToolId]
  );

  const totalTools = tools.length;
  const healthyTools = tools.filter((t) => t.status === "healthy").length;
  const totalExecutions = tools.reduce((sum, t) => sum + t.executionMetrics.totalExecutions, 0);
  const averageExecutionTime = (
    tools.length > 0
      ? tools.reduce((sum, t) => sum + parseSeconds(t.executionMetrics.avgExecutionTime), 0) /
        tools.length
      : 0
  ).toFixed(1);

  return (
    <PageContainer className="flex flex-col gap-8">
      <ToolHeader
        totalTools={totalTools}
        healthyTools={healthyTools}
        totalExecutions={totalExecutions}
        averageExecutionTime={`${averageExecutionTime}s`}
      />

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <ToolSearch value={query} onChange={setQuery} />
        <ToolFilters
          selectedCategories={categories}
          onCategoriesChange={setCategories}
          selectedStatuses={statuses}
          onStatusesChange={setStatuses}
        />
      </div>

      <ToolGrid tools={filteredTools} onSelectTool={setSelectedToolId} />

      <ToolDetailDrawer
        tool={selectedTool}
        open={selectedToolId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedToolId(null);
        }}
      />
    </PageContainer>
  );
}
