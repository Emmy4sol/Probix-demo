import { Request, Response } from 'express';
import Watchlist from '../models/Watchlist';
import { success, fail } from '../utils/apiResponse';

export async function addWatchlist(req: Request, res: Response) {
  const { marketId } = req.body;
  const userId = (req as any).user.id;
  const existing = await Watchlist.findOne({ userId, marketId }).lean();
  if (existing) return fail(res, 'Already added to watchlist', 409);

  const watchlist = await Watchlist.create({ userId, marketId });
  return success(res, watchlist, 201);
}

export async function removeWatchlist(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const { marketId } = req.params;
  await Watchlist.deleteOne({ userId, marketId });
  return success(res, { marketId });
}

export async function getWatchlist(req: Request, res: Response) {
  const userId = (req as any).user.id;
  const items = await Watchlist.find({ userId }).populate('marketId');
  return success(res, items);
}
