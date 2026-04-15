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

/**
 * @description Mocks for external dependencies: - rsuite's Button and IconButton are mocked to render as simple HTML buttons with the appropriate props. - rsuite's Tooltip and Whisper are mocked to render their children directly, bypassing any tooltip behavior. - FrostedIcon is mocked to render a span with an aria-hidden label for testing icon rendering and accessibility. /
 */

// Mock the Button and IconButton components from the rsuite library to simplify testing and focus on the Btn component's behavior, allowing us to verify that the Btn component correctly handles button rendering and interactions without relying on the actual implementation of the rsuite components.
vi.mock("rsuite", async () => {
  const actual = await vi.importActual("rsuite");
  return {
    ...actual,
    Whisper: ({ children }) => <>{children}</>,
    Tooltip: ({ children }) => <>{children}</>,
    Loader: () => <span role="status">Loading button...</span>,
  };
});

// Mock the FrostedIcon component to simplify testing and focus on the Btn component's behavior, allowing us to verify that icons are rendered correctly and that accessibility features are in place without relying on the actual implementation of the FrostedIcon component. This mock renders a simple span with an aria-hidden label, which allows us to test the presence of the icon and its accessibility attributes in the Btn component.
vi.mock("components/ui/FrostedIcon", () => ({
  default: ({ ariaLabel }) => <span aria-hidden="true">{ariaLabel || "icon"}</span>,
}));
vi.mock("components/ui/FrostedIcon", () => ({
  default: ({ ariaLabel }) => <span aria-hidden="true">{ariaLabel || "icon"}</span>,
}));

// The test suite for the Btn component, which includes tests to verify that the click handler is invoked correctly, that the disabled state prevents invocation, that icon-only buttons have an accessible name, that the button type is preserved for form usage, and that the busy state is handled correctly during async operations. These tests ensure that the Btn component behaves as expected in various scenarios and maintains accessibility standards.
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
  });

  // Test that when the Btn component is rendered with the disabled prop set to true, the click handler is not invoked when the button is clicked, ensuring that the component correctly prevents user interaction and does not execute the onClick function when it is in a disabled state. This verifies that the disabled state of the button is functioning as intended and provides the expected behavior for users.
  it("does not invoke the click handler when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithProviders(<Btn text="Send" onClick={onClick} disabled />);

    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(onClick).not.toHaveBeenCalled();
  });

  // Test that when the Btn component is rendered with only an icon and an ariaLabel, it exposes an accessible name for screen readers, ensuring that icon-only buttons are still accessible to users who rely on assistive technologies. This verifies that the Btn component correctly uses the ariaLabel prop to provide an accessible name for icon-only buttons, allowing them to be identified and interacted with by screen readers.
  it("exposes an accessible name for icon-only usage", () => {
    renderWithProviders(<Btn icon={faDownload} ariaLabel="Download resume" />);
    expect(screen.getByRole("button", { name: /download resume/i })).toBeInTheDocument();
  });

  // Test that when the Btn component is rendered with a type of "submit", it preserves this type in the underlying button element, ensuring that the component can be used within forms and that it behaves correctly as a submit button when specified. This verifies that the Btn component correctly applies the type prop to the rendered button element, allowing it to function as intended in form contexts.
  it("preserves the native submit type for form usage", () => {
    renderWithProviders(<Btn text="Send message" type="submit" />);
    expect(screen.getByRole("button", { name: /send message/i })).toHaveAttribute("type", "submit");
  });

  // Test that when the Btn component's onClick handler returns a pending promise, the button surfaces a busy state (e.g., aria-busy="true") until the promise resolves, ensuring that users receive feedback that an action is in progress and preventing multiple submissions or interactions while the async operation is pending. This verifies that the Btn component correctly manages async behavior and provides appropriate feedback to users during long-running operations.
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
});
