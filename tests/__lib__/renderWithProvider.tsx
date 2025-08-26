import { render } from '@testing-library/react';
import { NextIntlClientProvider } from '../__mocks__/next-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

export const renderWithProvider = (ui: React.ReactNode, locale = 'en') => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider>{ui}</NextIntlClientProvider>
    </QueryClientProvider>,
  );
};

export const createWrapper = () => {
  const queryClient = new QueryClient();

  function QueryClientTestWrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </QueryClientProvider>
    );
  }

  return QueryClientTestWrapper;
};
