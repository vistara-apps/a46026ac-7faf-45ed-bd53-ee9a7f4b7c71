import { NextRequest, NextResponse } from 'next/server';

// Mock breach data - in production, this would call the real HaveIBeenPwned API
const mockBreaches = [
  {
    Name: 'Adobe',
    Title: 'Adobe',
    Domain: 'adobe.com',
    BreachDate: '2013-10-04',
    AddedDate: '2013-12-04T00:00:00Z',
    ModifiedDate: '2022-05-15T23:52:10Z',
    PwnCount: 152445165,
    Description: 'In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and many were quickly resolved back to plain text. The unencrypted hints also disproportionately assisted password recovery.',
    LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/Adobe.png',
    DataClasses: ['Email addresses', 'Password hints', 'Passwords', 'Usernames'],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
  },
  {
    Name: 'LinkedIn',
    Title: 'LinkedIn',
    Domain: 'linkedin.com',
    BreachDate: '2012-05-05',
    AddedDate: '2016-05-21T21:35:40Z',
    ModifiedDate: '2016-05-21T21:35:40Z',
    PwnCount: 167370959,
    Description: 'In May 2016, LinkedIn had 167 million email addresses and passwords exposed. Originally hacked in 2012, the data remained out of sight until being offered for sale on a dark market site 4 years later.',
    LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/LinkedIn.png',
    DataClasses: ['Email addresses', 'Passwords'],
    IsVerified: true,
    IsFabricated: false,
    IsSensitive: false,
    IsRetired: false,
    IsSpamList: false,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 });
    }

    // Hash the email for privacy (as per HaveIBeenPwned API)
    const crypto = require('crypto');
    const hash = crypto.createHash('sha1').update(email.toLowerCase().trim()).digest('hex').toUpperCase();

    // In production, this would make a real API call to HaveIBeenPwned
    // For demo purposes, we'll simulate based on the hash
    const hasBeenBreached = hash.startsWith('000') || Math.random() > 0.7;

    if (!hasBeenBreached) {
      return NextResponse.json([]);
    }

    // Return mock breach data
    const userBreaches = mockBreaches.filter(() => Math.random() > 0.5);

    return NextResponse.json(userBreaches);
  } catch (error) {
    console.error('Error checking data breaches:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email } = body;

    if (!userId || !email) {
      return NextResponse.json({ error: 'User ID and email required' }, { status: 400 });
    }

    // Hash the email
    const crypto = require('crypto');
    const hash = crypto.createHash('sha1').update(email.toLowerCase().trim()).digest('hex').toUpperCase();

    // Check for breaches
    const breaches = await checkBreaches(hash);

    if (breaches.length > 0) {
      // Create notification for user
      const notificationResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          type: 'dataBreach',
          message: `Data breach detected! Your email was found in ${breaches.length} breach(es). Check your account security.`,
        }),
      });

      if (!notificationResponse.ok) {
        console.error('Failed to create breach notification');
      }
    }

    return NextResponse.json({
      breaches,
      checked: true,
      message: breaches.length > 0
        ? `Found ${breaches.length} data breach(es) for this email.`
        : 'No data breaches found for this email.',
    });
  } catch (error) {
    console.error('Error checking data breaches:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to check breaches (mock implementation)
async function checkBreaches(emailHash: string): Promise<any[]> {
  // In production, this would call the real HaveIBeenPwned API
  // For demo, simulate random breaches
  if (Math.random() > 0.6) {
    return mockBreaches.slice(0, Math.floor(Math.random() * mockBreaches.length) + 1);
  }
  return [];
}

