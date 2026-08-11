import { Cog } from "lucide-react";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RuntimeSettingsState } from "@/types/settings";

interface RuntimeSettingsProps {
  value: RuntimeSettingsState;
  onChange: (next: RuntimeSettingsState) => void;
}

const MODEL_OPTIONS = ["gemini-2.5-pro", "gemini-2.5-flash", "llama3.1:70b"];

function SliderField({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="font-mono text-xs text-muted-foreground">{display}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        aria-label={label}
      />
    </div>
  );
}

function SwitchRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-foreground">{title}</p>
        <p className="text-xs text-subtle-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

export function RuntimeSettings({ value, onChange }: RuntimeSettingsProps) {
  const set = <K extends keyof RuntimeSettingsState>(key: K, val: RuntimeSettingsState[K]) =>
    onChange({ ...value, [key]: val });

  return (
    <SettingsSection
      id="runtime"
      title="Runtime"
      description="Default model behavior for every agent execution."
      icon={Cog}
    >
      <Card className="flex flex-col gap-5 p-5">
        <div className="flex flex-col gap-1.5">
          <Label>Default Model</Label>
          <Select value={value.defaultModel} onValueChange={(v) => set("defaultModel", v)}>
            <SelectTrigger className="font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MODEL_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt} className="font-mono">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <SliderField
          label="Maximum Tokens"
          value={value.maxTokens}
          display={value.maxTokens.toLocaleString()}
          min={256}
          max={16384}
          step={256}
          onChange={(v) => set("maxTokens", v)}
        />

        <SliderField
          label="Temperature"
          value={value.temperature}
          display={value.temperature.toFixed(2)}
          min={0}
          max={2}
          step={0.05}
          onChange={(v) => set("temperature", v)}
        />

        <SliderField
          label="Top P"
          value={value.topP}
          display={value.topP.toFixed(2)}
          min={0}
          max={1}
          step={0.05}
          onChange={(v) => set("topP", v)}
        />

        <SliderField
          label="Retry Limit"
          value={value.retryLimit}
          display={value.retryLimit.toString()}
          min={0}
          max={5}
          step={1}
          onChange={(v) => set("retryLimit", v)}
        />

        <SliderField
          label="Memory Retention (days)"
          value={value.memoryRetentionDays}
          display={`${value.memoryRetentionDays}d`}
          min={7}
          max={365}
          step={1}
          onChange={(v) => set("memoryRetentionDays", v)}
        />

        <Separator />

        <SwitchRow
          title="Streaming"
          description="Stream tokens back as agents generate output."
          checked={value.streaming}
          onCheckedChange={(v) => set("streaming", v)}
        />
        <SwitchRow
          title="Parallel Execution"
          description="Allow independent steps to run concurrently."
          checked={value.parallelExecution}
          onCheckedChange={(v) => set("parallelExecution", v)}
        />
        <SwitchRow
          title="Reflection"
          description="Run the Reflection Engine after each execution."
          checked={value.reflection}
          onCheckedChange={(v) => set("reflection", v)}
        />
        <SwitchRow
          title="Knowledge Promotion"
          description="Automatically promote high-confidence experiences into knowledge."
          checked={value.knowledgePromotion}
          onCheckedChange={(v) => set("knowledgePromotion", v)}
        />
      </Card>
    </SettingsSection>
  );
}
