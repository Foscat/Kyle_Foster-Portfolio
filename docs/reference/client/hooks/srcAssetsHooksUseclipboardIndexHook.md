# srcAssetsHooksUseclipboardIndexHook

- Source: `src/assets/hooks/useClipboard/index.js`

# srcAssetsHooksUseclipboardIndexHook

## assets/hooks/useClipboard

React hook that provides a safe, asynchronous interface for copying text
to the system clipboard using the Web Clipboard API.

### copy

Attempts to copy the provided text to the clipboard.

**Parameters**

- `text` (`string`) - The text content to copy.

**Returns**

- `Promise<boolean>` - Resolves to `true` if the copy succeeds, otherwise `false`.

### useClipboard()

Custom React hook that provides clipboard copy functionality with success/error state management.
It exposes a `copy` function that attempts to write text to the clipboard and tracks whether the operation succeeded or failed.
The hook also allows for an optional automatic reset of the copied state after a specified delay.

Capabilities:
- Asynchronous clipboard writes
- Graceful handling of unsupported browsers
- Explicit success and error state tracking
- Optional automatic reset of the copied state

Design notes:
- Uses the modern `navigator.clipboard.writeText` API
- Does not attempt legacy fallbacks (e.g., `execCommand`)
- Returns a boolean to allow calling code to branch on success/failure

Typical use cases:
- “Copy to clipboard” buttons
- Shareable links or code snippets
- Developer tooling and utilities

**Parameters**

- `options` (`Object`, optional) - Optional configuration object.
- `options.resetDelay` (`number`, optional, default: `2000`) - Duration in milliseconds before the `copied` state automatically resets   to `false`. Set to `0` or a negative value to disable auto-reset.

**Returns**

- `Object` - Clipboard interaction helpers and state.
- `function` - returns.copy   Asynchronously copies the provided string to the clipboard.   Resolves to `true` on success and `false` on failure.
- `boolean` - returns.copied   Indicates whether the most recent copy operation succeeded.
- `Error | null` - returns.error   Error object if the last copy attempt failed, otherwise `null`.
