import * as dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const main = async () => {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });
  const client = await pool.connect();
  console.log('🌱 CLEANING STARTED\n');

  try {
    await client.query('BEGIN');
    const res = await client.query(`
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public';
    `);
    for (const row of res.rows) {
      await client.query(`DROP TABLE IF EXISTS "${row.tablename}" CASCADE;`);
    }

    await client.query('COMMIT');
    console.log('🦧 খতম => drop successful.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error clearing database:', error);
  } finally {
    client.release();
  }
};

main().finally(() => process.exit(0));
