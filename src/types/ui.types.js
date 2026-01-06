/**
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
 * @typedef {object} FeatureImage
 * @property {string} src - Relative image path.
 * @property {string} alt - Accessible alt text.
 * @property {string} title - Short title or tooltip.
 * @property {string} [caption] - Optional description.
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
 * Diagram block
 * @typedef {object} DiagramBlock
 * @property {"diagram"} type - Block discriminator.
 * @property {string} title - Diagram title.
 * @property {string} diagram - Mermaid.js definition.
 * @property {"light"|"dark"|"auto"} [theme="auto"] - Theme preference.
 * @property {string} [description] - Optional explanation.
 * @property {boolean} [collapsible=true] - Allow collapse.
 */

/**
 * Rich text block
 * @typedef {object} RichTextBlock
 * @property {"richText"} type - Block discriminator.
 * @property {string} [title] - Optional heading.
 * @property {string[]} paragraphs - Paragraph content.
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
 * Create a default FeatureImage using base
 * @param {object} block
 * @returns {FeatureImage}
 */
export const createFeatureImage = (block) => ({
  src: block.src || "",
  alt: block.alt || "",
  title: block.title || "",
  caption: block.caption || "",
});

export const createImageGalleryBlock = (block) => ({
  type: BlockType.IMAGE_GALLERY,
  title: block.title || "",
  images: block.images || [],
});

/**
 * Create a default RichTextBlock
 * @param block
 * @returns {RichTextBlock}
 */
export const createRichTextBlock = (block) => ({
  type: BlockType.RICH_TEXT,
  title: block.title || "",
  paragraphs: block.paragraphs || [],
});

/**
 * Create a default DiagramBlock
 * @param {Partial<BulletListBlock>}
 * @param block
 * @returns {DiagramBlock}
 */
export const createDiagramBlock = (block) => ({
  type: BlockType.DIAGRAM,
  title: block.title || "",
  diagram: block.diagram || "",
  theme: Theme.AUTO,
  description: block.description || "",
  collapsible: true,
});

/**
 * Create a default BulletListItem
 * @param {Partial<BulletListBlock>} item
 * @param {number} position
 * @returns {DiagramBlock}
 */
const createBulletItem = (item, position) => ({
  id: item.id || "bullet-" + position,
  text: item.text || "",
  title: item.title || "",
  icon: item.icon || "",
  isScroller: item.isScroller || false,
  isLink: item.isLink || false,
  url: "",
});

/**
 * @param {Partial<BulletListBlock>} block
 * @returns {BulletListBlock}
 */
export const createBulletListBlock = (block) => ({
  type: BlockType.BULLETED_LIST,
  title: block.title || "",
  items: Array.isArray(block.items)
    ? block.items.map((item, index) => createBulletItem(item, index))
    : [],
});

/**
 * Create a default LinkListBlock
 * @param block
 * @returns {LinkListBlock}
 */
export const createLinkListBlock = (block) => ({
  type: BlockType.LINKS,
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
 * @param {object} enumObj - Enum object.
 * @param {*} value - Value to test.
 * @returns {boolean} True if valid enum value.
 */
export const isValidEnumValue = (enumObj, value) =>
  Object.values(enumObj).includes(value);
