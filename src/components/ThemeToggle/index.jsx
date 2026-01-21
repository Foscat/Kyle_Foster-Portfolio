import { useTheme } from "assets/theme/ThemeContext";
import "./styles.css";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup } from "rsuite";
import Btn from "components/Btn";
import { Size, Theme, Variant } from "types/ui.types";

/**
 * ThemeToggle
 * ------------------------------------------------------------------
 * Compact theme selection control for switching between
 * light and dark application themes.
 *
 * Design goals:
 * - Minimal footprint (icon-only buttons)
 * - Clear active-state feedback
 * - Accessible via keyboard and screen readers
 * - Consistent with the frosted / glass UI system
 *
 * Behavior:
 * - Highlights the currently active theme
 * - Invokes ThemeContext to update global theme state
 * - Does not manage theme persistence directly
 *
 * @component
 * @returns {JSX.Element}
 */
const ThemeToggle = () => {
  /**
   * Current theme state and setter provided by ThemeContext.
   */
  const { theme, setTheme } = useTheme();

  return (
    <ButtonGroup className="theme-toggle" aria-label="Theme selector">
      {/* Light theme selector */}
      <Btn
        ariaLabel="Light theme"
        tooltip="Light theme"
        icon={faSun}
        size={Size.SM}
        noBG
        variant={theme === Theme.DARK ? Variant.SECONDARY : Variant.PRIMARY}
        onClick={() => setTheme(Theme.LIGHT)}
      />

      {/* Dark theme selector */}
      <Btn
        ariaLabel="Dark theme"
        tooltip="Dark theme"
        icon={faMoon}
        size={Size.SM}
        noBG
        variant={theme === Theme.DARK ? Variant.PRIMARY : Variant.SECONDARY}
        onClick={() => setTheme(Theme.DARK)}
      />
    </ButtonGroup>
  );
};

export default ThemeToggle;
