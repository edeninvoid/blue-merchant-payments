import RootPage from '@/app/page';
import { redirect } from 'next/navigation';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('[Page] Root', () => {
  test('RootPage는 /en 으로 리다이렉트한다.', () => {
    RootPage();
    expect(redirect).toHaveBeenCalledWith('/en');
  });
});
