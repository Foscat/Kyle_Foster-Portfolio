# Types

## types/navigation

Shared navigation-related type definitions used across the
section registry, scroll persistence, and navigation components.

### PageRoute

Route types

- Type: `string`

### NavigationSection

Represents a single navigable section registered with the application.

- Type: `Object`

**Properties**

- `id` (`string`) - Unique identifier for the section (used as anchor/hash).
- `label` (`string`) - Human-readable label displayed in navigation UI.
- `order` (`number`) - Sort order determining vertical and nav placement.
- `element` (`HTMLElement | null`) - DOM element associated with the section.
- `hidden` (`boolean`, optional) - Whether the section should be excluded from nav.

### SectionRegistry

Map of section IDs to their registered section metadata.

- Type: `Object<string, NavigationSection>`

### ScrollPositionState

Describes the scroll position state persisted between navigations.

- Type: `Object`

**Properties**

- `x` (`number`) - Horizontal scroll offset.
- `y` (`number`) - Vertical scroll offset.
- `pathname` (`string`) - Pathname associated with the saved position.

### RegisterSection

Function signature used to register a section with the registry.

- Type: `function`

**Parameters**

- `section` (`NavigationSection`) - Section metadata to register.

**Returns**

- `void`

### UnregisterSection

Function signature used to unregister a section from the registry.

- Type: `function`

**Parameters**

- `sectionId` (`string`) - ID of the section to remove.

**Returns**

- `void`

## types/ui

Shared UI-related type definitions used across components,
including buttons, icons, layout utilities, block renderers, and markdown documentation.
Provides JSDoc typedefs for all UI component props, enums for styling variants,
factory functions for initializing block structures, and the central block renderer registry.

### Size

Component size variants

- Type: `string`

### Variant

Visual style variants

- Type: `string`

### Theme

Theme variants

- Type: `string`

### Palette

Palette variants

- Type: `string`

### createFeatureImage

Create a default FeatureImage using base

**Parameters**

- `block` (`object`)

**Returns**

- `FeatureImage`

### createImageGalleryBlock

Create a default ImageGalleryBlock

**Parameters**

- `block` (`Partial<ImageGalleryBlock>`) - Image gallery block properties.

**Returns**

- `ImageGalleryBlock`

### createImageTextSplitBlock

Create a default ImageTextSplitBlock

**Parameters**

- `block` (`Partial<ImageTextSplitBlock>`) - Image/text split block properties.

**Returns**

- `ImageTextSplitBlock`

### createRichTextBlock

Create a default RichTextBlock

**Parameters**

- `block` (`Partial<RichTextBlock>`) - Rich text block properties.

**Returns**

- `RichTextBlock`

### createDiagramBlock

Create a default DiagramBlock

**Parameters**

- `block` (`Partial<BulletListBlock>`) - Diagram block properties.

**Returns**

- `DiagramBlock`

### createCardGridBlock

Create a default CardGridBlock

**Parameters**

- `block` (`Partial<CardGridBlock>`) - Card grid block properties.

**Returns**

- `CardGridBlock`

### createBulletListBlock

Create a default BulletListBlock

**Parameters**

- `block` (`Partial<BulletListBlock>`) - Bullet list block properties.

**Returns**

- `BulletListBlock`

### createLinkListBlock

Create a default LinkListBlock

**Parameters**

- `block` (`Partial<LinkListBlock>`) - Link list block properties.

**Returns**

- `LinkListBlock`

### createHeroBlock

Create a default HeroBlock

**Parameters**

- `block` (`Partial<HeroBlock>`) - Hero block properties.

**Returns**

- `HeroBlock`

### createFormBlock

Create a default FormBlock

**Parameters**

- `block` (`Partial<FormBlock>`) - Form block properties.

**Returns**

- `FormBlock`

### createFeatureSection

Create a default FeatureSection

**Parameters**

- `section` (`Partial<FeatureSection>`, optional, default: `{}`) - Feature section properties.

**Returns**

- `FeatureSection` - Initialized feature section with default values.

### createMarkdownDocsBlock

Factory function to initialize a markdown documentation block with necessary defaults.
Ensures proper structure for rendering documentation from portfolio docs registry with configurable
table of contents and navigation.

**Parameters**

- `block` (`Partial<MarkdownDocsBlock>`) - Markdown docs block properties.

**Returns**

- `MarkdownDocsBlock` - Initialized markdown docs block with applied defaults.

### isValidEnumValue

Validate enum membership at runtime

**Parameters**

- `enumObj` (`object`) - Enum object.
- `value` (`any`) - Value to test.

**Returns**

- `boolean` - True if valid enum value.

### TOP

Top-center placement (default)

### TOP\_START

Top-left placement

### TOP\_END

Top-right placement

### BOTTOM

Bottom-center placement

### BOTTOM\_START

Bottom-left placement

### BOTTOM\_END

Bottom-right placement

### LEFT

Left-center placement

### LEFT\_START

Left-top placement

### LEFT\_END

Left-bottom placement

### RIGHT

Right-center placement

### RIGHT\_START

Right-top placement

### RIGHT\_END

Right-bottom placement

### NONE

No hover animation. Use for static elements or where motion would be distracting.

### LIFT

Subtle vertical lift. Maps to a small translateY + shadow. Safe for glass UIs.

### HIGHLIGHT

Background color change only. No transform, no shadow. Use for text links or low-emphasis actions.

### EMPHASIZE

Shadow emphasis without movement. Use when layout stability is critical.

### TooltipPlacement

Standardized tooltip placement options for RSuite components.
This enum provides a centralized reference for all tooltip placements used across the application, ensuring consistency and ease of maintenance.
Each value corresponds to a valid placement option accepted by RSuite's tooltip components, allowing developers to use descriptive keys instead of hardcoding strings throughout the codebase.
For example, instead of using "bottomStart" directly in a component, developers can use `TooltipPlacement.BOTTOM_START`, which improves readability and reduces the risk of typos.
When adding new placements, simply include them in this enum to maintain a single source of truth for tooltip positioning.

- Type: `Object`

### AccordionVariants

Standardized variant options for accordion components.
This enum provides a centralized reference for all accordion variants used across the application, ensuring consistency in styling and behavior.
Each value corresponds to a specific visual style or behavior pattern for accordion components, allowing developers to use descriptive keys instead of hardcoding strings throughout the codebase.
For example, instead of using "default" directly in a component, developers can use `AccordionVariants.DEFAULT`, which improves readability and reduces the risk of typos.
When adding new variants, simply include them in this enum to maintain a single source of truth for accordion styling options.

- Type: `Object`

### BlockType

Enumeration of block types used to define the structure of feature sections.
Each block type corresponds to a specific layout or content pattern, enabling dynamic rendering
of feature sections based on their defined block type. Each type has an associated renderer component
in the `BLOCK_RENDERERS` registry and required fields defined in `blockSchemas`.

**Available block types:**
- **HERO**: Full-width hero section with background image, title, subtitle, and call-to-action.
- **RICH_TEXT**: Custom rich text content using nested node structure for fine-grained control.
- **IMAGE_GALLERY**: Responsive gallery of images with metadata (alt text, captions, titles).
- **IMAGE_TEXT_SPLIT**: Two-column layout with a single image on one side and rich text content on the other.
- **DIAGRAM**: Mermaid diagram definitions with separate desktop and mobile variants.
- **CARD_GRID**: Grid layout of insight cards with customizable column count and variant styling.
- **BULLETED_LIST**: List of bullet items rendered as expandable accordion sections for progressive disclosure.
- **LINKS**: Collection of styled link items with optional icons, tooltips, and size variants.
- **MARKDOWN_DOCS**: Portfolio documentation fetched and rendered as collapsible panels with auto-generated table of contents.

**To add new block types:**
1. Add new constant to this enum (uppercase with underscores)
2. Create renderer component and add it to `BLOCK_RENDERERS`
3. Define required fields in `blockSchemas`
4. Create factory function (e.g., `createNewBlock()`)
5. Update `FeatureBlock` union typedef

- Type: `string`

### blockSchemas

Defines the required fields for each block type in the feature section registry.
Used as validation reference to ensure block configurations contain all necessary data for proper rendering.
Each key corresponds to a BlockType, and its value is an array of required field names.

**Field reference by block type:**
- **hero**: `title`, `subtitle`, `backgroundImage` - Hero section content and background.
- **richText**: `content`, `title` - Rich text nodes array and section heading.
- **imageGallery**: `images`, `title` - Image metadata array and section heading.
- **imageTextSplit**: `image`, `content`, `title` - Single image metadata, rich text node array, and section heading.
- **diagram**: `desktopDiagram`, `mobileDiagram`, `title` - Device-specific diagram definitions and heading.
- **bulletedList**: `items`, `title`, `subtitle` - Bullet items, heading, and optional description.
- **links**: `links`, `title` - Link item array and section heading.
- **cardGrid**: `cards`, `columns`, `title`, `subtitle`, `icon` - Card items, layout columns, and headers.
- **markdownDocs**: `docSlugs`, `title`, `intro` - Documentation slugs to fetch and section headers.

**Usage in validation:**
```js
const requiredFields = blockSchemas[block.type];
const isValid = requiredFields.every(field => field in block);
```

**When adding new block types:** Add a new entry with all required field names to maintain validation consistency.

- Type: `Array<string>`

### BLOCK\_RENDERERS

Central registry mapping BlockType enums to their corresponding React renderer components.
Enables dynamic block rendering in feature sections without conditional logic.
Each renderer component accepts a `block` prop conforming to its corresponding BlockType schema.

**Renderers included:**
- **HERO**: {@link HeroBlock} - Full-width hero section with background image and CTA.
- **RICH_TEXT**: {@link RichTextBlock} - Custom rich text content with nested node trees.
- **IMAGE_GALLERY**: {@link ImageGalleryBlock} - Responsive image gallery with metadata.
- **IMAGE_TEXT_SPLIT**: {@link ImageTextSplitBlock} - Split layout with one image and rich text content.
- **DIAGRAM**: {@link MermaidDiagram} - Mermaid diagram definitions with desktop/mobile variants.
- **CARD_GRID**: {@link CardGridBlock} - Grid layout of insight cards with customizable columns.
- **BULLETED_LIST**: {@link AccordionList} - Bullet items rendered as expandable accordion sections.
- **LINKS**: {@link LinksBlock} - Collection of styled link items with optional icons and tooltips.
- **MARKDOWN_DOCS**: {@link MarkdownDocsBlock} - Portfolio documentation rendered as collapsible panels with TOC.

**Usage example:**
```js
const blockComponent = BLOCK_RENDERERS[block.type];
return blockComponent ? <blockComponent block={block} /> : null;
```

**When adding new block types:**
1. Create renderer component and add type definition (e.g. `NewBlock` variable)
2. Add type to `BlockType` enum (uppercase naming convention)
3. Update `blockSchemas` with required fields for validation
4. Add mapping entry to `BLOCK_RENDERERS`
5. Create factory function `createNewBlock()` in DEFAULT FACTORIES section
6. Update `FeatureBlock` union typedef to include new type

- Type: `Object<BlockType, React.ComponentType>`

### RichTextNodeType

Enumeration of node types for rich text content. Each type corresponds to a specific HTML element or inline formatting option, such as paragraphs, strong emphasis, links, code blocks, lists, blockquotes, and inline icons. This enum serves as a reference for defining the structure of rich text content and guiding the rendering logic for each node type.

- Type: `RichTextNode`

### createBulletItem()

Create a default BulletListItem

**Parameters**

- `item` (`Partial<BulletListBlock>`) - Bullet item properties.
- `position` (`number`, optional) - Index position used for generating fallback ids.

**Returns**

- `BulletItem`

### createInsightCard()

Create a default InsightCard

**Parameters**

- `item` (`Partial<InsightCard>`) - Insight card properties.
- `position` (`number`, optional) - Index position used for generating fallback ids.

**Returns**

- `InsightCard`

### RichTextNode

Enumeration of node types for rich text content. Each type corresponds to a specific HTML element or inline formatting option, such as paragraphs, strong emphasis, links, code blocks, lists, blockquotes, and inline icons. This enum serves as a reference for defining the structure of rich text content and guiding the rendering logic for each node type.

- Type: `Object<string, string>`

**Properties**

- `TEXT` (`string`) - Plain text node.
- `PARAGRAPH` (`string`) - Paragraph block node.
- `STRONG` (`string`) - Strong emphasis (bold) node.
- `EMPHASIS` (`string`) - Emphasis (italic) node.
- `ANCHOR` (`string`) - Hyperlink node.
- `CODE` (`string`) - Inline code node.
- `PRE` (`string`) - Preformatted code block node.
- `UNORDERED_LIST` (`string`) - Unordered list block node.
- `ORDERED_LIST` (`string`) - Ordered list block node.
- `LIST_ITEM` (`string`) - List item node.
- `BLOCKQUOTE` (`string`) - Blockquote node.
- `INLINE_ICON` (`string`) - Inline icon node.

### RichTextNode

- Type: `object`

**Properties**

- `type` (`'text' | 'p' | 'strong' | 'em' | 'a' | 'code' | 'pre' | 'ul' | 'ol' | 'li' | 'blockquote' | 'inlineIcon'`) - Node type identifier that determines rendering behavior.
- `text` (`string`, optional) - Text content for inline nodes and code blocks.
- `href` (`string`, optional) - Destination URL for anchor (`a`) nodes.
- `language` (`string`, optional) - Programming language identifier for syntax-highlighted code blocks.
- `icon` (`string`, optional) - Icon identifier used by `inlineIcon` nodes.
- `children` (`Array<RichTextNode>`, optional) - Nested child nodes for block-level or composite elements.

### FeatureImage

Image metadata

- Type: `object`

**Properties**

- `src` (`string`) - Relative image path.
- `alt` (`string`) - Accessible alt text.
- `title` (`string`) - Short title or tooltip.
- `caption` (`string`, optional) - Optional description.
- `ariaLabel` (`string`, optional) - Screen-reader label.

### LinkItem

Link item definition

- Type: `object`

**Properties**

- `url` (`string`) - Destination URL.
- `title` (`string`, optional) - Display label.
- `icon` (`string`, optional) - Optional icon key.
- `size` (`"xs" | "sm" | "md" | "lg" | "xl"`, optional, default: `"sm"`) - Size variant.
- `variant` (`"primary" | "secondary" | "accent" | "subtle" | "danger"`, optional, default: `"primary"`) - Visual style.
- `local` (`boolean`, optional, default: `false`) - Internal navigation.
- `isScroller` (`boolean`, optional, default: `false`) - Scroll-to-anchor behavior.
- `resumePreview` (`boolean`, optional, default: `false`) - Renders a resume preview trigger instead of a direct link.
- `ariaLabel` (`string`, optional) - Screen-reader label.
- `download` (`boolean`, optional, default: `false`) - Download flag.
- `tooltip` (`string`, optional) - Hover tooltip text.
- `target` (`string`, optional) - Anchor target attribute.
- `rel` (`string`, optional) - Relationship attribute.

### BulletItem

Bullet list item

- Type: `object`

**Properties**

- `id` (`string`) - DOM id or scroll target.
- `text` (`string`) - Bullet content.
- `title` (`string`, optional) - Optional heading.
- `icon` (`string`, optional) - Optional icon key.
- `isScroller` (`boolean`, optional, default: `false`) - Scroll-to-anchor behavior.
- `isLink` (`boolean`, optional, default: `false`) - Acts as a link.
- `url` (`string`, optional) - Destination URL.

### InsightCard

InsightCard

- Type: `object`

**Properties**

- `id` (`string`) - Unique card identifier.
- `title` (`string`) - Card title.
- `subtitle` (`string`, optional) - Optional subtitle.
- `icon` (`string`, optional) - Optional icon key.
- `variant` (`Variant`, optional, default: `"primary"`) - Visual style variant.
- `previewImage` (`FeatureImage | null`, optional) - Optional expandable preview image.
- `content` (`RichTextNode`) - Card content, either as rich text nodes or plain string.

### CardGridBlock

CardGridBlock

- Type: `object`

**Properties**

- `id` (`string`) - Unique block identifier.
- `type` (`"cardGrid"`) - Block discriminator.
- `title` (`string`) - Section title.
- `columns` (`number`, optional, default: `3`) - Number of grid columns.
- `items` (`Array<InsightCard>`) - Array of card items to display.

### DiagramVariant

Diagram Variant

- Type: `object`

**Properties**

- `diagram` (`string`) - Mermaid.js definition.
- `description` (`RichTextNode | string`) - Diagram explanation.

### DiagramBlock

Diagram block

- Type: `object`

**Properties**

- `type` (`"diagram"`) - Block discriminator.
- `title` (`string`) - Diagram title.
- `desktop` (`DiagramVariant`) - Mermaid.js definition an description optomized for desktop.
- `mobile` (`DiagramVariant`) - Mermaid.js definition and description optomized for mobile devices.
- `theme` (`"light" | "dark" | "auto"`, optional, default: `"auto"`) - Theme preference.
- `description` (`string`, optional) - Optional explanation.
- `collapsible` (`boolean`, optional, default: `true`) - Allow collapse.

### ImageGalleryBlock

Image gallery block

- Type: `object`

**Properties**

- `type` (`"imageGallery"`) - Block discriminator.
- `title` (`string`, optional) - Optional heading.
- `images` (`Array<FeatureImage>`) - Images to render.

### ImageTextSplitBlock

Image + rich text split block

- Type: `object`

**Properties**

- `type` (`"imageTextSplit"`) - Block discriminator.
- `title` (`string`, optional) - Optional heading.
- `image` (`FeatureImage`) - Single image metadata object.
- `imagePosition` (`"left" | "right"`, optional, default: `"left"`) - Side of the image on desktop view.
- `content` (`Array<RichTextNode> | Array<string>`) - Rich text content rendered opposite the image.

### BulletListBlock

Bullet list block

- Type: `object`

**Properties**

- `type` (`"bulletedList"`) - Block discriminator.
- `title` (`string`, optional) - Optional heading.
- `items` (`Array<BulletItem>`) - Bullet items.

### LinkListBlock

Link list block

- Type: `object`

**Properties**

- `type` (`"links"`) - Block discriminator.
- `title` (`string`, optional) - Optional heading.
- `links` (`Array<LinkItem>`) - Links to render.

### MarkdownHeading

Markdown heading entry for table of contents

- Type: `object`

**Properties**

- `level` (`number`) - Heading level (1-6), corresponds to h1-h6 tags.
- `text` (`string`) - Cleaned heading text without markdown formatting.
- `id` (`string`) - Generated unique ID slug for anchor linking, auto-suffixed if duplicates exist.

### MarkdownRendererProps

Markdown renderer props

- Type: `object`

**Properties**

- `content` (`string`) - Raw markdown content to render.
- `title` (`string`, optional) - Optional heading displayed above markdown content.
- `intro` (`string`, optional) - Optional introductory paragraph displayed above markdown.
- `articleId` (`string`, optional) - Optional id attribute applied to the article root element for deep linking.
- `showToc` (`boolean`, optional, default: `true`) - Show auto-generated table of contents from headings.
- `maxTocDepth` (`number`, optional, default: `3`) - Maximum heading depth included in table of contents (1-6).
- `className` (`string`, optional) - Optional additional CSS class names applied to the article root.

### MarkdownDocsBlock

Markdown documentation block

- Type: `object`

**Properties**

- `type` (`"MARKDOWN_DOCS"`) - Block discriminator.
- `id` (`string`) - Unique block identifier.
- `title` (`string`) - Section title displayed above the documentation list.
- `intro` (`string`, optional) - Optional introductory text describing the documentation section.
- `docSlugs` (`Array<string>`) - Array of documentation slugs to fetch and render from the portfolio docs registry.
- `showToc` (`boolean`, optional, default: `true`) - Show table of contents for each document being rendered.
- `showDocJumpList` (`boolean`, optional, default: `true`) - Show navigation list linking to each document in the stack.

### FeatureBlock

Union of all feature blocks

- Type: `RichTextBlock | ImageGalleryBlock | ImageTextSplitBlock | DiagramBlock | BulletListBlock | LinkListBlock | MarkdownDocsBlock`

### FeatureSection

Feature section definition

- Type: `object`

**Properties**

- `id` (`string`) - DOM anchor id.
- `title` (`string`) - Section title.
- `subtitle` (`string`, optional) - Optional subtitle.
- `icon` (`string`, optional) - Icon key.
- `isScroller` (`boolean`, optional, default: `false`) - Used by sticky nav.
- `blocks` (`Array<FeatureBlock>`) - Content blocks.

### BaseUIProps

Base props shared by most interactive UI components.

- Type: `Object`

**Properties**

- `variant` (`Variant`, optional) - Visual style variant.
- `size` (`Size`, optional) - Component size.
- `disabled` (`boolean`, optional) - Whether the component is disabled.
- `className` (`string`, optional) - Optional additional CSS class names.

### IconConfig

Describes an icon configuration used by icon-based components.

- Type: `Object`

**Properties**

- `name` (`string`) - Icon identifier or asset key.
- `size` (`number`, optional) - Icon size in pixels.
- `color` (`string`, optional) - CSS color value applied to the icon.

## FormFieldOption

- Type: `Object`

**Properties**

- `label` (`string`) - Human-readable option label.
- `value` (`any`) - Stored value for the option.
- `disabled` (`boolean`, optional, default: `false`) - Whether this option is disabled.

## InputGroupConfig

- Type: `Object`

**Properties**

- `prefix` (`string`, optional) - Optional leading addon text.
- `suffix` (`string`, optional) - Optional trailing addon text.

## FormFieldConfig

- Type: `Object`

**Properties**

- `name` (`string`) - Unique field name. Supports nested paths like `contact.email`.
- `type` (`string`) - Field type. Prefer values from FIELD_TYPES.
- `label` (`string`, optional) - Visible label for the field.
- `helpText` (`string`, optional) - Optional helper copy shown below the field.
- `placeholder` (`string`, optional) - Placeholder text when supported.
- `defaultValue` (`any`, optional) - Initial field value.
- `options` (`Array<FormFieldOption>`, optional) - Option data for select, checkboxGroup, and radioGroup.
- `required` (`boolean`, optional, default: `false`) - Whether the field is required in the UI layer.
- `disabled` (`boolean`, optional, default: `false`) - Whether the field is disabled.
- `readOnly` (`boolean`, optional, default: `false`) - Whether the field is read-only.
- `hidden` (`boolean`, optional, default: `false`) - Whether the field is hidden.
- `block` (`boolean`, optional, default: `true`) - Whether picker-like controls should span full width.
- `componentProps` (`Object`, optional) - Props forwarded to the underlying RSuite control.
- `rule` (`Object`, optional) - Optional RSuite field-level validation rule.
- `errorPlacement` (`string`, optional, default: `"bottomStart"`) - Error placement for Form.Control.
- `shouldResetWithUnmount` (`boolean`, optional, default: `false`) - Clear value if field unmounts conditionally.
- `inputGroup` (`InputGroupConfig`, optional) - Prefix/suffix config for inputGroupText fields.
- `renderWhen` (`function`, optional) - Conditional render predicate.

## FormBlockSchema

- Type: `Object`

**Properties**

- `id` (`string`, optional) - Stable schema id.
- `title` (`string`, optional) - Optional panel title.
- `submitLabel` (`string`, optional, default: `"Submit"`) - Submit button label.
- `resetLabel` (`string`, optional) - Optional reset button label.
- `fields` (`Array<FormFieldConfig>`) - Array of field configuration objects.
- `initialValues` (`Object`, optional) - Optional initial form value override.
