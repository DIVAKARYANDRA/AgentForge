import { Badge } from "@/components/ui/badge";

/**
 * The backend has no mounted route for this domain yet (see api/*.ts —
 * each documents exactly which endpoint is missing). This stays subtle
 * and appears once per page, next to the title, not as a banner.
 */
export function DemoDataBadge() {
  return (
    <Badge variant="outline" className="normal-case text-subtle-foreground">
      Demo Data
    </Badge>
  );
}
