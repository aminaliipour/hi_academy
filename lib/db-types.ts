// Database types for Hi Academy
export type UserRole = "student" | "instructor" | "admin"
export type CourseLevel = "beginner" | "intermediate" | "advanced"

export interface User {
  id: number
  email: string
  name: string
  role: UserRole
  avatar_url?: string | null
  bio?: string | null
  created_at: Date
  updated_at: Date
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string | null
  created_at: Date
}

export interface Course {
  id: number
  title: string
  slug: string
  description?: string | null
  thumbnail_url?: string | null
  teaser_url?: string | null
  location?: string | null
  instructor_name?: string | null
  price: number
  level: CourseLevel
  session_count: number
  published: boolean
  created_at: Date
  updated_at: Date
}

export interface Lesson {
  id: number
  course_id: number
  title: string
  slug: string
  description?: string | null
  video_url?: string | null
  duration_minutes: number
  order_index: number
  is_free: boolean
  created_at: Date
  updated_at: Date
}

export interface CourseWithDetails extends Course {
  category?: Category | null
  lesson_count?: number
}

export interface CourseDetailWithLessons extends CourseWithDetails {
  lessons: Lesson[]
}
