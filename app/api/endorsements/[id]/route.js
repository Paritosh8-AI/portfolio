import { NextResponse } from 'next/server';
import { connectToDatabase, inMemoryStore } from '@/lib/db';
import Endorsement from '@/models/Endorsement';

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    const dbStatus = await connectToDatabase();

    if (dbStatus.isConnected) {
      const deleted = await Endorsement.findByIdAndDelete(id);
      if (!deleted) {
        return NextResponse.json({ success: false, error: 'Endorsement not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: 'Endorsement removed successfully' });
    }

    const removed = inMemoryStore.delete(id);
    if (!removed) {
      return NextResponse.json({ success: false, error: 'Endorsement not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Endorsement removed successfully' });
  } catch (error) {
    console.error('Error deleting endorsement:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete endorsement' }, { status: 500 });
  }
}
