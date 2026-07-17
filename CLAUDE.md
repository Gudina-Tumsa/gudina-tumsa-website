# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Next.js (App Router) frontend for the Gudina Tumsa online library ("GTL"). Package name is `online-library-web`. Uses pnpm (lockfile is `pnpm-lock.yaml`).

## Commands

```bash
pnpm dev      # start dev server (localhost:3000)
pnpm build    # production build
pnpm start    # run production build
pnpm lint     # next lint
```

There is no test framework configured (no test script, no test files, no Jest/Vitest dependency). Don't assume one exists.

## Architecture

- **Backend is fully external.** `src/app/api/` is empty — there are no Next.js API routes. All data access goes through `fetch` calls to `process.env.NEXT_PUBLIC_BASE_URL`, wrapped in per-resource client modules under `src/lib/api/` (`auth.ts`, `book.ts`, `category.ts`, `comment.ts`, `events.ts`, `otp.ts`, `rating.ts`, `sessions.ts`, `user.ts`, `userbookinteraction.ts`). Add new backend calls here rather than calling `fetch` directly from components.
- **`NEXT_PUBLIC_BASE_URL` must stay pointed at the local backend** (`next.config.ts` — currently `http://localhost:3002`, matching `PORT` in `gudina-tumsa-backend/.env`). Do not switch it to the hosted API (`https://api.gudinatumsa.com`), even temporarily — always develop and test against localhost. Leave the hosted URL commented out as a reference only.
- **State**: Redux Toolkit store at `src/app/store/store.ts`, combined from slices in `src/app/store/features/` (`userSlice`, `categorySlice`, `bookSlice`). The whole root reducer is wrapped in `redux-persist` (persists to storage as a single `root` key), so shapes of persisted slices must stay backwards-compatible across releases. Auth session (token/refreshToken/deviceId/expiresAt) lives in `userSlice`, not in a cookie/next-auth session — `next-auth` is a dependency but is not actually wired up anywhere in `src/`.
- **Providers**: `src/app/Providers.tsx` nests Redux `Provider` → `PersistGate` → `NextIntlClientProvider`. This file has `// @ts-nocheck` and eslint disabled — be careful when editing it since type errors won't surface.
- **i18n**: `next-intl`, locales are `am` (Amharic), `om` (Oromo), `en` (default) — see `src/i18n/config.ts`. Locale is read/written via a cookie (`NEXT_LOCALE`) through server actions in `src/services/locale.ts`, and messages are loaded per-locale from `src/messages/<locale>.json` in `src/i18n/request.ts`. When adding user-facing strings, add keys to all locale JSON files, not just `en`.
- **UI components**: shadcn/ui (`components.json`, style "new-york", base color "neutral") — primitives live in `src/components/ui/`, built on Radix primitives. Reusable feature components are organized under `src/components/elements/<feature>/` (e.g. `bookdetail/`, `login/`, `signup/`, `settings/`, `index/` for the homepage). Layout chrome (header/footer/sidebar) is in `src/components/layout/`.
- **Routing**: standard App Router structure under `src/app/`, one directory per route (`book/[id]`, `bookdetail/[id]`, `bookbycategory/[id]`, `news/[id]`, `dashboard`, `login`, `signup`, `settings`, `reading`, `toread`, `completed`, etc.). Types for API payloads live in `src/types/` (`auth.ts`, `book.ts`, `category.ts`, `comments.ts`, `events.ts`, `sessions.ts`) and should mirror the external API's response shapes.
- **Path alias**: `@/*` maps to `src/*` (see `tsconfig.json` and `components.json` aliases).
- Reading/PDF viewing uses `@react-pdf-viewer/*`, `react-pdf`, `pdfjs-dist`, and `pdf-lib` together — if touching the reader, check which of these libraries a given component actually depends on before upgrading any of them, since they pin specific compatible versions (e.g. `@react-pdf-viewer/core` is pinned to `3.12.0` exactly).