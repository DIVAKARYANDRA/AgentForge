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
  AGENT_ROLE_LABELS,
  AGENT_STATUS_LABELS,
  type AgentRole,
  type AgentStatus,
} from "@/types/agent";

const STATUS_OPTIONS = Object.keys(AGENT_STATUS_LABELS) as AgentStatus[];
const ROLE_OPTIONS = Object.keys(AGENT_ROLE_LABELS) as AgentRole[];

interface AgentFiltersProps {
  selectedStatuses: AgentStatus[];
  onStatusesChange: (statuses: AgentStatus[]) => void;
  selectedRoles: AgentRole[];
  onRolesChange: (roles: AgentRole[]) => void;
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function AgentFilters({
  selectedStatuses,
  onStatusesChange,
  selectedRoles,
  onRolesChange,
}: AgentFiltersProps) {
  const activeCount = selectedStatuses.length + selectedRoles.length;

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
              {AGENT_STATUS_LABELS[status]}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground">
            <ListFilter className="size-3.5" />
            Role
            {selectedRoles.length > 0 && (
              <Badge variant="primary" className="ml-0.5 px-1.5 py-0 normal-case">
                {selectedRoles.length}
              </Badge>
            )}
            <ChevronDown className="size-3.5 text-subtle-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuLabel>Filter by role</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ROLE_OPTIONS.map((role) => (
            <DropdownMenuCheckboxItem
              key={role}
              checked={selectedRoles.includes(role)}
              onCheckedChange={() => onRolesChange(toggle(selectedRoles, role))}
              onSelect={(e) => e.preventDefault()}
            >
              {AGENT_ROLE_LABELS[role]}
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
            onRolesChange([]);
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
}
