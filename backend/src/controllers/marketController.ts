import { Request, Response } from 'express';
import Market from '../models/Market';
import MarketResolution from '../models/MarketResolution';
import Forecast from '../models/Forecast';
import Notification from '../models/Notification';
import { success, fail } from '../utils/apiResponse';
import { Types } from 'mongoose';
import { updateUserRank } from '../services/reputation.service';

export async function createMarket(req: Request, res: Response) {
  const { title, category, categoryId, sourceName, sourceUrl, description, closeDate, resolveDate } = req.body;
  const market = await Market.create({
    title,
    category,
    categoryId: categoryId ? new Types.ObjectId(categoryId) : undefined,
    sourceName,
    sourceUrl,
    description,
    closeDate: new Date(closeDate),
    resolveDate: new Date(resolveDate),
    createdBy: (req as any).user.id
  });
  return success(res, market, 201);
}

export async function listMarkets(req: Request, res: Response) {
  const markets = await Market.find().sort({ createdAt: -1 }).limit(100);
  return success(res, markets);
}

export async function getMarket(req: Request, res: Response) {
  const marketId = req.params.id;
  let market = null;

  if (Types.ObjectId.isValid(marketId)) {
    market = await Market.findById(marketId);
  }

  if (!market) {
    market = await Market.findOne({ slug: marketId });
  }

  if (!market) return fail(res, 'Market not found', 404);
  return success(res, market);
}

export async function resolveMarket(req: Request, res: Response) {
  const { resolution, evidence, outcome } = req.body;
  if (!['YES', 'NO'].includes(outcome)) {
    return fail(res, 'Outcome must be YES or NO', 422);
  }

  const market = await Market.findById(req.params.id);
  if (!market) return fail(res, 'Market not found', 404);
  if (market.status === 'RESOLVED') return fail(res, 'Market is already resolved', 409);

  market.status = 'RESOLVED';
  market.resolutionEvidence = evidence;
  market.resolvedOutcome = outcome as 'YES' | 'NO';
  await market.save();

  await MarketResolution.create({
    marketId: market._id,
    resolvedBy: (req as any).user.id,
    resolution,
    evidence
  });

  const forecasts = await Forecast.find({ marketId: market._id });
  const userIds = new Set<string>();

  await Promise.all(
    forecasts.map(async (forecast) => {
      const isCorrect = forecast.position === outcome;
      forecast.isCorrect = isCorrect;
      forecast.evaluated = true;
      await forecast.save();
      userIds.add(forecast.userId.toString());
    })
  );

  await Promise.all(
    Array.from(userIds).map(async (userId) => {
      await updateUserRank(userId);
      await Notification.create({
        userId: new Types.ObjectId(userId),
        title: 'Market Resolved',
        body: `A market you forecasted has been resolved: ${market.title}`,
        read: false
      });
    })
  );

  return success(res, market);
}
