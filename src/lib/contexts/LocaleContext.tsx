'use client';

import { createContext, use } from 'react';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';

export const LocaleContext = createContext<
  keyof typeof SUPPORTED_LANGUAGES | null
>(null);

export const useLocaleContext = () => {
  const context = use(LocaleContext);

  if (!context) {
    throw new Error('LocaleContext is not provided.');
  }

  return context;
};
