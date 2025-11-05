import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CourseTabs } from "@/components/course-tabs"
import { CourseDetailCard } from "@/components/course-detail-card"
import { Clock, Users, BarChart3, Play, CheckCircle2, Lock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { db } from "@/lib/db"
import { courses, categories, lessons } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"

// Revalidate every 60 seconds
export const revalidate = 60

async function getCourseBySlug(slug: string) {
  const [course] = await db
    .select({
      id: courses.id,
      title: courses.title,
      slug: courses.slug,
      description: courses.description,
      thumbnail_url: courses.thumbnail_url,
      teaser_url: courses.teaser_url,
      location: courses.location,
      instructor_name: courses.instructor_name,
      price: courses.price,
      level: courses.level,
      session_count: courses.session_count,
      published: courses.published,
      coming_soon: courses.coming_soon,
      what_you_learn: courses.what_you_learn,
      prerequisites: courses.prerequisites,
      category: {
        name: categories.name,
        slug: categories.slug,
      },
    })
    .from(courses)
    .leftJoin(categories, eq(courses.category_id, categories.id))
    .where(eq(courses.slug, slug))
    .limit(1)

  if (!course) {
    return null
  }

  // Get lessons for this course
  const courseLessons = await db
    .select()
    .from(lessons)
    .where(eq(lessons.course_id, course.id))
    .orderBy(lessons.order_index)

  return {
    ...course,
    lessons: courseLessons,
    enrolled: false,
    progress: 0,
  }
}

const levelLabels = {
  beginner: "مقدماتی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const courseData = await getCourseBySlug(slug)

  if (!courseData) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden" dir="rtl">
      <Header />

      <main className="flex-1">
        {/* Course Header */}
        <section className="border-b border-border/40 bg-card/50">
          <div className="container py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {courseData.category && (
                      <Badge variant="outline">{courseData.category.name}</Badge>
                    )}
                    {courseData.coming_soon && (
                      <Badge className="bg-primary/95 text-primary-foreground">به زودی</Badge>
                    )}
                    {!courseData.coming_soon && courseData.level && (
                      <Badge variant="secondary">
                        <BarChart3 className="h-3 w-3 ml-1" />
                        {levelLabels[courseData.level as keyof typeof levelLabels]}
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold leading-tight">{courseData.title}</h1>

                  <p className="text-lg text-muted-foreground leading-relaxed">{courseData.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  {!courseData.coming_soon && courseData.session_count && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{courseData.session_count} جلسه</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{courseData.lessons.length} محتوای آموزشی</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    <span>آخرین بروزرسانی: ۱۴۰۳</span>
                  </div>
                </div>

                {/* Location */}
                {courseData.location && (
                  <div className="flex items-center gap-3 p-4 rounded-lg border border-border/40 bg-card">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">محل برگزاری</div>
                      <div className="font-medium">{courseData.location}</div>
                    </div>
                  </div>
                )}

                {/* Instructor */}
                {courseData.instructor_name && (
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-border/40 bg-card">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">مدرس دوره</div>
                      <div className="font-semibold">{courseData.instructor_name}</div>
                    </div>
                  </div>
                )}

                {/* Teaser Video */}
                {courseData.teaser_url && (
                  <div className="rounded-lg overflow-hidden border border-border/40">
                    <div className="p-3 bg-card border-b border-border/40">
                      <h3 className="font-semibold">ویدیو معرفی دوره</h3>
                    </div>
                    <video 
                      src={courseData.teaser_url} 
                      controls 
                      className="w-full"
                      poster={courseData.thumbnail_url || undefined}
                    />
                  </div>
                )}
              </div>

              {/* Course Card */}
              <div className="lg:col-span-1">
                <CourseDetailCard
                  courseId={courseData.id}
                  courseTitle={courseData.title}
                  price={courseData.price || 0}
                  thumbnailUrl={courseData.thumbnail_url}
                  sessionCount={courseData.session_count || 0}
                  lessonsCount={courseData.lessons.length}
                  level={courseData.level || 'beginner'}
                  comingSoon={courseData.coming_soon}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Course Tabs */}
        <CourseTabs 
          lessons={courseData.lessons}
          courseSlug={courseData.slug}
          sessionCount={courseData.session_count || 0}
          description={courseData.description}
          whatYouLearn={courseData.what_you_learn}
          prerequisites={courseData.prerequisites}
          enrolled={courseData.enrolled}
        />
      </main>

      <Footer />
    </div>
  )
}
