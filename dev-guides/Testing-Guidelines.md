# Testing Rules

- All context-dependent components must use `renderWithProviders()`
- Tests assert behavior, not DOM structure
- RSuite internals are never tested
- Mermaid is tested only via Playwright
- Async effects require `waitFor`
- Accessibility queries are mandatory

## Gold-Standard Rules for Hook Tests

- ✅ Mock all browser APIs
- ✅ Wrap calls in `act()`
- ✅ Await async state changes
- ❌ Never inspect internals
- ❌ Never assert immediately after calling a function

## Browser API Mocking Patterns

### IntersectionObserver

Replace `globalThis.IntersectionObserver` with a test double for the duration of the test. Always restore the original in a `finally` block.

```js
const OriginalObserver = globalThis.IntersectionObserver;
globalThis.IntersectionObserver = MyTestObserver;
try {
  // render and assert
} finally {
  globalThis.IntersectionObserver = OriginalObserver;
}
```

To simulate unavailability (e.g. older environments), `delete globalThis.IntersectionObserver` before rendering and restore in `finally`.

### Fake Timers and Spies

When using `vi.useFakeTimers()` together with `vi.spyOn(window, "clearTimeout")` (or `setTimeout`), **call `vi.useFakeTimers()` first**. A spy set up before fake timers wraps the real implementation and will never observe calls made via the fake.

```js
vi.useFakeTimers();                              // ← must come first
const spy = vi.spyOn(window, "clearTimeout");   // ← wraps the fake
// ... render, act, unmount ...
vi.useRealTimers();
spy.mockRestore();
```

## Defensive Fallback Assertions

When a component renders a visible fallback label or warning, test both missing values and blank-string values. Whitespace-only strings should usually be treated as empty input, not as valid user-facing copy.

For example, `SectionRenderer`'s unknown-block warning now prefers:

- only `null` and `undefined` block entries are skipped during block-list normalization; malformed falsy values like `false`, `0`, or `""` should continue through defensive fallback rendering
- a normalized raw block value when the block itself is malformed and not an object/function (trimmed string, finite number, `bigint`, symbol with a non-empty description, or boolean)
- a normalized `title` when present (trimmed string, finite number, `bigint`, symbol with a non-empty description, or boolean)
- otherwise a normalized block `type` (trimmed string, finite number, `bigint`, symbol with a non-empty description, or boolean)
- otherwise a generic fallback label

If malformed block objects use throwing property getters (for example on `type`, `title`, or `id`), treat those reads as missing values and assert that rendering still falls back safely to a visible unknown-block warning instead of crashing.

Apply the same expectation when a block factory or dispatch render path throws at runtime: `SectionRenderer` should degrade to the same visible fallback alert for that block instead of letting the section render crash.

At the section level, apply similar resilience expectations for malformed section objects with throwing getters (for example `id` or `blocks`): registration should be skipped safely when `id` cannot be read, and block rendering should degrade safely (for example to an empty block list) when `blocks` cannot be read.

Also assert lifecycle resilience when section registry callbacks throw: if `registerSection` fails during mount or `unregisterSection` fails during unmount, `SectionRenderer` should remain stable instead of crashing render or teardown.

When the section registry hook returns `null`/`undefined` or non-function callback fields, treat lifecycle callbacks as safe no-ops and assert that section rendering remains stable.

For malformed block arrays, assert resilient normalization behavior when array detection (`Array.isArray`), `length` access, or individual index access throws: unreadable entries should be skipped, and remaining readable entries should still render when readable entries exist. Also treat non-finite or non-positive `length` values as an empty block list, and cap oversized lengths to the current normalization safety limit (`MAX_SECTION_BLOCK_COUNT`, presently `2000`).

When that warning needs to be announced to assistive technology, assert both the visible message and its accessibility contract. `SectionRenderer` now exposes the warning with `role="alert"`, so tests should prefer `getByRole("alert")` alongside the text assertion.

Apply the same rule to loading placeholders. By default, deferred placeholders render with `role="status"`; when `loadingLive` is `"off"`, they intentionally omit `role="status"` while preserving `aria-live="off"`. `SectionRenderer`'s deferred diagram placeholder exposes `aria-busy="true"`, `aria-atomic="true"` in live-region modes, a configurable `aria-live` mode (`"polite"` by default, with `"assertive"` and `"off"` supported), and an `aria-describedby` value (live-region modes only) that links each placeholder to its loading caption (`Loading diagram preview...`). The status label (`aria-label`) is applied only in live-region modes and omitted when `loadingLive` is `"off"`; decorative shimmer-only elements are marked `aria-hidden="true"`. Tests should verify the live-region contract for the selected mode, busy state, mode-specific atomic, labeling, and described-by behavior, caption linkage, visible loading text, and that decorative skeleton elements stay hidden from assistive technology.

Treat non-string `loadingLive` values as invalid input and assert that deferred placeholders fall back to `aria-live="polite"`.

For malformed `deferDiagrams` configs with throwing property getters (for example `loadingLabel`, `loadingCaption`, or `loadingLive`), assert that rendering remains stable and placeholder behavior falls back to defaults instead of crashing.

Tests should assert the user-visible message for each fallback tier, including whitespace-only values and non-string scalar values (for example numeric IDs, `bigint` identifiers, symbol tags with non-empty descriptions, or boolean flags), whether those values come from malformed raw block entries or normalized block fields (`title` / `type`), instead of inspecting internal branching.

When exercising key-safety edge cases, include at least one known block rendered with a symbol-valued `id` (including symbols with blank or whitespace-only descriptions) and assert that rendering still succeeds. This protects against accidental key-coercion regressions in render paths that should tolerate unusual metadata.
