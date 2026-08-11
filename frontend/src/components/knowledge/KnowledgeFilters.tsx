import { ListFilter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { knowledgeItems } from "@/data/knowledge";
import { CONFIDENCE_LEVEL_LABELS, type KnowledgeConfidenceLevel } from "@/types/knowledge";

const CATEGORY_OPTIONS = Array.from(new Set(knowledgeItems.map((i) => i.category)));
const AGENT_OPTIONS = Array.from(new Set(knowledgeItems.map((i) => i.sourceAgentName)));
const CONFIDENCE_OPTIONS = Object.keys(CONFIDENCE_LEVEL_LABELS) as KnowledgeConfidenceLevel[];

function titleCase(value: string): string {
  return value
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

interface KnowledgeFiltersProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  selectedAgents: string[];
  onAgentsChange: (agents: string[]) => void;
  selectedConfidence: KnowledgeConfidenceLevel[];
  onConfidenceChange: (levels: KnowledgeConfidenceLevel[]) => void;
}

export function KnowledgeFilters({
  selectedCategories,
  onCategoriesChange,
  selectedAgents,
  onAgentsChange,
  selectedConfidence,
  onConfidenceChange,
}: KnowledgeFiltersProps) {
  const activeCount = selectedCategories.length + selectedAgents.length + selectedConfidence.length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground">
            <ListFilter className="size-3.5" />
            Category
            {selectedCategories.length > 0 && (
              <Badge variant="primary" className="ml-0.5 px-1.5 py-0 normal-case">
                {selectedCategories.length}
              </Badge>
            )}
            <ChevronDown className="size-3.5 text-subtle-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {CATEGORY_OPTIONS.map((category) => (
            <DropdownMenuCheckboxItem
              key={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onCategoriesChange(toggle(selectedCategories, category))}
              onSelect={(e) => e.preventDefault()}
            >
              {titleCase(category)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground">
            <ListFilter className="size-3.5" />
            Agent
            {selectedAgents.length > 0 && (
              <Badge variant="primary" className="ml-0.5 px-1.5 py-0 normal-case">
                {selectedAgents.length}
              </Badge>
            )}
            <ChevronDown className="size-3.5 text-subtle-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Filter by agent</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {AGENT_OPTIONS.map((agentName) => (
            <DropdownMenuCheckboxItem
              key={agentName}
              checked={selectedAgents.includes(agentName)}
              onCheckedChange={() => onAgentsChange(toggle(selectedAgents, agentName))}
              onSelect={(e) => e.preventDefault()}
            >
              {agentName}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground">
            <ListFilter className="size-3.5" />
            Confidence
            {selectedConfidence.length > 0 && (
              <Badge variant="primary" className="ml-0.5 px-1.5 py-0 normal-case">
                {selectedConfidence.length}
              </Badge>
            )}
            <ChevronDown className="size-3.5 text-subtle-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuLabel>Filter by confidence</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {CONFIDENCE_OPTIONS.map((level) => (
            <DropdownMenuCheckboxItem
              key={level}
              checked={selectedConfidence.includes(level)}
              onCheckedChange={() => onConfidenceChange(toggle(selectedConfidence, level))}
              onSelect={(e) => e.preventDefault()}
            >
              {CONFIDENCE_LEVEL_LABELS[level]}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {activeCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="text-subtle-foreground hover:text-foreground"
          onClick={() => {
            onCategoriesChange([]);
            onAgentsChange([]);
            onConfidenceChange([]);
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
}
