# Kyle Foster Portfolio Application

This repository contains the source code, tooling, and generated documentation for a React-based portfolio system focused on clean architecture, predictable composition, accessibility, and testing discipline.

## Latest Updates

- Mermaid diagrams now support a refined full-screen viewer that is truly edge-to-edge (no boxed "traditional modal" framing) with corrected theme/color rendering in full-screen mode.
- Diagram action controls were redesigned into a more compact, cleaner action row.
- `ClickableImg` now attempts mobile landscape lock for wide images and shows a clear fallback hint when auto-rotate is unavailable.
- Unit test coverage was expanded for:
  - Diagram full-screen interaction behavior.
  - Mobile orientation lock success and failure fallback for images.

## Project Goals

- Demonstrate production-quality React architecture.
- Keep UI behavior data-driven and composable.
- Maintain strong code quality through linting and automated tests.
- Keep onboarding clear through generated docs and subsystem guides.

## High-Level Architecture

The app is built around declarative pages, data-driven sections, and composable block renderers coordinated by a shared navigation and section-registry layer.

Start with:

- [Architecture Overview](architecture_overview.md)
- [Architecture Diagram](public/portfolio_flow.png)

## Documentation Index

- [Components](docs/components.md)
- [Navigation](docs/navigation.md)
- [Scripts and Tooling](docs/scripts.md)
- [Testing](docs/tests.md)
- [Types and UI Contracts](docs/types.md)
- [Playwright API Docs](docs/playwright.md)
- [Full API Reference](docs/api.md)
- [JSDoc Audit Output](docs/jsdoc-audit.md)

## Core Scripts

Development:

```sh
npm run dev
npm run build
npm run preview
```

Quality and tests:

```sh
npm run lint
npm run test
npm run quality:check
```

Diagrams:

```sh
npm run diagrams:check
npm run diagrams:assets
npm run diagrams:test
```

Docs:

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

## Testing Philosophy

- Test behavior over implementation details.
- Treat navigation and rendering contracts as invariants.
- Use unit tests for logic and component interactions.
- Use Playwright for end-to-end and visual confidence where appropriate.

## Technology Stack

- React 18
- Vite
- RSuite
- Font Awesome
- Mermaid
- Vitest + Testing Library
- Playwright
- ESLint + Stylelint + Prettier

## Notes

This codebase is intentionally opinionated. It favors maintainability, explicit contracts, and consistent tooling over ad-hoc shortcuts.
