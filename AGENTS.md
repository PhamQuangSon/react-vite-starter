# Project Guide

## Before Development

- Use Node.js and pnpm. Run `pnpm install` after dependency changes.
- Start the development server with `pnpm dev`.
- Read `README.md`, `.claude/CLAUDE.md`, and `.memory/` before changing architecture.

## Validation

- `pnpm build` checks the Vite production bundle.
- `pnpm test -- --runInBand` runs Jest unit tests.
- `pnpm test:e2e` runs Playwright tests.
- `pnpm lint` runs ESLint with the repository rules.
- `pnpm format .` formats supported files with Prettier.

## Architecture

- This is a browser-only Vite + React + TypeScript application.
- Routes live in `src/routes/` and are generated into `src/routeTree.gen.ts` by TanStack Router.
- Shared UI lives in `src/components/`; reusable primitives live in `src/components/ui/`.
- Global client state is kept in `src/store/` and currently contains theme state.
- Use `@/*` for imports from `src/*` and `@/assets/*` for static assets.
- Keep `App.tsx` focused on routing and global effects.

## Rules

- Keep the starter minimal and browser-focused.
- Do not add Rust, WebAssembly, Prisma, database, or server-only dependencies.
- Preserve `components.json`, Jest, Playwright, Husky, Commitlint, and lint-staged configuration.
- Prefer small typed components and existing local patterns.
- Do not edit generated `src/routeTree.gen.ts` manually; update route files instead.
