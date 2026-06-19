# responsiveProviderContext

- Source: `src/assets/context/responsive/ResponsiveProvider.jsx`

# responsiveProviderContext

## getBreakpoint()

Determines the current breakpoint based on the given width. This function replicates the logic from useBreakpoint.js to avoid circular dependencies. It checks the width against defined breakpoints for mobile and tablet, and returns "mobile", "tablet", or "desktop" accordingly.

**Parameters**

- `width` (`number`) - The current width of the viewport.

**Returns**

- `string` - The current breakpoint ("mobile", "tablet", or "desktop").

**Throws**

- Value - Will throw an error if width is not a number or if breakpoints are not defined properly.

## getOrientation()

Determines the current orientation of the viewport. This function replicates the logic from useBreakpoint.js to avoid circular dependencies. It checks the orientation using the window.matchMedia API and returns "portrait" or "landscape" accordingly.

**Returns**

- `string` - The current orientation ("portrait" or "landscape").

## getReducedMotion()

Determines if the user has requested reduced motion. This function replicates the logic from useBreakpoint.js to avoid circular dependencies. It checks the prefers-reduced-motion media query and returns a boolean accordingly.

**Returns**

- `boolean` - True if the user has requested reduced motion, false otherwise.

## getReducedTransparency()

Determines if the user has requested reduced transparency. This function replicates the logic from useBreakpoint.js to avoid circular dependencies. It checks the prefers-reduced-transparency media query and returns a boolean accordingly.

**Returns**

- `boolean` - True if the user has requested reduced transparency, false otherwise.

## getHighContrast()

Determines if the user has requested high contrast mode. This function replicates the logic from useBreakpoint.js to avoid circular dependencies. It checks the prefers-contrast and forced-colors media queries and returns a boolean accordingly.

**Returns**

- `boolean` - True if the user has requested high contrast mode, false otherwise.

## ResponsiveProvider()

Provides responsive design context to the app, including current breakpoint, orientation, and spacing values.
Listens for window resize events and updates context values accordingly.
This allows any component in the app to access responsive information and adapt its layout or behavior based on screen size and orientation.

**Parameters**

- `children` (`ReactNode`) - The child components that will have access to the responsive context values.

**Returns**

- `ReactNode` - The context provider wrapping the child components.

**Throws**

- Value - Will throw an error if the provider is used in a non-browser environment without appropriate fallbacks for window properties.

**Examples**

```js
<ResponsiveProvider>
 <YourAppComponents />
</ResponsiveProvider>

Note: This provider should be placed near the root of the component tree (e.g., in main.jsx) to ensure that all components can access the responsive context.
It is designed to be used in a browser environment where window.matchMedia and window.innerWidth are available. In server-side rendering contexts, it will default to "desktop" breakpoint and "landscape" orientation.
The spacing values provided in the context are based on the current breakpoint and can be used for consistent spacing throughout the app.
The provider also includes boolean flags (isMobile, isTablet, isDesktop, isPortrait, isLandscape) for easy conditional rendering based on the current responsive state.
The use of requestAnimationFrame in the resize handler helps to optimize performance by batching state updates and avoiding excessive re-renders during rapid resize events.
Cleanup of event listeners and animation frames is handled in the useEffect cleanup function to prevent memory leaks.
Overall, this provider centralizes responsive design logic and makes it easily accessible throughout the app, promoting a consistent and adaptive user experience across different devices and screen sizes.
```

## handleResize()

Event handler for window resize events. This function uses requestAnimationFrame to optimize performance by batching state updates and avoiding excessive re-renders during rapid resize events. When the window is resized, it updates the width, breakpoint, and orientation state based on the new window dimensions.

**Throws**

- Value - Will throw an error if window properties are not available (e.g., in a non-browser environment), but this is mitigated by the initial state setup that defaults to safe values when window is undefined.

## handleMotionChange()

Event handler for changes in the prefers-reduced-motion media query. Updates the reducedMotion state based on the media query's match status.

**Parameters**

- `e` (`MediaQueryListEvent`) - The media query change event.

## handleTransparencyChange()

Event handler for changes in the prefers-reduced-transparency media query. Updates the reducedTransparency state based on the media query's match status.

**Parameters**

- `e` (`MediaQueryListEvent`) - The media query change event.

## handleContrastChange()

Event handler for changes in the prefers-contrast: more or forced-colors: active media queries. Updates the highContrast state based on the current media query match status.

## contextValue()

Memoized context value object that contains all responsive information and flags. This object is created using useMemo to optimize performance by preventing unnecessary re-renders of context consumers when the responsive state changes. The context value includes the current theme ID, width, breakpoint, orientation, accessibility preferences (reduced motion, reduced transparency, high contrast), boolean flags for device type and orientation, and the spacing values for the current breakpoint tier. By memoizing this object, we ensure that components consuming the ResponsiveContext only re-render when relevant responsive values actually change, improving overall app performance.

**Returns**

- `object` - The context value object containing responsive information and flags.

**Throws**

- Value - Will throw an error if any of the dependencies (width, breakpoint, orientation, reducedMotion, reducedTransparency, highContrast) are not defined, but this is mitigated by the initial state setup that provides default values.
