import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }),
  email: varchar('email', { length: 255 }),
  password: varchar('password', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
