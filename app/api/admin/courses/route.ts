import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { courses, lessons } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'

// Create new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const [newCourse] = await db
      .insert(courses)
      .values({
        title: body.title,
        slug: body.slug,
        description: body.description,
        thumbnail_url: body.thumbnail_url,
        teaser_url: body.teaser_url,
        location: body.location,
        instructor_name: body.instructor_name,
        price: body.price || 0,
        level: body.level || 'beginner',
        session_count: body.session_count || 0,
        what_you_learn: body.what_you_learn,
        prerequisites: body.prerequisites,
        category_id: body.category_id,
        published: body.published || false,
      })
      .returning()

    // ایجاد پوشه برای دوره
    const coursePath = path.join(process.cwd(), 'public', 'courses', newCourse.slug)
    if (!existsSync(coursePath)) {
      await mkdir(coursePath, { recursive: true })
    }

    // Revalidate pages that show courses
    revalidatePath('/')
    revalidatePath('/courses')
    revalidatePath('/admin/courses')

    return NextResponse.json(newCourse, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
  }
}

// Update course
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const [updatedCourse] = await db
      .update(courses)
      .set({
        ...updateData,
        updated_at: new Date(),
      })
      .where(eq(courses.id, id))
      .returning()

    if (!updatedCourse) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Revalidate pages that show courses
    revalidatePath('/')
    revalidatePath('/courses')
    revalidatePath('/admin/courses')

    return NextResponse.json(updatedCourse)
  } catch (error) {
    console.error('Error updating course:', error)
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

// Delete course
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 })
    }

    const courseId = parseInt(id)

    // اول همه درس‌های دوره رو حذف می‌کنیم
    await db.delete(lessons).where(eq(lessons.course_id, courseId))

    // بعد دوره رو حذف می‌کنیم
    await db.delete(courses).where(eq(courses.id, courseId))

    // Revalidate pages that show courses
    revalidatePath('/')
    revalidatePath('/courses')
    revalidatePath('/admin/courses')

    return NextResponse.json({ message: 'Course deleted successfully' })
  } catch (error) {
    console.error('Error deleting course:', error)
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}
