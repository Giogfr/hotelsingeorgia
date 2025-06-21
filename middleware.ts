import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const availableLanguages = ['en', 'es', 'sr', 'ru', 'ka']
const defaultLanguage = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLang = availableLanguages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  )

  if (pathnameHasLang) return

  // Redirect if there is no lang
  const lang = defaultLanguage
  request.nextUrl.pathname = `/${lang}${pathname}`
  
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
} 