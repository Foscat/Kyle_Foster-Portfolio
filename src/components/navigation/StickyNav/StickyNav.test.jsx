/**
 * @file StickyNav.test.jsx
 * @fileoverview Tests for the StickyNav component.
 * @description Tests for the StickyNav component, ensuring it renders correctly and handles interactions as expected.
 * @module components/navigation/StickyNav
 */

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import StickyNav from "./index";
import { PageRoute } from "types/ui.types";
import renderWithProviders from "tests/renderWithProviders";

// Mock the Nav and Drawer components from the rsuite library to prevent issues with their implementation during testing, allowing us to focus on the StickyNav's functionality without worrying about the complexities of these components.
vi.mock("rsuite", () => {
  const Nav = ({ children, vertical, ...rest }) => (
    <nav aria-label={vertical ? "Section drawer navigation" : "Primary navigation"} {...rest}>
      {children}
    </nav>
  );

  // Mock the Nav.Item component to render a simple link with the appropriate aria-current attribute when active, allowing us to test the navigation functionality and active state handling of the StickyNav component without relying on the actual implementation of the Nav.Item component.
  Nav.Item = ({ children, href, active, onClick }) => (
    <a href={href} aria-current={active ? "page" : undefined} onClick={onClick}>
      {children}
    </a>
  );

  // Mock the Drawer component to render a simple dialog with a close button, allowing us to test the mobile navigation functionality of the StickyNav component without relying on the actual implementation of the Drawer component.
  const Drawer = ({ open, onClose, children }) =>
    open ? (
      <div role="dialog" aria-label="Site Navigation">
        <button onClick={onClose}>Close navigation</button>
        {children}
      </div>
    ) : null;

  Drawer.Header = ({ children }) => <div>{children}</div>;
  Drawer.Title = ({ children }) => <h2>{children}</h2>;
  Drawer.Body = ({ children }) => <div>{children}</div>;

  return { Nav, Drawer };
});

// Mock the Btn component from the UI library to simplify testing and focus on the StickyNav's functionality.
vi.mock("components/ui", () => ({
  Btn: ({ onClick, ariaLabel }) => (
    <button onClick={onClick} aria-label={ariaLabel}>
      Open
    </button>
  ),
  FrostedIcon: ({ ariaLabel }) => <span>{ariaLabel}</span>,
}));

// Mock the ThemeToggle component from the features library to prevent issues with its implementation during testing, allowing us to focus on the StickyNav's functionality without worrying about the complexities of the ThemeToggle component.
vi.mock("components/features", () => ({
  ThemeToggle: () => <button aria-label="Toggle theme">Theme</button>,
}));

// The test suite for the StickyNav component, which includes tests to verify that the active route is marked correctly, that the mobile navigation opens when the menu trigger is activated, and that the mobile navigation closes after a destination is chosen, ensuring that the component behaves as expected in various scenarios.
describe("StickyNav", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test to ensure that the active route is marked with the aria-current attribute, verifying that the StickyNav component correctly identifies the active page and applies the appropriate accessibility attributes to indicate the current page to assistive technologies.
  it("marks the active route with aria-current", () => {
    renderWithProviders(<StickyNav activePage={PageRoute.PROFESSIONAL} />);

    expect(screen.getByRole("link", { current: "page" })).toBeInTheDocument();
    expect(screen.getByText(/professional work/i)).toBeInTheDocument();
  });

  // Test to verify that when the menu trigger is activated, the mobile navigation opens and displays the site navigation dialog, ensuring that the StickyNav component correctly handles user interactions to open the mobile navigation menu and provides access to the site navigation options.
  it("opens the mobile navigation when the menu trigger is activated", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    await user.click(screen.getByRole("button", { name: /open navigation menu/i }));

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: /site navigation/i })).toBeInTheDocument();
    });
  });

  // Test to ensure that after a destination is chosen from the mobile navigation, the navigation menu closes, verifying that the StickyNav component correctly handles user interactions to close the mobile navigation menu after a selection is made, providing a seamless user experience on mobile devices.
  it("closes the mobile navigation after a destination is chosen", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    await user.click(screen.getByRole("button", { name: /open navigation menu/i }));
    await user.click(screen.getByRole("link", { name: /contact me/i }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /site navigation/i })).not.toBeInTheDocument();
    });
  });
});
