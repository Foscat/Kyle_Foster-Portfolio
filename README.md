# Kyle Foster Portfolio

A production-oriented React portfolio application built with Vite.  
The codebase is structured around data-driven page sections, reusable rendering blocks, strong testing, and generated technical documentation.

## Overview

This repository contains:

- A multi-page portfolio SPA with route-level code splitting.
- Declarative page content modeled in `src/assets/data/content`.
- Shared section/block rendering infrastructure for consistent composition.
- Diagram tooling and snapshots for architecture/flow communication.
- Automated linting, unit tests, Playwright coverage, and docs generation.

## Route Map

Current application routes:

- `/` - Home
- `/codestream` - Professional work case study
- `/side-projects` - Side projects
- `/hackathon` - Hackathon case study
- `/smu` - Education history
- `/contact` - Contact page
- `/docs` - In-app technical docs page
- `/health` - Health/status page
- `*` - Not found

## Architecture Summary

High-level flow:

1. `src/App.jsx` defines route composition and lazy-loaded page boundaries.
2. Page metadata is centralized in `src/assets/data/pageMetas.js`.
3. Section payloads live in `src/assets/data/content/*`.
4. `SectionRenderer` resolves block types (`RichText`, `CardGrid`, `Links`, `Diagram`, etc.) into UI components.
5. Navigation state and active section behavior are coordinated through section registry/context providers.

Architecture artifact:

- `public/portfolio_flow.png`

## Repository Structure

```text
src/
  assets/
    data/               # Page metadata + declarative content blocks
    context/            # Theme, error boundary, section registry, responsive context
    hooks/              # Shared React hooks
  components/
    layout/             # Structural wrappers (headers/sections)
    navigation/         # Global nav + section nav systems
    renderers/          # Section and block render orchestration
    ui/                 # Reusable UI building blocks
  pages/                # Route-level page modules
playwright/             # E2E and visual tests
scripts/                # Diagram, lint, and docs support scripts
docs/                   # Generated project documentation outputs
dev-guides/             # Authoring and process guides
```

## Runtime Requirements

From `package.json`:

- Node.js: `>=20.19.0 <21 || >=22.12.0 <23`
- npm: `>=10 <11`

## Setup

```sh
npm ci
```

## Local Development

```sh
npm run dev      # Vite dev server
npm run start    # Vite on PORT=3000
npm run build    # Production build -> dist/
npm run preview  # Preview production build
```

## Quality and Testing

### Core Quality Commands

```sh
npm run lint
npm run lint:all
npm run richtext:lint
npm run test
npm run quality:check
npm run ci:gate
```

### Diagram Pipeline

```sh
npm run diagrams:format
npm run diagrams:lint
npm run diagrams:check
npm run diagrams:assets
npm run diagrams:test
npm run diagrams:run-all
```

### Docs Pipeline

`docs:build` regenerates the `docs/` directory.

```sh
npm run docs:build
npm run docs:verify
npm run docs:diff
```

### Helpful Fix/Automation Commands

```sh
npm run quality:fix
npm run lint:cleanup
npm run richtext:fix
```

## Documentation Outputs

Generated docs are written to `docs/`:

- `docs/components.md`
- `docs/navigation.md`
- `docs/types.md`
- `docs/tests.md`
- `docs/scripts.md`
- `docs/playwright.md`
- `docs/api.md`
- `docs/jsdoc-audit.md`

## Deployment

`render.yaml` is configured for static deployment on Render:

- Build: `npm ci --include=dev --no-audit --no-fund && npm run build`
- Publish directory: `dist`
- Pull request previews: enabled
- SPA rewrite: all routes -> `index.html`

## Notes

- `interactive-surface-css` is imported at app level for shared interaction primitives.
- The docs and diagram workflows are first-class parts of the repository; expect `docs/` and related artifacts to change after regeneration commands.
