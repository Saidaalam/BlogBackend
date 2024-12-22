import mongoose, { Document, Schema } from 'mongoose';

interface IBlog extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', blogSchema);