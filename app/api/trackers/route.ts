import { NextRequest, NextResponse } from 'next/server';
import { TrackedSite, TrackerData } from '@/lib/types';
import { generateMockTrackerData } from '@/lib/utils';

// Mock data - in production, this would come from a database
let mockTrackedSites: TrackedSite[] = [
  {
    siteUrl: 'https://example.com',
    blockedTrackersCount: 5,
    lastVisit: new Date(),
    userConsent: true,
    userId: 'fc_fid_123',
  },
  {
    siteUrl: 'https://news-site.com',
    blockedTrackersCount: 8,
    lastVisit: new Date(Date.now() - 3600000), // 1 hour ago
    userConsent: true,
    userId: 'fc_fid_123',
  },
];

let mockTrackerData: TrackerData[] = generateMockTrackerData();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type'); // 'sites' or 'trackers'

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    if (type === 'sites') {
      // Return tracked sites for user
      const userSites = mockTrackedSites.filter(site => site.userId === userId);
      return NextResponse.json(userSites);
    } else {
      // Return tracker data
      return NextResponse.json(mockTrackerData);
    }
  } catch (error) {
    console.error('Error fetching trackers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, siteUrl, blockedTrackersCount } = body;

    if (!userId || !siteUrl) {
      return NextResponse.json({ error: 'User ID and site URL required' }, { status: 400 });
    }

    // Check if site already exists
    const existingSite = mockTrackedSites.find(
      site => site.userId === userId && site.siteUrl === siteUrl
    );

    if (existingSite) {
      // Update existing site
      existingSite.blockedTrackersCount += blockedTrackersCount || 1;
      existingSite.lastVisit = new Date();
    } else {
      // Create new tracked site
      const newSite: TrackedSite = {
        siteUrl,
        blockedTrackersCount: blockedTrackersCount || 1,
        lastVisit: new Date(),
        userConsent: true,
        userId,
      };
      mockTrackedSites.push(newSite);
    }

    // Simulate token earning for blocking trackers
    const tokensEarned = (blockedTrackersCount || 1) * 0.01;

    return NextResponse.json({
      success: true,
      tokensEarned,
      message: `Blocked ${blockedTrackersCount || 1} trackers and earned ${tokensEarned} TT`
    });
  } catch (error) {
    console.error('Error recording tracker block:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

