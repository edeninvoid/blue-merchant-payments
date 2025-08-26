jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useRouter: () => ({
    back: jest.fn(),
  }),
  usePathname: jest.fn(() => '/en'),
}));

jest.mock('next-intl', () => ({
  ...jest.requireActual('next-intl'),
  useLocale: jest.fn(() => 'en'),
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
  redirect: jest.fn(),
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
  getPathname: () => '/',
  createNavigation: () => ({
    Link: ({ children }: { children: React.ReactNode }) => children,
    redirect: jest.fn(),
    usePathname: () => '/',
    useRouter: () => ({ push: jest.fn() }),
    getPathname: () => '/',
  }),
}));

jest.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['en', 'ko'],
  },
}));
