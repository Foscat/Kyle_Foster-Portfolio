# Renderer Components

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

## components/blocks

Centralized export module for all block components used in page rendering.
This file serves as a single point of import for all block types, promoting
modularity and ease of maintenance across the codebase.

Note: When adding new block types, simply import them here and include them in the export statement.

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

## src\\components\\renderers\\RichText\\index

src\components\renderers\RichText\index module.

## components/RichText

Renders rich text content which may include plain strings, arrays,

### RichText

Renders rich text content which may include plain strings, arrays, or structured rich text nodes. This component is designed to handle a variety of content formats, allowing for flexible rendering of rich text in different contexts.

**Parameters**

- `props` (`Object`)
- `props.text` (`string | number | object | Array`)
- `props.index` (`number`) - Optional index for key generation in arrays
- `props.className` (`string`) - Additional CSS classes for styling
- `props.role` (`string`) - ARIA role for accessibility
- `props.className` (`string`) - Additional CSS classes for styling
- `props.role` (`string`) - ARIA role for accessibility
- `props.ariaLabeledBy` (`string`) - ID of the element that labels this content for accessibility

**Returns**

- `JSX.Element | null` - Rendered rich text content or null if input is empty/invalid Key behaviors: - Handles multiple content formats: strings, numbers, arrays, and objects - Trims string content and renders only if non-empty to avoid empty paragraphs - Recursively renders array content, allowing for complex rich text structures - Uses stable keys for array items, preferring node IDs when available - Applies ARIA roles and labels for accessibility when provided - Returns null for invalid or empty content to prevent rendering errors

**Examples**

```js
```js
<RichText
  text={[
    "This is a paragraph of rich text.",
    { type: "link", href: "https://example.com", text: "This is a link." },
   "This is another paragraph."
 ]}
 className="custom-rich-text"
 role="article"
ariaLabeledBy="richTextLabel"
/>
```
In this example, the `RichText` component renders a mix of plain text and a structured link node, applying custom styling and accessibility attributes as specified in the props.
```

## src\\components\\renderers\\RichText\\renderNode

src\components\renderers\RichText\renderNode module.

### InlineIcon()

InlineIcon
---------------------------------------------------------------------------
Renders a lightweight, inline icon placeholder.

This component is intentionally decoupled from any specific icon library.
Styling and actual icon rendering should be handled via CSS or a higher-level
icon system.

**Parameters**

- `props` (`object`)
- `props.name` (`string`) - Icon identifier used to construct CSS class names.

**Returns**

- `JSX.Element`

### renderNode()

renderNode
---------------------------------------------------------------------------
Recursively renders a `RichTextNode` into a React element.

Design notes:
- Uses a single switch statement for explicit, readable control flow
- Recursion allows arbitrarily deep nesting (lists, paragraphs, blockquotes)
- Inline nodes return strings or inline elements
- Block nodes return semantic container elements

**Parameters**

- `node` (`RichTextNode`) - Rich text node to render.
- `key` (`number | string`) - React key used when rendering collections.

**Returns**

- `JSX.Element | string | null` - Rendered node output.

## src\\components\\renderers\\SectionRenderer\\index

src\components\renderers\SectionRenderer\index module.

## components/SectionRenderer

Central render orchestrator for feature sections composed of
declarative content blocks.

### SectionRenderer()

Central render orchestrator for a feature section composed of declarative
content blocks.

**Parameters**

- `props` (`Object`) - Component props.
- `props.section` (`FeatureSection`, optional, default: `{}`) - Section metadata and block list.
- `props.deferDiagrams` (`boolean | Object`, optional, default: `false`) - Diagram defer behavior toggle/config.

**Returns**

- `JSX.Element` - Rendered feature section.

## src\\components\\renderers\\blocks\\CardGridBlock\\index

src\components\renderers\blocks\CardGridBlock\index module.

## components/renderers/blocks/CardGridBlock

A block component for displaying a grid of InsightCards. It takes a block object containing the title, number of columns, and an array of items to be displayed as cards. Each item should have properties such as title, icon, subtitle, variant (accent color), and content.

### CardGridBlock

A block component for displaying a grid of InsightCards. It takes a block object containing the title, number of columns, and an array of items to be displayed as cards. Each item should have properties such as title, icon, subtitle, variant (accent color), and content.

**Properties**

- `block` (`object`) - The block data containing title, columns, and items.
- `block.title` (`string`) - The title of the card grid section.
- `block.columns` (`number`) - The number of columns in the card grid.
- `block.items` (`Array`) - An array of items to be displayed as cards. Each item should have the following properties:
- `block.items[].id` (`string`) - A unique identifier for the card item.
- `block.items[].title` (`string`) - The title text for the card.
- `block.items[].icon` (`string`) - The name of the icon to be displayed on the card.
- `block.items[].subtitle` (`string`) - The subtitle text for the card.
- `block.items[].variant` (`string`) - The variant (accent color) for the card, e.g., "blue", "green", "red".
- `block.items[].content` (`string`) - The content for the card, which can include rich text.

**Returns**

- `JSX.Element` - The rendered CardGridBlock component.

**Examples**

```js
```js
const blockData = {
  title: "Key Insights",
 columns: 3,
 items: [
   {
    id: "1",
    title: "Insight One",
    icon: "lightbulb",
    subtitle: "An important finding",
    variant: "blue",
    content: "This insight reveals that..."
  },
  {
   id: "2",
   title: "Insight Two",
   icon: "chart-bar",
   subtitle: "Another key point",
   variant: "green",
   content: "This insight highlights that..."
   },
 ],
};
<CardGridBlock block={blockData} />
```
```

## components/renderers/blocks/FormBlock/fieldRegestry

Native form-field registry for schema-driven portfolio forms.

### normalizeField()

Normalize legacy CMS field keys into the native form schema.

**Parameters**

- `field` (`Object`) - Raw field definition.

**Returns**

- `Object` - Normalized field definition.

### buildInitialValues()

Build initial values for every supported native field type.

**Parameters**

- `fields` (`Array<Object>`) - Normalized or raw field definitions.

**Returns**

- `Object` - Form value map keyed by field name.

### renderFieldControl()

Render a schema field as a native form control styled by ui-style-kit-css.

**Parameters**

- `field` (`Object`) - Normalized field definition.
- `value` (`any`) - Current controlled value.
- `onChange` (`function`) - Receives the next value and native change event.

**Returns**

- `React.ReactNode` - Native form control.

### readNativeValue()

Normalize a native input event into the value expected by FormBlock.

**Parameters**

- `event` (`React.ChangeEvent<(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)>`) - Native change event.
- `fieldType` (`string`) - Schema field type.

**Returns**

- `string | number | null` - Normalized field value.

## components/renderers/blocks/FormBlock

Schema-driven native form block styled by the shared STE CSS libraries.

### FormBlock()

Render a controlled native form from CMS-compatible field definitions.

**Parameters**

- `props` (`Object`) - Form block configuration.
- `props.className` (`string`, optional, default: `""`) - Additional wrapper classes.
- `props.schema` (`Object`) - Form title, labels, fields, and initial values.
- `props.fluid` (`boolean`, optional, default: `true`) - Enables the full-width form layout.
- `props.layout` (`"vertical" | "horizontal" | "inline"`, optional, default: `"vertical"`) - Layout variant.
- `props.disabled` (`boolean`, optional, default: `false`) - Disables all controls.
- `props.readOnly` (`boolean`, optional, default: `false`) - Makes all compatible controls read-only.
- `props.onChange` (`function`, optional) - Receives the complete value map after changes.
- `props.onSubmit` (`function`, optional) - Receives the complete value map on submit.

**Returns**

- `JSX.Element | null` - Native schema form or null for an empty schema.

### handleFieldChange()

Update one controlled field and publish the complete value map.

**Parameters**

- `name` (`string`) - Field name.
- `value` (`any`) - Normalized native control value.
- `event` (`React.ChangeEvent`) - Native change event.

**Returns**

- `void`

### handleSubmit()

Prevent document navigation and submit the current controlled values.

**Parameters**

- `event` (`React.FormEvent<HTMLFormElement>`) - Native submit event.

**Returns**

- `void`

### handleReset()

Reset the controlled form to its schema-derived initial values.

## src\\components\\renderers\\blocks\\HeroBlock\\index

src\components\renderers\blocks\HeroBlock\index module.

## components/PageHeader

Standardized page-level header component used to introduce
pages and major sections with consistent hierarchy and styling.

### HeroBlock

A reusable page header component designed to provide a consistent and visually appealing introduction to pages and major sections. It combines a prominent title with optional supporting information such as job titles, timespans, descriptive subtitles, and associated technologies.

**Parameters**

- `props` (`Object`) - Component props.
- `props.title` (`string`) - Main page or section title.
- `props.jobTitle` (`string`, optional) - Optional role or position title.
- `props.timespan` (`string`, optional) - Optional date range or duration string.
- `props.subTitle` (`string`, optional) - Supporting descriptive text rendered beneath the title.
- `props.tech` (`Array<Object>`, optional) - List of technologies associated with the page or project.
- `props.className` (`string`, optional) - Optional additional CSS class names.

**Returns**

- `JSX.Element` - Rendered page header.

**Examples**

```js
```js
<HeroBlock
  title="My Portfolio"
  jobTitle="Software Engineer"
  timespan="2020 - Present"
  subTitle="Welcome to my personal portfolio showcasing my projects and experience."
  tech={[
      { label: "React", type: "react" },
      { label: "JavaScript", type: "javascript" },
      { label: "CSS", type: "css" }
    ]}
/>
```
```

## src\\components\\renderers\\blocks\\ImageGalleryBlock\\index

src\components\renderers\blocks\ImageGalleryBlock\index module.

## src/components/renderers/blocks/ImageGalleryBlock

Renders a responsive image gallery inside a collapsible,
frosted-style panel.

### ImageGalleryBlock

Displays a responsive image gallery as a collapsible frosted panel.

Key behaviors:
- Renders thumbnails through the `layout-style-css` gallery primitive
- Each image opens a ClickableImg modal viewer when activated
- Uses stable React keys, preferring `image.id` when available

Rendering notes:
- Returns `null` if no valid items are provided
- Panel header is rendered only when a title is supplied

**Parameters**

- `block` (`object`) - Component props.
- `block.id` (`string`, optional) - DOM id assigned to the panel container, used as a scroll anchor and for accessibility.
- `block.items` (`Array<FeatureImage>`) - Image definitions to render.

**Returns**

- `JSX.Element | null` - Rendered image gallery or null if empty.

**Examples**

```js
```js
<ImageGalleryBlock
block={{
 id: "gallery1",
title: "Project Screenshots",
items: [
   { id: "img1", src: "/images/screenshot1.png", alt: "Screenshot 1" },
   { id: "img2", src: "/images/screenshot2.png", alt: "Screenshot 2" },
 ],
}}
```

## src\\components\\renderers\\blocks\\ImageTextSplitBlock\\index

src\components\renderers\blocks\ImageTextSplitBlock\index module.

### ImageTextSplitBlock

Renders a magazine-style float layout where rich text wraps around a single image.
On tablet and desktop the image floats left or right at roughly one-third width so the text
flows naturally around it. On mobile the float is cleared and the image stacks above the text
regardless of the imagePosition setting.

**Parameters**

- `props` (`object`) - Component props.
- `props.id` (`string`, optional) - DOM id assigned to the panel container.
- `props.title` (`string`, optional) - Optional heading displayed in the panel header.
- `props.image` (`FeatureImage`) - Single image metadata.
- `props.imagePosition` (`"left" | "right"`, optional, default: `"left"`) - Float side on tablet and desktop.
- `props.showCaption` (`boolean`, optional, default: `false`) - Render the image caption when true. Reserved for   future use cases; captions are hidden by default to keep the layout clean.
- `props.content` (`Array<RichTextNode> | Array<string>`) - Rich text nodes that wrap around the image.

**Returns**

- `JSX.Element | null` - Float-layout image/text panel or null when required data is missing.

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
    { title: "Resume", resumePreview: true, icon: faFile },
  ]}
/>
```
```

## src\\components\\renderers\\blocks\\MarkdownDocs.Block\\index

src\components\renderers\blocks\MarkdownDocs.Block\index module.

### module.exports()

Renders a curated stack of documentation articles with optional jump links
and per-article tables of contents.

**Parameters**

- `props` (`Object`) - Component props.
- `props.block` (`Object`) - Markdown docs block configuration payload.

**Returns**

- `JSX.Element | null` - Rendered docs block or `null` when no docs resolve.

## src\\components\\renderers\\blocks\\RichTextBlock\\index

src\components\renderers\blocks\RichTextBlock\index module.

## components/blocks/RichTextBlock

Renders a collapsible frosted panel containing one or more
paragraphs of rich text content.

### RichTextBlock

Renders a collapsible panel containing one or more paragraphs of rich text. Intended for use as a content block within feature or section layouts.

Rendering notes:
- Returns `null` if no valid paragraph content is provided
- Each paragraph is rendered as a separate `
` element
- Panel header is conditionally rendered when a title is supplied

Accessibility:
- Uses `role="region"` to denote a landmark section
- Applies `aria-label` when a title is present

**Parameters**

- `props` (`object`) - Component props. - Each paragraph is rendered as a separate ` ` element - Panel header is conditionally rendered when a title is supplied Accessibility: - Uses `role="region"` to denote a landmark section - Applies `aria-label` when a title is present
- `props` (`object`) - Component props.
- `props.id` (`string`, optional) - DOM id assigned to the panel container, used as a scroll anchor and for accessibility.
- `props.title` (`string`, optional) - Optional heading displayed in the panel header.
- `props.content` (`Array<string> | RichTextNode`) - Paragraph text content to render.

**Returns**

- `JSX.Element | null` - Rendered rich text panel or null if empty.

## components/renderers/blocks/VideoBlock

Accessible video content block for self-hosted product demonstrations.

### VideoBlock()

Renders a self-hosted product demonstration with browser-native controls.

**Parameters**

- `props` (`object`) - Declarative video block fields.
- `props.block` (`object`, optional) - Optional nested block payload.
- `props.id` (`string`, optional) - DOM anchor for section navigation.
- `props.title` (`string`, optional) - Collapsible panel title.
- `props.src` (`string`, optional) - Bundled or public media source.
- `props.mimeType` (`string`, optional, default: `"video/mp4"`) - Source MIME type.
- `props.caption` (`string`, optional) - Visible context below the media.
- `props.ariaLabel` (`string`, optional) - Accessible name for the video element.

**Returns**

- `JSX.Element | null` - The video block when a source is available.
