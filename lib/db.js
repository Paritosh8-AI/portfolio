import mongoose from 'mongoose';

/**
 * Global MongoDB & In-Memory Fallback Connection Manager
 * Ensures robust MERN stack execution in production, Vercel, and zero-setup local dev.
 */

const MONGODB_URI = process.env.MONGODB_URI;

// Initial high-fidelity seed data showcasing Paritosh's engineering excellence
export const INITIAL_ENDORSEMENTS = [
  {
    id: 'seed-1',
    name: 'Aarav Sharma',
    role: 'Principal SRE & Infrastructure Lead',
    company: 'ChargeNet Global',
    relationship: 'Colleague on EVSE Protocols',
    message: 'Paritosh reversed OCPP 1.6-J handshake dropped contactors using FastMCP agentic tools. What took our triage team 4 hours of raw log archaeology was solved by his causal DAG in under 2 seconds. A truly exceptional systems thinker.',
    badge: '🔌 FastMCP Agentic',
    rating: 5,
    likes: 18,
    githubUrl: 'https://github.com',
    verified: true,
    createdAt: new Date('2026-09-18T10:30:00Z').toISOString(),
  },
  {
    id: 'seed-2',
    name: 'Dr. Elena Rostova',
    role: 'Staff ML Research Scientist',
    company: 'Fintech Velocity Labs',
    relationship: 'Collaborator on CRNN Sequences',
    message: 'The Bahdanau attention weight calibration on UPI Sentinel 2.0 delivered true sub-1.2ms inference latency under high QPS. Paritosh treats low latency and memory footprints as non-negotiable first-class citizens.',
    badge: '⚡ Sub-1.2ms Latency',
    rating: 5,
    likes: 24,
    githubUrl: 'https://github.com',
    verified: true,
    createdAt: new Date('2026-09-24T14:15:00Z').toISOString(),
  },
  {
    id: 'seed-3',
    name: 'Kavita Nair',
    role: 'Senior Clinical Informatics Engineer',
    company: 'HealthPath AI',
    relationship: 'Peer Reviewer',
    message: 'Most engineers treat 99% ROC-AUC as an automatic win. Paritosh went deep into Platt probability scaling to eliminate fatal false-negative edge cases in cytology classification. Rare depth in clinical explainability.',
    badge: '🔬 Platt-Calibrated',
    rating: 5,
    likes: 15,
    githubUrl: 'https://github.com',
    verified: true,
    createdAt: new Date('2026-10-02T09:45:00Z').toISOString(),
  },
  {
    id: 'seed-4',
    name: 'Marcus Vance',
    role: 'Director of Machine Learning',
    company: 'NextGen Mobility Systems',
    relationship: 'Hiring Manager / Tech Reviewer',
    message: 'Clean code, deterministic reproducibility, zero fluff. His technical schematics and live architecture widgets reflect production reality rather than boilerplate toy demos.',
    badge: '🧠 Deep Learning',
    rating: 5,
    likes: 11,
    githubUrl: 'https://github.com',
    verified: true,
    createdAt: new Date('2026-10-08T16:20:00Z').toISOString(),
  },
];

// In-memory runtime store for seamless local execution and demo fallback
let inMemoryEndorsements = [...INITIAL_ENDORSEMENTS];

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

