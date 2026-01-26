import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ResumePreview from "components/ResumePreview";
import renderWithProviders from "tests/renderWithProviders";

/**
 * @file ResumePreview.test.jsx
 * @description Unit tests for the ResumePreview component.
 *
 * Test coverage:
 * - Rendering of the resume preview trigger button
 * - Modal open behavior when the trigger is activated
 * - Rendering of the embedded resume iframe
 * - Modal close behavior via explicit user action
 *
 * Testing strategy:
 * - Mocks Btn to a minimal native button to isolate behavior
 * - Mocks RSuite Modal components to semantic HTML elements
 * - Avoids testing RSuite internals or styling
 *
 * @module tests/components/ResumePreview
 */

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------
 */

/**
 * Mock Btn to a simple button element to decouple tests
 * from styling, animation, and RSuite dependencies.
 */
vi.mock("components/Btn", () => ({
  default: ({ text, ariaLabel, onClick }) => (
    <button aria-label={ariaLabel} onClick={onClick}>
      {text}
    </button>
  ),
}));

/**
 * Mock RSuite Modal components to minimal semantic wrappers.
 * This allows tests to assert modal behavior via roles only.
 */
vi.mock("rsuite", () => ({
  Modal: ({ open, children }) => (open ? <div role="dialog">{children}</div> : null),
  ModalHeader: ({ children }) => <header>{children}</header>,
  ModalTitle: ({ children }) => <h2>{children}</h2>,
  ModalBody: ({ children }) => <section>{children}</section>,
  ModalFooter: ({ children }) => <footer>{children}</footer>,
}));

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("ResumePreview", () => {
  /**
   * Verifies that the resume preview trigger button
   * is rendered and accessible by role and label.
   */
  it("renders the trigger button", () => {
    renderWithProviders(<ResumePreview />);

    expect(screen.getByRole("button", { name: /preview resume/i })).toBeInTheDocument();
  });

  /**
   * Verifies that activating the trigger button opens
   * the modal and renders the embedded resume iframe.
   */
  it("opens the modal and renders the iframe", () => {
    renderWithProviders(<ResumePreview />);

    fireEvent.click(screen.getByRole("button", { name: /preview resume/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTitle(/resume preview/i)).toBeInTheDocument();
  });

  /**
   * Verifies that the modal closes when the Close action
   * is activated by the user.
   */
  it("closes the modal when Close is clicked", () => {
    renderWithProviders(<ResumePreview />);

    fireEvent.click(screen.getByRole("button", { name: /preview resume/i }));
    fireEvent.click(screen.getByRole("button", { name: /close resume preview/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
