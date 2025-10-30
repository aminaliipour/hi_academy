-- Seed data for Hi Academy

-- Insert sample categories
INSERT INTO categories (name, slug, description, icon) VALUES
  ('معماری', 'architecture', 'دوره‌های آموزشی معماری و طراحی ساختمان', 'Building'),
  ('طراحی داخلی', 'interior-design', 'دوره‌های طراحی داخلی و دکوراسیون', 'Home'),
  ('نرم‌افزارهای طراحی', 'design-software', 'آموزش نرم‌افزارهای تخصصی معماری', 'Monitor'),
  ('مدیریت پروژه', 'project-management', 'مدیریت و اجرای پروژه‌های ساختمانی', 'Briefcase')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample admin user
INSERT INTO users (email, name, role) VALUES
  ('admin@hiarchitect.ir', 'مدیر سیستم', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample instructor
INSERT INTO users (email, name, role) VALUES
  ('instructor@hiarchitect.ir', 'استاد نمونه', 'instructor')
ON CONFLICT (email) DO NOTHING;

-- Insert sample courses
INSERT INTO courses (
  title, 
  slug, 
  description, 
  thumbnail_url,
  instructor_id,
  category_id,
  price,
  level,
  duration_minutes,
  published
)
SELECT 
  'آموزش جامع Revit برای معماران',
  'revit-complete-course',
  'در این دوره جامع، تمامی مباحث مورد نیاز برای کار حرفه‌ای با نرم‌افزار Revit را فراخواهید گرفت. از مبانی اولیه تا تکنیک‌های پیشرفته مدل‌سازی و رندرینگ.',
  '/placeholder.svg?height=400&width=600',
  (SELECT id FROM users WHERE email = 'instructor@hiarchitect.ir' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'design-software' LIMIT 1),
  2500000,
  'intermediate',
  1200,
  true
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'revit-complete-course');

INSERT INTO courses (
  title, 
  slug, 
  description, 
  thumbnail_url,
  instructor_id,
  category_id,
  price,
  level,
  duration_minutes,
  published
)
SELECT 
  'اصول طراحی معماری پایدار',
  'sustainable-architecture',
  'آشنایی با اصول و تکنیک‌های طراحی معماری پایدار و سبز. این دوره شامل مطالعات موردی و پروژه‌های عملی است.',
  '/placeholder.svg?height=400&width=600',
  (SELECT id FROM users WHERE email = 'instructor@hiarchitect.ir' LIMIT 1),
  (SELECT id FROM categories WHERE slug = 'architecture' LIMIT 1),
  1800000,
  'beginner',
  800,
  true
WHERE NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'sustainable-architecture');

-- Insert sample lessons for first course
INSERT INTO lessons (course_id, title, slug, description, video_url, duration_minutes, order_index, published)
SELECT 
  (SELECT id FROM courses WHERE slug = 'revit-complete-course' LIMIT 1),
  'مقدمه و آشنایی با محیط Revit',
  'introduction-to-revit',
  'در این جلسه با محیط کاری Revit و ابزارهای اولیه آشنا می‌شوید',
  'https://example.com/videos/lesson1.mp4',
  45,
  1,
  true
WHERE EXISTS (SELECT 1 FROM courses WHERE slug = 'revit-complete-course');

INSERT INTO lessons (course_id, title, slug, description, video_url, duration_minutes, order_index, published)
SELECT 
  (SELECT id FROM courses WHERE slug = 'revit-complete-course' LIMIT 1),
  'ایجاد اولین پروژه',
  'first-project',
  'شروع کار با پروژه جدید و تنظیمات اولیه',
  'https://example.com/videos/lesson2.mp4',
  60,
  2,
  true
WHERE EXISTS (SELECT 1 FROM courses WHERE slug = 'revit-complete-course');

INSERT INTO lessons (course_id, title, slug, description, video_url, duration_minutes, order_index, published)
SELECT 
  (SELECT id FROM courses WHERE slug = 'revit-complete-course' LIMIT 1),
  'مدل‌سازی دیوارها و کف‌ها',
  'walls-and-floors',
  'آموزش ایجاد و ویرایش دیوارها و کف‌های ساختمان',
  'https://example.com/videos/lesson3.mp4',
  75,
  3,
  true
WHERE EXISTS (SELECT 1 FROM courses WHERE slug = 'revit-complete-course');
