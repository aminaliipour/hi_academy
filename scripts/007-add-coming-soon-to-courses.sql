-- Add coming_soon field to courses table
ALTER TABLE courses 
ADD COLUMN coming_soon BOOLEAN NOT NULL DEFAULT FALSE;

-- Make instructor_name, price, level, session_count nullable for coming soon courses
ALTER TABLE courses 
ALTER COLUMN instructor_name DROP NOT NULL;

ALTER TABLE courses 
ALTER COLUMN price DROP NOT NULL;

ALTER TABLE courses 
ALTER COLUMN level DROP NOT NULL;

ALTER TABLE courses 
ALTER COLUMN session_count DROP NOT NULL;
