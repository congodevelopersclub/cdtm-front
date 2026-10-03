# CDC Marketplace Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Turborepo monorepo for the [Congo Developers Club](https://github.com/congodevelopersclub) marketing site and authenticated marketplace application.

Built with Next.js, Feature-Sliced Design (FSD), and a shared shadcn/ui design system.

## Apps

| App | Port | Purpose |
|-----|------|---------|
| `apps/web` | 3000 | Marketing / public site |
| `apps/marketplace` | 3001 | Authenticated product app (listings, dashboard, checkout) |

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript (strict)
- **Monorepo:** Turborepo, pnpm workspaces
- **Architecture:** Feature-Sliced Design
- **State:** TanStack Query (server state), Zustand (UI state)
- **API:** Axios via `@workspace/api`, JWT auth (marketplace)
- **Forms:** React Hook Form, Zod
- **i18n:** next-intl (English and French; auto-detected from browser language)
- **Documentation:** Storybook 10 (design system + app components)
- **UI:** shadcn/ui, Tailwind CSS v4, Radix UI

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) 10.x

## Getting started

```bash
git clone git@github.com:congodevelopersclub/cdtm-front.git
cd cdtm-front
pnpm install
pnpm dev
```

Open:

- Web: [http://localhost:3000](http://localhost:3000)
- Marketplace: [http://localhost:3001](http://localhost:3001)

The UI is bilingual (English / French). On first visit, the locale is chosen from your browser's `Accept-Language` header. Use the language switcher on the home page to override and persist your choice in a cookie.

## Environment variables

Create `.env.local` in each app as needed. Variables are validated with Zod at runtime.

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api` | Backend REST API base URL |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` (web) / `3001` (marketplace) | Public app URL |

Example for `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Scripts

Run from the repository root:

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all workspaces (must pass with zero errors) |
| `pnpm typecheck` | Type-check all workspaces |
| `pnpm storybook` | Start Storybook component workshop (port 6006) |
| `pnpm build-storybook` | Build static Storybook catalog |
| `pnpm format` | Format code with Prettier |

## Project structure

```text
cdc-markeplace-frontend/
├── apps/
│   ├── web/              # Marketing site
│   ├── marketplace/      # Authenticated marketplace app
│   └── storybook/        # Component documentation workshop
├── packages/
│   ├── ui/               # shadcn/ui design system
│   ├── api/              # Axios client, interceptors, error types
│   ├── i18n/             # Locale config and resolution
│   ├── eslint-config/    # Shared ESLint configs (incl. FSD rules)
│   └── typescript-config/
├── LICENSE
├── CONTRIBUTING.md
└── turbo.json
```

Each app follows Feature-Sliced Design under `src/`:

```text
src/
├── processes/   # Multi-page workflows (marketplace only)
├── views/       # Page compositions (import as @/pages/*)
├── widgets/     # Large reusable UI compositions
├── features/    # Business capabilities / user actions
├── entities/    # Business objects
└── shared/      # Infrastructure (providers, config, store, api)
```

Next.js routes in `app/` are thin delegates — business logic lives in `src/`.

## Architecture

This project uses **Feature-Sliced Design** with strict layer boundaries enforced by ESLint. Dependencies always point downward:

```text
processes → pages → widgets → features → entities → shared
```

For full development rules, architecture guidelines, and the pull request checklist, see [CONTRIBUTING.md](CONTRIBUTING.md).

Browse the component catalog locally with `pnpm storybook` — it documents the shared design system (`packages/ui`) and composed UI from both apps.

## Adding shadcn components

Components install into the shared UI package:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Import in apps:

```tsx
import { Button } from "@workspace/ui/components/button"
```

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for full rules and architecture guidelines.

**Fork (recommended)** — fork the repo on GitHub, clone your fork, add `upstream`, branch, push, and open a PR.

**Direct branch (alternative)** — clone the upstream repo if you have write access, branch, push, and open a PR.

Before every PR: `pnpm lint`, `pnpm typecheck`, and `pnpm build` must pass.

## License

This project is licensed under the [MIT License](LICENSE).

Copyright (c) 2026 Congo Developers Club
