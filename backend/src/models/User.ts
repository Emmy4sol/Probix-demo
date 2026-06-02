import { Schema, model, models } from 'mongoose';

export interface UserDocument {
  username: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  bio?: string;
  role: 'USER' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN';
  reputation: number;
  forecastsCount: number;
  correctForecasts: number;
  accuracyScore: number;
  isBanned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 32 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    avatar: { type: String, default: '' },
    bio: { type: String, default: 'Insight-driven forecaster building probability edge.' },
    role: { type: String, enum: ['USER', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'], default: 'USER' },
    reputation: { type: Number, default: 0 },
    forecastsCount: { type: Number, default: 0 },
    correctForecasts: { type: Number, default: 0 },
    accuracyScore: { type: Number, default: 0 },
    isBanned: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const User = models.User || model<UserDocument>('User', userSchema);
export default User;
