/**
 * @file ui.types.js
 * @description Shared UI-related type definitions used across components,
 * including buttons, icons, layout utilities, block renderers, and markdown documentation.
 * Provides JSDoc typedefs for all UI component props, enums for styling variants,
 * factory functions for initializing block structures, and the central block renderer registry.
 * @module types/ui
 */

import {
  RichTextBlock,
  ImageGalleryBlock,
  LinksBlock,
  CardGridBlock,
  HeroBlock,
} from "components/renderers";
/* MarkdownDocsBlock renderer for displaying portfolio documentation within feature sections */
import MarkdownDocsBlock from "components/renderers/blocks/MarkdownDocs.Block";
/* MarkdownRenderer component for rendering raw markdown content with TOC, syntax highlighting, and responsive tables */
import { PageRoute } from "./navigation.types";
/* AccordionList component for rendering bulleted list blocks as expandable accordion sections */
/* MermaidDiagram component for rendering mermaid diagram definitions */
import { AccordionList, MermaidDiagram } from "../components/ui";

/* ============================================================================
   ENUMS (RUNTIME VALUES)
   ========================================================================== */

/**
 * Component size variants
 * @readonly
 * @enum {string}
 */
export const Size = Object.freeze({
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
});

/**
 * Visual style variants
 * @readonly
 * @enum {string}
 */
export const Variant = Object.freeze({
  PRIMARY: "primary",
  SECONDARY: "secondary",
  ACCENT: "accent",
  SUBTLE: "subtle",
  DANGER: "danger",
});

/**
 * Theme variants
 * @readonly
 * @enum {string}
 */
export const Theme = Object.freeze({
  LIGHT: "light",
  DARK: "dark",
  AUTO: "auto",
});

/**
 * Palette variants
 * @readonly
 * @enum {string}
 */
export const Palette = Object.freeze({
  PRIMARY: "primary",
  ALT: "alt",
  FOREST: "forest",
  OCEAN: "ocean",
  SUNSET: "sunset",
});

// Backward-compatible re-export for legacy imports that still resolve
// route constants from ui.types.
export { PageRoute };

/* ============================================================================
   RSuite Constants
   ========================================================================= */

/**
 * @constant {Object} TooltipPlacement
 * @description Standardized tooltip placement options for RSuite components.
 * This enum provides a centralized reference for all tooltip placements used across the application, ensuring consistency and ease of maintenance.
 * Each value corresponds to a valid placement option accepted by RSuite's tooltip components, allowing developers to use descriptive keys instead of hardcoding strings throughout the codebase.
 * For example, instead of using "bottomStart" directly in a component, developers can use `TooltipPlacement.BOTTOM_START`, which improves readability and reduces the risk of typos.
 * When adding new placements, simply include them in this enum to maintain a single source of truth for tooltip positioning.
 * @readonly
 * @enum {string}
 */
export const TooltipPlacement = Object.freeze({
  /**
   * @description Top-center placement (default)
   */
  TOP: "top",
  /**
   * @description Top-left placement
   */
  TOP_START: "topStart",
  /**
   * @description Top-right placement
   */
  TOP_END: "topEnd",

  /**
   * @description Bottom-center placement
   */
  BOTTOM: "bottom",
  /**
   * @description Bottom-left placement
   */
  BOTTOM_START: "bottomStart",
  /**
   * @description Bottom-right placement
   */
  BOTTOM_END: "bottomEnd",

  /**
   * @description Left-center placement
   */
  LEFT: "left",
  /**
   * @description Left-top placement
   */
  LEFT_START: "leftStart",
  /**
   * @description Left-bottom placement
   */
  LEFT_END: "leftEnd",

  /**
   * @description Right-center placement
   */
  RIGHT: "right",
  /**
   * @description Right-top placement
   */
  RIGHT_START: "rightStart",
  /**
   * @description Right-bottom placement
   */
  RIGHT_END: "rightEnd",
});

/**
 * @constant {Object} AccordionVariants
 * @description Standardized variant options for accordion components.
 * This enum provides a centralized reference for all accordion variants used across the application, ensuring consistency in styling and behavior.
 * Each value corresponds to a specific visual style or behavior pattern for accordion components, allowing developers to use descriptive keys instead of hardcoding strings throughout the codebase.
 * For example, instead of using "default" directly in a component, developers can use `AccordionVariants.DEFAULT`, which improves readability and reduces the risk of typos.
 * When adding new variants, simply include them in this enum to maintain a single source of truth for accordion styling options.
 * @readonly
 * @enum {string}
 */
export const HoverAnimation = Object.freeze({
  /**
   * @description No hover animation. Use for static elements or where motion would be distracting.
   */
  NONE: "none",

  /**
   * @description Subtle vertical lift. Maps to a small translateY + shadow. Safe for glass UIs.
   */
  LIFT: "lift",

  /**
   * @description Background color change only. No transform, no shadow. Use for text links or low-emphasis actions.
   */
  HIGHLIGHT: "highlight",

  /**
   * @description Shadow emphasis without movement. Use when layout stability is critical.
   */
  EMPHASIZE: "emphasize",
});

/* ============================================================================
   BLOCK REGISTRY
   ========================================================================== */

/**
 * Feature block types
 * @readonly
 * @enum {string}
 * @constant {Object.<string, string>} BlockType
 * @description Enumeration of block types used to define the structure of feature sections.
 * Each block type corresponds to a specific layout or content pattern, enabling dynamic rendering
 * of feature sections based on their defined block type. Each type has an associated renderer component
 * in the `BLOCK_RENDERERS` registry and required fields defined in `blockSchemas`.
 *
 * **Available block types:**
 * - **HERO**: Full-width hero section with background image, title, subtitle, and call-to-action.
 * - **RICH_TEXT**: Custom rich text content using nested node structure for fine-grained control.
 * - **IMAGE_GALLERY**: Responsive gallery of images with metadata (alt text, captions, titles).
 * - **DIAGRAM**: Mermaid diagram definitions with separate desktop and mobile variants.
 * - **CARD_GRID**: Grid layout of insight cards with customizable column count and variant styling.
 * - **BULLETED_LIST**: List of bullet items rendered as expandable accordion sections for progressive disclosure.
 * - **LINKS**: Collection of styled link items with optional icons, tooltips, and size variants.
 * - **MARKDOWN_DOCS**: Portfolio documentation fetched and rendered as collapsible panels with auto-generated table of contents.
 *
 * **To add new block types:**
 * 1. Add new constant to this enum (uppercase with underscores)
 * 2. Create renderer component and add it to `BLOCK_RENDERERS`
 * 3. Define required fields in `blockSchemas`
 * 4. Create factory function (e.g., `createNewBlock()`)
 * 5. Update `FeatureBlock` union typedef
 *
 * @abstract This enum is intended to be used as a set of constants for defining block types.
 */
export const BlockType = Object.freeze({
  /* Full-width hero section with background image and CTA button */
  HERO: "hero",
  /* Custom formatted text content using rich node tree structure */
  RICH_TEXT: "richText",
  /* Responsive image gallery with metadata and zoom capability */
  IMAGE_GALLERY: "imageGallery",
  /* Mermaid diagram with responsive desktop/mobile variant definitions */
  DIAGRAM: "diagram",
  /* Configurable form block with schema-driven fields */
  FORM: "form",
  /* Grid of insight cards with configurable layout and styling */
  CARD_GRID: "cardGrid",
  /* Expandable bullet list items in accordion layout */
  BULLETED_LIST: "bulletedList",
  /* Collection of styled link items with icons and metadata */
  LINKS: "links",
  /* Portfolio documentation blocks with table of contents and navigation */
  MARKDOWN_DOCS: "MARKDOWN_DOCS",
});

/**
 * Block schemas defining required fields for each block type
 * @readonly
 * @enum {string[]}
 * @constant {Object.<string, string[]>} blockSchemas
 * @description Defines the required fields for each block type in the feature section registry.
 * Used as validation reference to ensure block configurations contain all necessary data for proper rendering.
 * Each key corresponds to a BlockType, and its value is an array of required field names.
 *
 * **Field reference by block type:**
 * - **hero**: `title`, `subtitle`, `backgroundImage` - Hero section content and background.
 * - **richText**: `content`, `title` - Rich text nodes array and section heading.
 * - **imageGallery**: `images`, `title` - Image metadata array and section heading.
 * - **diagram**: `desktopDiagram`, `mobileDiagram`, `title` - Device-specific diagram definitions and heading.
 * - **bulletedList**: `items`, `title`, `subtitle` - Bullet items, heading, and optional description.
 * - **links**: `links`, `title` - Link item array and section heading.
 * - **cardGrid**: `cards`, `columns`, `title`, `subtitle`, `icon` - Card items, layout columns, and headers.
 * - **markdownDocs**: `docSlugs`, `title`, `intro` - Documentation slugs to fetch and section headers.
 *
 * **Usage in validation:**
 * ```js
 * const requiredFields = blockSchemas[block.type];
 * const isValid = requiredFields.every(field => field in block);
 * ```
 *
 * **When adding new block types:** Add a new entry with all required field names to maintain validation consistency.
 */
export const blockSchemas = Object.freeze({
  /* Hero block requires: opening visual, title, subtitle, and optional background image */
  hero: ["title", "subtitle", "backgroundImage"],
  /* Card grid requires: cards array, grid layout columns, section heading, and optional icon */
  cardGrid: ["cards", "columns", "title", "subtitle", "icon"],
  /* Rich text requires: node tree content and section title */
  richText: ["content", "title"],
  /* Image gallery requires: images array and optional section title */
  imageGallery: ["images", "title"],
  /* Diagram block requires: desktop and mobile diagram definitions with title */
  diagram: ["desktopDiagram", "mobileDiagram", "title"],
  /* Bulleted list requires: bullet items, section title, and optional subtitle */
  bulletedList: ["items", "title", "subtitle"],
  /* Links block requires: link items array and section title */
  links: ["links", "title"],
  /* Markdown docs block requires: doc slugs from portfolio registry, title, and intro text */
  markdownDocs: ["docSlugs", "title", "intro"],
});

/**
 * Block renderer mapping
 * @name BLOCK_RENDERERS
 * @type {Object.<BlockType, React.ComponentType>}
 * @public
 * @constant
 * @description Central registry mapping BlockType enums to their corresponding React renderer components.
 * Enables dynamic block rendering in feature sections without conditional logic.
 * Each renderer component accepts a `block` prop conforming to its corresponding BlockType schema.
 *
 * **Renderers included:**
 * - **HERO**: {@link HeroBlock} - Full-width hero section with background image and CTA.
 * - **RICH_TEXT**: {@link RichTextBlock} - Custom rich text content with nested node trees.
 * - **IMAGE_GALLERY**: {@link ImageGalleryBlock} - Responsive image gallery with metadata.
 * - **DIAGRAM**: {@link MermaidDiagram} - Mermaid diagram definitions with desktop/mobile variants.
 * - **CARD_GRID**: {@link CardGridBlock} - Grid layout of insight cards with customizable columns.
 * - **BULLETED_LIST**: {@link AccordionList} - Bullet items rendered as expandable accordion sections.
 * - **LINKS**: {@link LinksBlock} - Collection of styled link items with optional icons and tooltips.
 * - **MARKDOWN_DOCS**: {@link MarkdownDocsBlock} - Portfolio documentation rendered as collapsible panels with TOC.
 *
 * **Usage example:**
 * ```js
 * const blockComponent = BLOCK_RENDERERS[block.type];
 * return blockComponent ? <blockComponent block={block} /> : null;
 * ```
 *
 * **When adding new block types:**
 * 1. Create renderer component and add type definition (e.g. `NewBlock` variable)
 * 2. Add type to `BlockType` enum (uppercase naming convention)
 * 3. Update `blockSchemas` with required fields for validation
 * 4. Add mapping entry to `BLOCK_RENDERERS`
 * 5. Create factory function `createNewBlock()` in DEFAULT FACTORIES section
 * 6. Update `FeatureBlock` union typedef to include new type
 */
export const BLOCK_RENDERERS = Object.freeze({
  /* Hero section block with background image and call-to-action */
  [BlockType.HERO]: HeroBlock,
  /* Rich text block with custom markdown-like node structure */
  [BlockType.RICH_TEXT]: RichTextBlock,
  /* Responsive image gallery block */
  [BlockType.IMAGE_GALLERY]: ImageGalleryBlock,
  /* Mermaid diagram block with desktop/mobile variants */
  [BlockType.DIAGRAM]: MermaidDiagram,
  /* Card grid block with configurable columns */
  [BlockType.CARD_GRID]: CardGridBlock,
  /* Bulleted list block rendered as expandable accordion */
  [BlockType.BULLETED_LIST]: AccordionList,
  /* Link collection block with styled link items */
  [BlockType.LINKS]: LinksBlock,
  /* Markdown documentation block with TOC and panel layout */
  [BlockType.MARKDOWN_DOCS]: MarkdownDocsBlock,
});

/**
 * @typedef {Object.<string,string>} RichTextNode
 * @description Enumeration of node types for rich text content. Each type corresponds to a specific HTML element or inline formatting option, such as paragraphs, strong emphasis, links, code blocks, lists, blockquotes, and inline icons. This enum serves as a reference for defining the structure of rich text content and guiding the rendering logic for each node type.
 * @property {string} TEXT - Plain text node.
 * @property {string} PARAGRAPH - Paragraph block node.
 * @property {string} STRONG - Strong emphasis (bold) node.
 * @property {string} EMPHASIS - Emphasis (italic) node.
 * @property {string} ANCHOR - Hyperlink node.
 * @property {string} CODE - Inline code node.
 * @property {string} PRE - Preformatted code block node.
 * @property {string} UNORDERED_LIST - Unordered list block node.
 * @property {string} ORDERED_LIST - Ordered list block node.
 * @property {string} LIST_ITEM - List item node.
 * @property {string} BLOCKQUOTE - Blockquote node.
 * @property {string} INLINE_ICON - Inline icon node.
 *
 */

/**
 * @constant {RichTextNode} RichTextNodeType
 * @description Enumeration of node types for rich text content. Each type corresponds to a specific HTML element or inline formatting option, such as paragraphs, strong emphasis, links, code blocks, lists, blockquotes, and inline icons. This enum serves as a reference for defining the structure of rich text content and guiding the rendering logic for each node type.
 * @readonly
 */
export const RichTextNodeType = Object.freeze({
  TEXT: "text",
  PARAGRAPH: "p",
  STRONG: "strong",
  EMPHASIS: "em",
  ANCHOR: "a",
  CODE: "code",
  PRE: "pre",
  UNORDERED_LIST: "ul",
  ORDERED_LIST: "ol",
  LIST_ITEM: "li",
  BLOCKQUOTE: "blockquote",
  INLINE_ICON: "inlineIcon",
});

/**
 * @typedef {object} RichTextNode
 * @property {'text'|'p'|'strong'|'em'|'a'|'code'|'pre'|'ul'|'ol'|'li'|'blockquote'|'inlineIcon'} type
 *   Node type identifier that determines rendering behavior.
 * @property {string} [text]
 *   Text content for inline nodes and code blocks.
 * @property {string} [href]
 *   Destination URL for anchor (`a`) nodes.
 * @property {string} [language]
 *   Programming language identifier for syntax-highlighted code blocks.
 * @property {string} [icon]
 *   Icon identifier used by `inlineIcon` nodes.
 * @property {RichTextNode[]} [children]
 *   Nested child nodes for block-level or composite elements.
 */

/**
 * Image metadata
 * @typedef {object} FeatureImage
 * @property {string} src - Relative image path.
 * @property {string} alt - Accessible alt text.
 * @property {string} title - Short title or tooltip.
 * @property {string} [caption] - Optional description.
 * @property {string} [ariaLabel] - Screen-reader label.
 */

/**
 * Link item definition
 * @typedef {object} LinkItem
 * @property {string} url - Destination URL.
 * @property {string} [title] - Display label.
 * @property {string} [icon] - Optional icon key.
 * @property {"xs"|"sm"|"md"|"lg"|"xl"} [size="sm"] - Size variant.
 * @property {"primary"|"secondary"|"accent"|"subtle"|"danger"} [variant="primary"] - Visual style.
 * @property {boolean} [local=false] - Internal navigation.
 * @property {boolean} [isScroller=false] - Scroll-to-anchor behavior.
 * @property {string} [ariaLabel] - Screen-reader label.
 * @property {boolean} [download=false] - Download flag.
 * @property {string} [tooltip] - Hover tooltip text.
 * @property {string} [target] - Anchor target attribute.
 * @property {string} [rel] - Relationship attribute.
 */

/**
 * Bullet list item
 * @typedef {object} BulletItem
 * @property {string} id - DOM id or scroll target.
 * @property {string} text - Bullet content.
 * @property {string} [title] - Optional heading.
 * @property {string} [icon] - Optional icon key.
 * @property {boolean} [isScroller=false] - Scroll-to-anchor behavior.
 * @property {boolean} [isLink=false] - Acts as a link.
 * @property {string} [url] - Destination URL.
 */

/**
 * InsightCard
 * @typedef {object} InsightCard
 * @property {string} id - Unique card identifier.
 * @property {string} title - Card title.
 * @property {string} [subtitle] - Optional subtitle.
 * @property {string} [icon] - Optional icon key.
 * @property {Variant} [variant="primary"] - Visual style variant.
 * @property {RichTextNode} content - Card content, either as rich text nodes or plain string.
 */

/**
 * CardGridBlock
 * @typedef {object} CardGridBlock
 * @property {string} id - Unique block identifier.
 * @property {"cardGrid"} type - Block discriminator.
 * @property {string} title - Section title.
 * @property {number} [columns=3] - Number of grid columns.
 * @property {Array<InsightCard>} items - Array of card items to display.
 */

/**
 * Diagram Variant
 * @typedef {object} DiagramVariant
 * @property {string} diagram - Mermaid.js definition.
 * @property {RichTextNode | string} description - Diagram explanation.
 */

/**
 * Diagram block
 * @typedef {object} DiagramBlock
 * @property {"diagram"} type - Block discriminator.
 * @property {string} title - Diagram title.
 * @property {DiagramVariant} desktop - Mermaid.js definition an description optomized for desktop.
 * @property {DiagramVariant} mobile - Mermaid.js definition and description optomized for mobile devices.
 * @property {"light"|"dark"|"auto"} [theme="auto"] - Theme preference.
 * @property {string} [description] - Optional explanation.
 * @property {boolean} [collapsible=true] - Allow collapse.
 */

/**
 * Image gallery block
 * @typedef {object} ImageGalleryBlock
 * @property {"imageGallery"} type - Block discriminator.
 * @property {string} [title] - Optional heading.
 * @property {FeatureImage[]} images - Images to render.
 */

/**
 * Bullet list block
 * @typedef {object} BulletListBlock
 * @property {"bulletedList"} type - Block discriminator.
 * @property {string} [title] - Optional heading.
 * @property {BulletItem[]} items - Bullet items.
 */

/**
 * Link list block
 * @typedef {object} LinkListBlock
 * @property {"links"} type - Block discriminator.
 * @property {string} [title] - Optional heading.
 * @property {LinkItem[]} links - Links to render.
 */

/**
 * Markdown heading entry for table of contents
 * @typedef {object} MarkdownHeading
 * @property {number} level - Heading level (1-6), corresponds to h1-h6 tags.
 * @property {string} text - Cleaned heading text without markdown formatting.
 * @property {string} id - Generated unique ID slug for anchor linking, auto-suffixed if duplicates exist.
 */

/**
 * Markdown renderer props
 * @typedef {object} MarkdownRendererProps
 * @property {string} content - Raw markdown content to render.
 * @property {string} [title] - Optional heading displayed above markdown content.
 * @property {string} [intro] - Optional introductory paragraph displayed above markdown.
 * @property {string} [articleId] - Optional id attribute applied to the article root element for deep linking.
 * @property {boolean} [showToc=true] - Show auto-generated table of contents from headings.
 * @property {number} [maxTocDepth=3] - Maximum heading depth included in table of contents (1-6).
 * @property {string} [className] - Optional additional CSS class names applied to the article root.
 */

/**
 * Markdown documentation block
 * @typedef {object} MarkdownDocsBlock
 * @property {"MARKDOWN_DOCS"} type - Block discriminator.
 * @property {string} id - Unique block identifier.
 * @property {string} title - Section title displayed above the documentation list.
 * @property {string} [intro] - Optional introductory text describing the documentation section.
 * @property {string[]} docSlugs - Array of documentation slugs to fetch and render from the portfolio docs registry.
 * @property {boolean} [showToc=true] - Show table of contents for each document being rendered.
 * @property {boolean} [showDocJumpList=true] - Show navigation list linking to each document in the stack.
 */

/**
 * Union of all feature blocks
 * @typedef {RichTextBlock | ImageGalleryBlock | DiagramBlock | BulletListBlock | LinkListBlock | MarkdownDocsBlock} FeatureBlock
 */

/**
 * Feature section definition
 * @typedef {object} FeatureSection
 * @property {string} id - DOM anchor id.
 * @property {string} title - Section title.
 * @property {string} [subtitle] - Optional subtitle.
 * @property {string} [icon] - Icon key.
 * @property {boolean} [isScroller=false] - Used by sticky nav.
 * @property {FeatureBlock[]} blocks - Content blocks.
 */

/**
 * Base props shared by most interactive UI components.
 *
 * @typedef {Object} BaseUIProps
 * @property {Variant} [variant] - Visual style variant.
 * @property {Size} [size] - Component size.
 * @property {boolean} [disabled] - Whether the component is disabled.
 * @property {string} [className] - Optional additional CSS class names.
 */

/**
 * Describes an icon configuration used by icon-based components.
 *
 * @typedef {Object} IconConfig
 * @property {string} name - Icon identifier or asset key.
 * @property {number} [size] - Icon size in pixels.
 * @property {string} [color] - CSS color value applied to the icon.
 */

/* ============================================================================
   DEFAULT FACTORIES
   ========================================================================== */

/**
 * Create a default FeatureImage using base
 * @param {object} block
 * @returns {FeatureImage}
 */
export const createFeatureImage = (block) => ({
  ...block,
  id: block.id || "",
  src: block.src || "",
  alt: block.alt || "",
  title: block.title || "",
  caption: block.caption || "",
  ariaLabel: block.ariaLabel || "",
});

/**
 * Create a default ImageGalleryBlock
 * @param {Partial<ImageGalleryBlock>} block - Image gallery block properties.
 * @returns {ImageGalleryBlock}
 */
export const createImageGalleryBlock = (block) => ({
  ...block,
  id: block.id || "",
  type: BlockType.IMAGE_GALLERY,
  title: block.title || "",
  images: block.images || [],
});

/**
 * Create a default RichTextBlock
 * @param {Partial<RichTextBlock>} block - Rich text block properties.
 * @returns {RichTextBlock}
 */
export const createRichTextBlock = (block) => ({
  ...block,
  type: BlockType.RICH_TEXT,
  id: block.id || "",
  title: block.title || "",
  content: block.content || block.paragraphs || [],
});

/**
 * Create a default DiagramBlock
 * @param {Partial<BulletListBlock>} block - Diagram block properties.
 * @returns {DiagramBlock}
 */
export const createDiagramBlock = (block) => ({
  ...block,
  type: BlockType.DIAGRAM,
  id: block.id || "",
  title: block.title || "",
  diagram: block.diagram || "",
  mobileDiagram: block.mobile || {},
  desktopDiagram: block.desktop || {},
  theme: block.theme || Theme.AUTO,
  description: block.description || "",
  collapsible: block.collapsible || false,
});

/**
 * Create a default BulletListItem
 * @param {Partial<BulletListBlock>} item - Bullet item properties.
 * @param {number} [position] - Index position used for generating fallback ids.
 * @returns {BulletItem}
 */
const createBulletItem = (item, position) => ({
  ...item,
  type: BlockType.BULLETED_LIST,
  id: item.id || "bullet-" + position,
  text: item.text || "",
  title: item.title || "",
  icon: item.icon || "",
  isScroller: item.isScroller || false,
  isLink: item.isLink || false,
  url: item.url || "",
  rel: item.rel || "",
  target: item.target || "",
  ariaLabel: item.ariaLabel || "",
});

/**
 * Create a default InsightCard
 * @param {Partial<InsightCard>} item - Insight card properties.
 * @param {number} [position] - Index position used for generating fallback ids.
 * @returns {InsightCard}
 */
const createInsightCard = (item, position) => ({
  ...item,
  id: item.id || "card-" + position,
  title: item.title || "",
  subtitle: item.subtitle || "",
  icon: item.icon || "",
  variant: item.variant || item.accent || Variant.PRIMARY,
  content: item.content || "",
});

/**
 * Create a default CardGridBlock
 * @param {Partial<CardGridBlock>} block - Card grid block properties.
 * @returns {CardGridBlock}
 */
export const createCardGridBlock = (block) => ({
  ...block,
  type: BlockType.CARD_GRID,
  id: block.id || "",
  title: block.title || "",
  items: Array.isArray(block.items)
    ? block.items.map((item, index) => createInsightCard(item, index))
    : [],
});

/**
 * Create a default BulletListBlock
 * @param {Partial<BulletListBlock>} block - Bullet list block properties.
 * @returns {BulletListBlock}
 */
export const createBulletListBlock = (block) => ({
  ...block,
  type: BlockType.BULLETED_LIST,
  id: block.id || "",
  title: block.title || "",
  items: Array.isArray(block.items)
    ? block.items.map((item, index) => createBulletItem(item, index))
    : [],
});

/**
 * Create a default LinkListBlock
 * @param {Partial<LinkListBlock>} block - Link list block properties.
 * @returns {LinkListBlock}
 */
export const createLinkListBlock = (block) => ({
  ...block,
  type: BlockType.LINKS,
  id: block.id || "",
  title: block.title || "",
  links: Array.isArray(block.links)
    ? block.links.map((link, index) => createBulletItem(link, index))
    : [],
});

/**
 * Create a default HeroBlock
 * @param {Partial<HeroBlock>} block - Hero block properties.
 * @returns {HeroBlock}
 */
export const createHeroBlock = (block) => ({
  ...block,
  type: BlockType.HERO,
  id: block.id || "",
  title: block.title || "",
  subtitle: block.subtitle || "",
  backgroundImage: block.backgroundImage || null,
  cta: block.cta || null,
});

/**
 * Create a default FormBlock
 * @param {Partial<FormBlock>} block - Form block properties.
 * @returns {FormBlock}
 */
export const createFormBlock = (block) => ({
  ...block,
  type: BlockType.FORM,
  id: block.id || "",
  title: block.title || "",
  fields: block.fields || [],
  submitText: block.submitText || "Submit",
  onSubmit: block.onSubmit || (() => {}),
});

/**
 * Create a default FeatureSection
 * @param {Partial<FeatureSection>} [section={}] - Feature section properties.
 * @returns {FeatureSection} Initialized feature section with default values.
 */
export const createFeatureSection = (section = {}) => ({
  id: section.id || "",
  title: section.title || "",
  subtitle: section.subtitle || "",
  icon: section.icon || "",
  isScroller: section.isScroller || false,
  blocks: section.blocks || [],
});

/**
 * Create a default MarkdownDocsBlock
 * @description Factory function to initialize a markdown documentation block with necessary defaults.
 * Ensures proper structure for rendering documentation from portfolio docs registry with configurable
 * table of contents and navigation.
 * @param {Partial<MarkdownDocsBlock>} block - Markdown docs block properties.
 * @returns {MarkdownDocsBlock} Initialized markdown docs block with applied defaults.
 */
export const createMarkdownDocsBlock = (block) => ({
  ...block,
  /* Block type discriminator for feature section rendering */
  type: BlockType.MARKDOWN_DOCS,
  /* Unique identifier for this block instance */
  id: block.id || "",
  /* Section heading displayed above documentation list */
  title: block.title || "",
  /* Optional introductory paragraph describing the documentation section */
  intro: block.intro || "",
  /* Array of documentation slugs to fetch from portfolio docs registry */
  docSlugs: Array.isArray(block.docSlugs) ? block.docSlugs : [],
  /* Enable table of contents generation for each rendered document */
  showToc: block.showToc !== undefined ? block.showToc : true,
  /* Display jump navigation linking to each document in the block */
  showDocJumpList: block.showDocJumpList !== undefined ? block.showDocJumpList : true,
});

/* ============================================================================
   UTILITIES
   ========================================================================== */

/**
 * Validate enum membership at runtime
 * @param {object} enumObj - Enum object.
 * @param {*} value - Value to test.
 * @returns {boolean} True if valid enum value.
 */
export const isValidEnumValue = (enumObj, value) => Object.values(enumObj).includes(value);
