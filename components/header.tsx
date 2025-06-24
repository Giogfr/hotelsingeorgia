"use client";

import Link from "next/link";
import { Mountain } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { CurrencySwitcher } from "./currency-switcher";
import { Language } from "@/lib/translations";

export function Header({ lang }: { lang: Language }) {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link className="flex items-center justify-center" href={`/${lang}`}>
        <Mountain className="h-6 w-6" />
        <span className="sr-only">GeorgiaStay</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href={`/${lang}/hotels`}
        >
          Hotels
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href={`/${lang}/restaurants`}
        >
          Restaurants
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href={`/${lang}/about`}
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href={`/${lang}/contact`}
        >
          Contact
        </Link>
        <div>
          <ThemeToggle />
        </div>
        <LanguageSwitcher />
        <CurrencySwitcher />
      </nav>
    </header>
  );
} 