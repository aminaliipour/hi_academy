-- Add new fields to courses table
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS teaser_url TEXT,
ADD COLUMN IF NOT EXISTS location VARCHAR(255),
ADD COLUMN IF NOT EXISTS instructor_name VARCHAR(255);

-- Make instructor_id nullable
ALTER TABLE courses 
ALTER COLUMN instructor_id DROP NOT NULL;
