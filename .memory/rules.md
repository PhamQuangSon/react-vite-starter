# Project Rules & Guidelines

## Architecture

- Add routes in `src/routes/`; let TanStack Router regenerate `src/routeTree.gen.ts`.
- Keep reusable components in `src/components/` and generic primitives in `src/components/ui/`.
- Keep layout-only components in `src/layout/`.
- Keep global client state in `src/store/`; avoid a store for local state.
- Keep helpers in `src/lib/` and static assets in `src/assets/`.

## TypeScript and React

- Use strict, explicit types for component props and store state.
- Avoid `any`; use focused interfaces or types.
- Keep render functions pure and use effects only for browser synchronization.
- Keep the Router instance stable; do not construct it during every render.

## Styling and Validation

- Use existing Tailwind utilities and CSS variables.
- Preserve class-based dark mode through the theme store and document root class.
- Run `pnpm build` for route or configuration changes.
- Run focused Jest or Playwright tests for behavior changes.
- Run `pnpm lint` before review when practical.
