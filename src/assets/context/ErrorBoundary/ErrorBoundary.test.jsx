/**
 * @file ErrorBoundary.test.jsx
 * @description Unit tests for the ErrorBoundary component.
 *
 * Test coverage:
 * - Normal child rendering when no error occurs
 * - Error capture from descendant components
 * - Rendering of fallback UI
 * - Display of captured error messages
 *
 * Testing strategy:
 * - Uses a deliberately crashing child component to simulate runtime failures
 * - Silences expected React error logs to keep test output clean
 * - Verifies user-facing fallback behavior rather than internal state
 *
 * @module tests/components/ErrorBoundary
 */

import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ErrorBoundary from "components/ErrorBoundary";
import renderWithProviders from "tests/renderWithProviders";

/* ------------------------------------------------------------------
 * Test utilities
 * ------------------------------------------------------------------
 * Component that intentionally throws an error when rendered.
 * Used to validate error capture and fallback rendering.
 */

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
    /**
     * Silence expected React error boundary logs during tests.
     * React intentionally logs errors when an error boundary is triggered.
     */
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
    renderWithProviders(
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
    renderWithProviders(
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
    renderWithProviders(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Test error/i)).toBeInTheDocument();
  });
});
