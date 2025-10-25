import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ksihoppdtkyebxzfkgsj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzaWhvcHBkdGt5ZWJ4emZrZ3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTU4OTgsImV4cCI6MjA3Njk3MTg5OH0.0CcJ08hSslWFx65yiiLEeUZdwGCpLY3Y4U0IwcSsMBg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

