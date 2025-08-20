import { useSuspenseQuery } from '@tanstack/react-query';
import { getMerchantList } from '@/services/merchants';
import { QUERY_KEYS } from '@/lib/constants';
import { MerchantListRequestParams } from '@/types/merchant';
import { delay } from '@/lib/utils';

const useMerchantListQuery = (params?: MerchantListRequestParams) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEYS.MERCHANT_LIST(params),
    queryFn: async () => {
      await delay(1000); // Suspense Skeleton 노출을 위한 지연 로딩
      return getMerchantList(params);
    },
  });
};

export { useMerchantListQuery };
