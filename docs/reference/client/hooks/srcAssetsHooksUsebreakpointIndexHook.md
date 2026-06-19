# srcAssetsHooksUsebreakpointIndexHook

- Source: `src/assets/hooks/useBreakpoint/index.js`

# srcAssetsHooksUsebreakpointIndexHook

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
