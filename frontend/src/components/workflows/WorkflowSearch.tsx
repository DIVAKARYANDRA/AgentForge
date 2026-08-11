import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WorkflowSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function WorkflowSearch({ value, onChange }: WorkflowSearchProps) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-subtle-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search name, agent, tool, category…"
        aria-label="Search workflows"
        className="pl-8 pr-8"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 size-6 -translate-y-1/2 text-subtle-foreground hover:text-foreground"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X className="size-3.5" />
        </Button>
      )}
    </div>
  );
}
