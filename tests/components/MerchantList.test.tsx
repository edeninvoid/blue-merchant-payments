import { screen } from '@testing-library/react';
import MerchantList from '@/components/merchants/list/MerchantList';
import { useMerchantListQuery } from '@/lib/hooks/useMerchants';
import { renderWithProvider } from '../__lib__/renderWithProvider';

const mockMerchantData = [
  {
    id: 1,
    name: '상점1',
    category: '카테고리1',
    distanceKm: 1.0,
    rating: 3.0,
    logoUrl: '/icons/logo.png',
  },
];

jest.mock('@/lib/hooks/useMerchants');

jest.mock('@/services/merchants', () => ({
  getMerchantList: jest.fn(() => Promise.resolve(mockMerchantData)),
}));

describe('[UI] MerchantList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Query에 데이터가 없으면 MerchantListNoItem을 렌더링한다', () => {
    (useMerchantListQuery as jest.Mock).mockReturnValue({ data: [] });

    renderWithProvider(<MerchantList params={undefined} />);

    expect(screen.getByTestId('MerchantListNoItem')).toBeInTheDocument();
  });

  it('Query에 데이터가 있으면 MerchantListItem을 렌더링한다', () => {
    (useMerchantListQuery as jest.Mock).mockReturnValue({
      data: mockMerchantData,
    });

    renderWithProvider(<MerchantList params={undefined} />);

    expect(screen.getByText('상점1')).toBeInTheDocument();
  });
});
