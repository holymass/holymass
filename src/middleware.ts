import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import intlConfig from './intlConfig';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
const { defaultLocale, locales } = intlConfig;

const getLocaleFromPath = (request: NextRequest): string | undefined => {
  const { pathname } = request.nextUrl;
  return locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
};

const getLocaleFromCookies = (request: NextRequest): string | undefined => {
  const locale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (locale && locales.includes(locale)) {
    return locale;
  }
};

const getLocaleFromNegotiator = (request: NextRequest): string => {
  const languages = new Negotiator({
    headers: {
      'accept-language': request.headers.get('accept-language') || undefined,
    },
  }).languages();
  try {
    return match(languages, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
};

export function middleware(request: NextRequest): NextResponse {
  const { basePath, pathname, search } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  const initOptions = {
    request: {
      headers: requestHeaders,
    },
  };
  let response: NextResponse;
  let locale: string;
  const pathLocale = getLocaleFromPath(request);
  const cookieLocale = getLocaleFromCookies(request);
  if (!pathLocale) {
    locale = cookieLocale || getLocaleFromNegotiator(request);
    let url = `/${locale}${pathname}`;
    if (search) {
      url += search;
    }
    if (locale === defaultLocale) {
      response = NextResponse.rewrite(new URL(url, request.url), initOptions);
    } else {
      response = NextResponse.redirect(new URL(url, request.url));
    }
  } else {
    if (pathLocale === defaultLocale) {
      let url = pathname.slice(`/${pathLocale}`.length) || '/';
      if (search) {
        url += search;
      }
      response = NextResponse.redirect(new URL(url, request.url));
    } else {
      response = NextResponse.next(initOptions);
    }
    if (!cookieLocale || cookieLocale !== pathLocale) {
      response.cookies.set(LOCALE_COOKIE_NAME, pathLocale, {
        path: basePath || undefined,
        sameSite: 'strict',
        secure: true,
        maxAge: 31536000,
        httpOnly: true,
      });
    }
  }
  return response;
}

export const config = {
  matcher: '/((?!_next|api|assets|static|favicon.ico).*)',
};
