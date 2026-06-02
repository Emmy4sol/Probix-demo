import { Schema, model, models, Types } from 'mongoose';

export interface ForecastDocument {
  marketId: Types.ObjectId;
  userId: Types.ObjectId;
  probability: number;
  confidence: number;
  position: 'YES' | 'NO';
  reasoning: string;
  isCorrect: boolean;
  evaluated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const forecastSchema = new Schema<ForecastDocument>(
  {
    marketId: { type: Schema.Types.ObjectId, required: true, ref: 'Market' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    probability: { type: Number, required: true, min: 0, max: 100 },
    confidence: { type: Number, required: true, min: 0, max: 100 },
    position: { type: String, required: true, enum: ['YES', 'NO'] },
    reasoning: { type: String, required: true, trim: true, minlength: 10 },
    isCorrect: { type: Boolean, default: false },
    evaluated: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Forecast = models.Forecast || model<ForecastDocument>('Forecast', forecastSchema);
export default Forecast;
