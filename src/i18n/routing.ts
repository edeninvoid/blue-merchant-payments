import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ko'],

  // 기본 언어는 브라우져 설정을 따름
  defaultLocale: 'en',
});
