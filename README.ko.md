# ilovepawn / frontend

**ilovepawn** 체스 플랫폼의 프론트엔드 모노레포입니다.

> English documentation: [README.md](./README.md)

## 구조

```
frontend/
├── apps/
│   ├── web/         # Next.js 웹 앱
│   └── mobile/      # Expo (React Native) 앱 — 예정
└── packages/
    ├── shared/      # 플랫폼 공용 체스 로직/유틸
    └── api/         # 백엔드 API 타입드 클라이언트
```

## 기술 스택

- **언어**: TypeScript (strict)
- **웹 프레임워크**: Next.js 16 (App Router)
- **스타일링**: Tailwind CSS v4 + shadcn/ui
- **상태 관리**: Zustand + TanStack Query + React Hook Form + Zod
- **체스**: chess.js, chessground, Stockfish (WASM)
- **도구**: pnpm workspaces + Turborepo + Biome + Vitest + Playwright

## 사전 요구사항

- Node.js >= 22
- pnpm 10 (Corepack 사용 — `corepack enable`)

## 빠른 시작

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local   # 개발/빌드용 NEXT_PUBLIC_API_URL 설정
pnpm dev          # 모든 앱 개발 모드 실행
pnpm build        # 모든 앱/패키지 빌드
pnpm test         # 모든 테스트 실행
pnpm check        # 린트 + 포맷 검사
```

`apps/web/.env.local`은 gitignored입니다. 네 개의 `NEXT_PUBLIC_*` 값이 필요합니다: `API_URL`(Arbiter 백엔드, 기본 `http://localhost:8080`), `KEYCLOAK_URL`(기본 `http://localhost:8081`), `KEYCLOAK_REALM`(`ilovepawn`), `KEYCLOAK_CLIENT_ID`(`arbiter`). 자세한 내용은 `apps/web/.env.example` 참고.

## 인증

**Keycloak**이 ID 제공자(IdP)입니다. 프론트엔드는 `keycloak-js`(PKCE, public client)로 Keycloak에 직접 인증하며, Keycloak이 Google을 업스트림 IdP로 federation합니다. Arbiter로 가는 모든 API 요청에는 Keycloak이 발급한 JWT가 `Authorization: Bearer` 헤더로 실립니다. Arbiter는 그 토큰을 검증하는 Resource Server 역할만 합니다. 인증에 쿠키는 사용하지 않으며, 토큰은 JS 메모리에 저장되고 SDK가 자동으로 갱신합니다.

## 백엔드 서비스

`ilovepawn` 깃허브 조직의 형제 레포들과 연동합니다:

- `deep-thought` — 게임 분석 워커 (RabbitMQ)
- `tactician` — 퍼즐 서비스 (HTTP API)
- `zugzwang` — 엔드게임 트레이너 (HTTP API)

## 라이센스

이 프로젝트는 [MIT License](./LICENSE)로 배포됩니다.

**Stockfish**에 의존하며, Stockfish는 [GPL v3](https://www.gnu.org/licenses/gpl-3.0.html)로 배포됩니다. Stockfish는 별도 엔진으로 사용됩니다: 격리된 실행 컨텍스트(웹은 Web Worker, 모바일은 별도 프로세스)에서 동작하며 UCI 프로토콜로만 통신합니다. Stockfish 바이너리(`stockfish.js` / `stockfish.wasm`)는 이 프로젝트와 함께 독립적인 산출물로 배포되며, 애플리케이션 번들에 링크되지 않습니다.
