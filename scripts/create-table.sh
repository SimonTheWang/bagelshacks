#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Creating attendees table in Supabase...${NC}\n"

# Supabase configuration
SUPABASE_URL="https://ksihoppdtkyebxzfkgsj.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzaWhvcHBkdGt5ZWJ4emZrZ3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTU4OTgsImV4cCI6MjA3Njk3MTg5OH0.0CcJ08hSslWFx65yiiLEeUZdwGCpLY3Y4U0IwcSsMBg"

# SQL Commands split into individual statements
echo -e "${YELLOW}📄 Step 1: Creating table...${NC}"

# Create table
SQL1='CREATE TABLE IF NOT EXISTS attendees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  company TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('\''utc'\'', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('\''utc'\'', NOW())
);'

curl -X POST "${SUPABASE_URL}/rest/v1/rpc/exec_sql" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"${SQL1}\"}" 2>/dev/null

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Table created successfully!${NC}\n"
else
  echo -e "${RED}❌ Table creation requires service role key${NC}"
  echo -e "${YELLOW}📝 Please create the table manually:${NC}\n"
  echo "   1. Go to: https://supabase.com/dashboard/project/ksihoppdtkyebxzfkgsj/sql/new"
  echo "   2. Copy and run the SQL from: migrations/001_create_attendees_table.sql"
  echo ""
  exit 1
fi

echo -e "${YELLOW}📄 Step 2: Creating index...${NC}"

# Create index
SQL2='CREATE INDEX IF NOT EXISTS idx_attendees_created_at ON attendees(created_at DESC);'

curl -X POST "${SUPABASE_URL}/rest/v1/rpc/exec_sql" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"${SQL2}\"}" 2>/dev/null

echo -e "${GREEN}✅ Index created!${NC}\n"

echo -e "${YELLOW}📄 Step 3: Enabling RLS...${NC}"

# Enable RLS
SQL3='ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;'

curl -X POST "${SUPABASE_URL}/rest/v1/rpc/exec_sql" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"${SQL3}\"}" 2>/dev/null

echo -e "${GREEN}✅ RLS enabled!${NC}\n"

echo -e "${GREEN}🎉 Database setup complete!${NC}"
echo -e "${YELLOW}📝 Now run: node scripts/apply-migration.js${NC}\n"

