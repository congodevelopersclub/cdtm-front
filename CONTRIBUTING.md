# Contributing to CDC Marketplace Frontend

Thank you for your interest in contributing. This project is open source under the [MIT License](LICENSE) and maintained by the [Congo Developers Club](https://github.com/congodevelopersclub).

- **Repository:** [congodevelopersclub/cdtm-front](https://github.com/congodevelopersclub/cdtm-front)
- **Issues:** [GitHub Issues](https://github.com/congodevelopersclub/cdtm-front/issues)
- **Pull requests:** [GitHub Pull Requests](https://github.com/congodevelopersclub/cdtm-front/pulls)

## Development setup

### Prerequisites

- Node.js >= 20
- pnpm 10.x

### Install and run

```bash
git clone git@github.com:congodevelopersclub/cdtm-front.git
cd cdtm-front
pnpm install
pnpm dev
```

| App | URL |
|-----|-----|
| Web (marketing) | http://localhost:3000 |
| Marketplace | http://localhost:3001 |

### Environment variables

Create `.env.local` inside the app you are working on. Never commit secrets or `.env` files.

```env
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

```env
# apps/marketplace/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## Development workflow

1. Fork the repository on GitHub
2. Clone your fork and create a branch from `main`
3. Implement your changes following the architecture rules below
4. Run the verification commands
5. Push your branch and open a pull request

### Branch naming

Use descriptive prefixes:

- `feat/` — new features
- `fix/` — bug fixes
- `docs/` — documentation only
- `refactor/` — code changes without behavior change

Examples: `feat/newsletter-signup`, `fix/login-redirect`, `docs/contributing-guide`

### Commit messages

Write clear, imperative commit messages:

```
Add newsletter signup form to home page

Fix JWT redirect loop on marketplace login

Update contributing guide with FSD rules
```

### Verification (required before every PR)

All commands must pass with **zero errors**:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Optionally format code:

```bash
pnpm format
```

## Pull request checklist

Before requesting review, confirm:

- [ ] `pnpm lint`, `pnpm typecheck`, and `pnpm build` all pass
- [ ] Changes follow Feature-Sliced Design architecture
- [ ] New slices export through `index.ts` (public API)
- [ ] No cross-slice imports (e.g. one feature importing another)
- [ ] No Axios or HTTP client imports in `components/` or `hooks/`
- [ ] No Zustand usage outside `src/shared/store/`
- [ ] PR has a descriptive title and summary of what changed and why

## Architecture rules

This monorepo uses **Feature-Sliced Design (FSD)**. Read these rules before adding or moving code.

### Monorepo layout

| Path | Purpose |
|------|---------|
| `apps/web` | Marketing / public site |
| `apps/marketplace` | Authenticated product app |
| `packages/ui` | shadcn/ui design system |
| `packages/api` | Axios client factory, interceptors, error types |
| `packages/eslint-config` | Shared ESLint configs including FSD boundary rules |
| `packages/typescript-config` | Shared TypeScript configs |

Business logic (entities, features, widgets, views) stays **per-app** in each app's `src/`. Do not create shared business packages unless a slice is genuinely reused by both apps.

### FSD layers

Each app follows this structure under `src/`:

```text
src/
├── processes/   # Multi-page workflows (marketplace only)
├── views/       # Page compositions (import as @/pages/*)
├── widgets/     # Large reusable UI compositions
├── features/    # Business capabilities / user actions
├── entities/    # Business objects
└── shared/      # Reusable infrastructure (no business logic)
```

**Important:** Next.js treats any `pages/` directory as the Pages Router. Page compositions live in `src/views/` and are imported via the `@/pages/*` alias.

Next.js routes in `app/` must be **thin delegates only**:

```tsx
// app/dashboard/page.tsx
export { DashboardPage as default } from "@/pages/dashboard"
```

### Dependency rule

Dependencies always point **downward**. Never import from an upper layer.

```text
processes → pages → widgets → features → entities → shared
```

Forbidden examples:

- `shared` importing from `features`
- `entities` importing from `widgets`
- `features` importing from `pages`

ESLint enforces layer direction via `@workspace/eslint-config/fsd-lint`.

### Cross-slice isolation

Slices in the same layer cannot import each other:

- `features/login` cannot import `features/create-listing`
- `entities/user` cannot import `entities/product`
- `widgets/sidebar` cannot import `widgets/navbar`

Share code through lower layers (`entities/`, `shared/`) instead.

### Public API

Always import slices through their `index.ts` barrel:

```ts
// Correct
import { LoginForm } from "@/features/login"

// Blocked by ESLint
import { LoginForm } from "@/features/login/components/login-form"
```

Every new slice must export its public surface through `index.ts`.

### Import order

Imports are ordered: external packages, then FSD layers (features → entities → shared).

Within the same slice, relative imports are allowed (e.g. `../api/login.api`).

### State management

| Tool | Use for | Never use for |
|------|---------|---------------|
| TanStack Query | Server state (API data, mutations, cache) | UI-only state |
| Zustand | UI state in `src/shared/store/` (sidebar, modals, table prefs) | API responses, auth data, server lists |

### API layer

- HTTP is abstracted in `@workspace/api`
- Each app creates a client in `src/shared/axios/client.ts`
- Endpoint modules live in `src/shared/api/` or in entity/feature `api/` folders
- **Never** import Axios directly in components or hooks

### Architecture bans (ESLint enforced)

- Axios / HTTP client — only in `api/` modules
- Zustand — only in `src/shared/store/`

## Adding a new feature

1. **Pick the layer** — Is it a user action (feature), business object (entity), composite UI (widget), or page composition (view)?
2. **Create the slice** — kebab-case folder with `index.ts` public API
3. **Add internals** — `api/`, `hooks/`, `components/`, `validation.ts` as needed
4. **Compose upward** — wire into widget or view; add a thin route in `app/`
5. **Verify** — run `pnpm lint`, `pnpm typecheck`, `pnpm build`

### Reference slices

Copy these patterns when adding new functionality:

| App | Slice | Pattern |
|-----|-------|---------|
| Web | `apps/web/src/features/newsletter-signup` | Server Action + Zod + toast |
| Marketplace | `apps/marketplace/src/features/login` | TanStack mutation + JWT + middleware |

### Feature folder example

```text
features/create-listing/
├── api/create-listing.api.ts
├── components/create-listing-form.tsx
├── hooks/use-create-listing.ts
├── validation.ts
└── index.ts
```

## Adding shadcn components

Install into the shared UI package:

```bash
pnpm dlx shadcn@latest add <component> -c apps/web
```

Components are placed in `packages/ui/src/components/`. Import them in apps:

```tsx
import { Button } from "@workspace/ui/components/button"
```

## Code style

- **TypeScript** — strict mode; prefer `type` over `interface`
- **Imports** — use `import type` for type-only imports
- **Formatting** — Prettier via `pnpm format`
- **Linting** — ESLint enforces FSD boundaries; all violations are errors
- **Naming** — kebab-case folders, PascalCase components, camelCase hooks with `use` prefix
- **Comments** — only for non-obvious business logic; code should be self-documenting

## Decision checklist

Before creating a file, folder, hook, or component, ask:

1. Does this belong in `packages/` (shared infra) or app `src/shared/`?
2. Is it a business object → `entities/{name}/`?
3. Is it a user action → `features/{action-name}/`?
4. Is it composite UI → `widgets/{name}/`?
5. Is it page composition → `views/{name}/` (exported as `@/pages/{name}`)?
6. Is it a multi-page flow → `processes/{name}/` (marketplace only)?
7. Is it a Next.js route → `app/` one-liner delegate only?

Choose the simplest architecture that remains scalable.

## Getting help

- Open a [GitHub issue](https://github.com/congodevelopersclub/cdtm-front/issues) for bugs, questions, or feature proposals
- Reference the relevant app, route, or slice in your issue description
- Tag maintainers on pull requests when ready for review

Thank you for contributing.
