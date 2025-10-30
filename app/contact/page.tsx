import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden" dir="rtl">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border/40 bg-gradient-to-br from-primary/10 via-card/30 to-background">
          <div className="container py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">تماس با ما</h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                ما همیشه آماده پاسخگویی به سوالات شما هستیم
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <Card className="border-border/40">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>آدرس</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      [آدرس کامل مرکز آموزشی شما در اینجا قرار می‌گیرد]
                    </p>
                  </CardContent>
                </Card>

                {/* Phone */}
                <Card className="border-border/40">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>تلفن تماس</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground" dir="ltr">
                      [شماره تلفن]
                    </p>
                    <p className="text-muted-foreground mt-2" dir="ltr">
                      [شماره همراه]
                    </p>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="border-border/40">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>ایمیل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground" dir="ltr">
                      [آدرس ایمیل]
                    </p>
                  </CardContent>
                </Card>

                {/* Working Hours */}
                <Card className="border-border/40">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>ساعات کاری</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      شنبه تا پنج‌شنبه: [ساعات کاری]
                    </p>
                    <p className="text-muted-foreground mt-2">
                      جمعه: تعطیل
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Map Section */}
              <div className="mt-12">
                <Card className="border-border/40">
                  <CardHeader>
                    <CardTitle>موقعیت مکانی</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        [نقشه گوگل یا نقشه دیگر در اینجا قرار می‌گیرد]
                      </p>
                    </div>
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
