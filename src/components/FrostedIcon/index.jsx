import "./styles.css";


/**
 * FrostedIcon Component
 * ------------------------------------------------------------
 * A styled wrapper around <FontAwesomeIcon /> that integrates with
 * your custom Midnight Gold UI theme. Supports:
 *
 *  - Size variants: xs, sm, md, lg, xl
 *  - Variants: primary, secondary, accent, subtle, danger
 *  - Hover animations
 *  - Clickable mode
 *  - Optional label for accessibility
 *
 * @component
 * @param {object} props
 * @param {string} props.icon - FontAwesome icon definition.
 * @param {Size} [props.size="md"] - Icon size (xs|sm|md|lg|xl).
 * @param {string} [props.variant="primary"] - Color style.
 * @param {boolean} [props.clickable=false] - Enables hover/click effects.
 * @param {string} [props.className=""] - Additional classes.
 * @param {boolean} [props.loading=false] - Content loading state
 * @param {string} [props.ariaLabel] - For accessibility (aria-label).
 * @param {string} [props.tooltip] - Optional tooltip info on hover
 */
const FrostedIcon = ({
  icon,
  size = "md",
  variant = "primary",
  clickable = false,
  onClick = () => {},
  className = "",
  loading = false,
  tooltip = "",
  ariaLabel = "",
}) => {
  return (
    <Whisper
      delay={250}
      trigger={tooltip ? "hover" : "none"}
      followCursor={true}
      speaker={<Tooltip>{tooltip}</Tooltip>}
    >
      <span
        onClick={() => {
          if (clickable) onClick();
        }}
        role={clickable ? "button" : "img"}
        aria-label={ariaLabel || undefined}
        aria-busy={loading}
        tabIndex={clickable ? 0 : undefined}
        className={`
        frosted-icon
        ${loading ? "loading" : ""}
        fi-${size}
        fi-${variant}
        ${clickable ? "fi-clickable" : ""}
        ${className}
      `}
      >
        <FontAwesomeIcon
          spin={loading}
          icon={loading ? faSpinner : icon}
        />
      </span>
    </Whisper>
  );
};

export default FrostedIcon;
