/**
 * @file src\components\ui\Btn\Btn.test.jsx
 * @description src\components\ui\Btn\Btn.test module.
 * @module src\components\ui\Btn\Btn.test
 */

import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import Btn from "./index";
import renderWithProviders from "tests/renderWithProviders";

/**
 * @file Btn.test.jsx
 * @description Unit tests for the Btn component.
 * Testing focus:
 * - Click handling behavior (invocation, disabled state)
 * - Accessibility features (icon-only naming, button type)
 * - Async behavior (busy state during pending operations)
 *
 * Design intent:
 * Btn is designed to be a versatile button component that can handle various use cases, including icon-only buttons and async operations. The tests ensure that it behaves correctly in these scenarios while maintaining accessibility standards.
 *
 * @module tests/components/ui/Btn
 *
 * Note: The rsuite Button and IconButton components are mocked to simplify testing and focus on Btn's behavior rather than the underlying library implementation.
 * The FrostedIcon component is also mocked to provide a simple representation for testing purposes.
 */

vi.mock("rsuite", async () => {
  const actual = await vi.importActual("rsuite");
  return {
    ...actual,
    Whisper: ({ children }) => <>{children}</>,
    Tooltip: ({ children }) => <>{children}</>,
    Loader: () => <span role="status">Loading button...</span>,
  };
});

vi.mock("components/ui/FrostedIcon", () => ({
  default: ({ ariaLabel }) => <span aria-hidden="true">{ariaLabel || "icon"}</span>,
}));

describe("Btn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("invokes the click handler when activated", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithProviders(<Btn text="Send" onClick={onClick} />);

    const button = screen.getByRole("button", { name: /send/i });

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveClass("interactive-surface");
    expect(button).toHaveAttribute("data-surface-variant", "primary");
    expect(button).toHaveAttribute("data-surface-level", "2");
  });

  it("maps visual variants and explicit surface levels to bridge attributes", () => {
    renderWithProviders(<Btn text="Details" variant="accent" surfaceLevel="3" />);

    const button = screen.getByRole("button", { name: /details/i });

    expect(button).toHaveClass("interactive-surface", "accent");
    expect(button).toHaveAttribute("data-surface-variant", "accent");
    expect(button).toHaveAttribute("data-surface-level", "3");
  });

  it("does not invoke the click handler when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithProviders(<Btn text="Send" onClick={onClick} disabled />);

    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("exposes an accessible name for icon-only usage", () => {
    renderWithProviders(<Btn icon={faDownload} ariaLabel="Download resume" />);
    expect(screen.getByRole("button", { name: /download resume/i })).toBeInTheDocument();
  });

  it("honors native aria-label passthrough for icon-only usage", () => {
    renderWithProviders(<Btn icon={faDownload} aria-label="Download portfolio PDF" />);
    expect(screen.getByRole("button", { name: /download portfolio pdf/i })).toBeInTheDocument();
  });

  it("preserves the native submit type for form usage", () => {
    renderWithProviders(<Btn text="Send message" type="submit" />);
    expect(screen.getByRole("button", { name: /send message/i })).toHaveAttribute("type", "submit");
  });

  it("surfaces busy state while an async click handler is pending", async () => {
    const user = userEvent.setup();
    let resolveRequest;
    const onClick = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        })
    );

    renderWithProviders(<Btn text="Save" onClick={onClick} />);

    const button = screen.getByRole("button", { name: /save/i });
    await user.click(button);

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-busy", "true");
    });

    resolveRequest();

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-busy", "false");
    });
  });

  it("renders local href buttons as router links with interactive-surface on the outer clickable element", () => {
    renderWithProviders(<Btn text="Docs" href="/docs" hrefLocal />);

    const link = screen.getByRole("link", { name: /docs/i });

    expect(link).toHaveClass("interactive-surface");
    expect(within(link).queryByRole("button")).toBeNull();
  });

  it("renders external href buttons as anchors with interactive-surface on the outer clickable element", () => {
    renderWithProviders(<Btn text="GitHub" href="https://github.com/Foscat" />);

    const link = screen.getByRole("link", { name: /github/i });

    expect(link).toHaveAttribute("href", "https://github.com/Foscat");
    expect(link).toHaveClass("interactive-surface");
    expect(within(link).queryByRole("button")).toBeNull();
  });

  it("renders local download href buttons as anchors with download behavior", () => {
    renderWithProviders(
      <Btn text="Download Resume" href="/resume.pdf" download icon={faDownload} />
    );

    const link = screen.getByRole("link", { name: /download resume/i });

    expect(link).toHaveAttribute("href", "/resume.pdf");
    expect(link).toHaveAttribute("download");
    expect(link).not.toHaveAttribute("target", "_blank");
    expect(link).not.toHaveAttribute("rel", "noopener noreferrer");
  });

  it("maps aria state aliases to DOM attributes", () => {
    renderWithProviders(<Btn text="Toggle section" ariaExpanded ariaCurrent="location" />);

    const button = screen.getByRole("button", { name: /toggle section/i });
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("aria-current", "location");
  });
});
