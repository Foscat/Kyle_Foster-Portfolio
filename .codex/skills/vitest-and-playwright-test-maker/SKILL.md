---
name: vitest-and-playwright-test-maker
description: Create, update, and debug unit/integration tests with Vitest and end-to-end tests with Playwright for JavaScript/TypeScript web apps. Use when requests involve generating missing tests, improving flaky tests, adding coverage for regressions, or aligning test suites with new frontend features.
---

# Vitest and Playwright Test Maker

## Overview
Design fast, reliable test coverage across component logic and browser behavior, while minimizing brittle selectors and over-mocked assertions.

## Workflow Decision
- Use **Vitest** for pure logic, hooks, utilities, and component behavior with controlled mocks.
- Use **Playwright** for navigation, auth flow, form submission, visual state changes, and real browser interactions.
- If a bug crosses both layers, add a Vitest regression test first, then a Playwright user-flow test.

## Test Authoring Process
1. Identify the user behavior or regression to protect.
2. Locate existing test conventions (`describe` structure, fixtures, helpers, naming).
3. Write the smallest failing test that reproduces the issue.
4. Add stable selectors (role/text/test-id) and deterministic waits.
5. Keep assertions behavior-focused, not implementation-focused.
6. Run only targeted tests first, then broader suites if needed.

## Reliability Rules
- Prefer `getByRole`/`getByLabel` selectors in Playwright.
- Avoid arbitrary sleeps; wait for state or network conditions.
- In Vitest, mock only external boundaries (network/time/random).
- Keep test data near the test unless shared fixtures improve clarity.

## Output Expectations
Return:
1. Test file diff(s).
2. Any fixture/helper updates.
3. Commands to run targeted Vitest/Playwright tests.
4. Notes on flake prevention and follow-up coverage opportunities.

## References
- Follow reusable testing patterns and anti-pattern checks when creating or updating tests.
