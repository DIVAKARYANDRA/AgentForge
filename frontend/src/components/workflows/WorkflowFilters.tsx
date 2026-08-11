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
import {
  WORKFLOW_CATEGORY_LABELS,
  WORKFLOW_STATUS_LABELS,
  type WorkflowCategory,
  type WorkflowStatus,
} from "@/types/workflow";

const STATUS_OPTIONS = Object.keys(WORKFLOW_STATUS_LABELS) as WorkflowStatus[];
const CATEGORY_OPTIONS = Object.keys(WORKFLOW_CATEGORY_LABELS) as WorkflowCategory[];

interface WorkflowFiltersProps {
  selectedStatuses: WorkflowStatus[];
  onStatusesChange: (statuses: WorkflowStatus[]) => void;
  selectedCategories: WorkflowCategory[];
  onCategoriesChange: (categories: WorkflowCategory[]) => void;
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function WorkflowFilters({
  selectedStatuses,
  onStatusesChange,
  selectedCategories,
  onCategoriesChange,
}: WorkflowFiltersProps) {
  const activeCount = selectedStatuses.length + selectedCategories.length;

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground">
            <ListFilter className="size-3.5" />
            Status
            {selectedStatuses.length > 0 && (
              <Badge variant="primary" className="ml-0.5 px-1.5 py-0 normal-case">
                {selectedStatuses.length}
              </Badge>
            )}
            <ChevronDown className="size-3.5 text-subtle-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {STATUS_OPTIONS.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={selectedStatuses.includes(status)}
              onCheckedChange={() => onStatusesChange(toggle(selectedStatuses, status))}
              onSelect={(e) => e.preventDefault()}
            >
              {WORKFLOW_STATUS_LABELS[status]}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

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
              {WORKFLOW_CATEGORY_LABELS[category]}
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
            onStatusesChange([]);
            onCategoriesChange([]);
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
}
