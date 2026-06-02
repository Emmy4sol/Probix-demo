import { Request, Response } from 'express';
import ForecastVote from '../models/ForecastVote';
import { success, fail } from '../utils/apiResponse';

export async function voteForecast(req: Request, res: Response) {
  const { forecastId, voteType } = req.body;
  const userId = (req as any).user.id;

  const existing = await ForecastVote.findOne({ userId, forecastId, voteType }).lean();
  if (existing) return fail(res, 'Vote already recorded', 409);

  const vote = await ForecastVote.create({ userId, forecastId, voteType });
  return success(res, vote, 201);
}

export async function getForecastVotes(req: Request, res: Response) {
  const { forecastId } = req.params;
  const votes = await ForecastVote.find({ forecastId });
  return success(res, votes);
}
