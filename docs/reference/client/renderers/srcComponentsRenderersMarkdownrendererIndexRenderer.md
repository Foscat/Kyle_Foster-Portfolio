# srcComponentsRenderersMarkdownrendererIndexRenderer

- Source: `src/components/renderers/MarkdownRenderer/index.jsx`

# srcComponentsRenderersMarkdownrendererIndexRenderer

## src\\components\\renderers\\MarkdownRenderer\\index

src\components\renderers\MarkdownRenderer\index module.

### MarkdownRenderer()

A React component that renders Markdown content with syntax highlighting and an optional table of contents. It uses the react-markdown library to parse and render the Markdown, and Prism.js for syntax highlighting. The component also generates unique IDs for headings to enable linking from the table of contents.

**Parameters**

- `props` (`Object`) - The props for the MarkdownRenderer component.
- `props.title` (`string`, optional) - An optional title to display above the rendered content.
- `props.content` (`string`) - The Markdown content to render.
- `props.intro` (`string`, optional) - An optional introductory text to display below the title and above the rendered content.
- `props.showToc` (`boolean`, optional, default: `true`) - Whether to show the table of contents based on the headings in the content.
- `props.maxTocDepth` (`number`, optional, default: `3`) - The maximum heading level to include in the table of contents (e.g., 3 means include h1, h2, and h3).
- `props.className` (`string`, optional) - Additional CSS class names to apply to the root element.
- `props.articleId` (`string`, optional) - An optional ID to apply to the root article element for linking purposes.

**Returns**

- `JSX.Element` - The rendered Markdown content.
