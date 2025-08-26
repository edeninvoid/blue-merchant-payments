import {
  getMerchantList,
  getMerchantInfo,
  getMerchantProductList,
} from '@/services/merchants';
import { api } from '@/lib/axios';
import { MerchantListRequestParams } from '@/types/merchant';

const mockMerchantData = {
  id: 1,
  name: 'Merchant  A',
  category: 'cafe',
  distanceKm: 1.0,
  rating: 3.0,
  logoUrl: '/icons/merchant.png',
};

jest.mock('@/lib/axios', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('[service] merchants', () => {
  const mockedApiGet = api.get as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getMerchantList 요청에 query, sort 인자값을 넣지 않으면 기본값으로 가맹점 리스트를 전달 받을 수 있다.', async () => {
    mockedApiGet.mockResolvedValue([mockMerchantData]);

    const params = {
      query: undefined,
      sort: undefined,
    } as MerchantListRequestParams;

    const result = await getMerchantList(params);

    expect(mockedApiGet).toHaveBeenCalledWith('/merchants', {
      params: {
        query: '',
        sort: 'name',
      },
    });
    expect(result).toEqual([mockMerchantData]);
  });

  it('getMerchantList 요청으로 query, sort 인자값을 통해 가맹점 리스트를 전달 받을 수 있다.', async () => {
    mockedApiGet.mockResolvedValue([mockMerchantData]);

    const params = {
      query: 'coffee',
      sort: 'name',
    } as MerchantListRequestParams;

    const result = await getMerchantList(params);

    expect(mockedApiGet).toHaveBeenCalledWith('/merchants', { params });
    expect(result).toEqual([mockMerchantData]);
  });

  it('getMerchantInfo 요청으로 가맹점 id 인자값을 통해 가맹점 데이터를 전달 받을 수 있다.', async () => {
    mockedApiGet.mockResolvedValue(mockMerchantData);

    const result = await getMerchantInfo('1');

    expect(mockedApiGet).toHaveBeenCalledWith('/merchants/1');
    expect(result).toEqual(mockMerchantData);
  });

  it('getMerchantProductList 요청으로 가맹점 id 인자값을 통해 상품 리스트 데이터를 전달 받을 수 있다.', async () => {
    const mockProductsData = [
      {
        id: 1,
        name: 'Product A',
        price: 2.0,
        currency: 'USD',
        imageUrl: '/img/product.jpg',
      },
    ];
    mockedApiGet.mockResolvedValue(mockProductsData);

    const result = await getMerchantProductList('1');

    expect(mockedApiGet).toHaveBeenCalledWith('/merchants/1/items');
    expect(result).toEqual(mockProductsData);
  });
});
