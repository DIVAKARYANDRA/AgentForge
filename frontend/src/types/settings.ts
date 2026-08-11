/* ---------------------------------------------------------------------- */
/* Workspace                                                              */
/* ---------------------------------------------------------------------- */

export interface WorkspaceSettingsState {
  workspaceName: string;
  organization: string;
  defaultProject: string;
  language: string;
  timezone: string;
  dateFormat: string;
}

/* ---------------------------------------------------------------------- */
/* Appearance                                                             */
/* ---------------------------------------------------------------------- */

/** Mirrors ThemeProvider's own Theme union so the real theme system stays the source of truth. */
export type ThemeMode = "dark" | "light" | "system";

export type AccentColor = "blue" | "purple" | "green" | "orange";

export interface AppearanceSettingsState {
  theme: ThemeMode;
  accentColor: AccentColor;
  compactMode: boolean;
  animations: boolean;
  reducedMotion: boolean;
}

/* ---------------------------------------------------------------------- */
/* AI Providers                                                           */
/* ---------------------------------------------------------------------- */

export type ProviderStatus = "configured" | "not-configured" | "local";
export type ProviderConnectionStatus = "connected" | "disconnected" | "untested";

export interface AIProvider {
  id: string;
  name: string;
  status: ProviderStatus;
  model?: string;
  connectionStatus: ProviderConnectionStatus;
  lastChecked?: string;
}

/* ---------------------------------------------------------------------- */
/* Runtime                                                                */
/* ---------------------------------------------------------------------- */

export interface RuntimeSettingsState {
  defaultModel: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  streaming: boolean;
  parallelExecution: boolean;
  reflection: boolean;
  retryLimit: number;
  knowledgePromotion: boolean;
  memoryRetentionDays: number;
}

/* ---------------------------------------------------------------------- */
/* Notifications                                                          */
/* ---------------------------------------------------------------------- */

export type NotificationEvent =
  | "task-completed"
  | "workflow-failed"
  | "knowledge-promotion"
  | "system-alerts"
  | "runtime-errors"
  | "weekly-summary";

export type NotificationChannel = "in-app" | "email" | "desktop";

export type NotificationPreferences = Record<
  NotificationEvent,
  Record<NotificationChannel, boolean>
>;

export const NOTIFICATION_EVENT_LABELS: Record<NotificationEvent, string> = {
  "task-completed": "Task Completed",
  "workflow-failed": "Workflow Failed",
  "knowledge-promotion": "Knowledge Promotion",
  "system-alerts": "System Alerts",
  "runtime-errors": "Runtime Errors",
  "weekly-summary": "Weekly Summary",
};

export const NOTIFICATION_CHANNEL_LABELS: Record<NotificationChannel, string> = {
  "in-app": "In-App",
  email: "Email",
  desktop: "Desktop",
};

/* ---------------------------------------------------------------------- */
/* Security                                                               */
/* ---------------------------------------------------------------------- */

export interface ApiKeyEntry {
  id: string;
  label: string;
  maskedValue: string;
  createdAt: string;
  lastUsed: string;
}

export interface DeviceSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface SecuritySettingsState {
  sessionTimeoutMinutes: number;
  mfaEnabled: boolean;
}

/* ---------------------------------------------------------------------- */
/* Account                                                                */
/* ---------------------------------------------------------------------- */

export interface AccountInfo {
  name: string;
  email: string;
  role: string;
  organization: string;
  workspaceId: string;
  memberSince: string;
  avatarInitials: string;
}

/* ---------------------------------------------------------------------- */
/* System Information                                                     */
/* ---------------------------------------------------------------------- */

export interface SystemInfoEntry {
  label: string;
  value: string;
}

export interface SystemInfoGroup {
  title: string;
  entries: SystemInfoEntry[];
}

/* ---------------------------------------------------------------------- */
/* Navigation                                                             */
/* ---------------------------------------------------------------------- */

export interface SettingsNavItem {
  id: string;
  label: string;
}
