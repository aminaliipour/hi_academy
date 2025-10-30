import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Hi Academy" width={32} height={32} className="h-8 w-8" />
              <span className="text-xl font-bold">Hi Academy</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              پلتفرم آموزش آنلاین معماری، طراحی داخلی و نرم‌افزارهای تخصصی
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">دسترسی سریع</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors inline-block">
                  دوره‌ها
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors inline-block">
                  دسته‌بندی‌ها
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="hover:text-primary transition-colors inline-block">
                  مدرسین
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">پشتیبانی</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-primary transition-colors inline-block">
                  راهنما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors inline-block">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors inline-block">
                  سوالات متداول
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Hi Architect</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="https://hiarchitect.ir" className="hover:text-primary transition-colors inline-block" target="_blank" rel="noopener noreferrer">
                  وبسایت اصلی
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors inline-block">
                  درباره ما
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© ۱۴۰۳ Hi Academy. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}
