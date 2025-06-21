import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { Footer } from "@/components/footer"; // Assuming you have a footer component
import { Language } from "@/lib/translations";

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  return (
    <>
        <Header lang={params.lang} />
        {children}
        <Footer />
    </>
  );
} 