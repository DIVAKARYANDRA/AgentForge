import { PageContainer } from "@/layouts/PageContainer";

interface RoutePlaceholderProps {
  title: string;
  description?: string;
}

/**
 * Temporary stand-in rendered by scaffolded routes until their real page
 * is implemented. Not a business page itself — just proof that the
 * router + layout shell renders end to end.
 */
export function RoutePlaceholder({ title, description }: RoutePlaceholderProps) {
  return (
    <PageContainer>
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-subtle-foreground">
          Route scaffolded
        </p>
        <h1 className="text-lg font-medium text-foreground">{title}</h1>
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </PageContainer>
  );
}
