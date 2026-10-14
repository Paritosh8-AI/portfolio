import mongoose from 'mongoose';

/**
 * Global MongoDB & In-Memory Fallback Connection Manager
 * Ensures robust MERN stack execution in production, Vercel, and zero-setup local dev.
 */

const MONGODB_URI = process.env.MONGODB_URI;

// Clean empty starting state for authentic real peer endorsements
export const INITIAL_ENDORSEMENTS = [];

// In-memory runtime store for seamless local execution and demo fallback
let inMemoryEndorsements = [];

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return { isConnected: true, type: 'mongodb' };
  }

  if (!MONGODB_URI) {
    return { isConnected: false, type: 'in-memory' };
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    }).catch((err) => {
      console.warn('⚠️ MongoDB connection attempt failed, switching to resilient in-memory store:', err.message);
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
    if (cached.conn) {
      return { isConnected: true, type: 'mongodb' };
    }
  } catch (e) {
    cached.promise = null;
  }

  return { isConnected: false, type: 'in-memory' };
}

// In-memory contact messages store
let inMemoryMessages = [];

// In-memory data store helper operations
export const inMemoryStore = {
  getAll: (sort = 'newest', badge = '') => {
    let results = [...inMemoryEndorsements];
    if (badge && badge !== 'all') {
      results = results.filter((item) => item.badge.toLowerCase().includes(badge.toLowerCase()));
    }
    if (sort === 'top') {
      results.sort((a, b) => b.likes - a.likes);
    } else {
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return results;
  },

  create: (data) => {
    const newEntry = {
      id: 'end-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: data.name.trim(),
      role: data.role.trim(),
      company: data.company ? data.company.trim() : 'Tech Community',
      relationship: data.relationship || 'Engineering Peer',
      message: data.message.trim(),
      badge: data.badge || '🧠 Deep Learning',
      rating: Number(data.rating) || 5,
      likes: 0,
      githubUrl: data.githubUrl || '',
      verified: true,
      createdAt: new Date().toISOString(),
    };
    inMemoryEndorsements.unshift(newEntry);
    return newEntry;
  },

  like: (id) => {
    const item = inMemoryEndorsements.find((e) => e.id === id || e._id === id);
    if (item) {
      item.likes = (item.likes || 0) + 1;
      return item;
    }
    return null;
  },

  delete: (id) => {
    const index = inMemoryEndorsements.findIndex((e) => e.id === id || e._id === id);
    if (index !== -1) {
      const removed = inMemoryEndorsements.splice(index, 1);
      return removed[0];
    }
    return null;
  },

  // Contact message operations
  createMessage: (data) => {
    const newMsg = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject ? data.subject.trim() : 'General Inquiry',
      category: data.category || 'General',
      message: data.message.trim(),
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    inMemoryMessages.unshift(newMsg);
    return newMsg;
  },

  getMessages: () => {
    return [...inMemoryMessages];
  },
};

