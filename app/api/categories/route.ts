import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { categories, courses } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const result = await db.select().from(categories)

    // Get course count for each category
    const categoriesWithCount = await Promise.all(
      result.map(async (category) => {
        const courseCount = await db
          .select({ count: courses.id })
          .from(courses)
          .where(eq(courses.category_id, category.id))

        return {
          ...category,
          course_count: courseCount.length,
        }
      })
    )

    return NextResponse.json(categoriesWithCount)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
