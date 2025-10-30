import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Hi Academy - آموزش معماری و طراحی",
  description: "پلتفرم آموزش آنلاین معماری، طراحی داخلی و نرم‌افزارهای تخصصی",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hi Academy",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Hi Academy",
    title: "Hi Academy - آموزش معماری و طراحی",
    description: "پلتفرم آموزش آنلاین معماری، طراحی داخلی و نرم‌افزارهای تخصصی",
  },
  twitter: {
    card: "summary",
    title: "Hi Academy - آموزش معماری و طراحی",
    description: "پلتفرم آموزش آنلاین معماری، طراحی داخلی و نرم‌افزارهای تخصصی",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#FFC107",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hi Academy" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-center" dir="rtl" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('[SW] Registration successful:', registration.scope);
                    },
                    function(err) {
                      console.log('[SW] Registration failed:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
