/**
 * Base URL for the AgentForge FastAPI backend. The backend (see
 * config/settings.py) listens on 0.0.0.0:8000 by default and — as of
 * this backend snapshot — has no CORS middleware configured, so it must
 * either be proxied under the same origin or have CORS added before a
 * browser can call it directly. Override via VITE_API_BASE_URL.
 */
export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:8000";

const DEFAULT_TIMEOUT_MS = 10_000;

export type ApiErrorKind = "network" | "timeout" | "http" | "parse";

/** Normalized error shape every client call throws — pages branch on `kind`, never on raw fetch/DOMException types. */
export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;

  constructor(kind: ApiErrorKind, message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.status = status;
  }
}

/**
 * The backend's ApiResponse envelope (see api/api_response.py). Not
 * every route uses it yet — health.py's routes return raw dicts — so
 * `request()` returns the parsed body as-is and callers type the shape
 * per endpoint rather than assuming this envelope everywhere.
 */
export interface ApiEnvelope<T> {
  success: boolean;
  timestamp: string;
  data: T;
  error: string | null;
  metadata: Record<string, unknown>;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined>;
  timeoutMs?: number;
  signal?: AbortSignal;
}

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const url = new URL(path.replace(/^\//, ""), `${API_BASE_URL}/`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

/** Placeholder for future auth support — the backend registers an AuthenticationManager but exposes no login/token route yet, so this is a no-op until it does. */
function getAuthHeader(): Record<string, string> {
  return {};
}

/**
 * Core request function every api/*.ts module calls through. Combines
 * an external AbortSignal (for React Query cancellation) with an
 * internal timeout, and normalizes every failure mode into ApiError.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, query, timeoutMs = DEFAULT_TIMEOUT_MS, signal } = options;

  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), timeoutMs);

  const onExternalAbort = () => timeoutController.abort();
  signal?.addEventListener("abort", onExternalAbort);

  try {
    let response: Response;
    try {
      response = await fetch(buildUrl(path, query), {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...getAuthHeader(),
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: timeoutController.signal,
      });
    } catch (err) {
      if (timeoutController.signal.aborted) {
        throw new ApiError(
          signal?.aborted ? "network" : "timeout",
          signal?.aborted ? "Request cancelled." : `Request timed out after ${timeoutMs}ms.`
        );
      }
      throw new ApiError(
        "network",
        err instanceof Error ? err.message : "Network request failed — is the backend running?"
      );
    }

    if (!response.ok) {
      let detail = response.statusText;
      try {
        const errorBody = (await response.json()) as { error?: string; detail?: string };
        detail = errorBody.error ?? errorBody.detail ?? detail;
      } catch {
        // Body wasn't JSON — fall back to statusText, already set above.
      }
      throw new ApiError("http", detail || `Request failed with status ${response.status}`, response.status);
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return undefined as T;
    }

    const rawText = await response.text();
    if (rawText.length === 0) {
      return undefined as T;
    }

    try {
      return JSON.parse(rawText) as T;
    } catch (err) {
      throw new ApiError("parse", err instanceof Error ? err.message : "Failed to parse response body.");
    }
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener("abort", onExternalAbort);
  }
}
