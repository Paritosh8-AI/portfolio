import { NextResponse } from 'next/server';
import { connectToDatabase, inMemoryStore, INITIAL_ENDORSEMENTS } from '@/lib/db';
import Endorsement from '@/models/Endorsement';
import { sendEndorsementNotification } from '@/lib/mailer';

// GET /api/endorsements - Retrieve all endorsements
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || 'newest';
    const badge = searchParams.get('badge') || '';

    const dbStatus = await connectToDatabase();

    if (dbStatus.isConnected) {
      let query = {};
      if (badge && badge !== 'all') {
        query.badge = { $regex: badge, $options: 'i' };
      }

      let sortOption = { createdAt: -1 };
      if (sort === 'top') {
        sortOption = { likes: -1, createdAt: -1 };
      }

      // Exclude any legacy mock seed entries if they were saved previously
      query.name = { $nin: ['Aarav Sharma', 'Dr. Elena Rostova', 'Kavita Nair', 'Marcus Vance'] };

      const endorsements = await Endorsement.find(query).sort(sortOption).lean();

      return NextResponse.json({
        success: true,
        count: endorsements.length,
        dbType: 'mongodb',
        data: endorsements.map((e) => ({ ...e, id: e._id.toString() })),
      });
    }

    // Resilient In-Memory Fallback
    const fallbackData = inMemoryStore.getAll(sort, badge);
    return NextResponse.json({
      success: true,
      count: fallbackData.length,
      dbType: 'in-memory',
      data: fallbackData,
    });
  } catch (error) {
    console.error('Error fetching endorsements:', error);
    // Even in error, return in-memory gracefully so client never breaks
    const fallbackData = inMemoryStore.getAll();
    return NextResponse.json({
      success: true,
      count: fallbackData.length,
      dbType: 'in-memory (fallback)',
      data: fallbackData,
    });
  }
}

// POST /api/endorsements - Create a new peer endorsement
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, role, company, relationship, message, badge, rating, githubUrl } = body;

    // Strict validation
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }
    if (!role || !role.trim()) {
      return NextResponse.json({ success: false, error: 'Role is required' }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ success: false, error: 'Endorsement message is required' }, { status: 400 });
    }
    if (message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    const dbStatus = await connectToDatabase();

    if (dbStatus.isConnected) {
      const created = await Endorsement.create({
        name: name.trim(),
        role: role.trim(),
        company: company ? company.trim() : 'Tech Community',
        relationship: relationship ? relationship.trim() : 'Engineering Peer',
        message: message.trim(),
        badge: badge || '🧠 Deep Learning',
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        githubUrl: githubUrl ? githubUrl.trim() : '',
        likes: 0,
        verified: true,
      });

      // Dispatch email notification to Paritosh (asynchronous / non-blocking)
      sendEndorsementNotification({
        name: name.trim(),
        role: role.trim(),
        company: company ? company.trim() : 'Tech Community',
        relationship: relationship ? relationship.trim() : 'Engineering Peer',
        message: message.trim(),
        badge: badge || '🧠 Deep Learning',
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        githubUrl: githubUrl ? githubUrl.trim() : '',
      }).catch((e) => console.warn('Endorsement notification error:', e));

      return NextResponse.json(
        {
          success: true,
          dbType: 'mongodb',
          message: 'Endorsement published to MongoDB successfully!',
          data: { ...created.toObject(), id: created._id.toString() },
        },
        { status: 201 }
      );
    }

    // In-memory creation
    const createdInMemory = inMemoryStore.create({
      name,
      role,
      company,
      relationship,
      message,
      badge,
      rating,
      githubUrl,
    });

    // Dispatch email notification to Paritosh (asynchronous / non-blocking)
    sendEndorsementNotification({
      name: name.trim(),
      role: role.trim(),
      company: company ? company.trim() : 'Tech Community',
      relationship: relationship ? relationship.trim() : 'Engineering Peer',
      message: message.trim(),
      badge: badge || '🧠 Deep Learning',
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      githubUrl: githubUrl ? githubUrl.trim() : '',
    }).catch((e) => console.warn('Endorsement notification error:', e));

    return NextResponse.json(
      {
        success: true,
        dbType: 'in-memory',
        message: 'Endorsement published to live in-memory store!',
        data: createdInMemory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating endorsement:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit endorsement' },
      { status: 500 }
    );
  }
}
