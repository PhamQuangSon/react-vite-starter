# Tech Stack

## Application

- Build tool: Vite 5
- UI framework: React 18
- Language: TypeScript 5
- Routing: TanStack Router
- Styling: Tailwind CSS 3 with class-based dark mode
- State: Zustand 5 with persistence for theme state
- Icons: Lucide React
- UI primitives: Radix UI and local components under `src/components/ui/`

## Tooling

- Package manager: pnpm 9
- Unit tests: Jest, Testing Library, and jsdom
- End-to-end tests: Playwright
- Linting: ESLint with TypeScript, Airbnb, Prettier, and import-sort rules
- Formatting: Prettier
- Git hooks: Husky, Commitlint, and lint-staged

## Runtime Boundaries

- Browser-only application.
- No server runtime, API client, database, authentication provider, socket layer, or ORM is configured.
