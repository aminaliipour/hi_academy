import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactMap } from "@/components/contact-map"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden" dir="rtl">
      <Header />

      <main className="flex-1">
        <ContactMap />
      </main>

      <Footer />
    </div>
  )
}
