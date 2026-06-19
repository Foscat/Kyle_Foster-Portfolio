# indexContext

- Source: `src/assets/context/ErrorBoundary/index.jsx`

# indexContext

## src\\assets\\context\\ErrorBoundary\\index

src\assets\context\ErrorBoundary\index module.

## components/ErrorBoundary

Root-level React Error Boundary used to catch and handle
unrecoverable runtime errors without crashing the entire application.

### ErrorBoundary

Initializes error boundary state.

**Parameters**

- `props` (`Object`) - Component props.

### componentDidCatch()

Lifecycle hook invoked when an error is caught.
Used for logging error details and component stack trace.

**Parameters**

- `error` (`Error`) - The thrown error.
- `info` (`React.ErrorInfo`) - Component stack information.

### render()

Renders fallback UI when an error has been caught,
otherwise renders child components normally.

**Returns**

- `JSX.Element`

### getDerivedStateFromError()

Lifecycle hook invoked when a descendant throws during render.
Updates state to trigger fallback UI.

**Parameters**

- `error` (`Error`) - The thrown error.

**Returns**

- `Object`

### ErrorBoundary

ErrorBoundary
------------------------------------------------------------
A root error boundary that prevents the entire application from
crashing due to uncaught runtime errors.

Responsibilities:
- Catches render-time and lifecycle errors in descendant components
- Displays a user-facing fallback UI
- Logs error details and component stack traces to the console

Behavior:
- Uses `getDerivedStateFromError` to trigger fallback rendering
- Uses `componentDidCatch` for side-effect logging
- Allows normal rendering when no error is present

Usage notes:
- Intended to wrap the highest possible level of the app (e.g., App root)
- Should not be used for recoverable or expected errors
