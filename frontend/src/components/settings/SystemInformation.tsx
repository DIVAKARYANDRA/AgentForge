import { Terminal } from "lucide-react";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/common/Skeleton";
import { QueryErrorState } from "@/components/common/QueryErrorState";
import { useAppInfo, useAppStatus } from "@/hooks/useSettings";
import type { SystemInfoGroup } from "@/types/settings";

interface SystemInformationProps {
  groups: SystemInfoGroup[];
}

/**
 * The "Application" group's Backend Version / Deployment Mode entries
 * are overridden with live data from GET / and GET /status when those
 * requests succeed — both are real, simple endpoints (api/health.py).
 * Every other group (frontend/backend stack versions, build) has no
 * backing endpoint and stays as static data passed in via `groups`.
 */
export function SystemInformation({ groups }: SystemInformationProps) {
  const appInfo = useAppInfo();
  const appStatus = useAppStatus();

  const resolvedGroups = groups.map((group) => {
    if (group.title !== "Application" || !appInfo.data) return group;

    return {
      ...group,
      entries: group.entries.map((entry) => {
        if (entry.label === "Backend Version") {
          return { ...entry, value: `${appInfo.data.framework} v${appInfo.data.version}` };
        }
        if (entry.label === "Deployment Mode" && appStatus.data) {
          return { ...entry, value: appStatus.data.environment };
        }
        return entry;
      }),
    };
  });

  return (
    <SettingsSection
      id="system-information"
      title="System Information"
      description="Build and environment details, useful when filing a support request."
      icon={Terminal}
    >
      <div className="flex items-center gap-2">
        {appInfo.isPending ? (
          <Skeleton className="h-5 w-32" />
        ) : appInfo.isError ? (
          <QueryErrorState error={appInfo.error} onRetry={() => appInfo.refetch()} compact />
        ) : (
          <Badge variant="success" className="normal-case">
            Live from backend
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {resolvedGroups.map((group) => (
          <Card key={group.title} className="flex flex-col gap-2.5 p-4">
            <p className="text-xs font-medium text-muted-foreground">{group.title}</p>
            <dl className="flex flex-col gap-1.5">
              {group.entries.map((entry) => (
                <div key={entry.label} className="flex items-center justify-between gap-3 text-xs">
                  <dt className="text-subtle-foreground">{entry.label}</dt>
                  <dd className="truncate font-mono text-foreground">{entry.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}
      </div>
    </SettingsSection>
  );
}
