import 'dotenv/config';

// import { sql } from 'drizzle-orm';
// import { migrate } from 'drizzle-orm/node-postgres/migrator';

import { db, pool } from './index';

async function main() {
  // This will run migrations on the database, skipping the ones already applied
  // await migrate(db, { migrationsFolder: 'src/db/migrations' });
  console.log('✅    MIGRATION COMPLETED\n');

  // Don't forget to close the connection, otherwise the script will hang
  console.log('🌱    Closing DB connection...\n');
  await pool.end();
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('👋    Closing process...\n');
    process.exit(0);
  });
