"use client";

import Link from "next/link";
import { Mountain } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { CurrencySwitcher } from "./currency-switcher";
import { Language } from "@/lib/translations";
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/components/ui/use-mobile";
import { UserNav } from "./auth/user-nav";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoginModal } from "./auth/login-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export function Header({ lang }: { lang: Language }) {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleProfileClick = () => {
    if (!user) setShowLogin(true);
  };

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
        <Link className="flex items-center justify-center" href={`/${lang}`}>
          <Mountain className="h-6 w-6" />
          <span className="sr-only">GeorgiaStay</span>
        </Link>
        {isMobile ? (
          <div className="ml-auto flex items-center">
            <Drawer>
              <DrawerTrigger asChild>
                <button aria-label="Open menu" className="p-2"><Menu className="h-6 w-6" /></button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerTitle>Menu</DrawerTitle>
                <nav className="flex flex-col gap-4 p-4">
                  <Link className="text-lg font-medium" href={`/${lang}/hotels`}>Hotels</Link>
                  <Link className="text-lg font-medium" href={`/${lang}/restaurants`}>Restaurants</Link>
                  <Link className="text-lg font-medium" href={`/${lang}/about`}>About</Link>
                  <Link className="text-lg font-medium" href={`/${lang}/contact`}>Contact</Link>
                  <a className="text-lg font-medium" href="https://www.dravionai.casa/" target="_blank" rel="noopener noreferrer">DravionAI</a>
                  <div className="pt-2 flex flex-col gap-2 border-t mt-2">
                    <ThemeToggle />
                    <LanguageSwitcher />
                    <CurrencySwitcher />
                    <div className="flex justify-center pt-2">
                      {user ? (
                        <UserNav lang={lang} />
                      ) : (
                        <Button variant="outline" onClick={() => setShowLogin(true)}>
                          Sign In
                        </Button>
                      )}
                    </div>
                  </div>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>
        ) : (
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href={`/${lang}/hotels`}>
              Hotels
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href={`/${lang}/restaurants`}>
              Restaurants
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href={`/${lang}/about`}>
              About
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href={`/${lang}/contact`}>
              Contact
            </Link>
            <a className="text-sm font-medium hover:underline underline-offset-4" href="https://www.dravionai.casa/" target="_blank" rel="noopener noreferrer">
              DravionAI
            </a>
            <div>
              <ThemeToggle />
            </div>
            <LanguageSwitcher />
            <CurrencySwitcher />
            <div>
              {user ? (
                <UserNav lang={lang} />
              ) : (
                <button
                  className="relative h-9 w-9 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 transition"
                  onClick={handleProfileClick}
                  aria-label="Open profile/login"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                    <AvatarFallback>
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                </button>
              )}
            </div>
          </nav>
        )}
      </header>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
} 