// ui.types.js
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
   CALLBACK SIGNATURES (JSDOC-ONLY)
   ========================================================================== */

/**
 * Generic click handler
 * @callback ClickHandler
 * @param {MouseEvent} event
 * @returns {void | Promise<void>}
 */

/**
 * Generic change handler
 * @callback ChangeHandler
 * @param {*} value
 * @returns {void}
 */

/* ============================================================================
   SHARED DATA TYPES (JSDOC TYPEDEFS)
   ========================================================================== */

/**
 * Image metadata
 * @typedef {Object} FeatureImage
 * @property {string} src - Relative image path.
 * @property {string} alt - Accessible alt text.
 * @property {string} title - Short title or tooltip.
 * @property {string} [caption] - Optional description.
 */

/**
 * Link item definition
 * @typedef {Object} LinkItem
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
 * @typedef {Object} BulletItem
 * @property {string} id - DOM id or scroll target.
 * @property {string} text - Bullet content.
 * @property {string} [title] - Optional heading.
 * @property {string} [icon] - Optional icon key.
 * @property {boolean} [isScroller=false] - Scroll-to-anchor behavior.
 * @property {boolean} [isLink=false] - Acts as a link.
 * @property {string} [url] - Destination URL.
 */

/**
 * Diagram block
 * @typedef {Object} DiagramBlock
 * @property {"diagram"} type - Block discriminator.
 * @property {string} title - Diagram title.
 * @property {string} diagram - Mermaid.js definition.
 * @property {"light"|"dark"|"auto"} [theme="auto"] - Theme preference.
 * @property {string} [description] - Optional explanation.
 * @property {boolean} [dividerAfter=false] - Render divider below.
 * @property {boolean} [collapsible=true] - Allow collapse.
 */

/**
 * Rich text block
 * @typedef {Object} RichTextBlock
 * @property {"richText"} type - Block discriminator.
 * @property {string} [title] - Optional heading.
 * @property {string[]} paragraphs - Paragraph content.
 * @property {boolean} [dividerAfter=false] - Render divider below.
 */

/**
 * Image gallery block
 * @typedef {Object} ImageGalleryBlock
 * @property {"imageGallery"} type - Block discriminator.
 * @property {string} [title] - Optional heading.
 * @property {FeatureImage[]} images - Images to render.
 * @property {boolean} [dividerAfter=false] - Render divider below.
 */

/**
 * Bullet list block
 * @typedef {Object} BulletListBlock
 * @property {"bulletedList"} type - Block discriminator.
 * @property {string} [title] - Optional heading.
 * @property {BulletItem[]} items - Bullet items.
 * @property {boolean} [dividerAfter=false] - Render divider below.
 */

/**
 * Link list block
 * @typedef {Object} LinkListBlock
 * @property {"links"} type - Block discriminator.
 * @property {string} [title] - Optional heading.
 * @property {LinkItem[]} links - Links to render.
 * @property {boolean} [dividerAfter=false] - Render divider below.
 */

/**
 * Union of all feature blocks
 * @typedef {RichTextBlock | ImageGalleryBlock | DiagramBlock | BulletListBlock | LinkListBlock} FeatureBlock
 */

/**
 * Feature section definition
 * @typedef {Object} FeatureSection
 * @property {string} id - DOM anchor id.
 * @property {string} slug - URL-safe slug.
 * @property {string} title - Section title.
 * @property {string} [subtitle] - Optional subtitle.
 * @property {string} [icon] - Icon key.
 * @property {boolean} [isScroller=false] - Used by sticky nav.
 * @property {FeatureBlock[]} blocks - Content blocks.
 */

/* ============================================================================
   DEFAULT FACTORIES
   ========================================================================== */

/**
 * Create a default FeatureImage
 * @returns {FeatureImage}
 */
export const createFeatureImage = () => ({
  src: "",
  alt: "",
  title: "",
  caption: "",
});

/**
 * Create a default RichTextBlock
 * @returns {RichTextBlock}
 */
export const createRichTextBlock = () => ({
  type: BlockType.RICH_TEXT,
  title: "",
  paragraphs: [],
  dividerAfter: false,
});

/**
 * Create a default FeatureSection
 * @returns {FeatureSection}
 */
export const createFeatureSection = () => ({
  id: "",
  slug: "",
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
 * @param {Object} enumObj - Enum object.
 * @param {*} value - Value to test.
 * @returns {boolean} True if valid enum value.
 */
export const isValidEnumValue = (enumObj, value) =>
  Object.values(enumObj).includes(value);
