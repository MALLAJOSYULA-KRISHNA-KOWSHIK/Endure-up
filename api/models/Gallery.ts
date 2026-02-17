import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    span: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery ||
  mongoose.model('Gallery', gallerySchema);
