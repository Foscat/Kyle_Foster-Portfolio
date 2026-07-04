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

  it("renders the trigger inside the sect-nav-toggle-btn.mobile-only wrapper", () => {
    renderWithProviders(<MobileSectionNavTrigger {...defaultProps} />);

    const wrapper = screen.getByTestId("mobile-sect-nav-trigger-wrapper");
    expect(wrapper).toBeInTheDocument();
    expect(
      within(wrapper).getByRole("button", { name: /open section navigation/i })
    ).toBeInTheDocument();
  });

  it("keeps the floating trigger icon-only to avoid mobile content overlap", () => {
    renderWithProviders(<MobileSectionNavTrigger {...defaultProps} />);

    const wrapper = screen.getByTestId("mobile-sect-nav-trigger-wrapper");
    expect(within(wrapper).queryByText("Sections")).not.toBeInTheDocument();
  });

  /* ─── data-has-mobile-section-nav attribute ──────────────────── */

  it("sets data-has-mobile-section-nav on the document element while mounted", () => {
    const { unmount } = renderWithProviders(<MobileSectionNavTrigger {...defaultProps} />);
    expect(document.documentElement).toHaveAttribute("data-has-mobile-section-nav", "true");
    unmount();
    expect(document.documentElement).not.toHaveAttribute("data-has-mobile-section-nav");
  });

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
