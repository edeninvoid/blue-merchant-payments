import { QUERY_KEYS } from '@/lib/constants';
import { MerchantListRequestParams } from '@/types/merchant';

const mockQueryParams = '1';

describe('[lib] constants', () => {
  it('MERCHANT_LIST 쿼리키를 생성한다.', () => {
    const params = { query: 'cafe', sort: 'name' } as MerchantListRequestParams;
    expect(QUERY_KEYS.MERCHANT_LIST(params)).toEqual(['MERCHANT_LIST', params]);
  });

  it('MERCHANT_INFO 쿼리키를 생성한다.', () => {
    expect(QUERY_KEYS.MERCHANT_INFO(mockQueryParams)).toEqual([
      'MERCHANT_INFO',
      mockQueryParams,
    ]);
  });

  it('MERCHANT_PRODUCT_LIST 쿼리키를 생성한다.', () => {
    expect(QUERY_KEYS.MERCHANT_PRODUCT_LIST(mockQueryParams)).toEqual([
      'MERCHANT_PRODUCT_LIST',
      mockQueryParams,
    ]);
  });

  it('ORDER_STATUS 쿼리키를 생성한다.', () => {
    expect(QUERY_KEYS.ORDER_STATUS(mockQueryParams)).toEqual([
      'ORDER_STATUS',
      mockQueryParams,
    ]);
  });
});
