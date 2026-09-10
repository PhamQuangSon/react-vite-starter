# Claude Project Instructions

## Project Summary

- Vite + React 18 + TypeScript browser application.
- Tailwind CSS provides styling; Radix primitives and local components provide UI building blocks.
- TanStack Router owns route definitions and navigation.
- Zustand currently owns the persisted theme state.
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
- `src/routes/`: route components.
- `src/components/`: shared components and UI primitives.
- `src/layout/`: application shell components.
- `src/store/`: Zustand stores.
- `src/lib/`: small shared helpers.
- `src/assets/`: imported static assets.
- `src/routeTree.gen.ts`: generated TanStack Router output; do not edit manually.

## Code Conventions

- Use TypeScript and explicitly type public component props.
- Prefer existing Tailwind, Radix, Lucide, and local component patterns.
- Use `cn` from `src/lib/utils.ts` for conditional classes.
- Keep render functions pure and browser effects in `useEffect`.
- Use the `@/*` alias for `src/*` imports.
- Keep feature additions small and browser-safe.

## Quality

- Preserve Jest, Playwright, Husky, Commitlint, and lint-staged configuration.
- Run `pnpm build` and the narrowest relevant test after code changes.
- Do not reintroduce post, article, booking, or API mock code into the base starter.
