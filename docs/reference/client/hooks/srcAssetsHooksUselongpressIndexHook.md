# srcAssetsHooksUselongpressIndexHook

- Source: `src/assets/hooks/useLongPress/index.js`

# srcAssetsHooksUselongpressIndexHook

## assets/hooks/useLongPress

Custom React hook for detecting long-press interactions on an element. It provides a simple API to execute a callback function when a long-press is detected, with support for both mouse and touch events. The hook allows for a configurable threshold duration to define what constitutes a long-press.
This hook is useful for implementing features like context menus, drag-and-drop, or any interaction that requires a sustained press on an element.

Capabilities:
- Detects long-press interactions for both mouse and touch events
- Configurable threshold duration for long-press detection
- Provides a simple API for integrating long-press functionality into any component
Usage:
const longPressHandlers = useLongPress(() => {
  // Handle long-press action here
}, 700);

### useLongPress()

Custom React hook that detects long-press interactions on an element. It accepts a callback function to be executed when a long-press is detected, and an optional threshold duration (defaulting to 500 milliseconds) that defines how long the press must be held before the callback is triggered. The hook returns event handlers that can be attached to any element to enable long-press detection for both mouse and touch interactions.

**Parameters**

- `callback` (`function`) - The function to be executed when a long-press is detected.
- `threshold` (`number`) - The duration (in milliseconds) that defines a long-press. Defaults to 500ms.

**Returns**

- `Object` - Event handlers for long-press detection. Capabilities: - Detects long-press interactions for both mouse and touch events - Configurable threshold duration for long-press detection - Provides a simple API for integrating long-press functionality into any component Usage: const longPressHandlers = useLongPress(() => {   // Handle long-press action here }, 700);
