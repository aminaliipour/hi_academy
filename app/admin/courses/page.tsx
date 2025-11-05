import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { db } from "@/lib/db"
import { courses, categories, users, lessons } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { DeleteCourseButton } from "@/components/admin/delete-course-button"

async function getAllCourses() {
  const result = await db
    .select({
      id: courses.id,
      title: courses.title,
      slug: courses.slug,
      thumbnail_url: courses.thumbnail_url,
      price: courses.price,
      level: courses.level,
      published: courses.published,
      coming_soon: courses.coming_soon,
      instructor_name: courses.instructor_name,
      category: {
        name: categories.name,
      },
      instructor: {
        name: users.name,
      },
    })
    .from(courses)
    .leftJoin(categories, eq(courses.category_id, categories.id))
    .leftJoin(users, eq(courses.instructor_id, users.id))
    .orderBy(desc(courses.created_at))

  // Add lesson count for each course
  const coursesWithLessons = await Promise.all(
    result.map(async (course) => {
      const lessonCount = await db
        .select()
        .from(lessons)
        .where(eq(lessons.course_id, course.id))

      return {
        ...course,
        lessons: lessonCount.length,
        students: 0, // TODO: Add enrollment count
      }
    })
  )

  return coursesWithLessons
}

export default async function AdminCoursesPage() {
  const allCourses = await getAllCourses()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden" dir="rtl">
      <AdminHeader />

      <main className="container py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">مدیریت دوره‌ها</h1>
            <p className="text-muted-foreground mt-2">مشاهده و مدیریت تمام دوره‌های آموزشی</p>
          </div>
          <Button asChild>
            <Link href="/admin/courses/new">
              <Plus className="h-4 w-4 ml-2" />
              دوره جدید
            </Link>
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="جستجوی دوره..." className="pr-10" />
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-4">
          {allCourses.map((course) => (
            <Card key={course.id} className="border-border/40">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="relative w-48 h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={course.thumbnail_url || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">{course.title}</h3>
                          <Badge variant={course.published ? "default" : "secondary"}>
                            {course.published ? "منتشر شده" : "پیش‌نویس"}
                          </Badge>
                          {course.coming_soon && (
                            <Badge className="bg-primary/95 text-primary-foreground">به زودی</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{course.category?.name || 'بدون دسته‌بندی'}</span>
                          <span>•</span>
                          <span>{course.instructor?.name || course.instructor_name || 'نامشخص'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/courses/${course.slug}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/courses/${course.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteCourseButton courseId={course.id} />
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      {!course.coming_soon && (
                        <>
                          <div>
                            <span className="text-muted-foreground">جلسات: </span>
                            <span className="font-medium">{course.lessons}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">دانشجویان: </span>
                            <span className="font-medium">{course.students}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">قیمت: </span>
                            <span className="font-medium">{course.price ? formatPrice(course.price) : 'رایگان'}</span>
                          </div>
                        </>
                      )}
                      {course.coming_soon && (
                        <div className="text-muted-foreground italic">
                          دوره به زودی راه‌اندازی می‌شود - اطلاعات کامل نیست
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/courses/${course.id}/lessons`}>مدیریت جلسات</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
