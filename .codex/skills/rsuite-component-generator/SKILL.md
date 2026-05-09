---
name: rsuite-component-generator
description: Generate and refine React components built with RSuite in Vite/React codebases, including component scaffolds, form layouts, data tables, and accessibility-minded interactions. Use when a request asks for new RSuite UI, migration from plain HTML/CSS to RSuite components, or updates to RSuite-based pages while preserving existing app structure.
---

# RSuite Component Generator

## Overview

Create production-ready RSuite React components that match existing project conventions and keep styling, state management, and accessibility coherent.

## Workflow

1. Inspect existing UI patterns, routing, and component folder structure before generating code.
2. Choose RSuite primitives first (e.g., `Container`, `Grid`, `Form`, `Table`, `Modal`, `Drawer`, `Message`) before custom wrappers.
3. Build a minimal, typed/structured component scaffold with props, default state, and event handlers.
4. Add responsive layout and validation patterns consistent with the codebase.
5. Verify keyboard navigation, labels, aria attributes, and empty/loading/error states.
6. Provide a short integration note describing where to import and render the new component.

## Generation Rules

- Prefer composition over deeply nested single-file components.
- Keep business logic out of presentational components unless explicitly requested.
- Reuse existing utility functions and shared hooks when available.
- Add comments only for non-obvious logic.
- Avoid introducing new dependencies when RSuite or current dependencies already solve the need.

## Output Template

When asked to generate a component, return:

1. Component file contents.
2. Any companion style/module/test updates.
3. Import/update instructions for the parent route/page.
4. A quick manual QA checklist (focus, validation, responsiveness).

## References

- Use `references/component-patterns.md` for scaffold patterns and checklist items.
