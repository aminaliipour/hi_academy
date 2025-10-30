import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { ArrowLeft, Play, BookOpen, Users, Award } from "lucide-react"
import Link from "next/link"
import { db } from "@/lib/db"
import { courses, categories, lessons } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

// Revalidate every 60 seconds
export const revalidate = 60

async function getFeaturedCourses() {
  const result = await db
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
      created_at: courses.created_at,
      updated_at: courses.updated_at,
      category: {
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        created_at: categories.created_at,
      },
    })
    .from(courses)
    .leftJoin(categories, eq(courses.category_id, categories.id))
    .where(eq(courses.published, true))
    .orderBy(desc(courses.created_at))
    .limit(3)

  // Add lesson count for each course
  const coursesWithLessons = await Promise.all(
    result.map(async (course) => {
      const lessonCount = await db
        .select()
        .from(lessons)
        .where(eq(lessons.course_id, course.id))

      return {
        ...course,
        lesson_count: lessonCount.length,
      }
    })
  )

  return coursesWithLessons
}

export default async function HomePage() {
  const featuredCourses = await getFeaturedCourses()

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden" dir="rtl">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/40">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          <div className="w-full relative py-24 md:py-32">
            <div className="max-w-6xl mx-auto text-center space-y-8 px-6">
              <div className="flex justify-center">
                <Badge variant="secondary" className="text-sm hover:bg-primary/10 transition-colors">
                  <Play className="h-3 w-3 ml-1" />
                  پلتفرم آموزش آنلاین
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                یادگیری <span className="text-primary">معماری و طراحی</span> در
                <br />
                سطح <span className="text-primary">حرفه‌ای</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mx-auto max-w-3xl">
                با HiAcademy، دسترسی به بهترین دوره‌های آموزشی معماری، طراحی داخلی و نرم‌افزارهای
                تخصصی را داشته باشید
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                  <Link href="/courses">
                    مشاهده دوره‌ها
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="hover:bg-primary/10">
                  <Link href="/about">درباره ما</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border/40 bg-card/30"></section>

        {/* Featured Courses */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container space-y-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">دوره‌های پیشنهادی</h2>
              <p className="text-muted-foreground text-lg">محبوب‌ترین دوره‌های آموزشی Hi Academy</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <Button variant="outline" size="lg" asChild className="hover:bg-primary/10">
                <Link href="/courses">
                  مشاهده همه دوره‌ها
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-y border-border/40 bg-gradient-to-br from-primary/10 via-card/30 to-background">
          <div className="container py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">دوره‌های آموزشی حضوری معماری</h2>
              <p className="text-lg text-muted-foreground">
                با بهترین اساتید و محیط آموزشی حرفه‌ای، مهارت‌های خود را ارتقا دهید
              </p>
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow mt-4">
                <Link href="/courses">
                  مشاهده دوره‌ها
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PWAInstallPrompt />
    </div>
  )
}
