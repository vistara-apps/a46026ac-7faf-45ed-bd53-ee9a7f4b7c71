import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');
    const balance = searchParams.get('balance') || '0';

    if (!fid) {
      return NextResponse.json({ error: 'Farcaster ID required' }, { status: 400 });
    }

    // In production, generate a dynamic image using a library like @vercel/og
    // For now, return a simple SVG
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)"/>
        <text x="600" y="200" text-anchor="middle" fill="#FFD700" font-family="Arial, sans-serif" font-size="48" font-weight="bold">
          Tracker Tokens
        </text>
        <text x="600" y="280" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="24">
          Block trackers, earn tokens, own your data
        </text>
        <text x="600" y="380" text-anchor="middle" fill="#FFD700" font-family="Arial, sans-serif" font-size="36">
          Current Balance: ${balance} TT
        </text>
        <text x="600" y="450" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="18">
          FID: ${fid}
        </text>
        <circle cx="600" cy="520" r="30" fill="#FFD700"/>
        <text x="600" y="530" text-anchor="middle" fill="#1a1a2e" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
          TT
        </text>
      </svg>
    `;

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Error generating frame image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

