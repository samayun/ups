import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const banks = pgTable('banks', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  address: varchar('address', { length: 255 }),
  phone: varchar('phone', { length: 255 }),
  email: varchar('email', { length: 255 }),
  website: varchar('website', { length: 255 }),
  logo: varchar('logo', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
