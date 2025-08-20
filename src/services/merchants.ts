import { api } from '@/lib/axios';
import {
  MerchantListRequestParams,
  MerchantListItemInfo,
  MerchantInfo,
  MerchantProductItemInfo,
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

const getMerchantInfo = async (id: string): Promise<MerchantInfo> => {
  return await api.get(`/merchants/${id}`);
};

const getMerchantProductList = async (
  id: string,
): Promise<MerchantProductItemInfo[]> => {
  return await api.get(`/merchants/${id}/items`);
};

export { getMerchantList, getMerchantInfo, getMerchantProductList };
