import api from './api';
import type { Forecast } from '../types';

export async function fetchForecastsForMarket(marketId: string) {
  const response = await api.get<{ data: Forecast[] }>(`/forecasts/${marketId}`);
  return response.data.data;
}

export async function submitForecast(payload: {
  marketId: string;
  probability: number;
  confidence: number;
  position: 'YES' | 'NO';
  reasoning: string;
}) {
  const response = await api.post<{ data: Forecast }>('/forecasts', payload);
  return response.data.data;
}
