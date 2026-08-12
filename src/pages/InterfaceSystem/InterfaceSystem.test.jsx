/**
 * @file InterfaceSystem.test.jsx
 * @description Page-level contracts for the open-source interface system route.
 * @module pages/InterfaceSystem/InterfaceSystem.test
 */

import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InterfaceSystem from "pages/InterfaceSystem";
import { PageRoute } from "types/navigation.types";
import renderWithProviders from "tests/renderWithProviders";

const LAZY_NAVIGATION_TIMEOUT_MS = 10_000;

describe("InterfaceSystem", () => {
  it("presents the four published packages as one coordinated system", () => {
    renderWithProviders(<InterfaceSystem />);

    expect(screen.getByRole("heading", { level: 1, name: "The Interface System" })).toBeVisible();

    const packageRegion = screen.getByRole("region", { name: "Published packages" });
    const packageCards = within(packageRegion).getAllByRole("article");

    expect(packageCards).toHaveLength(4);
    expect(within(packageRegion).getByText("layout-style-css")).toBeVisible();
    expect(within(packageRegion).getByText("ui-style-kit-css")).toBeVisible();
    expect(within(packageRegion).getByText("ui-style-kit-icons")).toBeVisible();
    expect(within(packageRegion).getByText("interactive-surface-css")).toBeVisible();
  });

  it(
    "marks the dedicated route active and links to implementation proof",
    async () => {
      const user = userEvent.setup();
      renderWithProviders(<InterfaceSystem />);

      const websiteTrigger = await screen.findByRole(
        "button",
        { name: "Open website navigation" },
        { timeout: LAZY_NAVIGATION_TIMEOUT_MS }
      );
      await user.click(websiteTrigger);
      expect(
        await screen.findByRole(
          "link",
          { current: "page", name: "Interface System" },
          { timeout: LAZY_NAVIGATION_TIMEOUT_MS }
        )
      ).toHaveAttribute("href", PageRoute.INTERFACE_SYSTEM);
      expect(screen.getByRole("link", { name: "See the system in project work" })).toHaveAttribute(
        "href",
        `${PageRoute.SIDE_PROJECTS}#layout-style-css`
      );
    },
    LAZY_NAVIGATION_TIMEOUT_MS + 5_000
  );
});
