import jwt from 'jsonwebtoken';
import { config } from '../config';

export function signAccessToken(userId: string, role: string) {
  return jwt.sign({ role }, config.jwtAccessSecret, { subject: userId, expiresIn: config.accessTokenExpiresIn });
}

export function signRefreshToken(userId: string) {
  return jwt.sign({}, config.jwtRefreshSecret, { subject: userId, expiresIn: config.refreshTokenExpiresIn });
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, config.jwtRefreshSecret) as { sub: string };
}
