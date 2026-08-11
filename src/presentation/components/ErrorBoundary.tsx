import { Component, ErrorInfo, ReactNode } from "react";
import { COLORS } from "../styles/theme";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Stark Minimalist Error Boundary Component
 * Catches unhandled JavaScript exceptions in child component trees,
 * prevents White Screen of Death crashes, and renders a graceful recovery UI.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center select-none rounded-3xl border border-black/10 shadow-sm my-4"
          style={{ backgroundColor: COLORS.canvasBg }}
        >
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-[#FF1F00]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2 className="text-base sm:text-lg font-bold font-sans text-slate-900 uppercase tracking-wider mb-2">
            System Guard Protection Active
          </h2>

          <p className="text-xs sm:text-sm font-sans text-slate-600 max-w-md mb-6 leading-relaxed">
            Terjadi masalah sementara saat memproses interaksi tampilan. Sifat
            komponen telah diamankan untuk mencegah hentian total pada aplikasi.
          </p>

          {this.state.error?.message && (
            <div className="mb-6 p-3 bg-black/5 rounded-xl text-[11px] font-mono text-slate-700 max-w-lg overflow-x-auto border border-black/5">
              {this.state.error.message}
            </div>
          )}

          <button
            type="button"
            onClick={this.handleReset}
            className="px-5 py-2.5 bg-slate-900 hover:bg-[#FF1F00] text-white text-xs font-sans font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow cursor-pointer"
          >
            Reset View & Continue
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
