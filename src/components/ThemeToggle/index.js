import { useTheme } from "assets/theme/ThemeContext";
import "./styles.css";
import {
  faCircleHalfStroke,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

/**
 * ThemeToggle
 * ------------------------------------------------------------
 * Compact theme switcher (auto / light / dark)
 * - Frosted glass styling
 * - Keyboard + screen-reader friendly
 */
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ButtonGroup
      className="theme-toggle"
      aria-label="Theme selector"
    >
      <Btn
        aria-label="Auto theme"
        appearance={theme === "auto" ? "primary" : "subtle"}
        onClick={() => setTheme("auto")}
        icon={faCircleHalfStroke}
      />
      <Btn
        aria-label="Light theme"
        appearance={theme === "light" ? "primary" : "subtle"}
        onClick={() => setTheme("light")}
        icon={faSun}
      />
      <Btn
        aria-label="Dark theme"
        appearance={theme === "dark" ? "primary" : "subtle"}
        onClick={() => setTheme("dark")}
        icon={faMoon}
      />
    </ButtonGroup>
  );
};

export default ThemeToggle;
