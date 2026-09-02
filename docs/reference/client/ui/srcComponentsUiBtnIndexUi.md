# srcComponentsUiBtnIndexUi

- Source: `src/components/ui/Btn/index.jsx`

# srcComponentsUiBtnIndexUi

## components/Btn

Unified frosted-glass button component implementing the
Midnight Gold UI system with accessibility, animation, async handling,
and controlled prop passthrough to native elements and FontAwesome.

### Btn

A unified, accessible, animated button component that conforms to the
Midnight Gold + Frosted UI system.

Core responsibilities:
- Normalizes native button, anchor, and React Router link behavior
- Keeps icon and label composition consistent across element types
- Enforces accessibility for icon-only buttons
- Supports async click handlers with visual feedback
- Provides dependency-free native tooltip text
- Can render as:
  - Native button
  - React Router link
  - External anchor

Accessibility:
- Requires an accessible label for icon-only buttons
- Applies `aria-busy` during loading/async states
- Applies `aria-disabled` consistently

**Parameters**

- `props` (`Object`) - Component props.
- `props.variant` (`Variant`, optional, default: `"primary"`) - Visual style variant aligned with the frosted theme.
- `props.surfaceLevel` (`SurfaceLevel`, optional, default: `"2"`) - Interactive Surface depth. Buttons default to the raised library surface so   variant foreground and background tokens remain paired for readable contrast.
- `props.size` (`Size`, optional, default: `"md"`) - Size variant applied to both button and icon.
- `props.text` (`string`, optional) - Text label rendered inside the button.
- `props.children` (`React.ReactNode`, optional) - Nested button content used when a simple text label is not sufficient.
- `props.type` (`"button" | "submit" | "reset"`, optional, default: `"button"`) - Native button type forwarded to the underlying element.
- `props.icon` (`string`, optional) - FontAwesome icon name. When provided, renders an IconButton.
- `props.onClick` (`function`, optional) - Click handler. May return a Promise to enable async loading state.
- `props.clickable` (`boolean`, optional, default: `true`) - Indicates whether the button/icon is clickable or not.
- `props.ariaLabel` (`string`, optional) - Accessible label. Required for icon-only buttons if no tooltip is provided.
- `props.ariaExpanded` (`boolean | string`, optional) - Convenience alias mapped to `aria-expanded`.
- `props.ariaCurrent` (`string`, optional) - Convenience alias mapped to `aria-current`.
- `props.tooltip` (`string`, optional) - Tooltip text displayed on hover.
- `props.tooltipFollowCursor` (`boolean`, optional, default: `true`) - When true, the tooltip will follow the cursor.
- `props.tooltipPlacement` (`TooltipPlacement`, optional, default: `"right"`) - Placement of the tooltip relative to the button.
- `props.animation` (`HoverAnimation`, optional, default: `"scale"`) - Optional hover animation preset.
- `props.href` (`string`, optional) - Converts the button into a link when provided.
- `props.hrefLocal` (`boolean`, optional, default: `false`) - When true, renders a React Router `<Link>` instead of an anchor.
- `props.target` (`string`, optional) - Anchor target value (e.g., "_blank").
- `props.tabIndex` (`number`, optional) - Explicit tabIndex for the button. By default, it will be focusable when visible and not disabled.
- `props.rel` (`string`, optional) - Anchor `rel` attribute.
- `props.className` (`string`, optional) - Additional CSS class names.
- `props.noBG` (`boolean`, optional, default: `false`) - Disables the frosted background treatment.
- `props.*` (`NativeButtonProps`, optional) - Supported native element props are forwarded directly.
- `props.*` (`FontAwesomeButtonIconProps`, optional) - FontAwesome-related props forwarded to the internal `FrostedIcon`.

**Returns**

- `JSX.Element` - Rendered button component.

**Examples**

```js
```js
<Btn
variant="accent"
size="lg"
text="Click Me"
icon="fa-solid fa-thumbs-up"
onClick={() => alert("Button clicked!")}
tooltip="This is a button"
ariaLabel="Click Me"
/>
```
In this example, the `Btn` component renders a large, accent-styled button with both text and an icon. It includes a tooltip that appears on hover and an accessible label for screen readers. When clicked, it triggers an alert dialog.
```

### isIconOnly

True when the button renders only an icon with no text label

### nativeAriaLabel

Resolve an accessible aria-label for the button. Falls back to tooltip text or a humanized icon name.

### resolvedSurfaceVariant

Transparent controls use the shared subtle foreground token because their
final background comes from the surrounding surface rather than variant paint.

### classes

Variant intent remains explicit for existing component hooks while the shared
libraries own the rendered paint, depth, and interaction states.

### handleClick()

Async-aware click handler.
Automatically manages loading state when a Promise is returned.

**Parameters**

- `e` (`React.MouseEvent`) - Click event.

**Returns**

- `void`

### NativeButtonProps

Native element and compatibility props accepted by the shared button.

- Type: `Object`

**Properties**

- `active` (`boolean`, optional, default: `true`) - Whether the button is in an active state.
- `as` (`string | React.ElementType`, optional, default: `"button"`) - Render element type.
- `block` (`boolean`, optional, default: `false`) - Makes the button full-width.
- `disabled` (`boolean`, optional, default: `false`) - Disables the button.
- `startIcon` (`React.ReactNode`, optional) - Icon rendered before content.
- `endIcon` (`React.ReactNode`, optional) - Icon rendered after content.
- `loading` (`boolean`, optional, default: `false`) - Shows loading state.
- `href` (`string`, optional) - If provided, renders an anchor instead of a button.
- `target` (`string`, optional) - Anchor target (e.g., "_blank").
- `rel` (`string`, optional) - Anchor rel attribute.
- `download` (`string`, optional) - Anchor download attribute.
- `className` (`string`, optional) - Additional CSS class names.
- `noBG` (`boolean`, optional, default: `false`) - If true, disables the frosted background.
- `variant` (`Variant`, optional, default: `"primary"`) - Visual style variant.
- `surfaceLevel` (`SurfaceLevel`, optional, default: `"2"`) - Interactive Surface visual depth.
- `size` (`Size`, optional, default: `"md"`) - Size variant applied to both button and icon.
- `text` (`React.ReactNode`, optional) - Label rendered inside the button.
- `type` (`"button" | "submit" | "reset"`, optional, default: `"button"`) - Native button type.
- `icon` (`string`, optional) - FontAwesome icon name. When provided, renders an IconButton.
- `onClick` (`function`, optional) - Click handler. May return a Promise to enable async loading state.

### FontAwesomeButtonIconProps

FontAwesome-related props forwarded to the internal `FrostedIcon`
instance rendered inside the button. These allow for fine-grained control over
the icon's appearance and behavior, including animation, flipping, masking, and more.

- Type: `Object`

**Properties**

- `border` (`boolean`, optional, default: `false`)
- `mask` (`any`, optional)
- `maskId` (`string`, optional)
- `inverse` (`boolean`, optional, default: `false`)
- `flip` (`string | boolean`, optional, default: `false`)
- `pull` (`string`, optional)
- `rotation` (`number`, optional)
- `rotateBy` (`boolean | number`, optional, default: `false`)
- `spinPulse` (`boolean`, optional, default: `false`)
- `spinReverse` (`boolean`, optional, default: `false`)
- `fade` (`boolean`, optional, default: `false`)
- `beatFade` (`boolean`, optional, default: `false`)
- `bounce` (`boolean`, optional, default: `false`)
- `shake` (`boolean`, optional, default: `false`)
- `symbol` (`boolean | string`, optional, default: `false`)
- `title` (`string`, optional)
- `titleId` (`string`, optional)
- `transform` (`string | Object`, optional)
- `swapOpacity` (`boolean`, optional, default: `false`)
- `widthAuto` (`boolean`, optional, default: `false`)
