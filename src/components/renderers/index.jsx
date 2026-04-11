/**
 * @file src\components\renderers\index.jsx
 * @description src\components\renderers\index module.
 * @module src\components\renderers\index
 */

import { lazy, Suspense } from "react";
import React from "react";

/**
 * @name LazyDisplay
 * @description A simple component to display a loading message and an optional icon while a lazy-loaded component is being fetched.
 * @param {string} loadingMessage - The message to display while loading. Defaults to "Loading...".
 * @param {string} icon - An optional FontAwesome icon class to display above the loading message.
 * @param {boolean} iconSpin - If true, the icon will have the "fa-spin" class applied for animation.
 * @returns {JSX.Element} Rendered loading placeholder.
 */
const LazyDisplay = ({ loadingMessage = "", icon = "", iconSpin = "" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {icon && (
        <i
          className={`${icon} ${iconSpin ? "fa-spin" : ""}`}
          style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
        ></i>
      )}
      <span>{loadingMessage || "Loading..."}</span>
    </div>
  );
};

const lazyComponent = (importer, displayName, fallback = {}) => {
  const Component = lazy(importer);

  const LazyComponent = (props) => (
    <Suspense
      fallback={
        <LazyDisplay
          loadingMessage={
            props.loadingMessage || fallback.loadingMessage || `Loading ${displayName}...`
          }
          icon={fallback.icon || ""}
          iconSpin={fallback.iconSpin || false}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );

  return LazyComponent;
};

const CardGridBlock = lazyComponent(() => import("./blocks/CardGridBlock"), "CardGridBlock", {
  loadingMessage: "Loading info cards...",
  icon: "fa-solid fa-th",
});
const FormBlock = lazyComponent(() => import("./blocks/FormBlock"), "FormBlock", {
  loadingMessage: "Loading information form...",
  icon: "fa-solid fa-pen-to-square",
});
const HeroBlock = lazyComponent(() => import("./blocks/HeroBlock"), "HeroBlock", {
  loadingMessage: "Loading header...",
  icon: "fa-solid fa-flag",
});
const ImageGalleryBlock = lazyComponent(
  () => import("./blocks/ImageGalleryBlock"),
  "ImageGalleryBlock",
  {
    loadingMessage: "Loading images to display...",
    icon: "fa-solid fa-image",
  }
);
const LinksBlock = lazyComponent(() => import("./blocks/LinksBlock"), "LinksBlock", {
  loadingMessage: "Loading links for more information...",
  icon: "fa-solid fa-link",
});
const RichTextBlock = lazyComponent(() => import("./blocks/RichTextBlock"), "RichTextBlock", {
  loadingMessage: "Loading Rich Text Block...",
  icon: "fa-solid fa-align-left",
});
const RichText = lazyComponent(() => import("./RichText"), "RichText", {
  loadingMessage: "Loading text to display...",
  icon: "fa-solid fa-markdown",
});
const SectionRenderer = lazyComponent(() => import("./SectionRenderer"), "SectionRenderer", {
  loadingMessage: "Loading section display...",
  icon: "fa-solid fa-cubes",
});

export {
  CardGridBlock,
  FormBlock,
  HeroBlock,
  ImageGalleryBlock,
  LinksBlock,
  RichTextBlock,
  RichText,
  SectionRenderer,
};
