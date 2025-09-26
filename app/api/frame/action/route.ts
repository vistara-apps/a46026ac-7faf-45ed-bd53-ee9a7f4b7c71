import { NextRequest, NextResponse } from 'next/server';

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
        // Get updated user data
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user?userId=fc_fid_${fid}`);
        const userData = userResponse.ok ? await userResponse.json() : { tokenBalance: 0 };

        return NextResponse.json({
          type: 'form',
          title: 'Tokens Earned!',
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame?fid=${fid}&balance=${userData.tokenBalance}`,
        });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error handling frame action:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

