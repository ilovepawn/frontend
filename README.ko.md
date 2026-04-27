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
- **웹 프레임워크**: Next.js 15 (App Router)
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
pnpm dev          # 모든 앱 개발 모드 실행
pnpm build        # 모든 앱/패키지 빌드
pnpm test         # 모든 테스트 실행
pnpm check        # 린트 + 포맷 검사
```

## 백엔드 서비스

`ilovepawn` 깃허브 조직의 형제 레포들과 연동합니다:

- `deep-thought` — 게임 분석 워커 (RabbitMQ)
- `tactician` — 퍼즐 서비스 (HTTP API)
- `zugzwang` — 엔드게임 트레이너 (HTTP API)

## 라이센스

이 프로젝트는 [MIT License](./LICENSE)로 배포됩니다.

**Stockfish**에 의존하며, Stockfish는 [GPL v3](https://www.gnu.org/licenses/gpl-3.0.html)로 배포됩니다. Stockfish는 별도 엔진으로 사용됩니다: 격리된 실행 컨텍스트(웹은 Web Worker, 모바일은 별도 프로세스)에서 동작하며 UCI 프로토콜로만 통신합니다. Stockfish 바이너리(`stockfish.js` / `stockfish.wasm`)는 이 프로젝트와 함께 독립적인 산출물로 배포되며, 애플리케이션 번들에 링크되지 않습니다.
