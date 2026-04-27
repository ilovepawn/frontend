# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`ilovepawn/frontend` is the frontend monorepo for the **ilovepawn** chess platform. It hosts the web client today and will host the mobile client (Expo / React Native) once the web is stable.

The platform is composed of multiple Python backend services in sibling repos of the `ilovepawn` GitHub organization:

- **deep-thought** — game analysis worker (RabbitMQ; produces `%eval`-annotated PGNs to S3). Not directly called by the frontend; results flow through the API gateway.
- **tactician** — puzzle service (HTTP API). Mines puzzles from analyzed games (Lichess puzzler vendored under AGPL-3.0).
- **zugzwang** — endgame trainer (HTTP API; uses Syzygy tablebases).

This repo is the *only* user-facing surface for that platform.

## Architecture

```
frontend/
├── apps/
│   ├── web/         # Next.js 16 App Router app (the only running app at the moment)
│   └── mobile/      # Expo (React Native) — planned, not yet scaffolded
└── packages/
    ├── shared/      # Pure-TS chess logic and utilities (chess.js wrappers, board state helpers, theme tokens). No React.
    └── api/         # Typed fetch client for backend services. Generated types from OpenAPI specs of sibling repos.
```

Workspaces are managed by **pnpm**, build orchestration by **Turborepo**.

## Tech Stack

- TypeScript (strict, `noUncheckedIndexedAccess`)
- Next.js 16 (App Router)
- Tailwind CSS v4 + shadcn/ui + lucide-react
- Zustand (client state) + TanStack Query (server state) + React Hook Form + Zod
- chess.js (move generation/validation/PGN) + chessground (Lichess board UI) + Stockfish (WASM, in Worker)
- next-intl (en + ko)
- Biome (lint + format) + Vitest + Playwright

## Authentication

Backend-driven OAuth. The frontend renders a plain hyperlink to `{API}/auth/<provider>`; the backend handles the entire OAuth flow with the provider and issues a JWT. The frontend stores the JWT (mechanism TBD with backend — cookie vs. body) and attaches it to subsequent API calls.

**Do not install `next-auth` / `@auth/core`.** The backend already owns OAuth; client frameworks duplicate and conflict.

## Stockfish licensing

Stockfish is GPL v3. This repo is MIT. The MIT license holds because Stockfish is integrated as a **separate engine**, not linked into the app source:

- Stockfish WASM/JS files live under `apps/web/public/` and are loaded via `new Worker(...)` — not bundled into the main JS bundle.
- All communication is via the UCI text protocol over `postMessage`.
- Mobile (when added) will use a similarly process-isolated approach (native module via IPC or hidden WebView).

If you propose any integration that imports Stockfish source into the application bundle or links it in-process, **stop and flag the license implication first.**

## Branching

- `main` — deployed / production. Never commit directly. Only merges from `dev` at release time.
- `dev` — development integration branch. Default target for feature/fix PRs.
- `feat/<name>` — new feature work, branched from `dev`, PR'd back into `dev`.
- `fix/<name>` — bug fix work, branched from `dev`, PR'd back into `dev`.

Commits follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `build:`, `ci:`).

## Commands

```bash
# install
corepack enable
pnpm install

# dev
pnpm dev               # all apps
pnpm --filter web dev  # only web

# build / test / lint
pnpm build
pnpm test
pnpm check             # biome lint + format check
pnpm format            # biome format --write
pnpm typecheck
```

## Documentation

- `README.md` — English overview
- `README.ko.md` — Korean overview
- This file (`CLAUDE.md`) is English only, matching the convention of sibling repos.
