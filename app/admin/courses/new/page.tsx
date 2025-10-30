"use client"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, Upload, Video, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function NewCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    thumbnail_url: '',
    teaser_url: '',
    location: '',
    instructor_name: '',
    price: 0,
    level: 'beginner',
    session_count: 0,
    category_id: '',
    published: true,
    what_you_learn: [] as string[],
    prerequisites: [] as string[],
  })

  const [newWhatYouLearn, setNewWhatYouLearn] = useState('')
  const [newPrerequisite, setNewPrerequisite] = useState('')

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err))
  }, [])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addWhatYouLearn = () => {
    if (newWhatYouLearn.trim()) {
      setFormData(prev => ({
        ...prev,
        what_you_learn: [...prev.what_you_learn, newWhatYouLearn.trim()]
      }))
      setNewWhatYouLearn('')
    }
  }

  const removeWhatYouLearn = (index: number) => {
    setFormData(prev => ({
      ...prev,
      what_you_learn: prev.what_you_learn.filter((_, i) => i !== index)
    }))
  }

  const addPrerequisite = () => {
    if (newPrerequisite.trim()) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, newPrerequisite.trim()]
      }))
      setNewPrerequisite('')
    }
  }

  const removePrerequisite = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter((_, i) => i !== index)
    }))
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'teaser') => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!formData.slug) {
      toast.error('لطفا ابتدا عنوان دوره را وارد کنید')
      return
    }

    setUploading(true)
    
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('courseSlug', formData.slug)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload file')
      }

      const data = await response.json()
      handleInputChange(type === 'thumbnail' ? 'thumbnail_url' : 'teaser_url', data.url)
      toast.success(type === 'thumbnail' ? 'تصویر با موفقیت آپلود شد' : 'تیزر با موفقیت آپلود شد')
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error('خطا در آپلود فایل')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.instructor_name) {
      toast.error('لطفا عنوان دوره و نام مدرس را وارد کنید')
      return
    }
    
    setLoading(true)

    try {
      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price.toString()),
          session_count: parseInt(formData.session_count.toString()),
          category_id: formData.category_id ? parseInt(formData.category_id) : null,
          what_you_learn: JSON.stringify(formData.what_you_learn),
          prerequisites: JSON.stringify(formData.prerequisites),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create course')
      }

      toast.success('دوره با موفقیت ایجاد شد')
      router.push('/admin/courses')
      router.refresh()
    } catch (error) {
      console.error('Error creating course:', error)
      toast.error('خطا در ایجاد دوره')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden" dir="rtl">
      <AdminHeader />

      <main className="container py-8 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/courses">
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">ایجاد دوره جدید</h1>
            <p className="text-muted-foreground mt-2">دوره آموزشی حضوری جدید را تعریف کنید</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>اطلاعات اصلی</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان دوره</Label>
                  <Input 
                    id="title" 
                    placeholder="مثال: آموزش جامع Revit"
                    value={formData.title}
                    onChange={(e) => {
                      handleInputChange('title', e.target.value)
                      if (!formData.slug) {
                        generateSlug(e.target.value)
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">نامک (Slug)</Label>
                  <Input 
                    id="slug" 
                    placeholder="revit-complete-course"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">URL دوره بر اساس این مقدار ساخته می‌شود</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor_name">نام مدرس</Label>
                  <Input 
                    id="instructor_name" 
                    placeholder="مثال: دکتر احمد محمدی"
                    value={formData.instructor_name}
                    onChange={(e) => handleInputChange('instructor_name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">محل برگزاری (حضوری)</Label>
                  <Input 
                    id="location" 
                    placeholder="مثال: تهران، خیابان ولیعصر، ساختمان آموزشی"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea
                    id="description"
                    placeholder="توضیحات کامل دوره را وارد کنید..."
                    rows={6}
                    className="resize-none"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">دسته‌بندی</Label>
                    <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="انتخاب دسته‌بندی" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">سطح دوره</Label>
                    <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
                      <SelectTrigger id="level">
                        <SelectValue placeholder="انتخاب سطح" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">مقدماتی</SelectItem>
                        <SelectItem value="intermediate">متوسط</SelectItem>
                        <SelectItem value="advanced">پیشرفته</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">قیمت (تومان)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="2500000"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session_count">تعداد جلسات</Label>
                    <Input 
                      id="session_count" 
                      type="number" 
                      placeholder="10"
                      value={formData.session_count}
                      onChange={(e) => handleInputChange('session_count', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>چه چیزی یاد خواهید گرفت؟</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="what_you_learn">افزودن نکته جدید</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="what_you_learn"
                      placeholder="مثال: آشنایی کامل با محیط کاری Revit"
                      value={newWhatYouLearn}
                      onChange={(e) => setNewWhatYouLearn(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addWhatYouLearn())}
                    />
                    <Button type="button" onClick={addWhatYouLearn} size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {formData.what_you_learn.length > 0 && (
                  <div className="space-y-2">
                    {formData.what_you_learn.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <span className="flex-1 text-sm">{item}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeWhatYouLearn(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>پیش‌نیازها</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prerequisites">افزودن پیش‌نیاز جدید</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="prerequisites"
                      placeholder="مثال: آشنایی اولیه با مفاهیم معماری"
                      value={newPrerequisite}
                      onChange={(e) => setNewPrerequisite(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
                    />
                    <Button type="button" onClick={addPrerequisite} size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {formData.prerequisites.length > 0 && (
                  <div className="space-y-2">
                    {formData.prerequisites.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <span className="flex-1 text-sm">{item}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removePrerequisite(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>تصویر دوره</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="thumbnail-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'thumbnail')}
                    disabled={uploading || !formData.slug}
                  />
                  <label htmlFor="thumbnail-upload" className="cursor-pointer">
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
                          {uploading ? 'در حال آپلود...' : 'آپلود تصویر دوره'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formData.slug ? 'تصویر اصلی دوره را انتخاب کنید' : 'ابتدا عنوان دوره را وارد کنید'}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
                
                {formData.thumbnail_url && (
                  <div className="border rounded-lg p-2 relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 left-4 bg-background"
                      onClick={() => handleInputChange('thumbnail_url', '')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <img 
                      src={formData.thumbnail_url} 
                      alt="پیش‌نمایش" 
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>ویدیو تیزر دوره</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="teaser-upload"
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, 'teaser')}
                    disabled={uploading || !formData.slug}
                  />
                  <label htmlFor="teaser-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        {uploading ? (
                          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                        ) : (
                          <Video className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {uploading ? 'در حال آپلود...' : 'آپلود ویدیو تیزر'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formData.slug ? 'ویدیو معرفی دوره را انتخاب کنید' : 'ابتدا عنوان دوره را وارد کنید'}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
                
                {formData.teaser_url && (
                  <div className="border rounded-lg p-2">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">ویدیو تیزر آپلود شده</p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleInputChange('teaser_url', '')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <video 
                      src={formData.teaser_url} 
                      controls 
                      className="w-full rounded"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/40">
              <CardHeader>
                <CardTitle>تنظیمات انتشار</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="published">انتشار دوره</Label>
                    <p className="text-xs text-muted-foreground">دوره برای دانشجویان قابل مشاهده باشد</p>
                  </div>
                  <Switch 
                    id="published" 
                    checked={formData.published} 
                    onCheckedChange={(checked) => handleInputChange('published', checked)} 
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button 
                type="submit"
                className="w-full" 
                size="lg"
                disabled={loading || !formData.title || !formData.instructor_name}
              >
                {loading ? 'در حال ایجاد...' : 'ایجاد دوره'}
              </Button>
              <Button type="button" variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/admin/courses">انصراف</Link>
              </Button>
            </div>
          </div>
        </div>
        </form>
      </main>
    </div>
  )
}
