/**
 * @file src/components/features/LayoutStyleToggle/index.jsx
 * @description Selector for switching layout-style-css spatial systems.
 * @module components/features/LayoutStyleToggle
 */

import { useId } from "react";
import { useTheme } from "assets/context/ThemeContext.jsx";
import { Size } from "types/ui.types";
import "./styles.css";

const LAYOUT_STYLE_LABELS = Object.freeze({
  "minimal-saas": "Minimal SaaS",
  bento: "Bento",
  maximalist: "Maximalist",
  bauhaus: "Bauhaus",
  tactile: "Tactile",
  neumorphism: "Neumorphism",
  retrofuturism: "Retrofuturism",
  brutalism: "Brutalism",
  cyberpunk: "Cyberpunk",
  y2k: "Y2K",
  "retro-glass": "Retro Glass",
});

const SIZE_CLASS_BY_SIZE = Object.freeze({
  [Size.XS]: "layout-style-toggle__select--xs",
  [Size.SM]: "layout-style-toggle__select--sm",
  [Size.MD]: "layout-style-toggle__select--md",
  [Size.LG]: "layout-style-toggle__select--lg",
  [Size.XL]: "layout-style-toggle__select--xl",
});

const buildLayoutStyleOptions = (layoutStyles) => {
  if (!Array.isArray(layoutStyles) || layoutStyles.length === 0) {
    return Object.entries(LAYOUT_STYLE_LABELS).map(([value, label]) => ({ value, label }));
  }

  return layoutStyles
    .filter((layoutStyle) => typeof layoutStyle === "string" && layoutStyle in LAYOUT_STYLE_LABELS)
    .map((layoutStyle) => ({ value: layoutStyle, label: LAYOUT_STYLE_LABELS[layoutStyle] }));
};

/**
 * Compact select control for layout-style-css spatial systems.
 *
 * @param {Object} props - Component props.
 * @param {Size} [props.size=Size.MD] - Visual size of the select control.
 * @param {boolean} [props.showLabel=true] - Whether to render a visible label.
 * @param {string} [props.className] - Optional root className.
 * @param {string} [props.labelText="Layout Style"] - Visible label text.
 * @param {string} [props.ariaLabel="Layout style selector"] - Accessible select label.
 * @returns {JSX.Element} Rendered layout style selector.
 */
const LayoutStyleToggle = ({
  size = Size.MD,
  showLabel = true,
  className = "",
  labelText = "Layout Style",
  ariaLabel = "Layout style selector",
}) => {
  const { layoutStyle, setLayoutStyle, layoutStyles } = useTheme();
  const selectId = useId();
  const options = buildLayoutStyleOptions(layoutStyles);
  const selectSizeClass = SIZE_CLASS_BY_SIZE[size] || SIZE_CLASS_BY_SIZE[Size.MD];
  const activeLayoutStyle =
    options.some((option) => option.value === layoutStyle) && layoutStyle
      ? layoutStyle
      : (options[0]?.value ?? "retro-glass");

  return (
    <div className={`layout-style-toggle ${className}`.trim()}>
      {showLabel ? (
        <label className="layout-style-toggle__label" htmlFor={selectId}>
          {labelText}
        </label>
      ) : null}
      <select
        id={selectId}
        className={`interactive-surface layout-style-toggle__select ${selectSizeClass}`.trim()}
        data-surface-variant="secondary"
        data-surface-level="2"
        value={activeLayoutStyle}
        aria-label={ariaLabel}
        onChange={(event) => setLayoutStyle(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LayoutStyleToggle;
