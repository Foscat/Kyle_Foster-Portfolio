# Test Patterns

## Vitest
- Arrange/Act/Assert with clear sections.
- Prefer behavior assertions over snapshot-only checks.
- Cover edge cases: empty input, API error, stale cache, permission denied.

## Playwright
- Use `test.step` for long journeys.
- Reset state between tests with fixtures.
- Add assertions for both success and failure paths.

## Anti-Patterns
- Hard-coded time delays.
- Overly broad CSS selectors.
- Tests that depend on execution order.
