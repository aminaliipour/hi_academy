"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, Upload, Video, X } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"

export default function EditLessonPage() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.id as string
  const lessonId = params.lessonId as string
  
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fetchingLesson, setFetchingLesson] = useState(true)
  const [course, setCourse] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    video_url: '',
    duration_minutes: 0,
    order_index: 1,
    is_free: false,
  })

  useEffect(() => {
    // دریافت اطلاعات دوره
    fetch(`/api/admin/courses/${courseId}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.error('Error fetching course:', err))

    // دریافت اطلاعات درس
    fetch(`/api/admin/lessons/${lessonId}`)
      .then(res => {
        if (!res.ok) throw new Error('Lesson not found')
        return res.json()
      })
      .then(data => {
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          description: data.description || '',
          video_url: data.video_url || '',
          duration_minutes: data.duration_minutes || 0,
          order_index: data.order_index || 1,
          is_free: data.is_free || false,
        })
        setFetchingLesson(false)
      })
      .catch(err => {
        console.error('Error fetching lesson:', err)
        toast.error('خطا در بارگذاری درس')
        router.push(`/admin/courses/${courseId}/lessons`)
      })
  }, [courseId, lessonId, router])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
    
    setFormData(prev => ({ ...prev, slug }))
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!course?.slug) {
      toast.error('اطلاعات دوره یافت نشد')
      return
    }

    if (!file.type.startsWith('video/')) {
      toast.error('لطفا فقط فایل ویدیو انتخاب کنید')
      return
    }

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('courseSlug', course.slug)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload video')
      }

      const data = await response.json()
      handleInputChange('video_url', data.url)
      toast.success('ویدیو با موفقیت آپلود شد')
    } catch (error) {
      console.error('Error uploading video:', error)
      toast.error('خطا در آپلود ویدیو')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title) {
      toast.error('لطفا عنوان درس را وارد کنید')
      return
    }
    
    setLoading(true)

    try {
      const response = await fetch('/api/admin/lessons', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: parseInt(lessonId),
          ...formData,
          course_id: parseInt(courseId),
          duration_minutes: parseInt(formData.duration_minutes.toString()),
          order_index: parseInt(formData.order_index.toString()),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update lesson')
      }

      toast.success('درس با موفقیت ویرایش شد')
      router.push(`/admin/courses/${courseId}/lessons`)
      router.refresh()
    } catch (error) {
      console.error('Error updating lesson:', error)
      toast.error('خطا در ویرایش درس')
    } finally {
      setLoading(false)
    }
  }

  if (fetchingLesson || !course) {
    return (
      <div className="min-h-screen bg-background w-full overflow-x-hidden" dir="rtl">
        <AdminHeader />
        <main className="container py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">در حال بارگذاری...</p>
          </div>
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
            <Link href={`/admin/courses/${courseId}/lessons`}>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">ویرایش درس</h1>
            <p className="text-muted-foreground mt-2">{course.title}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>اطلاعات درس</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان درس</Label>
                  <Input 
                    id="title" 
                    placeholder="مثال: مقدمه و آشنایی با محیط Revit"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">نامک (Slug)</Label>
                  <Input 
                    id="slug" 
                    placeholder="introduction-to-revit"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea
                    id="description"
                    placeholder="توضیحات درس را وارد کنید..."
                    rows={4}
                    className="resize-none"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">مدت زمان (دقیقه)</Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      placeholder="45"
                      value={formData.duration_minutes}
                      onChange={(e) => handleInputChange('duration_minutes', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="order">ترتیب</Label>
                    <Input 
                      id="order" 
                      type="number" 
                      placeholder="1"
                      value={formData.order_index}
                      onChange={(e) => handleInputChange('order_index', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>ویدیوی درس</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!formData.video_url ? (
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <input
                      type="file"
                      id="video-upload"
                      className="hidden"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      disabled={uploading}
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {uploading ? (
                            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                          ) : (
                            <Upload className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {uploading ? 'در حال آپلود...' : 'آپلود ویدیو'}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            فایل ویدیو خود را انتخاب کنید
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{formData.video_url}</p>
                          <p className="text-xs text-muted-foreground">ویدیو آپلود شده</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleInputChange('video_url', '')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <video 
                      src={formData.video_url} 
                      controls 
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>تنظیمات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="is_free">درس رایگان</Label>
                    <p className="text-xs text-muted-foreground">این درس برای همه قابل مشاهده باشد</p>
                  </div>
                  <Switch 
                    id="is_free" 
                    checked={formData.is_free} 
                    onCheckedChange={(checked) => handleInputChange('is_free', checked)} 
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button 
                type="submit"
                className="w-full" 
                size="lg"
                disabled={loading || !formData.title}
              >
                {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
              </Button>
              <Button type="button" variant="outline" className="w-full bg-transparent" asChild>
                <Link href={`/admin/courses/${courseId}/lessons`}>انصراف</Link>
              </Button>
            </div>
          </div>
        </div>
        </form>
      </main>
    </div>
  )
}
