import { Types } from 'mongoose';
import User from '../models/User';
import Forecast from '../models/Forecast';
import Market from '../models/Market';

export async function getGlobalLeaderboard(limit = 50) {
  return User.find({ forecastsCount: { $gt: 0 } })
    .sort({ reputation: -1, accuracyScore: -1, forecastsCount: -1 })
    .limit(limit)
    .select('username role reputation accuracyScore forecastsCount correctForecasts')
    .lean();
}

export async function getCategoryLeaderboard(categorySlug: string, limit = 50) {
  const rows = await Forecast.aggregate([
    {
      $lookup: {
        from: 'markets',
        localField: 'marketId',
        foreignField: '_id',
        as: 'market'
      }
    },
    { $unwind: '$market' },
    { $match: { 'market.category': categorySlug } },
    {
      $group: {
        _id: '$userId',
        totalForecasts: { $sum: 1 },
        correctForecasts: { $sum: { $cond: [{ $eq: ['$isCorrect', true] }, 1, 0] } },
        averageConfidence: { $avg: '$confidence' }
      }
    },
    {
      $project: {
        userId: '$_id',
        totalForecasts: 1,
        correctForecasts: 1,
        accuracy: {
          $cond: [
            { $gt: ['$totalForecasts', 0] },
            { $multiply: [{ $divide: ['$correctForecasts', '$totalForecasts'] }, 100] },
            0
          ]
        },
        averageConfidence: 1,
        score: {
          $add: [
            { $multiply: [{ $cond: [{ $gt: ['$totalForecasts', 0] }, { $divide: ['$correctForecasts', '$totalForecasts'] }, 0] }, 70] },
            { $multiply: ['$averageConfidence', 30] }
          ]
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' },
    {
      $project: {
        user: {
          _id: '$user._id',
          username: '$user.username',
          role: '$user.role',
          reputation: '$user.reputation',
          accuracyScore: '$user.accuracyScore',
          forecastsCount: '$user.forecastsCount',
          correctForecasts: '$user.correctForecasts'
        },
        totalForecasts: 1,
        accuracy: 1,
        averageConfidence: 1,
        score: 1
      }
    },
    { $sort: { score: -1, accuracy: -1, averageConfidence: -1 } },
    { $limit: limit }
  ]);

  return rows.map((row) => ({
    user: row.user,
    totalForecasts: row.totalForecasts,
    accuracy: Number(row.accuracy.toFixed(2)),
    averageConfidence: Number(row.averageConfidence.toFixed(2)),
    score: Number(row.score.toFixed(2))
  }));
}

export async function getUserLeaderboard(userId: string) {
  const user = await User.findById(userId).select('username email role reputation accuracyScore forecastsCount correctForecasts').lean();
  if (!user) return null;

  const rank = await User.countDocuments({ reputation: { $gt: user.reputation } }) + 1;
  return {
    user,
    rank,
    reputation: user.reputation,
    accuracyScore: user.accuracyScore,
    forecastsCount: user.forecastsCount,
    correctForecasts: user.correctForecasts
  };
}
