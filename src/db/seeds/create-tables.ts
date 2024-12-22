import { sql } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export const createTableSchemas = async (
  db: NodePgDatabase<Record<string, never>>
) => {
  await db.execute(
    sql`CREATE TABLE IF NOT EXISTS accounts (id SERIAL PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255))`
  );
  console.log('🚀 Account Table successfully created');
  await db.execute(
    sql`CREATE TABLE IF NOT EXISTS banks (id SERIAL PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), phone VARCHAR(255), email VARCHAR(255), website VARCHAR(255), logo VARCHAR(255))`
  );
  console.log('🚀 Bank Table successfully created');
  await db.execute(
    sql`CREATE TABLE IF NOT EXISTS branches (id SERIAL PRIMARY KEY, name VARCHAR(255), address VARCHAR(255), phone VARCHAR(255), email VARCHAR(255), website VARCHAR(255), logo VARCHAR(255))`
  );
  console.log('🚀 Branch Table successfully created');
  console.log('🚀 All tables created successfully');
};
