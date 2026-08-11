import { useState } from "react";
import { Shield, Copy, Check, Monitor, Smartphone } from "lucide-react";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ApiKeyEntry, DeviceSession, SecuritySettingsState } from "@/types/settings";

interface SecuritySettingsProps {
  apiKeys: ApiKeyEntry[];
  sessions: DeviceSession[];
  value: SecuritySettingsState;
  onChange: (next: SecuritySettingsState) => void;
}

const TIMEOUT_OPTIONS = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "480", label: "8 hours" },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7 text-subtle-foreground hover:text-foreground"
      aria-label="Copy key"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // Clipboard access can be denied by the browser — fail silently, no backend involved either way.
        }
      }}
    >
      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
    </Button>
  );
}

export function SecuritySettings({ apiKeys, sessions, value, onChange }: SecuritySettingsProps) {
  return (
    <SettingsSection
      id="security"
      title="Security"
      description="API keys, session behavior, and account protection."
      icon={Shield}
    >
      <div className="flex flex-col gap-4">
        <Card className="flex flex-col gap-3 p-5">
          <p className="text-xs font-medium text-muted-foreground">API Keys</p>
          {apiKeys.map((key) => (
            <div
              key={key.id}
              className="flex flex-col gap-2 rounded-md border border-border bg-surface-2 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{key.label}</p>
                  <CopyButton value={key.maskedValue} />
                </div>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">{key.maskedValue}</p>
                <p className="mt-0.5 text-[11px] text-subtle-foreground">
                  Created {key.createdAt} · Last used {key.lastUsed}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  Revoke
                </Button>
              </div>
            </div>
          ))}
        </Card>

        <Card className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-1.5">
            <Label>Session Timeout</Label>
            <Select
              value={value.sessionTimeoutMinutes.toString()}
              onValueChange={(v) => onChange({ ...value, sessionTimeoutMinutes: parseInt(v, 10) })}
            >
              <SelectTrigger className="w-full sm:w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIMEOUT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Multi-Factor Authentication</p>
              <p className="text-xs text-subtle-foreground">Require a second factor when signing in.</p>
            </div>
            <Switch
              checked={value.mfaEnabled}
              onCheckedChange={(v) => onChange({ ...value, mfaEnabled: v })}
            />
          </div>
        </Card>

        <Card className="flex flex-col gap-3 p-5">
          <p className="text-xs font-medium text-muted-foreground">Active Device Sessions</p>
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface-2 px-3 py-2.5"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {session.device.toLowerCase().includes("ios") ||
                session.device.toLowerCase().includes("android") ? (
                  <Smartphone className="size-3.5 shrink-0 text-subtle-foreground" />
                ) : (
                  <Monitor className="size-3.5 shrink-0 text-subtle-foreground" />
                )}
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-foreground">
                    {session.device}
                    {session.current && (
                      <Badge variant="primary" className="ml-2 normal-case">
                        This device
                      </Badge>
                    )}
                  </p>
                  <p className="text-[11px] text-subtle-foreground">
                    {session.location} · {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" className="shrink-0 text-destructive hover:text-destructive">
                  Sign out
                </Button>
              )}
            </div>
          ))}
        </Card>
      </div>
    </SettingsSection>
  );
}
