/**
 * @file index.jsx
 * @fileoverview Clickable image component that expands into a frosted
 * modal viewer while preserving aspect ratio and accessibility.
 * @module components/ClickableImg
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image, Modal, Placeholder } from "rsuite";
import { useResponsive } from "assets/context/responsive/ResponsiveContext";
import "./styles.css";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;
const PAN_KEYBOARD_STEP = 48;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getContainedSize(containerWidth, containerHeight, imageWidth, imageHeight) {
  if (!containerWidth || !containerHeight || !imageWidth || !imageHeight) {
    return { width: 0, height: 0 };
  }

  const imageAspect = imageWidth / imageHeight;
  const containerAspect = containerWidth / containerHeight;

  if (imageAspect > containerAspect) {
    const width = containerWidth;
    return { width, height: width / imageAspect };
  }

  const height = containerHeight;
  return { width: height * imageAspect, height };
}

/**
 * @public
 * @component
 * @name ClickableImg
 * @description A responsive image thumbnail that expands into a modal viewer when clicked. The modal maintains the image's aspect ratio and includes optional title and caption support. Designed with accessibility in mind, it requires alt text and applies appropriate aria-labels.
 *
 * Key behaviors:
 * - Renders a responsive image thumbnail using RSuite's Image component
 * - Clicking the thumbnail opens a modal viewer with a larger version of the image
 * - The modal can be closed with the close button or pressing the ESC key
 * - The expanded image supports zoom controls and drag-to-pan interaction
 * - On mobile, title/caption details are hidden while zoomed to maximize viewing space
 * - Both thumbnail and modal images are lazy-loaded for performance
 * - The modal and image wrapper feature frosted glass styling consistent with the UI design system
 * - On mobile portrait, wide images request landscape orientation when browser support allows it
 * - On unsupported browsers, wide images show a rotate/zoom guidance hint
 *
 * Accessibility:
 * - Requires alt text for screen readers
 * - Applies aria-label to both thumbnail and modal image
 *
 * @param {object} props - Component props.
 * @param {string} props.src - Image source URL.
 * @param {string} props.alt - Alt text for accessibility.
 * @param {string} [props.ariaLabel] - Aria-label for accessibility.
 * @param {string} [props.className] - Additional CSS classes for the image.
 * @param {string} [props.title] - Optional modal header title.
 * @param {string} [props.caption] - Optional caption rendered with the image.
 * @returns {JSX.Element} Clickable image with modal viewer.
 *
 * @example
 * ```js
 * <ClickableImg
 * src="/images/project-screenshot.png"
 * alt="Screenshot of the project in action"
 * title="Project Screenshot"
 * caption="This screenshot shows the main dashboard of the application."
 * ariaLabel="Screenshot of the project in action, click to expand"
 * />
 * ```
 * In this example, the `ClickableImg` component renders a thumbnail of a project screenshot. When the user clicks on the image, it opens a modal viewer displaying a larger version of the screenshot along with the provided title and caption. The component ensures that all images are accessible and responsive across different devices.
 */
const ClickableImg = ({
  id = "clickable_img",
  index = 0,
  src = "../../assets/images/home/stem.jpg",
  alt = "Default alt text",
  className = "",
  title = "",
  caption = "",
  ariaLabel = "Clickable image, click to expand",
}) => {
  // console.log("Clickable image", { id, index, src, alt, title, caption });

  /**
   * @description Local modal open/close state controlled internally to keep usage simple.
   */
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [orientationLockUnavailable, setOrientationLockUnavailable] = useState(false);
  const stageRef = useRef(null);
  const dragStateRef = useRef(null);
  const orientationLockRef = useRef(false);
  const { isMobile, isPortrait } = useResponsive();

  const isZoomed = zoom > MIN_ZOOM + 0.01;
  const isWideImage =
    imageSize.width > 0 && imageSize.height > 0 && imageSize.width / imageSize.height >= 1.35;
  const showMetadata = !(isMobile && isZoomed);

  const baseSize = useMemo(
    () => getContainedSize(stageSize.width, stageSize.height, imageSize.width, imageSize.height),
    [imageSize.height, imageSize.width, stageSize.height, stageSize.width]
  );

  const getPanBounds = useCallback(
    (nextZoom) => {
      const scaledWidth = baseSize.width * nextZoom;
      const scaledHeight = baseSize.height * nextZoom;
      const maxX = Math.max(0, (scaledWidth - stageSize.width) / 2);
      const maxY = Math.max(0, (scaledHeight - stageSize.height) / 2);
      return { maxX, maxY };
    },
    [baseSize.height, baseSize.width, stageSize.height, stageSize.width]
  );

  const clampPan = useCallback(
    (nextPan, nextZoom) => {
      const { maxX, maxY } = getPanBounds(nextZoom);
      return {
        x: clamp(nextPan.x, -maxX, maxX),
        y: clamp(nextPan.y, -maxY, maxY),
      };
    },
    [getPanBounds]
  );

  const resetView = useCallback(() => {
    setZoom(MIN_ZOOM);
    setPan({ x: 0, y: 0 });
    dragStateRef.current = null;
  }, []);

  const applyZoom = useCallback(
    (nextZoom) => {
      const clampedZoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
      setZoom(clampedZoom);
      setPan((prev) => clampPan(prev, clampedZoom));
    },
    [clampPan]
  );

  useEffect(() => {
    if (!open) return;
    resetView();
  }, [open, resetView]);

  useEffect(() => {
    if (!open || !stageRef.current) return undefined;

    const stage = stageRef.current;
    const updateSize = () => {
      setStageSize({
        width: stage.clientWidth || 0,
        height: stage.clientHeight || 0,
      });
    };

    updateSize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }

    const observer = new ResizeObserver(updateSize);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [open]);

  useEffect(() => {
    if (!open || !isMobile || !isWideImage) {
      setOrientationLockUnavailable(false);
      return undefined;
    }
    if (typeof window === "undefined") return undefined;

    const orientationApi = window.screen?.orientation;
    if (!orientationApi?.lock) {
      setOrientationLockUnavailable(true);
      return undefined;
    }

    const isCurrentlyPortrait = window.matchMedia?.("(orientation: portrait)")?.matches ?? true;
    if (!isCurrentlyPortrait) {
      setOrientationLockUnavailable(false);
      return undefined;
    }

    let isActive = true;
    setOrientationLockUnavailable(false);

    const lockLandscape = async () => {
      try {
        await orientationApi.lock("landscape");
        if (isActive) {
          orientationLockRef.current = true;
          setOrientationLockUnavailable(false);
        }
      } catch {
        if (isActive) {
          orientationLockRef.current = false;
          setOrientationLockUnavailable(true);
        }
      }
    };

    lockLandscape();

    return () => {
      isActive = false;
      if (!orientationLockRef.current) return;

      try {
        orientationApi.unlock?.();
      } catch {
        // Ignore unlock failures in unsupported browsers.
      }

      orientationLockRef.current = false;
    };
  }, [open, isMobile, isWideImage]);

  const handleModalImageLoad = useCallback((event) => {
    const target = event.currentTarget;
    setImageSize({
      width: target.naturalWidth || 0,
      height: target.naturalHeight || 0,
    });
  }, []);

  const handlePointerDown = useCallback(
    (event) => {
      if (!isZoomed) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (event.target instanceof HTMLElement && event.target.closest(".modal-zoom-controls")) {
        return;
      }

      event.preventDefault();
      event.currentTarget.setPointerCapture?.(event.pointerId);
      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startPanX: pan.x,
        startPanY: pan.y,
      };
    },
    [isZoomed, pan.x, pan.y]
  );

  const handlePointerMove = useCallback(
    (event) => {
      const drag = dragStateRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      event.preventDefault();
      const nextPan = {
        x: drag.startPanX + (event.clientX - drag.startX),
        y: drag.startPanY + (event.clientY - drag.startY),
      };
      setPan(clampPan(nextPan, zoom));
    },
    [clampPan, zoom]
  );

  const handlePointerUp = useCallback((event) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    event.currentTarget.releasePointerCapture?.(event.pointerId);
    dragStateRef.current = null;
  }, []);

  const handleStageKeyDown = useCallback(
    (event) => {
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        applyZoom(zoom + ZOOM_STEP);
        return;
      }

      if (event.key === "-") {
        event.preventDefault();
        applyZoom(zoom - ZOOM_STEP);
        return;
      }

      if (event.key === "0") {
        event.preventDefault();
        resetView();
        return;
      }

      if (!isZoomed) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setPan((prev) => clampPan({ x: prev.x + PAN_KEYBOARD_STEP, y: prev.y }, zoom));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setPan((prev) => clampPan({ x: prev.x - PAN_KEYBOARD_STEP, y: prev.y }, zoom));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setPan((prev) => clampPan({ x: prev.x, y: prev.y + PAN_KEYBOARD_STEP }, zoom));
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setPan((prev) => clampPan({ x: prev.x, y: prev.y - PAN_KEYBOARD_STEP }, zoom));
      }
    },
    [applyZoom, clampPan, isZoomed, resetView, zoom]
  );

  return (
    <div id={id} className="frosted-tile clickable-img-container">
      {/* Thumbnail (lazy-loaded) */}
      <Image
        id={`${id}-img-${index + 1}`}
        rounded
        src={src}
        alt={alt}
        title={title || alt}
        aria-label={ariaLabel}
        loading="lazy"
        placeholder={<Placeholder.Graph active />}
        className={`clickable-thumb interactive-surface glass-outline ${className}`}
        onClick={() => setOpen(true)}
      />

      {/* Optional caption beneath thumbnail */}
      {caption && <p className="img-caption text-center">{caption}</p>}

      {/* Modal viewer */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        overflow={false}
        backdrop="static"
        keyboard={true}
        className="frosted-modal"
        size="full"
      >
        {/* Modal header */}
        <Modal.Header className="frosted-modal-header flex-between">
          {showMetadata && title ? <Modal.Title>{title}</Modal.Title> : <div />}
        </Modal.Header>

        {/* Modal body */}
        <Modal.Body className="frosted-modal-body text-center">
          <div
            ref={stageRef}
            className={`modal-img-wrapper ${isZoomed ? "is-zoomed" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onDoubleClick={() => {
              if (isZoomed) {
                resetView();
              } else {
                applyZoom(2);
              }
            }}
            onKeyDown={handleStageKeyDown}
            tabIndex={0}
            role="group"
            aria-label={`${title || alt} zoom viewer`}
          >
            <img
              src={src}
              alt={alt}
              aria-label={ariaLabel}
              title={title || alt}
              loading="lazy"
              onLoad={handleModalImageLoad}
              className={`glass-outline ${className} zoom-img`}
              style={{
                transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
              }}
            />

            <div className="modal-zoom-controls" role="toolbar" aria-label="Image zoom controls">
              <button
                type="button"
                className="modal-zoom-btn interactive-surface"
                onClick={() => applyZoom(zoom - ZOOM_STEP)}
                aria-label="Zoom out image"
                disabled={zoom <= MIN_ZOOM}
              >
                -
              </button>
              <button
                type="button"
                className="modal-zoom-btn interactive-surface"
                onClick={resetView}
                aria-label="Reset image zoom"
                disabled={!isZoomed && pan.x === 0 && pan.y === 0}
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                className="modal-zoom-btn interactive-surface"
                onClick={() => applyZoom(zoom + ZOOM_STEP)}
                aria-label="Zoom in image"
                disabled={zoom >= MAX_ZOOM}
              >
                +
              </button>
            </div>
          </div>

          {isMobile && isPortrait && isWideImage && !isZoomed && orientationLockUnavailable ? (
            <p className="modal-rotate-hint">
              Auto-rotate is unavailable. Rotate to landscape for best view, or zoom and pan.
            </p>
          ) : null}

          {showMetadata && (title || caption) ? (
            <div className="modal-meta" aria-label="Image details">
              {title ? <h3 className="modal-meta-title">{title}</h3> : null}
              {caption ? <p className="img-caption modal-caption">{caption}</p> : null}
            </div>
          ) : null}

          {isMobile && isZoomed ? (
            <p className="modal-zoom-hint">
              Zoom mode active. Drag to pan. Reset zoom to show details.
            </p>
          ) : null}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClickableImg;
