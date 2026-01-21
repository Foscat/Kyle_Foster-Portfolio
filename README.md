# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Tooling & Quality Philosophy

This project treats tooling as infrastructure, not decoration.

The goal is not to maximize strictness, but to maximize signal: tooling should catch real problems early, stay quiet when things are healthy, and scale as the codebase grows.

Core principles

1. Correctness over style

Rules that prevent runtime bugs or broken architecture are enforced as errors.
Stylistic concerns are warnings or handled by formatting tools.

Examples:

Missing React key props → error

Invalid JSDoc type expressions → error

Import ordering → warning

Console usage → allowed

2. Context-aware linting

Different parts of the codebase run in different environments, so linting is scoped accordingly:

```htnl
Area	Environment	Philosophy
src/	Browser / React	Strict correctness, light style
src/types/	Architecture	Docs + type safety enforced
src/test/	jsdom / Vitest	Test globals allowed
Tooling configs	Node / ESM	Flexible, no browser assumptions
Codemods / scripts	Node (CJS)	Maximum freedom
```

This avoids false positives while still enforcing meaningful guarantees.

3.  - JSDoc as a first-class system

    - JSDoc is not used as comments—it is used as a type system and documentation source.

    - Shared UI contracts live in src/types/ui.types.js

    - Components reference global typedefs instead of redefining types

    - Docs are generated automatically from source

    - Invalid JSDoc syntax fails CI

    - This keeps documentation, types, and implementation aligned.

4.  - Mechanical cleanup is automated

    - Repetitive fixes are handled by codemods and safe autofix scripts:

    - Missing React key props

    - Unused map indexes

    - Invalid JSDoc import types

    - Safe unused imports

    - Developers don’t fight the linter—the tooling fixes what it safely can.

5.  CI enforces guarantees, not opinions
    - Continuous Integration blocks:

    - Broken builds

    - Invalid lint states

    - Broken documentation generation

    - It does not block on subjective style choices.

    - If CI fails, something real is broken.

## **Common commands**

### Development

npm run dev

### Mechanical cleanup (safe)

npm run lint:cleanup

### Verify docs + lint before PR

npm run docs:verify

### Full quality pass

npm run quality

This philosophy is intentional: the tooling exists to support development velocity while preserving long-term maintainability.
