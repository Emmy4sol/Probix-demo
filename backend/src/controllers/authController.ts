import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import User from '../models/User';
import RefreshToken from '../models/RefreshToken';
import { hashPassword, comparePassword } from '../services/passwordService';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../services/tokenService';
import { success, fail } from '../utils/apiResponse';
import { config } from '../config';
import { Types } from 'mongoose';
import { getUserLeaderboard } from '../services/leaderboard.service';

function buildUserPayload(user: any, rank = 0) {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
    avatar: user.avatar || '',
    bio: user.bio || 'Insight-driven forecaster building probability edge.',
    reputation: user.reputation ?? 0,
    forecastsCount: user.forecastsCount ?? 0,
    correctForecasts: user.correctForecasts ?? 0,
    accuracyScore: user.accuracyScore ?? 0,
    rank
  };
}

async function buildAuthenticatedUser(user: any) {
  const leaderboard = await getUserLeaderboard(user._id.toString());
  const rank = leaderboard?.rank ?? 0;
  return buildUserPayload(user, rank);
}

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ $or: [{ email }, { username }] }).lean();
  if (existing) return fail(res, 'User already exists', 409);

  const passwordHash = await hashPassword(password);
  const user = await User.create({ username, email, passwordHash, bio: 'Insight-driven forecaster building probability edge.' });

  const accessToken = signAccessToken(user._id.toString(), user.role);
  const refreshToken = signRefreshToken(user._id.toString());

  await RefreshToken.create({ userId: user._id, token: refreshToken, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: 'lax',
    domain: config.cookieDomain,
    maxAge: 1000 * 60 * 60 * 24 * 30
  });

  const userPayload = await buildAuthenticatedUser(user);
  return success(res, { user: userPayload, accessToken });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return fail(res, 'Invalid credentials', 401);

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) return fail(res, 'Invalid credentials', 401);

  const accessToken = signAccessToken(user._id.toString(), user.role);
  const refreshToken = signRefreshToken(user._id.toString());
  await RefreshToken.create({ userId: user._id, token: refreshToken, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) });

  const userPayload = await buildAuthenticatedUser(user);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: 'lax',
    domain: config.cookieDomain,
    maxAge: 1000 * 60 * 60 * 24 * 30
  });

  return success(res, { user: userPayload, accessToken });
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies.refreshToken || req.body.refreshToken;
  if (!token) return fail(res, 'Refresh token required', 401);

  try {
    const payload = verifyRefreshToken(token);
    const existing = await RefreshToken.findOne({ token });
    if (!existing) return fail(res, 'Invalid refresh token', 401);

    const userId = payload.sub;
    const user = await User.findById(userId);
    if (!user) return fail(res, 'User not found', 404);

    const accessToken = signAccessToken(user._id.toString(), user.role);
    const userPayload = await buildAuthenticatedUser(user);
    return success(res, { user: userPayload, accessToken });
  } catch (error) {
    return fail(res, 'Invalid refresh token', 401);
  }
}

export async function logout(req: Request, res: Response) {
  const token = req.cookies.refreshToken;
  if (token) {
    await RefreshToken.deleteOne({ token });
    res.clearCookie('refreshToken');
  }
  return success(res, { message: 'Logged out' });
}

export async function me(req: AuthRequest, res: Response) {
  if (!req.user) return fail(res, 'Authentication required', 401);
  const user = await User.findById(req.user.id);
  if (!user) return fail(res, 'User not found', 404);
  const userPayload = await buildAuthenticatedUser(user);
  return success(res, { user: userPayload });
}
