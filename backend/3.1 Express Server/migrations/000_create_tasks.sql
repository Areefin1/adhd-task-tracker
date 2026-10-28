BEGIN;

CREATE TYPE status_type AS ENUM (
    'Not Started',
    'In Progress',
    'Completed'
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(50) NOT NULL,
    description TEXT,
    status status_type DEFAULT 'Not Started',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMIT;