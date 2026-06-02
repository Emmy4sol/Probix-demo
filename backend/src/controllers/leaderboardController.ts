import { Request, Response } from 'express';
import { getGlobalLeaderboard, getCategoryLeaderboard, getUserLeaderboard } from '../services/leaderboard.service';
import { success, fail } from '../utils/apiResponse';

export async function globalLeaderboard(req: Request, res: Response) {
  const leaderboard = await getGlobalLeaderboard();
  return success(res, leaderboard);
}

export async function categoryLeaderboard(req: Request, res: Response) {
  const { slug } = req.params;
  if (!slug) return fail(res, 'Category slug is required', 400);
  const leaderboard = await getCategoryLeaderboard(slug);
  return success(res, leaderboard);
}

export async function userLeaderboard(req: Request, res: Response) {
  const { id } = req.params;
  const leaderboard = await getUserLeaderboard(id);
  if (!leaderboard) return fail(res, 'User not found', 404);
  return success(res, leaderboard);
}
