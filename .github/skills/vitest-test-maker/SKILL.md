---
name: vitest-test-maker
description: "Use when prompts ask to add, write, fix, debug, or refactor unit tests in Vitest/Testing Library; also when asked to mock APIs, test async behavior, stabilize flaky assertions, increase coverage, or diagnose test failures. Trigger phrases include: test is failing, why is this test red, and help me cover this component."
argument-hint: "Share the component/module and the behavior you want covered."
---

# Vitest Test Maker

## When To Use

- Add tests for new React component behavior.
- Fix failing Vitest or Testing Library tests.
- Improve test reliability by reducing brittle assertions.

## Prompt Examples

- "This test is failing, can you debug it and fix assertions?"
- "Help me cover this component with Vitest and Testing Library."
- "Refactor these unit tests and stabilize flaky async checks."

## Procedure

1. Identify behavior contracts from component props and user flows.
2. Prefer user-visible assertions over implementation details.
3. Add minimal mocks for network, timers, and browser APIs.
4. Cover success, failure, and edge paths.
5. Run targeted tests, then run the full suite when complete.

## Project Commands

- `npm run test`
- `npx vitest run src/tests/<file>.test.jsx`

## Guardrails

- Avoid snapshot-only coverage for interactive behavior.
- Avoid asserting internal state or private implementation details.
- Keep test names behavior-focused and explicit.
