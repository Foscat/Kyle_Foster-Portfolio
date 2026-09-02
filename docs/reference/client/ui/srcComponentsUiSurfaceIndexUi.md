# srcComponentsUiSurfaceIndexUi

- Source: `src/components/ui/Surface/index.jsx`

# srcComponentsUiSurfaceIndexUi

## components/ui/Surface

Native semantic surface and disclosure primitive for portfolio content.

### Surface()

Render a semantic content surface with optional native disclosure behavior.
Layout comes from layout-style-css, while visual and interaction states come
from ui-style-kit-css and interactive-surface-css.

**Parameters**

- `props` (`Object`) - Surface configuration.
- `props.as` (`React.ElementType`, optional, default: `"div"`) - Semantic element to render.
- `props.header` (`React.ReactNode`, optional) - Optional heading or disclosure label.
- `props.collapsible` (`boolean`, optional, default: `false`) - Enables a native button disclosure.
- `props.defaultExpanded` (`boolean`, optional, default: `true`) - Initial uncontrolled disclosure state.
- `props.expanded` (`boolean`, optional) - Optional controlled disclosure state.
- `props.onSelect` (`function`, optional) - Called with the next expanded state and click event.
- `props.className` (`string`, optional, default: `""`) - Additional surface classes.
- `props.children` (`React.ReactNode`) - Surface body content.

**Returns**

- `JSX.Element` - Native semantic surface.

### handleToggle()

Toggle the disclosure and notify controlled consumers.

**Parameters**

- `event` (`React.MouseEvent<HTMLButtonElement>`) - Native activation event.

**Returns**

- `void`
