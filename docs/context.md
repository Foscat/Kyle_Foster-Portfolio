# Context

## src\\assets\\context\\SectionRegistryProvider

src\assets\context\SectionRegistryProvider module.

## assets/context/SectionRegistryProvider

Provides a centralized registry for page sections so navigation
systems (e.g., sticky navigation, scroll-spy) can dynamically discover and
track registered sections.

### SectionRegistryContext

Internal React context for the section registry.
The context value is intentionally nullable to enforce provider usage.

- Type: `React.Context<(SectionRegistryContextValue|null)>`

### SectionRegistryProvider()

React context provider component that manages a registry of page sections. This provider maintains an internal Map of registered sections, allowing components to register and unregister sections dynamically as they mount and unmount. The provider exposes a context value with functions to register/unregister sections and retrieve the current list of registered sections. By wrapping the app (or relevant parts of it) with this provider, we enable features like dynamic navigation generation and scroll-spy behavior based on the registered sections.

**Parameters**

- `props` (`Object`) - Provider props.

**Returns**

- `JSX.Element` - Context provider wrapping child components.

### registerSection()

Registers a section with the registry. This function is intended to be called by section components (e.g., SectionRenderer) when they mount to add themselves to the registry. It takes a unique section ID and associated metadata, and stores it in the internal Map. If an attempt is made to register a section without an ID or with a duplicate ID, it will emit a warning in development mode to help catch potential issues with section management.

**Parameters**

- `id` (`string`) - Unique identifier for the section being registered.
- `meta` (`SectionMeta`) - Metadata describing the section (e.g., title, element).

**Returns**

- `void` - This function does not return any value.

### unregisterSection()

Removes a section from the registry by its ID. This function is intended to be called when a section component unmounts to ensure that the registry stays up-to-date with the currently rendered sections on the page. It performs a simple deletion from the internal Map of sections based on the provided ID. If the ID does not exist in the registry, it will simply do nothing, allowing for safe calls even if there are issues with section lifecycle management.

**Parameters**

- `id` (`string`) - The unique identifier of the section to be removed from the registry.

**Returns**

- `void` - This function does not return any value.

### getSections()

Retrieves all registered sections in insertion order. This function converts the internal Map of sections to an array of section metadata objects. In development mode, it emits a warning if no sections are registered, which can help catch incorrect usage of the SectionRenderer component that is responsible for registering sections. By providing a getSections function, we allow consuming components (like navigation systems) to access the current list of registered sections and render navigation links or perform scroll-spy behavior accordingly.

**Returns**

- `Array<SectionMeta>` - Array of registered section metadata.

**Throws**

- Value - Will not throw errors, but will emit a warning in development mode if no sections are registered. This is to help developers catch potential issues with section registration.

### useSectionRegistry()

Hook for accessing the Section Registry context.

**Returns**

- `SectionRegistryContextValue` - Section registry API.

**Throws**

- `Error` - If used outside of a SectionRegistryProvider.

**Examples**

```js
```js
const { registerSection } = useSectionRegistry();

useEffect(() => {
  registerSection("about", { id: "about", title: "About Me" });
}, []);
```
```

### RegisterSection

- Type: `function`

**Parameters**

- `id` (`string`) - Unique section identifier.
- `meta` (`SectionMeta`) - Section metadata.

**Returns**

- `void`

### UnregisterSection

- Type: `function`

**Parameters**

- `id` (`string`) - Section identifier to remove.

**Returns**

- `void`

### GetSections

- Type: `function`

**Returns**

- `Array<SectionMeta>` - Ordered list of registered sections.

### SectionMeta

Metadata describing a registered page section.

- Type: `Object`

**Properties**

- `id` (`string`) - Unique identifier for the section.
- `title` (`string`, optional) - Human-readable section title.
- `element` (`HTMLElement`, optional) - DOM element associated with the section.
- `order` (`number`, optional) - Optional ordering hint for navigation.

### SectionRegistryContextValue

Public API exposed by the Section Registry context.

- Type: `Object`

**Properties**

- `registerSection` (`RegisterSection`) - Registers a section.
- `unregisterSection` (`UnregisterSection`) - Unregisters a section.
- `getSections` (`GetSections`) - Returns all registered sections.

## assets/theme/ThemeContext

Provides theme state and helpers for managing light and dark
modes across the application.

### ThemeProvider()

ThemeProvider component.
Wraps the application and provides theme state via React context.

**Parameters**

- `props` (`Object`) - Provider props.
- `props.children` (`React.ReactNode`) - Child components.

**Returns**

- `JSX.Element` - Theme context provider.

### useTheme()

Hook for consuming the ThemeContext.
Must be used within a ThemeProvider.

**Returns**

- `ThemeContextValue` - Current theme context value.

**Throws**

- `Error` - If used outside of a ThemeProvider.

### setTheme

Explicitly set theme while guarding against invalid values.

**Parameters**

- `nextTheme` (`Theme | function`) - Theme value or updater function.

### toggleTheme

Toggles the current theme using a functional state update.

### Theme

Supported application themes.

- Type: `"light" | "dark"`

### Palette

Supported application palettes.

- Type: `"midnight-gold" | "ocean-steel" | "forest-moss" | "sunset-ember" | "royal-plum" | "graphite-cyan" | "desert-sage" | "rose-quartz" | "cyber-lime" | "arctic-indigo"`

### UiStyle

Supported ui-style-kit-css visual systems.

- Type: `"minimal-saas" | "bento" | "maximalist" | "bauhaus" | "tactile" | "neumorphism" | "retrofuturism" | "brutalism" | "cyberpunk" | "y2k" | "retro-glass"`

### LayoutStyle

Supported layout-style-css spatial systems.

- Type: `"minimal-saas" | "bento" | "maximalist" | "bauhaus" | "tactile" | "neumorphism" | "retrofuturism" | "brutalism" | "cyberpunk" | "y2k" | "retro-glass" | "f-pattern" | "z-pattern" | "split-screen" | "mondrian" | "synthwave"`

### ThemeContextValue

Context value exposed by the ThemeProvider.

- Type: `Object`

**Properties**

- `theme` (`Theme`) - Currently active theme.
- `setTheme` (`function`) - Explicitly set the theme.
- `toggleTheme` (`function`) - Toggle between light and dark themes.
- `palette` (`Palette`) - Currently active color palette.
- `setPalette` (`function`) - Explicitly set the palette.
- `togglePalette` (`function`) - Cycle through available palettes.
- `palettes` (`Array<Palette>`) - Supported palette identifiers.
- `uiStyle` (`UiStyle`) - Currently active ui-style-kit-css visual system.
- `setUiStyle` (`function`) - Explicitly set the visual system.
- `toggleUiStyle` (`function`) - Cycle through available visual systems.
- `uiStyles` (`Array<UiStyle>`) - Supported visual system identifiers.
- `layoutStyle` (`LayoutStyle`) - Currently active layout-style-css spatial system.
- `setLayoutStyle` (`function`) - Explicitly set the spatial system.
- `toggleLayoutStyle` (`function`) - Cycle through available spatial systems.
- `layoutStyles` (`Array<LayoutStyle>`) - Supported spatial system identifiers.

## src\\assets\\context\\ErrorBoundary\\index

src\assets\context\ErrorBoundary\index module.

## components/ErrorBoundary

Root-level React Error Boundary used to catch and handle
unrecoverable runtime errors without crashing the entire application.

### ErrorBoundary

Initializes error boundary state.

**Parameters**

- `props` (`Object`) - Component props.

### componentDidCatch()

Lifecycle hook invoked when an error is caught.
Used for logging error details and component stack trace.

**Parameters**

- `error` (`Error`) - The thrown error.
- `info` (`React.ErrorInfo`) - Component stack information.

### render()

Renders fallback UI when an error has been caught,
otherwise renders child components normally.

**Returns**

- `JSX.Element`

### getDerivedStateFromError()

Lifecycle hook invoked when a descendant throws during render.
Updates state to trigger fallback UI.

**Parameters**

- `error` (`Error`) - The thrown error.

**Returns**

- `Object`

### ErrorBoundary

ErrorBoundary
------------------------------------------------------------
A root error boundary that prevents the entire application from
crashing due to uncaught runtime errors.

Responsibilities:
- Catches render-time and lifecycle errors in descendant components
- Displays a user-facing fallback UI
- Logs error details and component stack traces to the console

Behavior:
- Uses `getDerivedStateFromError` to trigger fallback rendering
- Uses `componentDidCatch` for side-effect logging
- Allows normal rendering when no error is present

Usage notes:
- Intended to wrap the highest possible level of the app (e.g., App root)
- Should not be used for recoverable or expected errors

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
