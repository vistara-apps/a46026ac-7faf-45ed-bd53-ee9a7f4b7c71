'use client';

import { useState, useEffect } from 'react';
import { Coins, TrendingUp } from 'lucide-react';

interface TokenBalanceDisplayProps {
  variant?: 'default' | 'compact';
}

export function TokenBalanceDisplay({ variant = 'default' }: TokenBalanceDisplayProps) {
  const [balance, setBalance] = useState(125.125);
  const [isEarning, setIsEarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data and token balance
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user?userId=fc_fid_123');
        if (response.ok) {
          const userData = await response.json();
          setBalance(userData.tokenBalance);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchUserData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Simulate real-time earning notifications
  useEffect(() => {
    const earningInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsEarning(true);
        setTimeout(() => setIsEarning(false), 3000);
      }
    }, 10000);

    return () => clearInterval(earningInterval);
  }, []);

  if (variant === 'compact') {
    return (
      <div className="flex items-center space-x-2 bg-surface/50 px-3 py-2 rounded-lg">
        <Coins className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium text-fg">
          {balance.toFixed(3)} TT
        </span>
        {isEarning && (
          <TrendingUp className="w-3 h-3 text-success animate-bounce" />
        )}
      </div>
    );
  }

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-accent to-primary rounded-lg">
            <Coins className="w-6 h-6 text-bg" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-fg">Token Balance</h3>
            <p className="text-sm text-fg/70">Tracker Tokens (TT)</p>
          </div>
        </div>
        {isEarning && (
          <div className="flex items-center space-x-1 text-success">
            <TrendingUp className="w-4 h-4 animate-bounce" />
            <span className="text-sm font-medium">Earning</span>
          </div>
        )}
      </div>
      
      <div className="text-3xl font-bold text-accent mb-2">
        {balance.toFixed(3)}
      </div>
      
      <div className="text-sm text-fg/60">
        ≈ ${(balance * 0.85).toFixed(2)} USD
      </div>
    </div>
  );
}
