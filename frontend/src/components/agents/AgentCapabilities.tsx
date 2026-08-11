import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { AgentCapability } from "@/types/agent";

interface AgentCapabilitiesProps {
  capabilities: AgentCapability[];
  /** Card mode: truncate to `limit` badges + an overflow count. */
  limit?: number;
}

export function AgentCapabilities({ capabilities, limit }: AgentCapabilitiesProps) {
  const visible = limit ? capabilities.slice(0, limit) : capabilities;
  const overflow = limit ? capabilities.length - visible.length : 0;

  if (limit) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {visible.map((cap) => (
          <Badge key={cap.id} variant="outline" className="normal-case">
            {cap.name}
          </Badge>
        ))}
        {overflow > 0 && (
          <Badge variant="outline" className="normal-case text-subtle-foreground">
            +{overflow} more
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {capabilities.map((cap) => (
        <Tooltip key={cap.id} delayDuration={200}>
          <TooltipTrigger asChild>
            <Badge variant="primary" className="cursor-default normal-case">
              {cap.name}
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="max-w-56 text-xs font-normal normal-case">
            {cap.description}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
