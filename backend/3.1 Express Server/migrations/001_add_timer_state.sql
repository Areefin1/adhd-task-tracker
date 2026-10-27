BEGIN;

-- Create the timer state enum
CREATE TYPE timer_state_type AS ENUM (
    'Not Active',
    'Running',
    'Paused',
    'Completed'
);

-- Add the timer_state column
ALTER TABLE tasks
ADD COLUMN timer_state timer_state_type;

-- Preserve existing task statuses
UPDATE tasks
SET timer_state = 'Not Active'
WHERE status = 'Not Started';

UPDATE tasks
SET timer_state = 'Paused'
WHERE status = 'In Progress';

UPDATE tasks
SET timer_state = 'Completed'
WHERE status = 'Completed';

-- Set default state for newly created tasks
ALTER TABLE tasks
ALTER COLUMN timer_state SET DEFAULT 'Not Active';

COMMIT;