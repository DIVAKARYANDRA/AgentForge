# AgentForge Frontend — Deployment Notes

## Environment variables

One variable controls the backend the frontend talks to (see `src/api/client.ts`):

```
VITE_API_BASE_URL
```

**Development** — copy `.env.example` to `.env.local`:
```
VITE_API_BASE_URL=http://localhost:8000
```

**Production (Vercel)** — set under Project Settings → Environment Variables:
```
VITE_API_BASE_URL=<your deployed backend URL, e.g. a Render service>
```
No default production URL is hardcoded anywhere in source — set this explicitly per environment.

## Backend CORS

As of the reviewed backend snapshot, `app/main.py` does not configure CORS middleware. A browser calling the backend from a different origin (any real deployment) will need CORS enabled on the backend before live requests succeed — this is backend work, not something the frontend can work around.

## Vercel

- `vercel.json` rewrites all paths to `/index.html` so direct navigation to any client-side route (e.g. `/agents`, refreshing on `/workflows`) resolves correctly instead of 404ing — required for a React Router SPA.
- Build command: `npm run build` (runs `tsc -b && vite build`). Output directory: `dist`.
- No secrets are bundled; only `VITE_API_BASE_URL` is read at build time via `import.meta.env`.

## What's live vs. mock right now

See the Prompt 10/11 integration reports for the full breakdown. Short version: Runtime health, Mission Control's platform status, AI Provider status, and part of System Information are live. Agents, Workflows, Tools (beyond names), Memory, Knowledge, and Analytics remain mock-backed because the backend doesn't mount routes for those domains yet — each is labeled "Demo Data" in its page header.
