import {
  getMerchantList,
  getMerchantInfo,
  getMerchantProductList,
} from '@/services/merchants';
import { api } from '@/lib/axios';

jest.mock('@/lib/axios', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('merchants service', () => {
  const mockedApiGet = api.get as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getMerchantList: query, sort 전달 및 결과 반환', async () => {
    const mockData = [{ id: '1', name: 'Merchant A' }];
    mockedApiGet.mockResolvedValue(mockData);

    const result = await getMerchantList({ query: 'coffee', sort: 'name' });

    expect(mockedApiGet).toHaveBeenCalledWith('/merchants', {
      params: { query: 'coffee', sort: 'name' },
    });
    expect(result).toEqual(mockData);
  });

  it('getMerchantInfo: id 전달 및 결과 반환', async () => {
    const mockData = { id: '1', name: 'Merchant A' };
    mockedApiGet.mockResolvedValue(mockData);

    const result = await getMerchantInfo('1');

    expect(mockedApiGet).toHaveBeenCalledWith('/merchants/1');
    expect(result).toEqual(mockData);
  });

  it('getMerchantProductList: id 전달 및 결과 반환', async () => {
    const mockData = [{ id: '101', name: 'Coffee' }];
    mockedApiGet.mockResolvedValue(mockData);

    const result = await getMerchantProductList('1');

    expect(mockedApiGet).toHaveBeenCalledWith('/merchants/1/items');
    expect(result).toEqual(mockData);
  });
});
