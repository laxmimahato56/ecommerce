import React from "react";
import type { ReactNode, ErrorInfo } from "react";

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
      return <div>hello hello</div>;
    }

    // Render children if no error
    return this.props.children;
  }
}
