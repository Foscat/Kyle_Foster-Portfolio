/**
 * @file VisitorEvidenceLogger.test.jsx
 * @description Behavioral tests for the privacy-noticed visitor logger loader.
 * @module components/features/VisitorEvidenceLogger/test
 */

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, Route, Routes } from "react-router";
import { describe, expect, it, vi } from "vitest";
import renderWithProviders from "tests/renderWithProviders";
import VisitorEvidenceLogger, { VISITOR_LOGGER_SCRIPT_URL } from ".";

/**
 * Render route controls alongside the logger so a test can exercise SPA navigation.
 *
 * @param {Object} props - Harness configuration.
 * @param {(script: HTMLScriptElement|null) => void} props.onScriptChange - Script lifecycle observer.
 * @returns {JSX.Element} Router-aware logger test harness.
 */
function LoggerRouteHarness({ onScriptChange }) {
  return (
    <>
      <VisitorEvidenceLogger enabled onScriptChange={onScriptChange} />
      <Link to="/contact">Open contact</Link>
      <Routes>
        <Route path="*" element={<div>Current route</div>} />
      </Routes>
    </>
  );
}

describe("VisitorEvidenceLogger", () => {
  it("loads the scoped logger with disclosed browser correlation enabled", () => {
    const onScriptChange = vi.fn();
    const { unmount } = renderWithProviders(
      <VisitorEvidenceLogger enabled onScriptChange={onScriptChange} />
    );
    const script = onScriptChange.mock.calls[0][0];

    expect(script.src).toBe(VISITOR_LOGGER_SCRIPT_URL);
    expect(script.dataset.site).toBe("portfolio");
    expect(script.dataset.browserId).toBe("true");
    expect(script.referrerPolicy).toBe("no-referrer");
    expect(script.async).toBe(true);

    unmount();
    expect(onScriptChange).toHaveBeenLastCalledWith(null);
  });

  it("reloads the beacon script after client-side navigation", async () => {
    const user = userEvent.setup();
    const scripts = [];
    const onScriptChange = (script) => {
      if (script) scripts.push(script);
    };
    renderWithProviders(<LoggerRouteHarness onScriptChange={onScriptChange} />, {
      initialEntries: ["/"],
    });
    const firstScript = scripts[0];

    await user.click(screen.getByRole("link", { name: "Open contact" }));

    const nextScript = scripts.at(-1);
    expect(nextScript).not.toBe(firstScript);
  });
});
