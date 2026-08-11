import { motion } from "framer-motion";
import { Wrench, Database, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { AgentCapabilities } from "@/components/agents/AgentCapabilities";
import { AGENT_ROLE_LABELS, type Agent } from "@/types/agent";

interface AgentCardProps {
  agent: Agent;
  index: number;
  onSelect: (agentId: string) => void;
}

export function AgentCard({ agent, index, onSelect }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index, 8) * 0.04, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      layout
    >
      <Card
        role="button"
        tabIndex={0}
        aria-label={`View details for ${agent.name}`}
        onClick={() => onSelect(agent.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(agent.id);
          }
        }}
        className={cn(
          "flex h-full cursor-pointer flex-col gap-4 p-4 transition-colors",
          "hover:border-primary/50 hover:bg-surface-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {agent.name}
            </p>
            <p className="mt-0.5 text-xs text-subtle-foreground">
              {AGENT_ROLE_LABELS[agent.role]}
            </p>
          </div>
          <StatusBadge status={agent.status} />
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {agent.description}
        </p>

        <AgentCapabilities capabilities={agent.capabilities} limit={2} />

        <div className="mt-auto grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-subtle-foreground">
              <Wrench className="size-3" />
            </div>
            <p className="mt-1 font-mono text-xs font-medium text-foreground">
              {agent.tools.length}
            </p>
            <p className="text-[10px] text-subtle-foreground">Tools</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-subtle-foreground">
              <Database className="size-3" />
            </div>
            <p className="mt-1 font-mono text-xs font-medium text-foreground">
              {agent.memory.usagePercent}%
            </p>
            <p className="text-[10px] text-subtle-foreground">Memory</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-subtle-foreground">
              <TrendingUp className="size-3" />
            </div>
            <p className="mt-1 font-mono text-xs font-medium text-foreground">
              {agent.metrics.successRate}%
            </p>
            <p className="text-[10px] text-subtle-foreground">Success</p>
          </div>
        </div>

        <Badge variant="outline" className="w-fit normal-case text-subtle-foreground">
          Last run {agent.lastActive}
        </Badge>
      </Card>
    </motion.div>
  );
}
