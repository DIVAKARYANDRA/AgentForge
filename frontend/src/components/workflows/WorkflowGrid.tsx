import { AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";
import { WorkflowCard } from "@/components/workflows/WorkflowCard";
import type { Workflow } from "@/types/workflow";

interface WorkflowGridProps {
  workflows: Workflow[];
  onSelectWorkflow: (workflowId: string) => void;
}

export function WorkflowGrid({ workflows, onSelectWorkflow }: WorkflowGridProps) {
  if (workflows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
        <SearchX className="size-6 text-subtle-foreground" />
        <p className="text-sm font-medium text-foreground">No workflows match your filters</p>
        <p className="text-xs text-muted-foreground">
          Try a different search term or clear the active filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence initial={false}>
        {workflows.map((workflow, i) => (
          <WorkflowCard
            key={workflow.id}
            workflow={workflow}
            index={i}
            onSelect={onSelectWorkflow}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
