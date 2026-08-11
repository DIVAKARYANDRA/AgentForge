import { request } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";

/** GET / — api/health.py::root() */
export interface AppInfo {
  framework: string;
  version: string;
  status: string;
}

/** GET /status — api/health.py::status() */
export interface AppStatus {
  framework: string;
  environment: string;
  provider: string;
  status: string;
}

/** GET /providers — ProviderManager.status() exactly (core/providers/provider_manager.py). */
export interface ProviderManagerStatus {
  active_provider: string | null;
  fallback_provider: string | null;
  available: string[];
}

/** GET /provider-health — api/health.py::provider_health(), keyed by provider name. */
export type ProviderHealthMap = Record<string, { healthy: boolean; message: string }>;

export function getAppInfo(signal?: AbortSignal): Promise<AppInfo> {
  return request<AppInfo>(ENDPOINTS.root, { signal });
}

export function getAppStatus(signal?: AbortSignal): Promise<AppStatus> {
  return request<AppStatus>(ENDPOINTS.status, { signal });
}

export function getProviderManagerStatus(signal?: AbortSignal): Promise<ProviderManagerStatus> {
  return request<ProviderManagerStatus>(ENDPOINTS.providers, { signal });
}

export function getProviderHealth(signal?: AbortSignal): Promise<ProviderHealthMap> {
  return request<ProviderHealthMap>(ENDPOINTS.providerHealth, { signal });
}

/**
 * No route exists to persist workspace/runtime/notification/security
 * preferences (no api/settings.py in the backend), so those sections
 * intentionally remain UI-only — per this prompt's own instruction:
 * "Otherwise: leave settings UI-only. Do NOT invent backend APIs."
 */
