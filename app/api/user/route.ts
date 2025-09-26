import { NextRequest, NextResponse } from 'next/server';
import { User, PrivacySettings, DataSharingFlags } from '@/lib/types';

// Mock user data - in production, this would come from a database
let mockUser: User = {
  userId: 'fc_fid_123', // Farcaster ID
  ethAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  emailHash: undefined,
  tokenBalance: 125.125,
  privacySettings: {
    blockingLevel: 'standard',
    allowAnalytics: false,
    allowSocial: false,
    allowAdvertising: false,
    allowFingerprinting: false,
  },
  optedInDataFlags: {
    anonymizedBrowsing: false,
    attentionData: false,
    performanceMetrics: false,
  },
};

export async function GET(request: NextRequest) {
  try {
    // In production, get user from authentication/session
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Mock user lookup - in production, query database
    if (userId !== mockUser.userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(mockUser);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, privacySettings, optedInDataFlags } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Update user settings
    if (privacySettings) {
      mockUser.privacySettings = { ...mockUser.privacySettings, ...privacySettings };
    }

    if (optedInDataFlags) {
      mockUser.optedInDataFlags = { ...mockUser.optedInDataFlags, ...optedInDataFlags };
    }

    return NextResponse.json(mockUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ethAddress, email } = body;

    if (!ethAddress) {
      return NextResponse.json({ error: 'Ethereum address required' }, { status: 400 });
    }

    // Create new user - in production, save to database
    const newUser: User = {
      userId: `fc_fid_${Date.now()}`, // Generate Farcaster-like ID
      ethAddress,
      emailHash: email ? require('crypto').createHash('sha256').update(email.toLowerCase().trim()).digest('hex') : undefined,
      tokenBalance: 10, // Welcome bonus
      privacySettings: {
        blockingLevel: 'standard',
        allowAnalytics: false,
        allowSocial: false,
        allowAdvertising: false,
        allowFingerprinting: false,
      },
      optedInDataFlags: {
        anonymizedBrowsing: false,
        attentionData: false,
        performanceMetrics: false,
      },
    };

    mockUser = newUser;

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

