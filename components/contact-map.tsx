"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Navigation, Send, Instagram, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactMap() {
  // Google Maps embed URL
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3173.8899574344895!2d50.00707!3d37.2068841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ff54b00075fd6a5%3A0xdcf5fbbfe08f4394!2z2K_Zgdiq2LEg2YXYudio2YXYp9ix24wg2YfYp9uMINii2LHYtNuM2Kraqdiq!5e0!3m2!1sfa!2s!4v1699000000000!5m2!1sfa!2s"

  return (
    <section className="py-16 md:py-24 bg-card/30">
      <div className="container">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">تماس با ما</h2>
            <p className="text-lg text-muted-foreground">
              در لاهیجان، میدان بسیج در خدمت شما هستیم
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <Card className="border-border/40 overflow-hidden">
                <div className="relative w-full h-[400px] md:h-[500px]">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <CardContent className="p-4 bg-card border-t border-border/40">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <a
                      href="https://www.google.com/maps/dir//Gilan+Province,+Lahijan,+%D9%85%DB%8C%D8%AF%D8%A7%D9%86+%D8%A8%D8%B3%DB%8C%D8%AC%D8%8C+6245%2BQP2+%D8%AF%D9%81%D8%AA%D8%B1+%D9%85%D8%B9%D9%85%D8%A7%D8%B1%DB%8C+%D9%87%D8%A7%DB%8C+%D8%A2%D8%B1%D8%B4%DB%8C%D8%AA%DA%A9%D8%AA%E2%80%AD/@37.2013938,49.9978146,14.5z"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="h-4 w-4 ml-2" />
                      مسیریابی با Google Maps
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <Card className="border-border/40">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">آدرس</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        گیلان، لاهیجان، میدان بسیج
                        <br />
                        دفتر معماری‌های آرشیتکت
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">تلفن تماس</h3>
                      <a 
                        href="tel:+989111381772" 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                        dir="ltr"
                      >
                        +98 911 138 1772
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">ایمیل</h3>
                      <a 
                        href="mailto:admin@hiarchitect.ir" 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        dir="ltr"
                      >
                        admin@hiarchitect.ir
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">وبسایت</h3>
                      <a 
                        href="https://www.hiarchitect.ir" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        dir="ltr"
                      >
                        www.hiarchitect.ir
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">ساعات کاری</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">همه روزه</span>
                      <span className="font-medium">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">جمعه</span>
                      <span className="font-medium text-red-500">تعطیل</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">شبکه‌های اجتماعی</h3>
                  <div className="space-y-3">
                    <a
                      href="https://t.me/HiArchitect_Admin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                    >
                      <div className="h-10 w-10 rounded-full bg-[#0088cc]/10 flex items-center justify-center group-hover:bg-[#0088cc]/20 transition-colors">
                        <Send className="h-5 w-5 text-[#0088cc]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">تلگرام</div>
                        <div className="text-xs text-muted-foreground">@HiArchitect_Admin</div>
                      </div>
                    </a>

                    <a
                      href="https://www.instagram.com/hi.architect"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#f09433]/10 via-[#e6683c]/10 to-[#bc1888]/10 flex items-center justify-center group-hover:from-[#f09433]/20 group-hover:via-[#e6683c]/20 group-hover:to-[#bc1888]/20 transition-colors">
                        <Instagram className="h-5 w-5 text-[#e6683c]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">اینستاگرام</div>
                        <div className="text-xs text-muted-foreground">@hi.architect</div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
