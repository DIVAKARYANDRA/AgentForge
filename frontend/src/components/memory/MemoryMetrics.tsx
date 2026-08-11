import { Database, Cpu, Clock, BookOpen } from "lucide-react";
import { AgentMetrics, type MetricStat } from "@/components/agents/AgentMetrics";

interface MemoryMetricsProps {
  totalMemories: number;
  workingCount: number;
  sessionCount: number;
  knowledgeCount: number;
}

export function MemoryMetrics({
  totalMemories,
  workingCount,
  sessionCount,
  knowledgeCount,
}: MemoryMetricsProps) {
  const stats: MetricStat[] = [
    { id: "total", label: "Total Memories", value: totalMemories.toString(), icon: Database },
    { id: "working", label: "Working Memory Count", value: workingCount.toString(), icon: Cpu },
    { id: "session", label: "Session Memories", value: sessionCount.toString(), icon: Clock },
    { id: "knowledge", label: "Knowledge Items", value: knowledgeCount.toString(), icon: BookOpen },
  ];

  return <AgentMetrics stats={stats} />;
}
