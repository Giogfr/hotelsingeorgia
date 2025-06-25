import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { CurrencyProvider } from "@/contexts/currency-context";
import "@/app/globals.css";
import ClickSpark from "@/app/ClickSpark";
import BlobCursor from "@/components/BlobCursor";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FloatingDonateButton from "@/components/floating-action-button";
import { SocialFAB } from "@/components/social-fab";
import { AuthProvider } from "@/contexts/auth-context";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>GStay - Hotels & Restaurants in Georgia</title>
        <meta name="description" content="Discover and book the best hotels and restaurants in Georgia. Fast, modern, and mobile-friendly." />
        <meta property="og:title" content="GStay - Hotels & Restaurants in Georgia" />
        <meta property="og:description" content="Discover and book the best hotels and restaurants in Georgia. Fast, modern, and mobile-friendly." />
        <meta property="og:image" content="/logo.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <link rel="icon" href="/logo.svg" />
        <link rel="shortcut icon" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning
      >
        {/* Blurred background image overlay */}
        <div
          className="fixed inset-0 -z-10 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)',
            filter: 'blur(8px) brightness(0.9)',
          }}
          aria-hidden="true"
        />
        <AuthProvider>
          <CurrencyProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ClickSpark>
                <BlobCursor />
                <main className="flex-grow">{children}</main>
              </ClickSpark>
              <SocialFAB />
              <FloatingDonateButton />
              <Analytics />
              <SpeedInsights />
              <Toaster />
            </ThemeProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'GStay - Hotels & Restaurants in Georgia',
  description: 'Discover and book the best hotels and restaurants in Georgia. Fast, modern, and mobile-friendly.',
  openGraph: {
    title: 'GStay - Hotels & Restaurants in Georgia',
    description: 'Discover and book the best hotels and restaurants in Georgia. Fast, modern, and mobile-friendly.',
    images: ['/logo.svg'],
    type: 'website',
    url: 'https://yourdomain.com',
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
}; 