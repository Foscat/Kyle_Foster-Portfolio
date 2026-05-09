# Kyle Foster Portfolio Application

Production-focused React portfolio codebase centered on maintainable architecture, accessible interaction patterns, and repeatable quality workflows.

## Live Site

- https://kyle-foster.com
- Docs route: https://kyle-foster.com/docs
- Health route: https://kyle-foster.com/health

## Release Highlights (May 2026)

- Added deploy-safe chunk load recovery in `src/assets/chunkLoadRecovery.js` with tests in `src/assets/chunkLoadRecovery.test.js` to recover stale hashed asset failures without reload loops.
- Updated favicon management in `src/assets/favicon.js` to support theme plus palette variants, cache-busted favicon URLs, and pruning of competing `rel="icon"` tags.
- Expanded docs aggregation in `src/assets/data/content/portfolioDocs.js` so `/docs` can render both generated API docs and hand-authored developer guides.
- Continued standardizing interactive behavior through `interactive-surface-css` and shared renderer/navigation contracts.

## Project Goals

- Demonstrate production-grade React architecture and composition.
- Keep UI behavior declarative, reusable, and data-driven.
- Enforce accessibility and interaction consistency through shared primitives.
- Maintain predictable quality using linting, automated tests, diagram checks, and generated docs.

## Architecture

The application is organized around declarative page definitions, composable section and block renderers, and shared navigation contracts.

- Core systems docs: [Components](docs/components.md), [Navigation](docs/navigation.md), [Types](docs/types.md)
- Tooling docs: [Scripts](docs/scripts.md), [Playwright](docs/playwright.md), [Tests](docs/tests.md)
- Generated API docs: [Full API Reference](docs/api.md), [JSDoc Audit](docs/jsdoc-audit.md)
- Developer guides: [Diagram Guidelines](dev-guides/Diagram-Guidelines.md), [RichText Author Guidelines](dev-guides/RichText-Author-Guidelines.md), [Scripts Tooling Overview](dev-guides/Scripts-Tooling-Overview.md), [Testing Guidelines](dev-guides/Testing-Guidelines.md)

## Routes

- `/` Home
- `/codestream`
- `/side-projects`
- `/hackathon`
- `/smu`
- `/contact`
- `/docs`
- `/health`
- `*` Not Found

## Quick Start

Prerequisites:

- Node.js `>=20.19.0 <21` or `>=22.12.0 <23`
- npm `>=10 <11`

Install dependencies and run locally:

```sh
npm install
npm run dev
```

Build and preview:

```sh
npm run build
npm run preview
```

## Quality Workflow

Primary checks:

```sh
npm run lint
npm run test
npm run quality:check
```

CI gate equivalent:

```sh
npm run ci:gate
```

## Core Script Groups

Development:

```sh
npm run dev
npm run start
npm run build
npm run preview
```

Linting and tests:

```sh
npm run lint
npm run lint:all
npm run test
npm run test-functions
npm run test-ui
```

Diagrams:

```sh
npm run diagrams:check
npm run diagrams:assets
npm run diagrams:test
npm run diagrams:run-all
```

Documentation:

```sh
npm run docs:build
npm run docs:verify
npm run docs:api
npm run docs:jsdoc:audit
```

## Technology Stack

- React 18
- Vite
- RSuite
- Font Awesome
- Mermaid
- `interactive-surface-css`
- Vitest + Testing Library
- Playwright
- ESLint + Stylelint + Prettier
