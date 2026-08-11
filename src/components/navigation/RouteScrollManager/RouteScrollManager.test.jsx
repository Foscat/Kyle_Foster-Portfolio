/**
 * @file RouteScrollManager.test.jsx
 * @description Verifies scroll behavior when the client-side route changes.
 * @module components/navigation/RouteScrollManager/tests
 */

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import renderWithProviders from "tests/renderWithProviders";
import RouteScrollManager from ".";

function NavigationHarness() {
  const navigate = useNavigate();

  return (
    <>
      <RouteScrollManager />
      <button type="button" onClick={() => navigate("/next-route")}>
        Next route
      </button>
      <button type="button" onClick={() => navigate("/next-route#details")}>
        Deep link
      </button>
    </>
  );
}

describe("RouteScrollManager", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it("returns to the page start after pathname navigation", async () => {
    const user = userEvent.setup();

    renderWithProviders(<NavigationHarness />, { initialEntries: ["/current-route"] });

    window.scrollTo.mockClear();
    await user.click(screen.getByRole("button", { name: "Next route" }));

    expect(window.scrollTo).toHaveBeenCalledWith({
      behavior: "auto",
      left: 0,
      top: 0,
    });
  });

  it("preserves native hash navigation for deep links", async () => {
    const user = userEvent.setup();

    renderWithProviders(<NavigationHarness />, { initialEntries: ["/current-route"] });

    window.scrollTo.mockClear();
    await user.click(screen.getByRole("button", { name: "Deep link" }));

    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
