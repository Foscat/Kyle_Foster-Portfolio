# Kyle Foster Portfolio Application

Production-oriented React portfolio codebase focused on maintainable architecture, accessible interaction patterns, and repeatable quality checks.

## Release Highlights (April 2026)

- Standardized interactive UI behavior around `interactive-surface-css` token contracts across navigation, buttons, renderer links, and utility controls.
- Refactored `Btn` interaction and link semantics to cleanly separate router navigation, external links, and download behavior.
- Added `resumePreview` support in `LinksBlock` through `ResumePreviewTrigger`, including theme/palette-aware file names (for example `Kyle-Foster-Resume-light-forest.pdf`).
- Updated homepage and side-project content to feature Interactive Surface CSS, including direct links for source, package, and docs.
- Regenerated documentation artifacts and expanded tests covering updated link/button interaction paths.

## Project Goals

- Demonstrate production-grade React architecture and composition.
- Keep UI behavior declarative, reusable, and data-driven.
- Enforce accessibility and interaction consistency through shared primitives.
- Maintain predictable quality using linting, automated tests, and generated docs.

## High-Level Architecture

The application is organized around declarative page definitions, composable block renderers, and shared navigation/section-registry contracts.

- [Architecture Overview](architecture_overview.md)
- [Architecture Diagram](docs/assets/portfolio-flow.png)

## Quick Start

Prerequisites:

- Node.js `>=20.19.0 <21` or `>=22.12.0 <23`
- npm `>=10 <11`

Install and run:

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

Diagrams:

```sh
npm run diagrams:check
npm run diagrams:assets
npm run diagrams:test
```

Documentation:

```sh
npm run docs:build
npm run docs:components
npm run docs:navigation
npm run docs:types
npm run docs:test-helpers
npm run docs:scripts
npm run docs:playwright
npm run docs:api
npm run docs:jsdoc:audit
```

## Documentation Index

- [Components](docs/components.md)
- [Navigation](docs/navigation.md)
- [Scripts and Tooling](docs/scripts.md)
- [Testing](docs/tests.md)
- [Types and UI Contracts](docs/types.md)
- [Playwright API Docs](docs/playwright.md)
- [Full API Reference](docs/api.md)
- [JSDoc Audit Output](docs/jsdoc-audit.md)

## Testing Philosophy

- Prioritize user-observable behavior over implementation details.
- Treat navigation and rendering contracts as invariants.
- Use unit tests for component logic and integrations.
- Use Playwright for end-to-end and UI confidence checks.

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
