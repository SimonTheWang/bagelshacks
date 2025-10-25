-- Migration: Create attendees table
-- Created: 2025-10-25

-- Create the attendees table for "Who's Coming" section
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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON attendees;
DROP POLICY IF EXISTS "Allow authenticated insert" ON attendees;
DROP POLICY IF EXISTS "Allow authenticated update" ON attendees;

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

-- Create a policy to allow public insert (for now, adjust as needed for security)
CREATE POLICY "Allow public insert for demo" ON attendees
  FOR INSERT
  TO public
  WITH CHECK (true);

