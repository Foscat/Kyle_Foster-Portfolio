/**
 * @file ThemeContext.test.jsx
 * @description Regression tests for ThemeContext runtime safety and input validation.
 * @module assets/context/ThemeContext.test
 */

import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "tests/renderWithProviders";
import { useTheme } from "./ThemeContext";

function ThemeContextProbe() {
  const { theme, setTheme, uiStyle, setUiStyle, layoutStyle, setLayoutStyle, layoutStyles } =
    useTheme();

  return (
    <div>
      <p data-testid="theme-value">{theme}</p>
      <p data-testid="ui-style-value">{uiStyle}</p>
      <p data-testid="layout-style-value">{layoutStyle}</p>
      <p data-testid="layout-style-options">{layoutStyles.join(",")}</p>
      <button type="button" onClick={() => setTheme("light")}>
        Set light theme
      </button>
      <button type="button" onClick={() => setTheme("invalid-theme")}>
        Set invalid theme
      </button>
      <button type="button" onClick={() => setUiStyle("cyberpunk")}>
        Set cyberpunk UI style
      </button>
      <button type="button" onClick={() => setUiStyle("invalid-style")}>
        Set invalid UI style
      </button>
      <button type="button" onClick={() => setLayoutStyle("maximalist")}>
        Set maximalist layout style
      </button>
      <button type="button" onClick={() => setLayoutStyle("synthwave")}>
        Set synthwave layout style
      </button>
      <button type="button" onClick={() => setLayoutStyle("invalid-layout")}>
        Set invalid layout style
      </button>
    </div>
  );
}

describe("ThemeContext", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
    delete document.documentElement.dataset.ui;
    delete document.documentElement.dataset.layout;
    delete document.documentElement.dataset.theme;
    delete document.documentElement.dataset.mode;
    delete document.documentElement.dataset.palette;
    document.documentElement.removeAttribute("layout-style");
    delete document.body.dataset.ui;
    delete document.body.dataset.layout;
    delete document.body.dataset.theme;
    delete document.body.dataset.mode;
    document.body.classList.remove("ly-root");
    document.body.removeAttribute("layout-style");
  });

  test("falls back to dark theme when storage read fails", async () => {
    window.localStorage.setItem("portfolio-theme", "light");
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Storage read blocked");
    });

    renderWithProviders(<ThemeContextProbe />);

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
  });

  test("ignores invalid theme updates", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ThemeContextProbe />);

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    await user.click(screen.getByRole("button", { name: /set invalid theme/i }));
    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
  });

  test("applies supported UI style changes to the style-kit attribute", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ThemeContextProbe />);

    expect(screen.getByTestId("ui-style-value")).toHaveTextContent("retro-glass");
    expect(document.documentElement.dataset.ui).toBe("retro-glass");
    expect(document.body.dataset.ui).toBe("retro-glass");

    await user.click(screen.getByRole("button", { name: /set cyberpunk ui style/i }));

    expect(screen.getByTestId("ui-style-value")).toHaveTextContent("cyberpunk");
    expect(document.documentElement.dataset.ui).toBe("cyberpunk");
    expect(document.body.dataset.ui).toBe("cyberpunk");
    await waitFor(() => {
      expect(window.localStorage.getItem("portfolio-ui-style")).toBe("cyberpunk");
    });
  });

  test("applies supported layout style changes to layout-style-css attributes", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ThemeContextProbe />);

    expect(screen.getByTestId("layout-style-value")).toHaveTextContent("retro-glass");
    expect(document.documentElement.dataset.layout).toBe("retro-glass");
    expect(document.body.dataset.layout).toBe("retro-glass");
    expect(document.body.getAttribute("layout-style")).toBe("retro-glass");
    expect(document.body).toHaveClass("ly-root");

    await user.click(screen.getByRole("button", { name: /set maximalist layout style/i }));

    expect(screen.getByTestId("layout-style-value")).toHaveTextContent("maximalist");
    expect(document.documentElement.dataset.layout).toBe("maximalist");
    expect(document.body.dataset.layout).toBe("maximalist");
    expect(document.body.getAttribute("layout-style")).toBe("maximalist");
    await waitFor(() => {
      expect(window.localStorage.getItem("portfolio-layout-style")).toBe("maximalist");
    });
  });

  test("exposes layout-style-css 1.1.2 layout styles", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ThemeContextProbe />);

    expect(screen.getByTestId("layout-style-options")).toHaveTextContent(
      "f-pattern,z-pattern,split-screen,mondrian,synthwave"
    );

    await user.click(screen.getByRole("button", { name: /set synthwave layout style/i }));

    expect(screen.getByTestId("layout-style-value")).toHaveTextContent("synthwave");
    expect(document.documentElement.dataset.layout).toBe("synthwave");
    expect(document.body.dataset.layout).toBe("synthwave");
    expect(document.body.getAttribute("layout-style")).toBe("synthwave");
  });

  test("uses package-owned palette roles instead of inline palette custom properties", async () => {
    renderWithProviders(<ThemeContextProbe />);

    expect(document.documentElement.dataset.palette).toBe("ocean-steel");
    expect(document.body.dataset.theme).toBe("ocean-steel");
    expect(document.body.dataset.mode).toBe("dark");
    expect(document.documentElement.style.getPropertyValue("--bg")).toBe("");
    expect(document.documentElement.style.getPropertyValue("--bg-rgb")).toBe("");
    expect(document.documentElement.style.getPropertyValue("--primary")).toBe("");
    expect(document.documentElement.style.getPropertyValue("--usk-bg-rgb")).toBe("");
  });

  test("ignores invalid UI style updates", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ThemeContextProbe />);

    expect(screen.getByTestId("ui-style-value")).toHaveTextContent("retro-glass");
    await user.click(screen.getByRole("button", { name: /set invalid ui style/i }));
    expect(screen.getByTestId("ui-style-value")).toHaveTextContent("retro-glass");
  });

  test("ignores invalid layout style updates", async () => {
    const user = userEvent.setup();

    renderWithProviders(<ThemeContextProbe />);

    expect(screen.getByTestId("layout-style-value")).toHaveTextContent("retro-glass");
    await user.click(screen.getByRole("button", { name: /set invalid layout style/i }));
    expect(screen.getByTestId("layout-style-value")).toHaveTextContent("retro-glass");
  });

  test("applies theme changes even when storage writes fail", async () => {
    const user = userEvent.setup();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage write blocked");
    });

    renderWithProviders(<ThemeContextProbe />);

    await user.click(screen.getByRole("button", { name: /set light theme/i }));
    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  test("cycles theme with Alt+Shift+T hotkey", async () => {
    renderWithProviders(<ThemeContextProbe />);

    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");

    fireEvent.keyDown(window, { key: "T", altKey: true, shiftKey: true });
    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");

    fireEvent.keyDown(window, { key: "T", altKey: true, shiftKey: true });
    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
  });

  test("ignores theme hotkey while typing in editable controls", async () => {
    renderWithProviders(
      <div>
        <ThemeContextProbe />
        <input aria-label="note" />
      </div>
    );

    const input = screen.getByRole("textbox", { name: /note/i });
    input.focus();

    fireEvent.keyDown(input, { key: "T", altKey: true, shiftKey: true });
    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
  });
});
