import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { lessons } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// Create new lesson
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const [newLesson] = await db
      .insert(lessons)
      .values({
        course_id: body.course_id,
        title: body.title,
        slug: body.slug,
        description: body.description,
        video_url: body.video_url,
        duration_minutes: body.duration_minutes || 0,
        order_index: body.order_index || 0,
        is_free: body.is_free || false,
      })
      .returning()

    return NextResponse.json(newLesson, { status: 201 })
  } catch (error) {
    console.error('Error creating lesson:', error)
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 })
  }
}

// Update lesson
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 })
    }

    const [updatedLesson] = await db
      .update(lessons)
      .set({
        ...updateData,
        updated_at: new Date(),
      })
      .where(eq(lessons.id, id))
      .returning()

    if (!updatedLesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    return NextResponse.json(updatedLesson)
  } catch (error) {
    console.error('Error updating lesson:', error)
    return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 })
  }
}

// Delete lesson
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 })
    }

    await db.delete(lessons).where(eq(lessons.id, parseInt(id)))

    return NextResponse.json({ message: 'Lesson deleted successfully' })
  } catch (error) {
    console.error('Error deleting lesson:', error)
    return NextResponse.json({ error: 'Failed to delete lesson' }, { status: 500 })
  }
}
