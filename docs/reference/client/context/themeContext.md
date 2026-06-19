# themeContext

- Source: `src/assets/context/ThemeContext.jsx`

# themeContext

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
