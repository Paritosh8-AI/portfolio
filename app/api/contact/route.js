import { NextResponse } from 'next/server';
import { connectToDatabase, inMemoryStore } from '@/lib/db';
import Message from '@/models/Message';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, category, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name is required and must be at least 2 characters.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    const dbStatus = await connectToDatabase();

    let savedMessage = null;

    if (dbStatus.isConnected && dbStatus.type === 'mongodb') {
      try {
        const created = await Message.create({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          subject: subject ? subject.trim() : 'General Inquiry',
          category: category || 'General',
          message: message.trim(),
        });
        savedMessage = created.toObject();
      } catch (dbErr) {
        console.warn('MongoDB write error, falling back to in-memory store:', dbErr.message);
        savedMessage = inMemoryStore.createMessage({
          name,
          email,
          subject,
          category,
          message,
        });
      }
    } else {
      savedMessage = inMemoryStore.createMessage({
        name,
        email,
        subject,
        category,
        message,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message was successfully received and ingested into Paritosh’s communication queue.',
        data: {
          id: savedMessage._id || savedMessage.id,
          name: savedMessage.name,
          subject: savedMessage.subject,
          createdAt: savedMessage.createdAt,
          dbEngine: dbStatus.type,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing your message.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const dbStatus = await connectToDatabase();
  return NextResponse.json({
    status: 'online',
    endpoint: '/api/contact',
    sla: '< 24 Hours Response Guarantee',
    dbEngine: dbStatus.type,
    activeTimezone: 'Asia/Kolkata (UTC +5:30)',
  });
}
