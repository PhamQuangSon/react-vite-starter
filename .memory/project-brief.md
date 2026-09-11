# Project Brief

## Overview

PokéDex Hub is a browser-focused React application for exploring Pokémon and managing personal collections. It provides responsive routes, Tailwind styling, reusable UI primitives, persisted state, unit testing, end-to-end testing, linting, formatting, and Git hooks.

## Current Experience

- An Explore route at `/` with debounced search, type filters, pagination, and Pokémon detail views.
- A Favorites route at `/favorites` with custom collection groups and group insights.
- PokéAPI integration through `src/services/pokemonApi.ts`, including mapping and in-memory detail caching.
- A shared layout with a persisted light/dark theme toggle.
- Persisted favorites and collection groups through Zustand and `localStorage`.

## Intended Use

Add Pokémon features under `src/routes/` and `src/components/pokemon/`, keep API behavior in `src/services/`, and add state only when a feature needs it.

## Non-goals

The application does not include authentication, a backend, database access, API mocks, real-time sockets, post/article data, Prisma, Next.js, Rust, or WebAssembly.
