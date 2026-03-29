---
name: playwright-test-maker
description: "Use when prompts ask to create, update, fix, or debug Playwright specs; especially for diagram screenshots, snapshot diffs, navigation/contact flows, selector timing issues, retries, cross-browser checks, or flaky e2e failures. Trigger phrases include: screenshot mismatch, selector timeout, and snapshot keeps failing."
argument-hint: "Share the user flow or page and what is failing or missing."
---

# Playwright Test Maker

## When To Use

- Add or fix end-to-end flows.
- Debug flaky selectors, timing issues, or retries.
- Update visual snapshot coverage.

## Prompt Examples

- "I have a screenshot mismatch in Playwright snapshots."
- "This selector timeout keeps failing, can you stabilize it?"
- "Update this Playwright spec for the contact flow and retries."

## Procedure

1. Confirm flow intent and expected user-visible outcomes.
2. Use stable locators (role, label, test id) before CSS selectors.
3. Add resilient waiting based on visible state transitions.
4. Keep tests isolated and deterministic.
5. Validate with targeted spec runs, then broader diagram/e2e checks.

## Project Commands

- `npm run diagrams:test`
- `npx playwright test playwright/<spec>.spec.ts`

## Guardrails

- Avoid hard waits when an explicit condition is available.
- Avoid over-coupling tests to visual-only implementation details.
- Document known flake causes and mitigation in test comments when needed.
