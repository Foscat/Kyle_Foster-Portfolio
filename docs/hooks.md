# Hooks

## assets/hooks/index

Barrel export for reusable hooks consumed across navigation, UI, and responsive flows.

## assets/hooks/useBreakpoint

React hook for responsive breakpoint detection using window.matchMedia.
Provides a simple API to determine if the user is on mobile, tablet, or desktop.
This hook listens for changes in viewport size and updates the breakpoint state accordingly.
It is designed to be used in any component that needs to adapt its layout or behavior
based on the current screen size.

Breakpoints:
- Mobile: max-width 768px
- Tablet: min-width 769px and max-width 1024px

### getBreakpoint()

Helper function that checks the current viewport width against defined breakpoints using media queries. It returns a string indicating the current breakpoint category: "mobile", "tablet", or "desktop". This function is used internally by the `useBreakpoint` hook to determine the initial breakpoint state and to update it when the viewport size changes.

**Returns**

- `string` - The current breakpoint: "mobile", "tablet", or "desktop" Note: This function is designed to be called in a browser environment where window.matchMedia is available. In server-side rendering contexts, it will default to "desktop" to avoid errors.

### getOrientation()

Helper function that checks the current viewport orientation using media queries.

**Returns**

- `string` - The current orientation: "portrait" or "landscape" Note: This function is designed to be called in a browser environment where window.matchMedia is available. In server-side rendering contexts, it will default to "landscape" to avoid errors. This is a common assumption since many desktop environments are landscape-oriented.

### useBreakpoint()

Custom React hook that provides responsive breakpoint and orientation information based on window.matchMedia.
It returns the current breakpoint and orientation, along with boolean flags for convenience.
The hook listens for changes in viewport size and orientation, updating the state accordingly.
It is designed to be used in any component that needs to adapt its layout or behavior based on the current screen size and orientation.

**Returns**

- `BreakpointState` - An object containing the current breakpoint and orientation, along with boolean flags for each. The hook listens for changes in viewport size and orientation, updating the state accordingly. It is designed to be used in any component that needs to adapt its layout or behavior based on the current screen size and orientation.

### useResponsiveValue()

Custom React hook that returns a value based on the current responsive breakpoint.
It accepts an object with optional values for mobile, tablet, and desktop breakpoints.
The hook uses the `useBreakpoint` hook to determine the current breakpoint and returns
the corresponding value, falling back to smaller breakpoints if a value is not provided.

**Parameters**

- `values` (`ResponsiveValues`)

**Returns**

- `any` - Responsive value for the current breakpoint.

### BreakpointState

- Type: `Object`

**Properties**

- `breakpoint` (`string`) - The current breakpoint ("mobile", "tablet", "desktop")
- `orientation` (`string`) - The current orientation ("portrait", "landscape")
- `isMobile` (`boolean`) - True if the current breakpoint is "mobile"
- `isTablet` (`boolean`) - True if the current breakpoint is "tablet"
- `isDesktop` (`boolean`) - True if the current breakpoint is "desktop"
- `isPortrait` (`boolean`) - True if the current orientation is "portrait"
- `isLandscape` (`boolean`) - True if the current orientation is "landscape"

### ResponsiveValues

- Type: `Object`

**Properties**

- `mobile` (`any`, optional) - Value returned when mobile breakpoint is active.
- `tablet` (`any`, optional) - Value returned when tablet breakpoint is active.
- `desktop` (`any`, optional) - Value returned when desktop breakpoint is active.

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

## assets/hooks/useCoarsePointer

React hook for detecting coarse pointer environments (touch-first devices).

### module.exports()

useCoarsePointer
---------------------------------------------------------------------------
Detects whether the current device primarily uses coarse pointer input
(touch-centric interaction).

**Returns**

- `boolean` - True when pointer input is coarse.

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

## assets/hooks/useScrollSpy

Hierarchical scroll-spy with URL history synchronization.

Responsibilities:
- Observes section + subsection elements using IntersectionObserver
- Tracks the currently active *leaf* node (deepest visible section)
- Derives the active parent chain from the leaf
- Syncs URL hash without page jumps
- Supports programmatic scrolling without feedback loops

Design principles:
- Scroll position is the single source of truth
- Navigation clicks cause scroll, not state writes
- Only the observer updates active state

This hook is safe to use with:
- Sticky desktop nav
- Mobile drawer nav
- Collapsible subsection dropdowns

### useScrollSpyWithHistory()

useScrollSpyWithHistory

**Parameters**

- `nodes` (`Array<SectionNode>`) - Flat list of observable nodes
- `byId` (`Map<string, SectionNode>`) - Lookup map for parent traversal
- `offset` (`number`) - Sticky header offset (px)

### buildSectionTree()

Utility function that transforms a nested section/block data structure into a flat list of observable nodes with parent references. This is used to set up the IntersectionObserver and to derive active chains for scroll-spy behavior.
The function takes an array of section objects, each potentially containing an array of block objects, and produces:
- A flat array of nodes, where each node represents either a section or a block and includes its ID, type, and parent ID.
- A lookup map that allows quick access to any node by its ID, which is essential for traversing the parent chain when determining active sections.

**Parameters**

- `sections` (`Array`)

**Returns**

- `Object` - SectionNode structure: {   id: string,        // Unique identifier (section ID or block ID)   type: 'section' | 'block', // Node type   parentId: string | null // Parent section ID (null for top-level sections) } Design notes: - The function is defensive and skips any sections or blocks that lack an ID. - The resulting flat structure simplifies the IntersectionObserver setup and active chain derivation. - The byId map allows for efficient parent lookups when building the active chain from the leaf node.

**Examples**

```js
```js
const { nodes, byId } = buildSectionTree([
 {
  id: "section1",
  blocks: [
     { id: "block1" },
     { id: "block2" }
  ]
 },
 {
   id: "section2",
   blocks: []
 }
]);
nodes = [
{ id: "section1", type: "section", parentId: null },
{ id: "block1", type: "block", parentId: "section1" },
{ id: "block2", type: "block", parentId: "section1" },
{ id: "section2", type: "section", parentId: null }
]
byId = Map {
"section1" => { id: "section1", type: "section", parentId: null },
"block1" => { id: "block1", type: "block", parentId: "section1" },
"block2" => { id: "block2", type: "block", parentId: "section1" },
"section2" => { id: "section2", type: "section", parentId: null }
}
```
```

### markProgrammaticScroll()

Marks a programmatic scroll window. Navigation clicks should call this BEFORE scrolling.

## assets/hooks/useThemeFavicon

React hook that synchronizes the document favicon with the active theme mode and palette.

### useThemeFavicon()

Keeps the favicon in sync with the current theme mode and palette.

**Parameters**

- `themeMode` (`"light" | "dark" | "auto" | "contrast"`)
- `palette` (`string`)
