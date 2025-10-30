import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const courseSlug = formData.get('courseSlug') as string
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!courseSlug) {
      return NextResponse.json({ error: 'Course slug is required' }, { status: 400 })
    }

    // ساخت مسیر پوشه دوره
    const coursePath = path.join(process.cwd(), 'public', 'courses', courseSlug)
    
    // بررسی و ایجاد پوشه در صورت نیاز
    if (!existsSync(coursePath)) {
      await mkdir(coursePath, { recursive: true })
    }

    // تبدیل فایل به buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // ساخت نام فایل با نام اصلی
    const fileName = file.name
    const filePath = path.join(coursePath, fileName)

    // ذخیره فایل
    await writeFile(filePath, buffer)

    // بازگشت URL فایل
    const fileUrl = `/courses/${courseSlug}/${fileName}`

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      message: 'فایل با موفقیت آپلود شد'
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
