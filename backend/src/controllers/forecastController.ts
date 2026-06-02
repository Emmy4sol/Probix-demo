import { Request, Response } from 'express';
import Forecast from '../models/Forecast';
import Market from '../models/Market';
import User from '../models/User';
import { success, fail } from '../utils/apiResponse';
import { Types } from 'mongoose';

export async function submitForecast(req: Request, res: Response) {
  const { marketId, probability, confidence, position, reasoning } = req.body;
  const market = await Market.findById(marketId);
  if (!market) return fail(res, 'Market not found', 404);

  const forecast = await Forecast.create({
    marketId: new Types.ObjectId(marketId),
    userId: (req as any).user.id,
    probability,
    confidence,
    position,
    reasoning
  });

  await User.findByIdAndUpdate((req as any).user.id, { $inc: { forecastsCount: 1 } });

  return success(res, forecast, 201);
}

export async function listForecasts(req: Request, res: Response) {
  const forecasts = await Forecast.find({ marketId: req.params.marketId }).sort({ createdAt: -1 }).limit(200);
  return success(res, forecasts);
}
