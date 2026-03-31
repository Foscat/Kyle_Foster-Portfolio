import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithProviders from "tests/renderWithProviders";
import AccessibilityMenu from "./index";

vi.mock("components/features/ThemeToggle", () => ({
  default: () => <button aria-label="Theme toggle">Theme</button>,
}));

vi.mock("components/ui/Btn", () => ({
  default: ({ onClick, ariaLabel, text, disabled }) => (
    <button type="button" aria-label={ariaLabel} onClick={onClick} disabled={disabled}>
      {text || ariaLabel}
    </button>
  ),
}));

describe("AccessibilityMenu", () => {
  it("toggles reduced motion and high contrast settings from the modal", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AccessibilityMenu enableHotkey />);

    await user.click(screen.getByRole("button", { name: /open accessibility settings/i }));

    await screen.findByRole("dialog", { name: /accessibility settings/i });

    await user.click(screen.getByRole("switch", { name: /reduce motion/i }));
    await user.click(screen.getByRole("button", { name: /apply accessibility changes/i }));
    await waitFor(() => {
      expect(document.documentElement.dataset.a11yReducedMotion).toBe("true");
    });

    await user.click(screen.getByRole("button", { name: /open accessibility settings/i }));
    await screen.findByRole("dialog", { name: /accessibility settings/i });
    await user.click(screen.getByRole("switch", { name: /high contrast/i }));
    await user.click(screen.getByRole("button", { name: /apply accessibility changes/i }));
    await waitFor(() => {
      expect(document.documentElement.dataset.a11yHighContrast).toBe("true");
    });
  });

  it("opens via Alt+A hotkey and announces updates", async () => {
    const user = userEvent.setup();
    renderWithProviders(<AccessibilityMenu enableHotkey />);

    await user.keyboard("{Alt>}a{/Alt}");

    await screen.findByRole("dialog", { name: /accessibility settings/i });

    await user.click(screen.getByRole("switch", { name: /large text/i }));
    await user.click(screen.getByRole("button", { name: /apply accessibility changes/i }));

    await waitFor(() => {
      expect(document.documentElement.dataset.a11yLargeText).toBe("true");
    });
  });
});
