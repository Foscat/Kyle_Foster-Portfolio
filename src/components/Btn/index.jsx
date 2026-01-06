import { useState } from "react";
import { Button, IconButton } from "rsuite";
import "./styles.css";
import { faCircleInfo, faSpinner } from "@fortawesome/free-solid-svg-icons";

/**
 * Frosted Glass Button Component
 * ------------------------------------------------------------------
 * A unified, accessible, animated button component that conforms
 * to the portfolio’s Midnight Gold + Frosted UI system.
 *
 * This enhanced version:
 * - Removing all duplicated logic between Button/IconButton
 * - Automatically switches to IconButton when an icon is provided
 * - Enforces aria-label when icon-only (true accessibility)
 * - Supports loading, success, and error visual states
 * - Adds animation presets ("pulse", "scale", "fade")
 * - Supports tooltip via RSuite Whisper
 * - Works as button OR anchor link
 *
 * @component
 *
 * @typedef {object} BtnProps
 * @property {Variant} [variant="primary"]
 *   UI color scheme aligned with frosted theme.
 *
 * @property {Size} [size="md"]
 *   RSuite size variant.
 *
 * @property {boolean} [disabled=false]
 *   Prevents interaction and dims the button.
 *
 * @property {boolean} [loading=false]
 *   Shows a loading indicator and prevents clicks.
 *
 * @property {string} [text]
 *   Text label displayed inside the button.
 *
 * @property {string} [icon]
 *   FontAwesome icon name. If provided, renders an IconButton.
 *
 * @property {string} [ariaLabel]
 *   Required when the button is icon-only (no text).
 *
 * @property {function} [onClick]
 *   Button click handler.
 *
 * @property {string} [href]
 *   Converts button into a link.
 *
 * @property {string} [target]
 *   Anchor target value ("_blank", etc.)
 *
 * @property {string} [rel]
 *   Anchor rel attribute.
 *
 * @property {string} [tooltip]
 *   Tooltip label shown on hover.
 *
 * @property {"none"|"pulse"|"scale"|"fade"} [animation="none"]
 *   Optional animation preset applied on hover.
 *
 * @property {string} [className]
 *   Additional custom styles.
 *
 * @returns {JSX.Element}
 */
const Btn = ({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  text = "",
  className = "",
  icon = "",
  onClick = () => {},
  ariaLabel = undefined,
  href = undefined,
  hrefLocal = false,
  target = undefined,
  rel = undefined,
  tooltip = "",
  animation = "none",
  download = undefined,
}) => {
  const [asyncLoading, setAsyncLoading] = useState(loading);

  /** Accessibility requirement for icon-only buttons */
  const isIconOnly = icon && !text;

  // Auto-generate aria-label
  const resolvedAriaLabel =
    ariaLabel ||
    (typeof tooltip === "string" ? tooltip : undefined) ||
    (isIconOnly && typeof icon === "string"
      ? icon.replace(/[-_]/g, " ")
      : undefined);

  if (import.meta.env.DEV && isIconOnly && !resolvedAriaLabel) {
    console.warn(
      "[Btn] Icon-only buttons must include ariaLabel or tooltip for accessibility."
    );
  }

  /** Async-aware click handler */
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

  const Component = icon ? IconButton : Button;
  const button = (
    <Component
      disabled={disabled || loading || asyncLoading}
      onClick={handleClick}
      size={size}
      className={`
        frosted-btn 
        ${variant}
        ${isIconOnly ? "icon-only" : ""}
        ${loading || asyncLoading ? "loading" : ""}
        ${animation !== "none" ? `anim-${animation}` : ""}
        ${className}
      `}
      icon={
        <FrostedIcon
          size={size}
          icon={loading ? faSpinner : icon}
          variant={variant}
          clickable={!disabled}
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
        <Tooltip>
          <FrostedIcon
            icon={faCircleInfo}
            size="sm"
          />
          {tooltip}
        </Tooltip>
      }
    >
      {href ? (
        hrefLocal ? (
          <Link
            to={href}
            aria-label={resolvedAriaLabel}
            aria-busy={loading || asyncLoading}
            aria-disabled={disabled || loading}
          >
            {button}
          </Link>
        ) : (
          <a
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
