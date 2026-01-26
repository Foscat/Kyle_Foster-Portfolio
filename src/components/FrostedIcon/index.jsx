import { Tooltip, Whisper } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

/**
 * @file index.jsx
 * @description Styled FontAwesome icon component integrated with the
 * Midnight Gold frosted UI system.
 * @module components/FrostedIcon
 */

/**
 * FontAwesomeIconProps
 * ---------------------------------------------------------------------------
 * Subset of props forwarded directly to the underlying `FontAwesomeIcon`
 * component. These align with the official `@fortawesome/react-fontawesome`
 * API and are documented here for completeness.
 *
 * @typedef {Object} FontAwesomeIconProps
 * @property {boolean} [border=false] - Renders a border around the icon.
 * @property {*} [mask] - Icon used as a mask.
 * @property {string} [maskId] - Optional ID for the SVG mask.
 * @property {boolean} [inverse=false] - Inverts icon color.
 * @property {string|boolean} [flip=false] - Flips the icon ("horizontal", "vertical", or "both").
 * @property {string} [pull] - Pulls icon left or right.
 * @property {number} [rotation] - Rotates icon (90, 180, 270).
 * @property {boolean|number} [rotateBy=false] - Arbitrary rotation value.
 * @property {boolean} [spinPulse=false] - Enables pulse-style spinning.
 * @property {boolean} [spinReverse=false] - Reverses spin direction.
 * @property {boolean} [fade=false] - Enables fade animation.
 * @property {boolean} [beatFade=false] - Enables beat-fade animation.
 * @property {boolean} [bounce=false] - Enables bounce animation.
 * @property {boolean} [shake=false] - Enables shake animation.
 * @property {boolean|string} [symbol=false] - Exports icon as SVG symbol.
 * @property {string} [title] - SVG `<title>` content.
 * @property {string} [titleId] - ID applied to SVG title element.
 * @property {string|Object} [transform] - SVG transform definition.
 * @property {boolean} [swapOpacity=false] - Swaps opacity layers.
 * @property {boolean} [widthAuto=false] - Enables automatic width calculation.
 */

/**
 * FrostedIcon
 * ---------------------------------------------------------------------------
 * A styled wrapper around {@link FontAwesomeIcon} that conforms to the
 * Midnight Gold + Frosted UI system.
 *
 * Core responsibilities:
 * - Applies frosted-glass theming and size variants
 * - Manages loading and animation states
 * - Provides optional click interaction
 * - Exposes tooltip support via RSuite Whisper
 * - Forwards supported FontAwesome props directly to the SVG renderer
 *
 * Accessibility:
 * - Uses `role="button"` when clickable
 * - Applies `aria-label` when provided
 * - Uses `aria-busy` during loading states
 *
 * @public
 * @component
 *
 * @param {Object} props - Component props.
 *
 * @param {string} props.icon
 *   FontAwesome icon definition to render.
 *
 * @param {Size} [props.size="md"]
 *   Icon size variant (xs | sm | md | lg | xl).
 *
 * @param {string} [props.variant="primary"]
 *   Visual style variant applied via CSS.
 *
 * @param {boolean} [props.clickable=false]
 *   Enables pointer and keyboard interaction.
 *
 * @param {Function} [props.onClick=()=>{}]
 *   Click handler invoked when clickable.
 *
 * @param {boolean} [props.loading=false]
 *   Displays a loading spinner and sets aria-busy.
 *
 * @param {boolean} [props.spin=false]
 *   Forces spin animation regardless of loading state.
 *
 * @param {string} [props.tooltip]
 *   Optional tooltip text displayed on hover.
 *
 * @param {string} [props.ariaLabel]
 *   Accessible label for screen readers.
 *
 * @param {boolean} [props.noBG=false]
 *   Disables the frosted background circle.
 *
 * @param {string} [props.className]
 *   Additional CSS class names.
 *
 * @param {FontAwesomeIconProps} [props.*]
 *   Any supported FontAwesomeIcon props are forwarded directly to the
 *   underlying SVG renderer.
 *
 * @returns {JSX.Element} Rendered frosted icon.
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
  return (
    <Whisper
      delay={250}
      trigger={tooltip ? "hover" : "none"}
      followCursor={true}
      speaker={<Tooltip>{tooltip}</Tooltip>}
    >
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
    </Whisper>
  );
};

export default FrostedIcon;
