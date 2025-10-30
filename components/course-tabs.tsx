"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Lock } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: number
  title: string
  slug: string
  description: string | null
  duration_minutes: number
  order_index: number
  is_free: boolean
}

interface CourseTabsProps {
  lessons: Lesson[]
  courseSlug: string
  sessionCount: number
  description: string | null
  whatYouLearn: string | null
  prerequisites: string | null
  enrolled: boolean
}

export function CourseTabs({ 
  lessons, 
  courseSlug, 
  sessionCount, 
  description,
  whatYouLearn,
  prerequisites,
  enrolled 
}: CourseTabsProps) {
  return (
    <Tabs defaultValue="curriculum" className="w-full">
      <div className="border-b border-border/40 bg-card/30">
        <div className="container">
          <TabsList className="bg-transparent h-auto p-0 w-full justify-start border-0">
            <TabsTrigger 
              value="curriculum" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
            >
              سرفصل‌ها
            </TabsTrigger>
            <TabsTrigger 
              value="description"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
            >
              توضیحات
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <div className="container py-12">
        <TabsContent value="curriculum" className="mt-0 space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">محتوای دوره</h2>
            <p className="text-muted-foreground">
              {sessionCount} جلسه • {lessons.length} محتوای آموزشی
            </p>
          </div>

          <div className="space-y-2">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className="border-border/40 hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
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
                      <p className="text-sm text-muted-foreground">{lesson.description}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{lesson.duration_minutes} دقیقه</span>
                      {lesson.is_free || enrolled ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          asChild
                          className="hover:bg-primary hover:text-primary-foreground"
                        >
                          <Link href={`/courses/${courseSlug}/learn/${lesson.slug}`}>
                            <Play className="h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="description" className="mt-0 space-y-6">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold">درباره این دوره</h2>
            <p className="text-muted-foreground leading-relaxed">{description}</p>

            {whatYouLearn && JSON.parse(whatYouLearn).length > 0 && (
              <>
                <h3 className="text-xl font-bold mt-8">چه چیزی یاد خواهید گرفت؟</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {JSON.parse(whatYouLearn).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {prerequisites && JSON.parse(prerequisites).length > 0 && (
              <>
                <h3 className="text-xl font-bold mt-8">پیش‌نیازها</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {JSON.parse(prerequisites).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  )
}
