import NextAuth, { type DefaultSession } from 'next-auth';

export type SessionUser = {
  id: string;
  currentTeamId: string | null;
  role: 'Admin' | 'User';
} & DefaultSession['user'];
declare module '@auth/core/types' {
  interface Session {
    error?: 'RefreshAccessTokenError';
    user: SessionUser;
  }
}
