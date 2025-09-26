import { NextRequest, NextResponse } from 'next/server';
import { Notification } from '@/lib/types';

// Mock notifications - in production, this would come from a database
let mockNotifications: Notification[] = [
  {
    notificationId: 'notif_1',
    userId: 'fc_fid_123',
    type: 'tokenUpdate',
    message: 'Earned 0.05 TT tokens for blocking trackers!',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    read: false,
  },
  {
    notificationId: 'notif_2',
    userId: 'fc_fid_123',
    type: 'privacyAlert',
    message: 'New privacy feature available in settings',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    let userNotifications = mockNotifications.filter(notif => notif.userId === userId);

    if (unreadOnly) {
      userNotifications = userNotifications.filter(notif => !notif.read);
    }

    // Sort by timestamp (newest first)
    userNotifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return NextResponse.json(userNotifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, message } = body;

    if (!userId || !type || !message) {
      return NextResponse.json({ error: 'User ID, type, and message required' }, { status: 400 });
    }

    const newNotification: Notification = {
      notificationId: `notif_${Date.now()}`,
      userId,
      type: type as 'dataBreach' | 'tokenUpdate' | 'privacyAlert',
      message,
      timestamp: new Date(),
      read: false,
    };

    mockNotifications.push(newNotification);

    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { notificationId, read } = body;

    if (!notificationId) {
      return NextResponse.json({ error: 'Notification ID required' }, { status: 400 });
    }

    const notification = mockNotifications.find(n => n.notificationId === notificationId);

    if (!notification) {
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    }

    if (read !== undefined) {
      notification.read = read;
    }

    return NextResponse.json(notification);
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

