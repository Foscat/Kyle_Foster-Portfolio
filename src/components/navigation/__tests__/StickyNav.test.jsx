/**
 * @file StickyNav.test.jsx
 * @fileoverview Tests for the StickyNav component.
 * @description Tests for the StickyNav component, ensuring it renders correctly and handles interactions as expected.
 * @module components/navigation/StickyNav
 */

import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLocation } from "react-router";

import StickyNav from "../StickyNav/";
import { PageRoute } from "types/navigation.types";
import renderWithProviders from "tests/renderWithProviders";

// Mock the Nav and Drawer components from the rsuite library to prevent issues with their implementation during testing, allowing us to focus on the StickyNav's functionality without worrying about the complexities of these components.
vi.mock("rsuite", async () => {
  const actual = await vi.importActual("rsuite");

  const FlexboxGrid = ({ children }) => <div>{children}</div>;
  FlexboxGrid.Item = ({ children }) => <div>{children}</div>;

  return {
    ...actual,
    Panel: ({ children, className, role }) => (
      <header className={className} role={role}>
        {children}
      </header>
    ),
    FlexboxGrid,
  };
});

// Mock the Btn component from the UI library to simplify testing and focus on the StickyNav's functionality.
vi.mock("components/ui", async () => {
  const actual = await vi.importActual("components/ui");

  return {
    ...actual,
    Btn: ({ onClick, ariaLabel, ariaCurrent, href, hrefLocal }) => {
      if (href) {
        return (
          <a
            href={href}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-current={ariaCurrent}
            data-local={hrefLocal ? "true" : "false"}
          >
            Open
          </a>
        );
      }

      return (
        <button onClick={onClick} aria-label={ariaLabel} aria-current={ariaCurrent}>
          Open
        </button>
      );
    },
    FrostedIcon: ({ ariaLabel }) => <span>{ariaLabel}</span>,
  };
});

// Mock the ThemeToggle component from the features library to prevent issues with its implementation during testing, allowing us to focus on the StickyNav's functionality without worrying about the complexities of the ThemeToggle component.
vi.mock("components/features", () => ({
  ColorMenu: () => <button aria-label="Open color settings">Color</button>,
  AccessibilityMenu: () => <button aria-label="Open accessibility settings">Accessibility</button>,
}));

vi.mock("components/features/ResumePreview/ResumePreviewTrigger", () => ({
  default: ({ ariaLabel, buttonText, pdfHref }) => (
    <button
      aria-label={ariaLabel || buttonText || "Open resume preview and download options"}
      data-pdf-href={pdfHref}
    >
      Resume
    </button>
  ),
}));

// The test suite for the StickyNav component, which includes tests to verify that the active route is marked correctly, that the mobile navigation opens when the menu trigger is activated, and that the mobile navigation closes after a destination is chosen, ensuring that the component behaves as expected in various scenarios.
describe("StickyNav", () => {
  const sections = [
    { id: "system-overview", title: "System overview", blocks: [] },
    { id: "published-packages", title: "Published packages", blocks: [] },
  ];

  const StickyNavRouteHarness = () => {
    const location = useLocation();

    return (
      <>
        <output data-testid="current-route-path">{location.pathname}</output>
        <StickyNav activePage={location.pathname} />
      </>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("places primary and section navigation inside one page-level header", () => {
    renderWithProviders(
      <StickyNav
        activePage={PageRoute.INTERFACE_SYSTEM}
        pageUrl={PageRoute.INTERFACE_SYSTEM}
        sections={sections}
      />
    );

    const shell = screen.getByTestId("unified-navigation");
    expect(screen.getAllByTestId("unified-navigation")).toHaveLength(1);
    expect(within(shell).getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
    expect(within(shell).getByRole("navigation", { name: "On this page" })).toBeVisible();
  });

  it("omits the section control when the route has no section model", () => {
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    const shell = screen.getByTestId("unified-navigation");
    expect(within(shell).queryByRole("navigation", { name: "On this page" })).toBeNull();
    expect(within(shell).getByRole("button", { name: "Open navigation menu" })).toBeVisible();
  });

  it("freezes the parent wrapper insets for an exact viewport breakout", async () => {
    renderWithProviders(
      <div style={{ paddingLeft: "12px", paddingRight: "12px" }}>
        <StickyNav activePage={PageRoute.HOME} />
      </div>
    );

    await waitFor(() => {
      expect(screen.getByTestId("unified-navigation")).toHaveStyle({
        "--unified-navigation-breakout-start": "12px",
        "--unified-navigation-breakout-end": "12px",
      });
    });
  });

  it("groups legacy case studies under the Work navigation destination", () => {
    renderWithProviders(<StickyNav activePage={PageRoute.PROFESSIONAL} />);

    const workLink = screen.getByRole("link", { name: /^work$/i });
    expect(workLink).toHaveAttribute("href", PageRoute.SIDE_PROJECTS);
    expect(screen.getByTestId("desktop-nav-ni-work")).toHaveClass("is-route-active");
    expect(workLink).not.toHaveAttribute("aria-current");
    expect(screen.queryByRole("link", { name: /codestream studios/i })).not.toBeInTheDocument();
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

  it("provides an accessible close control in the mobile drawer", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);
    await user.click(screen.getByRole("button", { name: /open navigation menu/i }));

    const dialog = await screen.findByRole("dialog", { name: /site navigation/i });
    const closeButton = within(dialog).getByRole("button", {
      name: /close site navigation/i,
    });
    expect(closeButton).toBeVisible();

    await user.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /site navigation/i })).not.toBeInTheDocument();
    });
  });

  // Test to ensure that after a destination is chosen from the mobile navigation, the navigation menu closes, verifying that the StickyNav component correctly handles user interactions to close the mobile navigation menu after a selection is made, providing a seamless user experience on mobile devices.
  it("closes the mobile navigation after a destination is chosen", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    await user.click(screen.getByRole("button", { name: /open navigation menu/i }));

    const dialog = await screen.findByRole("dialog", { name: /site navigation/i });
    await user.click(within(dialog).getByRole("link", { name: /contact/i }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /site navigation/i })).not.toBeInTheDocument();
    });
  });

  it("uses client-side navigation from the mobile drawer", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StickyNavRouteHarness />, { initialEntries: [PageRoute.HOME] });

    await user.click(screen.getByRole("button", { name: /open navigation menu/i }));

    const dialog = await screen.findByRole("dialog", { name: /site navigation/i });
    await user.click(within(dialog).getByRole("link", { name: /contact/i }));

    await waitFor(() => {
      expect(screen.getByTestId("current-route-path")).toHaveTextContent(PageRoute.CONTACT);
    });
  });

  it("keeps mobile utility controls inside the navigation drawer", async () => {
    const user = userEvent.setup();
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    await user.click(screen.getByRole("button", { name: /open navigation menu/i }));
    const dialog = await screen.findByRole("dialog", { name: /site navigation/i });

    expect(within(dialog).getByRole("button", { name: /open color settings/i })).toBeVisible();
    expect(
      within(dialog).getByRole("button", { name: /open accessibility settings/i })
    ).toBeVisible();
    expect(
      within(dialog).getByRole("button", {
        name: /open resume preview and download options/i,
      })
    ).toBeVisible();
  });

  it("renders resume quick actions in navigation controls", async () => {
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    const resumeTriggers = screen.getAllByRole("button", {
      name: /open resume preview and download options/i,
    });

    expect(resumeTriggers.length).toBeGreaterThan(0);
    resumeTriggers.forEach((trigger) => {
      expect(trigger).not.toHaveAttribute("data-pdf-href");
    });
  });

  it("includes the top-level STE route", () => {
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    expect(screen.getByRole("link", { name: /^ste$/i })).toHaveAttribute(
      "href",
      PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES
    );
  });

  it("includes the dedicated Interface System and curated Work destinations", () => {
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    expect(screen.getByRole("link", { name: /^interface system$/i })).toHaveAttribute(
      "href",
      PageRoute.INTERFACE_SYSTEM
    );
    expect(screen.getByRole("link", { name: /^work$/i })).toHaveAttribute(
      "href",
      PageRoute.SIDE_PROJECTS
    );
    expect(screen.queryByRole("link", { name: /^education$/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^docs$/i })).not.toBeInTheDocument();
  });

  it("renders one shared brand with the compact navigation trigger", () => {
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    const unifiedHeader = screen.getByTestId("unified-navigation");
    const header = screen.getByTestId("mobile-site-header");
    expect(within(unifiedHeader).getByRole("link", { name: /Kyle Foster home/i })).toHaveAttribute(
      "href",
      PageRoute.HOME
    );
    expect(within(unifiedHeader).getAllByRole("link", { name: /Kyle Foster home/i })).toHaveLength(
      1
    );
    expect(
      within(header).getByRole("button", { name: /open navigation menu/i })
    ).toBeInTheDocument();
  });

  it("opens the site navigation drawer when Ctrl+Shift+M is pressed", async () => {
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    fireEvent.keyDown(window, { key: "M", ctrlKey: true, shiftKey: true });

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: /site navigation/i })).toBeInTheDocument();
    });
  });

  it("does not open the site navigation drawer on bare Control key", async () => {
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    fireEvent.keyDown(window, { key: "Control" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /site navigation/i })).not.toBeInTheDocument();
    });
  });

  it("closes the site navigation drawer when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    await user.click(screen.getByRole("button", { name: /open navigation menu/i }));
    await screen.findByRole("dialog", { name: /site navigation/i });

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /site navigation/i })).not.toBeInTheDocument();
    });
  });
});
