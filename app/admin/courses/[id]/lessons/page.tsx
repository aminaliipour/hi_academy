import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Plus, Edit, GripVertical, Play } from "lucide-react"
import Link from "next/link"
import { db } from "@/lib/db"
import { courses, lessons } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { DeleteLessonButton } from "@/components/admin/delete-lesson-button"

async function getCourseWithLessons(courseId: number) {
  const [course] = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))
    .limit(1)

  const courseLessons = await db
    .select()
    .from(lessons)
    .where(eq(lessons.course_id, courseId))
    .orderBy(lessons.order_index)

  return { course, lessons: courseLessons }
}

export default async function CourseLessonsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const courseId = parseInt(id)
  const { course, lessons: courseLessons } = await getCourseWithLessons(courseId)

  if (!course) {
    return (
      <div className="min-h-screen bg-background w-full overflow-x-hidden" dir="rtl">
        <AdminHeader />
        <main className="container py-8">
          <p className="text-center text-muted-foreground">دوره یافت نشد</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden" dir="rtl">
      <AdminHeader />

      <main className="container py-8 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/courses">
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">مدیریت جلسات</h1>
            <p className="text-muted-foreground mt-2">{course.title}</p>
          </div>
          <Button asChild>
            <Link href={`/admin/courses/${course.id}/lessons/new`}>
              <Plus className="h-4 w-4 ml-2" />
              جلسه جدید
            </Link>
          </Button>
        </div>

        <div className="space-y-3">
          {courseLessons.map((lesson) => (
            <Card key={lesson.id} className="border-border/40 hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="cursor-grab">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </Button>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-medium">
                    {lesson.order_index}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      {lesson.is_free && (
                        <Badge variant="secondary" className="text-xs">
                          رایگان
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{lesson.duration_minutes} دقیقه</span>
                      <span>•</span>
                      <span>{lesson.slug}</span>
                      {lesson.video_url && (
                        <>
                          <span>•</span>
                          <span className="text-green-600">دارای ویدیو</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/courses/${course.slug}/learn/${lesson.slug}`}>
                        <Play className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/courses/${course.id}/lessons/${lesson.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteLessonButton lessonId={lesson.id} courseId={course.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {courseLessons.length === 0 && (
            <Card className="border-border/40">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">هنوز جلسه‌ای اضافه نشده است</p>
                <Button className="mt-4" asChild>
                  <Link href={`/admin/courses/${course.id}/lessons/new`}>
                    <Plus className="h-4 w-4 ml-2" />
                    اولین جلسه را اضافه کنید
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
