"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"
import { Users, Mail, Phone, Calendar, MessageSquare } from "lucide-react"
import Link from "next/link"

interface Registration {
  id: number
  course_id: number
  full_name: string
  email: string
  phone: string
  message: string | null
  status: string
  created_at: Date
  course: {
    title: string
    slug: string
  } | null
}

const statusLabels: Record<string, string> = {
  pending: 'در انتظار',
  contacted: 'تماس گرفته شده',
  enrolled: 'ثبت‌نام شده',
  rejected: 'رد شده',
}

const statusColors: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  pending: 'secondary',
  contacted: 'default',
  enrolled: 'outline',
  rejected: 'destructive',
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<string>('all')

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/registrations')
      if (!response.ok) throw new Error('Failed to fetch registrations')
      const data = await response.json()
      setRegistrations(data)
    } catch (error) {
      console.error('Error fetching registrations:', error)
      toast.error('خطا در بارگذاری ثبت‌نام‌ها')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id)
    try {
      const response = await fetch('/api/registrations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      toast.success('وضعیت با موفقیت به‌روزرسانی شد')
      fetchRegistrations()
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('خطا در به‌روزرسانی وضعیت')
    } finally {
      setUpdating(null)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date))
  }

  // Get unique courses from registrations
  const uniqueCourses = Array.from(
    new Map(
      registrations
        .filter(r => r.course)
        .map(r => [r.course!.slug, r.course!.title])
    )
  )

  const filteredRegistrations = selectedCourse === 'all'
    ? registrations
    : registrations.filter(r => r.course?.slug === selectedCourse)

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden" dir="rtl">
      <AdminHeader />

      <main className="container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">مدیریت ثبت‌نام‌ها</h1>
            <p className="text-muted-foreground mt-2">
              لیست کاربرانی که برای دوره‌ها ثبت‌نام کرده‌اند
            </p>
          </div>

          <Card className="border-border/40">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>ثبت‌نام‌ها ({filteredRegistrations.length})</CardTitle>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="فیلتر بر اساس دوره" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">همه دوره‌ها</SelectItem>
                    {uniqueCourses.map(([slug, title]) => (
                      <SelectItem key={slug} value={slug}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : filteredRegistrations.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>{selectedCourse === 'all' ? 'هنوز ثبت‌نامی وجود ندارد' : 'ثبت‌نامی برای این دوره وجود ندارد'}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>نام</TableHead>
                        <TableHead>دوره</TableHead>
                        <TableHead>ایمیل</TableHead>
                        <TableHead>تلفن</TableHead>
                        <TableHead>تاریخ ثبت‌نام</TableHead>
                        <TableHead>وضعیت</TableHead>
                        <TableHead>پیام</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegistrations.map((registration) => (
                        <TableRow key={registration.id}>
                          <TableCell className="font-medium">
                            {registration.full_name}
                          </TableCell>
                          <TableCell>
                            {registration.course ? (
                              <Link
                                href={`/courses/${registration.course.slug}`}
                                className="text-primary hover:underline"
                              >
                                {registration.course.title}
                              </Link>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`mailto:${registration.email}`}
                                className="text-sm hover:underline"
                              >
                                {registration.email}
                              </a>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <a
                                href={`tel:${registration.phone}`}
                                className="text-sm hover:underline"
                                dir="ltr"
                              >
                                {registration.phone}
                              </a>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {formatDate(registration.created_at)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={registration.status}
                              onValueChange={(value) => updateStatus(registration.id, value)}
                              disabled={updating === registration.id}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue>
                                  <Badge variant={statusColors[registration.status]}>
                                    {statusLabels[registration.status]}
                                  </Badge>
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">در انتظار</SelectItem>
                                <SelectItem value="contacted">تماس گرفته شده</SelectItem>
                                <SelectItem value="enrolled">ثبت‌نام شده</SelectItem>
                                <SelectItem value="rejected">رد شده</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {registration.message ? (
                              <div className="max-w-xs">
                                <div className="flex items-start gap-2">
                                  <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                  <p className="text-sm line-clamp-2">{registration.message}</p>
                                </div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground text-sm">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
