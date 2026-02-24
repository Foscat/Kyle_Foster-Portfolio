/**
 * @file ui.types.js
 * @description Shared UI-related type definitions used across components,
 * including buttons, icons, and layout utilities.
 * @module types/ui
 */

// ============================================================================
// UI Type System (JSDoc-based)
// ---------------------------------------------------------------------------
// This file is the single source of truth for:
// - Runtime UI enums
// - Shared data contracts (JSDoc typedefs)
// - Callback signatures
// - Default object factories
//
// IMPORTANT:
// - JSDoc does NOT support indexed access types (Enum[keyof Enum])
// - Therefore, shared typedefs use literal unions
// - Components may still use Enum[keyof Enum] in their own JSDoc
// ============================================================================

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
 * Feature block discriminator types
 * @readonly
 * @enum {string}
 */
export const BlockType = Object.freeze({
  RICH_TEXT: "richText",
  IMAGE_GALLERY: "imageGallery",
  DIAGRAM: "diagram",
  BULLETED_LIST: "bulletedList",
  LINKS: "links",
});

/**
 * Route types
 * @readonly
 * @enum {string}
 */
export const PageRoute = Object.freeze({
  HOME: "/",
  PROFESSIONAL: "/codestream",
  HACKATHON: "/hackathon",
  SIDE_PROJECTS: "/side-projects",
  EDUCATION: "/smu",
  CONNECT: "/contact",
});

/* ============================================================================
   RSuite Constants
   ========================================================================= */

/** */

/**
 * TooltipPlacement
 * ---------------------------------------------------------------------------
 * Standardized placement options for RSuite Tooltip / Whisper components.
 *
 * These values map directly to RSuite's supported `placement` strings and
 * should be used instead of inline string literals to ensure consistency
 * and discoverability across the codebase.
 *
 * Reference:
 * RSuite Tooltip & Whisper placement API
 *
 * @readonly
 * @enum {string}
 */
export const TooltipPlacement = Object.freeze({
  /** Top-center placement (default) */
  TOP: "top",
  /** Top-left placement */
  TOP_START: "topStart",
  /** Top-right placement */
  TOP_END: "topEnd",

  /** Bottom-center placement */
  BOTTOM: "bottom",
  /** Bottom-left placement */
  BOTTOM_START: "bottomStart",
  /** Bottom-right placement */
  BOTTOM_END: "bottomEnd",

  /** Left-center placement */
  LEFT: "left",
  /** Left-top placement */
  LEFT_START: "leftStart",
  /** Left-bottom placement */
  LEFT_END: "leftEnd",

  /** Right-center placement */
  RIGHT: "right",
  /** Right-top placement */
  RIGHT_START: "rightStart",
  /** Right-bottom placement */
  RIGHT_END: "rightEnd",
});

/**
 * HoverAnimation
 * ---------------------------------------------------------------------------
 * Standardized hover animation behaviors for interactive UI elements.
 *
 * This enum defines *intent*, not implementation. Components map these
 * values to approved motion patterns (e.g. translate, shadow, none).
 *
 * Design constraints enforced by this enum:
 * - No scale-based hover animations
 * - No blur animation
 * - No fast (<180ms) transitions
 * - Hover applies only to intentful interactive elements
 *
 * @readonly
 * @enum {string}
 */
export const HoverAnimation = Object.freeze({
  /**
   * No hover animation.
   * Use for static elements or where motion would be distracting.
   */
  NONE: "none",

  /**
   * Subtle vertical lift.
   * Maps to a small translateY + shadow.
   *
   * Safe for glass UIs.
   */
  LIFT: "lift",

  /**
   * Background color change only.
   * No transform, no shadow.
   *
   * Use for text links or low-emphasis actions.
   */
  HIGHLIGHT: "highlight",

  /**
   * Shadow emphasis without movement.
   * Use when layout stability is critical.
   */
  EMPHASIZE: "emphasize",
});

/* ============================================================================
   SHARED DATA TYPES (JSDOC TYPEDEFS)
   ========================================================================== */

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
 * Diagram Variant
 * @typedef {object} DiagramVariant
 * @property {string} diagram - Mermaid.js definition.
 * @property {RichTextNode | string} description - Diagram explanation.
 * 
 * /

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
 * Union of all feature blocks
 * @typedef {RichTextBlock | ImageGalleryBlock | DiagramBlock | BulletListBlock | LinkListBlock} FeatureBlock
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
 *
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
  type: BlockType.DIAGRAM,
  id: block.id || "",
  title: block.title || "",
  diagram: block.diagram || "",
  mobileDiagram: block.mobile || {},
  desktopDiagram: block.desktop || {},
  theme: block.theme || Theme.AUTO,
  description: block.description || "",
  collapsible: block.collapsible || false,
  ...block,
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
  links: Array.isArray(block.items)
    ? block.links.map((link, index) => createBulletItem(link, index))
    : [],
});

/**
 * Create a default FeatureSection
 * @returns {FeatureSection}
 */
export const createFeatureSection = () => ({
  id: "",
  title: "",
  subtitle: "",
  icon: "",
  isScroller: false,
  blocks: [],
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
