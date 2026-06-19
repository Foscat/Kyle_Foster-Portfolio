# srcComponentsUiFrostediconIndexUi

- Source: `src/components/ui/FrostedIcon/index.jsx`

# srcComponentsUiFrostediconIndexUi

## components/FrostedIcon

Styled FontAwesome icon component integrated with the
Midnight Gold frosted UI system.

### FrostedIcon

A styled wrapper around {@link FontAwesomeIcon} that conforms to the
Midnight Gold + Frosted UI system.

Core responsibilities:
- Applies frosted-glass theming and size variants
- Manages loading and animation states
- Provides optional click interaction
- Exposes tooltip support via RSuite Whisper
- Forwards supported FontAwesome props directly to the SVG renderer

Accessibility:
- Uses `role="button"` when clickable
- Applies `aria-label` when provided
- Uses `aria-busy` during loading states

**Parameters**

- `props` (`Object`) - Component props.
- `props.icon` (`string`) - FontAwesome icon definition to render.
- `props.size` (`Size`, optional, default: `"md"`) - Icon size variant (xs | sm | md | lg | xl).
- `props.variant` (`string`, optional, default: `"primary"`) - Visual style variant applied via CSS.
- `props.clickable` (`boolean`, optional, default: `false`) - Enables pointer and keyboard interaction.
- `props.onClick` (`function`, optional, default: `()=>{}`) - Click handler invoked when clickable.
- `props.loading` (`boolean`, optional, default: `false`) - Displays a loading spinner and sets aria-busy.
- `props.spin` (`boolean`, optional, default: `false`) - Forces spin animation regardless of loading state.
- `props.tooltip` (`string`, optional) - Optional tooltip text displayed on hover.
- `props.ariaLabel` (`string`, optional) - Accessible label for screen readers.
- `props.noBG` (`boolean`, optional, default: `false`) - Disables the frosted background circle.
- `props.className` (`string`, optional) - Additional CSS class names.
- `props.*` (`FontAwesomeIconProps`, optional) - Any supported FontAwesomeIcon props are forwarded directly to the   underlying SVG renderer.

**Returns**

- `JSX.Element` - Rendered frosted icon.

**Examples**

```js
```js
<FrostedIcon
icon={faCoffee}
size={Size.LG}
variant={Variant.ACCENT}
clickable
onClick={() => alert("Icon clicked!")}
/>
```
```

### FontAwesomeIconProps

Subset of props forwarded directly to the underlying `FontAwesomeIcon`
component. These align with the official `@fortawesome/react-fontawesome`
API and are documented here for completeness.

- Type: `Object`

**Properties**

- `border` (`boolean`, optional, default: `false`) - Renders a border around the icon.
- `mask` (`any`, optional) - Icon used as a mask.
- `maskId` (`string`, optional) - Optional ID for the SVG mask.
- `inverse` (`boolean`, optional, default: `false`) - Inverts icon color.
- `flip` (`string | boolean`, optional, default: `false`) - Flips the icon ("horizontal", "vertical", or "both").
- `pull` (`string`, optional) - Pulls icon left or right.
- `rotation` (`number`, optional) - Rotates icon (90, 180, 270).
- `rotateBy` (`boolean | number`, optional, default: `false`) - Arbitrary rotation value.
- `spinPulse` (`boolean`, optional, default: `false`) - Enables pulse-style spinning.
- `spinReverse` (`boolean`, optional, default: `false`) - Reverses spin direction.
- `fade` (`boolean`, optional, default: `false`) - Enables fade animation.
- `beatFade` (`boolean`, optional, default: `false`) - Enables beat-fade animation.
- `bounce` (`boolean`, optional, default: `false`) - Enables bounce animation.
- `shake` (`boolean`, optional, default: `false`) - Enables shake animation.
- `symbol` (`boolean | string`, optional, default: `false`) - Exports icon as SVG symbol.
- `title` (`string`, optional) - SVG `<title>` content.
- `titleId` (`string`, optional) - ID applied to SVG title element.
- `transform` (`string | Object`, optional) - SVG transform definition.
- `swapOpacity` (`boolean`, optional, default: `false`) - Swaps opacity layers.
- `widthAuto` (`boolean`, optional, default: `false`) - Enables automatic width calculation.
