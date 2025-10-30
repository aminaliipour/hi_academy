import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Video, TrendingUp } from "lucide-react"
import { db } from "@/lib/db"
import { courses, lessons, users } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

// Mock authentication check - replace with real auth
const isAdmin = true

// Revalidate every 60 seconds
export const revalidate = 60

async function getDashboardStats() {
  // Get total courses count
  const allCourses = await db.select().from(courses)
  const coursesCount = allCourses.length

  // Get total lessons count
  const allLessons = await db.select().from(lessons)
  const lessonsCount = allLessons.length

  // Get recent courses with student count (mock for now)
  const recentCourses = await db
    .select({
      id: courses.id,
      title: courses.title,
      slug: courses.slug,
      published: courses.published,
    })
    .from(courses)
    .orderBy(desc(courses.created_at))
    .limit(3)

  return {
    coursesCount,
    lessonsCount,
    recentCourses,
  }
}

export default async function AdminDashboardPage() {
  if (!isAdmin) {
    redirect("/")
  }

  const { coursesCount, lessonsCount, recentCourses } = await getDashboardStats()

  const stats = [
    {
      title: "کل دوره‌ها",
      value: coursesCount.toString(),
      icon: BookOpen,
      change: "+3 این ماه",
    },
    {
      title: "دانشجویان فعال",
      value: "1,234",
      icon: Users,
      change: "+12% از ماه قبل",
    },
    {
      title: "کل جلسات",
      value: lessonsCount.toString(),
      icon: Video,
      change: "+8 این هفته",
    },
    {
      title: "درآمد ماه",
      value: "۴۵ میلیون",
      icon: TrendingUp,
      change: "+18% رشد",
    },
  ]

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden" dir="rtl">
      <AdminHeader />

      <main className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">داشبورد مدیریت</h1>
          <p className="text-muted-foreground mt-2">خلاصه‌ای از وضعیت پلتفرم Hi Academy</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-border/40">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>دوره‌های اخیر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.length > 0 ? (
                  recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground">0 دانشجو</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {course.published ? "منتشر شده" : "پیش‌نویس"}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    هنوز دوره‌ای ایجاد نشده است
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader>
              <CardTitle>فعالیت‌های اخیر</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "دوره جدید اضافه شد", time: "۲ ساعت پیش" },
                  { action: "جلسه جدید به دوره Revit اضافه شد", time: "۵ ساعت پیش" },
                  { action: "دانشجوی جدید ثبت‌نام کرد", time: "۱ روز پیش" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="font-medium">{activity.action}</div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
