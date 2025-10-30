import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { courseRegistrations, courses } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

// Get all registrations
export async function GET(request: NextRequest) {
  try {
    const registrations = await db
      .select({
        id: courseRegistrations.id,
        course_id: courseRegistrations.course_id,
        full_name: courseRegistrations.full_name,
        email: courseRegistrations.email,
        phone: courseRegistrations.phone,
        message: courseRegistrations.message,
        status: courseRegistrations.status,
        created_at: courseRegistrations.created_at,
        course: {
          title: courses.title,
          slug: courses.slug,
        },
      })
      .from(courseRegistrations)
      .leftJoin(courses, eq(courseRegistrations.course_id, courses.id))
      .orderBy(desc(courseRegistrations.created_at))

    return NextResponse.json(registrations)
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    )
  }
}

// Create new registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.course_id || !body.full_name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const [newRegistration] = await db
      .insert(courseRegistrations)
      .values({
        course_id: body.course_id,
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        message: body.message || null,
        status: 'pending',
      })
      .returning()

    return NextResponse.json(newRegistration, { status: 201 })
  } catch (error) {
    console.error('Error creating registration:', error)
    return NextResponse.json(
      { error: 'Failed to create registration' },
      { status: 500 }
    )
  }
}

// Update registration status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const [updatedRegistration] = await db
      .update(courseRegistrations)
      .set({
        status,
        updated_at: new Date(),
      })
      .where(eq(courseRegistrations.id, id))
      .returning()

    if (!updatedRegistration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedRegistration)
  } catch (error) {
    console.error('Error updating registration:', error)
    return NextResponse.json(
      { error: 'Failed to update registration' },
      { status: 500 }
    )
  }
}
