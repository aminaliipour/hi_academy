import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, BarChart3 } from "lucide-react"
import type { CourseWithDetails } from "@/lib/db-types"

interface CourseCardProps {
  course: CourseWithDetails
}

export function CourseCard({ course }: CourseCardProps) {
  const levelLabels = {
    beginner: "مقدماتی",
    intermediate: "متوسط",
    advanced: "پیشرفته",
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  const isComingSoon = course.coming_soon || false

  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="group overflow-hidden border-border/40 bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full flex flex-col relative">
        {isComingSoon && (
          <div className="absolute top-0 left-0 right-0 z-10 bg-primary/95 text-primary-foreground text-center py-2 font-semibold text-sm">
            به زودی
          </div>
        )}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={course.thumbnail_url || "/placeholder.svg?height=400&width=600&query=architecture+course"}
            alt={course.title}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${isComingSoon ? 'opacity-60' : ''}`}
          />
          {!isComingSoon && course.level && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                <BarChart3 className="h-3 w-3 ml-1" />
                {levelLabels[course.level]}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5 space-y-3 flex-1 flex flex-col">
          {course.category && (
            <Badge variant="outline" className="text-xs">
              {course.category.name}
            </Badge>
          )}

          <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          {course.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">{course.description}</p>
          )}

          {!isComingSoon && (
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
              {course.session_count && course.session_count > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{course.session_count} جلسه</span>
                </div>
              )}
              {course.lesson_count && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{course.lesson_count} محتوا</span>
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-border/40 mt-auto">
          {!isComingSoon && course.instructor_name && (
            <span className="text-sm text-muted-foreground">{course.instructor_name}</span>
          )}
          {isComingSoon ? (
            <span className="font-bold text-primary text-lg w-full text-center">به زودی</span>
          ) : (
            <span className="font-bold text-primary text-lg">{course.price === 0 || course.price === null ? "رایگان" : formatPrice(course.price)}</span>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
