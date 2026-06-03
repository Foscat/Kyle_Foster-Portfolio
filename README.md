# Kyle Foster Portfolio Application

Production-focused React portfolio application built around section-driven content, reusable rendering primitives, accessibility-aware UI behavior, and repeatable engineering processes.

## Live Site

- Live Version: [https://kyle-foster.com](https://kyle-foster.com)
- Docs route: [https://kyle-foster.com/docs](https://kyle-foster.com/docs)
- Health route: [https://kyle-foster.com/health](https://kyle-foster.com/health)

## Current State (May 2026)

- Contact content modules were consolidated: `src/assets/data/content/contact/alt.js` was removed and merged into `src/assets/data/content/contact/index.js` while preserving the `contactAltSections` alias export for compatibility.
- `/contact` route handling remains explicit in `src/App.jsx`, and route-level regression coverage was added in `src/App.test.jsx`.
- `src/pages/ContactAlt/index.jsx` now centralizes contact endpoint resolution and payload normalization utilities for the contact service contract (`VITE_CONTACT_API_URL` aware).
- Contact page layout and navigation visuals were refined (`src/pages/ContactAlt/styles.css`, `src/components/navigation/StickyNav/styles.css`).
- Component docs were regenerated (`docs/components.md`) to reflect current exported APIs.

## Project Goals

- Demonstrate production-grade React architecture and composition patterns.
- Keep page behavior declarative, reusable, and data-driven.
- Enforce interaction and accessibility consistency through shared primitives.
- Maintain predictable quality via linting, unit/E2E testing, diagram checks, and generated documentation.

## Architecture Overview

The app is organized around declarative page content modules and shared renderers/navigation systems.

- Page content data lives under `src/assets/data/content/**`.
- Reusable rendering and layout primitives live under `src/components/**`.
- Route composition is centralized in `src/App.jsx`.
- Generated technical docs are built into `docs/**`.

Reference docs:

- Core systems: [Components](docs/components.md), [Navigation](docs/navigation.md), [Types](docs/types.md)
- Tooling: [Scripts](docs/scripts.md), [Playwright](docs/playwright.md), [Tests](docs/tests.md)
- API and audits: [Full API Reference](docs/api.md), [JSDoc Audit](docs/jsdoc-audit.md)
- Developer guides: [Diagram Guidelines](dev-guides/Diagram-Guidelines.md), [RichText Author Guidelines](dev-guides/RichText-Author-Guidelines.md), [Scripts Tooling Overview](dev-guides/Scripts-Tooling-Overview.md), [Testing Guidelines](dev-guides/Testing-Guidelines.md)

## Routes

- `/` - Home
- `/codestream` - CodeStream case study
- `/side-projects` - Side projects overview
- `/hackathon` - Hackathon projects overview
- `/smu` - Southern Methodist University case study
- `/contact` - Contact information
- `/docs` - Generated technical documentation
- `/health` - Runtime diagnostics panel (UI route)
- `/**` - Not Found

## Environment Configuration

The app runs without custom `.env` values, but these variables are supported:

- `VITE_SITE_URL`: Canonical origin used for metadata/canonical URLs.
- `VITE_CONTACT_API_URL`: Contact service base URL or full `/api/contact` endpoint.
- `VITE_WEB_VITALS_ENDPOINT`: Production endpoint for metrics ingestion.
- `VITE_LOG_WEB_VITALS`: Set to `"true"` to log web vitals in development.
- `VITE_RESPONSIVE_TOKENS_THEME`: Responsive token theme selector.

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
npm run quality:route-tests
npm run test
npm run quality:bundle-budgets
npm run quality:check
```

CI-equivalent gate:

```sh
npm run ci:gate
```

## Script Reference

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
npm run test-ui:dev-smoke
npm run test-ui:a11y
npm run test-ui:route-budgets
npm run quality:route-tests
npm run quality:bundle-budgets
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
npm run docs:jsdoc:enforce
```

## Technology Stack

- [React 18](https://18.react.dev)
- [Vite 8](https://vitejs.dev)
- [RSuite 5](https://v5.rsuitejs.com)
- [Font Awesome](https://fontawesome.com)
- [Mermaid 11](https://mermaid-js.github.io/mermaid/#/)
- [Interactive Surface CSS](https://github.com/kylefoster/interactive-surface-css)
- [Vitest 4](https://vitest.dev) + [Testing Library](https://testing-library.com)
- [Playwright](https://playwright.dev)
- [ESLint](https://eslint.org/) + [Stylelint](https://stylelint.io/) + [Prettier](https://prettier.io/)
