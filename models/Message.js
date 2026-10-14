import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    subject: {
      type: String,
      trim: true,
      default: 'General Inquiry',
      maxlength: [150, 'Subject cannot exceed 150 characters'],
    },
    category: {
      type: String,
      enum: ['Engineering Role', 'Telemetry Consulting', 'ML Architecture', 'General', 'Collaboration'],
      default: 'General',
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'archived'],
      default: 'unread',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
