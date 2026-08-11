import { Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import type { AccentColor, AppearanceSettingsState, ThemeMode } from "@/types/settings";

interface AppearanceSettingsProps {
  value: AppearanceSettingsState;
  onChange: (next: AppearanceSettingsState) => void;
}

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const ACCENT_OPTIONS: { value: AccentColor; label: string; swatch: string }[] = [
  { value: "blue", label: "Blue", swatch: "#4f5bee" },
  { value: "purple", label: "Purple", swatch: "#8b5cf6" },
  { value: "green", label: "Green", swatch: "#34d399" },
  { value: "orange", label: "Orange", swatch: "#f2924b" },
];

export function AppearanceSettings({ value, onChange }: AppearanceSettingsProps) {
  const { theme, setTheme } = useTheme();

  const set = <K extends keyof AppearanceSettingsState>(key: K, val: AppearanceSettingsState[K]) =>
    onChange({ ...value, [key]: val });

  return (
    <SettingsSection
      id="appearance"
      title="Appearance"
      description="AgentForge is dark-first — Light and accent options are illustrative until a light palette ships."
      icon={Palette}
    >
      <Card className="flex flex-col gap-6 p-5">
        <div className="flex flex-col gap-2">
          <Label>Theme</Label>
          <RadioGroup
            value={theme}
            onValueChange={(v) => {
              setTheme(v as ThemeMode);
              set("theme", v as ThemeMode);
            }}
            className="flex gap-4"
          >
            {THEME_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 text-sm text-foreground">
                <RadioGroupItem value={opt.value} id={`theme-${opt.value}`} />
                {opt.label}
              </label>
            ))}
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Accent Color</Label>
          <div className="flex gap-2">
            {ACCENT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-label={opt.label}
                aria-pressed={value.accentColor === opt.value}
                onClick={() => set("accentColor", opt.value)}
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border-2 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  value.accentColor === opt.value ? "border-foreground scale-105" : "border-transparent"
                )}
                style={{ backgroundColor: opt.swatch }}
              >
                {value.accentColor === opt.value && <Check className="size-3.5 text-white" />}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Compact Mode</p>
              <p className="text-xs text-subtle-foreground">Tighter spacing across the app shell.</p>
            </div>
            <Switch checked={value.compactMode} onCheckedChange={(v) => set("compactMode", v)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Animations</p>
              <p className="text-xs text-subtle-foreground">Micro-interactions across cards and drawers.</p>
            </div>
            <Switch checked={value.animations} onCheckedChange={(v) => set("animations", v)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Reduced Motion</p>
              <p className="text-xs text-subtle-foreground">
                Your OS setting is always respected regardless of this toggle.
              </p>
            </div>
            <Switch checked={value.reducedMotion} onCheckedChange={(v) => set("reducedMotion", v)} />
          </div>
        </div>
      </Card>
    </SettingsSection>
  );
}
