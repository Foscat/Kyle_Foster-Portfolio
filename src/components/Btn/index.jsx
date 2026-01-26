import { useState } from "react";
import { Button, IconButton, Tooltip, Whisper } from "rsuite";
import "./styles.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import FrostedIcon from "components/FrostedIcon";
import { Variant, Size } from "types/ui.types";

/**
 * @file index.jsx
 * @description Unified frosted-glass button component implementing the
 * Midnight Gold UI system with accessibility, animation, async handling,
 * and controlled prop passthrough to RSuite and FontAwesome.
 * @module components/Btn
 */

/**
 * RSuiteButtonProps
 * ---------------------------------------------------------------------------
 * Subset of props forwarded directly to RSuite `<Button>` / `<IconButton>`.
 * These are documented explicitly to make passthrough behavior clear
 * without re-exporting RSuite types.
 *
 * @typedef {Object} RSuiteButtonProps
 * @property {boolean} [active=true] - Whether the button is in an active state.
 * @property {string|React.ElementType} [as="button"] - Render element type.
 * @property {boolean} [block=false] - Makes the button full-width.
 * @property {string} [classPrefix="btn"] - RSuite CSS class prefix.
 * @property {boolean} [disabled=false] - Disables the button.
 * @property {React.ReactNode} [startIcon] - Icon rendered before content.
 * @property {React.ReactNode} [endIcon] - Icon rendered after content.
 * @property {boolean} [loading=false] - Shows loading state.
 */

/**
 * FontAwesomeButtonIconProps
 * ---------------------------------------------------------------------------
 * FontAwesome-related props forwarded to the internal `FrostedIcon`
 * instance rendered inside the button.
 *
 * @typedef {Object} FontAwesomeButtonIconProps
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
 * Btn
 * ------------------------------------------------------------------
 * A unified, accessible, animated button component that conforms to the
 * Midnight Gold + Frosted UI system.
 *
 * Core responsibilities:
 * - Normalizes RSuite `<Button>` and `<IconButton>` behavior
 * - Automatically switches to IconButton when an icon is present
 * - Enforces accessibility for icon-only buttons
 * - Supports async click handlers with visual feedback
 * - Provides tooltip support via RSuite Whisper
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
 * @public
 * @component
 *
 * @param {Object} props - Component props.
 *
 * @param {Variant} [props.variant="primary"]
 *   Visual style variant aligned with the frosted theme.
 *
 * @param {Size} [props.size="md"]
 *   Size variant applied to both button and icon.
 *
 * @param {string} [props.text]
 *   Text label rendered inside the button.
 *
 * @param {string} [props.icon]
 *   FontAwesome icon name. When provided, renders an IconButton.
 *
 * @param {Function} [props.onClick]
 *   Click handler. May return a Promise to enable async loading state.
 *
 * @param {string} [props.ariaLabel]
 *   Accessible label. Required for icon-only buttons if no tooltip is provided.
 *
 * @param {string} [props.tooltip]
 *   Tooltip text displayed on hover.
 *
 * @param {"none"|"pulse"|"scale"|"fade"} [props.animation="none"]
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
 * @param {string} [props.rel]
 *   Anchor `rel` attribute.
 *
 * @param {string} [props.className]
 *   Additional CSS class names.
 *
 * @param {boolean} [props.noBG=false]
 *   Disables the frosted background treatment.
 *
 * @param {RSuiteButtonProps} [props.*]
 *   Any supported RSuite Button/IconButton props are forwarded directly.
 *
 * @param {FontAwesomeButtonIconProps} [props.*]
 *   FontAwesome-related props forwarded to the internal `FrostedIcon`.
 *
 * @returns {JSX.Element} Rendered button component.
 */
const Btn = ({
  variant = Variant.PRIMARY,
  size = Size.MD,
  text = "",
  className = "",
  icon = undefined,
  onClick = () => {},
  ariaLabel = undefined,
  href = undefined,
  hrefLocal = false,
  target = undefined,
  rel = undefined,
  tooltip = "",
  animation = "none",
  download = undefined,
  noBG = false,
  type = "button",
  // RSuite Btn props
  active = true,
  as = "button",
  block = false,
  classPrefix = "btn",
  disabled = false,
  endIcon = undefined,
  loading = false,
  startIcon = undefined,
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
}) => {
  /**
   * Local async loading state used when onClick returns a Promise.
   * This allows async visual feedback without forcing external state.
   */
  const [asyncLoading, setAsyncLoading] = useState(loading);

  /** True when the button renders only an icon with no text label */
  const isIconOnly = icon && !text;

  /**
   * Resolve an accessible aria-label for the button.
   * Falls back to tooltip text or a humanized icon name.
   */
  const resolvedAriaLabel =
    ariaLabel ||
    (typeof tooltip === "string" ? tooltip : undefined) ||
    (isIconOnly && typeof icon === "string" ? icon.replace(/[-_]/g, " ") : undefined);

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
    if (!onClick || disabled || loading) return;

    const result = onClick(e);

    if (result instanceof Promise) {
      try {
        setAsyncLoading(true);
        await result;
      } finally {
        setAsyncLoading(false);
      }
    }
  };

  // Choose Button or IconButton depending on icon presence
  const Component = icon ? IconButton : Button;

  const button = (
    <Component
      role="button"
      onClick={handleClick}
      type={type}
      aria-label={resolvedAriaLabel}
      aria-busy={loading || asyncLoading}
      aria-disabled={disabled || loading || asyncLoading}
      className={`
        btn 
        ${noBG ? "btn-noBG" : ""}
        ${variant ? variant : Variant.PRIMARY}
        ${isIconOnly ? "icon-only" : ""}
        ${size ? `btn-${size}` : `btn-${Size.MD}`}
        ${loading || asyncLoading ? "loading" : ""}
        ${animation !== "none" ? `anim-${animation}` : ""}
        ${className}
      `}
      active={active}
      as={as}
      block={block}
      classPrefix={classPrefix}
      endIcon={endIcon}
      startIcon={startIcon}
      loading={loading || asyncLoading}
      disabled={disabled}
      icon={
        <FrostedIcon
          size={size}
          icon={loading ? faSpinner : icon}
          variant={variant}
          clickable={!disabled}
          spin={loading}
          noBG={noBG}
          tooltip={tooltip}
          className="btn-icon"
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
      }
    >
      {text}
    </Component>
  );

  return (
    <Whisper
      delay={250}
      trigger={tooltip ? "hover" : "none"}
      followCursor={true}
      speaker={
        <Tooltip className="frosted ">
          <p>{disabled ? "Button is disabled" : tooltip}</p>
        </Tooltip>
      }
    >
      {href ? (
        hrefLocal ? (
          <Link
            role="button"
            to={href}
            type={type}
            aria-label={resolvedAriaLabel}
            aria-busy={loading || asyncLoading}
            aria-disabled={disabled || loading}
          >
            {button}
          </Link>
        ) : (
          <a
            role="button"
            href={href}
            rel={rel || "noopener noreferrer"}
            target={target || "_blank"}
            download={download || null}
            aria-label={resolvedAriaLabel}
            aria-busy={loading || asyncLoading}
            aria-disabled={disabled || loading}
          >
            {button}
          </a>
        )
      ) : (
        button
      )}
    </Whisper>
  );
};

export default Btn;
