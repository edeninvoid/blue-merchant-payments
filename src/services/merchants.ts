import { api } from '@/lib/axios';
import {
  MerchantListRequestParams,
  MerchantListItemInfo,
} from '@/types/merchant';

const getMerchantList = async (
  params?: MerchantListRequestParams,
): Promise<MerchantListItemInfo[]> => {
  return await api.get('/merchants', {
    params: {
      query: params?.query ?? '',
      sort: params?.sort ?? 'rating',
    },
  });
};

export { getMerchantList };
