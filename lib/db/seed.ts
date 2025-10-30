import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { db } from './index'
import { users, categories, courses, lessons } from './schema'

async function seed() {
  console.log('🌱 Starting database seeding...')

  // Insert categories
  const [category1, category2, category3] = await db
    .insert(categories)
    .values([
      {
        name: 'نرم‌افزارهای طراحی',
        slug: 'design-software',
        description: 'آموزش نرم‌افزارهای تخصصی طراحی و معماری',
      },
      {
        name: 'معماری',
        slug: 'architecture',
        description: 'دوره‌های تخصصی معماری و طراحی ساختمان',
      },
      {
        name: 'طراحی داخلی',
        slug: 'interior-design',
        description: 'آموزش اصول و تکنیک‌های طراحی داخلی',
      },
    ])
    .returning()

  console.log('✅ Categories created')

  // Insert instructors
  const [instructor1, instructor2, instructor3] = await db
    .insert(users)
    .values([
      {
        email: 'instructor@hiarchitect.ir',
        name: 'دکتر احمد محمدی',
        role: 'instructor',
        bio: 'استاد دانشگاه و متخصص معماری با بیش از ۱۵ سال تجربه',
      },
      {
        email: 'instructor2@hiarchitect.ir',
        name: 'مهندس سارا احمدی',
        role: 'instructor',
        bio: 'معمار و طراح داخلی با تجربه بین‌المللی',
      },
      {
        email: 'instructor3@hiarchitect.ir',
        name: 'مهندس رضا کریمی',
        role: 'instructor',
        bio: 'متخصص طراحی داخلی و دکوراسیون',
      },
    ])
    .returning()

  console.log('✅ Instructors created')

  // Insert courses
  const [course1, course2, course3] = await db
    .insert(courses)
    .values([
      {
        title: 'آموزش جامع Revit برای معماران',
        slug: 'revit-complete-course',
        description:
          'در این دوره جامع، تمامی مباحث مورد نیاز برای کار حرفه‌ای با نرم‌افزار Revit را فراخواهید گرفت',
        thumbnail_url: '/revit-architecture-software.jpg',
        price: 2500000,
        level: 'intermediate',
        duration_minutes: 1200,
        category_id: category1.id,
        instructor_id: instructor1.id,
        published: true,
      },
      {
        title: 'اصول طراحی معماری پایدار',
        slug: 'sustainable-architecture',
        description: 'آشنایی با اصول و تکنیک‌های طراحی معماری پایدار و سبز',
        thumbnail_url: '/sustainable-green-architecture.png',
        price: 1800000,
        level: 'beginner',
        duration_minutes: 800,
        category_id: category2.id,
        instructor_id: instructor2.id,
        published: true,
      },
      {
        title: 'طراحی داخلی مدرن',
        slug: 'modern-interior-design',
        description: 'یادگیری اصول طراحی داخلی مدرن و معاصر',
        thumbnail_url: '/modern-interior.png',
        price: 1500000,
        level: 'beginner',
        duration_minutes: 600,
        category_id: category3.id,
        instructor_id: instructor3.id,
        published: true,
      },
    ])
    .returning()

  console.log('✅ Courses created')

  // Insert lessons for course 1
  await db.insert(lessons).values([
    {
      course_id: course1.id,
      title: 'مقدمه و آشنایی با محیط Revit',
      slug: 'introduction-to-revit',
      description: 'در این جلسه با محیط کاری Revit و ابزارهای اولیه آشنا می‌شوید',
      duration_minutes: 45,
      order_index: 1,
      is_free: true,
    },
    {
      course_id: course1.id,
      title: 'ایجاد اولین پروژه',
      slug: 'first-project',
      description: 'شروع کار با پروژه جدید و تنظیمات اولیه',
      duration_minutes: 60,
      order_index: 2,
      is_free: true,
    },
    {
      course_id: course1.id,
      title: 'مدل‌سازی دیوارها و کف‌ها',
      slug: 'walls-and-floors',
      description: 'آموزش ایجاد و ویرایش دیوارها و کف‌های ساختمان',
      duration_minutes: 75,
      order_index: 3,
      is_free: false,
    },
  ])

  console.log('✅ Lessons created')
  console.log('🎉 Database seeding completed!')
}

seed()
  .catch((error) => {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
