"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"
import { EnrollmentDialog } from "./enrollment-dialog"

interface CourseDetailCardProps {
  courseId: number
  courseTitle: string
  price: number
  thumbnailUrl: string | null
  sessionCount: number
  lessonsCount: number
  level: string
}

const levelLabels = {
  beginner: "مقدماتی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
}

export function CourseDetailCard({
  courseId,
  courseTitle,
  price,
  thumbnailUrl,
  sessionCount,
  lessonsCount,
  level,
}: CourseDetailCardProps) {
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false)

  return (
    <>
      <Card className="sticky top-20 border-border/40">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt={courseTitle}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Play className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-primary">
              {price === 0 ? "رایگان" : formatPrice(price)}
            </span>
          </div>

          <Button
            onClick={() => setEnrollDialogOpen(true)}
            className="w-full"
            size="lg"
          >
            ثبت‌نام در دوره
          </Button>

          <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground text-center">
            با ثبت‌نام، به زودی با شما تماس خواهیم گرفت
          </div>

          <div className="pt-4 border-t border-border/40 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">تعداد جلسات</span>
              <span className="font-medium">{sessionCount} جلسه</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">محتوای آموزشی</span>
              <span className="font-medium">{lessonsCount} مورد</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">سطح</span>
              <span className="font-medium">{levelLabels[level as keyof typeof levelLabels]}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">دسترسی</span>
              <span className="font-medium">نامحدود</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <EnrollmentDialog
        open={enrollDialogOpen}
        onOpenChange={setEnrollDialogOpen}
        courseId={courseId}
        courseTitle={courseTitle}
      />
    </>
  )
}
