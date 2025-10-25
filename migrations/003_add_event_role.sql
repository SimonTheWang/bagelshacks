-- Add event_role field to attendees table
-- Created: 2025-10-25

ALTER TABLE attendees 
ADD COLUMN IF NOT EXISTS event_role TEXT CHECK (event_role IN ('speaker', 'hacker', 'organizer', 'guest'));

-- Add index for faster filtering
CREATE INDEX IF NOT EXISTS idx_attendees_event_role ON attendees(event_role);

