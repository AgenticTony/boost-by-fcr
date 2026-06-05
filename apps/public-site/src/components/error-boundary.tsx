import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render errors in lazy-loaded pages and shows a branded fallback.
 * React requires class components for error boundaries.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-brand-gold/10 text-brand-gold mb-6">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-display font-extrabold text-text mb-3">
              Något gick fel
            </h1>
            <p className="text-text-muted leading-relaxed mb-8">
              Ett oväntat fel uppstod. Försök igen eller gå tillbaka till
              startsidan.
            </p>
            <Button
              asChild
              className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-display font-semibold rounded-cta"
              onClick={() => this.setState({ hasError: false })}
            >
              <Link to="/">Tillbaka till startsidan</Link>
            </Button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
