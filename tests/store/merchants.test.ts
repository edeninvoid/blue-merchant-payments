import { act } from '@testing-library/react';
import { useMerchantsProductsStore } from '@/store/merchants';
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

describe('[store] merchants', () => {
  beforeEach(() => {
    useMerchantsProductsStore.setState({ productList: [] });
  });

  it('MerchantsProductsStore의 초기 상태가 빈 값인지 체크한다.', () => {
    const state = useMerchantsProductsStore.getState();
    expect(state.productList).toEqual([]);
  });

  it('MerchantsProductsStore의 setProducts 함수를 통해 상품 목록을 업데이트할 수 있다.', () => {
    act(() => {
      useMerchantsProductsStore.getState().setProducts(mockItems);
    });

    const state = useMerchantsProductsStore.getState();
    expect(state.productList).toEqual(mockItems);
  });

  it('MerchantsProductsStore의 toggleProduct 함수를 통해 특정 상품의 체크 상태를 변경할 수 있다.', () => {
    act(() => {
      useMerchantsProductsStore.getState().setProducts(mockItems);
    });

    act(() => {
      useMerchantsProductsStore.getState().toggleProduct(1001, false);
    });

    const state = useMerchantsProductsStore.getState();
    expect(state.productList.find(p => p.id === 1001)?.isChecked).toBe(false);
    expect(state.productList.find(p => p.id === 1000)?.isChecked).toBe(true);
  });
});
