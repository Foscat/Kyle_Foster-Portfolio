/**
 * @file index.jsx
 * @description In-app color palette selector for switching between supported
 * palette themes.
 * @module components/PaletteToggle
 */

import { useId } from "react";
import { useTheme } from "assets/context/ThemeContext.jsx";
import { Size } from "types/ui.types";
import "./styles.css";

const PALETTE_LABELS = Object.freeze({
  primary: "Midnight",
  alt: "Classic",
  forest: "Forest",
  ocean: "Ocean",
  sunset: "Sunset",
});

const SIZE_CLASS_BY_SIZE = Object.freeze({
  [Size.XS]: "palette-toggle__select--xs",
  [Size.SM]: "palette-toggle__select--sm",
  [Size.MD]: "palette-toggle__select--md",
  [Size.LG]: "palette-toggle__select--lg",
  [Size.XL]: "palette-toggle__select--xl",
});

const buildPaletteOptions = (palettes) => {
  if (!Array.isArray(palettes) || palettes.length === 0) {
    return Object.entries(PALETTE_LABELS).map(([value, label]) => ({ value, label }));
  }

  return palettes
    .filter((palette) => typeof palette === "string" && palette in PALETTE_LABELS)
    .map((palette) => ({ value: palette, label: PALETTE_LABELS[palette] }));
};

/**
 * PaletteToggle
 * ------------------------------------------------------------------
 * Compact select control for switching app-level color palettes.
 *
 * @public
 * @component
 *
 * @param {Object} props - Component props.
 * @param {Size} [props.size=Size.MD] - Visual size of the select control.
 * @param {boolean} [props.showLabel=true] - Whether to render a visible label.
 * @param {string} [props.className] - Optional root className.
 * @param {string} [props.labelText="Palette"] - Visible label text.
 * @param {string} [props.ariaLabel="Color palette selector"] - Accessible label for select.
 * @returns {JSX.Element}
 */
const PaletteToggle = ({
  size = Size.MD,
  showLabel = true,
  className = "",
  labelText = "Palette",
  ariaLabel = "Color palette selector",
}) => {
  const { palette, setPalette, palettes } = useTheme();
  const selectId = useId();
  const options = buildPaletteOptions(palettes);
  const selectSizeClass = SIZE_CLASS_BY_SIZE[size] || SIZE_CLASS_BY_SIZE[Size.MD];
  const activePalette =
    options.some((option) => option.value === palette) && palette
      ? palette
      : (options[0]?.value ?? "primary");

  return (
    <div className={`palette-toggle ${className}`.trim()}>
      {showLabel ? (
        <label className="palette-toggle__label" htmlFor={selectId}>
          {labelText}
        </label>
      ) : null}
      <select
        id={selectId}
        className={`palette-toggle__select ${selectSizeClass}`.trim()}
        value={activePalette}
        aria-label={ariaLabel}
        onChange={(event) => setPalette(event.target.value)}
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

export default PaletteToggle;
