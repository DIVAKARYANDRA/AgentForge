import type { ReactNode } from "react";
import { Building2 } from "lucide-react";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WorkspaceSettingsState } from "@/types/settings";

interface WorkspaceSettingsProps {
  value: WorkspaceSettingsState;
  onChange: (next: WorkspaceSettingsState) => void;
}

const LANGUAGE_OPTIONS = ["English (US)", "English (UK)", "Svenska", "Deutsch", "Français"];
const TIMEZONE_OPTIONS = [
  "UTC (Coordinated Universal Time)",
  "Europe/Stockholm",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Tokyo",
];
const DATE_FORMAT_OPTIONS = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"];
const PROJECT_OPTIONS = ["Customer Operations", "Research Pipeline", "Internal Tools"];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function WorkspaceSettings({ value, onChange }: WorkspaceSettingsProps) {
  const set = <K extends keyof WorkspaceSettingsState>(key: K, val: WorkspaceSettingsState[K]) =>
    onChange({ ...value, [key]: val });

  return (
    <SettingsSection
      id="workspace"
      title="Workspace"
      description="Identity and locale settings for this workspace."
      icon={Building2}
    >
      <Card className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
        <Field label="Workspace Name">
          <Input value={value.workspaceName} onChange={(e) => set("workspaceName", e.target.value)} />
        </Field>

        <Field label="Organization">
          <Input value={value.organization} onChange={(e) => set("organization", e.target.value)} />
        </Field>

        <Field label="Default Project">
          <Select value={value.defaultProject} onValueChange={(v) => set("defaultProject", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Language">
          <Select value={value.language} onValueChange={(v) => set("language", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Timezone">
          <Select value={value.timezone} onValueChange={(v) => set("timezone", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONE_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Date Format">
          <Select value={value.dateFormat} onValueChange={(v) => set("dateFormat", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_FORMAT_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </Card>
    </SettingsSection>
  );
}
