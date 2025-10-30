import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Target, Heart } from "lucide-react"

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
            <div className="max-w-4xl mx-auto space-y-12">
              {/* About Text */}
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  [متن معرفی مرکز آموزشی شما در اینجا قرار می‌گیرد]
                </p>
                <p>
                  [توضیحات بیشتر درباره تاریخچه، چشم‌انداز و اهداف]
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                <Card className="border-border/40">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">اساتید مجرب</h3>
                    <p className="text-muted-foreground">
                      [توضیحات درباره تیم اساتید]
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">گواهینامه معتبر</h3>
                    <p className="text-muted-foreground">
                      [توضیحات درباره گواهینامه‌ها]
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">آموزش کاربردی</h3>
                    <p className="text-muted-foreground">
                      [توضیحات درباره روش آموزش]
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">پشتیبانی دائمی</h3>
                    <p className="text-muted-foreground">
                      [توضیحات درباره پشتیبانی]
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
