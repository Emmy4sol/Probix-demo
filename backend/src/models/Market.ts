import { Schema, model, models, Types } from 'mongoose';

export interface MarketDocument {
  title: string;
  slug: string;
  category: string;
  categoryId?: Types.ObjectId;
  sourceId?: Types.ObjectId;
  sourceName: string;
  sourceUrl: string;
  resolutionEvidence: string;
  resolvedOutcome?: 'YES' | 'NO';
  description: string;
  closeDate: Date;
  resolveDate: Date;
  status: 'OPEN' | 'CLOSED' | 'RESOLVED';
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

function generateSlug(value: string) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const marketSchema = new Schema<MarketDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    sourceId: { type: Schema.Types.ObjectId, ref: 'Source', default: null },
    sourceName: { type: String, required: true, trim: true },
    sourceUrl: { type: String, required: true, trim: true },
    resolutionEvidence: { type: String, default: '' },
    resolvedOutcome: { type: String, enum: ['YES', 'NO'], default: undefined },
    description: { type: String, required: true, trim: true },
    closeDate: { type: Date, required: true },
    resolveDate: { type: Date, required: true },
    status: { type: String, enum: ['OPEN', 'CLOSED', 'RESOLVED'], default: 'OPEN' },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true }
);

marketSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = generateSlug(this.title);
  }
  next();
});

const Market = models.Market || model<MarketDocument>('Market', marketSchema);
export default Market;
