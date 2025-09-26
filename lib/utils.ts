import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTokenAmount(amount: number, decimals: number = 3): string {
  return amount.toFixed(decimals);
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return date.toLocaleDateString();
}

export function calculateBlockingPercentage(blocked: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((blocked / total) * 100);
}

export function generateMockTrackerData() {
  const domains = [
    'google-analytics.com',
    'facebook.com',
    'doubleclick.net',
    'amazon-adsystem.com',
    'googlesyndication.com',
    'twitter.com',
    'linkedin.com',
    'pinterest.com',
    'instagram.com',
    'tiktok.com',
  ];

  const types = ['analytics', 'advertising', 'social', 'fingerprinting'] as const;

  return domains.map((domain, index) => ({
    id: `tracker-${index}`,
    domain,
    type: types[Math.floor(Math.random() * types.length)],
    blocked: Math.random() > 0.3,
    attempts: Math.floor(Math.random() * 50) + 1,
    lastSeen: new Date(Date.now() - Math.random() * 3600000), // Random time in last hour
  }));
}

export function hashEmail(email: string): string {
  // Simple hash function for demo purposes
  // In production, use a proper cryptographic hash
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

export function validateEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function truncateAddress(address: string, startLength: number = 6, endLength: number = 4): string {
  if (address.length <= startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}
