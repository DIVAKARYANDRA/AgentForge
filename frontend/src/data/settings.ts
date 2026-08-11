import type {
  AccountInfo,
  AIProvider,
  ApiKeyEntry,
  AppearanceSettingsState,
  DeviceSession,
  NotificationPreferences,
  RuntimeSettingsState,
  SecuritySettingsState,
  SettingsNavItem,
  SystemInfoGroup,
  WorkspaceSettingsState,
} from "@/types/settings";

export const settingsNavItems: SettingsNavItem[] = [
  { id: "general", label: "General" },
  { id: "workspace", label: "Workspace" },
  { id: "appearance", label: "Appearance" },
  { id: "ai-providers", label: "AI Providers" },
  { id: "runtime", label: "Runtime" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "account", label: "Account" },
  { id: "system-information", label: "System Information" },
];

export const initialWorkspaceSettings: WorkspaceSettingsState = {
  workspaceName: "Acme Corp",
  organization: "Acme Corporation",
  defaultProject: "Customer Operations",
  language: "English (US)",
  timezone: "UTC (Coordinated Universal Time)",
  dateFormat: "MM/DD/YYYY",
};

export const initialAppearanceSettings: AppearanceSettingsState = {
  theme: "dark",
  accentColor: "blue",
  compactMode: false,
  animations: true,
  reducedMotion: false,
};

export const aiProviders: AIProvider[] = [
  {
    id: "google-gemini",
    name: "Google Gemini",
    status: "configured",
    model: "gemini-2.5-pro",
    connectionStatus: "connected",
    lastChecked: "5 minutes ago",
  },
  {
    id: "openai",
    name: "OpenAI",
    status: "not-configured",
    connectionStatus: "disconnected",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    status: "not-configured",
    connectionStatus: "disconnected",
  },
  {
    id: "azure-openai",
    name: "Azure OpenAI",
    status: "not-configured",
    connectionStatus: "disconnected",
  },
  {
    id: "ollama",
    name: "Ollama",
    status: "local",
    model: "llama3.1:70b",
    connectionStatus: "connected",
    lastChecked: "just now",
  },
];

export const initialRuntimeSettings: RuntimeSettingsState = {
  defaultModel: "gemini-2.5-pro",
  maxTokens: 4096,
  temperature: 0.7,
  topP: 0.9,
  streaming: true,
  parallelExecution: true,
  reflection: true,
  retryLimit: 2,
  knowledgePromotion: true,
  memoryRetentionDays: 90,
};

export const initialNotificationPreferences: NotificationPreferences = {
  "task-completed": { "in-app": true, email: false, desktop: true },
  "workflow-failed": { "in-app": true, email: true, desktop: true },
  "knowledge-promotion": { "in-app": true, email: false, desktop: false },
  "system-alerts": { "in-app": true, email: true, desktop: true },
  "runtime-errors": { "in-app": true, email: true, desktop: true },
  "weekly-summary": { "in-app": false, email: true, desktop: false },
};

export const apiKeys: ApiKeyEntry[] = [
  {
    id: "key-1",
    label: "Production",
    maskedValue: "sk-agf-••••••••••••••••7f2a",
    createdAt: "2025-11-02",
    lastUsed: "2 minutes ago",
  },
  {
    id: "key-2",
    label: "Staging",
    maskedValue: "sk-agf-••••••••••••••••c19d",
    createdAt: "2026-01-14",
    lastUsed: "3 days ago",
  },
];

export const deviceSessions: DeviceSession[] = [
  {
    id: "session-1",
    device: "Chrome on macOS",
    location: "Stockholm, Sweden",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "session-2",
    device: "Claude for iOS",
    location: "Stockholm, Sweden",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "session-3",
    device: "Firefox on Windows",
    location: "Berlin, Germany",
    lastActive: "6 days ago",
    current: false,
  },
];

export const initialSecuritySettings: SecuritySettingsState = {
  sessionTimeoutMinutes: 60,
  mfaEnabled: true,
};

export const accountInfo: AccountInfo = {
  name: "Alex Rivera",
  email: "alex@agentforge.dev",
  role: "Workspace Admin",
  organization: "Acme Corporation",
  workspaceId: "ws_8f2a1c9d",
  memberSince: "October 2025",
  avatarInitials: "AR",
};

export const systemInfoGroups: SystemInfoGroup[] = [
  {
    title: "Application",
    entries: [
      { label: "Frontend Version", value: "AgentForge v1.0.0" },
      { label: "Backend Version", value: "AgentForge API v1.0.0" },
      { label: "Deployment Mode", value: "Development" },
    ],
  },
  {
    title: "Frontend Stack",
    entries: [
      { label: "Framework", value: "React 19 + Vite" },
      { label: "React Version", value: "19.2.8" },
      { label: "TypeScript Version", value: "6.0.2" },
      { label: "Vite Version", value: "8.2.1" },
    ],
  },
  {
    title: "Backend Stack",
    entries: [
      { label: "Framework", value: "FastAPI" },
      { label: "FastAPI Version", value: "0.115.x" },
      { label: "Python Version", value: "3.12" },
    ],
  },
  {
    title: "Build",
    entries: [{ label: "Build", value: "agentforge@2026.08.09-dev" }],
  },
];
