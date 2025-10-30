"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Menu,
  X,
  Play,
  Pause,
  Volume2,
  Maximize,
  Settings,
} from "lucide-react"
import Link from "next/link"

// Mock data
const courseData = {
  id: "1",
  title: "آموزش جامع Revit برای معماران",
  slug: "revit-complete-course",
  progress: 40,
  lessons: [
    {
      id: "1",
      title: "مقدمه و آشنایی با محیط Revit",
      slug: "introduction-to-revit",
      duration_minutes: 45,
      order_index: 1,
      completed: true,
    },
    {
      id: "2",
      title: "ایجاد اولین پروژه",
      slug: "first-project",
      duration_minutes: 60,
      order_index: 2,
      completed: true,
    },
    {
      id: "3",
      title: "مدل‌سازی دیوارها و کف‌ها",
      slug: "walls-and-floors",
      duration_minutes: 75,
      order_index: 3,
      completed: false,
    },
    {
      id: "4",
      title: "کار با درها و پنجره‌ها",
      slug: "doors-and-windows",
      duration_minutes: 50,
      order_index: 4,
      completed: false,
    },
    {
      id: "5",
      title: "ایجاد سقف و پله",
      slug: "roofs-and-stairs",
      duration_minutes: 65,
      order_index: 5,
      completed: false,
    },
  ],
}

const currentLesson = {
  id: "3",
  title: "مدل‌سازی دیوارها و کف‌ها",
  slug: "walls-and-floors",
  description: "در این جلسه با نحوه ایجاد و ویرایش دیوارها و کف‌های ساختمان آشنا می‌شوید",
  video_url: "https://example.com/videos/lesson3.mp4",
  duration_minutes: 75,
  order_index: 3,
}

export default function LessonPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentIndex = courseData.lessons.findIndex((l) => l.slug === currentLesson.slug)
  const previousLesson = currentIndex > 0 ? courseData.lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < courseData.lessons.length - 1 ? courseData.lessons[currentIndex + 1] : null

  return (
    <div className="h-screen flex flex-col bg-background" dir="rtl">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div>
            <Link href={`/courses/${courseData.slug}`} className="text-sm text-muted-foreground hover:text-foreground">
              {courseData.title}
            </Link>
            <h1 className="font-semibold">{currentLesson.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">پیشرفت دوره:</span>
            <div className="w-32">
              <Progress value={courseData.progress} className="h-2" />
            </div>
            <span className="text-sm font-medium">{courseData.progress}%</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/courses/${courseData.slug}`}>بازگشت به دوره</Link>
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-80 border-l border-border/40 bg-card overflow-y-auto">
            <div className="p-4 space-y-4">
              <div>
                <h2 className="font-semibold mb-2">محتوای دوره</h2>
                <p className="text-sm text-muted-foreground">
                  {courseData.lessons.filter((l) => l.completed).length} از {courseData.lessons.length} جلسه تکمیل شده
                </p>
              </div>

              <div className="space-y-1">
                {courseData.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/courses/${courseData.slug}/learn/${lesson.slug}`}
                    className={`block p-3 rounded-lg transition-colors ${
                      lesson.slug === currentLesson.slug ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {lesson.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm line-clamp-2">{lesson.title}</div>
                        <div className="text-xs opacity-80 mt-1">{lesson.duration_minutes} دقیقه</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Video Player */}
          <div className="relative bg-black aspect-video">
            {currentLesson.video_url ? (
              <video 
                controls 
                className="w-full h-full"
                poster="/placeholder.svg"
              >
                <source src={currentLesson.video_url} type="video/mp4" />
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 mx-auto">
                    <Play className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-white/80">ویدیو موجود نیست</p>
                  <p className="text-sm text-white/60">ویدیو برای این درس هنوز آپلود نشده است</p>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Info & Navigation */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                  <p className="text-muted-foreground leading-relaxed">{currentLesson.description}</p>
                </div>
                <Button>
                  <CheckCircle2 className="h-4 w-4 ml-2" />
                  تکمیل جلسه
                </Button>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                {previousLesson ? (
                  <Button variant="outline" asChild>
                    <Link href={`/courses/${courseData.slug}/learn/${previousLesson.slug}`}>
                      <ChevronRight className="h-4 w-4 ml-2" />
                      جلسه قبل
                    </Link>
                  </Button>
                ) : (
                  <div />
                )}

                {nextLesson ? (
                  <Button asChild>
                    <Link href={`/courses/${courseData.slug}/learn/${nextLesson.slug}`}>
                      جلسه بعد
                      <ChevronLeft className="h-4 w-4 mr-2" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href={`/courses/${courseData.slug}`}>بازگشت به دوره</Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Lesson Content */}
            <Card className="border-border/40">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">محتوای جلسه</h3>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                  <p className="leading-relaxed">
                    در این جلسه با نحوه ایجاد و ویرایش دیوارها و کف‌های ساختمان در نرم‌افزار Revit آشنا خواهید شد. ابتدا
                    با ابزارهای مختلف ایجاد دیوار آشنا می‌شوید و سپس نحوه تنظیم خصوصیات دیوارها را یاد می‌گیرید.
                  </p>
                  <h4 className="font-semibold text-foreground mt-6 mb-3">سرفصل‌های این جلسه:</h4>
                  <ul className="space-y-2">
                    <li>آشنایی با ابزار Wall</li>
                    <li>انواع دیوارها و خصوصیات آن‌ها</li>
                    <li>ایجاد کف با ابزار Floor</li>
                    <li>تنظیمات لایه‌های کف</li>
                    <li>ویرایش و اصلاح دیوارها و کف‌ها</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
