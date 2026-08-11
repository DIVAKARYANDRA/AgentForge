import { Badge } from "@/components/ui/badge";

interface ToolCapabilitiesProps {
  capabilities: string[];
  /** Card mode: truncate to `limit` badges + an overflow count. */
  limit?: number;
}

export function ToolCapabilities({ capabilities, limit }: ToolCapabilitiesProps) {
  const visible = limit ? capabilities.slice(0, limit) : capabilities;
  const overflow = limit ? capabilities.length - visible.length : 0;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((capability) => (
        <Badge key={capability} variant={limit ? "outline" : "primary"} className="normal-case">
          {capability}
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
