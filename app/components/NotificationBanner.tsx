'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

interface NotificationBannerProps {
  variant?: 'error' | 'info' | 'success';
  message?: string;
  autoHide?: boolean;
  duration?: number;
}

export function NotificationBanner({ 
  variant = 'info', 
  message,
  autoHide = true,
  duration = 5000 
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(message);

  useEffect(() => {
    // Simulate notifications
    const notifications = [
      { type: 'success', text: 'Earned 0.05 TT tokens for blocking trackers!' },
      { type: 'info', text: 'New privacy feature available in settings' },
      { type: 'error', text: 'Data breach detected for example.com' }
    ];

    if (!message) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
          setCurrentMessage(randomNotification.text);
          setIsVisible(true);
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [message]);

  useEffect(() => {
    if (autoHide && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, isVisible]);

  if (!isVisible || !currentMessage) return null;

  const getIcon = () => {
    switch (variant) {
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-error" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getBgColor = () => {
    switch (variant) {
      case 'error':
        return 'bg-error/10 border-error/20';
      case 'success':
        return 'bg-success/10 border-success/20';
      default:
        return 'bg-primary/10 border-primary/20';
    }
  };

  return (
    <div className={`${getBgColor()} border rounded-lg p-4 mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <span className="text-sm font-medium text-fg">{currentMessage}</span>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-surface/50 rounded transition-colors duration-200"
        >
          <X className="w-4 h-4 text-fg/60" />
        </button>
      </div>
    </div>
  );
}
