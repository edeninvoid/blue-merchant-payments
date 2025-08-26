import { render } from '@testing-library/react';
import { NextIntlClientProvider } from '../__mocks__/next-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return QueryClientTestWrapper;
};
