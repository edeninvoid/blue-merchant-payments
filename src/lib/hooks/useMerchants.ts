import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  getMerchantInfo,
  getMerchantList,
  getMerchantProductList,
} from '@/services/merchants';
import { QUERY_KEYS } from '@/lib/constants';
import { MerchantListRequestParams } from '@/types/merchant';
import { delay } from '@/lib/utils';
import { useEffect } from 'react';
import { useMerchantsProductsStore } from '@/store/merchants';

const useMerchantListQuery = (params?: MerchantListRequestParams) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.MERCHANT_LIST(params),
    queryFn: async () => {
      await delay(1000); // Suspense 노출을 위한 지연 로딩
      return getMerchantList(params);
    },
  });
};

const useMerchantInfoQuery = (id: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.MERCHANT_INFO(id),
    queryFn: async () => {
      await delay(1000); // Suspense 노출을 위한 지연 로딩
      return getMerchantInfo(id);
    },
  });
};

const useMerchantProductListQuery = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.MERCHANT_PRODUCT_LIST(id),
    queryFn: async () => getMerchantProductList(id),
  });
};

const useMerchantsProducts = (merchantId: string) => {
  const { data: productListData, isLoading } =
    useMerchantProductListQuery(merchantId);
  const setProductList = useMerchantsProductsStore(state => state.setProducts);

  useEffect(() => {
    if (!productListData) return;

    setProductList(
      productListData.map(item => ({
        ...item,
        isChecked: true,
      })),
    );
  }, [productListData, setProductList]);

  return { isLoading };
};

export {
  useMerchantListQuery,
  useMerchantInfoQuery,
  useMerchantProductListQuery,
  useMerchantsProducts,
};
