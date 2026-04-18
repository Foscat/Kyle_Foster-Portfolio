/**
 * @file src\components\renderers\SectionRenderer\index.jsx
 * @description src\components\renderers\SectionRenderer\index module.
 * @module src\components\renderers\SectionRenderer\index
 */

import { useEffect, useId, useRef, useState } from "react";
import { useSectionRegistry } from "assets/context/SectionRegistryProvider.jsx";
import {
  BlockType,
  createBulletListBlock,
  createCardGridBlock,
  createDiagramBlock,
  createFormBlock,
  createHeroBlock,
  createImageGalleryBlock,
  createLinkListBlock,
  createRichTextBlock,
} from "types/ui.types";
import InfoSection from "components/layout/InfoSection";
import {
  CardGridBlock,
  FormBlock,
  HeroBlock,
  ImageGalleryBlock,
  LinksBlock,
  RichTextBlock,
} from "components/renderers/blocks";
import MarkdownDocsBlock from "components/renderers/blocks/MarkdownDocs.Block";
import { AccordionList, MermaidDiagram } from "components/ui";
import "./styles.css";

const MAX_DEFER_FALLBACK_DELAY_MS = 15000;
const MAX_SECTION_BLOCK_COUNT = 2000;

function getBlockField(block, field) {
  try {
    return block?.[field];
  } catch {
    return undefined;
  }
}

function getBlockType(block) {
  return getBlockField(block, "type");
}

function getSectionField(section, field) {
  try {
    return section?.[field];
  } catch {
    return undefined;
  }
}

function getDeferConfigField(config, field) {
  try {
    return config?.[field];
  } catch {
    return undefined;
  }
}

function isArraySafe(value) {
  try {
    return Array.isArray(value);
  } catch {
    return false;
  }
}

function normalizeSectionBlocks(value) {
  let isArray;
  isArray = isArraySafe(value);

  if (!isArray) {
    return [];
  }

  let length;
  try {
    const numericLength = Number(value.length);
    if (!Number.isFinite(numericLength) || numericLength <= 0) {
      return [];
    }
    length = Math.min(Math.floor(numericLength), MAX_SECTION_BLOCK_COUNT);
  } catch {
    return [];
  }

  const normalized = [];
  for (let index = 0; index < length; index += 1) {
    let block;
    try {
      block = value[index];
    } catch {
      continue;
    }

    if (block !== null && block !== undefined) {
      normalized.push(block);
    }
  }

  return normalized;
}

function getUnknownBlockLabel(block) {
  const normalizeLabel = (value) => {
    if (typeof value === "string") {
      const trimmed = value.trim();
      return trimmed || null;
    }
    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
    if (typeof value === "bigint") {
      return String(value);
    }
    if (typeof value === "symbol") {
      const description = typeof value.description === "string" ? value.description.trim() : "";
      return description ? `Symbol(${description})` : null;
    }
    if (typeof value === "boolean") {
      return String(value);
    }
    return null;
  };

  if (block === null || block === undefined) {
    return "Unknown block";
  }

  const blockType = typeof block;
  if (blockType !== "object" && blockType !== "function") {
    return normalizeLabel(block) || "Unknown block";
  }

  const normalizedTitle = normalizeLabel(getBlockField(block, "title"));
  const normalizedType = normalizeLabel(getBlockType(block));

  return normalizedTitle || normalizedType || "Unknown block";
}

function getBlockKeySegment(value, fallback) {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === "symbol") {
    const description = typeof value.description === "string" ? value.description.trim() : "";
    return description ? `symbol-${description}` : "symbol";
  }

  try {
    return String(value);
  } catch {
    return fallback;
  }
}

/**
 * @file index.jsx
 * @fileoverview Central render orchestrator for feature sections composed of
 * declarative content blocks.
 * @module components/SectionRenderer
 */

/**
 * Lazy-mount wrapper used to defer expensive block rendering (notably
 * Mermaid diagrams) until the host enters the viewport.
 *
 * @private
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Content to mount when visible.
 * @param {string} [props.rootMargin="320px 0px"] - Intersection observer root margin.
 * @param {number|number[]} [props.threshold=0.01] - Intersection observer threshold.
 * @param {string} [props.placeholderMinHeight="220px"] - Skeleton minimum height.
 * @param {?number} [props.fallbackDelayMs=null] - Optional eager-mount timeout.
 * @param {string} [props.statusLabel="Loading diagram"] - Accessible loading label.
 * @param {string} [props.statusCaption="Loading diagram preview..."] - Visible placeholder text.
 * @param {"off"|"polite"|"assertive"} [props.statusLive="polite"] - ARIA live mode.
 * @returns {JSX.Element} Deferred content wrapper.
 */
function DeferredMount({
  children,
  rootMargin = "320px 0px",
  threshold = 0.01,
  placeholderMinHeight = "220px",
  fallbackDelayMs = null,
  statusLabel = "Loading diagram",
  statusCaption = "Loading diagram preview...",
  statusLive = "polite",
}) {
  const hostRef = useRef(null);
  const statusTextId = useId();
  const isLiveRegionEnabled = statusLive !== "off";
  const statusRole = statusLive === "off" ? undefined : "status";
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return undefined;

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return undefined;
    }

    if (fallbackDelayMs === 0) {
      setShouldMount(true);
      return undefined;
    }

    const host = hostRef.current;
    if (!host) return undefined;

    let observer;
    let disconnectObserver = () => {};
    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting || entry.intersectionRatio > 0)) {
            return;
          }
          setShouldMount(true);
          disconnectObserver();
        },
        {
          root: null,
          rootMargin,
          threshold,
        }
      );
      disconnectObserver = () => observer.disconnect();
    } catch {
      // If observer construction fails for any reason, render eagerly.
      setShouldMount(true);
      return undefined;
    }

    try {
      observer.observe(host);
    } catch {
      setShouldMount(true);
      disconnectObserver();
      return undefined;
    }

    const fallbackTimer =
      typeof fallbackDelayMs === "number" &&
      Number.isFinite(fallbackDelayMs) &&
      fallbackDelayMs >= 0
        ? window.setTimeout(() => {
            setShouldMount(true);
            observer.disconnect();
          }, fallbackDelayMs)
        : null;

    return () => {
      observer.disconnect();
      if (fallbackTimer !== null) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, [fallbackDelayMs, rootMargin, shouldMount, threshold]);

  return (
    <div ref={hostRef}>
      {shouldMount ? (
        children
      ) : (
        <div
          className="frosted blue-tile block scroll-anchor mermaid-container mermaid-deferred-placeholder"
          role={statusRole}
          aria-busy="true"
          aria-atomic={isLiveRegionEnabled ? "true" : undefined}
          aria-describedby={isLiveRegionEnabled ? statusTextId : undefined}
          aria-live={statusLive}
          aria-label={isLiveRegionEnabled ? statusLabel : undefined}
          style={{ minHeight: placeholderMinHeight }}
        >
          <div className="mermaid-deferred-header-skeleton" aria-hidden="true" />
          <p className="mermaid-deferred-status-text" id={statusTextId}>
            {statusCaption}
          </p>
          <div className="mermaid-deferred-canvas-skeleton" aria-hidden="true">
            <span className="mermaid-deferred-line w-90" />
            <span className="mermaid-deferred-line w-65" />
            <span className="mermaid-deferred-line w-80" />
            <span className="mermaid-deferred-line w-70" />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Central render orchestrator for a feature section composed of declarative
 * content blocks.
 *
 * @public
 * @component
 * @param {Object} props - Component props.
 * @param {FeatureSection} [props.section={}] - Section metadata and block list.
 * @param {boolean|Object} [props.deferDiagrams=false] - Diagram defer behavior toggle/config.
 * @returns {JSX.Element} Rendered feature section.
 */
const SectionRenderer = ({ section = {}, deferDiagrams = false }) => {
  const sectionRegistry = useSectionRegistry() ?? {};
  const registerSection =
    typeof sectionRegistry.registerSection === "function"
      ? sectionRegistry.registerSection
      : () => {};
  const unregisterSection =
    typeof sectionRegistry.unregisterSection === "function"
      ? sectionRegistry.unregisterSection
      : () => {};
  const sectionId = getSectionField(section, "id");
  const sectionTitle = getSectionField(section, "title");
  const sectionSubtitle = getSectionField(section, "subtitle");
  const sectionTag = getSectionField(section, "sourceTag");
  const sectionIcon = getSectionField(section, "icon");
  const sectionBlocks = getSectionField(section, "blocks");
  const diagramDeferConfig =
    deferDiagrams && typeof deferDiagrams === "object" ? deferDiagrams : null;
  const diagramDeferEnabledRaw = getDeferConfigField(diagramDeferConfig, "enabled");
  const diagramDeferEnabled =
    deferDiagrams === true || (Boolean(diagramDeferConfig) && diagramDeferEnabledRaw !== false);
  const diagramDeferRootMarginRaw = getDeferConfigField(diagramDeferConfig, "rootMargin");
  const diagramDeferRootMargin =
    typeof diagramDeferRootMarginRaw === "string" && diagramDeferRootMarginRaw.trim()
      ? diagramDeferRootMarginRaw.trim()
      : "320px 0px";
  const diagramDeferThresholdRaw = getDeferConfigField(diagramDeferConfig, "threshold");
  const isValidThresholdEntry =
    typeof diagramDeferThresholdRaw === "number" &&
    Number.isFinite(diagramDeferThresholdRaw) &&
    diagramDeferThresholdRaw >= 0 &&
    diagramDeferThresholdRaw <= 1;
  let normalizedThresholdArray = null;
  if (isArraySafe(diagramDeferThresholdRaw)) {
    try {
      const hasValues = diagramDeferThresholdRaw.length > 0;
      const allValuesAreValid = diagramDeferThresholdRaw.every(
        (value) => typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1
      );
      if (hasValues && allValuesAreValid) {
        normalizedThresholdArray = [...new Set(diagramDeferThresholdRaw)].sort((a, b) => a - b);
      }
    } catch {
      normalizedThresholdArray = null;
    }
  }
  const diagramDeferThreshold = isValidThresholdEntry
    ? diagramDeferThresholdRaw
    : (normalizedThresholdArray ?? 0.01);
  const diagramDeferPlaceholderMinHeightRaw = getDeferConfigField(
    diagramDeferConfig,
    "placeholderMinHeight"
  );
  const diagramDeferPlaceholderMinHeight =
    typeof diagramDeferPlaceholderMinHeightRaw === "number" &&
    Number.isFinite(diagramDeferPlaceholderMinHeightRaw) &&
    diagramDeferPlaceholderMinHeightRaw > 0
      ? `${diagramDeferPlaceholderMinHeightRaw}px`
      : typeof diagramDeferPlaceholderMinHeightRaw === "string" &&
          diagramDeferPlaceholderMinHeightRaw.trim()
        ? diagramDeferPlaceholderMinHeightRaw.trim()
        : "220px";
  const diagramDeferStatusLabelRaw = getDeferConfigField(diagramDeferConfig, "loadingLabel");
  const diagramDeferStatusLabel =
    typeof diagramDeferStatusLabelRaw === "string" && diagramDeferStatusLabelRaw.trim()
      ? diagramDeferStatusLabelRaw.trim()
      : "Loading diagram";
  const diagramDeferStatusCaptionRaw = getDeferConfigField(diagramDeferConfig, "loadingCaption");
  const diagramDeferStatusCaption =
    typeof diagramDeferStatusCaptionRaw === "string" && diagramDeferStatusCaptionRaw.trim()
      ? diagramDeferStatusCaptionRaw.trim()
      : "Loading diagram preview...";
  const diagramDeferStatusLiveRaw = getDeferConfigField(diagramDeferConfig, "loadingLive");
  const diagramDeferStatusLiveNormalized =
    typeof diagramDeferStatusLiveRaw === "string"
      ? diagramDeferStatusLiveRaw.trim().toLowerCase()
      : null;
  const diagramDeferStatusLive =
    diagramDeferStatusLiveNormalized === "assertive" ||
    diagramDeferStatusLiveNormalized === "polite" ||
    diagramDeferStatusLiveNormalized === "off"
      ? diagramDeferStatusLiveNormalized
      : "polite";
  const diagramDeferStartAtRaw = getDeferConfigField(diagramDeferConfig, "startAt");
  const diagramDeferStartAt =
    typeof diagramDeferStartAtRaw === "number" &&
    Number.isInteger(diagramDeferStartAtRaw) &&
    diagramDeferStartAtRaw >= 0
      ? diagramDeferStartAtRaw
      : 0;
  const diagramDeferFallbackDelayMsRaw = getDeferConfigField(diagramDeferConfig, "fallbackDelayMs");
  const diagramDeferFallbackDelayMs =
    typeof diagramDeferFallbackDelayMsRaw === "number" &&
    Number.isFinite(diagramDeferFallbackDelayMsRaw) &&
    diagramDeferFallbackDelayMsRaw >= 0
      ? Math.min(diagramDeferFallbackDelayMsRaw, MAX_DEFER_FALLBACK_DELAY_MS)
      : null;
  const diagramDeferMaxRaw = getDeferConfigField(diagramDeferConfig, "maxDeferred");
  const diagramDeferMax =
    typeof diagramDeferMaxRaw === "number" &&
    Number.isInteger(diagramDeferMaxRaw) &&
    diagramDeferMaxRaw >= 0
      ? diagramDeferMaxRaw
      : null;
  const diagramDeferFilterRaw = getDeferConfigField(diagramDeferConfig, "filter");
  const diagramDeferFilter =
    typeof diagramDeferFilterRaw === "function" ? diagramDeferFilterRaw : null;

  const shouldDeferDiagramBlock = (block, index, diagramIndex, totalDiagramCount) => {
    const deferSlotIndex = diagramIndex - diagramDeferStartAt;
    const deferConfig = {
      enabled: diagramDeferEnabled,
      rootMargin: diagramDeferRootMargin,
      threshold: diagramDeferThreshold,
      placeholderMinHeight: diagramDeferPlaceholderMinHeight,
      loadingLabel: diagramDeferStatusLabel,
      loadingCaption: diagramDeferStatusCaption,
      loadingLive: diagramDeferStatusLive,
      fallbackDelayMs: diagramDeferFallbackDelayMs,
      startAt: diagramDeferStartAt,
      maxDeferred: diagramDeferMax,
    };

    if (!diagramDeferEnabled) return false;
    if (diagramIndex < diagramDeferStartAt) return false;
    if (diagramDeferMax !== null && deferSlotIndex >= diagramDeferMax) {
      return false;
    }
    if (!diagramDeferFilter) return true;

    try {
      return (
        diagramDeferFilter(block, {
          block,
          section,
          index,
          diagramIndex,
          totalDiagramCount,
          deferSlotIndex,
          deferConfig,
        }) !== false
      );
    } catch {
      // If a custom filter fails, keep default behavior and defer the block.
      return true;
    }
  };

  // Register this section for sticky navigation and scroll-spy behavior.
  const blocks = normalizeSectionBlocks(sectionBlocks);
  const totalDiagramCount = blocks.reduce(
    (count, block) => (getBlockType(block) === BlockType.DIAGRAM ? count + 1 : count),
    0
  );

  useEffect(() => {
    if (!sectionId) return undefined;

    try {
      registerSection(sectionId, {
        id: sectionId,
        title: sectionTitle,
      });
    } catch {
      return undefined;
    }

    return () => {
      try {
        unregisterSection(sectionId);
      } catch {
        // Prevent teardown failures from breaking unmount flow.
      }
    };
  }, [sectionId, sectionTitle, registerSection, unregisterSection]);

  return (
    <InfoSection
      id={sectionId}
      title={sectionTitle}
      subtitle={sectionSubtitle}
      sectionTag={sectionTag}
      icon={sectionIcon}
      className="section-renderer"
      data-section-renderer
    >
      {(() => {
        let diagramIndex = 0;

        return blocks.map((block, i) => {
          const blockType = getBlockType(block);
          const currentDiagramIndex = blockType === BlockType.DIAGRAM ? diagramIndex++ : -1;
          const blockTypeKey = getBlockKeySegment(blockType, "unknown");
          const blockIdKey = getBlockKeySegment(getBlockField(block, "id"), "missing-id");
          const blockKey = `${blockTypeKey}-${i}-${blockIdKey}`;
          const fallbackBlock = (
            <p key={blockKey} role="alert">
              {getUnknownBlockLabel(block)} data is corrupted.
            </p>
          );

          try {
            switch (blockType) {
              case BlockType.RICH_TEXT: {
                return <RichTextBlock key={blockKey} {...createRichTextBlock(block)} />;
              }

              case BlockType.IMAGE_GALLERY:
                return <ImageGalleryBlock key={blockKey} {...createImageGalleryBlock(block)} />;

              case BlockType.LINKS:
                return <LinksBlock key={blockKey} {...createLinkListBlock(block)} />;

              case BlockType.BULLETED_LIST:
                return (
                  <AccordionList
                    key={blockKey}
                    {...createBulletListBlock(block)}
                    className="scroll-anchor"
                  />
                );

              case BlockType.CARD_GRID:
                return <CardGridBlock key={blockKey} {...createCardGridBlock(block)} />;

              case BlockType.DIAGRAM:
                if (!shouldDeferDiagramBlock(block, i, currentDiagramIndex, totalDiagramCount)) {
                  return (
                    <MermaidDiagram
                      key={blockKey}
                      {...createDiagramBlock(block)}
                      className="scroll-anchor"
                    />
                  );
                }

                return (
                  <DeferredMount
                    key={blockKey}
                    rootMargin={diagramDeferRootMargin}
                    threshold={diagramDeferThreshold}
                    placeholderMinHeight={diagramDeferPlaceholderMinHeight}
                    fallbackDelayMs={diagramDeferFallbackDelayMs}
                    statusLabel={diagramDeferStatusLabel}
                    statusCaption={diagramDeferStatusCaption}
                    statusLive={diagramDeferStatusLive}
                  >
                    <MermaidDiagram
                      key={blockKey}
                      {...createDiagramBlock(block)}
                      className="scroll-anchor"
                    />
                  </DeferredMount>
                );

              case BlockType.FORM:
                return <FormBlock key={blockKey} {...createFormBlock(block)} />;

              case BlockType.HERO:
                return <HeroBlock key={blockKey} {...createHeroBlock(block)} />;

              case BlockType.MARKDOWN_DOCS:
                return <MarkdownDocsBlock key={blockKey} block={block} />;

              // Defensive fallback for malformed or unsupported block payloads.
              default:
                return fallbackBlock;
            }
          } catch {
            return fallbackBlock;
          }
        });
      })()}
    </InfoSection>
  );
};

export default SectionRenderer;
