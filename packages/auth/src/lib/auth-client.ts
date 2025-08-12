import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient({
  baseURL: process.env['BETTER_AUTH_URL'] as string,
  fetchOptions: {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env['BETTER_AUTH_TOKEN'] as string}`,
    },
    plugins: [],
  },
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  getAccessToken,
} = authClient;
