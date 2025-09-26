'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="glass-card p-8 max-w-md w-full text-center">
        <div className="p-3 bg-error/20 rounded-full w-fit mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-error" />
        </div>
        
        <h2 className="text-2xl font-bold text-fg mb-2">Something went wrong!</h2>
        <p className="text-fg/70 mb-6">
          We encountered an error while loading Tracker Tokens. This might be a temporary issue.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try again</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="btn-secondary w-full"
          >
            Go to homepage
          </button>
        </div>
        
        {error.digest && (
          <div className="mt-4 p-3 bg-surface/50 rounded text-xs text-fg/60">
            Error ID: {error.digest}
          </div>
        )}
      </div>
    </div>
  );
}
