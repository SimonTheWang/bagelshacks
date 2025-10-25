-- Add "helper" and "founder" to event_role constraint
-- Created: 2025-10-25

-- Drop the existing constraint
ALTER TABLE attendees 
DROP CONSTRAINT IF EXISTS attendees_event_role_check;

-- Add new constraint with "helper" and "founder" included
ALTER TABLE attendees 
ADD CONSTRAINT attendees_event_role_check 
CHECK (event_role IN ('speaker', 'hacker', 'organizer', 'guest', 'helper', 'founder'));

