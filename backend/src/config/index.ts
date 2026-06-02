import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const parseOrigins = (value: string | undefined) => {
  const raw = value?.trim() ?? 'http://localhost:5173';
  const origins = raw.split(',').map((origin) => origin.trim()).filter(Boolean);
  return origins.length <= 1 ? origins[0] : origins;
};

export const config = {
  port: Number(process.env.PORT ?? 4000),
  mongodbUri: process.env.MONGODB_URI ?? '',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? 'access_secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'refresh_secret',
  accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',
  cookieDomain: process.env.COOKIE_DOMAIN ?? 'localhost',
  cookieSecure: process.env.COOKIE_SECURE === 'true',
  corsOrigin: parseOrigins(process.env.CORS_ORIGIN)
};
