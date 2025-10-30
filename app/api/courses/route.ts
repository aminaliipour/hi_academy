import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { courses, categories, users, lessons } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const level = searchParams.get('level')
    
    let query = db
      .select({
        id: courses.id,
        title: courses.title,
        slug: courses.slug,
        description: courses.description,
        thumbnail_url: courses.thumbnail_url,
        price: courses.price,
        level: courses.level,
        duration_minutes: courses.duration_minutes,
        published: courses.published,
        created_at: courses.created_at,
        updated_at: courses.updated_at,
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
        },
        instructor: {
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
        },
      })
      .from(courses)
      .leftJoin(categories, eq(courses.category_id, categories.id))
      .leftJoin(users, eq(courses.instructor_id, users.id))
      .where(eq(courses.published, true))
      .orderBy(desc(courses.created_at))

    const result = await query

    // Add lesson count for each course
    const coursesWithLessons = await Promise.all(
      result.map(async (course) => {
        const lessonCount = await db
          .select({ count: lessons.id })
          .from(lessons)
          .where(eq(lessons.course_id, course.id))

        return {
          ...course,
          lesson_count: lessonCount.length,
        }
      })
    )

    return NextResponse.json(coursesWithLessons)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}
