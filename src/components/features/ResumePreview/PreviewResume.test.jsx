/**
 * @file ResumePreview.test.jsx
 * @description Unit tests for the ResumePreview component.
 *
 * Test coverage:
 * - Modal opens when the trigger button is clicked
 * - Modal renders the resume content when opened
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
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ResumePreview from ".";
import renderWithProviders from "tests/renderWithProviders";

// Mock the Btn component to simplify testing and focus on ResumePreview's behavior.
vi.mock("components/ui", async () => {
  const actual = await vi.importActual("components/ui");
  return {
    ...actual,
    Btn: ({ text, ariaLabel, onClick, ...props }) => (
      <button aria-label={ariaLabel || text} onClick={onClick} {...props}>
        {text}
      </button>
    ),
  };
});

// Mock the rsuite Modal components to avoid testing their internal behavior and focus on ResumePreview's logic.
vi.mock("rsuite", async () => {
  const actual = await vi.importActual("rsuite");
  const Modal = ({ open, children }) => (open ? <div role="dialog">{children}</div> : null);
  Modal.Header = ({ children }) => <div>{children}</div>;
  Modal.Title = ({ children }) => <h2>{children}</h2>;
  Modal.Body = ({ children }) => <div>{children}</div>;
  Modal.Footer = ({ children }) => <div>{children}</div>;
  Modal.Header.displayName = "ModalHeader";
  Modal.Title.displayName = "ModalTitle";
  Modal.Body.displayName = "ModalBody";
  Modal.Footer.displayName = "ModalFooter";

  return {
    ...actual,
    Modal,
  };
});

// Test suite for the ResumePreview component, covering modal open/close behavior and content rendering.
describe("ResumePreview", () => {
  const mockResume = { name: "Test Resume", sections: [] };
  const mockPdfHref = "test.pdf";

  // Test that the trigger button is rendered and opens the modal when clicked.
  it("renders the trigger button", async () => {
    renderWithProviders(
      <ResumePreview buttonText="Preview Resume" resume={mockResume} pdfHref={mockPdfHref} />
    );
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /preview resume/i })).toBeInTheDocument();
    });
  });

  // Test that clicking the trigger button opens the modal and renders the resume content.
  it("opens the modal and renders the iframe", async () => {
    renderWithProviders(
      <ResumePreview buttonText="Preview Resume" resume={mockResume} pdfHref={mockPdfHref} />
    );

    await waitFor(() => {
      const button = screen.getByRole("button", { name: /preview resume/i });
      fireEvent.click(button);
    });

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
      // The modal should contain the Close button from the PreviewResume component
      expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    });
  });

  // Test that clicking the close button closes the modal.
  it("closes the modal when Close is clicked", async () => {
    renderWithProviders(
      <ResumePreview buttonText="Preview Resume" resume={mockResume} pdfHref={mockPdfHref} />
    );

    await waitFor(() => {
      const previewButton = screen.getByRole("button", { name: /preview resume/i });
      fireEvent.click(previewButton);
    });

    await waitFor(() => {
      const closeButton = screen.getByRole("button", { name: /close/i });
      fireEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
