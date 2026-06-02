import { Schema, model, models } from 'mongoose';

export interface SourceDocument {
  name: string;
  url: string;
  category: string;
  trustScore: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sourceSchema = new Schema<SourceDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    url: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    trustScore: { type: Number, default: 50, min: 0, max: 100 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Source = models.Source || model<SourceDocument>('Source', sourceSchema);
export default Source;
