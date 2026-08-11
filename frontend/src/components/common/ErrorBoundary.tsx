import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertOctagon, RotateCw, Home } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Top-level rendering error boundary. Deliberately shows no stack trace
 * or error message to the user — those go to the console only, and only
 * in development, so nothing sensitive leaks into a production UI.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("AgentForge rendering error:", error, info.componentStack);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/mission-control";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-background px-6 text-center">
        <LogoMark className="size-10" />

        <div className="flex flex-col items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive-muted text-destructive">
            <AlertOctagon className="size-5" />
          </div>
          <h1 className="text-lg font-medium text-foreground">Something went wrong</h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            AgentForge hit an unexpected error rendering this screen. Reloading usually
            resolves it — if it keeps happening, head back to Mission Control.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" onClick={this.handleGoHome}>
            <Home className="size-4" />
            Mission Control
          </Button>
          <Button className="gap-2" onClick={this.handleReload}>
            <RotateCw className="size-4" />
            Reload
          </Button>
        </div>
      </div>
    );
  }
}
