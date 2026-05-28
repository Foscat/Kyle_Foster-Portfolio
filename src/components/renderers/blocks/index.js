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

import { createElement, lazy, Suspense } from "react";
import "./blocks.css";

const withLazySuspense = (loader, fallbackText, displayName) => {
  const LazyComponent = lazy(loader);

  const WrappedComponent = (props) =>
    createElement(
      Suspense,
      {
        fallback: createElement("p", { className: "mermaid-deferred-status-text" }, fallbackText),
      },
      createElement(LazyComponent, props)
    );

  WrappedComponent.displayName = displayName;
  return WrappedComponent;
};

const ImageGalleryBlock = withLazySuspense(
  () => import("./ImageGalleryBlock"),
  "Loading image gallery...",
  "ImageGalleryBlock"
);
const ImageTextSplitBlock = withLazySuspense(
  () => import("./ImageTextSplitBlock"),
  "Loading profile highlight...",
  "ImageTextSplitBlock"
);
const LinksBlock = withLazySuspense(() => import("./LinksBlock"), "Loading links...", "LinksBlock");
const RichTextBlock = withLazySuspense(
  () => import("./RichTextBlock"),
  "Loading rich text...",
  "RichTextBlock"
);
const CardGridBlock = withLazySuspense(
  () => import("./CardGridBlock"),
  "Loading cards...",
  "CardGridBlock"
);
const HeroBlock = withLazySuspense(() => import("./HeroBlock"), "Loading hero...", "HeroBlock");
const FormBlock = withLazySuspense(() => import("./FormBlock"), "Loading form...", "FormBlock");

export {
  ImageGalleryBlock,
  ImageTextSplitBlock,
  LinksBlock,
  RichTextBlock,
  CardGridBlock,
  HeroBlock,
  FormBlock,
};
