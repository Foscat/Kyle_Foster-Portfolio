import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const ThemeContext = createContext(null);

/**
 * ThemeProvider
 * ------------------------------------------------------------
 * Provides global theme state (light | dark | auto)
 * Persists user choice and resolves system preference
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "auto";
  });

  const resolvedTheme = useMemo(() => {
    if (theme === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    localStorage.setItem("theme", theme);
  }, [theme, resolvedTheme]);

  /** ✅ THIS RETURN IS REQUIRED */
  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to access theme context
 */
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
