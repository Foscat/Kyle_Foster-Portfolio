/**
 * @file ui.types.js
 * @description Shared UI-related type definitions used across components,
 * including buttons, icons, and layout utilities.
 * @module types/ui
 */

import {
  RichTextBlock,
  ImageGalleryBlock,
  LinksBlock,
  CardGridBlock,
  HeroBlock,
} from "components/renderers";
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
 * Block types for feature sections
 * @readonly
 * @enum {string}
 */
export const BlockType = Object.freeze({
  HERO: "hero",
  RICH_TEXT: "richText",
  IMAGE_GALLERY: "imageGallery",
  DIAGRAM: "diagram",
  CARD_GRID: "cardGrid",
  BULLETED_LIST: "bulletedList",
  LINKS: "links",
});

/**
 * Mapping of BlockType to corresponding React components responsible for rendering that block type.
 * This serves as a central registry for block renderers, allowing feature sections to dynamically select the appropriate component based on the block's type.
 * Each renderer component should accept props that align with the expected data structure for its corresponding BlockType.
 * For example, the `MermaidDiagram` component should expect props that include Mermaid diagram definitions and descriptions, while the `ImageGalleryBlock` should expect an array of image metadata.
 *
 * Note:*When adding new block types, ensure to update both the BlockType enum and this mapping to include the new type and its renderer component.*
 */
export const BLOCK_RENDERERS = Object.freeze({
  [BlockType.RICH_TEXT]: RichTextBlock,
  [BlockType.IMAGE_GALLERY]: ImageGalleryBlock,
  [BlockType.DIAGRAM]: MermaidDiagram,
  [BlockType.CARD_GRID]: CardGridBlock,
  [BlockType.BULLETED_LIST]: AccordionList,
  [BlockType.LINKS]: LinksBlock,
  [BlockType.HERO]: HeroBlock,
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

const createInsightCard = (item, position) => ({
  ...item,
  id: item.id || "card-" + position,
  title: item.title || "",
  subtitle: item.subtitle || "",
  icon: item.icon || "",
  variant: item.variant || Variant.PRIMARY,
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
