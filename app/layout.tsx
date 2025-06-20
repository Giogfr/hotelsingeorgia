import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GeorgiaStay - Discover Beautiful Hotels in Georgia",
  description:
    "Find and book the perfect hotel for your Georgian adventure. From Tbilisi to Batumi, discover the best accommodations in Georgia.",
  keywords: "Georgia hotels, Tbilisi hotels, Batumi hotels, Georgian accommodation, hotel booking",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5060779146125096"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="travelpayouts-verification" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function () {
                var script = document.createElement("script");
                script.async = 1;
                script.src = 'https://emrld.cc/NDI3ODkz.js?t=427893';
                document.head.appendChild(script);
            })();
          `
        }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
