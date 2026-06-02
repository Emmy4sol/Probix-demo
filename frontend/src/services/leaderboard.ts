import api from './api';
import type { LeaderboardEntry, UserLeaderboard } from '../types';

export async function fetchGlobalLeaderboard() {
  const response = await api.get<{ data: LeaderboardEntry[] }>('/leaderboards/global');
  return response.data.data;
}

export async function fetchCategoryLeaderboard(categoryId: string) {
  const response = await api.get<{ data: LeaderboardEntry[] }>(`/leaderboards/category/${categoryId}`);
  return response.data.data;
}

export async function fetchUserLeaderboard(userId: string) {
  const response = await api.get<{ data: UserLeaderboard }>(`/leaderboards/user/${userId}`);
  return response.data.data;
}
