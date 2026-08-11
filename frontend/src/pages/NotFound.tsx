import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { PageContainer } from "@/layouts/PageContainer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageContainer className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-surface-2 text-subtle-foreground">
        <Compass className="size-5" />
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-subtle-foreground">404</p>
        <h1 className="mt-1 text-lg font-medium text-foreground">Page not found</h1>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          This route doesn't exist in AgentForge. It may have moved, or the link may be
          outdated.
        </p>
      </div>
      <Button asChild className="mt-2">
        <Link to="/mission-control">Back to Mission Control</Link>
      </Button>
    </PageContainer>
  );
}
