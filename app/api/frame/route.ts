import { NextRequest, NextResponse } from 'next/server';

// Farcaster Frame API for Tracker Tokens
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid'); // Farcaster user ID

    if (!fid) {
      return NextResponse.json({ error: 'Farcaster ID required' }, { status: 400 });
    }

    // Check if user exists, create if not
    let userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user?userId=fc_fid_${fid}`);
    let userData;

    if (!userResponse.ok) {
      // Create new user
      const createResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ethAddress: `0x${Math.random().toString(16).substr(2, 40)}`, // Mock address
        }),
      });

      if (createResponse.ok) {
        userData = await createResponse.json();
      } else {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
      }
    } else {
      userData = await userResponse.json();
    }

    // Return Frame HTML
    const frameHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_APP_URL}/api/frame/image?fid=${fid}&balance=${userData.tokenBalance}" />
          <meta property="fc:frame:button:1" content="Check My Privacy" />
          <meta property="fc:frame:button:2" content="Earn Tokens" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_APP_URL}/api/frame/action" />
          <meta property="og:title" content="Tracker Tokens" />
          <meta property="og:description" content="Block trackers, earn tokens, own your data." />
        </head>
        <body>
          <h1>Tracker Tokens Frame</h1>
          <p>Current Balance: ${userData.tokenBalance} TT</p>
        </body>
      </html>
    `;

    return new NextResponse(frameHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error handling frame request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData } = body;

    if (!untrustedData?.fid) {
      return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 });
    }

    const fid = untrustedData.fid;
    const buttonIndex = untrustedData.buttonIndex;

    // Handle different button actions
    if (buttonIndex === 1) {
      // Check My Privacy - redirect to mini app
      return NextResponse.json({
        type: 'form',
        title: 'Check My Privacy',
        url: `${process.env.NEXT_PUBLIC_APP_URL}?fid=${fid}`,
      });
    } else if (buttonIndex === 2) {
      // Earn Tokens - simulate earning
      const earnResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: `fc_fid_${fid}`,
          type: 'earn',
          amount: 0.1,
          description: 'Earned via Farcaster Frame interaction',
        }),
      });

      if (earnResponse.ok) {
        return NextResponse.json({
          type: 'form',
          title: 'Tokens Earned!',
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame?fid=${fid}`,
        });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error handling frame action:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

