export interface User {
  userId: string; // Farcaster ID/Custody Wallet
  ethAddress: string;
  emailHash?: string;
  tokenBalance: number;
  privacySettings: PrivacySettings;
  optedInDataFlags: DataSharingFlags;
}

export interface PrivacySettings {
  blockingLevel: 'basic' | 'standard' | 'strict';
  allowAnalytics: boolean;
  allowSocial: boolean;
  allowAdvertising: boolean;
  allowFingerprinting: boolean;
}

export interface DataSharingFlags {
  anonymizedBrowsing: boolean;
  attentionData: boolean;
  performanceMetrics: boolean;
}

export interface TrackedSite {
  siteUrl: string;
  blockedTrackersCount: number;
  lastVisit: Date;
  userConsent: boolean;
  userId: string;
}

export interface Notification {
  notificationId: string;
  userId: string;
  type: 'dataBreach' | 'tokenUpdate' | 'privacyAlert';
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface TokenTransaction {
  transactionId: string;
  userId: string;
  type: 'earn' | 'spend' | 'transfer';
  amount: number;
  timestamp: Date;
  relatedEntityId?: string;
  description?: string;
}

export interface TrackerData {
  id: string;
  domain: string;
  type: 'analytics' | 'advertising' | 'social' | 'fingerprinting';
  blocked: boolean;
  attempts: number;
  lastSeen: Date;
  category?: string;
  risk?: 'low' | 'medium' | 'high';
}

export interface EarningMetrics {
  totalEarned: number;
  dailyEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  trackersBlocked: number;
  sitesProtected: number;
  daysActive: number;
}
