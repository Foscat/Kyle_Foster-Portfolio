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

// Exercise navigation through user-visible routes, landmarks, and drawer controls.
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

  it("keeps both navigation systems behind opposed icon triggers", () => {
    renderWithProviders(
      <StickyNav
        activePage={PageRoute.INTERFACE_SYSTEM}
        pageUrl={PageRoute.INTERFACE_SYSTEM}
        sections={sections}
      />
    );

    const shell = screen.getByTestId("unified-navigation");
    expect(screen.getAllByTestId("unified-navigation")).toHaveLength(1);
    expect(within(shell).getByRole("button", { name: "Open website navigation" })).toBeVisible();
    expect(
      within(shell).getByRole("button", {
        name: "Open section navigation: System overview",
      })
    ).toBeVisible();
    expect(within(shell).getByRole("link", { name: "Kyle Foster home" })).toHaveAttribute(
      "href",
      PageRoute.HOME
    );
    expect(within(shell).queryByRole("link", { name: "Work" })).not.toBeInTheDocument();
    expect(within(shell).queryByText("1 / 2")).not.toBeInTheDocument();
  });

  it("omits the section control when the route has no section model", () => {
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    const shell = screen.getByTestId("unified-navigation");
    expect(within(shell).queryByRole("button", { name: /open section navigation/i })).toBeNull();
    expect(within(shell).getByRole("button", { name: "Open website navigation" })).toBeVisible();
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

  it("groups legacy case studies under the Work navigation destination", async () => {
    const user = userEvent.setup();
    renderWithProviders(<StickyNav activePage={PageRoute.PROFESSIONAL} />);
    await user.click(screen.getByRole("button", { name: "Open website navigation" }));

    const workLink = screen.getByRole("link", { name: /^work$/i });
    expect(workLink).toHaveAttribute("href", PageRoute.SIDE_PROJECTS);
    expect(workLink).toHaveClass("is-route-active");
    expect(workLink).not.toHaveAttribute("aria-current");
    expect(screen.queryByRole("link", { name: /codestream studios/i })).not.toBeInTheDocument();
  });

  it("opens the website navigation from a left-side drawer", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    await user.click(screen.getByRole("button", { name: "Open website navigation" }));

    const dialog = await screen.findByRole("dialog", { name: "Website Navigation" });
    expect(dialog).toHaveClass("rs-drawer-left");
    expect(within(dialog).getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  });

  it("provides an accessible close control in the mobile drawer", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);
    await user.click(screen.getByRole("button", { name: "Open website navigation" }));

    const dialog = await screen.findByRole("dialog", { name: "Website Navigation" });
    const closeButton = within(dialog).getByRole("button", {
      name: /close website navigation/i,
    });
    expect(closeButton).toBeVisible();

    await user.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Website Navigation" })).not.toBeInTheDocument();
    });
  });

  it("closes the website navigation after a destination is chosen", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    await user.click(screen.getByRole("button", { name: "Open website navigation" }));

    const dialog = await screen.findByRole("dialog", { name: "Website Navigation" });
    await user.click(within(dialog).getByRole("link", { name: /contact/i }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Website Navigation" })).not.toBeInTheDocument();
    });
  });

  it("uses client-side navigation from the mobile drawer", async () => {
    const user = userEvent.setup();

    renderWithProviders(<StickyNavRouteHarness />, { initialEntries: [PageRoute.HOME] });

    await user.click(screen.getByRole("button", { name: "Open website navigation" }));

    const dialog = await screen.findByRole("dialog", { name: "Website Navigation" });
    await user.click(within(dialog).getByRole("link", { name: /contact/i }));

    await waitFor(() => {
      expect(screen.getByTestId("current-route-path")).toHaveTextContent(PageRoute.CONTACT);
    });
  });

  it("keeps utility controls inside the website navigation drawer", async () => {
    const user = userEvent.setup();
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    await user.click(screen.getByRole("button", { name: "Open website navigation" }));
    const dialog = await screen.findByRole("dialog", { name: "Website Navigation" });

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
    const user = userEvent.setup();
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);
    await user.click(screen.getByRole("button", { name: "Open website navigation" }));

    const resumeTriggers = screen.getAllByRole("button", {
      name: /open resume preview and download options/i,
    });

    expect(resumeTriggers).toHaveLength(1);
    resumeTriggers.forEach((trigger) => {
      expect(trigger).not.toHaveAttribute("data-pdf-href");
    });
  });

  it("includes the top-level STE route", async () => {
    const user = userEvent.setup();
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);
    await user.click(screen.getByRole("button", { name: "Open website navigation" }));

    expect(screen.getByRole("link", { name: /^ste$/i })).toHaveAttribute(
      "href",
      PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES
    );
  });

  it("includes the dedicated Interface System and curated Work destinations", async () => {
    const user = userEvent.setup();
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);
    await user.click(screen.getByRole("button", { name: "Open website navigation" }));

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

  it("renders one centered brand with the website navigation trigger", () => {
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    const unifiedHeader = screen.getByTestId("unified-navigation");
    expect(within(unifiedHeader).getByRole("link", { name: /Kyle Foster home/i })).toHaveAttribute(
      "href",
      PageRoute.HOME
    );
    expect(within(unifiedHeader).getAllByRole("link", { name: /Kyle Foster home/i })).toHaveLength(
      1
    );
    expect(
      within(unifiedHeader).getByRole("button", { name: "Open website navigation" })
    ).toBeInTheDocument();
  });

  it("opens the website navigation drawer when Ctrl+Shift+M is pressed", async () => {
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    fireEvent.keyDown(window, { key: "M", ctrlKey: true, shiftKey: true });

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: "Website Navigation" })).toBeInTheDocument();
    });
  });

  it("does not open the website navigation drawer on bare Control key", async () => {
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    fireEvent.keyDown(window, { key: "Control" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Website Navigation" })).not.toBeInTheDocument();
    });
  });

  it("closes the website navigation drawer when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderWithProviders(<StickyNav activePage={PageRoute.HOME} />);

    await user.click(screen.getByRole("button", { name: "Open website navigation" }));
    await screen.findByRole("dialog", { name: "Website Navigation" });

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Website Navigation" })).not.toBeInTheDocument();
    });
  });
});
