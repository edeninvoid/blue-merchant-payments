import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'ko'];
const DEFAULT_LOCALE = 'en';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 이미 locale prefix가 붙어있으면 패스
  const hasLocale = SUPPORTED_LOCALES.some(locale =>
    pathname.startsWith(`/${locale}`),
  );
  if (hasLocale) return;

  // 브라우저 언어 추출
  const acceptLang = req.headers.get('accept-language');
  const preferredLocale = acceptLang
    ? acceptLang.split(',')[0].split('-')[0] // "ko-KR,en;q=0.9" → "ko"
    : DEFAULT_LOCALE;

  console.log(preferredLocale);

  // 지원하지 않는 언어라면 fallback
  const locale = SUPPORTED_LOCALES.includes(preferredLocale)
    ? preferredLocale
    : DEFAULT_LOCALE;

  // redirect
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'], // next.js 내부 경로 제외
};
