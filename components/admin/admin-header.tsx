"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Users, Settings, LogOut } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

export function AdminHeader() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      toast.success('با موفقیت خارج شدید')
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('خطا در خروج')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Hi Academy" width={32} height={32} className="h-8 w-8" />
            <span className="text-xl font-bold">پنل مدیریت</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" />
              داشبورد
            </Link>
            <Link
              href="/admin/courses"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              دوره‌ها
            </Link>
            <Link
              href="/admin/registrations"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Users className="h-4 w-4" />
              ثبت‌نام‌ها
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings className="h-4 w-4" />
              تنظیمات
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">مشاهده سایت</Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout} title="خروج">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
