'use client';

import { useState } from 'react';
import { Coins, Eye, Shield, Zap } from 'lucide-react';

interface EarningOption {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon: React.ReactNode;
  enabled: boolean;
}

export function EarningMechanism() {
  const [earningOptions, setEarningOptions] = useState<EarningOption[]>([
    {
      id: 'tracker-blocking',
      title: 'Tracker Blocking',
      description: 'Earn tokens for every tracker blocked automatically',
      reward: 0.01,
      icon: <Shield className="w-5 h-5" />,
      enabled: true
    },
    {
      id: 'attention-focus',
      title: 'Attention Focus',
      description: 'Earn tokens for focused browsing sessions',
      reward: 0.05,
      icon: <Eye className="w-5 h-5" />,
      enabled: false
    },
    {
      id: 'data-sharing',
      title: 'Anonymous Data Sharing',
      description: 'Opt-in to share anonymized browsing patterns',
      reward: 0.1,
      icon: <Zap className="w-5 h-5" />,
      enabled: false
    }
  ]);

  const toggleEarning = (id: string) => {
    setEarningOptions(prev => prev.map(option => 
      option.id === id ? { ...option, enabled: !option.enabled } : option
    ));
  };

  return (
    <div className="glass-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-accent to-primary rounded-lg">
            <Coins className="w-6 h-6 text-bg" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-fg">Token Earning</h3>
            <p className="text-sm text-fg/70">Configure how you earn Tracker Tokens</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {earningOptions.map((option) => (
          <div key={option.id} className="flex items-center justify-between p-4 bg-surface/30 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${option.enabled ? 'bg-success/20 text-success' : 'bg-surface text-fg/60'}`}>
                {option.icon}
              </div>
              
              <div>
                <h4 className="font-medium text-fg">{option.title}</h4>
                <p className="text-sm text-fg/70">{option.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Coins className="w-3 h-3 text-accent" />
                  <span className="text-xs text-accent font-medium">
                    +{option.reward} TT per action
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleEarning(option.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                option.enabled ? 'bg-success' : 'bg-surface'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  option.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-border">
        <div className="text-sm text-fg/60">
          <p>💡 <strong>Privacy First:</strong> All data sharing is anonymous and encrypted. You maintain full control over your privacy settings.</p>
        </div>
      </div>
    </div>
  );
}
