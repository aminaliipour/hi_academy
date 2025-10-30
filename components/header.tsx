import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Navigation - Right Side */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/courses"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            دوره‌ها
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            تماس با ما
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            درباره ما
          </Link>
        </nav>

        {/* Logo - Left Side */}
        <Link href="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
          <span className="text-xl font-bold">Academy</span>
          <Image src="/logo.png" alt="Academy" width={32} height={32} className="h-8 w-8" />
        </Link>
      </div>
    </header>
  )
}
