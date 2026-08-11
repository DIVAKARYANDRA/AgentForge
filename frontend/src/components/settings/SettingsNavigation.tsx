import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SettingsNavItem } from "@/types/settings";

interface SettingsNavigationProps {
  items: SettingsNavItem[];
}

function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export function SettingsNavigation({ items }: SettingsNavigationProps) {
  const ids = items.map((i) => i.id);
  const activeId = useActiveSection(ids);
  const reduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop — sticky sidebar */}
      <nav
        className="sticky top-20 hidden h-fit w-48 shrink-0 flex-col gap-0.5 lg:flex"
        aria-label="Settings sections"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="settings-nav-active"
                  className="absolute inset-0 rounded-md bg-primary-muted"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile — accordion trigger */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="settings-mobile-nav"
          className="flex w-full items-center justify-between rounded-md border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground"
        >
          <span>
            Jump to: <span className="font-medium">{items.find((i) => i.id === activeId)?.label}</span>
          </span>
          <ChevronDown className={cn("size-4 text-subtle-foreground transition-transform", mobileOpen && "rotate-180")} />
        </button>

        <motion.div
          id="settings-mobile-nav"
          ref={mobileNavRef}
          initial={false}
          animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="mt-1.5 flex flex-col gap-0.5 rounded-md border border-border bg-surface-2 p-1.5">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                aria-current={item.id === activeId ? "true" : undefined}
                className={cn(
                  "rounded-sm px-2.5 py-1.5 text-left text-sm transition-colors",
                  item.id === activeId
                    ? "bg-primary-muted text-foreground"
                    : "text-muted-foreground hover:bg-surface-3 hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
