/**
 * @file index.js
 * @fileoverview Centralized export module for all block components used in page rendering.
 * This file serves as a single point of import for all block types, promoting
 * modularity and ease of maintenance across the codebase.
 *
 * Note: When adding new block types, simply import them here and include them in the export statement.
 *
 * @module components/blocks
 */

import ImageGalleryBlock from "./ImageGalleryBlock";
import LinksBlock from "./LinksBlock";
import RichTextBlock from "./RichTextBlock";
import CardGridBlock from "./CardGridBlock";
import HeroBlock from "./HeroBlock";
import FormBlock from "./FormBlock";
import "./blocks.css";
/**
 * @name ImageGalleryBlock
 * Renders a gallery-style block for displaying one or more images.
 *
 * @type {React.ComponentType<any>}
 */

/**
 * @name LinksBlock
 * Renders a block containing a list of external or internal links.
 *
 * @type {React.ComponentType<any>}
 */

/**
 * @name RichTextBlock
 * Renders formatted rich text content, typically sourced from markdown
 * or CMS-style configuration.
 *
 * @type {React.ComponentType<any>}
 */

/**
 * @name CardGridBlock
 * Renders a grid of cards, each containing an image, title, description,
 * and optional link. Used for showcasing projects, team members, or other
 * collections of related items.
 *
 * @type {React.ComponentType<any>}
 */

/**
 * @name HeroBlock
 * Renders a prominent header section typically used at the top of pages or
 * major sections. Displays a title, optional subtitle, and associated
 * technologies.
 *
 * @type {React.ComponentType<any>}
 */

/**
 * @name FormBlock
 * Renders a configurable form based on a declarative schema. Supports various
 * field types, validation rules, and submission handling logic.
 *
 * @type {React.ComponentType<any>}
 */

export { ImageGalleryBlock, LinksBlock, RichTextBlock, CardGridBlock, HeroBlock, FormBlock };
