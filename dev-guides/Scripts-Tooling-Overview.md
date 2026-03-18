# Scripts Tooling Overview

This directory contains **project tooling scripts** used to enforce formatting standards, validate invariants, generate documentation assets, and safely apply codemods across the codebase.

These scripts are **not part of the application runtime**. They exist to keep the repository consistent, maintainable, and CI-safe.

---

## Philosophy

The scripts in this directory follow a few strict principles:

- **Deterministic output** — repeated runs should produce the same result
- **Fail fast in CI** — errors should surface early and loudly
- **Separation of concerns** — formatting, linting, rendering, and mutation are isolated
- **Safety first** — codemods are conservative and explicitly documented

---

## Diagram Pipeline (End-to-End)

Mermaid diagrams move through a clearly defined pipeline. Each stage has a single responsibility.

```
normalize → format → lint → render → build assets
```

### 1. Normalize

**Script:** `normalize-diagrams.js`

- Accepts multiple diagram collection formats
- Produces a stable array shape
- Injects identifiers where needed
- Performs **no validation** and **no mutation**

This is the **contract boundary** for all downstream diagram tooling.

---

### 2. Format

**Scripts:**

- `format-mermaid.js` (pure formatter)
- `format-diagrams.js` (repository-level enforcement)

Responsibilities:

- Normalize whitespace and indentation
- Enforce Mermaid-safe structure
- Preserve semantic meaning

Important distinction:

> `format-mermaid.js` defines _how_ Mermaid should look.  
> `format-diagrams.js` defines _where and when_ formatting is applied.

---

### 3. Lint

**Script:** `lint-diagrams.js`

- Enforces structural Mermaid invariants
- Rejects invalid diagram declarations
- Prevents tabs and malformed init blocks
- Emits warnings for readability issues

Linting is a **hard gate**. Any failure blocks rendering and docs generation.

---

### 4. Render

**Script:** `render-diagram-pngs.js`

- Uses Playwright (Chromium) to render diagrams in a real browser
- Captures transparent PNG screenshots
- Ensures visual parity with production Mermaid rendering

This step introduces **filesystem side effects** and should fail CI if rendering breaks.

---

### 5. Build Assets

**Script:** `build-diagram-assets.js`

- Collects rendered diagram images
- Integrates them into the documentation output
- Ensures all referenced diagrams exist

---

## Codemods (High-Risk Tools)

Codemods mutate source code and should be run **manually and deliberately**.

### General Rules

Before running any codemod:

- Ensure the git working tree is clean
- Run one codemod at a time
- Review diffs carefully before committing

All codemods in this directory are designed to be:

- Conservative
- Idempotent where possible
- Focused on a single invariant

---

### `add-react-keys.js`

- Adds missing React `key` props in `.map()` JSX
- Prefers semantic identifiers (`item.id`)
- Falls back to index-based keys only when necessary

Does **not**:

- Override existing keys
- Modify non-map JSX

---

### `fix-jsdoc-import-types.js`

- Rewrites unsupported JSDoc `import()` type syntax
- Required for compatibility with `jsdoc-to-markdown`
- Operates on comments only (no runtime changes)

---

### `fix-unused-map-index.js`

- Renames unused `.map()` index parameters to `_index`
- Eliminates ESLint warnings without changing behavior

---

## CI vs Manual Scripts

| Script Type               | Intended Usage |
| ------------------------- | -------------- |
| Normalize / Format / Lint | CI + local     |
| Render PNGs               | CI + local     |
| Codemods                  | Manual only    |

Codemods should **never** run automatically in CI.

---

## Debugging & Diagnostics

Some scripts support optional debug output via environment flags.

Example:

```sh
DEBUG_DIAGRAMS=1 npm run diagrams:lint
```

This keeps CI output clean while preserving local debuggability.

---

## Safety Notes

- Diagram scripts assume Mermaid version compatibility
- Rendering relies on Playwright/Chromium being installed
- Codemods should always be reviewed via git diff

If a script fails unexpectedly, do not suppress the error — investigate the root cause.

---

## Final Note

These scripts encode **project standards**.

If you change a script:

- Update documentation
- Consider downstream impact
- Treat the change as architectural, not incidental

This discipline is what keeps the codebase predictable over time.
