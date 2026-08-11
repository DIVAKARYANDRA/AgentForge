import { BookOpen, Users, Tags, Sparkles } from "lucide-react";
import { AgentMetrics, type MetricStat } from "@/components/agents/AgentMetrics";

interface KnowledgeMetricsProps {
  totalItems: number;
  sourceCount: number;
  categoryCount: number;
  recentlyAddedCount: number;
}

export function KnowledgeMetrics({
  totalItems,
  sourceCount,
  categoryCount,
  recentlyAddedCount,
}: KnowledgeMetricsProps) {
  const stats: MetricStat[] = [
    { id: "total", label: "Knowledge Items", value: totalItems.toString(), icon: BookOpen },
    { id: "sources", label: "Sources", value: sourceCount.toString(), icon: Users },
    { id: "categories", label: "Categories", value: categoryCount.toString(), icon: Tags },
    { id: "recent", label: "Recently Added", value: recentlyAddedCount.toString(), icon: Sparkles },
  ];

  return <AgentMetrics stats={stats} />;
}
