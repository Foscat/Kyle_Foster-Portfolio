import React from "react";

/**
 * Root Error Boundary
 * ------------------------------------------------------------
 * Prevents the entire app from crashing on runtime errors.
 * Displays a fallback UI and logs the error for debugging.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("🔥 Unhandled application error:", error);
    console.error("Component stack:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="glassBox"
        >
          <h1>Something went wrong</h1>
          <p>
            A runtime error prevented the application from loading. Check the
            console for details.
          </p>
          <pre style={{ opacity: 0.7 }}>{String(this.state.error)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
