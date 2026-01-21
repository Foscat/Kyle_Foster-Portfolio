import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ResumePreview from "./index";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

vi.mock("components/Btn", () => ({
  default: ({ text, ariaLabel, onClick }) => (
    <button aria-label={ariaLabel} onClick={onClick}>
      {text}
    </button>
  ),
}));

vi.mock("rsuite", () => ({
  Modal: ({ open, children }) => (open ? <div role="dialog">{children}</div> : null),
  ModalHeader: ({ children }) => <header>{children}</header>,
  ModalTitle: ({ children }) => <h2>{children}</h2>,
  ModalBody: ({ children }) => <section>{children}</section>,
  ModalFooter: ({ children }) => <footer>{children}</footer>,
}));

/* ------------------------------------------------------------------
 * Tests
 * ------------------------------------------------------------------ */

describe("ResumePreview", () => {
  it("renders the trigger button", () => {
    render(<ResumePreview />);

    expect(screen.getByRole("button", { name: /preview resume/i })).toBeInTheDocument();
  });

  it("opens the modal and renders the iframe", () => {
    render(<ResumePreview />);

    fireEvent.click(screen.getByRole("button", { name: /preview resume/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTitle(/resume preview/i)).toBeInTheDocument();
  });

  it("closes the modal when Close is clicked", () => {
    render(<ResumePreview />);

    fireEvent.click(screen.getByRole("button", { name: /preview resume/i }));

    fireEvent.click(screen.getByRole("button", { name: /close resume preview/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
