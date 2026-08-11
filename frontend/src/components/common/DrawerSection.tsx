import type { ReactNode } from "react";

interface DrawerSectionProps {
  title: string;
  children: ReactNode;
}

export function DrawerSection({ title, children }: DrawerSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-medium uppercase tracking-wide text-subtle-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}
