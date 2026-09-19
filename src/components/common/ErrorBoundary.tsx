import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#17120F] text-[#F8F3EC] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#241B16] border border-[#C6A15B]/30 p-8 rounded-sm shadow-2xl space-y-4">
            <h1 className="font-serif text-2xl font-bold text-[#F8F3EC]">
              Khatti Cafe
            </h1>
            <p className="text-xs sm:text-sm text-[#A99B8C]">
              We encountered a momentary glitch loading this section.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = window.location.pathname;
              }}
              className="px-6 py-2.5 bg-[#C6A15B] text-[#17120F] font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-[#D8BC82] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
