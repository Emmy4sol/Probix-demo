import { Schema, model, models, Types } from 'mongoose';

export interface WatchlistDocument {
  userId: Types.ObjectId;
  marketId: Types.ObjectId;
  createdAt: Date;
}

const watchlistSchema = new Schema<WatchlistDocument>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    marketId: { type: Schema.Types.ObjectId, required: true, ref: 'Market' }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

watchlistSchema.index({ userId: 1, marketId: 1 }, { unique: true });

const Watchlist = models.Watchlist || model<WatchlistDocument>('Watchlist', watchlistSchema);
export default Watchlist;
