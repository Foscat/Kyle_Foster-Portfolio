## Modules

<dl>
<dt><a href="#module_types/navigation">types/navigation</a></dt>
<dd><p>Shared navigation-related type definitions used across the
section registry, scroll persistence, and navigation components.</p>
</dd>
<dt><a href="#module_types/ui">types/ui</a></dt>
<dd><p>Shared UI-related type definitions used across components,
including buttons, icons, layout utilities, block renderers, and markdown documentation.
Provides JSDoc typedefs for all UI component props, enums for styling variants,
factory functions for initializing block structures, and the central block renderer registry.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#FormFieldOption">FormFieldOption</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#InputGroupConfig">InputGroupConfig</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FormFieldConfig">FormFieldConfig</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#FormBlockSchema">FormBlockSchema</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_types/navigation"></a>

## types/navigation
Shared navigation-related type definitions used across thesection registry, scroll persistence, and navigation components.


* [types/navigation](#module_types/navigation)
    * _static_
        * [.PageRoute](#module_types/navigation.PageRoute) : <code>enum</code>
    * _inner_
        * [~NavigationSection](#module_types/navigation..NavigationSection) : <code>Object</code>
        * [~SectionRegistry](#module_types/navigation..SectionRegistry) : <code>Object.&lt;string, NavigationSection&gt;</code>
        * [~ScrollPositionState](#module_types/navigation..ScrollPositionState) : <code>Object</code>
        * [~RegisterSection](#module_types/navigation..RegisterSection) ⇒ <code>void</code>
        * [~UnregisterSection](#module_types/navigation..UnregisterSection) ⇒ <code>void</code>

<a name="module_types/navigation.PageRoute"></a>

### types/navigation.PageRoute : <code>enum</code>
Route types

**Kind**: static enum of [<code>types/navigation</code>](#module_types/navigation)  
**Read only**: true  
<a name="module_types/navigation..NavigationSection"></a>

### types/navigation~NavigationSection : <code>Object</code>
Represents a single navigable section registered with the application.

**Kind**: inner typedef of [<code>types/navigation</code>](#module_types/navigation)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Unique identifier for the section (used as anchor/hash). |
| label | <code>string</code> | Human-readable label displayed in navigation UI. |
| order | <code>number</code> | Sort order determining vertical and nav placement. |
| element | <code>HTMLElement</code> \| <code>null</code> | DOM element associated with the section. |
| [hidden] | <code>boolean</code> | Whether the section should be excluded from nav. |

<a name="module_types/navigation..SectionRegistry"></a>

### types/navigation~SectionRegistry : <code>Object.&lt;string, NavigationSection&gt;</code>
Map of section IDs to their registered section metadata.

**Kind**: inner typedef of [<code>types/navigation</code>](#module_types/navigation)  
<a name="module_types/navigation..ScrollPositionState"></a>

### types/navigation~ScrollPositionState : <code>Object</code>
Describes the scroll position state persisted between navigations.

**Kind**: inner typedef of [<code>types/navigation</code>](#module_types/navigation)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | Horizontal scroll offset. |
| y | <code>number</code> | Vertical scroll offset. |
| pathname | <code>string</code> | Pathname associated with the saved position. |

<a name="module_types/navigation..RegisterSection"></a>

### types/navigation~RegisterSection ⇒ <code>void</code>
Function signature used to register a section with the registry.

**Kind**: inner typedef of [<code>types/navigation</code>](#module_types/navigation)  

| Param | Type | Description |
| --- | --- | --- |
| section | <code>NavigationSection</code> | Section metadata to register. |

<a name="module_types/navigation..UnregisterSection"></a>

### types/navigation~UnregisterSection ⇒ <code>void</code>
Function signature used to unregister a section from the registry.

**Kind**: inner typedef of [<code>types/navigation</code>](#module_types/navigation)  

| Param | Type | Description |
| --- | --- | --- |
| sectionId | <code>string</code> | ID of the section to remove. |

<a name="module_types/ui"></a>

## types/ui
Shared UI-related type definitions used across components,including buttons, icons, layout utilities, block renderers, and markdown documentation.Provides JSDoc typedefs for all UI component props, enums for styling variants,factory functions for initializing block structures, and the central block renderer registry.


* [types/ui](#module_types/ui)
    * _static_
        * [.Size](#module_types/ui.Size) : <code>enum</code>
        * [.Variant](#module_types/ui.Variant) : <code>enum</code>
        * [.Theme](#module_types/ui.Theme) : <code>enum</code>
        * [.Palette](#module_types/ui.Palette) : <code>enum</code>
        * [.createFeatureImage](#module_types/ui.createFeatureImage) ⇒ <code>FeatureImage</code>
        * [.createImageGalleryBlock](#module_types/ui.createImageGalleryBlock) ⇒ <code>ImageGalleryBlock</code>
        * [.createRichTextBlock](#module_types/ui.createRichTextBlock) ⇒ <code>RichTextBlock</code>
        * [.createDiagramBlock](#module_types/ui.createDiagramBlock) ⇒ <code>DiagramBlock</code>
        * [.createCardGridBlock](#module_types/ui.createCardGridBlock) ⇒ <code>CardGridBlock</code>
        * [.createBulletListBlock](#module_types/ui.createBulletListBlock) ⇒ <code>BulletListBlock</code>
        * [.createLinkListBlock](#module_types/ui.createLinkListBlock) ⇒ <code>LinkListBlock</code>
        * [.createHeroBlock](#module_types/ui.createHeroBlock) ⇒ <code>HeroBlock</code>
        * [.createFormBlock](#module_types/ui.createFormBlock) ⇒ <code>FormBlock</code>
        * [.createFeatureSection](#module_types/ui.createFeatureSection) ⇒ <code>FeatureSection</code>
        * [.createMarkdownDocsBlock](#module_types/ui.createMarkdownDocsBlock) ⇒ <code>MarkdownDocsBlock</code>
        * [.isValidEnumValue](#module_types/ui.isValidEnumValue) ⇒ <code>boolean</code>
    * _inner_
        * [~TOP](#module_types/ui..TOP)
        * [~TOP_START](#module_types/ui..TOP_START)
        * [~TOP_END](#module_types/ui..TOP_END)
        * [~BOTTOM](#module_types/ui..BOTTOM)
        * [~BOTTOM_START](#module_types/ui..BOTTOM_START)
        * [~BOTTOM_END](#module_types/ui..BOTTOM_END)
        * [~LEFT](#module_types/ui..LEFT)
        * [~LEFT_START](#module_types/ui..LEFT_START)
        * [~LEFT_END](#module_types/ui..LEFT_END)
        * [~RIGHT](#module_types/ui..RIGHT)
        * [~RIGHT_START](#module_types/ui..RIGHT_START)
        * [~RIGHT_END](#module_types/ui..RIGHT_END)
        * [~NONE](#module_types/ui..NONE)
        * [~LIFT](#module_types/ui..LIFT)
        * [~HIGHLIGHT](#module_types/ui..HIGHLIGHT)
        * [~EMPHASIZE](#module_types/ui..EMPHASIZE)
        * [~TooltipPlacement](#module_types/ui..TooltipPlacement) : <code>enum</code>
        * [~AccordionVariants](#module_types/ui..AccordionVariants) : <code>enum</code>
        * *[~BlockType](#module_types/ui..BlockType) : <code>enum</code>*
        * [~blockSchemas](#module_types/ui..blockSchemas) : <code>enum</code>
        * [~BLOCK_RENDERERS](#module_types/ui..BLOCK_RENDERERS) : <code>Object.&lt;BlockType, React.ComponentType&gt;</code>
        * [~RichTextNodeType](#module_types/ui..RichTextNodeType) : <code>RichTextNode</code>
        * [~createBulletItem(item, [position])](#module_types/ui..createBulletItem) ⇒ <code>BulletItem</code>
        * [~createInsightCard(item, [position])](#module_types/ui..createInsightCard) ⇒ <code>InsightCard</code>
        * [~RichTextNode](#module_types/ui..RichTextNode) : <code>Object.&lt;string, string&gt;</code>
        * [~RichTextNode](#module_types/ui..RichTextNode) : <code>object</code>
        * [~FeatureImage](#module_types/ui..FeatureImage) : <code>object</code>
        * [~LinkItem](#module_types/ui..LinkItem) : <code>object</code>
        * [~BulletItem](#module_types/ui..BulletItem) : <code>object</code>
        * [~InsightCard](#module_types/ui..InsightCard) : <code>object</code>
        * [~CardGridBlock](#module_types/ui..CardGridBlock) : <code>object</code>
        * [~DiagramVariant](#module_types/ui..DiagramVariant) : <code>object</code>
        * [~DiagramBlock](#module_types/ui..DiagramBlock) : <code>object</code>
        * [~ImageGalleryBlock](#module_types/ui..ImageGalleryBlock) : <code>object</code>
        * [~BulletListBlock](#module_types/ui..BulletListBlock) : <code>object</code>
        * [~LinkListBlock](#module_types/ui..LinkListBlock) : <code>object</code>
        * [~MarkdownHeading](#module_types/ui..MarkdownHeading) : <code>object</code>
        * [~MarkdownRendererProps](#module_types/ui..MarkdownRendererProps) : <code>object</code>
        * [~MarkdownDocsBlock](#module_types/ui..MarkdownDocsBlock) : <code>object</code>
        * [~FeatureBlock](#module_types/ui..FeatureBlock) : <code>RichTextBlock</code> \| <code>ImageGalleryBlock</code> \| <code>DiagramBlock</code> \| <code>BulletListBlock</code> \| <code>LinkListBlock</code> \| <code>MarkdownDocsBlock</code>
        * [~FeatureSection](#module_types/ui..FeatureSection) : <code>object</code>
        * [~BaseUIProps](#module_types/ui..BaseUIProps) : <code>Object</code>
        * [~IconConfig](#module_types/ui..IconConfig) : <code>Object</code>

<a name="module_types/ui.Size"></a>

### types/ui.Size : <code>enum</code>
Component size variants

**Kind**: static enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui.Variant"></a>

### types/ui.Variant : <code>enum</code>
Visual style variants

**Kind**: static enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui.Theme"></a>

### types/ui.Theme : <code>enum</code>
Theme variants

**Kind**: static enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui.Palette"></a>

### types/ui.Palette : <code>enum</code>
Palette variants

**Kind**: static enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui.createFeatureImage"></a>

### types/ui.createFeatureImage ⇒ <code>FeatureImage</code>
Create a default FeatureImage using base

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type |
| --- | --- |
| block | <code>object</code> | 

<a name="module_types/ui.createImageGalleryBlock"></a>

### types/ui.createImageGalleryBlock ⇒ <code>ImageGalleryBlock</code>
Create a default ImageGalleryBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;ImageGalleryBlock&gt;</code> | Image gallery block properties. |

<a name="module_types/ui.createRichTextBlock"></a>

### types/ui.createRichTextBlock ⇒ <code>RichTextBlock</code>
Create a default RichTextBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;RichTextBlock&gt;</code> | Rich text block properties. |

<a name="module_types/ui.createDiagramBlock"></a>

### types/ui.createDiagramBlock ⇒ <code>DiagramBlock</code>
Create a default DiagramBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;BulletListBlock&gt;</code> | Diagram block properties. |

<a name="module_types/ui.createCardGridBlock"></a>

### types/ui.createCardGridBlock ⇒ <code>CardGridBlock</code>
Create a default CardGridBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;CardGridBlock&gt;</code> | Card grid block properties. |

<a name="module_types/ui.createBulletListBlock"></a>

### types/ui.createBulletListBlock ⇒ <code>BulletListBlock</code>
Create a default BulletListBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;BulletListBlock&gt;</code> | Bullet list block properties. |

<a name="module_types/ui.createLinkListBlock"></a>

### types/ui.createLinkListBlock ⇒ <code>LinkListBlock</code>
Create a default LinkListBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;LinkListBlock&gt;</code> | Link list block properties. |

<a name="module_types/ui.createHeroBlock"></a>

### types/ui.createHeroBlock ⇒ <code>HeroBlock</code>
Create a default HeroBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;HeroBlock&gt;</code> | Hero block properties. |

<a name="module_types/ui.createFormBlock"></a>

### types/ui.createFormBlock ⇒ <code>FormBlock</code>
Create a default FormBlock

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;FormBlock&gt;</code> | Form block properties. |

<a name="module_types/ui.createFeatureSection"></a>

### types/ui.createFeatureSection ⇒ <code>FeatureSection</code>
Create a default FeatureSection

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  
**Returns**: <code>FeatureSection</code> - Initialized feature section with default values.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [section] | <code>Partial.&lt;FeatureSection&gt;</code> | <code>{}</code> | Feature section properties. |

<a name="module_types/ui.createMarkdownDocsBlock"></a>

### types/ui.createMarkdownDocsBlock ⇒ <code>MarkdownDocsBlock</code>
Factory function to initialize a markdown documentation block with necessary defaults.Ensures proper structure for rendering documentation from portfolio docs registry with configurabletable of contents and navigation.

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  
**Returns**: <code>MarkdownDocsBlock</code> - Initialized markdown docs block with applied defaults.  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Partial.&lt;MarkdownDocsBlock&gt;</code> | Markdown docs block properties. |

<a name="module_types/ui.isValidEnumValue"></a>

### types/ui.isValidEnumValue ⇒ <code>boolean</code>
Validate enum membership at runtime

**Kind**: static constant of [<code>types/ui</code>](#module_types/ui)  
**Returns**: <code>boolean</code> - True if valid enum value.  

| Param | Type | Description |
| --- | --- | --- |
| enumObj | <code>object</code> | Enum object. |
| value | <code>\*</code> | Value to test. |

<a name="module_types/ui..TOP"></a>

### types/ui~TOP
Top-center placement (default)

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..TOP_START"></a>

### types/ui~TOP\_START
Top-left placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..TOP_END"></a>

### types/ui~TOP\_END
Top-right placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..BOTTOM"></a>

### types/ui~BOTTOM
Bottom-center placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..BOTTOM_START"></a>

### types/ui~BOTTOM\_START
Bottom-left placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..BOTTOM_END"></a>

### types/ui~BOTTOM\_END
Bottom-right placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..LEFT"></a>

### types/ui~LEFT
Left-center placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..LEFT_START"></a>

### types/ui~LEFT\_START
Left-top placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..LEFT_END"></a>

### types/ui~LEFT\_END
Left-bottom placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..RIGHT"></a>

### types/ui~RIGHT
Right-center placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..RIGHT_START"></a>

### types/ui~RIGHT\_START
Right-top placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..RIGHT_END"></a>

### types/ui~RIGHT\_END
Right-bottom placement

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..NONE"></a>

### types/ui~NONE
No hover animation. Use for static elements or where motion would be distracting.

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..LIFT"></a>

### types/ui~LIFT
Subtle vertical lift. Maps to a small translateY + shadow. Safe for glass UIs.

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..HIGHLIGHT"></a>

### types/ui~HIGHLIGHT
Background color change only. No transform, no shadow. Use for text links or low-emphasis actions.

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..EMPHASIZE"></a>

### types/ui~EMPHASIZE
Shadow emphasis without movement. Use when layout stability is critical.

**Kind**: inner property of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..TooltipPlacement"></a>

### types/ui~TooltipPlacement : <code>enum</code>
Standardized tooltip placement options for RSuite components.This enum provides a centralized reference for all tooltip placements used across the application, ensuring consistency and ease of maintenance.Each value corresponds to a valid placement option accepted by RSuite's tooltip components, allowing developers to use descriptive keys instead of hardcoding strings throughout the codebase.For example, instead of using "bottomStart" directly in a component, developers can use `TooltipPlacement.BOTTOM_START`, which improves readability and reduces the risk of typos.When adding new placements, simply include them in this enum to maintain a single source of truth for tooltip positioning.

**Kind**: inner enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui..AccordionVariants"></a>

### types/ui~AccordionVariants : <code>enum</code>
Standardized variant options for accordion components.This enum provides a centralized reference for all accordion variants used across the application, ensuring consistency in styling and behavior.Each value corresponds to a specific visual style or behavior pattern for accordion components, allowing developers to use descriptive keys instead of hardcoding strings throughout the codebase.For example, instead of using "default" directly in a component, developers can use `AccordionVariants.DEFAULT`, which improves readability and reduces the risk of typos.When adding new variants, simply include them in this enum to maintain a single source of truth for accordion styling options.

**Kind**: inner enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui..BlockType"></a>

### *types/ui~BlockType : <code>enum</code>*
Enumeration of block types used to define the structure of feature sections.Each block type corresponds to a specific layout or content pattern, enabling dynamic renderingof feature sections based on their defined block type. Each type has an associated renderer componentin the `BLOCK_RENDERERS` registry and required fields defined in `blockSchemas`.**Available block types:**- **HERO**: Full-width hero section with background image, title, subtitle, and call-to-action.- **RICH_TEXT**: Custom rich text content using nested node structure for fine-grained control.- **IMAGE_GALLERY**: Responsive gallery of images with metadata (alt text, captions, titles).- **DIAGRAM**: Mermaid diagram definitions with separate desktop and mobile variants.- **CARD_GRID**: Grid layout of insight cards with customizable column count and variant styling.- **BULLETED_LIST**: List of bullet items rendered as expandable accordion sections for progressive disclosure.- **LINKS**: Collection of styled link items with optional icons, tooltips, and size variants.- **MARKDOWN_DOCS**: Portfolio documentation fetched and rendered as collapsible panels with auto-generated table of contents.**To add new block types:**1. Add new constant to this enum (uppercase with underscores)2. Create renderer component and add it to `BLOCK_RENDERERS`3. Define required fields in `blockSchemas`4. Create factory function (e.g., `createNewBlock()`)5. Update `FeatureBlock` union typedef

**Kind**: inner abstract enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui..blockSchemas"></a>

### types/ui~blockSchemas : <code>enum</code>
Defines the required fields for each block type in the feature section registry.Used as validation reference to ensure block configurations contain all necessary data for proper rendering.Each key corresponds to a BlockType, and its value is an array of required field names.**Field reference by block type:**- **hero**: `title`, `subtitle`, `backgroundImage` - Hero section content and background.- **richText**: `content`, `title` - Rich text nodes array and section heading.- **imageGallery**: `images`, `title` - Image metadata array and section heading.- **diagram**: `desktopDiagram`, `mobileDiagram`, `title` - Device-specific diagram definitions and heading.- **bulletedList**: `items`, `title`, `subtitle` - Bullet items, heading, and optional description.- **links**: `links`, `title` - Link item array and section heading.- **cardGrid**: `cards`, `columns`, `title`, `subtitle`, `icon` - Card items, layout columns, and headers.- **markdownDocs**: `docSlugs`, `title`, `intro` - Documentation slugs to fetch and section headers.**Usage in validation:**```jsconst requiredFields = blockSchemas[block.type];const isValid = requiredFields.every(field => field in block);```**When adding new block types:** Add a new entry with all required field names to maintain validation consistency.

**Kind**: inner enum of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui..BLOCK_RENDERERS"></a>

### types/ui~BLOCK\_RENDERERS : <code>Object.&lt;BlockType, React.ComponentType&gt;</code>
Central registry mapping BlockType enums to their corresponding React renderer components.Enables dynamic block rendering in feature sections without conditional logic.Each renderer component accepts a `block` prop conforming to its corresponding BlockType schema.**Renderers included:**- **HERO**: [HeroBlock](HeroBlock) - Full-width hero section with background image and CTA.- **RICH_TEXT**: [RichTextBlock](RichTextBlock) - Custom rich text content with nested node trees.- **IMAGE_GALLERY**: [ImageGalleryBlock](ImageGalleryBlock) - Responsive image gallery with metadata.- **DIAGRAM**: [MermaidDiagram](MermaidDiagram) - Mermaid diagram definitions with desktop/mobile variants.- **CARD_GRID**: [CardGridBlock](CardGridBlock) - Grid layout of insight cards with customizable columns.- **BULLETED_LIST**: [AccordionList](AccordionList) - Bullet items rendered as expandable accordion sections.- **LINKS**: [LinksBlock](LinksBlock) - Collection of styled link items with optional icons and tooltips.- **MARKDOWN_DOCS**: [MarkdownDocsBlock](MarkdownDocsBlock) - Portfolio documentation rendered as collapsible panels with TOC.**Usage example:**```jsconst blockComponent = BLOCK_RENDERERS[block.type];return blockComponent ? <blockComponent block={block} /> : null;```**When adding new block types:**1. Create renderer component and add type definition (e.g. `NewBlock` variable)2. Add type to `BlockType` enum (uppercase naming convention)3. Update `blockSchemas` with required fields for validation4. Add mapping entry to `BLOCK_RENDERERS`5. Create factory function `createNewBlock()` in DEFAULT FACTORIES section6. Update `FeatureBlock` union typedef to include new type

**Kind**: inner constant of [<code>types/ui</code>](#module_types/ui)  
**Access**: public  
<a name="module_types/ui..RichTextNodeType"></a>

### types/ui~RichTextNodeType : <code>RichTextNode</code>
Enumeration of node types for rich text content. Each type corresponds to a specific HTML element or inline formatting option, such as paragraphs, strong emphasis, links, code blocks, lists, blockquotes, and inline icons. This enum serves as a reference for defining the structure of rich text content and guiding the rendering logic for each node type.

**Kind**: inner constant of [<code>types/ui</code>](#module_types/ui)  
**Read only**: true  
<a name="module_types/ui..createBulletItem"></a>

### types/ui~createBulletItem(item, [position]) ⇒ <code>BulletItem</code>
Create a default BulletListItem

**Kind**: inner method of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Partial.&lt;BulletListBlock&gt;</code> | Bullet item properties. |
| [position] | <code>number</code> | Index position used for generating fallback ids. |

<a name="module_types/ui..createInsightCard"></a>

### types/ui~createInsightCard(item, [position]) ⇒ <code>InsightCard</code>
Create a default InsightCard

**Kind**: inner method of [<code>types/ui</code>](#module_types/ui)  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>Partial.&lt;InsightCard&gt;</code> | Insight card properties. |
| [position] | <code>number</code> | Index position used for generating fallback ids. |

<a name="module_types/ui..RichTextNode"></a>

### types/ui~RichTextNode : <code>Object.&lt;string, string&gt;</code>
Enumeration of node types for rich text content. Each type corresponds to a specific HTML element or inline formatting option, such as paragraphs, strong emphasis, links, code blocks, lists, blockquotes, and inline icons. This enum serves as a reference for defining the structure of rich text content and guiding the rendering logic for each node type.

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| TEXT | <code>string</code> | Plain text node. |
| PARAGRAPH | <code>string</code> | Paragraph block node. |
| STRONG | <code>string</code> | Strong emphasis (bold) node. |
| EMPHASIS | <code>string</code> | Emphasis (italic) node. |
| ANCHOR | <code>string</code> | Hyperlink node. |
| CODE | <code>string</code> | Inline code node. |
| PRE | <code>string</code> | Preformatted code block node. |
| UNORDERED_LIST | <code>string</code> | Unordered list block node. |
| ORDERED_LIST | <code>string</code> | Ordered list block node. |
| LIST_ITEM | <code>string</code> | List item node. |
| BLOCKQUOTE | <code>string</code> | Blockquote node. |
| INLINE_ICON | <code>string</code> | Inline icon node. |

<a name="module_types/ui..RichTextNode"></a>

### types/ui~RichTextNode : <code>object</code>
**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>&#x27;text&#x27;</code> \| <code>&#x27;p&#x27;</code> \| <code>&#x27;strong&#x27;</code> \| <code>&#x27;em&#x27;</code> \| <code>&#x27;a&#x27;</code> \| <code>&#x27;code&#x27;</code> \| <code>&#x27;pre&#x27;</code> \| <code>&#x27;ul&#x27;</code> \| <code>&#x27;ol&#x27;</code> \| <code>&#x27;li&#x27;</code> \| <code>&#x27;blockquote&#x27;</code> \| <code>&#x27;inlineIcon&#x27;</code> | Node type identifier that determines rendering behavior. |
| [text] | <code>string</code> | Text content for inline nodes and code blocks. |
| [href] | <code>string</code> | Destination URL for anchor (`a`) nodes. |
| [language] | <code>string</code> | Programming language identifier for syntax-highlighted code blocks. |
| [icon] | <code>string</code> | Icon identifier used by `inlineIcon` nodes. |
| [children] | <code>Array.&lt;RichTextNode&gt;</code> | Nested child nodes for block-level or composite elements. |

<a name="module_types/ui..FeatureImage"></a>

### types/ui~FeatureImage : <code>object</code>
Image metadata

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| src | <code>string</code> | Relative image path. |
| alt | <code>string</code> | Accessible alt text. |
| title | <code>string</code> | Short title or tooltip. |
| [caption] | <code>string</code> | Optional description. |
| [ariaLabel] | <code>string</code> | Screen-reader label. |

<a name="module_types/ui..LinkItem"></a>

### types/ui~LinkItem : <code>object</code>
Link item definition

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | Destination URL. |
| [title] | <code>string</code> |  | Display label. |
| [icon] | <code>string</code> |  | Optional icon key. |
| [size] | <code>&quot;xs&quot;</code> \| <code>&quot;sm&quot;</code> \| <code>&quot;md&quot;</code> \| <code>&quot;lg&quot;</code> \| <code>&quot;xl&quot;</code> | <code>&quot;sm&quot;</code> | Size variant. |
| [variant] | <code>&quot;primary&quot;</code> \| <code>&quot;secondary&quot;</code> \| <code>&quot;accent&quot;</code> \| <code>&quot;subtle&quot;</code> \| <code>&quot;danger&quot;</code> | <code>&quot;primary&quot;</code> | Visual style. |
| [local] | <code>boolean</code> | <code>false</code> | Internal navigation. |
| [isScroller] | <code>boolean</code> | <code>false</code> | Scroll-to-anchor behavior. |
| [ariaLabel] | <code>string</code> |  | Screen-reader label. |
| [download] | <code>boolean</code> | <code>false</code> | Download flag. |
| [tooltip] | <code>string</code> |  | Hover tooltip text. |
| [target] | <code>string</code> |  | Anchor target attribute. |
| [rel] | <code>string</code> |  | Relationship attribute. |

<a name="module_types/ui..BulletItem"></a>

### types/ui~BulletItem : <code>object</code>
Bullet list item

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | DOM id or scroll target. |
| text | <code>string</code> |  | Bullet content. |
| [title] | <code>string</code> |  | Optional heading. |
| [icon] | <code>string</code> |  | Optional icon key. |
| [isScroller] | <code>boolean</code> | <code>false</code> | Scroll-to-anchor behavior. |
| [isLink] | <code>boolean</code> | <code>false</code> | Acts as a link. |
| [url] | <code>string</code> |  | Destination URL. |

<a name="module_types/ui..InsightCard"></a>

### types/ui~InsightCard : <code>object</code>
InsightCard

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Unique card identifier. |
| title | <code>string</code> |  | Card title. |
| [subtitle] | <code>string</code> |  | Optional subtitle. |
| [icon] | <code>string</code> |  | Optional icon key. |
| [variant] | <code>Variant</code> | <code>&quot;primary&quot;</code> | Visual style variant. |
| content | <code>RichTextNode</code> |  | Card content, either as rich text nodes or plain string. |

<a name="module_types/ui..CardGridBlock"></a>

### types/ui~CardGridBlock : <code>object</code>
CardGridBlock

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Unique block identifier. |
| type | <code>&quot;cardGrid&quot;</code> |  | Block discriminator. |
| title | <code>string</code> |  | Section title. |
| [columns] | <code>number</code> | <code>3</code> | Number of grid columns. |
| items | <code>Array.&lt;InsightCard&gt;</code> |  | Array of card items to display. |

<a name="module_types/ui..DiagramVariant"></a>

### types/ui~DiagramVariant : <code>object</code>
Diagram Variant

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| diagram | <code>string</code> | Mermaid.js definition. |
| description | <code>RichTextNode</code> \| <code>string</code> | Diagram explanation. |

<a name="module_types/ui..DiagramBlock"></a>

### types/ui~DiagramBlock : <code>object</code>
Diagram block

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>&quot;diagram&quot;</code> |  | Block discriminator. |
| title | <code>string</code> |  | Diagram title. |
| desktop | <code>DiagramVariant</code> |  | Mermaid.js definition an description optomized for desktop. |
| mobile | <code>DiagramVariant</code> |  | Mermaid.js definition and description optomized for mobile devices. |
| [theme] | <code>&quot;light&quot;</code> \| <code>&quot;dark&quot;</code> \| <code>&quot;auto&quot;</code> | <code>&quot;auto&quot;</code> | Theme preference. |
| [description] | <code>string</code> |  | Optional explanation. |
| [collapsible] | <code>boolean</code> | <code>true</code> | Allow collapse. |

<a name="module_types/ui..ImageGalleryBlock"></a>

### types/ui~ImageGalleryBlock : <code>object</code>
Image gallery block

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>&quot;imageGallery&quot;</code> | Block discriminator. |
| [title] | <code>string</code> | Optional heading. |
| images | <code>Array.&lt;FeatureImage&gt;</code> | Images to render. |

<a name="module_types/ui..BulletListBlock"></a>

### types/ui~BulletListBlock : <code>object</code>
Bullet list block

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>&quot;bulletedList&quot;</code> | Block discriminator. |
| [title] | <code>string</code> | Optional heading. |
| items | <code>Array.&lt;BulletItem&gt;</code> | Bullet items. |

<a name="module_types/ui..LinkListBlock"></a>

### types/ui~LinkListBlock : <code>object</code>
Link list block

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>&quot;links&quot;</code> | Block discriminator. |
| [title] | <code>string</code> | Optional heading. |
| links | <code>Array.&lt;LinkItem&gt;</code> | Links to render. |

<a name="module_types/ui..MarkdownHeading"></a>

### types/ui~MarkdownHeading : <code>object</code>
Markdown heading entry for table of contents

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | Heading level (1-6), corresponds to h1-h6 tags. |
| text | <code>string</code> | Cleaned heading text without markdown formatting. |
| id | <code>string</code> | Generated unique ID slug for anchor linking, auto-suffixed if duplicates exist. |

<a name="module_types/ui..MarkdownRendererProps"></a>

### types/ui~MarkdownRendererProps : <code>object</code>
Markdown renderer props

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>string</code> |  | Raw markdown content to render. |
| [title] | <code>string</code> |  | Optional heading displayed above markdown content. |
| [intro] | <code>string</code> |  | Optional introductory paragraph displayed above markdown. |
| [articleId] | <code>string</code> |  | Optional id attribute applied to the article root element for deep linking. |
| [showToc] | <code>boolean</code> | <code>true</code> | Show auto-generated table of contents from headings. |
| [maxTocDepth] | <code>number</code> | <code>3</code> | Maximum heading depth included in table of contents (1-6). |
| [className] | <code>string</code> |  | Optional additional CSS class names applied to the article root. |

<a name="module_types/ui..MarkdownDocsBlock"></a>

### types/ui~MarkdownDocsBlock : <code>object</code>
Markdown documentation block

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>&quot;MARKDOWN\_DOCS&quot;</code> |  | Block discriminator. |
| id | <code>string</code> |  | Unique block identifier. |
| title | <code>string</code> |  | Section title displayed above the documentation list. |
| [intro] | <code>string</code> |  | Optional introductory text describing the documentation section. |
| docSlugs | <code>Array.&lt;string&gt;</code> |  | Array of documentation slugs to fetch and render from the portfolio docs registry. |
| [showToc] | <code>boolean</code> | <code>true</code> | Show table of contents for each document being rendered. |
| [showDocJumpList] | <code>boolean</code> | <code>true</code> | Show navigation list linking to each document in the stack. |

<a name="module_types/ui..FeatureBlock"></a>

### types/ui~FeatureBlock : <code>RichTextBlock</code> \| <code>ImageGalleryBlock</code> \| <code>DiagramBlock</code> \| <code>BulletListBlock</code> \| <code>LinkListBlock</code> \| <code>MarkdownDocsBlock</code>
Union of all feature blocks

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
<a name="module_types/ui..FeatureSection"></a>

### types/ui~FeatureSection : <code>object</code>
Feature section definition

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | DOM anchor id. |
| title | <code>string</code> |  | Section title. |
| [subtitle] | <code>string</code> |  | Optional subtitle. |
| [icon] | <code>string</code> |  | Icon key. |
| [isScroller] | <code>boolean</code> | <code>false</code> | Used by sticky nav. |
| blocks | <code>Array.&lt;FeatureBlock&gt;</code> |  | Content blocks. |

<a name="module_types/ui..BaseUIProps"></a>

### types/ui~BaseUIProps : <code>Object</code>
Base props shared by most interactive UI components.

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [variant] | <code>Variant</code> | Visual style variant. |
| [size] | <code>Size</code> | Component size. |
| [disabled] | <code>boolean</code> | Whether the component is disabled. |
| [className] | <code>string</code> | Optional additional CSS class names. |

<a name="module_types/ui..IconConfig"></a>

### types/ui~IconConfig : <code>Object</code>
Describes an icon configuration used by icon-based components.

**Kind**: inner typedef of [<code>types/ui</code>](#module_types/ui)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Icon identifier or asset key. |
| [size] | <code>number</code> | Icon size in pixels. |
| [color] | <code>string</code> | CSS color value applied to the icon. |

<a name="FormFieldOption"></a>

## FormFieldOption : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | <code>string</code> |  | Human-readable option label. |
| value | <code>\*</code> |  | Stored value for the option. |
| [disabled] | <code>boolean</code> | <code>false</code> | Whether this option is disabled. |

<a name="InputGroupConfig"></a>

## InputGroupConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [prefix] | <code>string</code> | Optional leading addon text. |
| [suffix] | <code>string</code> | Optional trailing addon text. |

<a name="FormFieldConfig"></a>

## FormFieldConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | Unique field name. Supports nested paths like `contact.email`. |
| type | <code>string</code> |  | Field type. Prefer values from FIELD_TYPES. |
| [label] | <code>string</code> |  | Visible label for the field. |
| [helpText] | <code>string</code> |  | Optional helper copy shown below the field. |
| [placeholder] | <code>string</code> |  | Placeholder text when supported. |
| [defaultValue] | <code>\*</code> |  | Initial field value. |
| [options] | [<code>Array.&lt;FormFieldOption&gt;</code>](#FormFieldOption) |  | Option data for select, checkboxGroup, and radioGroup. |
| [required] | <code>boolean</code> | <code>false</code> | Whether the field is required in the UI layer. |
| [disabled] | <code>boolean</code> | <code>false</code> | Whether the field is disabled. |
| [readOnly] | <code>boolean</code> | <code>false</code> | Whether the field is read-only. |
| [hidden] | <code>boolean</code> | <code>false</code> | Whether the field is hidden. |
| [block] | <code>boolean</code> | <code>true</code> | Whether picker-like controls should span full width. |
| [componentProps] | <code>Object</code> |  | Props forwarded to the underlying RSuite control. |
| [rule] | <code>Object</code> |  | Optional RSuite field-level validation rule. |
| [errorPlacement] | <code>string</code> | <code>&quot;\&quot;bottomStart\&quot;&quot;</code> | Error placement for Form.Control. |
| [shouldResetWithUnmount] | <code>boolean</code> | <code>false</code> | Clear value if field unmounts conditionally. |
| [inputGroup] | [<code>InputGroupConfig</code>](#InputGroupConfig) |  | Prefix/suffix config for inputGroupText fields. |
| [renderWhen] | <code>function</code> |  | Conditional render predicate. |

<a name="FormBlockSchema"></a>

## FormBlockSchema : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>string</code> |  | Stable schema id. |
| [title] | <code>string</code> |  | Optional panel title. |
| [submitLabel] | <code>string</code> | <code>&quot;\&quot;Submit\&quot;&quot;</code> | Submit button label. |
| [resetLabel] | <code>string</code> |  | Optional reset button label. |
| fields | [<code>Array.&lt;FormFieldConfig&gt;</code>](#FormFieldConfig) |  | Array of field configuration objects. |
| [initialValues] | <code>Object</code> |  | Optional initial form value override. |

