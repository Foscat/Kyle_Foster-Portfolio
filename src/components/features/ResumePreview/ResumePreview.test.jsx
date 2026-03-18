/**
 * @file ResumePreview.test.jsx
 * @description Unit tests for the ResumePreview component.
 *
 * Test coverage:
 * - Modal opens when the trigger button is clicked
 * - Iframe with the correct title is rendered inside the modal
 * - Modal closes when the close button is clicked
 *
 * Testing strategy:
 * - Mocks external dependencies (Btn and rsuite Modal components) to isolate testing to ResumePreview's behavior
 * - Uses user-facing queries to verify the presence of interactive elements and content
 * - Simulates user interactions (clicks) to test modal open/close behavior
 * - Asserts the presence or absence of the modal and its content based on user actions
 *
 * @module tests/components/ResumePreview
 */
import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ResumePreview from "./index";
import renderWithProviders from "tests/renderWithProviders";

// Mock the Btn component to simplify testing and focus on ResumePreview's behavior.
vi.mock("components/ui/Btn", () => ({
  default: ({ text, ariaLabel, onClick }) => (
    <button aria-label={ariaLabel} onClick={onClick}>
      {text}
    </button>
  ),
}));

// Mock the rsuite Modal components to avoid testing their internal behavior and focus on ResumePreview's logic.
vi.mock("rsuite", () => ({
  Modal: ({ open, children }) => (open ? <div role="dialog">{children}</div> : null),
  ModalHeader: ({ children }) => <header>{children}</header>,
  ModalTitle: ({ children }) => <h2>{children}</h2>,
  ModalBody: ({ children }) => <section>{children}</section>,
  ModalFooter: ({ children }) => <footer>{children}</footer>,
}));

// Test suite for the ResumePreview component, covering modal open/close behavior and content rendering.
describe("ResumePreview", () => {
  // Test that the trigger button is rendered and opens the modal when clicked.
  it("renders the trigger button", () => {
    renderWithProviders(<ResumePreview />);
    expect(screen.getByRole("button", { name: /preview resume/i })).toBeInTheDocument();
  });

  // Test that clicking the trigger button opens the modal and renders the iframe with the correct title.
  it("opens the modal and renders the iframe", () => {
    renderWithProviders(<ResumePreview />);

    fireEvent.click(screen.getByRole("button", { name: /preview resume/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTitle(/resume preview/i)).toBeInTheDocument();
  });

  // Test that clicking the close button closes the modal.
  it("closes the modal when Close is clicked", () => {
    renderWithProviders(<ResumePreview />);

    fireEvent.click(screen.getByRole("button", { name: /preview resume/i }));
    fireEvent.click(screen.getByRole("button", { name: /close resume preview/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
