'use client';

import { AppShell } from './components/AppShell';
import { TrackerList } from './components/TrackerList';
import { TokenBalanceDisplay } from './components/TokenBalanceDisplay';
import { NotificationBanner } from './components/NotificationBanner';
import { EarningMechanism } from './components/EarningMechanism';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar, Identity } from '@coinbase/onchainkit/identity';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Notifications */}
        <NotificationBanner />

        {/* Wallet Connection */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-fg mb-2">Connect Your Wallet</h2>
              <p className="text-fg/70">Connect to Base to manage your Tracker Tokens</p>
            </div>
            
            <Wallet>
              <ConnectWallet>
                <div className="flex items-center space-x-3 bg-gradient-to-r from-accent to-primary text-bg px-6 py-3 rounded-lg font-medium hover:from-primary hover:to-accent transition-all duration-200">
                  <Avatar className="w-6 h-6" />
                  <Name />
                </div>
              </ConnectWallet>
            </Wallet>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Token Balance - Full width on mobile, 1 column on desktop */}
          <div className="lg:col-span-1">
            <TokenBalanceDisplay />
          </div>

          {/* Tracker Overview - Full width on mobile, 2 columns on desktop */}
          <div className="lg:col-span-2">
            <TrackerList variant="compact" />
          </div>
        </div>

        {/* Detailed Tracker List */}
        <TrackerList variant="detailed" />

        {/* Earning Mechanism */}
        <EarningMechanism />

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-fg mb-4">Quick Actions</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="btn-primary text-center">
              Enable Advanced Blocking
            </button>

            <button className="btn-secondary text-center">
              View Privacy Report
            </button>

            <button
              className="btn-secondary text-center"
              onClick={async () => {
                try {
                  const response = await fetch('/api/breach-check', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      userId: 'fc_fid_123',
                      email: 'user@example.com' // In production, get from user input
                    }),
                  });

                  if (response.ok) {
                    const result = await response.json();
                    alert(result.message);
                  } else {
                    alert('Failed to check data breaches');
                  }
                } catch (error) {
                  console.error('Error checking breaches:', error);
                  alert('Error checking data breaches');
                }
              }}
            >
              Check Data Breaches
            </button>

            <button
              className="btn-secondary text-center"
              onClick={async () => {
                try {
                  const response = await fetch('/api/tokens?userId=fc_fid_123&limit=50');
                  if (response.ok) {
                    const data = await response.json();
                    // In production, show a modal or navigate to a dedicated page
                    console.log('Token history:', data);
                    alert(`Token History: ${data.transactions.length} transactions\nEarned: ${data.totals.earned} TT\nSpent: ${data.totals.spent} TT`);
                  }
                } catch (error) {
                  console.error('Error fetching token history:', error);
                  alert('Error loading token history');
                }
              }}
            >
              Export Token History
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="metric-card text-center">
            <div className="text-2xl font-bold text-accent mb-2">1,247</div>
            <div className="text-sm text-fg/70">Total Trackers Blocked</div>
          </div>
          
          <div className="metric-card text-center">
            <div className="text-2xl font-bold text-success mb-2">15.8</div>
            <div className="text-sm text-fg/70">Total Tokens Earned</div>
          </div>
          
          <div className="metric-card text-center">
            <div className="text-2xl font-bold text-primary mb-2">23</div>
            <div className="text-sm text-fg/70">Sites Protected</div>
          </div>
          
          <div className="metric-card text-center">
            <div className="text-2xl font-bold text-warning mb-2">7</div>
            <div className="text-sm text-fg/70">Days Active</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
