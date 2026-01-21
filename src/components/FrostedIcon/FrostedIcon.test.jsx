/**
 * FrostedIcon.test.jsx
 * ------------------------------------------------------------------
 * Unit tests for the FrostedIcon component.
 *
 * Covers:
 * - Basic rendering
 * - Size and variant class application
 * - Clickable behavior
 * - Loading / spinner state
 * - Accessibility attributes
 * - Tooltip wiring (delegation only)
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FrostedIcon from "./index";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

// Mock FontAwesomeIcon so we don't test FontAwesome internals
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon, spin }) => (
    <svg data-testid="fa-icon" data-icon={icon.iconName} data-spin={spin} />
  ),
}));

// Mock RSuite Whisper / Tooltip (delegation only)
vi.mock("rsuite", () => ({
  Whisper: ({ children }) => <>{children}</>,
  Tooltip: ({ children }) => <span>{children}</span>,
}));

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("FrostedIcon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ------------------------------------------------------------
   * Basic rendering
   * ------------------------------------------------------------ */

  it("renders an icon", () => {
    render(<FrostedIcon icon={faCoffee} />);

    expect(screen.getByTestId("fa-icon")).toBeInTheDocument();
  });

  it("applies size and variant classes", () => {
    const { container } = render(<FrostedIcon icon={faCoffee} size="lg" variant="accent" />);

    const wrapper = container.querySelector(".frosted-icon");
    expect(wrapper).toHaveClass("fi-size-lg");
    expect(wrapper).toHaveClass("fi-variant-accent");
  });

  /* ------------------------------------------------------------
   * Clickable behavior
   * ------------------------------------------------------------ */

  it("calls onClick when clickable and clicked", async () => {
    const onClick = vi.fn();

    render(<FrostedIcon icon={faCoffee} clickable onClick={onClick} ariaLabel="Clickable icon" />);

    const icon = screen.getByRole("button");
    await userEvent.click(icon);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when not clickable", async () => {
    const onClick = vi.fn();

    render(<FrostedIcon icon={faCoffee} onClick={onClick} />);

    const icon = screen.getByRole("img");
    await userEvent.click(icon);

    expect(onClick).not.toHaveBeenCalled();
  });

  /* ------------------------------------------------------------
   * Loading / spinner behavior
   * ------------------------------------------------------------ */

  it("renders spinner when loading is true", () => {
    render(<FrostedIcon icon={faCoffee} loading />);

    const icon = screen.getByTestId("fa-icon");
    expect(icon).toHaveAttribute("data-spin", "true");
  });

  /* ------------------------------------------------------------
   * Accessibility
   * ------------------------------------------------------------ */

  it("sets role=button and tabIndex when clickable", () => {
    render(<FrostedIcon icon={faCoffee} clickable ariaLabel="Interactive icon" />);

    const icon = screen.getByRole("button");
    expect(icon).toHaveAttribute("tabindex", "0");
    expect(icon).toHaveAttribute("aria-label", "Interactive icon");
  });

  it("sets role=img when not clickable", () => {
    render(<FrostedIcon icon={faCoffee} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Tooltip delegation
   * ------------------------------------------------------------ */

  it("renders tooltip content when tooltip prop is provided", () => {
    render(<FrostedIcon icon={faCoffee} tooltip="Helpful info" />);

    expect(screen.getByText("Helpful info")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * noBG flag
   * ------------------------------------------------------------ */

  it("applies no-background class when noBG is true", () => {
    const { container } = render(<FrostedIcon icon={faCoffee} noBG />);

    const wrapper = container.querySelector(".frosted-icon");
    expect(wrapper).toHaveClass("fi-no-bg");
  });
});
