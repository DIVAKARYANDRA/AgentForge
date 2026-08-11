import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * PageContainer — consistent horizontal rhythm and max-width for page
 * content rendered inside MainLayout. Pages should wrap their content in
 * this rather than re-declaring padding/max-width themselves.
 */
export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6 py-8", className)}>
      {children}
    </div>
  );
}
