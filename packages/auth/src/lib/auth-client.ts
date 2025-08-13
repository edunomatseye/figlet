import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient({
  baseURL: process.env['BETTER_AUTH_URL'] as string,
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  getAccessToken,
} = authClient;
