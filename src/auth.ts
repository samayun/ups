import { db } from './db';
import { Lucia } from 'lucia';
import { env } from './env.mjs';
import { sessions, users, UserStatus } from './db/schema';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      name: attributes.name,
      image: attributes.image,
      status: attributes.status,
      currentTeamId: attributes.currentTeamId,
    };
  },
});

// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  emailVerified: boolean;
  name: string;
  image: string;
  status: typeof UserStatus;
  currentTeamId: string;
}
