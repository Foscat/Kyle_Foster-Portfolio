/**
 * @file index.jsx
 * @fileoverview Unified frosted-glass button component implementing the
 * Midnight Gold UI system with accessibility, animation, async handling,
 * and controlled prop passthrough to native elements and FontAwesome.
 * @module components/Btn
 */

import { useState } from "react";
import "./styles.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import FrostedIcon from "components/ui/FrostedIcon";
import { Variant, Size, SurfaceLevel, TooltipPlacement, HoverAnimation } from "types/ui.types";
import { useCoarsePointer } from "assets/hooks";
import { formatClassNames } from "assets/utils";

/**
 * @typedef {Object} NativeButtonProps
 * @description Native element and compatibility props accepted by the shared button.
 * @property {boolean} [active=true] - Whether the button is in an active state.
 * @property {string|React.ElementType} [as="button"] - Render element type.
 * @property {boolean} [block=false] - Makes the button full-width.
 * @property {boolean} [disabled=false] - Disables the button.
 * @property {React.ReactNode} [startIcon] - Icon rendered before content.
 * @property {React.ReactNode} [endIcon] - Icon rendered after content.
 * @property {boolean} [loading=false] - Shows loading state.
 * @property {string} [href] - If provided, renders an anchor instead of a button.
 * @property {string} [target] - Anchor target (e.g., "_blank").
 * @property {string} [rel] - Anchor rel attribute.
 * @property {string} [download] - Anchor download attribute.
 * @property {string} [className] - Additional CSS class names.
 * @property {boolean} [noBG=false] - If true, disables the frosted background.
 * @property {Variant} [variant="primary"] - Visual style variant.
 * @property {SurfaceLevel} [surfaceLevel="2"] - Interactive Surface visual depth.
 * @property {Size} [size="md"] - Size variant applied to both button and icon.
 * @property {React.ReactNode} [text] - Label rendered inside the button.
 * @property {"button"|"submit"|"reset"} [type="button"] - Native button type.
 * @property {string} [icon] - FontAwesome icon name. When provided, renders an IconButton.
 * @property {Function} [onClick] - Click handler. May return a Promise to enable async loading state.
 */

/**
 * @typedef {Object} FontAwesomeButtonIconProps
 * @description FontAwesome-related props forwarded to the internal `FrostedIcon`
 * instance rendered inside the button. These allow for fine-grained control over
 * the icon's appearance and behavior, including animation, flipping, masking, and more.
 *
 * @property {boolean} [border=false]
 * @property {*} [mask]
 * @property {string} [maskId]
 * @property {boolean} [inverse=false]
 * @property {string|boolean} [flip=false]
 * @property {string} [pull]
 * @property {number} [rotation]
 * @property {boolean|number} [rotateBy=false]
 * @property {boolean} [spinPulse=false]
 * @property {boolean} [spinReverse=false]
 * @property {boolean} [fade=false]
 * @property {boolean} [beatFade=false]
 * @property {boolean} [bounce=false]
 * @property {boolean} [shake=false]
 * @property {boolean|string} [symbol=false]
 * @property {string} [title]
 * @property {string} [titleId]
 * @property {string|Object} [transform]
 * @property {boolean} [swapOpacity=false]
 * @property {boolean} [widthAuto=false]
 */

/**
 * @public
 * @component
 * @name Btn
 * @description A unified, accessible, animated button component that conforms to the
 * Midnight Gold + Frosted UI system.
 *
 * Core responsibilities:
 * - Normalizes native button, anchor, and React Router link behavior
 * - Keeps icon and label composition consistent across element types
 * - Enforces accessibility for icon-only buttons
 * - Supports async click handlers with visual feedback
 * - Provides dependency-free native tooltip text
 * - Can render as:
 *   - Native button
 *   - React Router link
 *   - External anchor
 *
 * Accessibility:
 * - Requires an accessible label for icon-only buttons
 * - Applies `aria-busy` during loading/async states
 * - Applies `aria-disabled` consistently
 *
 *
 * @param {Object} props - Component props.
 *
 * @param {Variant} [props.variant="primary"]
 *   Visual style variant aligned with the frosted theme.
 *
 * @param {SurfaceLevel} [props.surfaceLevel="2"]
 *   Interactive Surface depth. Buttons default to the raised library surface so
 *   variant foreground and background tokens remain paired for readable contrast.
 *
 * @param {Size} [props.size="md"]
 *   Size variant applied to both button and icon.
 *
 * @param {string} [props.text]
 *   Text label rendered inside the button.
 *
 * @param {React.ReactNode} [props.children]
 *   Nested button content used when a simple text label is not sufficient.
 *
 * @param {"button"|"submit"|"reset"} [props.type="button"]
 *   Native button type forwarded to the underlying element.
 *
 * @param {string} [props.icon]
 *   FontAwesome icon name. When provided, renders an IconButton.
 *
 * @param {Function} [props.onClick]
 *   Click handler. May return a Promise to enable async loading state.
 *
 * @param {boolean} [props.clickable=true] Indicates whether the button/icon is clickable or not.
 *
 * @param {string} [props.ariaLabel]
 *   Accessible label. Required for icon-only buttons if no tooltip is provided.
 *
 * @param {boolean|string} [props.ariaExpanded]
 *   Convenience alias mapped to `aria-expanded`.
 *
 * @param {string} [props.ariaCurrent]
 *   Convenience alias mapped to `aria-current`.
 *
 * @param {string} [props.tooltip]
 *   Tooltip text displayed on hover.
 *
 * @param {boolean} [props.tooltipFollowCursor=true]   When true, the tooltip will follow the cursor.
 *
 * @param {TooltipPlacement} [props.tooltipPlacement="right"]   Placement of the tooltip relative to the button.
 *
 * @param {HoverAnimation} [props.animation="scale"]
 *   Optional hover animation preset.
 *
 * @param {string} [props.href]
 *   Converts the button into a link when provided.
 *
 * @param {boolean} [props.hrefLocal=false]
 *   When true, renders a React Router `<Link>` instead of an anchor.
 *
 * @param {string} [props.target]
 *   Anchor target value (e.g., "_blank").
 *
 * @param {number} [props.tabIndex]
 *   Explicit tabIndex for the button. By default, it will be focusable when visible and not disabled.
 *
 * @param {string} [props.rel]
 *   Anchor `rel` attribute.
 *
 * @param {string} [props.className]
 *   Additional CSS class names.
 *
 * @param {boolean} [props.noBG=false]
 *   Disables the frosted background treatment.
 *
 * @param {NativeButtonProps} [props.*]
 *   Supported native element props are forwarded directly.
 *
 * @param {FontAwesomeButtonIconProps} [props.*]
 *   FontAwesome-related props forwarded to the internal `FrostedIcon`.
 *
 * @returns {JSX.Element} Rendered button component.
 *
 * @example
 * ```js
 * <Btn
 * variant="accent"
 * size="lg"
 * text="Click Me"
 * icon="fa-solid fa-thumbs-up"
 * onClick={() => alert("Button clicked!")}
 * tooltip="This is a button"
 * ariaLabel="Click Me"
 * />
 * ```
 * In this example, the `Btn` component renders a large, accent-styled button with both text and an icon. It includes a tooltip that appears on hover and an accessible label for screen readers. When clicked, it triggers an alert dialog.
 */
const Btn = ({
  variant = Variant.PRIMARY,
  surfaceLevel = SurfaceLevel.RAISED,
  size = Size.MD,
  text = "",
  children = undefined,
  type = "button",
  className = "",
  icon = undefined,
  clickable = true,
  onClick = () => {},
  ariaLabel = undefined,
  ariaExpanded = undefined,
  ariaCurrent = undefined,
  href = undefined,
  hrefLocal = false,
  target = undefined,
  tabIndex = undefined,
  rel = undefined,
  tooltip = "",
  tooltipFollowCursor: _tooltipFollowCursor = false,
  tooltipPlacement: _tooltipPlacement = TooltipPlacement.BOTTOM,
  download = undefined,
  noBG = false,
  active = false,
  as = "button",
  block = false,
  classPrefix: _classPrefix = "btn",
  disabled = false,
  endIcon = undefined,
  loading = false,
  startIcon = undefined,
  appearance: _appearance = undefined,
  // FontAwesomeIcon specific props
  border = false,
  mask = void 0,
  maskId = void 0,
  inverse = false,
  flip = false,
  pull = void 0,
  rotation = void 0,
  rotateBy = false,
  spinPulse = false,
  spinReverse = false,
  fade = false,
  beatFade = false,
  bounce = false,
  shake = false,
  symbol = false,
  title = "",
  titleId = void 0,
  transform = void 0,
  swapOpacity = false,
  widthAuto = false,
  ...restProps
}) => {
  /**
   * @description Local async loading state used when onClick returns a Promise. This allows async visual feedback without forcing external state.
   */
  const [asyncLoading, setAsyncLoading] = useState(loading);
  const isCoarsePointer = useCoarsePointer();
  const hasText = text !== undefined && text !== null && text !== "";

  /**
   * @description True when the button renders only an icon with no text label
   */
  const isIconOnly = Boolean(icon) && !hasText && !children;

  /**
   * @description Resolve an accessible aria-label for the button. Falls back to tooltip text or a humanized icon name.
   */
  const nativeAriaLabel = restProps["aria-label"];
  const resolvedAriaLabel =
    ariaLabel ||
    (typeof nativeAriaLabel === "string" ? nativeAriaLabel : undefined) ||
    (typeof tooltip === "string" ? tooltip : undefined) ||
    (isIconOnly && typeof icon === "string" ? icon.replace(/[-_]/g, " ") : undefined);
  const tooltipMessage = disabled ? "Button is disabled" : tooltip || "";
  const hrefValue = typeof href === "string" ? href.trim() : "";
  const hasHref = hrefValue.length > 0;
  const isLocalHref = /^(\/(?!\/)|#(?!\/)|\.{1,2}\/)/.test(hrefValue);
  const isExternalHref = /^(https?:)?\/\//.test(hrefValue);
  const isDownloadLink = Boolean(download);
  const shouldUseRouterLink = hasHref && !isDownloadLink && (hrefLocal || isLocalHref);
  const isLinkMode = hasHref;
  const resolvedAriaExpanded = ariaExpanded ?? restProps["aria-expanded"];
  const resolvedAriaCurrent = ariaCurrent ?? restProps["aria-current"];
  const passthroughProps = { ...restProps };
  delete passthroughProps["aria-expanded"];
  delete passthroughProps["aria-current"];
  delete passthroughProps["aria-label"];

  if (import.meta.env.DEV && isIconOnly && !resolvedAriaLabel) {
    console.warn("[Btn] Icon-only buttons must include ariaLabel or tooltip for accessibility.");
  }

  /**
   * Async-aware click handler.
   * Automatically manages loading state when a Promise is returned.
   *
   * @param {React.MouseEvent} e - Click event.
   * @returns {void}
   */
  const handleClick = async (e) => {
    if (!clickable || disabled || loading || asyncLoading) {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      return;
    }

    if (!onClick) return;

    const result = onClick(e);

    if (result instanceof Promise) {
      try {
        setAsyncLoading(true);
        await result;
      } finally {
        setAsyncLoading(false);
      }
    }

    if (isCoarsePointer && e?.currentTarget instanceof HTMLElement) {
      window.requestAnimationFrame(() => {
        e.currentTarget.blur();
      });
    }
  };

  const Component = isLinkMode ? (shouldUseRouterLink ? Link : "a") : as;
  const allowedVariants = Object.values(Variant);
  const allowedSurfaceLevels = Object.values(SurfaceLevel);
  const resolvedVariant = allowedVariants.includes(variant) ? variant : Variant.PRIMARY;
  const normalizedSurfaceLevel = surfaceLevel == null ? undefined : String(surfaceLevel);
  const resolvedSurfaceLevel = allowedSurfaceLevels.includes(normalizedSurfaceLevel)
    ? normalizedSurfaceLevel
    : SurfaceLevel.RAISED;
  /**
   * @description Transparent controls use the shared subtle foreground token because their
   * final background comes from the surrounding surface rather than variant paint.
   */
  const resolvedSurfaceVariant = noBG ? Variant.SUBTLE : resolvedVariant;
  const surfaceSizeClass =
    size === Size.XS || size === Size.SM
      ? "size-sm"
      : size === Size.LG || size === Size.XL
        ? "size-lg"
        : "";
  const surfaceStateClass = active ? "is-active" : "";

  /**
   * @description Variant intent remains explicit for existing component hooks while the shared
   * libraries own the rendered paint, depth, and interaction states.
   */
  const classes = formatClassNames(`btn btn-${size} btn-${active ? "active" : "inactive"}
    ${clickable ? `interactive-surface ${surfaceSizeClass} ${surfaceStateClass}` : "not-clickable"}
    ${resolvedVariant}
    ${noBG ? "btn-noBG" : ""} ${isIconOnly ? "icon-only" : ""} 
    ${loading || asyncLoading ? "loading" : ""} ${block ? "is-block" : ""} ${className}`);

  const iconNode = icon ? (
    <FrostedIcon
      size={size}
      icon={loading || asyncLoading ? faSpinner : icon}
      variant={variant}
      clickable={isIconOnly && clickable && !(disabled || loading || asyncLoading)}
      spin={loading || asyncLoading}
      noBG={noBG}
      className={
        "btn-icon" +
        (isIconOnly ? " icon-only" : "") +
        (clickable && isIconOnly ? "" : " not-clickable")
      }
      ariaLabel="Button icon"
      border={border}
      mask={mask}
      maskId={maskId}
      inverse={inverse}
      flip={flip}
      pull={pull}
      rotation={rotation}
      rotateBy={rotateBy}
      spinPulse={spinPulse}
      spinReverse={spinReverse}
      fade={fade}
      beatFade={beatFade}
      bounce={bounce}
      shake={shake}
      symbol={symbol}
      title={title}
      titleId={titleId}
      transform={transform}
      swapOpacity={swapOpacity}
      widthAuto={widthAuto}
    />
  ) : null;

  return (
    <Component
      {...passthroughProps}
      onClick={handleClick}
      type={isLinkMode ? undefined : type}
      aria-label={resolvedAriaLabel}
      aria-expanded={resolvedAriaExpanded}
      aria-current={resolvedAriaCurrent}
      aria-busy={loading || asyncLoading}
      aria-disabled={disabled || loading || asyncLoading}
      data-surface-variant={clickable ? resolvedSurfaceVariant : undefined}
      data-surface-level={clickable ? resolvedSurfaceLevel : undefined}
      tabIndex={tabIndex}
      title={title || tooltipMessage || undefined}
      className={classes}
      to={shouldUseRouterLink ? href : undefined}
      href={!shouldUseRouterLink ? href : undefined}
      rel={
        isLinkMode && !shouldUseRouterLink
          ? rel || (isExternalHref ? "noopener noreferrer" : undefined)
          : undefined
      }
      target={
        isLinkMode && !shouldUseRouterLink
          ? target || (isExternalHref ? "_blank" : undefined)
          : undefined
      }
      download={isLinkMode && !shouldUseRouterLink ? download || undefined : undefined}
      disabled={!isLinkMode ? disabled || !clickable || loading || asyncLoading : undefined}
    >
      {startIcon}
      {iconNode}
      {hasText ? <span className="btn-label">{text}</span> : children}
      {endIcon}
    </Component>
  );
};

export default Btn;
