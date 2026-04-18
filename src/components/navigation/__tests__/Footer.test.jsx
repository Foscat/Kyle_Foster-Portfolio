/**
 * @file Footer.test.jsx
 * @fileoverview Tests for the Footer component.
 * @description Tests for the Footer component, ensuring it renders correctly and handles interactions as expected.
 * @module components/navigation/Footer
 */

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Footer from "../Footer";
import renderWithProviders from "tests/renderWithProviders";

// Mock the Btn component from the UI library to simplify testing and focus on the Footer's functionality.
vi.mock("components/ui", async () => {
  const actual = await vi.importActual("components/ui");

  return {
    ...actual,
    Btn: (props) => (
      <a href={props.href} aria-label={props["aria-label"] || props.ariaLabel}>
        {props["aria-label"] || props.ariaLabel}
      </a>
    ),
  };
});

const copyMock = vi.fn();

// Mock the useClipboard hook to control its behavior during tests, allowing us to verify that the copy function is called with the correct arguments when the phone number is clicked.
vi.mock("assets/hooks", () => ({
  useClipboard: () => ({
    copy: copyMock,
    copied: false,
    error: null,
  }),
  useCoarsePointer: () => false,
}));

// Mock the Tooltip and Whisper components from the rsuite library to prevent issues with their implementation during testing, allowing us to focus on the Footer's functionality without worrying about the complexities of these components.
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
// The test suite for the Footer component, which includes tests to verify that the current year and secondary profile actions are rendered correctly, and that the phone number is copied to the clipboard when the corresponding action is activated.
describe("Footer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test to ensure that the Footer component renders the current year and the secondary profile actions (GitHub, LinkedIn, and email) correctly, verifying that the appropriate links are present and have the correct href attributes.
  it("renders the current year and secondary profile actions", () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /visit github profile/i })).toHaveAttribute(
      "href",
      "https://github.com/Foscat"
    );
    expect(screen.getByRole("link", { name: /visit linkedin profile/i })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/kylefoster-dev"
    );
    expect(screen.getByRole("link", { name: /send email/i })).toHaveAttribute(
      "href",
      "mailto:fosterkyle6456@gmail.com"
    );
  });

  // Test to verify that when the phone number action is activated (clicked), the copy function from the useClipboard hook is called with the correct phone number, ensuring that the intended behavior of copying the phone number to the clipboard is functioning as expected.
  it("copies the phone number when the phone action is activated", async () => {
    const user = userEvent.setup();

    renderWithProviders(<Footer />);

    await user.click(screen.getByText(/\(469\) 410-5286/i));

    await waitFor(() => {
      expect(copyMock).toHaveBeenCalledWith("4694105286");
    });
  });
});
