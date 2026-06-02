import { Schema, model, models, Types } from 'mongoose';

export interface RefreshTokenDocument {
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

const refreshTokenSchema = new Schema<RefreshTokenDocument>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const RefreshToken = models.RefreshToken || model<RefreshTokenDocument>('RefreshToken', refreshTokenSchema);
export default RefreshToken;
