import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import {
  getMerchantInfo,
  getMerchantList,
  getMerchantProductList,
} from '@/services/merchants';
import { QUERY_KEYS } from '@/lib/constants';
import { MerchantListRequestParams } from '@/types/merchant';
import { delay } from '@/lib/utils';

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
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.MERCHANT_PRODUCT_LIST(id),
    queryFn: async () => {
      await delay(1000); // Suspense 노출을 위한 지연 로딩
      return getMerchantProductList(id);
    },
  });
};

export {
  useMerchantListQuery,
  useMerchantInfoQuery,
  useMerchantProductListQuery,
};
