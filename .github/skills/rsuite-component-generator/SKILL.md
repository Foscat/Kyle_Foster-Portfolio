---
name: rsuite-component-generator
description: "Use when prompts ask to add/build/create or refactor RSuite React UI components (forms, modals, layouts, nav, cards), including prop API design, accessibility fixes, composition cleanup, and alignment with existing project patterns. Trigger phrases include: build this RSuite component, make this modal/form, and clean up this component API."
argument-hint: "Describe the component purpose, props, and target page/feature."
---

# RSuite Component Generator

## When To Use

- Create new RSuite-based UI components.
- Refactor existing components for reuse and clearer props.
- Add accessible form, modal, or layout patterns.

## Prompt Examples

- "Build this RSuite component using existing project patterns."
- "Make this modal form accessible and clean up the props API."
- "Refactor this RSuite card layout for better composition."

## Procedure

1. Define a small, explicit props contract.
2. Compose from RSuite primitives before custom wrappers.
3. Ensure keyboard, focus, labeling, and semantic HTML behavior.
4. Keep state local unless shared state is required.
5. Add or update tests for interactive behavior.

## Project Checks

- `npm run lint`
- `npm run test`

## Guardrails

- Avoid monolithic components with mixed data-fetching and display concerns.
- Avoid introducing global state for single-component concerns.
- Keep APIs consistent with existing component naming and variant patterns.
