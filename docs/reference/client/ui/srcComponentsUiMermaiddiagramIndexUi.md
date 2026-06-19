# srcComponentsUiMermaiddiagramIndexUi

- Source: `src/components/ui/MermaidDiagram/index.jsx`

# srcComponentsUiMermaiddiagramIndexUi

## src\\components\\ui\\MermaidDiagram\\index

src\components\ui\MermaidDiagram\index module.

## components/MermaidDiagram

Fully featured Mermaid diagram renderer with dark/light theme support, responsive SVG layout, accessible container, optional description, and PNG export capability. The component normalizes props to support both legacy and new diagram configurations, allowing for flexible integration while maintaining a consistent internal state structure for rendering.

### MermaidDiagram

Fully featured Mermaid diagram renderer with dark/light theme support, responsive SVG layout, accessible container, optional description, and PNG export capability. The component normalizes props to support both legacy and new diagram configurations, allowing for flexible integration while maintaining a consistent internal state structure for rendering.
Core responsibilities:
- Render Mermaid diagrams based on provided source strings, with support for separate mobile and desktop configurations.
- Apply visual themes (dark/light) to the rendered diagrams for consistent styling.
- Ensure the diagram container is accessible, using appropriate ARIA roles and labels.
- Include an optional description rendered beneath the diagram for additional context.
- Provide a button to export the rendered diagram as a PNG image, using `html-to-image` for conversion.
- Normalize incoming props to support both legacy and new diagram configurations, ensuring backward compatibility while enabling new features.

**Parameters**

- `props` (`Object`) - Component props.
- `props.id` (`string`) - DOM id assigned to the panel container, used as a scroll anchor and for accessibility.
- `props.diagram` (`string`) - Mermaid diagram source string. Legacy property if `mobileDiagram` and/or `desktopDiagram` are not provided.
- `props.mobileDiagram` (`Object`) - Optional diagram configuration for mobile viewports.
- `props.desktopDiagram` (`Object`) - Optional diagram configuration for desktop viewports.
- `props.title` (`string`, optional) - Optional title rendered in the panel header and used for accessibility.
- `props.description` (`string`, optional) - Optional descriptive text rendered beneath the diagram.
- `props.theme` (`"dark" | "light"`, optional, default: `"dark"`) - Visual theme applied to Mermaid rendering.
- `props.theme` (`string`, optional) - Visual theme for the diagram (e.g. "dark" or "light").
- `props.icon` (`string`, optional)
- `props.className` (`string`, optional) - Additional CSS class names applied to the panel container.

**Returns**

- `JSX.Element` - Rendered Mermaid diagram panel.

**Examples**

```js
```js
<MermaidDiagram
id="example-diagram"
title="Example Mermaid Diagram"
description="This is an example of a Mermaid diagram rendered within the MermaidDiagram component."
diagram="graph TD; A-->B; A-->C; B-->D; C-->D;"
theme="dark"
/>
// In this example, the `MermaidDiagram` component renders a simple flowchart defined by the Mermaid syntax in the `diagram` prop. The component applies the "dark" theme to the rendered SVG and includes a title and description for context. The diagram is rendered within a styled panel that is accessible and includes functionality for exporting the diagram as a PNG image.
```
```

### handleExport()

Handle diagram export by converting the rendered SVG to a PNG image using `html-to-image`, while ensuring that the host element and SVG are present before attempting the export. The function includes error handling to catch and log any issues during the export process, providing feedback in case of failure. The exported file is named based on the provided title or defaults to "diagram.png" if no title is available, ensuring a user-friendly download experience.
The export process involves:
- Selecting the SVG element from the host container to ensure that the correct content is exported.
- Using `html-to-image`'s `toPng` function to convert the SVG to a PNG data URL, with options for cache busting and background color to ensure a clean export.
- Creating a temporary anchor element to trigger the download of the PNG file, setting the `href` to the generated data URL and the `download` attribute to specify the filename.
- Handling any errors that occur during the export process by logging them to the console, allowing for debugging and user feedback in case of issues.

**Returns**

- `Promise<void>` - A promise that resolves when the export process is complete, allowing for asynchronous handling of the export operation.
