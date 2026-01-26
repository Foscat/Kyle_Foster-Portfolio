import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup, ButtonToolbar } from "rsuite";
import Btn from "components/Btn";
import { useTheme } from "assets/theme/ThemeContext";
import { Size, Theme, Variant } from "types/ui.types";
import "./styles.css";

/**
 * @file index.jsx
 * @description Compact theme selection control for switching between
 * light and dark application themes.
 * @module components/ThemeToggle
 */

/**
 * ThemeToggle
 * ------------------------------------------------------------------
 * Compact, icon-only theme selector used to toggle between light and
 * dark application themes.
 *
 * Design goals:
 * - Minimal visual footprint
 * - Clear active-state feedback
 * - Keyboard and screen-reader accessible
 * - Consistent with the frosted / glass UI system
 *
 * Behavior:
 * - Highlights the currently active theme
 * - Disables the active option to prevent redundant state updates
 * - Delegates theme state management to ThemeContext
 *
 * Accessibility:
 * - Toolbar includes an aria-label for screen readers
 * - Each button includes descriptive aria-labels and tooltips
 *
 * @public
 * @component
 *
 * @param {Object} props - Component props.
 * @param {Size} [props.size=Size.SM]
 *   Size applied to the toggle buttons.
 *
 * @returns {JSX.Element} Rendered theme toggle control.
 */
const ThemeToggle = ({ size = Size.SM }) => {
  /**
   * Current theme state and setter provided by ThemeContext.
   */
  const { theme, setTheme } = useTheme();

  return (
    <ButtonToolbar className="theme-toggle" aria-label="Theme selector">
      {/* Light theme selector */}
      <Btn
        ariaLabel="Light theme"
        tooltip={theme === Theme.LIGHT ? "Light theme active" : "Switch to light theme"}
        icon={faSun}
        size={size}
        noBG
        variant={theme === Theme.LIGHT ? Variant.PRIMARY : Variant.SUBTLE}
        disabled={theme === Theme.LIGHT}
        onClick={() => {
          if (theme === Theme.LIGHT) return;
          else setTheme(Theme.LIGHT);
        }}
      />

      {/* Dark theme selector */}
      <Btn
        ariaLabel="Dark theme"
        tooltip={theme === Theme.DARK ? "Dark theme active" : "Switch to dark theme"}
        icon={faMoon}
        size={size}
        noBG
        variant={theme === Theme.DARK ? Variant.SUBTLE : Variant.PRIMARY}
        disabled={theme === Theme.DARK}
        onClick={() => {
          if (theme === Theme.DARK) return;
          else setTheme(Theme.DARK);
        }}
      />
    </ButtonToolbar>
  );
};

export default ThemeToggle;
