import { betterAuth } from 'better-auth';
import {
  bearer,
} from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

const baseURL = process.env.BASE_URL;
const secret = process.env.BETTER_AUTH_SECRET;

if (!baseURL) {
  throw new Error('BASE_URL is not set');
}

if (!secret) {
  throw new Error('SECRET is not set');
}

export const auth = betterAuth({
  appName: 'Your App Name',
  baseURL,
  emailAndPassword: {
    enabled: true,
  },
  basePath: '/auth',
  trustedOrigins: allowedOrigins,
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    defaultCookieAttributes: {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      partitioned: true,
    },
    trustedOrigins: allowedOrigins,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // expires in 7 days
    },
  },
  plugins: [
    bearer(),
  ],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
});
