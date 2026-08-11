import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ThemeToggleProps {
  collapsed?: boolean;
}

/**
 * Toggles between the dark and light values tracked by ThemeProvider.
 * Only a dark palette is implemented today (see globals.css) — this
 * control is wired and ready for when a light palette ships.
 */
export function ThemeToggle({ collapsed }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        >
          {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </Button>
      </TooltipTrigger>
      {collapsed && <TooltipContent side="right">Toggle theme</TooltipContent>}
    </Tooltip>
  );
}
