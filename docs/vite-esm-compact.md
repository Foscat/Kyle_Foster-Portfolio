# Vite ESM Compatibility Ledger

This project uses Vite with native ES modules. Some dependencies in the
React ecosystem still ship CommonJS or hybrid builds that break under
strict ESM execution.

## Normalized Dependencies

These packages are explicitly pre-bundled via `optimizeDeps.include`
to avoid runtime export mismatches:

- dayjs
- @braintree/sanitize-url

## Why This Exists

Errors such as:
> "does not provide an export named 'default'"

are caused by CJS → ESM boundary mismatches at runtime, not build time.

Vite’s dependency optimizer resolves these safely.

## Removal Criteria

A dependency may be removed from this list only when:
- It ships a native ESM build
- It works without runtime export errors
- Verified in both dev and production builds

## Last Updated
- React: 18.2.0
- Vite: current
