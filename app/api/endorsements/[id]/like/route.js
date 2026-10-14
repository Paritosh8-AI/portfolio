import { NextResponse } from 'next/server';
import { connectToDatabase, inMemoryStore } from '@/lib/db';
import Endorsement from '@/models/Endorsement';

export async function POST(request, context) {
  try {
    const { id } = await context.params;

    const dbStatus = await connectToDatabase();

    if (dbStatus.isConnected) {
      const updated = await Endorsement.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 } },
        { new: true }
      ).lean();

      if (!updated) {
        return NextResponse.json({ success: false, error: 'Endorsement not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        likes: updated.likes,
        data: { ...updated, id: updated._id.toString() },
      });
    }

    // In-memory like
    const item = inMemoryStore.like(id);
    if (!item) {
      return NextResponse.json({ success: false, error: 'Endorsement not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      likes: item.likes,
      data: item,
    });
  } catch (error) {
    console.error('Error liking endorsement:', error);
    return NextResponse.json({ success: false, error: 'Failed to increment endorsement likes' }, { status: 500 });
  }
}
