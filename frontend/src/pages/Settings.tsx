import { useMemo, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { PageContainer } from "@/layouts/PageContainer";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { SettingsNavigation } from "@/components/settings/SettingsNavigation";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { WorkspaceSettings } from "@/components/settings/WorkspaceSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { AIProviderSettings } from "@/components/settings/AIProviderSettings";
import { RuntimeSettings } from "@/components/settings/RuntimeSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { SystemInformation } from "@/components/settings/SystemInformation";
import { SettingsFooter } from "@/components/settings/SettingsFooter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  accountInfo,
  aiProviders,
  apiKeys,
  deviceSessions,
  initialAppearanceSettings,
  initialNotificationPreferences,
  initialRuntimeSettings,
  initialSecuritySettings,
  initialWorkspaceSettings,
  settingsNavItems,
  systemInfoGroups,
} from "@/data/settings";
import type {
  AppearanceSettingsState,
  NotificationPreferences,
  RuntimeSettingsState,
  SecuritySettingsState,
  WorkspaceSettingsState,
} from "@/types/settings";

interface EditableSettings {
  workspace: WorkspaceSettingsState;
  appearance: AppearanceSettingsState;
  runtime: RuntimeSettingsState;
  notifications: NotificationPreferences;
  security: SecuritySettingsState;
}

const DEFAULTS: EditableSettings = {
  workspace: initialWorkspaceSettings,
  appearance: initialAppearanceSettings,
  runtime: initialRuntimeSettings,
  notifications: initialNotificationPreferences,
  security: initialSecuritySettings,
};

export default function Settings() {
  const [current, setCurrent] = useState<EditableSettings>(DEFAULTS);
  const [savedSnapshot, setSavedSnapshot] = useState<EditableSettings>(DEFAULTS);

  const isDirty = useMemo(
    () => JSON.stringify(current) !== JSON.stringify(savedSnapshot),
    [current, savedSnapshot]
  );

  const configuredProviders = aiProviders.filter((p) => p.status !== "not-configured").length;

  return (
    <PageContainer className="flex flex-col gap-8">
      <SettingsHeader />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <SettingsNavigation items={settingsNavItems} />

        <div className="flex min-w-0 flex-1 flex-col gap-10">
          <SettingsSection
            id="general"
            title="General"
            description="A quick overview of this workspace."
            icon={LayoutGrid}
          >
            <Card className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4">
              <div>
                <p className="text-xs text-subtle-foreground">Workspace</p>
                <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                  {current.workspace.workspaceName}
                </p>
              </div>
              <div>
                <p className="text-xs text-subtle-foreground">Plan</p>
                <Badge variant="primary" className="mt-1 normal-case">
                  Enterprise
                </Badge>
              </div>
              <div>
                <p className="text-xs text-subtle-foreground">Configured Providers</p>
                <p className="mt-0.5 font-mono text-sm font-medium text-foreground">
                  {configuredProviders} / {aiProviders.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-subtle-foreground">Active Sessions</p>
                <p className="mt-0.5 font-mono text-sm font-medium text-foreground">
                  {deviceSessions.length}
                </p>
              </div>
            </Card>
          </SettingsSection>

          <WorkspaceSettings
            value={current.workspace}
            onChange={(workspace) => setCurrent((c) => ({ ...c, workspace }))}
          />

          <AppearanceSettings
            value={current.appearance}
            onChange={(appearance) => setCurrent((c) => ({ ...c, appearance }))}
          />

          <AIProviderSettings providers={aiProviders} />

          <RuntimeSettings
            value={current.runtime}
            onChange={(runtime) => setCurrent((c) => ({ ...c, runtime }))}
          />

          <NotificationSettings
            value={current.notifications}
            onChange={(notifications) => setCurrent((c) => ({ ...c, notifications }))}
          />

          <SecuritySettings
            apiKeys={apiKeys}
            sessions={deviceSessions}
            value={current.security}
            onChange={(security) => setCurrent((c) => ({ ...c, security }))}
          />

          <AccountSettings account={accountInfo} />

          <SystemInformation groups={systemInfoGroups} />

          <SettingsFooter
            isDirty={isDirty}
            onSave={() => setSavedSnapshot(current)}
            onDiscard={() => setCurrent(savedSnapshot)}
            onRestoreDefaults={() => setCurrent(DEFAULTS)}
          />
        </div>
      </div>
    </PageContainer>
  );
}
