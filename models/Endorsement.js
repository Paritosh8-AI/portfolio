import mongoose from 'mongoose';

const EndorsementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
      maxlength: [100, 'Role cannot exceed 100 characters'],
    },
    company: {
      type: String,
      trim: true,
      default: 'Tech Community',
      maxlength: [100, 'Company cannot exceed 100 characters'],
    },
    relationship: {
      type: String,
      trim: true,
      default: 'Engineering Peer',
      maxlength: [80, 'Relationship cannot exceed 80 characters'],
    },
    message: {
      type: String,
      required: [true, 'Endorsement message is required'],
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    badge: {
      type: String,
      default: '🧠 Deep Learning',
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    likes: {
      type: Number,
      default: 0,
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
    },
    verified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Endorsement || mongoose.model('Endorsement', EndorsementSchema);
