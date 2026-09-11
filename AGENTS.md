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

- This is a browser-only Vite + React + TypeScript Pokémon application.
- Routes live in `src/routes/` and are generated into `src/routeTree.gen.ts` by TanStack Router. Do not edit the generated tree manually.
- The current product is PokéDex Hub: `/` explores Pokémon and `/favorites` manages favorites and custom groups.
- PokéAPI access belongs in `src/services/pokemonApi.ts`; keep loading and network error states visible in the UI.
- Shared Pokémon UI lives in `src/components/pokemon/`; reusable primitives live in `src/components/ui/`.
- Global client state is kept in `src/store/`; theme, favorites, and custom groups use Zustand persistence.
- Use `@/*` for imports from `src/*` and `@/assets/*` for static assets.
- Keep `App.tsx` focused on routing and global effects.

## Rules

- Keep the Pokémon experience focused and browser-only.
- Do not add Rust, WebAssembly, Prisma, database, backend, or server-only dependencies.
- Treat PokéAPI as the external runtime dependency; do not replace it with an API mock in application code.
- Preserve `components.json`, Jest, Playwright, Husky, Commitlint, and lint-staged configuration.
- Prefer small typed components and existing local patterns.
- Do not edit generated `src/routeTree.gen.ts` manually; update route files instead.
