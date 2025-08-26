import { renderHook, waitFor } from '@testing-library/react';
import { getMerchantProductList } from '@/services/merchants';
import { useMerchantsProductsStore } from '@/store/merchants';
import { useMerchantsProducts } from '@/lib/hooks/useMerchants';
import { createWrapper } from '../__lib__/renderWithProvider';
import { MerchantProductItem } from '@/types/merchant';

const mockItems: MerchantProductItem[] = Array.from({ length: 2 }).map(
  (_, i) => ({
    id: 1000 + i,
    name: `상품${i}`,
    price: i * 2.0,
    currency: 'USD',
    imageUrl: '',
    isChecked: true,
  }),
);

jest.mock('@/services/merchants', () => ({
  getMerchantProductList: jest.fn(),
}));

describe('[hook] useMerchants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useMerchantsProductsStore.setState({ productList: [] });
  });

  it('상품 리스트를 가져와 MerchantsProductsStore에 저장하고 이를 확인한다.', async () => {
    (getMerchantProductList as jest.Mock).mockResolvedValue(mockItems);

    const { result } = renderHook(() => useMerchantsProducts('1'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() =>
      expect(useMerchantsProductsStore.getState().productList).toEqual(
        mockItems,
      ),
    );
  });
});
