BEGIN;

ALTER TABLE tasks
ADD COLUMN paused_at TIMESTAMPTZ;

ALTER TABLE tasks
ADD COLUMN session_baseline BIGINT NOT NULL DEFAULT 0;

UPDATE tasks
SET session_baseline = accumulated_time;

COMMIT;