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
  MEMORY_IMPORTANCE_LABELS,
  MEMORY_TYPE_SHORT_LABELS,
  type MemoryImportance,
  type MemoryType,
} from "@/types/memory";

const TYPE_OPTIONS = Object.keys(MEMORY_TYPE_SHORT_LABELS) as MemoryType[];
const IMPORTANCE_OPTIONS = Object.keys(MEMORY_IMPORTANCE_LABELS) as MemoryImportance[];

interface MemoryFiltersProps {
  selectedTypes: MemoryType[];
  onTypesChange: (types: MemoryType[]) => void;
  selectedImportance: MemoryImportance[];
  onImportanceChange: (importance: MemoryImportance[]) => void;
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function MemoryFilters({
  selectedTypes,
  onTypesChange,
  selectedImportance,
  onImportanceChange,
}: MemoryFiltersProps) {
  const activeCount = selectedTypes.length + selectedImportance.length;

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground">
            <ListFilter className="size-3.5" />
            Type
            {selectedTypes.length > 0 && (
              <Badge variant="primary" className="ml-0.5 px-1.5 py-0 normal-case">
                {selectedTypes.length}
              </Badge>
            )}
            <ChevronDown className="size-3.5 text-subtle-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {TYPE_OPTIONS.map((type) => (
            <DropdownMenuCheckboxItem
              key={type}
              checked={selectedTypes.includes(type)}
              onCheckedChange={() => onTypesChange(toggle(selectedTypes, type))}
              onSelect={(e) => e.preventDefault()}
            >
              {MEMORY_TYPE_SHORT_LABELS[type]}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground">
            <ListFilter className="size-3.5" />
            Importance
            {selectedImportance.length > 0 && (
              <Badge variant="primary" className="ml-0.5 px-1.5 py-0 normal-case">
                {selectedImportance.length}
              </Badge>
            )}
            <ChevronDown className="size-3.5 text-subtle-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuLabel>Filter by importance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {IMPORTANCE_OPTIONS.map((importance) => (
            <DropdownMenuCheckboxItem
              key={importance}
              checked={selectedImportance.includes(importance)}
              onCheckedChange={() => onImportanceChange(toggle(selectedImportance, importance))}
              onSelect={(e) => e.preventDefault()}
            >
              {MEMORY_IMPORTANCE_LABELS[importance]}
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
            onTypesChange([]);
            onImportanceChange([]);
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
}
