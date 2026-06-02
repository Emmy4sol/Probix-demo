import api from './api';
import type { WatchlistItem } from '../types';

export async function fetchWatchlist() {
  const response = await api.get<{ data: WatchlistItem[] }>('/watchlist');
  return response.data.data;
}

export async function addWatchlistItem(marketId: string) {
  const response = await api.post<{ data: WatchlistItem }>('/watchlist', { marketId });
  return response.data.data;
}

export async function removeWatchlistItem(marketId: string) {
  const response = await api.delete<{ data: { marketId: string } }>(`/watchlist/${marketId}`);
  return response.data.data;
}
