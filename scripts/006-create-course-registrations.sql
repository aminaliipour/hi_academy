-- Create course_registrations table for guest enrollments
CREATE TABLE IF NOT EXISTS course_registrations (
  id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_course_registrations_course_id ON course_registrations(course_id);
CREATE INDEX IF NOT EXISTS idx_course_registrations_status ON course_registrations(status);
CREATE INDEX IF NOT EXISTS idx_course_registrations_created_at ON course_registrations(created_at DESC);

-- Add comments for documentation
COMMENT ON TABLE course_registrations IS 'ثبت‌نام مهمان‌ها در دوره‌ها';
COMMENT ON COLUMN course_registrations.full_name IS 'نام کامل کاربر';
COMMENT ON COLUMN course_registrations.email IS 'ایمیل کاربر';
COMMENT ON COLUMN course_registrations.phone IS 'شماره تماس کاربر';
COMMENT ON COLUMN course_registrations.message IS 'پیام یا توضیحات اضافی';
COMMENT ON COLUMN course_registrations.status IS 'وضعیت: pending, contacted, enrolled, rejected';
