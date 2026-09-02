/**
 * @file Dialog.test.jsx
 * @description Verifies native dialog semantics and the shared close control.
 * @module components/ui/Dialog/Dialog.test
 */

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import renderWithProviders from "tests/renderWithProviders";
import Dialog from "./index.jsx";

describe("Dialog", () => {
  it("renders an accessible native dialog when open", () => {
    renderWithProviders(
      <Dialog open ariaLabel="Project preview">
        <Dialog.Body>Preview content</Dialog.Body>
      </Dialog>
    );

    const dialog = screen.getByRole("dialog", { name: "Project preview" });
    expect(dialog.tagName).toBe("DIALOG");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog.className).not.toMatch(/\brs-/u);
  });

  it("uses a native button to request closure", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    renderWithProviders(
      <Dialog open onClose={onClose}>
        <Dialog.Header>
          <Dialog.Title>Settings</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>Settings content</Dialog.Body>
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: /close dialog/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
