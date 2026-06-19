# srcComponentsRenderersBlocksLinksblockIndexRenderer

- Source: `src/components/renderers/blocks/LinksBlock/index.jsx`

# srcComponentsRenderersBlocksLinksblockIndexRenderer

## src\\components\\renderers\\blocks\\LinksBlock\\index

src\components\renderers\blocks\LinksBlock\index module.

## components/renderers/blocks/LinksBlock

Renders a list of link buttons inside a collapsible frosted panel.This component is designed to be used as a block renderer within the section
content system. It takes a list of link definitions and renders them as styled buttons
with appropriate attributes for external links, downloads, and accessibility.

### LinksBlock

Renders a list of link buttons using the shared UI type system.
This component is designed to be used as a block renderer within the section content system. It takes a list of link definitions and renders them as styled buttons with appropriate attributes for external links, downloads, and accessibility.
This component relies on the global `LinkItem` typedef defined in
`src/types/ui.types.js`. That typedef is treated as a shared contract
and should not be redeclared locally.

Rendering notes:
- Returns `null` when no links are provided
- Automatically detects external URLs to apply target and rel attributes
- Delegates rendering and accessibility concerns to the shared `Btn` component

**Parameters**

- `props` (`object`) - Component props.
- `props.items` (`Array<LinkItem>`) - List of link definitions to render.

**Returns**

- `JSX.Element | null` - Rendered link list or null if empty.

**Examples**

```js
```js
<LinksBlock
  items={[
    { title: "GitHub", url: "https://github.com", icon: faGithub },
    { title: "Resume", url: "/resume.pdf", download: true, icon: faFile },
  ]}
/>
```
```
