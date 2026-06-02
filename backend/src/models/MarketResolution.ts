import { Schema, model, models, Types } from 'mongoose';

export interface MarketResolutionDocument {
  marketId: Types.ObjectId;
  resolvedBy: Types.ObjectId;
  resolution: string;
  evidence: string;
  resolvedAt: Date;
}

const marketResolutionSchema = new Schema<MarketResolutionDocument>(
  {
    marketId: { type: Schema.Types.ObjectId, required: true, ref: 'Market' },
    resolvedBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    resolution: { type: String, required: true, trim: true },
    evidence: { type: String, required: true, trim: true }
  },
  { timestamps: { createdAt: 'resolvedAt', updatedAt: false } }
);

const MarketResolution = models.MarketResolution || model<MarketResolutionDocument>('MarketResolution', marketResolutionSchema);
export default MarketResolution;
