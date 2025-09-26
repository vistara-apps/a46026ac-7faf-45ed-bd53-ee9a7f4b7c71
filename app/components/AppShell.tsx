'use client';

import { ReactNode } from 'react';
import { Shield, Coins, Settings2, Bell } from 'lucide-react';
import { TokenBalanceDisplay } from './TokenBalanceDisplay';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-accent to-primary rounded-lg">
                <Shield className="w-6 h-6 text-bg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-fg">Tracker Tokens</h1>
                <p className="text-sm text-fg/70">Block trackers, earn tokens</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <TokenBalanceDisplay />
              <button className="p-2 hover:bg-surface rounded-lg transition-colors duration-200">
                <Bell className="w-5 h-5 text-fg/70" />
              </button>
              <button className="p-2 hover:bg-surface rounded-lg transition-colors duration-200">
                <Settings2 className="w-5 h-5 text-fg/70" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-fg/60">
            <p>Powered by Base • Built for privacy</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
