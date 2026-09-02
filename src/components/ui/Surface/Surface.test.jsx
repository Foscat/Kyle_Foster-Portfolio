/**
 * @file Surface.test.jsx
 * @description Verifies the native surface primitive and its disclosure behavior.
 * @module components/ui/Surface/Surface.test
 */

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import renderWithProviders from "tests/renderWithProviders";
import Surface from "./index.jsx";

describe("Surface", () => {
  it("renders the requested semantic element without third-party wrapper classes", () => {
    renderWithProviders(
      <Surface as="section" className="project-surface" aria-label="Project surface">
        Portfolio content
      </Surface>
    );

    const surface = screen.getByRole("region", { name: "Project surface" });
    expect(surface).toHaveClass("surface", "ly-surface", "project-surface");
    expect(surface).not.toHaveClass("rs-panel");
  });

  it("uses a native button to toggle collapsible content", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    renderWithProviders(
      <Surface collapsible defaultExpanded={false} header="Details" onSelect={onSelect}>
        Private details
      </Surface>
    );

    const trigger = screen.getByRole("button", { name: /details/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Private details")).not.toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Private details")).toBeInTheDocument();
    expect(onSelect).toHaveBeenCalledWith(true, expect.anything());
  });
});
