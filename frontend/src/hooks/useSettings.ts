import { useQuery } from "@tanstack/react-query";
import { getAppInfo, getAppStatus, getProviderHealth, getProviderManagerStatus } from "@/api/settings";

export const settingsKeys = {
  all: ["settings"] as const,
  appInfo: () => [...settingsKeys.all, "app-info"] as const,
  appStatus: () => [...settingsKeys.all, "app-status"] as const,
  providers: () => [...settingsKeys.all, "providers"] as const,
  providerHealth: () => [...settingsKeys.all, "provider-health"] as const,
};

export function useAppInfo() {
  return useQuery({ queryKey: settingsKeys.appInfo(), queryFn: ({ signal }) => getAppInfo(signal) });
}

export function useAppStatus() {
  return useQuery({ queryKey: settingsKeys.appStatus(), queryFn: ({ signal }) => getAppStatus(signal) });
}

export function useProviderManagerStatus() {
  return useQuery({
    queryKey: settingsKeys.providers(),
    queryFn: ({ signal }) => getProviderManagerStatus(signal),
  });
}

export function useProviderHealth() {
  return useQuery({
    queryKey: settingsKeys.providerHealth(),
    queryFn: ({ signal }) => getProviderHealth(signal),
  });
}
