'use client';

import { useState, useEffect } from 'react';
import { Shield, ShieldCheck, AlertTriangle, Globe } from 'lucide-react';

interface TrackerData {
  id: string;
  domain: string;
  type: 'analytics' | 'advertising' | 'social' | 'fingerprinting';
  blocked: boolean;
  attempts: number;
  lastSeen: Date;
}

interface TrackerListProps {
  variant?: 'compact' | 'detailed';
}

export function TrackerList({ variant = 'detailed' }: TrackerListProps) {
  const [trackers, setTrackers] = useState<TrackerData[]>([]);
  const [totalBlocked, setTotalBlocked] = useState(0);
  const [blockingPercentage, setBlockingPercentage] = useState(87);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrackerData = async () => {
      try {
        const response = await fetch('/api/trackers?userId=fc_fid_123');
        if (response.ok) {
          const trackerData = await response.json();
          setTrackers(trackerData);
          const blocked = trackerData.filter((t: TrackerData) => t.blocked).length;
          setTotalBlocked(blocked);
          setBlockingPercentage(Math.round((blocked / trackerData.length) * 100));
        }
      } catch (error) {
        console.error('Error fetching tracker data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackerData();

    // Poll for updates every 10 seconds
    const interval = setInterval(fetchTrackerData, 10000);
    return () => clearInterval(interval);
  }, []);

  const getTrackerIcon = (type: TrackerData['type']) => {
    switch (type) {
      case 'analytics':
        return <Globe className="w-4 h-4" />;
      case 'advertising':
        return <AlertTriangle className="w-4 h-4" />;
      case 'social':
        return <Shield className="w-4 h-4" />;
      case 'fingerprinting':
        return <ShieldCheck className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: TrackerData['type']) => {
    switch (type) {
      case 'analytics':
        return 'text-primary';
      case 'advertising':
        return 'text-warning';
      case 'social':
        return 'text-accent';
      case 'fingerprinting':
        return 'text-error';
      default:
        return 'text-fg';
    }
  };

  if (variant === 'compact') {
    return (
      <div className="metric-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-fg">Trackers Blocked</h3>
          <div className="text-2xl font-bold text-success">
            {blockingPercentage}%
          </div>
        </div>
        
        <div className="progress-bar mb-4">
          <div 
            className="progress-fill" 
            style={{ width: `${blockingPercentage}%` }}
          />
        </div>
        
        <div className="text-sm text-fg/70">
          {totalBlocked} of {trackers.length} trackers blocked
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="metric-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-fg mb-2">Trackers Blocked: {blockingPercentage}%</h2>
            <p className="text-fg/70">Real-time protection active</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-success to-accent rounded-lg">
            <ShieldCheck className="w-8 h-8 text-bg" />
          </div>
        </div>
        
        <div className="progress-bar mb-4">
          <div 
            className="progress-fill" 
            style={{ width: `${blockingPercentage}%` }}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-fg/70">Total Blocked:</span>
            <span className="ml-2 font-semibold text-success">{totalBlocked}</span>
          </div>
          <div>
            <span className="text-fg/70">Total Detected:</span>
            <span className="ml-2 font-semibold text-fg">{trackers.length}</span>
          </div>
        </div>
      </div>

      {/* Tracker List */}
      <div className="glass-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-fg">Recent Tracker Activity</h3>
        </div>
        
        <div className="divide-y divide-border">
          {trackers.map((tracker) => (
            <div key={tracker.id} className="p-4 hover:bg-surface/30 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${tracker.blocked ? 'bg-success/20' : 'bg-error/20'}`}>
                    {tracker.blocked ? (
                      <ShieldCheck className="w-4 h-4 text-success" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-error" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-fg">{tracker.domain}</span>
                      <div className={`flex items-center space-x-1 ${getTypeColor(tracker.type)}`}>
                        {getTrackerIcon(tracker.type)}
                        <span className="text-xs capitalize">{tracker.type}</span>
                      </div>
                    </div>
                    <div className="text-sm text-fg/60">
                      {tracker.attempts} attempts • Last seen {tracker.lastSeen.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-sm font-medium ${tracker.blocked ? 'text-success' : 'text-error'}`}>
                    {tracker.blocked ? 'Blocked' : 'Allowed'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
