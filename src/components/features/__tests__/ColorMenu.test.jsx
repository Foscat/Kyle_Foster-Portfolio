/**
 * @file src\components\features\ColorMenu\ColorMenu.test.jsx
 * @description src\components\features\ColorMenu\ColorMenu.test module.
 * @module src\components\features\ColorMenu\ColorMenu.test
 */

import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithProviders from "tests/renderWithProviders";
import ColorMenu from "../ColorMenu";

vi.mock("components/ui/Btn", () => ({
  default: ({ onClick, ariaLabel, text, disabled }) => (
    <button type="button" aria-label={ariaLabel} onClick={onClick} disabled={disabled}>
      {text || ariaLabel}
    </button>
  ),
}));

describe("ColorMenu", () => {
  it("applies high contrast override from the color modal", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ColorMenu />);

    await user.click(screen.getByRole("button", { name: /open color settings/i }));
    await screen.findByRole("dialog", { name: /color settings/i });

    await user.click(screen.getByRole("switch", { name: /high contrast/i }));
    await user.click(screen.getByRole("button", { name: /apply color changes/i }));

    await waitFor(() => {
      expect(document.documentElement.dataset.a11yHighContrast).toBe("true");
      expect(document.body.dataset.mode).toBe("contrast");
    });
  });

  it("renders mode, UI style, layout style, and palette controls in the color modal", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ColorMenu />);

    await user.click(screen.getByRole("button", { name: /open color settings/i }));
    await screen.findByRole("dialog", { name: /color settings/i });

    expect(screen.getByRole("heading", { name: /theme mode/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /light theme/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /dark theme/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /ui style/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /ui style/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /layout style/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /layout style/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /palette/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /color palette/i })).toBeInTheDocument();
  });

  it("changes the active UI style from the color modal", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ColorMenu />);

    await user.click(screen.getByRole("button", { name: /open color settings/i }));
    await screen.findByRole("dialog", { name: /color settings/i });

    await user.selectOptions(screen.getByRole("combobox", { name: /ui style/i }), "cyberpunk");

    expect(document.body.dataset.ui).toBe("cyberpunk");
  });

  it("changes the active layout style from the color modal", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ColorMenu />);

    await user.click(screen.getByRole("button", { name: /open color settings/i }));
    await screen.findByRole("dialog", { name: /color settings/i });

    await user.selectOptions(screen.getByRole("combobox", { name: /layout style/i }), "maximalist");

    expect(document.body.dataset.layout).toBe("maximalist");
    expect(document.body.getAttribute("layout-style")).toBe("maximalist");
  });
});
