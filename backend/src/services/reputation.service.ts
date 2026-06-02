import { Types } from 'mongoose';
import Forecast from '../models/Forecast';
import User from '../models/User';

export function calculateAccuracy(correctForecasts: number, totalForecasts: number) {
  if (totalForecasts === 0) return 0;
  return Number(((correctForecasts / totalForecasts) * 100).toFixed(2));
}

export function calculateConfidence(averageConfidence: number) {
  return Number(averageConfidence.toFixed(2));
}

export function calculateReputation(accuracy: number, averageConfidence: number, totalForecasts: number) {
  const volumeFactor = Math.min(totalForecasts, 50) / 50;
  const reputationScore = accuracy * 0.6 + averageConfidence * 0.2 + volumeFactor * 100 * 0.2;
  return Number(reputationScore.toFixed(2));
}

export async function updateUserRank(userId: string) {
  const stats = await Forecast.aggregate([
    { $match: { userId: new Types.ObjectId(userId) } },
    {
      $group: {
        _id: '$userId',
        totalForecasts: { $sum: 1 },
        correctForecasts: { $sum: { $cond: [{ $eq: ['$isCorrect', true] }, 1, 0] } },
        averageConfidence: { $avg: '$confidence' }
      }
    }
  ]);

  const [summary] = stats;
  const totalForecasts = summary?.totalForecasts ?? 0;
  const correctForecasts = summary?.correctForecasts ?? 0;
  const averageConfidence = summary?.averageConfidence ?? 0;

  const accuracy = calculateAccuracy(correctForecasts, totalForecasts);
  const confidence = calculateConfidence(averageConfidence);
  const reputation = calculateReputation(accuracy, confidence, totalForecasts);

  const user = await User.findById(userId);
  if (!user) return null;

  user.forecastsCount = totalForecasts;
  user.correctForecasts = correctForecasts;
  user.accuracyScore = accuracy;
  user.reputation = reputation;
  await user.save();

  return user;
}
