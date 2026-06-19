# srcComponentsFeaturesAccessibilitymenuIndexComponent

- Source: `src/components/features/AccessibilityMenu/index.jsx`

# srcComponentsFeaturesAccessibilitymenuIndexComponent

## components/features/AccessibilityMenu

Accessibility preferences modal for toggling motion, contrast,
text size, and keyboard guidance with persisted client-side settings.

### module.exports()

A menu component for managing accessibility preferences.

**Properties**

- `size` (`string`) - The size of the menu.
- `enableHotkey` (`boolean`) - Whether to enable the hotkey for opening the menu.
- `showTooltip` (`boolean`) - Whether to show tooltips for the menu items.

**Returns**

- `JSX.Element` - The rendered accessibility menu component.

## A11ySwitch()

A custom switch component for toggling accessibility preferences, built with an underlying checkbox input for accessibility.

**Properties**

- `labelledBy` (`string`) - The id of the element that labels this switch, used for aria-labelledby.
- `checked` (`boolean`) - Whether the switch is currently on (checked) or off (unchecked).
- `onChange` (`function`) - Callback function that is called with the new checked state when the switch is toggled.
- `disabled` (`boolean`) - Whether the switch is disabled and non-interactive.

**Returns**

- `JSX.Element` - The rendered switch component.

## PreferenceRow()

A single row in the accessibility menu for toggling a specific preference.

**Properties**

- `id` (`string`) - Unique identifier for the preference, used for accessibility labeling.
- `title` (`string`) - The display name of the preference.
- `description` (`string`) - A brief explanation of what the preference does.
- `enabled` (`boolean`) - Whether the preference is currently enabled (based on draft state).
- `systemValue` (`boolean | null`) - The current value of the preference according to system settings (if supported).
- `overrideValue` (`boolean | null`) - The manually selected override value, or null when using the system preference.
- `onToggle` (`function`) - Called when the preference switch is toggled.
- `onUseSystem` (`function`, optional) - Called when the user chooses to revert to the system preference.
- `supportsSystem` (`boolean`, optional, default: `true`) - Whether this preference can follow a system-level setting.
- `disabled` (`boolean`, optional, default: `false`) - Whether the row controls are disabled.

**Returns**

- `JSX.Element` - The rendered preference row component.
