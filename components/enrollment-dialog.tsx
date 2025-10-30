"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { CheckCircle2 } from "lucide-react"

interface EnrollmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  courseId: number
  courseTitle: string
}

export function EnrollmentDialog({ open, onOpenChange, courseId, courseTitle }: EnrollmentDialogProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.full_name || !formData.email || !formData.phone) {
      toast.error('لطفا تمام فیلدهای الزامی را پر کنید')
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('لطفا یک ایمیل معتبر وارد کنید')
      return
    }

    // Validate phone (Iranian phone numbers)
    const phoneRegex = /^(\+98|0)?9\d{9}$/
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('لطفا یک شماره موبایل معتبر وارد کنید')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          course_id: courseId,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit registration')
      }

      setSuccess(true)
      toast.success('ثبت‌نام شما با موفقیت ثبت شد')
      
      // Reset form
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (error) {
      console.error('Error submitting registration:', error)
      toast.error('خطا در ثبت درخواست. لطفا دوباره تلاش کنید')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setSuccess(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]" dir="rtl">
        {success ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <DialogTitle className="text-2xl mb-2">ثبت‌نام موفق!</DialogTitle>
            <DialogDescription className="text-base">
              درخواست ثبت‌نام شما با موفقیت ثبت شد.
              <br />
              به زودی با شما تماس خواهیم گرفت.
            </DialogDescription>
            <Button onClick={handleClose} className="mt-6">
              بستن
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>ثبت‌نام در دوره</DialogTitle>
              <DialogDescription>
                {courseTitle}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">
                  نام و نام خانوادگی <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="full_name"
                  placeholder="مثال: علی احمدی"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  ایمیل <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  شماره تماس <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="09123456789"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">توضیحات (اختیاری)</Label>
                <Textarea
                  id="message"
                  placeholder="در صورت نیاز توضیحات خود را وارد کنید..."
                  rows={4}
                  className="resize-none"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? 'در حال ارسال...' : 'ثبت درخواست'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={loading}
                >
                  انصراف
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
