-- تغییر نام ستون duration_minutes به session_count
ALTER TABLE courses 
RENAME COLUMN duration_minutes TO session_count;

-- اضافه کردن کامنت توضیحی
COMMENT ON COLUMN courses.session_count IS 'تعداد جلسات دوره';
