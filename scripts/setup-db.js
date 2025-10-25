import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = 'https://ksihoppdtkyebxzfkgsj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzaWhvcHBkdGt5ZWJ4emZrZ3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTU4OTgsImV4cCI6MjA3Njk3MTg5OH0.0CcJ08hSslWFx65yiiLEeUZdwGCpLY3Y4U0IwcSsMBg';

async function setupDatabase() {
  console.log('🚀 Setting up database...\n');

  // Read migration SQL
  const migrationPath = path.join(__dirname, '../migrations/001_create_attendees_table.sql');
  const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

  console.log('📄 Executing SQL migration...');
  console.log('═══════════════════════════════════════════════════════\n');

  try {
    // Use the Supabase SQL endpoint
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({ query: migrationSQL })
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.log('⚠️  Direct SQL execution not available with anon key.');
      console.log('📝 Please run the migration manually:\n');
      console.log('   1. Open Supabase SQL Editor:');
      console.log('      https://supabase.com/dashboard/project/ksihoppdtkyebxzfkgsj/sql/new\n');
      console.log('   2. Copy and paste this SQL:\n');
      console.log('═══════════════════════════════════════════════════════');
      console.log(migrationSQL);
      console.log('═══════════════════════════════════════════════════════\n');
      console.log('   3. Click "Run" to execute\n');
      console.log('   4. Then run: node scripts/apply-migration.js\n');
    } else {
      console.log('✅ Migration executed successfully!');
    }

  } catch (error) {
    console.error('❌ Error executing migration:', error.message);
    console.log('\n📋 Manual setup required:');
    console.log('   Go to: https://supabase.com/dashboard/project/ksihoppdtkyebxzfkgsj/sql/new');
    console.log('   And run the SQL from: migrations/001_create_attendees_table.sql\n');
  }
}

setupDatabase();

