<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CDC Marketplace Frontend — Architecture

## Monorepo

| App | Port | Purpose |
|-----|------|---------|
| `apps/web` | 3000 | Marketing / public site |
| `apps/marketplace` | 3001 | Authenticated product app |

Shared infrastructure lives in `packages/`:

- `@workspace/ui` — shadcn design system
- `@workspace/api` — Axios client factory, interceptors, error types
- `@workspace/eslint-config` — ESLint configs including FSD boundary rules
- `@workspace/typescript-config` — shared TypeScript configs

Business logic (entities, features, widgets, pages) stays **per-app** in each app's `src/`.

## Feature-Sliced Design

Each app follows FSD under `src/`:

```text
src/
├── processes/   # Multi-page workflows (marketplace only)
├── views/       # Page compositions (import as @/pages/* — NOT Next.js routes)
├── widgets/     # Large reusable UI compositions
├── features/    # Business capabilities / user actions
├── entities/    # Business objects
└── shared/      # Reusable infrastructure (no business logic)
```

Next.js treats any `pages/` directory as the Pages Router. Page compositions live in `src/views/` and are imported via the `@/pages/*` alias.

```tsx
// app/dashboard/page.tsx
export { DashboardPage as default } from "@/pages/dashboard"
```

## Dependency Rule

Dependencies always point downward:

```text
processes → pages → widgets → features → entities → shared
```

Forbidden examples:

- `shared` importing from `features`
- `entities` importing from `widgets`
- `features` importing from `pages`

ESLint enforces this via `@workspace/eslint-config/fsd`.

## State Management

- **TanStack Query** — server state only (query hooks, mutation hooks, query keys)
- **Zustand** — UI/client state only (sidebar, modals, table preferences)

Never store API responses or auth data in Zustand.

## API Layer

- Axios is abstracted in `@workspace/api`
- Each app creates an instance in `src/shared/axios/client.ts`
- Endpoint modules live in `src/shared/api/` or entity/feature `api/` folders
- Components never import Axios directly

## Path Aliases

Each app uses:

- `@/shared/*`, `@/entities/*`, `@/features/*`, `@/widgets/*`, `@/pages/*`, `@/processes/*`
- `@workspace/ui/*`, `@workspace/api/*`

## Adding shadcn Components

```bash
pnpm dlx shadcn@latest add <component> -c apps/web
```

Components install into `packages/ui/src/components/`.

## Reference Slices

Canonical patterns to follow when adding features:

- **Web**: `src/features/newsletter-signup` — Server Action + Zod + toast
- **Marketplace**: `src/features/login` — TanStack mutation + JWT + middleware

## Commands

```bash
pnpm dev          # Run all apps via Turborepo
pnpm build        # Build all apps and packages
pnpm lint         # Lint all workspaces
pnpm typecheck    # Typecheck all workspaces
```
