import LocalePage from '@/app/[locale]/page';
import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn(),
}));

jest.mock('@/components/merchants/list/MerchantListPage', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked MerchantListPage</div>),
}));

describe('[Page] Locale', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('locale을 세팅하고 MerchantListPage 컴포넌트를 렌더링한다', async () => {
    const params = { locale: 'en' };

    const result = await LocalePage({ params: Promise.resolve(params) });

    render(result);

    expect(setRequestLocale).toHaveBeenCalledWith('en');

    expect(screen.getByText('Mocked MerchantListPage')).toBeInTheDocument();
  });
});
