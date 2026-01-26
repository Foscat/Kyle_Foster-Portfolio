/**
 * @file index.js
 * @description Central export barrel for content block components used by
 * the SectionRenderer system.
 *
 * Each exported block is responsible for rendering a specific content type
 * defined by the page or section configuration.
 *
 * @module components/blocks
 */

import ImageGalleryBlock from "./ImageGalleryBlock";
import LinksBlock from "./LinksBlock";
import RichTextBlock from "./RichTextBlock";

/**
 * ImageGalleryBlock
 * Renders a gallery-style block for displaying one or more images.
 *
 * @type {React.ComponentType<any>}
 */

/**
 * LinksBlock
 * Renders a block containing a list of external or internal links.
 *
 * @type {React.ComponentType<any>}
 */

/**
 * RichTextBlock
 * Renders formatted rich text content, typically sourced from markdown
 * or CMS-style configuration.
 *
 * @type {React.ComponentType<any>}
 */
export { ImageGalleryBlock, LinksBlock, RichTextBlock };
