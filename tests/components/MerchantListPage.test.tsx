import { screen, fireEvent, waitFor } from '@testing-library/react';
import MerchantListPage from '@/components/merchants/list/MerchantListPage';
import { renderWithProvider } from '../__lib__/renderWithProvider';

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

describe('MerchantListPage', () => {
  it('검색창과 정렬 select box가 렌더링된다.', async () => {
    renderWithProvider(<MerchantListPage />);

    // placeholder 번역된 search label 확인
    const input = await screen.findByPlaceholderText('searchLabel');
    expect(input).toBeInTheDocument();

    // 정렬 드롭다운이 존재하는지 확인
    const select = await screen.findByRole('combobox', {
      name: /Sort merchants/i,
    });
    expect(select).toBeInTheDocument();
  });

  it('검색어를 입력하면 onSearch가 상태에 반영된다.', async () => {
    renderWithProvider(<MerchantListPage />);

    const input = await screen.findByPlaceholderText('searchLabel');

    // 입력 이벤트 발생
    fireEvent.change(input, { target: { value: 'coffee' } });

    // debounce 때문에 기다림
    await waitFor(() => {
      expect(input).toHaveValue('coffee');
    });
  });

  it('정렬 옵션을 변경하면 상태에 반영된다.', async () => {
    renderWithProvider(<MerchantListPage />);

    const select = await screen.findByRole('combobox', {
      name: /Sort merchants/i,
    });

    // category 로 변경
    fireEvent.change(select, { target: { value: 'category' } });

    await waitFor(() => {
      expect(select).toHaveValue('category');
    });
  });
});
