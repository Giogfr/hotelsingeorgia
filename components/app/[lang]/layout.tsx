import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CurrencyProvider } from "@/contexts/currency-context";
import "@/app/globals.css";
import ClickSpark from "@/app/ClickSpark";
import BlobCursor from "@/components/BlobCursor";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FloatingDonateButton from "@/components/floating-action-button";
import { SocialFAB } from "@/components/social-fab";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ClickSpark>
          <BlobCursor />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClickSpark>
        <SocialFAB />
        <FloatingDonateButton />
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </ThemeProvider>
    </CurrencyProvider>
  );
}
 