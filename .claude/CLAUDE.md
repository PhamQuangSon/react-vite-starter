# Claude Project Instructions

## Project Summary

- PokéDex Hub is a browser-only Vite + React 18 + TypeScript application.
- Tailwind CSS provides styling; Radix primitives and local components provide UI building blocks.
- TanStack Router owns route definitions and navigation.
- PokéAPI is accessed through `src/services/pokemonApi.ts`; network access is required for remote Pokémon data.
- Zustand persists theme, favorites, and custom collection groups in `localStorage`.
- There is no backend, database, Prisma, Next.js, Rust, or WebAssembly layer.

## Key Commands

- Dev server: `pnpm dev`
- Production build: `pnpm build`
- Preview build: `pnpm preview`
- Unit tests: `pnpm test -- --runInBand`
- Playwright tests: `pnpm test:e2e`
- Lint: `pnpm lint`
- Format: `pnpm format .`

## Source Layout

- `src/main.tsx`: browser entrypoint.
- `src/App.tsx`: theme effect, stable TanStack Router instance, and suspense boundary.
- `src/routes/`: route components for Explore (`/`) and Favorites (`/favorites`).
- `src/components/pokemon/`: Pokémon cards, filters, detail modal, and collection management UI.
- `src/components/`: shared components and UI primitives.
- `src/layout/`: application shell components.
- `src/services/`: PokéAPI client, mappers, and in-memory cache.
- `src/store/`: Zustand stores, including persisted favorites and collection groups.
- `src/lib/`: small shared helpers.
- `src/assets/`: imported static assets.
- `src/routeTree.gen.ts`: generated TanStack Router output; do not edit manually.

## Code Conventions

- Use TypeScript and explicitly type public component props.
- Prefer existing Tailwind, Radix, Lucide, and local component patterns.
- Use `cn` from `src/lib/utils.ts` for conditional classes.
- Keep render functions pure and browser effects in `useEffect`.
- Use the `@/*` alias for `src/*` imports.
- Keep Pokémon feature additions small and browser-safe.
- Handle PokéAPI loading and error states in the UI; do not add a backend or mock API layer.

## Quality

- Preserve Jest, Playwright, Husky, Commitlint, and lint-staged configuration.
- Run `pnpm build` and the narrowest relevant test after code changes.
- Run `pnpm test -- --runInBand` for service/store changes and `pnpm test:e2e` for primary browser workflows when available.
- Do not reintroduce post, article, booking, authentication, or API mock code into the application.
