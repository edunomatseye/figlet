import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../../generated/prisma/client.ts';

// If your Prisma file is located elsewhere, you can change the path
const adapter = new PrismaBetterSQLite3({
  url: process.env['DATABASE_URL'] as string,
});

const prisma = new PrismaClient({ adapter });
export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite', // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env['GITHUB_CLIENT_ID'] as string,
      clientSecret: process.env['GITHUB_CLIENT_SECRET'] as string,
    },
  },
});
