import { Cpu, Clock, Archive, BookOpen } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MemoryTypeCard } from "@/components/memory/MemoryTypeCard";
import { MEMORY_TYPE_LABELS, type MemoryEntry, type MemoryType } from "@/types/memory";

const TYPE_ICONS: Record<MemoryType, typeof Cpu> = {
  working: Cpu,
  session: Clock,
  long_term: Archive,
  knowledge: BookOpen,
};

const TYPE_ORDER: MemoryType[] = ["working", "session", "long_term", "knowledge"];

interface MemoryOverviewProps {
  entries: MemoryEntry[];
  activeTypes: MemoryType[];
  onToggleType: (type: MemoryType) => void;
}

export function MemoryOverview({ entries, activeTypes, onToggleType }: MemoryOverviewProps) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Memory Overview"
        description="Select a type to filter the explorer below."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TYPE_ORDER.map((type, i) => (
          <MemoryTypeCard
            key={type}
            type={type}
            label={MEMORY_TYPE_LABELS[type]}
            icon={TYPE_ICONS[type]}
            entries={entries.filter((e) => e.type === type)}
            active={activeTypes.includes(type)}
            onToggle={onToggleType}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
