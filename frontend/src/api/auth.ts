/**
 * The backend constructs an AuthenticationManager in app/lifespan.py
 * (core/security) and registers it in the DI container, but no auth
 * router is ever mounted in app/main.py — there is no /auth/* route to
 * call. Per this prompt's instruction not to invent endpoints, this file
 * intentionally exposes nothing yet.
 *
 * When the backend adds a real auth router, add typed functions here
 * (e.g. login, refresh, logout) following the same pattern as
 * api/runtime.ts, and a corresponding hooks/useAuth.ts.
 */
export {};
