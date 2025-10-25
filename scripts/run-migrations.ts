import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const supabaseUrl = 'https://ksihoppdtkyebxzfkgsj.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzaWhvcHBkdGt5ZWJ4emZrZ3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTU4OTgsImV4cCI6MjA3Njk3MTg5OH0.0CcJ08hSslWFx65yiiLEeUZdwGCpLY3Y4U0IwcSsMBg'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runMigrations() {
  console.log('🚀 Starting migrations...\n')

  try {
    // Read the migration file
    const migrationPath = join(__dirname, '../migrations/001_create_attendees_table.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf-8')

    console.log('📄 Running migration: 001_create_attendees_table.sql')
    
    // Execute the migration
    const { error } = await supabase.rpc('exec_sql', { sql: migrationSQL })

    if (error) {
      console.error('❌ Migration failed:', error)
      process.exit(1)
    }

    console.log('✅ Migration completed successfully!')
    
    // Insert some sample data
    console.log('\n📝 Inserting sample data...')
    const { error: insertError } = await supabase
      .from('attendees')
      .insert([
        {
          name: 'Simon Wang',
          bio: 'Event organizer and tech enthusiast building the future of hackathons',
          image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
          company: 'BagelHacks',
          role: 'Founder'
        },
        {
          name: 'Alex Chen',
          bio: 'Full-stack developer passionate about AI and machine learning',
          image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop',
          company: 'Tech Innovations',
          role: 'Senior Developer'
        },
        {
          name: 'Sarah Martinez',
          bio: 'Product designer with a focus on user experience and accessibility',
          image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
          company: 'Design Studio',
          role: 'Lead Designer'
        },
        {
          name: 'Marcus Johnson',
          bio: 'DevOps engineer optimizing infrastructure at scale',
          image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
          company: 'Cloud Systems',
          role: 'DevOps Lead'
        }
      ])

    if (insertError) {
      console.log('⚠️  Sample data insertion failed (table might already have data):', insertError.message)
    } else {
      console.log('✅ Sample data inserted successfully!')
    }

    console.log('\n🎉 All migrations completed!')

  } catch (err) {
    console.error('❌ Error running migrations:', err)
    process.exit(1)
  }
}

runMigrations()

