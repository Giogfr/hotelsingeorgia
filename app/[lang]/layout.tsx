import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Language } from "@/lib/translations";
import { CurrencyProvider } from "@/contexts/currency-context";
import "@/app/globals.css";
import ClickSpark from "@/app/ClickSpark";
import BlobCursor from "@/components/BlobCursor";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FloatingDonateButton from "@/components/floating-action-button";
import { SocialFAB } from "@/components/social-fab";
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from '@/lib/translations';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const messages = getTranslations(lang);
  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <CurrencyProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClickSpark>
            <BlobCursor />
            <Header lang={lang} />
            <main className="flex-grow">{children}</main>
            <Footer lang={lang} />
          </ClickSpark>
          <SocialFAB />
          <FloatingDonateButton />
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </CurrencyProvider>
    </NextIntlClientProvider>
  );
}
 