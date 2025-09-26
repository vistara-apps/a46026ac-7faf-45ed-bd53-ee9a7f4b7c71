export const APP_CONFIG = {
  name: 'Tracker Tokens',
  tagline: 'Block trackers, earn tokens, own your data',
  version: '1.0.0',
  baseChain: 'base',
} as const;

export const TOKEN_CONFIG = {
  symbol: 'TT',
  name: 'Tracker Token',
  decimals: 18,
  // Contract address would go here when deployed
  contractAddress: '0x...',
} as const;

export const EARNING_RATES = {
  trackerBlocked: 0.01,
  attentionFocus: 0.05,
  dataSharing: 0.1,
  dailyBonus: 0.5,
  weeklyBonus: 2.0,
} as const;

export const TRACKER_CATEGORIES = {
  analytics: {
    name: 'Analytics',
    description: 'Website analytics and user behavior tracking',
    color: 'primary',
    risk: 'low',
  },
  advertising: {
    name: 'Advertising',
    description: 'Ad networks and marketing trackers',
    color: 'warning',
    risk: 'medium',
  },
  social: {
    name: 'Social Media',
    description: 'Social media widgets and tracking',
    color: 'accent',
    risk: 'medium',
  },
  fingerprinting: {
    name: 'Fingerprinting',
    description: 'Device and browser fingerprinting',
    color: 'error',
    risk: 'high',
  },
} as const;

export const PRIVACY_LEVELS = {
  basic: {
    name: 'Basic Protection',
    description: 'Blocks known malicious trackers',
    blockingPercentage: 60,
  },
  standard: {
    name: 'Standard Protection',
    description: 'Blocks most advertising and analytics trackers',
    blockingPercentage: 80,
  },
  strict: {
    name: 'Strict Protection',
    description: 'Blocks all trackers (may break some sites)',
    blockingPercentage: 95,
  },
} as const;

export const NOTIFICATION_TYPES = {
  dataBreach: {
    icon: 'AlertTriangle',
    color: 'error',
    priority: 'high',
  },
  tokenUpdate: {
    icon: 'Coins',
    color: 'success',
    priority: 'medium',
  },
  privacyAlert: {
    icon: 'Shield',
    color: 'warning',
    priority: 'medium',
  },
} as const;
