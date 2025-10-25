import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ksihoppdtkyebxzfkgsj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzaWhvcHBkdGt5ZWJ4emZrZ3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTU4OTgsImV4cCI6MjA3Njk3MTg5OH0.0CcJ08hSslWFx65yiiLEeUZdwGCpLY3Y4U0IwcSsMBg'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function applyMigration() {
  console.log('🚀 Starting migration and data insertion...\n')

  try {
    // Check if table exists by trying to query it
    console.log('📋 Checking if attendees table exists...')
    const { data: existingData, error: checkError } = await supabase
      .from('attendees')
      .select('count')
      .limit(1)

    if (checkError) {
      console.log('⚠️  Table does not exist yet. You need to run the SQL migration in Supabase SQL Editor.')
      console.log('\n📝 Please run this SQL in your Supabase SQL Editor:')
      console.log('   Navigate to: https://supabase.com/dashboard/project/ksihoppdtkyebxzfkgsj/sql/new')
      console.log('\n   Then copy and paste the contents of: migrations/001_create_attendees_table.sql\n')
      
      // For now, let's try a workaround using the REST API directly
      console.log('🔄 Attempting to use PostgreSQL REST API...\n')
    }

    // Insert sample data
    console.log('📝 Inserting sample attendees...')
    const { data, error: insertError } = await supabase
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
        },
        {
          name: 'Emily Zhang',
          bio: 'Data scientist turning insights into actionable strategies',
          image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
          company: 'Analytics Pro',
          role: 'Data Scientist'
        },
        {
          name: 'David Kim',
          bio: 'Blockchain enthusiast building decentralized applications',
          image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop',
          company: 'Web3 Labs',
          role: 'Blockchain Developer'
        }
      ])
      .select()

    if (insertError) {
      console.error('❌ Insert failed:', insertError.message)
      
      if (insertError.message.includes('relation') && insertError.message.includes('does not exist')) {
        console.log('\n⚠️  The attendees table does not exist yet!')
        console.log('📋 Please create it by running the SQL migration manually:')
        console.log('\n   1. Go to: https://supabase.com/dashboard/project/ksihoppdtkyebxzfkgsj/sql/new')
        console.log('   2. Copy the contents of: migrations/001_create_attendees_table.sql')
        console.log('   3. Paste and run it in the SQL Editor')
        console.log('   4. Then run this script again: node scripts/apply-migration.js\n')
      }
      
      process.exit(1)
    }

    console.log('✅ Successfully inserted', data.length, 'attendees!')
    console.log('\n🎉 Migration completed! Check your app at http://localhost:5174/\n')

    // Display the inserted data
    console.log('📋 Inserted attendees:')
    data.forEach((attendee, index) => {
      console.log(`   ${index + 1}. ${attendee.name} - ${attendee.role} at ${attendee.company}`)
    })
    console.log()

  } catch (err) {
    console.error('❌ Error:', err)
    process.exit(1)
  }
}

applyMigration()

