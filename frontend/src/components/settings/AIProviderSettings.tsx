import { Cpu, KeyRound, Server } from "lucide-react";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Skeleton } from "@/components/common/Skeleton";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { useProviderHealth, useProviderManagerStatus } from "@/hooks/useSettings";
import type { AIProvider, ProviderStatus } from "@/types/settings";

interface AIProviderSettingsProps {
  providers: AIProvider[];
}

const CONNECTION_TO_BADGE = {
  connected: "healthy",
  disconnected: "idle",
  untested: "pending",
} as const;

const STATUS_LABEL: Record<ProviderStatus, string> = {
  configured: "Configured",
  "not-configured": "Not Configured",
  local: "Local",
};

export function AIProviderSettings({ providers }: AIProviderSettingsProps) {
  const managerStatus = useProviderManagerStatus();
  const providerHealth = useProviderHealth();

  return (
    <SettingsSection
      id="ai-providers"
      title="AI Providers"
      description="Connect the model providers your agents can call. Configuration is UI-only for now."
      icon={Cpu}
    >
      <Card className="flex flex-col gap-2.5 p-4">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Server className="size-3.5" />
          Live from backend provider registry
        </div>

        {managerStatus.isPending ? (
          <Skeleton className="h-10 w-full" />
        ) : managerStatus.isError ? (
          <QueryErrorState error={managerStatus.error} onRetry={() => managerStatus.refetch()} compact />
        ) : (
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="text-subtle-foreground">
              Active: <span className="font-mono text-foreground">{managerStatus.data.active_provider ?? "—"}</span>
            </span>
            <span className="text-subtle-foreground">
              Fallback: <span className="font-mono text-foreground">{managerStatus.data.fallback_provider ?? "—"}</span>
            </span>
            <span className="text-subtle-foreground">
              Registered:{" "}
              <span className="font-mono text-foreground">{managerStatus.data.available.join(", ")}</span>
            </span>
          </div>
        )}

        {providerHealth.data && (
          <div className="flex flex-wrap gap-2 border-t border-border pt-2.5">
            {Object.entries(providerHealth.data).map(([name, health]) => (
              <Badge
                key={name}
                variant={health.healthy ? "success" : "destructive"}
                className="normal-case font-mono"
              >
                {name}: {health.healthy ? "healthy" : "unreachable"}
              </Badge>
            ))}
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {providers.map((provider) => (
          <Card key={provider.id} className="flex flex-col gap-3 p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-foreground">{provider.name}</p>
                <Badge variant="outline" className="mt-1 normal-case">
                  {STATUS_LABEL[provider.status]}
                </Badge>
              </div>
              <StatusBadge status={CONNECTION_TO_BADGE[provider.connectionStatus]} />
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-subtle-foreground">Model</span>
                <span className="font-mono text-muted-foreground">{provider.model ?? "—"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-subtle-foreground">API Key</span>
                <span className="flex items-center gap-1 font-mono text-muted-foreground">
                  <KeyRound className="size-3" />
                  {provider.status === "not-configured" ? "Not set" : "••••••••••••7f2a"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-subtle-foreground">Last Checked</span>
                <span className="text-muted-foreground">{provider.lastChecked ?? "Never"}</span>
              </div>
            </div>

            <div className="mt-1 flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                Configure
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Test Connection
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                Reset
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </SettingsSection>
  );
}
