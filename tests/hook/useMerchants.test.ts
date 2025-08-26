import { renderHook, waitFor } from '@testing-library/react';
import {
  getMerchantInfo,
  getMerchantList,
  getMerchantProductList,
} from '@/services/merchants';
import { useMerchantsProductsStore } from '@/store/merchants';
import {
  useMerchantInfoQuery,
  useMerchantListQuery,
  useMerchantsProducts,
} from '@/lib/hooks/useMerchants';
import { createWrapper } from '../__lib__/renderWithProvider';
import {
  MerchantListRequestParams,
  MerchantProductItem,
} from '@/types/merchant';

jest.mock('@/lib/utils', () => ({
  delay: jest.fn(),
}));

jest.mock('@/services/merchants', () => ({
  getMerchantProductList: jest.fn(),
  getMerchantList: jest.fn(),
  getMerchantInfo: jest.fn(),
}));

describe('[hook] useMerchants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useMerchantsProductsStore.setState({ productList: [] });
  });

  it('데이터를 반환한다', async () => {
    const mockMerchants = [
      {
        id: 1,
        name: 'coffee',
        category: 'category',
        distanceKm: 1.0,
        rating: 3.0,
        logoUrl: '/icons.log.png',
      },
    ];
    (getMerchantList as jest.Mock).mockResolvedValue(mockMerchants);

    const params = {
      query: 'coffee',
      sort: 'name',
    } as MerchantListRequestParams;

    const { result } = renderHook(() => useMerchantListQuery(params), {
      wrapper: createWrapper(),
    });

    await waitFor(async () => {
      expect(result.current.data).toEqual(mockMerchants);
    });

    expect(getMerchantList).toHaveBeenCalledWith(params);
  });

  it('데이터를 반환한다', async () => {
    const mockMerchant = {
      id: 1,
      name: '상점1',
      category: '카테고리1',
      distanceKm: 1.0,
      rating: 3.0,
      logoUrl: '/icons/logo.png',
    };

    (getMerchantInfo as jest.Mock).mockResolvedValue(mockMerchant);

    const { result } = renderHook(() => useMerchantInfoQuery('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(async () => {
      expect(result.current.data).toEqual(mockMerchant);
    });

    expect(getMerchantInfo).toHaveBeenCalledWith('1');
  });

  it('상품 리스트를 가져와 MerchantsProductsStore에 저장하고 이를 확인한다.', async () => {
    const mockProducts: MerchantProductItem[] = Array.from({ length: 2 }).map(
      (_, i) => ({
        id: 1000 + i,
        name: `상품${i}`,
        price: i * 2.0,
        currency: 'USD',
        imageUrl: '',
        isChecked: true,
      }),
    );

    (getMerchantProductList as jest.Mock).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useMerchantsProducts('1'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() =>
      expect(useMerchantsProductsStore.getState().productList).toEqual(
        mockProducts,
      ),
    );
  });
});
