import { Tooltip, Whisper } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
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
 * @param {boolean} [props.noBG=false] - Disable background circle
 * @param {function} [props.onClick=()=>{}] - Click handler
 * @returns {JSX.Element}
 */
const FrostedIcon = ({
  icon,
  size = "md",
  spin = false,
  variant = "primary",
  clickable = false,
  onClick = () => {},
  className = "",
  loading = false,
  tooltip = "",
  ariaLabel = "",
  noBG = false,
}) => {
  return (
    <Whisper
      delay={250}
      trigger={tooltip ? "hover" : "none"}
      followCursor={true}
      speaker={<Tooltip>{tooltip}</Tooltip>}
    >
      {/* <span
        onClick={() => {
          if (clickable) onClick();
        }}
        role={clickable ? "button" : "img"}
        aria-label={ariaLabel || undefined}
        aria-busy={loading}
        tabIndex={clickable ? 0 : undefined}
        className={`
        frosted-icon
        fi-size-${size}
        fi-variant-${variant}
        ${noBG ? "fi-no-bg" : ""}
        ${clickable ? "fi-clickable" : ""}
        ${className}
      `}
      > */}
      <FontAwesomeIcon
        onClick={() => {
          if (clickable) onClick();
        }}
        role={clickable ? "button" : "img"}
        aria-label={ariaLabel || undefined}
        aria-busy={loading}
        tabIndex={clickable ? 0 : undefined}
        className={`
            frosted-icon
            fi-size-${size}
            fi-variant-${variant}
            ${noBG ? "fi-no-bg" : ""}
            ${clickable ? "fi-clickable" : ""}
            ${className}
          `}
        spin={loading || spin}
        size={size}
        icon={loading ? faSpinner : icon}
      />
      {/* </span> */}
    </Whisper>
  );
};

export default FrostedIcon;
