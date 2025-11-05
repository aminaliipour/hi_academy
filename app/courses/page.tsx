import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal } from "lucide-react"
import { db } from "@/lib/db"
import { courses, categories, lessons } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

// Revalidate every 60 seconds
export const revalidate = 60

async function getAllCourses() {
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
      coming_soon: courses.coming_soon,
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

const categoryFilters = [
  { name: "همه", slug: "all" },
  { name: "معماری", slug: "architecture" },
  { name: "طراحی داخلی", slug: "interior-design" },
  { name: "نرم‌افزارهای طراحی", slug: "design-software" },
  { name: "مدیریت پروژه", slug: "project-management" },
]

export default async function CoursesPage() {
  const allCourses = await getAllCourses()

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden" dir="rtl">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border/40 bg-card/50">
          <div className="container py-12 space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-bold">دوره‌های آموزشی</h1>
              <p className="text-lg text-muted-foreground">دوره‌های آموزشی در زمینه معماری و طراحی</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="جستجوی دوره..." className="pr-10" />
              </div>
              <Button variant="outline" className="md:w-auto bg-transparent">
                <SlidersHorizontal className="h-4 w-4 ml-2" />
                فیلترها
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categoryFilters.map((category) => (
                <Badge
                  key={category.slug}
                  variant={category.slug === "all" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12">
          <div className="container">
            {allCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">هیچ دوره‌ای یافت نشد</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
