/**
 * ErrorBoundary.test.jsx
 * ------------------------------------------------------------------
 * Unit tests for the ErrorBoundary component.
 *
 * Covers:
 * - Normal child rendering
 * - Error capture from descendant components
 * - Fallback UI rendering
 * - Console error logging behavior
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

/* ------------------------------------------------------------------
 * Test utilities
 * ------------------------------------------------------------------ */

// Component that intentionally throws an error when rendered
const ProblemChild = () => {
  throw new Error("Test error");
};

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("ErrorBoundary", () => {
  let consoleErrorSpy;
  let consoleLogSpy;

  beforeEach(() => {
    // Silence expected React error boundary logs during tests
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /* ------------------------------------------------------------
   * Normal rendering
   * ------------------------------------------------------------ */

  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div>Healthy component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Healthy component")).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Error handling
   * ------------------------------------------------------------ */

  it("renders fallback UI when a child throws an error", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(/A runtime error prevented the application from loading/i)
    ).toBeInTheDocument();
  });

  it("displays the error message in the fallback UI", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Test error/i)).toBeInTheDocument();
  });

  /* ------------------------------------------------------------
   * Logging behavior
   * ------------------------------------------------------------ */

  it("logs errors to the console when an error is caught", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("logs a mount message when the boundary mounts", () => {
    render(
      <ErrorBoundary>
        <div />
      </ErrorBoundary>
    );

    expect(consoleLogSpy).toHaveBeenCalledWith("Error watchdog has mounted");
  });
});
