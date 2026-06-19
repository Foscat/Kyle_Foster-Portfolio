# indexRenderer

- Source: `src/components/renderers/index.jsx`

# indexRenderer

## src\\components\\renderers\\index

src\components\renderers\index module.

### LazyDisplay

A simple component to display a loading message and an optional icon while a lazy-loaded component is being fetched.

**Parameters**

- `loadingMessage` (`string`) - The message to display while loading. Defaults to "Loading...".
- `icon` (`string`) - An optional FontAwesome icon class to display above the loading message.
- `iconSpin` (`boolean`) - If true, the icon will have the "fa-spin" class applied for animation.

**Returns**

- `JSX.Element` - Rendered loading placeholder.
