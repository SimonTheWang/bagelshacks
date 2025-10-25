#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   BagelHacks - Database Migration Helper${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════${NC}\n"

# Read the migration SQL
SQL_FILE="../migrations/001_create_attendees_table.sql"

if [ -f "$SQL_FILE" ]; then
  # Copy SQL to clipboard
  cat "$SQL_FILE" | pbcopy
  
  echo -e "${GREEN}✅ SQL copied to clipboard!${NC}\n"
  echo -e "${YELLOW}📋 Next steps:${NC}"
  echo -e "   1. Opening Supabase SQL Editor in your browser..."
  echo -e "   2. Paste the SQL (Cmd+V)"
  echo -e "   3. Click 'Run' or press Cmd+Enter"
  echo -e "   4. Run: ${BLUE}node scripts/apply-migration.js${NC}\n"
  
  # Open the SQL editor
  open "https://supabase.com/dashboard/project/ksihoppdtkyebxzfkgsj/sql/new"
  
  echo -e "${GREEN}🚀 Browser opened!${NC}\n"
else
  echo -e "${YELLOW}⚠️  Migration file not found!${NC}"
fi

