import React from "react";
import type { ReactNode, ErrorInfo } from "react";
import { Link } from "react-router-dom";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Initialize the state
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    // Log the error details
    console.error({ error, errorInfo });
  }

  render(): ReactNode {
    // If an error has occurred, show the fallback UI
    if (this.state.hasError) {
      return (
        <div className="p-6 max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            An unexpected error occurred. You can try again or go back home.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try again
            </button>
            <Link
              to="/"
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Go home
            </Link>
          </div>
        </div>
      );
    }

    // Render children if no error
    return this.props.children;
  }
}
