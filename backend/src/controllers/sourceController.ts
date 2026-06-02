import { Request, Response } from 'express';
import Source from '../models/Source';
import { success, fail } from '../utils/apiResponse';

export async function createSource(req: Request, res: Response) {
  const { name, url, category, trustScore = 50, isActive = true } = req.body;
  const existing = await Source.findOne({ name }).lean();
  if (existing) return fail(res, 'Source already exists', 409);
  const source = await Source.create({ name, url, category, trustScore, isActive });
  return success(res, source, 201);
}

export async function listSources(req: Request, res: Response) {
  const sources = await Source.find({ isActive: true }).sort({ trustScore: -1, name: 1 });
  return success(res, sources);
}
