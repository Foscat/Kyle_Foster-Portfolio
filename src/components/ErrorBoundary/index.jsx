import React from "react";

/**
 * @file index.jsx
 * @description Root-level React Error Boundary used to catch and handle
 * unrecoverable runtime errors without crashing the entire application.
 * @module components/ErrorBoundary
 */

/**
 * ErrorBoundary
 * ------------------------------------------------------------
 * A root error boundary that prevents the entire application from
 * crashing due to uncaught runtime errors.
 *
 * Responsibilities:
 * - Catches render-time and lifecycle errors in descendant components
 * - Displays a user-facing fallback UI
 * - Logs error details and component stack traces to the console
 *
 * Behavior:
 * - Uses `getDerivedStateFromError` to trigger fallback rendering
 * - Uses `componentDidCatch` for side-effect logging
 * - Allows normal rendering when no error is present
 *
 * Usage notes:
 * - Intended to wrap the highest possible level of the app (e.g., App root)
 * - Should not be used for recoverable or expected errors
 *
 * @public
 * @component
 * @extends React.Component
 */
class ErrorBoundary extends React.Component {
  /**
   * Initializes error boundary state.
   *
   * @param {Object} props - Component props.
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Lifecycle hook invoked when a descendant throws during render.
   * Updates state to trigger fallback UI.
   *
   * @param {Error} error - The thrown error.
   * @returns {{ hasError: boolean, error: Error }}
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Lifecycle hook invoked after the component mounts.
   * Used here as a simple diagnostic log.
   */
  componentDidMount() {
    console.log("Error watchdog has mounted");
  }

  /**
   * Lifecycle hook invoked when an error is caught.
   * Used for logging error details and component stack trace.
   *
   * @param {Error} error - The thrown error.
   * @param {React.ErrorInfo} info - Component stack information.
   */
  componentDidCatch(error, info) {
    console.error("🔥 Unhandled application error:", error);
    console.error("Component stack:", info.componentStack);
  }

  /**
   * Renders fallback UI when an error has been caught,
   * otherwise renders child components normally.
   *
   * @returns {JSX.Element}
   */
  render() {
    if (this.state.hasError) {
      return (
        <div className="glassBox">
          <h1>Something went wrong</h1>
          <p>
            A runtime error prevented the application from loading. Check the console for details.
          </p>
          <pre>{String(this.state.error)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
