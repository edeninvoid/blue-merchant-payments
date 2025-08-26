import { screen, fireEvent, waitFor } from '@testing-library/react';
import MerchantListPage from '@/components/merchants/list/MerchantListPage';
import { renderWithProvider } from '../__lib__/renderWithProvider';
import { useAuthStore } from '@/store/auth';

beforeEach(() => {
  jest.clearAllMocks();

  // 테스트용 토큰 세팅
  useAuthStore.setState({
    token: {
      token: 'mock-token',
      expireDate: new Date(Date.now() + 1000 * 60 * 60),
    },
  });
});

describe('[UI] MerchantListPage', () => {
  it('검색창과 정렬 select box가 렌더링된다.', async () => {
    renderWithProvider(<MerchantListPage />);

    const input = await screen.findByPlaceholderText('searchLabel');
    expect(input).toBeInTheDocument();

    const select = await screen.findByRole('combobox', {
      name: /Sort merchants/i,
    });
    expect(select).toBeInTheDocument();
  });

  it('검색어를 입력하면 onSearch가 상태에 반영된다.', async () => {
    renderWithProvider(<MerchantListPage />);

    const input = await screen.findByPlaceholderText('searchLabel');

    fireEvent.change(input, { target: { value: 'coffee' } });

    await waitFor(() => {
      expect(input).toHaveValue('coffee');
    });
  });

  it('정렬 옵션을 변경하면 상태에 반영된다.', async () => {
    renderWithProvider(<MerchantListPage />);

    const select = await screen.findByRole('combobox', {
      name: /Sort merchants/i,
    });

    fireEvent.change(select, { target: { value: 'category' } });

    await waitFor(() => {
      expect(select).toHaveValue('category');
    });
  });
});
