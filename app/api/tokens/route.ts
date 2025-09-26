import { NextRequest, NextResponse } from 'next/server';
import { TokenTransaction } from '@/lib/types';

// Mock token transactions - in production, this would come from a database
let mockTransactions: TokenTransaction[] = [
  {
    transactionId: 'tx_1',
    userId: 'fc_fid_123',
    type: 'earn',
    amount: 0.05,
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    description: 'Blocked 5 trackers on example.com',
  },
  {
    transactionId: 'tx_2',
    userId: 'fc_fid_123',
    type: 'earn',
    amount: 0.02,
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    description: 'Blocked 2 trackers on news-site.com',
  },
  {
    transactionId: 'tx_3',
    userId: 'fc_fid_123',
    type: 'earn',
    amount: 10,
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    description: 'Welcome bonus',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type'); // 'all', 'earn', 'spend', 'transfer'
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    let userTransactions = mockTransactions.filter(tx => tx.userId === userId);

    if (type && type !== 'all') {
      userTransactions = userTransactions.filter(tx => tx.type === type);
    }

    // Sort by timestamp (newest first) and limit
    userTransactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    userTransactions = userTransactions.slice(0, limit);

    // Calculate totals
    const totals = {
      earned: userTransactions.filter(tx => tx.type === 'earn').reduce((sum, tx) => sum + tx.amount, 0),
      spent: userTransactions.filter(tx => tx.type === 'spend').reduce((sum, tx) => sum + tx.amount, 0),
      transferred: userTransactions.filter(tx => tx.type === 'transfer').reduce((sum, tx) => sum + tx.amount, 0),
    };

    return NextResponse.json({
      transactions: userTransactions,
      totals,
      count: userTransactions.length,
    });
  } catch (error) {
    console.error('Error fetching token transactions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, type, amount, description, relatedEntityId } = body;

    if (!userId || !type || !amount) {
      return NextResponse.json({ error: 'User ID, type, and amount required' }, { status: 400 });
    }

    const newTransaction: TokenTransaction = {
      transactionId: `tx_${Date.now()}`,
      userId,
      type: type as 'earn' | 'spend' | 'transfer',
      amount,
      timestamp: new Date(),
      description,
      relatedEntityId,
    };

    mockTransactions.push(newTransaction);

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error('Error creating token transaction:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

