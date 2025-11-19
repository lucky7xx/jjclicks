import mongoose, { Schema, models } from 'mongoose';

export type JJPortfolioCategory =
  | 'wedding'
  | 'pre-wedding'
  | 'events'
  | 'portraits'
  | 'cinematic'
  | 'corporate'
  | 'maternity'
  | 'baby';

export interface IJJPortfolioImage {
  _id: string;
  url: string;
  publicId: string;
  category: JJPortfolioCategory;
  isLandingPage: boolean;
  order: number;
  uploadedAt: Date;
}

const JJPortfolioImageSchema = new Schema<IJJPortfolioImage>(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['wedding', 'pre-wedding', 'events', 'portraits', 'cinematic', 'corporate', 'maternity', 'baby'],
    },
    isLandingPage: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
JJPortfolioImageSchema.index({ category: 1, order: 1 });
JJPortfolioImageSchema.index({ isLandingPage: 1 });

const JJPortfolioImage = models.JJPortfolioImage || mongoose.model<IJJPortfolioImage>('JJPortfolioImage', JJPortfolioImageSchema);

export default JJPortfolioImage;
