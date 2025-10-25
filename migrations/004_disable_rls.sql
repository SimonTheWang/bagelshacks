-- Disable Row Level Security on attendees table
-- This allows public insert/update/delete access

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public read access" ON attendees;
DROP POLICY IF EXISTS "Allow authenticated insert" ON attendees;
DROP POLICY IF EXISTS "Allow authenticated update" ON attendees;
DROP POLICY IF EXISTS "Allow public insert for demo" ON attendees;

-- Disable RLS
ALTER TABLE attendees DISABLE ROW LEVEL SECURITY;

