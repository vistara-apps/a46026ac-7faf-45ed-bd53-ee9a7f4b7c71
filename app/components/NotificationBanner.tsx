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
  const [currentVariant, setCurrentVariant] = useState(variant);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications?userId=fc_fid_123&unreadOnly=true');
        if (response.ok) {
          const notifications = await response.json();
          if (notifications.length > 0) {
            const latestNotification = notifications[0];
            setCurrentMessage(latestNotification.message);
            setCurrentVariant(latestNotification.type === 'dataBreach' ? 'error' :
                            latestNotification.type === 'tokenUpdate' ? 'success' : 'info');
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (!message) {
      // Initial fetch
      fetchNotifications();

      // Poll for new notifications every 15 seconds
      const interval = setInterval(fetchNotifications, 15000);
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
    switch (currentVariant) {
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-error" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getBgColor = () => {
    switch (currentVariant) {
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
