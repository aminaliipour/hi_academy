-- Add what_you_learn and prerequisites columns to courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS what_you_learn TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS prerequisites TEXT;

-- Add comments for documentation
COMMENT ON COLUMN courses.what_you_learn IS 'چه چیزی یاد خواهید گرفت - JSON array of learning outcomes';
COMMENT ON COLUMN courses.prerequisites IS 'پیش‌نیازها - JSON array of prerequisites';
