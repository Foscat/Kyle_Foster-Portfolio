# srcComponentsFeaturesColormenuIndexComponent

- Source: `src/components/features/ColorMenu/index.jsx`

# srcComponentsFeaturesColormenuIndexComponent

## components/features/ColorMenu

Color preferences modal for theme mode, palette, and high
contrast controls.

### ColorSwitch

A custom switch component for toggling color preferences, with support for disabled state and ARIA labeling.

**Parameters**

- `props` (`Object`) - The props for the ColorSwitch component.
- `props.labelledBy` (`string`) - The ID of the element that labels the switch.
- `props.checked` (`boolean`) - Whether the switch is currently checked.
- `props.onChange` (`function`) - Callback function to handle switch state changes.
- `props.disabled` (`boolean`, optional, default: `false`) - Whether the switch is disabled.

**Returns**

- `JSX.Element` - The rendered ColorSwitch component.

### ColorPreferenceRow

A row component for displaying and managing color preferences, including high contrast mode.

**Parameters**

- `props` (`Object`) - The props for the ColorPreferenceRow component.
- `props.id` (`string`) - The ID for the row, used for ARIA labeling.
- `props.title` (`string`) - The title of the color preference.
- `props.description` (`string`) - A description of the color preference.
- `props.enabled` (`boolean`) - Whether the color preference is currently enabled.
- `props.systemValue` (`boolean`) - The system's current value for the color preference.
- `props.overrideValue` (`boolean | null`) - The user's override value for the color preference, or null if using system value.
- `props.onToggle` (`function`) - Callback function to handle toggling the color preference.
- `props.onUseSystem` (`function`) - Callback function to handle using the system value for the color preference.
- `props.disabled` (`boolean`, optional, default: `false`) - Whether the row is disabled.

**Returns**

- `JSX.Element` - The rendered ColorPreferenceRow component.

### ColorMenu

A component for managing color preferences, including high contrast mode.

**Parameters**

- `props` (`Object`) - The props for the ColorMenu component.
- `props.size` (`string`, optional, default: `Size.SM`) - The size of the color menu.
- `props.showTooltip` (`boolean`, optional, default: `true`) - Whether to show tooltips.

**Returns**

- `JSX.Element` - The rendered ColorMenu component.
