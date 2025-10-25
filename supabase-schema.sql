-- Create the attendees table for "Who's Coming" section
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS attendees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  company TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create an index on created_at for faster ordering
CREATE INDEX IF NOT EXISTS idx_attendees_created_at ON attendees(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Allow public read access" ON attendees
  FOR SELECT
  TO public
  USING (true);

-- Create a policy to allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON attendees
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create a policy to allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON attendees
  FOR UPDATE
  TO authenticated
  USING (true);

-- Example: Insert some sample data
INSERT INTO attendees (name, bio, image_url, company, role) VALUES
  ('Simon Wang', 'Event organizer and tech enthusiast', 'https://example.com/simon.jpg', 'BagelHacks', 'Founder'),
  ('Jane Doe', 'Full-stack developer passionate about AI', 'https://example.com/jane.jpg', 'Tech Corp', 'Senior Developer'),
  ('John Smith', 'Product designer with 5 years experience', 'https://example.com/john.jpg', 'Design Studio', 'Lead Designer');

