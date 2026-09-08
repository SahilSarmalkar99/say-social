import mongoose from 'mongoose';

const carouselVideoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '', trim: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

carouselVideoSchema.index({ order: 1, createdAt: 1 });
export default mongoose.model('CarouselVideo', carouselVideoSchema);
