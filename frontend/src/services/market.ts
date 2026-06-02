import api from './api';
import type { Market } from '../types';

export async function fetchMarkets() {
  const response = await api.get<{ data: Market[] }>('/markets');
  return response.data.data;
}

export async function fetchMarketBySlug(slug: string) {
  const response = await api.get<{ data: Market }>(`/markets/${slug}`);
  return response.data.data;
}
