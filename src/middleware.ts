import { NextRequest, NextResponse } from 'next/server';

const locales = ['vi', 'en', 'zh'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const locale = locales.find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (locale) {
      let newPathname;
      if (pathname === `/${locale}`) {
        newPathname = '/';
      } else {
        newPathname = pathname.replace(`/${locale}`, '');
      }

      const url = request.nextUrl.clone();
      url.pathname = newPathname;

      const response = NextResponse.redirect(url);
      response.cookies.set('language', locale, {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
