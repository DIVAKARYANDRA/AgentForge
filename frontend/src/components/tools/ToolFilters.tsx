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
import { TOOL_CATEGORY_LABELS, type ToolCategory, type ToolStatus } from "@/types/tool";

const CATEGORY_OPTIONS = Object.keys(TOOL_CATEGORY_LABELS) as ToolCategory[];
const STATUS_OPTIONS: { value: ToolStatus; label: string }[] = [
  { value: "healthy", label: "Healthy" },
  { value: "degraded", label: "Degraded" },
  { value: "down", label: "Down" },
];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

interface ToolFiltersProps {
  selectedCategories: ToolCategory[];
  onCategoriesChange: (categories: ToolCategory[]) => void;
  selectedStatuses: ToolStatus[];
  onStatusesChange: (statuses: ToolStatus[]) => void;
}

export function ToolFilters({
  selectedCategories,
  onCategoriesChange,
  selectedStatuses,
  onStatusesChange,
}: ToolFiltersProps) {
  const activeCount = selectedCategories.length + selectedStatuses.length;

  return (
    <div className="flex items-center gap-2">
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
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {CATEGORY_OPTIONS.map((category) => (
            <DropdownMenuCheckboxItem
              key={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onCategoriesChange(toggle(selectedCategories, category))}
              onSelect={(e) => e.preventDefault()}
            >
              {TOOL_CATEGORY_LABELS[category]}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

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
              key={status.value}
              checked={selectedStatuses.includes(status.value)}
              onCheckedChange={() => onStatusesChange(toggle(selectedStatuses, status.value))}
              onSelect={(e) => e.preventDefault()}
            >
              {status.label}
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
            onStatusesChange([]);
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
}
