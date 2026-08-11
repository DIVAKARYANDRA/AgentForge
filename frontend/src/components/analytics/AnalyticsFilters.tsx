import { ListFilter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ENTITY_LABELS,
  TIME_RANGE_LABELS,
  type AnalyticsEntity,
  type AnalyticsTimeRange,
} from "@/types/analytics";

const TIME_RANGE_OPTIONS = Object.keys(TIME_RANGE_LABELS) as AnalyticsTimeRange[];
const ENTITY_OPTIONS = Object.keys(ENTITY_LABELS) as AnalyticsEntity[];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

interface AnalyticsFiltersProps {
  timeRange: AnalyticsTimeRange;
  onTimeRangeChange: (range: AnalyticsTimeRange) => void;
  selectedEntities: AnalyticsEntity[];
  onEntitiesChange: (entities: AnalyticsEntity[]) => void;
}

export function AnalyticsFilters({
  timeRange,
  onTimeRangeChange,
  selectedEntities,
  onEntitiesChange,
}: AnalyticsFiltersProps) {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div
        className="inline-flex w-fit items-center rounded-md border border-border bg-surface-2 p-0.5"
        role="group"
        aria-label="Time range"
      >
        {TIME_RANGE_OPTIONS.map((range) => (
          <button
            key={range}
            type="button"
            aria-pressed={timeRange === range}
            onClick={() => onTimeRangeChange(range)}
            className={cn(
              "rounded-sm px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              timeRange === range
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {TIME_RANGE_LABELS[range]}
          </button>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-fit gap-1.5 text-muted-foreground">
            <ListFilter className="size-3.5" />
            Sections
            {selectedEntities.length > 0 && (
              <Badge variant="primary" className="ml-0.5 px-1.5 py-0 normal-case">
                {selectedEntities.length}
              </Badge>
            )}
            <ChevronDown className="size-3.5 text-subtle-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Show sections for</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ENTITY_OPTIONS.map((entity) => (
            <DropdownMenuCheckboxItem
              key={entity}
              checked={selectedEntities.includes(entity)}
              onCheckedChange={() => onEntitiesChange(toggle(selectedEntities, entity))}
              onSelect={(e) => e.preventDefault()}
            >
              {ENTITY_LABELS[entity]}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
