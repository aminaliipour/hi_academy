import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactMap } from "@/components/contact-map"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden" dir="rtl">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border/40 bg-gradient-to-br from-primary/10 via-card/30 to-background">
          <div className="container py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">درباره Hi Academy</h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                مرکز آموزش تخصصی معماری و طراحی داخلی
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-muted-foreground">
                  <span className="text-foreground font-semibold">Hi Academy</span> یک مرکز آموزش تخصصی در حوزه معماری و طراحی داخلی است که با هدف ارتقای دانش و مهارت‌های علاقه‌مندان به این حوزه تأسیس شده است. ما با بهره‌گیری از اساتید مجرب و روش‌های نوین آموزشی، تلاش می‌کنیم تا بهترین تجربه یادگیری را برای شما فراهم کنیم.
                </p>
                
                <p className="text-muted-foreground">
                  دوره‌های آموزشی ما شامل آموزش نرم‌افزارهای تخصصی مانند <span className="text-foreground font-medium">AutoCAD</span>، <span className="text-foreground font-medium">3ds Max</span>، <span className="text-foreground font-medium">V-Ray</span>، <span className="text-foreground font-medium">Lumion</span> و سایر ابزارهای کاربردی در صنعت معماری و طراحی می‌باشد. تمامی دوره‌ها با رویکرد پروژه‌محور و عملی طراحی شده‌اند تا دانشجویان بتوانند مهارت‌های خود را در پروژه‌های واقعی به کار گیرند.
                </p>

                <p className="text-muted-foreground">
                  ما در <span className="text-foreground font-semibold">دفتر معماری‌های آرشیتکت</span> واقع در لاهیجان، استان گیلان مستقر هستیم و با افتخار خدمات آموزشی خود را به علاقه‌مندان این حوزه ارائه می‌دهیم. تیم ما متشکل از معماران و طراحان حرفه‌ای است که تجربه اجرای پروژه‌های متعدد را دارند.
                </p>

                <div className="bg-card border border-border/40 rounded-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-4">چرا Hi Academy؟</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>آموزش توسط اساتید مجرب با سابقه اجرای پروژه‌های واقعی</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>دوره‌های کاملاً کاربردی و پروژه‌محور</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>گواهینامه معتبر پس از اتمام دوره</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>پشتیبانی و مشاوره رایگان پس از اتمام دوره</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>امکان آموزش حضوری و آنلاین</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span>ارائه فایل‌های تمرینی و پروژه‌های عملی</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Map Section */}
        <ContactMap />
      </main>

      <Footer />
    </div>
  )
}
