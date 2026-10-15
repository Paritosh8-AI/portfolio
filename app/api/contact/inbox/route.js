import { NextResponse } from 'next/server';
import { connectToDatabase, inMemoryStore } from '@/lib/db';
import Message from '@/models/Message';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);

    const dbStatus = await connectToDatabase();
    let messages = [];

    if (dbStatus.isConnected) {
      messages = await Message.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
    } else {
      messages = inMemoryStore.getMessages().slice(0, limit);
    }

    return NextResponse.json({
      status: 'success',
      count: messages.length,
      dbEngine: dbStatus.type,
      recipient: 'paritoshmukherjee8@gmail.com',
      messages,
    });
  } catch (error) {
    console.error('Inbox API Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve inbox messages' },
      { status: 500 }
    );
  }
}
