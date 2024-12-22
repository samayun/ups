import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { createTableSchemas } from './seeds/create-tables';
import { drizzle } from 'drizzle-orm/node-postgres';
dotenv.config();

const main = async () => {
  const client = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });
  const db = drizzle(client);
  console.log('🌱 SEEDING STARTED\n');

  try {
    await createTableSchemas(db);
  } catch (error) {
    console.log('❌ Seeding Failed');
    console.log(error);
  }

  console.log('✅ SEEDING COMPLETED\n');
};

main().finally(() => process.exit(0));
