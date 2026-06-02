import { Schema, model, models, Types } from 'mongoose';

export type VoteType = 'HELPFUL' | 'WELL_REASONED' | 'INSIGHTFUL';

export interface ForecastVoteDocument {
  userId: Types.ObjectId;
  forecastId: Types.ObjectId;
  voteType: VoteType;
  createdAt: Date;
}

const forecastVoteSchema = new Schema<ForecastVoteDocument>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    forecastId: { type: Schema.Types.ObjectId, required: true, ref: 'Forecast' },
    voteType: { type: String, required: true, enum: ['HELPFUL', 'WELL_REASONED', 'INSIGHTFUL'] }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

forecastVoteSchema.index({ userId: 1, forecastId: 1, voteType: 1 }, { unique: true });

const ForecastVote = models.ForecastVote || model<ForecastVoteDocument>('ForecastVote', forecastVoteSchema);
export default ForecastVote;
