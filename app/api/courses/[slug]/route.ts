import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { courses, categories, users, lessons } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    const result = await db
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
          avatar_url: users.avatar_url,
          bio: users.bio,
        },
      })
      .from(courses)
      .leftJoin(categories, eq(courses.category_id, categories.id))
      .leftJoin(users, eq(courses.instructor_id, users.id))
      .where(eq(courses.slug, slug))
      .limit(1)

    if (result.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const course = result[0]

    // Get lessons
    const courseLessons = await db
      .select()
      .from(lessons)
      .where(eq(lessons.course_id, course.id))
      .orderBy(lessons.order_index)

    return NextResponse.json({
      ...course,
      lessons: courseLessons,
      lesson_count: courseLessons.length,
    })
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 })
  }
}
