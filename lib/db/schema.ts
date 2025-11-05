import { pgTable, text, serial, integer, boolean, timestamp, varchar, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Enums
export const userRoleEnum = pgEnum('user_role', ['student', 'instructor', 'admin'])
export const courseLevelEnum = pgEnum('course_level', ['beginner', 'intermediate', 'advanced'])

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }),
  role: userRoleEnum('role').notNull().default('student'),
  avatar_url: text('avatar_url'),
  bio: text('bio'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
})

// Categories table
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  created_at: timestamp('created_at').notNull().defaultNow(),
})

// Courses table
export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  thumbnail_url: text('thumbnail_url'),
  teaser_url: text('teaser_url'), // تیزر دوره
  location: varchar('location', { length: 255 }), // محل برگزاری
  instructor_name: varchar('instructor_name', { length: 255 }), // نام مدرس
  price: integer('price').default(0),
  level: courseLevelEnum('level').default('beginner'),
  session_count: integer('session_count').default(0), // تعداد جلسات
  coming_soon: boolean('coming_soon').notNull().default(false), // دوره به زودی راه‌اندازی می‌شود
  what_you_learn: text('what_you_learn'), // چه چیزی یاد خواهید گرفت (JSON array)
  prerequisites: text('prerequisites'), // پیش‌نیازها (JSON array)
  category_id: integer('category_id').references(() => categories.id),
  instructor_id: integer('instructor_id').references(() => users.id),
  published: boolean('published').notNull().default(false),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
})

// Lessons table
export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  course_id: integer('course_id').references(() => courses.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  description: text('description'),
  video_url: text('video_url'),
  duration_minutes: integer('duration_minutes').notNull().default(0),
  order_index: integer('order_index').notNull().default(0),
  is_free: boolean('is_free').notNull().default(false),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
})

// Enrollments table
export const enrollments = pgTable('enrollments', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id).notNull(),
  course_id: integer('course_id').references(() => courses.id).notNull(),
  progress: integer('progress').notNull().default(0),
  completed: boolean('completed').notNull().default(false),
  enrolled_at: timestamp('enrolled_at').notNull().defaultNow(),
})

// Course Registrations table (for guest enrollments)
export const courseRegistrations = pgTable('course_registrations', {
  id: serial('id').primaryKey(),
  course_id: integer('course_id').references(() => courses.id).notNull(),
  full_name: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  message: text('message'), // پیام یا توضیحات اضافی
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, contacted, enrolled, rejected
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
})

// Lesson Progress table
export const lessonProgress = pgTable('lesson_progress', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id).notNull(),
  lesson_id: integer('lesson_id').references(() => lessons.id).notNull(),
  completed: boolean('completed').notNull().default(false),
  completed_at: timestamp('completed_at'),
})

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  courses: many(courses),
  enrollments: many(enrollments),
  lessonProgress: many(lessonProgress),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  courses: many(courses),
}))

export const coursesRelations = relations(courses, ({ one, many }) => ({
  category: one(categories, {
    fields: [courses.category_id],
    references: [categories.id],
  }),
  instructor: one(users, {
    fields: [courses.instructor_id],
    references: [users.id],
  }),
  lessons: many(lessons),
  enrollments: many(enrollments),
}))

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessons.course_id],
    references: [courses.id],
  }),
  progress: many(lessonProgress),
}))

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.user_id],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.course_id],
    references: [courses.id],
  }),
}))

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  user: one(users, {
    fields: [lessonProgress.user_id],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [lessonProgress.lesson_id],
    references: [lessons.id],
  }),
}))
