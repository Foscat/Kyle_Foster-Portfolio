# Testing Rules

- All context-dependent components must use `renderWithProviders()`

- Tests assert behavior, not DOM structure

- RSuite internals are never tested

- Mermaid is tested only via Playwright

- Async effects require waitFor

- Accessibility queries are mandatory

## Gold-Standard Rules for Hook Tests

- ✅ Mock all browser APIs

- ✅ Wrap calls in act()

- ✅ Await async state changes

- ❌ Never inspect internals

- ❌ Never assert immediately after calling a function
