/**
 * @file MobileSectionNavTrigger.test.jsx
 * @description Unit tests for the MobileSectionNavTrigger component.
 * @module components/navigation/MobileSectionNavTrigger
 */

import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import MobileSectionNavTrigger from "../MobileSectionNavTrigger";
import renderWithProviders from "tests/renderWithProviders";

vi.mock("components/ui", async () => {
  const actual = await vi.importActual("components/ui");

  return {
    ...actual,
    Btn: ({ onClick, ariaLabel, text, className, "aria-expanded": ariaExpanded }) => (
      <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={className}
        aria-expanded={ariaExpanded}
      >
        {text || ariaLabel}
      </button>
    ),
    FrostedIcon: ({ ariaLabel }) => <span>{ariaLabel}</span>,
  };
});

const sections = [
  { id: "intro", title: "Introduction", blocks: [] },
  {
    id: "features",
    title: "Features",
    blocks: [
      { id: "feat1", title: "Feature One" },
      { id: "feat2", title: "Feature Two" },
    ],
  },
  { id: "contact", title: "Contact", blocks: [] },
];

const defaultProps = {
  title: "Portfolio",
  sections,
  activeLeafId: undefined,
  activeChain: [],
  isExpanded: () => false,
  onToggleSection: vi.fn(),
  navigate: vi.fn(),
};

describe("MobileSectionNavTrigger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ─── Structure contract ─────────────────────────────────────── */

  it("renders an in-flow on-this-page command bar", () => {
    renderWithProviders(<MobileSectionNavTrigger {...defaultProps} />);

    const navigation = screen.getByRole("navigation", { name: /on this page/i });
    expect(navigation).toHaveClass("route-section-nav");
    expect(within(navigation).getByText("On this page")).toHaveClass(
      "route-section-nav__label--full"
    );
    expect(within(navigation).getByText("Sections")).toHaveClass(
      "route-section-nav__label--compact"
    );
    expect(
      within(navigation).getByRole("button", {
        name: /open section navigation: introduction/i,
      })
    ).toBeInTheDocument();
    expect(within(navigation).getByText("1 / 3")).toBeVisible();
  });

  it("does not reserve a document-level mobile rail", () => {
    renderWithProviders(<MobileSectionNavTrigger {...defaultProps} />);

    expect(document.documentElement).not.toHaveAttribute("data-has-mobile-section-nav");
    expect(screen.queryByTestId("mobile-sect-nav-trigger-wrapper")).not.toBeInTheDocument();
  });

  /* ─── data-has-mobile-section-nav attribute ──────────────────── */

  /* ─── Drawer open / close ────────────────────────────────────── */

  it("opens the section navigation drawer on trigger click", async () => {
    const user = userEvent.setup();
    renderWithProviders(<MobileSectionNavTrigger {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /open section navigation/i }));

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: /portfolio page/i })).toBeInTheDocument();
    });
  });

  it("lists all top-level sections inside the drawer", async () => {
    const user = userEvent.setup();
    renderWithProviders(<MobileSectionNavTrigger {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /open section navigation/i }));

    const dialog = await screen.findByRole("dialog", { name: /portfolio page/i });
    expect(within(dialog).getByText("Introduction")).toBeInTheDocument();
    expect(within(dialog).getByText("Features")).toBeInTheDocument();
    expect(within(dialog).getByText("Contact")).toBeInTheDocument();
  });

  it("renders section rows without duplicate React keys", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();

    try {
      renderWithProviders(<MobileSectionNavTrigger {...defaultProps} />);
      await user.click(screen.getByRole("button", { name: /open section navigation/i }));
      await screen.findByRole("dialog", { name: /portfolio page/i });

      const errorOutput = consoleError.mock.calls.flat().join(" ");
      expect(errorOutput).not.toContain("Encountered two children with the same key");
    } finally {
      consoleError.mockRestore();
    }
  });

  it("renders expanded subsection groups without duplicate React keys", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();

    try {
      renderWithProviders(
        <MobileSectionNavTrigger
          {...defaultProps}
          isExpanded={(sectionId) => sectionId === "features"}
        />
      );
      await user.click(screen.getByRole("button", { name: /open section navigation/i }));
      await screen.findByRole("dialog", { name: /portfolio page/i });

      const errorOutput = consoleError.mock.calls.flat().join(" ");
      expect(errorOutput).not.toContain("Encountered two children with the same key");
    } finally {
      consoleError.mockRestore();
    }
  });

  it("closes the drawer when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderWithProviders(<MobileSectionNavTrigger {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /open section navigation/i }));
    await screen.findByRole("dialog", { name: /portfolio page/i });

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /portfolio page/i })).not.toBeInTheDocument();
    });
  });

  it("provides a named close control inside the section drawer", async () => {
    const user = userEvent.setup();
    renderWithProviders(<MobileSectionNavTrigger {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /open section navigation/i }));
    const dialog = await screen.findByRole("dialog", { name: /portfolio page/i });
    const closeButton = within(dialog).getByRole("button", {
      name: /close section navigation/i,
    });

    await user.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /portfolio page/i })).not.toBeInTheDocument();
    });
  });

  /* ─── Navigation callbacks ───────────────────────────────────── */

  it("calls navigate when a section title button is clicked", async () => {
    const navigate = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<MobileSectionNavTrigger {...defaultProps} navigate={navigate} />);

    await user.click(screen.getByRole("button", { name: /open section navigation/i }));
    const dialog = await screen.findByRole("dialog", { name: /portfolio page/i });

    await user.click(within(dialog).getByRole("button", { name: /^introduction$/i }));

    expect(navigate).toHaveBeenCalledWith(expect.anything(), "intro");
  });

  it("calls onToggleSection when the caret is clicked for a section with blocks", async () => {
    const onToggleSection = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <MobileSectionNavTrigger {...defaultProps} onToggleSection={onToggleSection} />
    );

    await user.click(screen.getByRole("button", { name: /open section navigation/i }));
    await screen.findByRole("dialog", { name: /portfolio page/i });

    await user.click(screen.getByRole("button", { name: /toggle features subsections/i }));

    expect(onToggleSection).toHaveBeenCalledWith("features");
  });
});
