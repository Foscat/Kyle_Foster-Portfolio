/**
 * @file index.jsx
 * @description In-app selector for switching ui-style-kit-css visual systems.
 * @module components/UiStyleToggle
 */

import { useId } from "react";
import { useTheme } from "assets/context/ThemeContext.jsx";
import { Size } from "types/ui.types";
import "./styles.css";

const UI_STYLE_LABELS = Object.freeze({
  "minimal-saas": "Minimal SaaS",
  bento: "Bento UI",
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
  [Size.XS]: "ui-style-toggle__select--xs",
  [Size.SM]: "ui-style-toggle__select--sm",
  [Size.MD]: "ui-style-toggle__select--md",
  [Size.LG]: "ui-style-toggle__select--lg",
  [Size.XL]: "ui-style-toggle__select--xl",
});

const buildUiStyleOptions = (uiStyles) => {
  if (!Array.isArray(uiStyles) || uiStyles.length === 0) {
    return Object.entries(UI_STYLE_LABELS).map(([value, label]) => ({ value, label }));
  }

  return uiStyles
    .filter((uiStyle) => typeof uiStyle === "string" && uiStyle in UI_STYLE_LABELS)
    .map((uiStyle) => ({ value: uiStyle, label: UI_STYLE_LABELS[uiStyle] }));
};

/**
 * UiStyleToggle
 * ------------------------------------------------------------------
 * Compact select control for switching ui-style-kit-css visual systems.
 *
 * @public
 * @component
 *
 * @param {Object} props - Component props.
 * @param {Size} [props.size=Size.MD] - Visual size of the select control.
 * @param {boolean} [props.showLabel=true] - Whether to render a visible label.
 * @param {string} [props.className] - Optional root className.
 * @param {string} [props.labelText="UI Style"] - Visible label text.
 * @param {string} [props.ariaLabel="UI style selector"] - Accessible label for select.
 * @returns {JSX.Element}
 */
const UiStyleToggle = ({
  size = Size.MD,
  showLabel = true,
  className = "",
  labelText = "UI Style",
  ariaLabel = "UI style selector",
}) => {
  const { uiStyle, setUiStyle, uiStyles } = useTheme();
  const selectId = useId();
  const options = buildUiStyleOptions(uiStyles);
  const selectSizeClass = SIZE_CLASS_BY_SIZE[size] || SIZE_CLASS_BY_SIZE[Size.MD];
  const activeUiStyle =
    options.some((option) => option.value === uiStyle) && uiStyle
      ? uiStyle
      : (options[0]?.value ?? "retro-glass");

  return (
    <div className={`ui-style-toggle ${className}`.trim()}>
      {showLabel ? (
        <label className="ui-style-toggle__label" htmlFor={selectId}>
          {labelText}
        </label>
      ) : null}
      <select
        id={selectId}
        className={`ui-style-toggle__select ${selectSizeClass}`.trim()}
        value={activeUiStyle}
        aria-label={ariaLabel}
        onChange={(event) => setUiStyle(event.target.value)}
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

export default UiStyleToggle;
