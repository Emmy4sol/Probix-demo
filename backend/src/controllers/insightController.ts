import { Request, Response } from 'express';
import Forecast from '../models/Forecast';
import Market from '../models/Market';
import Comment from '../models/Comment';
import { success } from '../utils/apiResponse';

export async function getInsights(req: Request, res: Response) {
  const topForecasts = await Forecast.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 10 }
  ]);

  const trendingMarkets = await Market.aggregate([
    {
      $lookup: {
        from: 'forecasts',
        localField: '_id',
        foreignField: 'marketId',
        as: 'forecasts'
      }
    },
    { $project: { title: 1, category: 1, count: { $size: '$forecasts' } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  const communitySignals = await Comment.aggregate([
    { $group: { _id: '$marketId', commentCount: { $sum: 1 } } },
    { $sort: { commentCount: -1 } },
    { $limit: 10 }
  ]);

  return success(res, { topForecasts, trendingMarkets, communitySignals });
}
