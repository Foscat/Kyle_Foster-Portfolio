# srcComponentsFeaturesThemetoggleIndexComponent

- Source: `src/components/features/ThemeToggle/index.jsx`

# srcComponentsFeaturesThemetoggleIndexComponent

## components/ThemeToggle

Compact theme selection control for switching between
light and dark application themes.

### ThemeToggle()

ThemeToggle
------------------------------------------------------------------
Compact, icon-only theme selector used to toggle between light and
dark application themes.

Design goals:
- Minimal visual footprint
- Clear active-state feedback
- Keyboard and screen-reader accessible
- Consistent with the frosted / glass UI system

Behavior:
- Highlights the currently active theme
- Disables the active option to prevent redundant state updates
- Delegates theme state management to ThemeContext

Accessibility:
- Toolbar includes an aria-label for screen readers
- Each button includes descriptive aria-labels and tooltips

**Parameters**

- `props` (`Object`) - Component props.
- `props.size` (`Size`, optional, default: `Size.SM`) - Size applied to the toggle buttons.

**Returns**

- `JSX.Element` - Rendered theme toggle control.
