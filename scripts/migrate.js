import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase connection string format:
// postgres://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
const connectionString = 'postgresql://postgres.ksihoppdtkyebxzfkgsj:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

async function runMigration() {
  console.log('🚀 Starting database migration...\n');

  // Read the migration file
  const migrationPath = path.join(__dirname, '../migrations/001_create_attendees_table.sql');
  const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

  // For demo purposes, since we don't have the password, let's use the REST API approach
  console.log('📄 Migration SQL prepared from: migrations/001_create_attendees_table.sql\n');
  
  console.log('⚠️  Note: Direct database connection requires the database password.');
  console.log('📝 To run this migration, you have two options:\n');
  
  console.log('Option 1 - Using Supabase SQL Editor (Recommended):');
  console.log('   1. Go to: https://supabase.com/dashboard/project/ksihoppdtkyebxzfkgsj/sql/new');
  console.log('   2. Copy and paste the SQL from: migrations/001_create_attendees_table.sql');
  console.log('   3. Click "Run"\n');
  
  console.log('Option 2 - Using this script with database credentials:');
  console.log('   1. Get your database password from Supabase Dashboard > Settings > Database');
  console.log('   2. Update the connection string in scripts/migrate.js');
  console.log('   3. Run: node scripts/migrate.js\n');
  
  console.log('═══════════════════════════════════════════════════════');
  console.log('SQL TO RUN:');
  console.log('═══════════════════════════════════════════════════════\n');
  console.log(migrationSQL);
  console.log('\n═══════════════════════════════════════════════════════\n');
  
  // If password is provided, try to connect
  if (!connectionString.includes('[YOUR-PASSWORD]')) {
    try {
      const client = new Client({ connectionString });
      await client.connect();
      console.log('✅ Connected to database!\n');
      
      console.log('📄 Executing migration...');
      await client.query(migrationSQL);
      console.log('✅ Migration completed successfully!\n');
      
      await client.end();
      
      console.log('🎉 Now run: node scripts/apply-migration.js\n');
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  }
}

runMigration();

