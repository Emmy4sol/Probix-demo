export type UserRole = 'USER' | 'MODERATOR' | 'ADMIN' | 'SUPER_ADMIN';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  isActive: boolean;
}

export interface Market {
  _id: string;
  title: string;
  slug: string;
  category: string;
  categoryId?: string;
  sourceName: string;
  sourceUrl: string;
  description: string;
  closeDate: string;
  resolveDate: string;
  status: 'OPEN' | 'CLOSED' | 'RESOLVED';
  resolutionEvidence?: string;
  resolvedOutcome?: 'YES' | 'NO';
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Forecast {
  _id: string;
  marketId: string;
  userId: string;
  probability: number;
  confidence: number;
  position: 'YES' | 'NO';
  reasoning: string;
  createdAt: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  reputation: number;
  accuracyScore: number;
  forecastsCount: number;
  correctForecasts: number;
}

export interface LeaderboardEntry {
  user: User;
  totalForecasts?: number;
  accuracy?: number;
  averageConfidence?: number;
  score?: number;
}

export interface UserLeaderboard {
  user: User;
  rank: number;
  reputation: number;
  accuracyScore: number;
  forecastsCount: number;
  correctForecasts: number;
}

export interface WatchlistItem {
  _id: string;
  marketId: Market;
  createdAt: string;
}
