import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { lessons } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const { lessonId } = await params
    const id = parseInt(lessonId)

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid lesson ID' }, { status: 400 })
    }

    const [lesson] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, id))
      .limit(1)

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
    }

    return NextResponse.json(lesson)
  } catch (error) {
    console.error('Error fetching lesson:', error)
    return NextResponse.json({ error: 'Failed to fetch lesson' }, { status: 500 })
  }
}
