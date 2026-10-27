BEGIN;

ALTER TABLE tasks
ADD COLUMN accumulated_time BIGINT NOT NULL DEFAULT 0;

ALTER TABLE tasks
ADD COLUMN started_at TIMESTAMPTZ;

UPDATE tasks
SET timer_state = 'Paused'
WHERE timer_state = 'Running';

COMMIT;