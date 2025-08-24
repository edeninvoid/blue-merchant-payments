import React from 'react';

export const NextIntlClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => children;

export const useTranslations = () => (key: string) => key;

export const createMiddleware = () => jest.fn();
export const defineRouting = () => jest.fn();
export const setRequestLocale = () => jest.fn();
