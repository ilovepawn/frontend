# ilovepawn / frontend

Frontend monorepo for the **ilovepawn** chess platform.

> 한국어 문서는 [README.ko.md](./README.ko.md)를 참고하세요.

## Structure

```
frontend/
├── apps/
│   ├── web/         # Next.js web app
│   └── mobile/      # Expo (React Native) app — planned
└── packages/
    ├── shared/      # Cross-platform chess logic & utilities
    └── api/         # Typed API client for backend services
```

## Stack

- **Language**: TypeScript (strict)
- **Web framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State**: Zustand + TanStack Query + React Hook Form + Zod
- **Chess**: chess.js, chessground, Stockfish (WASM)
- **Tooling**: pnpm workspaces + Turborepo + Biome + Vitest + Playwright

## Prerequisites

- Node.js >= 22
- pnpm 10 (managed via Corepack — `corepack enable`)

## Quick start

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local   # set NEXT_PUBLIC_API_URL for dev/build
pnpm dev          # run all apps in dev mode
pnpm build        # build all apps and packages
pnpm test         # run all tests
pnpm check        # lint + format check
```

`apps/web/.env.local` is gitignored. Four `NEXT_PUBLIC_*` values are required: `API_URL` (Arbiter backend, default `http://localhost:8080`), `KEYCLOAK_URL` (default `http://localhost:8081`), `KEYCLOAK_REALM` (`ilovepawn`), and `KEYCLOAK_CLIENT_ID` (`arbiter`). See `apps/web/.env.example`.

## Authentication

**Keycloak** is the identity provider. The frontend uses `keycloak-js` (PKCE flow, public client) to authenticate directly against Keycloak — which federates Google as an upstream IdP — and sends Keycloak-issued JWTs to Arbiter as `Authorization: Bearer` headers. The Arbiter backend acts as a Resource Server validating those tokens. No cookies are used for auth; tokens live in JS memory and are auto-refreshed by the SDK.

## Backend services

The frontend integrates with sibling repos in the `ilovepawn` GitHub organization:

- `deep-thought` — game analysis worker (RabbitMQ)
- `tactician` — puzzle service (HTTP API)
- `zugzwang` — endgame trainer (HTTP API)

## License

This project is licensed under the [MIT License](./LICENSE).

It depends on **Stockfish**, which is licensed under [GPL v3](https://www.gnu.org/licenses/gpl-3.0.html). Stockfish is used as a separate engine: it runs in an isolated execution context (Web Worker on web, isolated process on mobile) and communicates only via the UCI protocol. Stockfish binaries (`stockfish.js` / `stockfish.wasm`) are distributed alongside this project as standalone artifacts and are not linked into the application bundle.
