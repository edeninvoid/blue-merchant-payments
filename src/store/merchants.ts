import { create } from 'zustand';
import { MerchantProductItem } from '@/types/merchant';
import { devtools } from 'zustand/middleware';

interface MerchantsProductsStore {
  productList: MerchantProductItem[];
  setProducts: (products: MerchantProductItem[]) => void;
  toggleProduct: (id: number, checked: boolean) => void;
}

export const useMerchantsProductsStore = create<MerchantsProductsStore>()(
  devtools(
    set => ({
      productList: [],
      setProducts: products => set({ productList: products }),
      toggleProduct: (productId, checked) =>
        set(state => ({
          productList: state.productList.map(productItem =>
            productItem.id === productId
              ? { ...productItem, isChecked: checked }
              : productItem,
          ),
        })),
    }),
    { name: 'MerchantsProductsStore' },
  ),
);
