# Tech Stack

## Application

- Build tool: Vite 5
- UI framework: React 18
- Language: TypeScript 5
- Routing: TanStack Router
- Styling: Tailwind CSS 3 with class-based dark mode
- State: Zustand 5 with persistence for theme, favorites, and custom collection groups
- API: PokéAPI REST integration with mappers and in-memory detail caching
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
- PokéAPI is the only external runtime service and requires network access.
- Zustand persistence covers theme, favorites, and custom collection groups in `localStorage`.
- No server runtime, database, authentication provider, socket layer, or ORM is configured.
